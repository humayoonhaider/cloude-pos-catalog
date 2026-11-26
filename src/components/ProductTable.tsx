import type { Product } from '../types/product';
import { formatPrice, getStockStatus, type StockTone } from '../utils/validateProducts';

interface ProductTableProps {
  products: Product[];
}

const STOCK_TONE_CLASSES: Record<StockTone, string> = {
  healthy: 'text-emerald-700',
  low: 'text-amber-700',
  out: 'text-red-700',
};

export function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table
        className="w-full border-collapse text-left"
        aria-label="Product catalog"
      >
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th
              scope="col"
              className="py-3 pl-3.5 pr-2 sm:px-6 text-xs font-semibold tracking-wide text-slate-600"
            >
              Name
            </th>
            <th
              scope="col"
              className="py-3 px-2 sm:px-6 text-right text-xs font-semibold tracking-wide text-slate-600 whitespace-nowrap"
            >
              Price
            </th>
            <th
              scope="col"
              className="py-3 pl-2 pr-3.5 sm:px-6 text-right text-xs font-semibold tracking-wide text-slate-600 whitespace-nowrap"
            >
              Stock
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {products.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            const toneClass = STOCK_TONE_CLASSES[stockStatus.tone];

            return (
              <tr
                key={product.id}
                className="transition-colors duration-150 hover:bg-slate-50/80"
              >
                <td className="py-3 pl-3.5 pr-2 sm:py-3.5 sm:px-6 align-middle">
                  <div className="text-sm font-medium text-slate-900 leading-snug">
                    {product.name}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    <span className="font-mono">{product.id}</span>
                    <span aria-hidden="true" className="mx-1.5 text-slate-300">
                      ·
                    </span>
                    <span>{product.category}</span>
                  </div>
                </td>
                <td className="py-3 px-2 sm:py-3.5 sm:px-6 text-right align-middle font-mono text-sm tabular-nums text-slate-900 whitespace-nowrap">
                  {formatPrice(product.price)}
                </td>
                <td className="py-3 pl-2 pr-3.5 sm:py-3.5 sm:px-6 text-right align-middle whitespace-nowrap">
                  <div className="inline-flex flex-col items-end sm:flex-row sm:items-baseline sm:justify-end sm:gap-3">
                    <span className="font-mono text-sm font-medium tabular-nums text-slate-900">
                      {product.stock}
                    </span>
                    <span
                      className={`text-[11px] sm:text-xs font-medium sm:min-w-[4.75rem] sm:text-right ${toneClass}`}
                    >
                      {stockStatus.label}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
