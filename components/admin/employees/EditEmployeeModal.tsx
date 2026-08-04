"use client"

// Importamos las librerias
import EditEmployeeForm from "./EditEmployeeForm";
import { Employee } from "@/src/types/employees";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Definimos las props
type EditEmployeeModalProps = {
    employee: Employee;
    isOpenModal: boolean;
    onClose: () => void;
}

// Definimos el componente
export default function EditEmployeeModal({ employee, isOpenModal, onClose }: EditEmployeeModalProps) {
    return (
        <Dialog open={isOpenModal} onOpenChange={onClose}>
            <DialogContent
                key={employee.id}
                className="max-w-xl bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            >
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                        Edit <span className="text-amber-600">employee</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                        Update the data of {employee.name} {employee.lastname}.
                    </DialogDescription>
                </DialogHeader>

                <EditEmployeeForm employee={employee} onClose={onClose} />
            </DialogContent>
        </Dialog>
    )
}