"use client";

import { useMemo, useState } from "react";
import { Table, TableZone } from "@/src/types/tables";
import { UserGroupIcon } from "@heroicons/react/24/outline";

type TableStepProps = {
    tables: Table[];
    onSelect: (tableId: string) => void;
};

const zones: { value: TableZone | "ALL"; label: string }[] = [
    { value: "ALL", label: "All" },
    { value: "INDOOR", label: "Indoor" },
    { value: "OUTDOOR", label: "Outdoor" },
    { value: "TERRACE", label: "Terrace" },
    { value: "BAR", label: "Bar" },
];

// Configuración de badges e indicadores por estado
const statusConfig: Record<
    Table["status"],
    { label: string; badge: string; dot: string; cardHover: string }
> = {
    AVAILABLE: {
        label: "Available",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
        dot: "bg-emerald-500",
        cardHover: "hover:border-zinc-950 dark:hover:border-zinc-100 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 hover:shadow-md",
    },
    OCCUPIED: {
        label: "Occupied · Add order",
        badge: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
        dot: "bg-amber-500",
        cardHover: "hover:border-zinc-950 dark:hover:border-zinc-100 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 hover:shadow-md",
    },
    RESERVED: {
        label: "Reserved",
        badge: "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
        dot: "bg-rose-500",
        cardHover: "cursor-not-allowed opacity-70 bg-rose-50/20 dark:bg-rose-950/10 border-rose-200/60 dark:border-rose-900/30",
    },
};

export default function TableStep({ tables, onSelect }: TableStepProps) {
    const [zone, setZone] = useState<TableZone | "ALL">("ALL");

    const filteredTables = useMemo(() => {
        return tables
            .filter((table) => zone === "ALL" || table.zone === zone)
            .sort((a, b) => a.number - b.number);
    }, [tables, zone]);

    return (
        <div className="flex flex-col h-full p-6 overflow-y-auto">
            {/* Contenedor de Filtros */}
            <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800 rounded-xl w-fit overflow-x-auto scrollbar-none mb-6">
                {zones.map((z) => {
                    const isSelected = zone === z.value;
                    return (
                        <button
                            key={z.value}
                            type="button"
                            onClick={() => setZone(z.value)}
                            className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${isSelected
                                    ? "bg-zinc-900 text-zinc-50 shadow-2xs dark:bg-white dark:text-zinc-900 dark:shadow-none"
                                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50"
                                }`}
                        >
                            {z.label}
                        </button>
                    );
                })}
            </div>

            {/* Grid de Mesas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredTables.map((table) => {
                    const config = statusConfig[table.status];
                    const isReserved = table.status === "RESERVED";

                    return (
                        <button
                            key={table.id}
                            type="button"
                            disabled={isReserved}
                            onClick={() => onSelect(table.id)}
                            className={`flex flex-col justify-between p-4 min-h-27.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-left cursor-pointer transition-all duration-200 active:scale-[0.98] ${config.cardHover}`}
                        >
                            {/* Cabecera: Número de mesa y capacidad (Texto Fijo sin cambios en Hover) */}
                            <div className="flex items-center justify-between w-full">
                                <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                                    Table {table.number}
                                </span>

                                <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                                    <UserGroupIcon className="size-3.5" />
                                    <span>{table.capacity}</span>
                                </div>
                            </div>

                            {/* Estado con Indicador Dot */}
                            <div className="mt-3">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.badge}`}>
                                    <span className={`size-1.5 rounded-full ${config.dot}`} />
                                    {config.label}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}