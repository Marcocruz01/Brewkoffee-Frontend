"use client"

// Importamos las librerias
import { columns } from "./columns";
import { Employee } from "@/src/types/employees";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Definimos los types
type DataTableProps = {
    data: Employee[];
}

// Definimos el componente de la tabla
export default function DataTable({ data }: DataTableProps) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="border-zinc-200 dark:border-zinc-800"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-zinc-500 dark:text-zinc-400 text-xs font-medium"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="border-zinc-200 dark:border-zinc-800"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-72 text-center">
                                    <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800/50 ring-1 ring-zinc-200 dark:ring-zinc-700/50 mb-4">
                                            <UserGroupIcon className="size-6 text-zinc-500 dark:text-zinc-400" />
                                        </div>

                                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
                                            No employees registered
                                        </h3>

                                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                            Looks like you haven&apos;t added any staff yet. Start by creating your first record.
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-6">
                <p className="text-sm text-zinc-500 dark:text-zinc-500 w-max">
                    Currently{" "}
                    <span className="text-zinc-950 dark:text-zinc-200 font-medium">
                        {data.length} employee{data.length !== 1 ? "s" : ""}
                    </span>{" "}
                    active at this location
                </p>
            </div>
        </>
    )
}