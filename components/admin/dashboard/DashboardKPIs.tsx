// Importamos las librerias
import { CurrencyDollarIcon, ClipboardDocumentListIcon, FireIcon, UsersIcon } from "@heroicons/react/24/outline";

type DashboardKPIsProps = {
    totalSales: number;
    totalOrders: number;
    topProductName: string | null;
    activeEmployees: number;
}

export default function DashboardKPIs({ totalSales, totalOrders, topProductName, activeEmployees }: DashboardKPIsProps) {
    const cards = [
        { label: "Total sales", value: `$${totalSales.toFixed(2)}`, icon: CurrencyDollarIcon },
        { label: "Total orders", value: totalOrders.toString(), icon: ClipboardDocumentListIcon },
        { label: "Best seller", value: topProductName ?? "—", icon: FireIcon, isText: true },
        { label: "Active employees", value: activeEmployees.toString(), icon: UsersIcon },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map(({ label, value, icon: Icon, isText }) => (
                <div key={label} className="flex flex-col gap-3 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
                        <Icon className="size-4 text-amber-500" />
                    </div>
                    <span className={`font-bold text-zinc-900 dark:text-white ${isText ? "text-lg truncate" : "text-2xl"}`}>
                        {value}
                    </span>
                </div>
            ))}
        </div>
    )
}