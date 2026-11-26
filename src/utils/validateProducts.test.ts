import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  EXPECTED_PRODUCT_COUNT,
  formatPrice,
  getStockStatus,
  validateProducts,
} from './validateProducts';
import { generateProducts } from '../../scripts/generateProducts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsJsonPath = path.resolve(__dirname, '../../data/products.json');

test('generateProducts creates exactly 50 valid unique products with all stock states', () => {
  const generated = generateProducts();
  assert.equal(generated.length, EXPECTED_PRODUCT_COUNT);

  const result = validateProducts(generated);
  assert.equal(result.valid, true);

  assert.equal(generated.some((p) => p.stock === 0), true);
  assert.equal(generated.some((p) => p.stock > 0 && p.stock <= 10), true);
  assert.equal(generated.some((p) => p.stock > 10), true);
});

test('data/products.json exists and passes strict schema validation', () => {
  assert.equal(fs.existsSync(productsJsonPath), true);
  const parsed = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
  const result = validateProducts(parsed);
  assert.equal(result.valid, true);
  if (result.valid) {
    assert.equal(result.products.length, 50);
  }
});

test('validateProducts rejects wrong counts, duplicate IDs, and invalid fields', () => {
  const base = generateProducts();

  const shortResult = validateProducts(base.slice(0, 49));
  assert.equal(shortResult.valid, false);

  const duplicateIdList = base.map((item, idx) =>
    idx === 1 ? { ...item, id: base[0].id } : item
  );
  const dupResult = validateProducts(duplicateIdList);
  assert.equal(dupResult.valid, false);

  const badPriceList = base.map((item, idx) =>
    idx === 0 ? { ...item, price: -5 } : item
  );
  assert.equal(validateProducts(badPriceList).valid, false);

  const fractionalStockList = base.map((item, idx) =>
    idx === 0 ? { ...item, stock: 3.5 } : item
  );
  assert.equal(validateProducts(fractionalStockList).valid, false);

  const emptyNameList = base.map((item, idx) =>
    idx === 0 ? { ...item, name: '   ' } : item
  );
  assert.equal(validateProducts(emptyNameList).valid, false);

  assert.equal(validateProducts(null).valid, false);
});

test('formatPrice and getStockStatus format values accurately', () => {
  assert.equal(formatPrice(49.99), '$49.99');
  assert.equal(formatPrice(12), '$12.00');

  assert.deepEqual(getStockStatus(0), { label: 'Out of stock', tone: 'out' });
  assert.deepEqual(getStockStatus(1), { label: 'Low stock', tone: 'low' });
  assert.deepEqual(getStockStatus(10), { label: 'Low stock', tone: 'low' });
  assert.deepEqual(getStockStatus(11), { label: 'In stock', tone: 'healthy' });
});
