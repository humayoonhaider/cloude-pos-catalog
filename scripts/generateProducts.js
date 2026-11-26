import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const outputPath = path.join(projectRoot, 'data', 'products.json');

const CATALOG_TEMPLATES = [
  // Electronics (8)
  { name: 'Wireless Bluetooth Headphones', category: 'Electronics', minPrice: 34.99, maxPrice: 79.99 },
  { name: 'USB-C Fast Charger', category: 'Electronics', minPrice: 14.99, maxPrice: 29.99 },
  { name: 'Wireless Mouse', category: 'Electronics', minPrice: 18.99, maxPrice: 39.99 },
  { name: 'Mechanical Keyboard', category: 'Electronics', minPrice: 54.99, maxPrice: 119.99 },
  { name: 'Portable Power Bank', category: 'Electronics', minPrice: 24.99, maxPrice: 49.99 },
  { name: 'Smart LED Bulb', category: 'Electronics', minPrice: 9.99, maxPrice: 19.99 },
  { name: 'HD Webcam 1080p', category: 'Electronics', minPrice: 32.99, maxPrice: 64.99 },
  { name: 'Bluetooth Portable Speaker', category: 'Electronics', minPrice: 29.99, maxPrice: 59.99 },

  // Clothing (7)
  { name: "Men's Cotton T-Shirt", category: 'Clothing', minPrice: 12.99, maxPrice: 24.99 },
  { name: "Women's Casual Kurti", category: 'Clothing', minPrice: 22.99, maxPrice: 44.99 },
  { name: 'Denim Jeans', category: 'Clothing', minPrice: 34.99, maxPrice: 59.99 },
  { name: 'Formal Shirt', category: 'Clothing', minPrice: 26.99, maxPrice: 49.99 },
  { name: 'Cotton Hoodie', category: 'Clothing', minPrice: 32.99, maxPrice: 54.99 },
  { name: "Men's Chino Trousers", category: 'Clothing', minPrice: 29.99, maxPrice: 49.99 },
  { name: 'Lightweight Knit Cardigan', category: 'Clothing', minPrice: 28.99, maxPrice: 48.99 },

  // Grocery (7)
  { name: 'Organic Green Tea', category: 'Grocery', minPrice: 6.49, maxPrice: 12.99 },
  { name: 'Premium Coffee Beans', category: 'Grocery', minPrice: 11.99, maxPrice: 22.99 },
  { name: 'Whole Wheat Flour', category: 'Grocery', minPrice: 4.49, maxPrice: 8.99 },
  { name: 'Cooking Oil', category: 'Grocery', minPrice: 5.99, maxPrice: 14.99 },
  { name: 'Raw Wildflower Honey', category: 'Grocery', minPrice: 8.99, maxPrice: 16.99 },
  { name: 'Basmati Long Grain Rice', category: 'Grocery', minPrice: 9.49, maxPrice: 18.99 },
  { name: 'Extra Virgin Olive Oil', category: 'Grocery', minPrice: 10.99, maxPrice: 21.99 },

  // Home & Kitchen (7)
  { name: 'Stainless Steel Water Bottle', category: 'Home & Kitchen', minPrice: 14.99, maxPrice: 26.99 },
  { name: 'Ceramic Coffee Mug', category: 'Home & Kitchen', minPrice: 8.99, maxPrice: 16.99 },
  { name: 'Kitchen Storage Container', category: 'Home & Kitchen', minPrice: 11.99, maxPrice: 24.99 },
  { name: 'Electric Kettle', category: 'Home & Kitchen', minPrice: 24.99, maxPrice: 44.99 },
  { name: 'Non-Stick Frying Pan', category: 'Home & Kitchen', minPrice: 22.99, maxPrice: 39.99 },
  { name: 'Bamboo Cutting Board', category: 'Home & Kitchen', minPrice: 13.99, maxPrice: 24.99 },
  { name: 'Digital Kitchen Scale', category: 'Home & Kitchen', minPrice: 15.99, maxPrice: 29.99 },

  // Beauty & Personal Care (6)
  { name: 'Face Wash', category: 'Beauty & Personal Care', minPrice: 7.99, maxPrice: 15.99 },
  { name: 'Moisturizing Cream', category: 'Beauty & Personal Care', minPrice: 10.99, maxPrice: 21.99 },
  { name: 'Sunscreen Lotion', category: 'Beauty & Personal Care', minPrice: 11.99, maxPrice: 22.99 },
  { name: 'Herbal Shampoo', category: 'Beauty & Personal Care', minPrice: 8.99, maxPrice: 16.99 },
  { name: 'Vitamin C Facial Serum', category: 'Beauty & Personal Care', minPrice: 14.99, maxPrice: 27.99 },
  { name: 'Shea Butter Body Lotion', category: 'Beauty & Personal Care', minPrice: 9.99, maxPrice: 18.99 },

  // Sports & Fitness (5)
  { name: 'Yoga Mat', category: 'Sports & Fitness', minPrice: 18.99, maxPrice: 34.99 },
  { name: 'Resistance Bands', category: 'Sports & Fitness', minPrice: 12.99, maxPrice: 24.99 },
  { name: 'Sports Water Bottle', category: 'Sports & Fitness', minPrice: 10.99, maxPrice: 19.99 },
  { name: 'Jump Rope Pro', category: 'Sports & Fitness', minPrice: 9.99, maxPrice: 18.99 },
  { name: 'Foam Roller', category: 'Sports & Fitness', minPrice: 16.99, maxPrice: 29.99 },

  // Accessories (5)
  { name: 'Leather Bi-Fold Wallet', category: 'Accessories', minPrice: 21.99, maxPrice: 39.99 },
  { name: 'Polarized Sunglasses', category: 'Accessories', minPrice: 19.99, maxPrice: 38.99 },
  { name: 'Laptop Backpack 15.6"', category: 'Accessories', minPrice: 34.99, maxPrice: 64.99 },
  { name: 'Braided Nylon Watch Strap', category: 'Accessories', minPrice: 11.99, maxPrice: 22.99 },
  { name: 'Canvas Tote Bag', category: 'Accessories', minPrice: 12.99, maxPrice: 24.99 },

  // Stationery (5)
  { name: 'A4 Notebook', category: 'Stationery', minPrice: 4.99, maxPrice: 9.99 },
  { name: 'Ballpoint Pen Set', category: 'Stationery', minPrice: 5.49, maxPrice: 11.99 },
  { name: 'Office File Organizer', category: 'Stationery', minPrice: 12.99, maxPrice: 24.99 },
  { name: 'Sticky Notes Multipack', category: 'Stationery', minPrice: 3.99, maxPrice: 7.99 },
  { name: 'Desk Pen Holder', category: 'Stationery', minPrice: 7.99, maxPrice: 14.99 },
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPrice(min, max) {
  const wholeDollars = randomInt(Math.floor(min), Math.floor(max));
  const centsOptions = [0.49, 0.99, 0.25, 0.75, 0.0];
  const cents = centsOptions[randomInt(0, centsOptions.length - 1)];
  const candidate = Number((wholeDollars + cents).toFixed(2));
  return Math.max(0.99, Math.min(Number(max.toFixed(2)), Math.max(Number(min.toFixed(2)), candidate)));
}

function buildStockLevels(count) {
  const levels = [];
  for (let i = 0; i < count; i += 1) {
    const roll = Math.random();
    if (roll < 0.1) {
      levels.push(0);
    } else if (roll < 0.28) {
      levels.push(randomInt(1, 10));
    } else {
      levels.push(randomInt(11, 85));
    }
  }

  // Ensure realistic representation of out-of-stock and low-stock items
  if (!levels.includes(0)) {
    levels[levels.length - 1] = 0;
  }
  if (!levels.some((qty) => qty >= 1 && qty <= 10)) {
    levels[0] = 4;
  }

  return levels;
}

export function generateProducts() {
  if (CATALOG_TEMPLATES.length !== 50) {
    throw new Error(`Expected 50 catalog templates, got ${CATALOG_TEMPLATES.length}`);
  }

  const stockLevels = buildStockLevels(CATALOG_TEMPLATES.length);

  return CATALOG_TEMPLATES.map((template, index) => {
    const idNumber = String(index + 1).padStart(3, '0');
    return {
      id: `PROD-${idNumber}`,
      name: template.name,
      price: randomPrice(template.minPrice, template.maxPrice),
      stock: stockLevels[index],
      category: template.category,
    };
  });
}

export function writeProductsFile(targetPath = outputPath) {
  const products = generateProducts();
  const dir = path.dirname(targetPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(targetPath, `${JSON.stringify(products, null, 2)}\n`, 'utf8');
  return products;
}

const isDirectExecution =
  process.argv[1] && path.resolve(process.argv[1]) === __filename;

if (isDirectExecution) {
  const products = writeProductsFile();
  console.log(`Generated ${products.length} products in ${path.relative(projectRoot, outputPath)}`);
}
