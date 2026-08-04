"use client"

// Importamos las librerias
import { cn } from "@/lib/utils";
import Avatar from "boring-avatars";
import { useState, useRef, useEffect, useTransition } from "react";
import { logout } from "@/actions/auth/logout-action";
import { EllipsisVerticalIcon, ArrowRightStartOnRectangleIcon, UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { AVATAR_COLORS } from "@/lib/constants";

// Definimos el type
type SidebarUserProps = {
    name: string;
    email: string;
};

// Definimos el componente
export function SidebarUser({ name, email }: SidebarUserProps) {
    // Hook para la transicion de carga
    const [isPending, startTransition] = useTransition();

    // Estado para el dropdown
    const [open, setOpen] = useState(false);
    // Estado para la referencia del dropdown
    const ref = useRef<HTMLDivElement>(null);

    // Cerramos al hacer click fuera
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Iniciales del nombre
    const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

    // Accion para cerrra la sesion
    const handleLogout = () => {
        // Envolvemos la acción en startTransition
        startTransition(async () => {
            await logout();
        });
    };

    return (
        <div ref={ref} className="relative p-2 mt-auto">
            {/* Overlay para bloquear clicks fuera */}
            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Dropdown menu */}
            {open && (
                <div className="absolute bottom-16 left-2 right-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 shadow-lg z-50">
                    <div className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 mb-1">
                        <p className="text-zinc-900 dark:text-white text-sm font-medium truncate">{name}</p>
                        <p className="text-zinc-500 text-xs truncate">{email}</p>
                    </div>
                    <a href="/admin/profile" className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white rounded-md transition-colors">
                        <UserCircleIcon className="size-4 shrink-0" />
                        My profile
                    </a>
                    <a href="/admin/settings" className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white rounded-md transition-colors">
                        <Cog6ToothIcon className="size-4 shrink-0" />
                        Settings
                    </a>
                    <div className="border-t border-zinc-200 dark:border-zinc-800 mt-1 pt-1">
                        <button
                            onClick={handleLogout}
                            disabled={isPending}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-red-600 dark:hover:text-red-300 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isPending ? (
                                <svg
                                    className="size-4 shrink-0 block text-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeDasharray="32"
                                        strokeDashoffset="12"
                                        className="opacity-80"
                                    >
                                        <animateTransform
                                            attributeName="transform"
                                            attributeType="XML"
                                            type="rotate"
                                            from="0 12 12"
                                            to="360 12 12"
                                            dur="0.8s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                </svg>
                            ) : (
                                /* Icono normal de Logout cuando no está cargando */
                                <ArrowRightStartOnRectangleIcon className="size-4 shrink-0" />
                            )}

                            <span>
                                {isPending ? "Logging out..." : "Logout"}
                            </span>
                        </button>
                    </div>
                </div>
            )}

            {/* User button */}
            <button
                onClick={() => setOpen(!open)}
                className={cn(
                    "w-full flex items-center gap-3 rounded-lg p-2 cursor-pointer transition-colors relative z-50",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                    open && "bg-zinc-100 dark:bg-zinc-800"
                )}
            >
                {/* Avatar */}
                <Avatar
                    name={email}
                    variant="beam"
                    size={32}
                    colors={AVATAR_COLORS}
                    className="shrink-0 border rounded-full"
                    aria-label="avatar"
                />

                {/* Info */}
                <div className="flex-1 text-left min-w-0">
                    <p className="text-zinc-900 dark:text-white text-sm font-medium truncate leading-none">{name}</p>
                    <p className="text-zinc-400 text-xs truncate mt-0.5">{email}</p>
                </div>

                {/* Icon */}
                <EllipsisVerticalIcon className="size-4 text-zinc-500 shrink-0" />
            </button>
        </div>
    );
}