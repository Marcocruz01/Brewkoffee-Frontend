// Importamos las librerias
import { Metadata } from "next";
import { getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import { getTables } from "@/lib/tables";
import Wizard from "@/components/orders/Wizard";

// Definimos el metadata
export const metadata: Metadata = {
    title: "New Order | BrewKoffee",
    description: "Take orders and send them straight to the kitchen.",
};

// Definimos la vista
export default async function WaiterPage() {
    const [products, categories, tables] = await Promise.all([
        getProducts(),
        getCategories(),
        getTables(),
    ]);

    // Retornamos el wizard con los datos correspondientes
    return <Wizard products={products} categories={categories} tables={tables} />;
}