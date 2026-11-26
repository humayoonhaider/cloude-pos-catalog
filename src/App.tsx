import rawProducts from '../data/products.json';
import { ProductTable } from './components/ProductTable';
import { validateProducts } from './utils/validateProducts';

export default function App() {
  const validation = validateProducts(rawProducts);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="mb-8 border-b border-slate-200 pb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl [text-wrap:balance]">
              Cloud POS Catalog
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 sm:text-base">
              Manage and view your retail product catalog.
            </p>
          </div>
          {validation.valid && (
            <p className="text-sm font-medium text-slate-500 tabular-nums whitespace-nowrap shrink-0">
              {validation.products.length} products
            </p>
          )}
        </header>

        <main>
          {validation.valid ? (
            <ProductTable products={validation.products} />
          ) : (
            <section
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-6 text-slate-900"
            >
              <h2 className="text-base font-semibold text-red-900">
                Unable to load product catalog
              </h2>
              <p className="mt-1 text-sm text-red-800">
                The catalog dataset in <code className="font-mono">data/products.json</code> is missing or invalid. Run{' '}
                <code className="font-mono">npm run generate:products</code> to regenerate 50 valid sample products.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-red-800">
                {validation.errors.slice(0, 5).map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
