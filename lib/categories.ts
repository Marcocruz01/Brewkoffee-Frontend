// Importamos las librerias
import { apiFetch } from "@/lib/fetcher";
import { Category } from "@/src/types/categories";

// Definimos la funcion del get
export function getCategories() {
    return apiFetch<Category[]>("/categories", { cache: "no-store" });
}