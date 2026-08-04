// Importamos las librerias
import { apiFetch } from "@/lib/fetcher";
import { Employee } from "@/src/types/employees";

// Definimos la funcion del get
export function getEmployees() {
  return apiFetch<Employee[]>("/employees", { cache: "no-store" });
}