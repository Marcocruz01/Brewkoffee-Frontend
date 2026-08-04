"use client";

// Importamos las librerias
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Definimos el type
type SubItem = {
    label: string;
    href: string;
};

// Definimos el type del componente
type NavCollapsibleProps = {
    label: string;
    icon: React.ElementType;
    items: SubItem[];
    onNavigate?: () => void;
};

// Definimos nuestro componente
export function NavCollapsible({ label, icon: Icon, items, onNavigate }: NavCollapsibleProps) {
    const pathname = usePathname();
    const isActive = items.some((i) => pathname.startsWith(i.href));
    const [open, setOpen] = useState(isActive);

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger
                className={cn(
                    "w-full flex items-center gap-2 rounded-lg p-2 text-sm font-normal cursor-pointer",
                    "text-zinc-500 hover:bg-zinc-400/10 hover:text-zinc-800 dark:hover:text-zinc-50 dark:hover:bg-zinc-400/10"
                )}
            >
                <Icon className="size-4 shrink-0" />
                <span className="flex-1 text-left">{label}</span>
                <ChevronRightIcon
                    className={cn(
                        "size-3 shrink-0 text-zinc-500 transition-transform duration-200",
                        open && "rotate-90"
                    )}
                />
            </CollapsibleTrigger>

            <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                <div className="ml-4 mt-0.5 flex flex-col gap-1.5 border-l border-zinc-200 dark:border-zinc-800 pl-3 py-1">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className={cn(
                                "block rounded-md px-2 py-1.5 text-sm transition-colors",
                                "text-zinc-500 hover:bg-zinc-400/10 hover:text-zinc-800 dark:hover:text-zinc-50 dark:hover:bg-zinc-400/10",
                                pathname === item.href && "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}