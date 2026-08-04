"use client"

// Importamos las librerias
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddTableForm from "./AddTableForm";

// Definimos los props
type AddTableModalProps = {
    isOpenModal: boolean;
    onClose: () => void;
}

// Definimos el modal
export default function AddTableModal({ isOpenModal, onClose }: AddTableModalProps) {
  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
            <DialogContent className="max-w-xl bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                        Set up a <span className="text-amber-600">table</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                        Configure the number and seating capacity for a new dining spot.
                    </DialogDescription>
                </DialogHeader>
                {/* Form del modal de empleado */}
                <AddTableForm onClose={onClose}/>
            </DialogContent>
        </Dialog>
  )
}
