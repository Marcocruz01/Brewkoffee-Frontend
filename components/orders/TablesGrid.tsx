"use client";

// Importamos las librerias
import { useMemo, useState } from "react";
import { Table, TableZone } from "@/src/types/tables";
import { Order } from "@/src/types/orders";
import TableWithOrdersCard from "./TableWithOrdersCard";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

// Definimos las porps
type TablesGridProps = {
    tables: Table[];
    ordersByTable: Record<string, Order[]>;
};

// Definicion de nombres labes por zona
const ZONES: { value: TableZone | "ALL"; label: string }[] = [
    { value: "ALL", label: "All zones" },
    { value: "INDOOR", label: "Indoor" },
    { value: "OUTDOOR", label: "Outdoor" },
    { value: "TERRACE", label: "Terrace" },
    { value: "BAR", label: "Bar" },
];

// Definimos el componente
export default function TablesGrid({ tables, ordersByTable }: TablesGridProps) {
    const [zone, setZone] = useState<TableZone | "ALL">("ALL");

    // Filtrado y ordenamiento de mesas
    const filteredTables = useMemo(() => {
        return tables
            .filter((table) => zone === "ALL" || table.zone === zone)
            .sort((a, b) => a.number - b.number);
    }, [tables, zone]);

    // Conteo rápido de mesas por zona
    const zoneCounts = useMemo(() => {
        const counts: Record<string, number> = { ALL: tables.length };
        tables.forEach((t) => {
            counts[t.zone] = (counts[t.zone] || 0) + 1;
        });
        return counts;
    }, [tables]);

    return (
        <div className="flex flex-col gap-6">
            {/* Contenedor compacto que ajusta su ancho al contenido (w-fit) */}
            <div className="flex">
                <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shrink-0">
                    {ZONES.map((z) => {
                        const isSelected = zone === z.value;
                        const count = zoneCounts[z.value] || 0;

                        return (
                            <button
                                key={z.value}
                                type="button"
                                onClick={() => setZone(z.value)}
                                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer select-none ${isSelected
                                        /* Light: Fondo Negro + Texto Blanco | Dark: Fondo Blanco + Texto Negro */
                                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-2xs"
                                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                                    }`}
                            >
                                <span>{z.label}</span>

                                {/* Badge con la cantidad de mesas por zona */}
                                <span
                                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold transition-colors ${isSelected
                                            /* Badges invertidos según el fondo activo */
                                            ? "bg-zinc-800 text-zinc-100 dark:bg-zinc-200 dark:text-zinc-900"
                                            : "bg-zinc-200/80 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                                        }`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Grid de Mesas o Empty State */}
            {filteredTables.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 text-center">
                    <div className="flex items-center justify-center size-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 mb-3 border border-zinc-200/50 dark:border-zinc-700/50">
                        <Squares2X2Icon className="size-5 stroke-[1.5]" />
                    </div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                        No tables in this zone
                    </h3>
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        There are currently no tables assigned to the selected area.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredTables.map((table) => (
                        <TableWithOrdersCard
                            key={table.id}
                            table={table}
                            orders={ordersByTable[table.id] || []}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}