// Importamos las librerias
import { Metadata } from "next";
import Link from "next/link";
import { getOrders } from "@/lib/orders";
import { ClockIcon, SparklesIcon, CheckCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import OrderCard from "@/components/orders/OrderCard";
import { OrderStatus } from "@/src/types/orders";

// MetaData
export const metadata: Metadata = {
    title: "Status Orders | BrewKoffee",
};

const COLUMNS_CONFIG: {
    id: OrderStatus;
    title: string;
    description: string;
    badge: string;
    icon: React.ElementType;
}[] = [
        {
            id: "PENDING",
            title: "Pending",
            description: "Received, waiting for kitchen",
            badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
            icon: ClockIcon,
        },
        {
            id: "IN_PROGRESS",
            title: "In Preparation",
            description: "Currently being prepared",
            badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
            icon: SparklesIcon,
        },
        {
            id: "READY",
            title: "Ready to Serve",
            description: "Waiting for pickup or delivery",
            badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
            icon: CheckCircleIcon,
        },
    ];

export default async function StatusOrdersPage() {
    const orders = await getOrders();

    // Filtramos solo las órdenes activas
    const activeOrders = orders.filter((order) => order.status !== "DELIVERED" && order.status !== "CANCELLED");

    // Agrupamos las órdenes por su estado
    const ordersByStatus = activeOrders.reduce((acc, order) => {
        if (!acc[order.status]) {
            acc[order.status] = [];
        }
        acc[order.status].push(order);
        return acc;
    }, {} as Record<string, typeof activeOrders>);

    return (
        <div className="h-full flex flex-col p-6 overflow-hidden">
            {/* Header de la vista con Botón de Acción rápida */}
            <div className="flex items-center justify-between mb-6 shrink-0">
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2.5">
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Manage your orders</h1>
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/80">
                            {activeOrders.length} active
                        </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Track and manage order statuses in real-time.</p>
                </div>

                {/* Botón para crear orden rápido */}
                <Link
                    href="/orders"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-2xs transition-all active:scale-[0.98]"
                >
                    <PlusIcon className="size-4 stroke-[2.5]" />
                    New Order
                </Link>
            </div>

            {/* Layout Kanban SIEMPRE VISIBLE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0 overflow-x-auto pb-2">
                {COLUMNS_CONFIG.map((col) => {
                    const colOrders = ordersByStatus[col.id] || [];
                    const Icon = col.icon;

                    return (
                        <div
                            key={col.id}
                            className="flex flex-col h-full min-w-75 rounded-2xl bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 p-4 overflow-hidden"
                        >
                            {/* Header de la Columna */}
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200/80 dark:border-zinc-800/80 shrink-0">
                                <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-lg border ${col.badge}`}>
                                        <Icon className="size-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                                            {col.title}
                                        </h2>
                                        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                                            {col.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Counter Pill */}
                                <span className="inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-md bg-white dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/60 shadow-2xs">
                                    {colOrders.length}
                                </span>
                            </div>

                            {/* Contenido de la columna */}
                            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 min-h-0">
                                {colOrders.length === 0 ? (
                                    /* Empty State minimalista interno dentro de cada columna */
                                    <div className="flex flex-col items-center justify-center flex-1 text-center py-12 px-4 select-none my-auto rounded-xl border border-dashed border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/20">
                                        <div className="flex items-center justify-center size-9 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500 mb-2 border border-zinc-200/40 dark:border-zinc-700/40">
                                            <Icon className="size-4 stroke-[1.5]" />
                                        </div>
                                        <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                                            No orders in {col.title.toLowerCase()}
                                        </p>
                                        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                                            Waiting for new tickets...
                                        </p>
                                    </div>
                                ) : (
                                    colOrders.map((order) => (
                                        <OrderCard key={order.id} order={order} />
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}