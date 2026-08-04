"use client"

// Importamos las librerias
import { FormEvent } from "react";

// Definimos las props
type CustomerNameStepProps = {
    customerName: string;
    onChange: (value: string) => void;
    onConfirm: () => void;
}

// Definimos el componete
export default function CustomerNameStep({ customerName, onChange, onConfirm }: CustomerNameStepProps) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Previene la recarga del navegador
        onConfirm(); // Ejecuta la función para avanzar
    };
    return (
        <div className="flex flex-col items-center justify-center h-full px-6">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Customer name</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">Optional — helps identify the order when it's ready.</p>

            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
                <input
                    autoFocus
                    value={customerName}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="e.g., Marco"
                    className="w-full pl-4 pr-11 py-2.5 text-base lg:text-sm rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all duration-200"
                />

                <button
                    type="submit"
                    className="h-12 rounded-xl text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 transition-colors cursor-pointer"
                >
                    Continue
                </button>
            </form>
        </div>
    )
}