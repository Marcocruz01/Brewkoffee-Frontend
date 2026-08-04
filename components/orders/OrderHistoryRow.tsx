// Importamos las librerias
import { Order } from "@/src/types/orders";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderHistoryRow({ order }: { order: Order }) {
    const time = new Date(order.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const itemsSummary = order.items
        .map((item) => `${item.quantity}x ${item.variant.product.name}`)
        .join(", ");

    return (
        <div className="grid grid-cols-[100px_180px_1fr_90px_110px_130px] items-center gap-3 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {order.type === "DINE_IN" ? "Dine in" : "Takeout"}
            </span>

            <span className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                {order.type === "DINE_IN" ? `Table ${order.table?.number}` : order.customerName || "—"}
            </span>

            <span className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{itemsSummary}</span>

            <span className="text-sm font-semibold text-zinc-900 dark:text-white">${order.total.toFixed(2)}</span>

            <OrderStatusBadge status={order.status} />

            <span className="text-xs text-zinc-400 dark:text-zinc-500">{time}</span>
        </div>
    )
}