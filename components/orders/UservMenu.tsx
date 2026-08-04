"use client"

// Importamos las librerias
import Link from "next/link";
import { useState } from "react";
import Avatar from "boring-avatars";
import ProfileModal from "./ProfileModal";
import { AVATAR_COLORS } from "@/lib/constants";
import { logout } from "@/actions/auth/logout-action";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserCircleIcon, Cog6ToothIcon, ArrowRightStartOnRectangleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";

type UserMenuProps = {
    name: string;
    lastname: string;
    email: string;
    role: "ADMIN" | "WAITER" | "KITCHEN";
    age: number;
    schedule: "MORNING" | "EVENING" | "FULL";
    createdAt: string;
}

export default function UserMenu({ name, lastname, email, role, age, schedule, createdAt }: UserMenuProps) {
    const [open, setOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger
                    className={`flex items-center gap-2 p-1.5 sm:px-2 sm:py-1.5 sm:pr-3 rounded-xl group transition-colors cursor-pointer outline-none ${open ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                >
                    <Avatar name={email} variant="beam" size={28} colors={AVATAR_COLORS} aria-label="avatar"/>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 hidden sm:inline">
                        {name} {lastname}
                    </span>
                    <ChevronRightIcon
                        className={`size-4 text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-transform duration-200 ${open ? "rotate-90 text-zinc-700 dark:text-zinc-200" : "rotate-0"
                            }`}
                    />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 sm:w-64 mr-1 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900">
                    <div className="px-3 py-2 flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">
                                {name} {lastname}
                            </p>
                            <span className="text-[10px] bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20 font-semibold px-2 py-0.5 rounded-full border shrink-0">
                                {role}
                            </span>
                        </div>
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">{email}</p>
                    </div>

                    <DropdownMenuSeparator />

                    
                    <div className="px-1 pb-1">
                        <p className="px-2 py-1 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                            Appearance
                        </p>
                        <ThemeToggle />
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() => setIsProfileOpen(true)}
                        className="cursor-pointer dark:hover:bg-zinc-300/10 group"
                    >
                        <div className="flex items-center w-full text-zinc-500 group-hover:text-zinc-900">
                            <UserCircleIcon className="size-4 mr-2" />
                            Profile
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    
                    <form action={logout} className="w-full">
                        <button
                            type="submit"
                            className="w-full flex items-center px-2 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md cursor-pointer"
                        >
                            <ArrowRightStartOnRectangleIcon className="size-4 mr-2" />
                            Log out
                        </button>
                    </form>
                </DropdownMenuContent>
            </DropdownMenu>

            <ProfileModal
                isOpenModal={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                profile={{ name, lastname, email, role, age, schedule, createdAt }}
            />
        </>
    )
}