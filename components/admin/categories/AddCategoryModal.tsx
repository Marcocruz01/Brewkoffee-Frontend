"use client"

// Importamos las librerias
import AddCategoryForm from "./AddCategoryForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Definimos las props
type AddCategoryModalProps = {
    isOpenModal: boolean;
    onClose: () => void;
}

// Definimos el componente
export default function AddCategoryModal({ isOpenModal, onClose }: AddCategoryModalProps) {
    return (
        <Dialog open={isOpenModal} onOpenChange={onClose}>
            <DialogContent className="max-w-xl bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                        New <span className="text-amber-600">category</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                        Create a new category to organize your products.
                    </DialogDescription>
                </DialogHeader>

                <AddCategoryForm onClose={onClose} />
            </DialogContent>
        </Dialog>
    )
}