"use client"

// Importamos las librerias
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type OrderHistoryFiltersProps = {
    search: string;
    onSearchChange: (value: string) => void;
    type: string;
    onTypeChange: (value: string | null) => void;
    status: string;
    onStatusChange: (value: string | null) => void;
    totalCount: number;
}

export default function OrderHistoryFilters({
    search,
    onSearchChange,
    type,
    onTypeChange,
    status,
    onStatusChange,
    totalCount,
}: OrderHistoryFiltersProps) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Búsqueda por mesa/cliente */}
                <div className="relative flex-1 w-80">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <Input
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search by table or customer..."
                        className="bg-white shadow-none h-9 pl-9"
                    />
                </div>

                {/* Tipo de orden */}
                <Select value={type} onValueChange={onTypeChange}>
                    <SelectTrigger className="w-full sm:w-40 bg-white shadow-none h-10">
                        <SelectValue placeholder="Type">
                            {(value: string) =>
                                value === "all" ? "All types" : value === "DINE_IN" ? "Dine in" : "Takeout"
                            }
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="DINE_IN">Dine in</SelectItem>
                        <SelectItem value="TAKEOUT">Takeout</SelectItem>
                    </SelectContent>
                </Select>

                {/* Status */}
                <Select value={status} onValueChange={onStatusChange}>
                    <SelectTrigger className="w-full sm:w-40 bg-white shadow-none h-10">
                        <SelectValue placeholder="Status">
                            {(value: string) =>
                                value === "all" ? "All status" : value === "DELIVERED" ? "Delivered" : "Cancelled"
                            }
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All status</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                {totalCount} {totalCount === 1 ? "order" : "orders"}
            </p>
        </div>
    )
}