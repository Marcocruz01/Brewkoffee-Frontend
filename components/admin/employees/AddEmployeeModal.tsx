"use client"

// Importamos las libreias
import AddEmployeeForm from "./AddEmployeeForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Definimos los props
type AddEmployeeModalProps = {
    isOpenModal: boolean;
    onClose: () => void;
}

// Definimos el componente
export default function AddEmployeeModal({ isOpenModal, onClose }: AddEmployeeModalProps) {
    return (
        <Dialog open={isOpenModal} onOpenChange={onClose}>
            <DialogContent className="max-w-xl bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                        New <span className="text-amber-600">employee</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                        Register the data of the new member of the work team.
                    </DialogDescription>
                </DialogHeader>
                {/* Form del modal de empleado */}
                <AddEmployeeForm onClose={onClose} />
            </DialogContent>
        </Dialog>
    )
}