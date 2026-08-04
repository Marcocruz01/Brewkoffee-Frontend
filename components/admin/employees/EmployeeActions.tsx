"use client"

// Importamos las librerias
import { toast } from "sonner";
import { useState } from "react";
import { Employee } from "@/src/types/employees";
import EditEmployeeModal from "./EditEmployeeModal";
import { deleteEmployee } from "@/actions/employee/delete-employee-action";
import { EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

// Definimos el tipo de estado
type ActionStateTypeProps = {
    employee: Employee;
}

// Definimos el componente
export default function EmployeeActions({ employee }: ActionStateTypeProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);
        const result = await deleteEmployee(employee.id);
        setIsDeleting(false);
        setIsDeleteOpen(false);

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
                    aria-label="Employee actions"
                >
                    <EllipsisHorizontalIcon className="size-5" />
                </DropdownMenuTrigger>
                {/* BoContenedor de botones */}
                <DropdownMenuContent align="end">
                    {/* Boton editar */}
                    <DropdownMenuItem onClick={() => setIsEditOpen(true)} className="cursor-pointer">
                        <PencilSquareIcon className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    {/* Boton eliminar */}
                    <DropdownMenuItem
                        onClick={() => setIsDeleteOpen(true)}
                        className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30 cursor-pointer"
                    >
                        <TrashIcon className="size-4 mr-2 text-red-500!" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Modal de edición */}
            <EditEmployeeModal
                key={employee.id}
                employee={employee}
                isOpenModal={isEditOpen}
                onClose={() => setIsEditOpen(false)}
            />

            {/* Confirmación de borrado */}
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete employee?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently remove <strong className="text-zinc-600 dark:text-zinc-300">{employee.name} {employee.lastname}</strong> from your team. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting} className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="text-zinc-100 bg-red-600 hover:bg-red-500 cursor-pointer"
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}