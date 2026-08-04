// Importamos las librerias
import { apiFetch } from "@/lib/fetcher";
import { Order } from "@/src/types/orders";

// Obtiene todas las órdenes, opcionalmente filtradas por status
export function getOrders(status?: string) {
    const query = status ? `?status=${status}` : "";
    return apiFetch<Order[]>(`/orders${query}`, { cache: "no-store" });
}

// Obtiene las órdenes activas de una mesa específica
export function getOrdersByTable(tableId: string) {
    return apiFetch<Order[]>(`/orders/table/${tableId}`, { cache: "no-store" });
}