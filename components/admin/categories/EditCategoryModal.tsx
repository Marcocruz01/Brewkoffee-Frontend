"use client"

// Importamos las librerias
import { Category } from "@/src/types/categories";
import EditCategoryForm from "./EditCategoryForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Definimos las props
type EditCategoryModalProps = {
    category: Category;
    isOpenModal: boolean;
    onClose: () => void;
}

// Definimos el componente de edicion
export default function EditCategoryModal({ category, isOpenModal, onClose }: EditCategoryModalProps) {
    return (
        <Dialog open={isOpenModal} onOpenChange={onClose}>
            <DialogContent key={category.id} className="max-w-xl bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                        Edit <span className="text-amber-600">category</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                        Update the name of {category.name}.
                    </DialogDescription>
                </DialogHeader>

                <EditCategoryForm category={category} onClose={onClose} />
            </DialogContent>
        </Dialog>
    )
}