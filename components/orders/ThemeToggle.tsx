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

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="flex items-center gap-1 px-2 py-1.5">
            {options.map(({ value, label, icon: Icon }) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => setTheme(value)}
                    title={label}
                    className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-colors cursor-pointer ${mounted && theme === value
                            ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950"
                            : "text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300"
                        }`}
                >
                    <Icon className="size-4" />
                </button>
            ))}
        </div>
    )
}