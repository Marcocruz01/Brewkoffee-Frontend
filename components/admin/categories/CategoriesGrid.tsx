// Importamos las librerias
import CategoryCard from "./CategoryCard";
import { Category } from "@/src/types/categories";
import { TagIcon } from "@heroicons/react/24/outline";

// Definimos las props
type CategoriesGridProps = {
    data: Category[];
}

// Definimos el componente de grid
export default function CategoriesGrid({ data }: CategoriesGridProps) {
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-72 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/50 ring-1 ring-zinc-200 dark:ring-zinc-700/50 mb-4">
                    <TagIcon className="size-6 text-zinc-500 dark:text-zinc-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
                    No categories yet
                </h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Start by creating your first category.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols- sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((category) => (
                <CategoryCard key={category.id} category={category} />
            ))}
        </div>
    )
}