"use client"

// Importamos las librerias
import { useState } from "react";

// Solo visual por ahora, no persiste en backend
const initialToggles = [
    { key: "newOrders", label: "New orders", description: "Get notified when a new order comes in." },
    { key: "lowStock", label: "Low stock alerts", description: "Get notified when a product runs low." },
    { key: "dailySummary", label: "Daily summary", description: "Receive a summary of the day's sales." },
];

// Definimos el componente
export default function NotificationSettings() {
    const [toggles, setToggles] = useState<Record<string, boolean>>({
        newOrders: true,
        lowStock: true,
        dailySummary: false,
    });

    function toggle(key: string) {
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    }

    return (
        <div className="flex flex-col gap-1 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 py-6 px-6 rounded-xl">
            <div className="flex flex-col gap-1 mb-2">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">Notifications</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Choose what you want to be notified about.</p>
            </div>

            <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {initialToggles.map(({ key, label, description }) => (
                    <div key={key} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">{description}</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => toggle(key)}
                            aria-label="activate notification"
                            className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${toggles[key] ? "bg-zinc-900 dark:bg-blue-500" : "bg-zinc-200 dark:bg-zinc-700"
                                }`}
                        >
                            <span
                                className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white transition-transform ${toggles[key] ? "translate-x-4" : "translate-x-0"
                                    }`}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}