"use client"

// Importamos las librerias
import SidebarContent from "./SidebarContent";

// Definimos el sidebar componente
export default function Sidebar() {
    return (
        <aside className='hidden md:flex border-r border-zinc-200 dark:border-zinc-800 h-screen sticky top-0'>
            <SidebarContent />
        </aside>
    )
}