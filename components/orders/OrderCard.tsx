"use client";

// Importamos las librerias
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Order } from "@/src/types/orders";
import ChargeModal from "./ChargeModal";
import { UserIcon, ClockIcon, CheckIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { updateOrderStatus } from "@/actions/orders/update-order-status-action";

// Definimos las props
type OrderCardProps = {
    order: Order;
};

// Definimos el componente
export default function OrderCard({ order }: OrderCardProps) {
    const [isPending, startTransition] = useTransition();
    const [isChargeOpen, setIsChargeOpen] = useState(false);

    const formattedTime = new Date(order.createdAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const totalItemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

    function handleMarkAsDelivered() {
        startTransition(async () => {
            const result = await updateOrderStatus(order.id, "DELIVERED");
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        });
    }

    // Un Takeout listo y sin pagar necesita cobrarse (y se marca entregado al mismo tiempo)
    const needsCharge = order.type === "TAKEOUT" && order.status === "READY" && !order.paid;
    const label = order.type === "DINE_IN" && order.table ? `Table ${order.table.number}` : order.customerName || "Takeout";

    return (
        <>
            <div className="flex flex-col justify-between h-60 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shrink-0">
                {/* Header + Items */}
                <div className="flex flex-col min-h-0 flex-1">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800/60 shrink-0">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{label}</span>

                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50">
                                {order.type === "DINE_IN" ? "Dine in" : "Takeout"}
                            </span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                            <ClockIcon className="size-3.5" />
                            <span suppressHydrationWarning>{formattedTime}</span>
                        </div>
                    </div>

                    {/* Empleado */}
                    <div className="flex items-center gap-1 my-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 shrink-0">
                        <UserIcon className="size-3 shrink-0" />
                        <span className="truncate">
                            {order.employee.name} {order.employee.lastname}
                        </span>
                    </div>

                    {/* Lista de productos con scroll interno si hay muchos */}
                    <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5 truncate max-w-[78%]">
                                    <span className="font-bold text-zinc-900 dark:text-zinc-100 min-w-4">
                                        {item.quantity}x
                                    </span>
                                    <span className="text-zinc-700 dark:text-zinc-300 truncate">
                                        {item.variant.product.name}
                                    </span>
                                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                                        ({item.variant.name})
                                    </span>
                                </div>
                                <span className="text-zinc-500 dark:text-zinc-400 font-medium shrink-0">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer con Total y Botón de Acción */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-col gap-2 shrink-0 mt-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-zinc-500 dark:text-zinc-400">
                            {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
                        </span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">
                            Total: ${(Number(order.total) || 0).toFixed(2)}
                        </span>
                    </div>

                    {needsCharge && (
                        <button
                            type="button"
                            onClick={() => setIsChargeOpen(true)}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold bg-green-700 hover:bg-green-600 text-white shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
                        >
                            <CreditCardIcon className="size-3.5 stroke-[2.5]" />
                            Charge & Deliver
                        </button>
                    )}

                    {/* Dine In sigue el flujo normal: primero se marca entregado, se cobra después desde Tables */}
                    {order.type === "DINE_IN" && order.status === "READY" && (
                        <button
                            type="button"
                            onClick={handleMarkAsDelivered}
                            disabled={isPending}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 shadow-2xs transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                        >
                            <CheckIcon className="size-3.5 stroke-[2.5]" />
                            {isPending ? "Updating..." : "Mark as Delivered"}
                        </button>
                    )}
                </div>
            </div>

            <ChargeModal
                customerLabel={label}
                orders={[order]}
                isOpenModal={isChargeOpen}
                onClose={() => setIsChargeOpen(false)}
            />
        </>
    );
}