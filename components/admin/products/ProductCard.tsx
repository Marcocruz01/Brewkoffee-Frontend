// Importamos las librerias
import Image from "next/image";
import { Product } from "@/src/types/products";
import { PhotoIcon } from "@heroicons/react/24/outline";
import ProductActions from "./ProductActions";

type ProductCardProps = {
    product: Product;
}

// Calcula el rango de precio a partir de las variantes
function getPriceRange(product: Product) {
    const prices = product.variants.map((v) => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    if (min === max) return `$${min.toFixed(2)}`;
    return `$${min.toFixed(2)} - $${max.toFixed(2)}`;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-3 transition-shadow hover:shadow-md hover:shadow-zinc-200/60 dark:hover:shadow-none">
            {/* Imagen */}
            <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-800/50">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <PhotoIcon className="size-8 text-zinc-300 dark:text-zinc-700" />
                    </div>
                )}

                <span
                    className={`absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm ${product.active
                        ? "bg-emerald-50/90 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                        : "bg-zinc-100/90 text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400"
                        }`}
                >
                    {product.active ? "Active" : "Inactive"}
                </span>

                <div className="absolute top-2 right-2">
                    <ProductActions product={product} />
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-0.5 pt-3 px-0.5">
                <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 uppercase">
                    {product.category.name}
                </span>
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                    {product.name}
                </h2>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {getPriceRange(product)}
                </p>
            </div>
        </div>
    )
}