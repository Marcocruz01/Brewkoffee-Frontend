// Importamos las librerias
import ProductCard from "./ProductCard";
import { Product } from "@/src/types/products";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";

type ProductsGridProps = {
    data: Product[];
}

export default function ProductsGrid({ data }: ProductsGridProps) {
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-72 rounded-xl bg-white dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/50 ring-1 ring-zinc-200 dark:ring-zinc-700/50 mb-4">
                    <ArchiveBoxIcon className="size-6 text-zinc-500 dark:text-zinc-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
                    No products found
                </h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Try adjusting your filters or add a new product.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {data.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}