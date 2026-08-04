"use client"

// Importamos las librerias
import { useState } from "react";
import { toast } from "sonner";
import { Table, TableStatus } from "@/src/types/tables";
import EditTableModal from "./EditTableModal";
import { deleteTable } from "@/actions/table/delete-table-action";
import { updateTableStatus } from "@/actions/table/update-table-status-action";
import { EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal } from "@/components/ui/dropdown-menu";

// Estados disponibles para el submenu de cambio rápido
const statusOptions: { value: TableStatus; label: string }[] = [
    { value: "AVAILABLE", label: "Available" },
    { value: "OCCUPIED", label: "Occupied" },
    { value: "RESERVED", label: "Reserved" },
]

// Definimos las props
type TableActionsProps = {
    table: Table;
}

// Definimos el componente
export default function TableActions({ table }: TableActionsProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);
        const result = await deleteTable(table.id);
        setIsDeleting(false);
        setIsDeleteOpen(false);

        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    }

    async function handleStatusChange(status: TableStatus) {
        if (status === table.status) return;

        const result = await updateTableStatus(table.id, status);

        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    aria-label="Table actions"
                >
                    <EllipsisHorizontalIcon className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {/* Submenu de cambio rápido de estado */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer">
                            <CheckCircleIcon className="size-4 mr-2" />
                            Status
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                {statusOptions.map((option) => (
                                    <DropdownMenuItem
                                        key={option.value}
                                        onClick={() => handleStatusChange(option.value)}
                                        className="cursor-pointer"
                                        disabled={option.value === table.status}
                                    >
                                        {option.label}
                                        {option.value === table.status && (
                                            <span className="ml-auto w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
                                        )}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => setIsEditOpen(true)} className="cursor-pointer">
                        <PencilSquareIcon className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setIsDeleteOpen(true)}
                        className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30 cursor-pointer"
                    >
                        <TrashIcon className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Modal de edición */}
            <EditTableModal
                table={table}
                isOpenModal={isEditOpen}
                onClose={() => setIsEditOpen(false)}
            />

            {/* Confirmación de borrado */}
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete table?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently remove <strong>Table #{table.number}</strong> from your system. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting} className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600 cursor-pointer"
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}