"use client";

// Importamos las librerias
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SidebarUser } from "./SidebarUser";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { NavCollapsible } from "./NavCollapsible";
import { ChartPieIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { ArrowUpShoppingCart, DiningRoomTable, SearchAccountEmployee } from "@vectoricons/atlas-icons-react";

// Definimos el componente
export default function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  // Hook para leer la url del navegador
  const pathname = usePathname();
  // context del usuario
  const user = useUser();

  return (
    <div className="w-full md:w-64 shrink-0 bg-white dark:bg-zinc-900 flex flex-col h-full p-2">
      {/* Header sel sidebar */}
      <div className="p-2">
        <h1 className="w-full flex items-center justify-between gap-2 p-2">
          <div className="flex items-center justify-start gap-3">
            <Image
              src="/img/icono-brewkoffee.png"
              alt="Icono de Brew Koffee"
              className="drop-shadow-2xl dark:invert"
              width={28}
              height={28}
              priority
            />
            <h1 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Brewkoffe Admin</h1>
          </div>
        </h1>
      </div>

      {/* Body del sidebar */}
      <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="relative flex w-full min-w-0 flex-col p-2">
          <h2 className="text-zinc-400 dark:text-zinc-500 text-xs font-medium p-2">Overview</h2>
          <div>
            <Link
              href="/admin"
              onClick={onNavigate}
              className={cn(
                "w-full flex items-center gap-2 text-zinc-500 hover:bg-zinc-400/10 hover:text-zinc-800 dark:hover:text-zinc-50 dark:hover:bg-zinc-400/10 rounded-lg p-2 text-sm transition-colors",
                pathname === "/admin" && "bg-zinc-400/10 text-zinc-900 dark:text-zinc-50"
              )}
            >
              <ChartPieIcon className='size-4 shrink-0' />
              Dashboard
            </Link>
          </div>
        </div>

        <div className="relative flex w-full min-w-0 flex-col p-2 gap-2">
          <h2 className="text-zinc-400 dark:text-zinc-500 text-xs font-medium p-2">Backoffice</h2>
          <NavCollapsible
            icon={ArrowUpShoppingCart}
            label="Products"
            onNavigate={onNavigate}
            items={[
              { label: "Catalog", href: "/admin/products/catalog" },
              { label: "Categories", href: "/admin/products/categories" },
            ]}
          />
          <NavCollapsible
            icon={SearchAccountEmployee}
            label="Employees Management"
            onNavigate={onNavigate}
            items={[
              { label: "Employee list", href: "/admin/employees" }
            ]}
          />
          <NavCollapsible
            icon={DiningRoomTable}
            label="Tables Management"
            onNavigate={onNavigate}
            items={[
              { label: "Table list", href: "/admin/tables" }
            ]}
          />
        </div>

        <div className="relative flex w-full min-w-0 flex-col p-2 gap-2">
          <h2 className="text-zinc-400 dark:text-zinc-500 text-xs font-medium p-2">System</h2>
          <div>
            <Link
              href="/admin/settings"
              onClick={onNavigate}
              className={cn(
                "w-full flex items-center gap-2 text-zinc-500 hover:bg-zinc-400/10 hover:text-zinc-800 dark:hover:text-zinc-50 dark:hover:bg-zinc-400/10 rounded-lg p-2 text-sm transition-colors",
                pathname === "/admin/settings" && "bg-zinc-400/10 text-zinc-900 dark:text-zinc-50"
              )}
            >
              <Cog8ToothIcon className='size-4 shrink-0' />
              Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Menu user */}
      {user && (
        <SidebarUser
          name={`${user.name} ${user.lastname}`}
          email={user.email}
        />
      )}
    </div>
  )
}
