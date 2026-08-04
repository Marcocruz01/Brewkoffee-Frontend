// Importamos las librerias
import { Order } from "@/src/types/orders";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";

export default function RecentOrders({ orders }: { orders: Order[] }) {
    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
            <div className="flex flex-col gap-1 mb-4">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">Recent orders</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">The latest activity across the floor.</p>
            </div>

            {orders.length === 0 ? (
                <p className="text-sm text-zinc-400 dark:text-zinc-500 py-6 text-center">No orders yet.</p>
            ) : (
                <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800/50">
                    {orders.map((order) => {
                        const time = new Date(order.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
                        const label = order.type === "DINE_IN" ? `Table ${order.table?.number}` : order.customerName || "Takeout";

                        return (
                            <div key={order.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-zinc-900 dark:text-white">{label}</span>
                                    <span className="text-xs text-zinc-400 dark:text-zinc-500">{time} · ${order.total.toFixed(2)}</span>
                                </div>
                                <OrderStatusBadge status={order.status} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}