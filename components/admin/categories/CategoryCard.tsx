"use client"

// Importamos las librerias
import CategoryActions from "./CategoryActions";
import { Category } from "@/src/types/categories";
import { TagIcon } from "@heroicons/react/24/outline";

// Definimos las props
type CategoryCardProps = {
    category: Category;
}

// Definimos el componente
export default function CategoryCard({ category }: CategoryCardProps) {
    const productCount = category._count?.products ?? 0;

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800/70 p-4 flex flex-col gap-3 transition-shadow hover:shadow-md">
            {/* Header: ícono + acciones */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10">
                        <TagIcon className="size-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    {/* Nombre */}
                    <span className="text-base font-semibold text-zinc-900 dark:text-white leading-tight">
                        {category.name}
                    </span>
                </div>

                <CategoryActions category={category} />
            </div>

            {/* Conteo de productos */}
            <div className="flex items-center gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/50">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {productCount} product{productCount !== 1 ? "s" : ""}
                </span>
            </div>
        </div>
    )
}