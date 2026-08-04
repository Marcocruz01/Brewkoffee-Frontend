// Importamos las librerias
import { Metadata } from "next";
import { getTables } from "@/lib/tables";
import { getOrders } from "@/lib/orders";
import TablesGrid from "@/components/orders/TablesGrid";
import { Order } from "@/src/types/orders";

export const metadata: Metadata = {
    title: "Tables | BrewKoffee",
};

export default async function TablesPage() {
    const [tables, orders] = await Promise.all([getTables(), getOrders()]);

    // Agrupamos las órdenes activas (no canceladas) por mesa, para no hacer un fetch por cada una
    const ordersByTable: Record<string, Order[]> = {};
    for (const order of orders) {
        if (order.status === "CANCELLED" || order.paid || !order.table) continue;
        if (!ordersByTable[order.table.id]) ordersByTable[order.table.id] = [];
        ordersByTable[order.table.id].push(order);
    }

    return (
        <div className="h-full overflow-y-auto p-6">
            <div className="flex flex-col gap-1 mb-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Tables</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Current status, active orders, and payments.</p>
            </div>

            <TablesGrid tables={tables} ordersByTable={ordersByTable} />
        </div>
    )
}