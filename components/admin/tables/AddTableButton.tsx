"use client";

// Importamos las librerias
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import AddTableModal from './AddTableModal';

// Definimos el boton
export default function AddTableButton() {
    // Definimos el estado del modal
    const [openModalTable, setOpenModalTable] = useState(false);
    
    return (
        <>
            <button
                type="button"
                onClick={() => setOpenModalTable(true)}
                className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 font-medium py-2.5 px-4 rounded-xl text-xs shadow-sm cursor-pointer transition-colors border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 focus:outline-hidden focus:ring-2 focus:ring-zinc-950/10 dark:focus:ring-zinc-100/10"
            >
                <PlusIcon className="size-4" />
                Table
            </button>
            {/* Modal para agregar una mesa */}
            <AddTableModal isOpenModal={openModalTable} onClose={() => setOpenModalTable(false)}/>
        </>
    )
}
