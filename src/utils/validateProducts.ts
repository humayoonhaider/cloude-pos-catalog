import type { Product } from '../types/product';

export const EXPECTED_PRODUCT_COUNT = 50;
export const LOW_STOCK_THRESHOLD = 10;

export type ValidationResult =
  | { valid: true; products: Product[] }
  | { valid: false; errors: string[] };

export type StockTone = 'healthy' | 'low' | 'out';

export interface StockStatus {
  label: string;
  tone: StockTone;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function validateProducts(data: unknown): ValidationResult {
  if (!Array.isArray(data)) {
    return {
      valid: false,
      errors: ['Product dataset must be a JSON array.'],
    };
  }

  const errors: string[] = [];

  if (data.length !== EXPECTED_PRODUCT_COUNT) {
    errors.push(
      `Expected ${EXPECTED_PRODUCT_COUNT} products, but found ${data.length}.`
    );
  }

  const seenIds = new Set<string>();
  const validatedProducts: Product[] = [];

  data.forEach((item, index) => {
    const rowLabel = `Item ${index + 1}`;

    if (!isRecord(item)) {
      errors.push(`${rowLabel}: entry must be an object.`);
      return;
    }

    const { id, name, price, stock, category } = item;

    if (typeof id !== 'string' || id.trim().length === 0) {
      errors.push(`${rowLabel}: id must be a non-empty string.`);
    } else if (seenIds.has(id)) {
      errors.push(`${rowLabel}: duplicate product id "${id}".`);
    } else {
      seenIds.add(id);
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      errors.push(`${rowLabel}: name must be a non-empty string.`);
    }

    if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
      errors.push(`${rowLabel}: price must be a valid positive number.`);
    }

    if (typeof stock !== 'number' || !Number.isInteger(stock) || stock < 0) {
      errors.push(`${rowLabel}: stock must be a non-negative integer.`);
    }

    if (typeof category !== 'string' || category.trim().length === 0) {
      errors.push(`${rowLabel}: category must be a non-empty string.`);
    }

    if (
      typeof id === 'string' &&
      id.trim().length > 0 &&
      typeof name === 'string' &&
      name.trim().length > 0 &&
      typeof price === 'number' &&
      Number.isFinite(price) &&
      price > 0 &&
      typeof stock === 'number' &&
      Number.isInteger(stock) &&
      stock >= 0 &&
      typeof category === 'string' &&
      category.trim().length > 0
    ) {
      validatedProducts.push({
        id: id.trim(),
        name: name.trim(),
        price,
        stock,
        category: category.trim(),
      });
    }
  });

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    products: validatedProducts,
  };
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(price: number): string {
  return currencyFormatter.format(price);
}

export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) {
    return { label: 'Out of stock', tone: 'out' };
  }
  if (stock <= LOW_STOCK_THRESHOLD) {
    return { label: 'Low stock', tone: 'low' };
  }
  return { label: 'In stock', tone: 'healthy' };
}
