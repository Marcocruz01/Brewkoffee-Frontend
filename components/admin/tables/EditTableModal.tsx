"use client"

// Importamos las librerias
import { Table } from "@/src/types/tables";
import EditTableForm from "./EditTableForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Definimos las props
type EditTableModalProps = {
    table: Table;
    isOpenModal: boolean;
    onClose: () => void;
}

// Definimos el componente
export default function EditTableModal({ table, isOpenModal, onClose }: EditTableModalProps) {
    return (
        <Dialog open={isOpenModal} onOpenChange={onClose}>
            <DialogContent key={table.id} className="max-w-xl bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                        Edit <span className="text-amber-600">table</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                        Update the details of Table #{table.number}.
                    </DialogDescription>
                </DialogHeader>
                {/* Modal de edicion */}
                <EditTableForm table={table} onClose={onClose} />
            </DialogContent>
        </Dialog>
    )
}