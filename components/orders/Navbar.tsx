"use client"

// Importamos las librerias
import Link from "next/link";
import UserMenu from "./UservMenu";
import { usePathname } from "next/navigation";
import { ProfileData } from "@/src/types/profile";
import NotificationsMenu from "./NotificationsMenu";

// Definimos las porps
type WaiterNavProps = {
    user: ProfileData;
}

// Links
const links = [
    { href: "/orders", label: "New Order" },
    { href: "/orders/status", label: "Status Orders" },
    { href: "/orders/tables", label: "Tables" },
    { href: "/orders/history", label: "History" },
]

// Definimos el componente
export default function Navbar({ user }: WaiterNavProps) {
    // Estado del pathname
    const pathname = usePathname();

    return (
        <header className="flex items-center justify-between px-3 sm:px-8 h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0 gap-2 sm:gap-4 overflow-hidden">
            <div className="overflow-x-auto min-w-0 py-1 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <nav className="flex items-center md:gap-2 gap-1 py-1 px-1.5 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/60 dark:border-zinc-700/50 w-max">
                    {links.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-2.5 sm:px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${isActive
                                    ? "bg-zinc-900 text-zinc-50 shadow-xs dark:bg-zinc-50 dark:text-zinc-950 dark:shadow-zinc-950/20"
                                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/40"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
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