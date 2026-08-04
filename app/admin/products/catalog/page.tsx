// Importamos las librerias
import { Metadata } from "next";
import { getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import AddProductButton from "@/components/admin/products/AddProductButton"
import ProductsCatalog from "@/components/admin/products/ProductsCatalog";

// Definimos el MetaData
export const metadata: Metadata = {
  title: "Catalog | Brewkoffee",
  description: "Manage your products and keep them up to date at all times"
}

// Definimos la vista
export default async function CatalogPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* TEXTO INFORMATIVO */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Product Catalog
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage your coffee bar blends, snacks, and sweet treats along with their custom variants.
          </p>
        </div>

        {/* Boton de la accion para agregar una categoría */}
        <div className="w-full md:w-auto shrink-0">
          <AddProductButton categories={categories} />
        </div>
      </div>

      {/* Catalogo de productos */}
      <div className="mt-10">
        <ProductsCatalog data={products} categories={categories} />
      </div>
    </>
  )
}
