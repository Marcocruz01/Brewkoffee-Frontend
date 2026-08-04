"use client"

import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Product } from "@/src/types/products";
import { useActionState, useEffect } from "react";
import SubmitButton from "@/components/ui/SubmitButton";
import { deleteVariant } from "@/actions/products/delete-variant-action";
import { createVariant } from "@/actions/products/create-variant-action";
import { TrashIcon, ExclamationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type ManageVariantsModalProps = {
    product: Product;
    isOpenModal: boolean;
    onClose: () => void;
}

export default function ManageVariantsModal({ product, isOpenModal, onClose }: ManageVariantsModalProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const createVariantForProduct = createVariant.bind(null, product.id);
    const [state, dispatch] = useActionState(createVariantForProduct, {
        errors: {},
        success: ""
    });

    useEffect(() => {
        if (state.success) toast.success(state.success);
        if (state.errors.general) toast.error(state.errors.general[0]);
    }, [state]);

    async function handleDelete(id: string) {
        setDeletingId(id);
        const result = await deleteVariant(id);
        setDeletingId(null);

        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    }

    return (
        <Dialog open={isOpenModal} onOpenChange={onClose}>
            <DialogContent key={product.id} className="max-w-lg bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                        Variants of <span className="text-amber-600">{product.name}</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                        A product must always have at least one variant.
                    </DialogDescription>
                </DialogHeader>

                {/* Lista de variantes existentes */}
                <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
                    {product.variants.map((variant) => (
                        <div
                            key={variant.id}
                            className="flex items-center justify-between gap-2 bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2"
                        >
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{variant.name}</span>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">${variant.price.toFixed(2)}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleDelete(variant.id)}
                                disabled={deletingId === variant.id || product.variants.length === 1}
                                className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <TrashIcon className="size-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Form para agregar variante nueva */}
                <form action={dispatch} className="flex flex-col gap-3 border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-2">
                    <div className="flex items-start gap-2">
                        <div className="flex-1 flex flex-col gap-1">
                            <Input name="name" placeholder="e.g., Large 16oz" className="bg-white shadow-none h-10" />
                            {state.errors?.name?.[0] && (
                                <div className="flex items-center gap-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                                    <ExclamationCircleIcon className="size-3.5 shrink-0" />
                                    <span>{state.errors.name[0]}</span>
                                </div>
                            )}
                        </div>
                        <div className="w-28 flex flex-col gap-1">
                            <Input name="price" placeholder="0.00" inputMode="decimal" className="bg-white shadow-none h-10" />
                            {state.errors?.price?.[0] && (
                                <div className="flex items-center gap-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                                    <ExclamationCircleIcon className="size-3.5 shrink-0" />
                                    <span>{state.errors.price[0]}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 transition-colors cursor-pointer"
                    >
                        <PlusIcon className="size-4" />
                        Add variant
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    )
}