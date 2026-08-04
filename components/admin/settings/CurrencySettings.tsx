"use client"

// Importamos las librerias
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Solo visual por ahora, no persiste en backend
const currencies = [
    { value: "MXN", label: "Mexican Peso (MXN)" },
    { value: "USD", label: "US Dollar (USD)" },
    { value: "EUR", label: "Euro (EUR)" },
];

// Definimos el comonente
export default function CurrencySettings() {
    const [currency, setCurrency] = useState("MXN");

    return (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6">
            <div className="flex flex-col gap-1 mb-4">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Currency</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Display prices in your preferred currency.</p>
            </div>

            <Select value={currency} onValueChange={(val) => val && setCurrency(val)}>
                <SelectTrigger className="w-full sm:w-64 bg-white shadow-none h-10" aria-label="select currency">
                    <SelectValue placeholder="Select a currency">
                        {(value: string) => currencies.find((c) => c.value === value)?.label ?? "Select a currency"}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {currencies.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                            {c.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}