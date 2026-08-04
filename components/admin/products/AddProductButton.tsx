"use client"

// Importamos las librerias
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddProductModal from "./AddProductModal";
import { Category } from "@/src/types/categories";

type AddProductButtonProps = {
    categories: Category[];
}

export default function AddProductButton({ categories }: AddProductButtonProps) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 font-medium py-2.5 px-4 rounded-xl text-xs shadow-sm cursor-pointer transition-colors border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 focus:outline-hidden focus:ring-2 focus:ring-zinc-950/10 dark:focus:ring-zinc-100/10"
            >
                <PlusIcon className="size-4" />
                Product
            </button>
            <AddProductModal
                categories={categories}
                isOpenModal={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    )
}