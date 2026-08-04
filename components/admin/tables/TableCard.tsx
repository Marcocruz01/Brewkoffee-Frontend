"use client"

// Importamos las librerias
import { Table, TableStatus } from "@/src/types/tables";
import { UsersIcon, MapPinIcon } from "@heroicons/react/24/outline";
import TableActions from "./TablesActions";

// Estilos por estado (borde + badge)
const statusStyles: Record<TableStatus, { badge: string; label: string }> = {
    AVAILABLE: {
        badge: "bg-green-500/10 text-green-600 dark:text-green-400",
        label: "Available",
    },
    OCCUPIED: {
        badge: "bg-red-500/10 text-red-600 dark:text-red-400",
        label: "Occupied",
    },
    RESERVED: {
        badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        label: "Reserved",
    },
}

// Labels de zona
const zoneLabels: Record<string, string> = {
    INDOOR: "Indoor",
    OUTDOOR: "Outdoor",
    TERRACE: "Terrace",
    BAR: "Bar",
}

type TableCardProps = {
    table: Table;
}

export default function TableCard({ table }: TableCardProps) {
    const status = statusStyles[table.status];

    return (
        <div
            className={`bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800/70 p-4 flex flex-col gap-3 transition-shadow hover:shadow-md`}
        >
            {/* Header: número + acciones */}
            <div className="flex items-start justify-between">
                <div className="flex flex-col">
                    <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                        Table
                    </span>
                    <span className="text-3xl font-bold text-zinc-900 dark:text-white leading-tight">
                        #{table.number}
                    </span>
                </div>
                <TableActions table={table} />
            </div>

            {/* Estado */}
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${status.badge}`}>
                {status.label}
            </span>

            {/* Detalles: capacidad + zona */}
            <div className="flex items-center gap-4 mt-1 pt-3 border-t border-zinc-100 dark:border-zinc-800/50">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    <UsersIcon className="size-4" />
                    <span>{table.capacity} seats</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    <MapPinIcon className="size-4" />
                    <span>{zoneLabels[table.zone]}</span>
                </div>
            </div>
        </div>
    )
}