// Importamos las librerias
import { Metadata } from "next";
import { getOrders } from "@/lib/orders";
import OrderHistoryTable from "@/components/orders/OrderHistoryTable";

export const metadata: Metadata = {
    title: "Order History | BrewKoffee",
};

export default async function OrderHistoryPage() {
    const orders = await getOrders();

    // Historial = solo órdenes que ya terminaron su ciclo (entregadas o canceladas)
    const historyOrders = orders
        .filter((order) => order.status === "DELIVERED" || order.status === "CANCELLED")
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="h-full overflow-y-auto p-6">
            <div className="flex flex-col gap-1 mb-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Order history</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Every completed and cancelled order.</p>
            </div>

            <OrderHistoryTable orders={historyOrders} />
        </div>
    )
}