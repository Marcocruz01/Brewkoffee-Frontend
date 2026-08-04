// Importamos las librerias
import { apiFetch } from "@/lib/fetcher";
import { Table } from "@/src/types/tables";

// Definimos la funcion del get
export function getTables() {
  return apiFetch<Table[]>("/tables", { cache: "no-store" });
}