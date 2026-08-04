// Importamos las librerias
import { apiFetch } from "@/lib/fetcher";
import { Product } from "@/src/types/products";

// Función para obtener todos los productos
export function getProducts() {
    return apiFetch<Product[]>("/products", { cache: "no-store" });
}

// Función para obtener un producto por ID 
export function getProductById(id: string) {
    return apiFetch<Product>(`/products/${id}`, { cache: "no-store" });
}