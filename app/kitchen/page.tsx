// Importamos las librerias
import { Metadata } from "next";
import { getOrders } from "@/lib/orders";
import { ClipboardDocumentListIcon, ClockIcon, FireIcon } from "@heroicons/react/24/outline";
import KitchenOrderCard from "@/components/kitchen/KitchenOrderCard";
import { OrderStatus } from "@/src/types/orders";

// MetaData
export const metadata: Metadata = {
    title: "Kitchen | BrewKoffee",
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
            title: "Incoming",
            description: "New orders waiting to be accepted",
            badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
            icon: ClockIcon,
        },
        {
            id: "IN_PROGRESS",
            title: "Preparing",
            description: "Currently being cooked",
            badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
            icon: FireIcon,
        },
    ];

export default async function KitchenPage() {
    const orders = await getOrders();

    // Kitchen solo trabaja con órdenes pendientes o en preparación
    const kitchenOrders = orders.filter((order) => order.status === "PENDING" || order.status === "IN_PROGRESS");

    // Agrupamos las órdenes por su estado
    const ordersByStatus = kitchenOrders.reduce((acc, order) => {
        if (!acc[order.status]) {
            acc[order.status] = [];
        }
        acc[order.status].push(order);
        return acc;
    }, {} as Record<string, typeof kitchenOrders>);

    return (
        <div className="h-full flex flex-col p-6 overflow-hidden">
            {/* Header de la vista */}
            <div className="flex flex-col gap-1 mb-6 shrink-0">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Orders board</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Accept incoming orders and mark them ready when done.</p>
            </div>

            {/* Si no hay NINGUNA orden en curso */}
            {kitchenOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
                    <div className="flex items-center justify-center size-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 mb-3 border border-zinc-200/50 dark:border-zinc-700/50">
                        <ClipboardDocumentListIcon className="size-6 stroke-[1.5]" />
                    </div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">No orders right now</h3>
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">New orders will show up here as they come in.</p>
                </div>
            ) : (
                /* Layout de Columnas Kanban */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0 overflow-x-auto pb-2">
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

                                {/* Lista apilada de Tarjetas con SCROLL habilitado */}
                                <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 min-h-0">
                                    {colOrders.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center flex-1 text-center py-12 px-4 select-none my-auto">
                                            <div className="flex items-center justify-center size-10 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500 mb-2 border border-zinc-200/40 dark:border-zinc-700/40">
                                                <Icon className="size-5 stroke-[1.5]" />
                                            </div>
                                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                                No orders in {col.title.toLowerCase()}
                                            </p>
                                        </div>
                                    ) : (
                                        colOrders.map((order) => (
                                            <KitchenOrderCard key={order.id} order={order} />
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}