// Importamos las librerias
import { Metadata } from "next";
import { getCategories } from "@/lib/categories";
import CategoriesGrid from "@/components/admin/categories/CategoriesGrid";
import AddCategoryButton from "@/components/admin/categories/AddCategoryButton";

// Definimos el metadata
export const metadata: Metadata = {
    title: "Categories | BrewKoffee",
    description: "Organize your products into categories for easier management.",
};

// Definimos la vista
export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                {/* TEXTO INFORMATIVO */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        Shape your menu
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Group your products into <span className="text-zinc-900 dark:text-zinc-50 font-medium">categories</span> to keep your catalog clear and easy to navigate.
                    </p>
                </div>

                {/* Boton de la accion para agregar una categoría */}
                <div className="w-full md:w-auto shrink-0">
                    <AddCategoryButton />
                </div>
            </div>

            <div className="mt-10">
                <CategoriesGrid data={categories} />
            </div>
        </>
    )
}