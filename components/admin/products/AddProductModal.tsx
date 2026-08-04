"use client"

// Importamos las librerias
import AddProductForm from "./AddProductForm";
import { Category } from "@/src/types/categories";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Definimos las props
type AddProductModalProps = {
    categories: Category[];
    isOpenModal: boolean;
    onClose: () => void;
}

// Definimos el componente
export default function AddProductModal({ categories, isOpenModal, onClose }: AddProductModalProps) {
    return (
        <Dialog open={isOpenModal} onOpenChange={onClose}>
            <DialogContent 
                initialFocus={() => document.getElementById("product-name")}
                className="max-w-xl max-h-[90vh] overflow-y-auto bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                        New <span className="text-amber-600">product</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                        Add a product with its variants and pricing to your catalog.
                    </DialogDescription>
                </DialogHeader>

                <AddProductForm categories={categories} onClose={onClose} />
            </DialogContent>
        </Dialog>
    )
}