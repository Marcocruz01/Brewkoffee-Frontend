"use client"

// Impotamos las librerias
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BellIcon, CheckCircleIcon, ClockIcon, XCircleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Datos estáticos de prueba para las notificaciones
const STATIC_NOTIFICATIONS = [
    {
        id: "1",
        title: "Order #104 is Ready!",
        description: "Table 4 — 2x Caramel Frappe, 1x Croissant",
        time: "2 min ago",
        type: "READY", // Listo
    },
    {
        id: "2",
        title: "New Order Pending",
        description: "Table 2 — 1x Iced Latte",
        time: "5 min ago",
        type: "PENDING", // Pendiente
    },
    {
        id: "3",
        title: "Order #99 Canceled",
        description: "Table 6 — Out of stock: Avocado Toast",
        time: "12 min ago",
        type: "CANCELED", // Cancelado
    },
];

// Estilos e iconos por tipo de notificación
const NOTIFICATION_CONFIG = {
    READY: {
        icon: CheckCircleIcon,
        iconColor: "text-emerald-500 dark:text-emerald-400",
        bgBadge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        tag: "Ready",
    },
    PENDING: {
        icon: ClockIcon,
        iconColor: "text-amber-500 dark:text-amber-400",
        bgBadge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        tag: "Pending",
    },
    CANCELED: {
        icon: XCircleIcon,
        iconColor: "text-red-500 dark:text-red-400",
        bgBadge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
        tag: "Canceled",
    },
};

export default function NotificationsMenu() {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger
                className={`relative p-2 rounded-xl transition-colors cursor-pointer outline-none ${open
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200"
                    }`}
                aria-label="Notifications"
            >
                <BellIcon className="size-5" />

                {/* Badge indicador de notificaciones pendientes (Ping Animation) */}
                <span className="absolute top-1.5 right-1.5 flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-[calc(100vw-1.5rem)] lg:max-w-96 mx-2 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900"
            >
                {/* Header de Notificaciones */}
                <div className="px-4 py-3 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            Notifications
                        </h3>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                            {STATIC_NOTIFICATIONS.length} new
                        </span>
                    </div>
                    <button className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer">
                        Mark all as read
                    </button>
                </div>

                {/* Lista de Notificaciones Estáticas */}
                <div className="max-h-80 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/60">
                    {STATIC_NOTIFICATIONS.map((notif) => {
                        const config = NOTIFICATION_CONFIG[notif.type as keyof typeof NOTIFICATION_CONFIG];
                        const Icon = config.icon;

                        return (
                            <div
                                key={notif.id}
                                className="p-3.5 flex items-start gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors cursor-pointer group"
                            >
                                <div className="mt-0.5 shrink-0">
                                    <Icon className={`size-5 ${config.iconColor}`} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1 mb-0.5">
                                        <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                                            {notif.title}
                                        </p>
                                        <span className="text-[10px] text-zinc-400 shrink-0">
                                            {notif.time}
                                        </span>
                                    </div>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mb-1.5">
                                        {notif.description}
                                    </p>
                                    <span className={`inline-block text-[9px] font-semibold px-1.5 py-0.2 rounded-md border ${config.bgBadge}`}>
                                        {config.tag}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <DropdownMenuSeparator />

                {/* Footer del menú */}
                <div className="p-1.5 text-center">
                    <button className="w-full py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer flex items-center justify-center gap-1">
                        View active orders
                        <ChevronRightIcon className="size-3" />
                    </button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}