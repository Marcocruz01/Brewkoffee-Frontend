// Importamos las librerias
import TableCard from "./TableCard";
import { Table } from "@/src/types/tables";
import { TableCellsIcon } from "@heroicons/react/24/outline";

// Definimos la prop
type TablesGridProps = {
    data: Table[];
}

// Definimos el componente
export default function TablesGrid({ data }: TablesGridProps) {
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-72 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/50 ring-1 ring-zinc-200 dark:ring-zinc-700/50 mb-4">
                    <TableCellsIcon className="size-6 text-zinc-500 dark:text-zinc-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
                    No tables registered
                </h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Start by setting up your first table.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {data.map((table) => (
                <TableCard key={table.id} table={table} />
            ))}
        </div>
    )
}