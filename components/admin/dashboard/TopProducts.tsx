// Importamos las librerias
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";

type TopProductsProps = {
    products: { name: string; image: string | null; quantity: number }[];
}

export default function TopProducts({ products }: TopProductsProps) {
    const maxQty = products[0]?.quantity ?? 1;

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
            <div className="flex flex-col gap-1 mb-4">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">Top products</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Best sellers by quantity.</p>
            </div>

            {products.length === 0 ? (
                <p className="text-sm text-zinc-400 dark:text-zinc-500 py-6 text-center">No sales data yet.</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {products.map((product, index) => (
                        <div key={product.name} className="flex items-center gap-3">
                            <div className="relative size-9 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-800/50 shrink-0">
                                {product.image ? (
                                    <Image src={product.image} alt={product.name} fill className="object-cover" sizes="36px" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <PhotoIcon className="size-4 text-zinc-300 dark:text-zinc-700" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                                        {index + 1}. {product.name}
                                    </span>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0">{product.quantity} sold</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                                    <div
                                        className="h-full bg-amber-500 rounded-full"
                                        style={{ width: `${(product.quantity / maxQty) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}