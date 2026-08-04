"use client"

// Importamos las librerias
import { toast } from "sonner";
import { useState } from "react";
import { Product } from "@/src/types/products";
import { deleteProduct } from "@/actions/products/delete-product-action";
import { EllipsisVerticalIcon, PencilSquareIcon, Squares2X2Icon, TrashIcon } from "@heroicons/react/24/outline";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import EditProductModal from "./EditProductModal";
import ManageVariantsModal from "./ManageVariantsModal";

type ProductActionsProps = {
    product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isVariantsOpen, setIsVariantsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);
        const result = await deleteProduct(product.id);
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
                    className="p-1.5 rounded-md bg-white/90 dark:bg-zinc-900/90 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 shadow-sm transition-colors cursor-pointer"
                    aria-label="Product actions"
                >
                    <EllipsisVerticalIcon className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsEditOpen(true)} className="cursor-pointer">
                        <PencilSquareIcon className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsVariantsOpen(true)} className="cursor-pointer">
                        <Squares2X2Icon className="size-4 mr-2" />
                        variants
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

            <EditProductModal
                product={product}
                isOpenModal={isEditOpen}
                onClose={() => setIsEditOpen(false)}
            />

            <ManageVariantsModal
                product={product}
                isOpenModal={isVariantsOpen}
                onClose={() => setIsVariantsOpen(false)}
            />

            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete product?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently remove <strong>{product.name}</strong> along with all of its variants.
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