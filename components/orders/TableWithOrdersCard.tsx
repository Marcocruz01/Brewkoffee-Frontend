"use client";

// Importamos las librerias
import { useState } from "react";
import { Table } from "@/src/types/tables";
import { Order } from "@/src/types/orders";
import ChargeModal from "./ChargeModal";
import { BanknotesIcon, UsersIcon } from "@heroicons/react/24/outline";
import OrderStatusBadge from "./OrderStatusBadge";

// Definimos las props
type TableWithOrdersCardProps = {
    table: Table;
    orders: Order[];
};

// Definimos el componente
export default function TableWithOrdersCard({ table, orders }: TableWithOrdersCardProps) {
    const [isChargeOpen, setIsChargeOpen] = useState(false);
    const total = orders.reduce((sum, order) => sum + order.total, 0);

    const isOccupied = table.status === "OCCUPIED";

    // Solo se puede cobrar cuando TODAS las órdenes activas ya fueron entregadas
    const allDelivered = orders.length > 0 && orders.every((order) => order.status === "DELIVERED");

    return (
        <div className="flex flex-col justify-between h-52 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs hover:border-zinc-800 dark:hover:border-zinc-50 transition-colors select-none">
            {/* Header + Info + Lista de Órdenes */}
            <div className="flex flex-col min-h-0 flex-1">
                {/* Header de la Tarjeta */}
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/60 shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-zinc-900 dark:text-white">
                            Table {table.number}
                        </span>

                        {/* Dot Indicador de Estado */}
                        <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${isOccupied
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                }`}
                        >
                            <span
                                className={`size-1.5 rounded-full ${isOccupied ? "bg-amber-500" : "bg-emerald-500 animate-pulse"
                                    }`}
                            />
                            {isOccupied ? "Occupied" : "Available"}
                        </span>
                    </div>

                    {/* Capacidad */}
                    <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                        <UsersIcon className="size-3.5" />
                        <span>{table.capacity}</span>
                    </div>
                </div>

                {/* Zona de la Mesa */}
                <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 mt-2 shrink-0">
                    Zone: <span className="text-zinc-700 dark:text-zinc-300 capitalize">{table.zone.toLowerCase()}</span>
                </p>

                {/* Lista de Órdenes (Scrollable internamente si hay varias) */}
                {isOccupied && orders.length > 0 && (
                    <div className="flex-1 overflow-y-auto flex flex-col gap-1.5 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 pr-1 scrollbar-thin">
                        {orders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between text-xs pr-1.5 gap-9">
                                <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                                    {order.items.length} {order.items.length === 1 ? "product" : "products"}
                                </span>
                                <OrderStatusBadge status={order.status} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer con Total y Botón Charge (solo si TODO ya se entregó) */}
            {isOccupied && orders.length > 0 && allDelivered && (
                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-zinc-100 dark:border-zinc-800/60 shrink-0">
                    <div>
                        <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Total</p>
                        <span className="text-sm font-bold text-zinc-900 dark:text-white leading-none">
                            ${total.toFixed(2)}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsChargeOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition-all shadow-2xs active:scale-[0.98] cursor-pointer"
                    >
                        <BanknotesIcon className="size-4 stroke-2" />
                        Charge
                    </button>
                </div>
            )}

            {/* Mesa ocupada pero aún falta entregar algo */}
            {isOccupied && orders.length > 0 && !allDelivered && (
                <div className="pt-2.5 mt-2 border-t border-zinc-100 dark:border-zinc-800/60 text-center shrink-0">
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
                        Waiting for items to be delivered
                    </span>
                </div>
            )}

            {/* Mesa disponible, sin órdenes */}
            {!isOccupied && (
                <div className="pt-2.5 mt-2 border-t border-zinc-100 dark:border-zinc-800/60 text-center shrink-0">
                    <span className="text-xs text-zinc-400 dark:text-zinc-600 font-medium">Ready for guests</span>
                </div>
            )}

            <ChargeModal
                customerLabel={`Table ${table.number}`}
                orders={orders}
                isOpenModal={isChargeOpen}
                onClose={() => setIsChargeOpen(false)}
            />
        </div>
    );
}