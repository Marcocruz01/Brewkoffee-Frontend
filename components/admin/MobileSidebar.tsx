"use client"

// Importamos las librerias
import { useState } from 'react';
import SidebarContent from './SidebarContent';
import { Bars3Icon, BellIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Definimos el componente
export function MobileSidebar() {
    // Estado para la apertura/cierre del menu mobile
    const [open, setOpen] = useState(false);

    return (
        <header className="flex items-center justify-between w-full gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
                {/* IZQUIERDA: Tu botón de apertura del Sidebar */}
                <div className="flex items-center gap-1">
                    <SheetTrigger className="p-2 cursor-pointer rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                        <Bars3Icon className="size-5" />
                    </SheetTrigger>
                </div>
                {/* CENTRO: Identidad Visual Corta */}
                <div className="flex items-center">
                    <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-50">
                        BrewKoffee
                    </span>
                </div>
                {/* DERECHA: Botones de Acción Rápida */}
                <div className="flex items-center gap-1">

                    {/* Opción A: Botón de Notificaciones (Ideal para Meseros/Cocina) */}
                    <button
                        type="button"
                        className="p-2 cursor-pointer rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors relative"
                    >
                        <BellIcon className="size-5" />
                        {/* Ping indicador de nueva orden/alerta */}
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full" />
                    </button>

                    {/* Opción B: Alternar Modo Oscuro (Si manejas librería de temas) */}
                    <button
                        type="button"
                        className="p-2 cursor-pointer rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                    >
                        {/* Aquí puedes condicionar con tu estado de tema */}
                        <SunIcon className="size-5 block dark:hidden" />
                        <MoonIcon className="size-5 hidden dark:block" />
                    </button>

                </div>
                <SheetContent side="left" className="p-0 w-64">
                    <SidebarContent onNavigate={() => setOpen(false)} />
                </SheetContent>
            </Sheet>
        </header>
    )
}