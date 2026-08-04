"use client"

// Importamos las libreias
import { Product } from "@/src/types/products";
import EditProductForm from "./EditProductForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Definimos las props
type EditProductModalProps = {
    product: Product;
    isOpenModal: boolean;
    onClose: () => void;
}

// Definimos el componente
export default function EditProductModal({ product, isOpenModal, onClose }: EditProductModalProps) {
    return (
        <Dialog open={isOpenModal} onOpenChange={onClose}>
            <DialogContent key={product.id} className="max-w-xl max-h-[90vh] overflow-y-auto bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                        Edit <span className="text-amber-600">product</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                        Update the details of {product.name}. Variants are managed separately.
                    </DialogDescription>
                </DialogHeader>

                <EditProductForm product={product} onClose={onClose} />
            </DialogContent>
        </Dialog>
    )
}