"use client"

// Importamos las librerias
import { ProfileData } from "@/src/types/profile";
import NotificationsMenu from "@/components/orders/NotificationsMenu";
import UserMenu from "@/components/orders/UservMenu";

// Props par el componente
type KitchenNavProps = {
    user: ProfileData;
}

// Definimos el componente
export default function KitchenNav({ user }: KitchenNavProps) {
    return (
        <header className="flex items-center justify-between px-3 sm:px-8 h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0 gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">Kitchen</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">·</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Orders board</span>
            </div>

            <div className="ml-auto flex items-center gap-1 sm:gap-2 shrink-0">
                <NotificationsMenu />
                <UserMenu
                    name={user.name}
                    lastname={user.lastname}
                    email={user.email}
                    role={user.role}
                    age={user.age}
                    schedule={user.schedule}
                    createdAt={user.createdAt}
                />
            </div>
        </header>
    )
}