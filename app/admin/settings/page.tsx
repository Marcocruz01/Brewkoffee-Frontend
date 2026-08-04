// Importamos las librerias
import { Metadata } from "next";
import ThemeSettings from "@/components/admin/settings/ThemeSettings";
import CurrencySettings from "@/components/admin/settings/CurrencySettings";
import NotificationSettings from "@/components/admin/settings/NotificationSettings";

// Definimos el metadata
export const metadata: Metadata = {
    title: "Settings | BrewKoffee",
    description: "Customize your BrewKoffee experience.",
};

// Definimos la vista
export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-8 max-w-2xl">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Settings</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Manage your appearance and display preferences.
                </p>
            </div>

            <div className="flex flex-col gap-6 divide-y divide-zinc-100 dark:divide-zinc-800/60">
                <ThemeSettings />
                <CurrencySettings />
                <NotificationSettings />
            </div>
        </div>
    )
}