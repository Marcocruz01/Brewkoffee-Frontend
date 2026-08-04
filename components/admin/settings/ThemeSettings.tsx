"use client"

// Importamos las librerias
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";

const options = [
    { value: "light", label: "Light", icon: SunIcon },
    { value: "dark", label: "Dark", icon: MoonIcon },
    { value: "system", label: "System", icon: ComputerDesktopIcon },
] as const;

export default function ThemeSettings() {
    const { theme, setTheme } = useTheme();
    // Evita mismatch de hidratación mostrando el estado real solo tras montar
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6">
            <div className="flex flex-col gap-1 mb-4">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Appearance</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Choose how BrewKoffee looks on your device.</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {options.map(({ value, label, icon: Icon }) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => setTheme(value)}
                        className={`flex flex-col items-center gap-2 py-4 rounded-xl border transition-colors cursor-pointer ${mounted && theme === value
                                ? "border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-500/10 text-zinc-950 dark:text-zinc-200"
                                : "border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                            }`}
                    >
                        <Icon className="size-5" />
                        <span className="text-sm font-medium">{label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}