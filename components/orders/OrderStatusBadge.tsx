// Importamos las librerias
import { OrderStatus } from "@/src/types/orders";

const statusStyles: Record<OrderStatus, string> = {
    PENDING: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    IN_PROGRESS: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    READY: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    DELIVERED: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200/60 dark:border-zinc-700/60",
    CANCELLED: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

const statusLabels: Record<OrderStatus, string> = {
    PENDING: "Pending",
    IN_PROGRESS: "In Preparation",
    READY: "Ready",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
    return (
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border w-auto ${statusStyles[status]}`}>
            {statusLabels[status]}
        </span>
    );
}