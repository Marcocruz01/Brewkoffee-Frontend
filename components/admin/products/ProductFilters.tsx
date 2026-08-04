"use client"

// Importamos las librerias
import { Input } from "@/components/ui/input";
import { Category } from "@/src/types/categories";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Definimos las props
type ProductFiltersProps = {
    categories: Category[];
    search: string;
    onSearchChange: (value: string) => void;
    categoryId: string;
    onCategoryChange: (value: string | null) => void;
    status: string;
    onStatusChange: (value: string | null) => void;
    totalCount: number;
}

// Definimos el compoente
export default function ProductFilters({ categories, search, onSearchChange, categoryId, onCategoryChange, status, onStatusChange, totalCount }: ProductFiltersProps) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Búsqueda */}
                <div className="relative flex-1 w-sm">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <Input
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search products..."
                        className="bg-white shadow-none h-9 pl-9 text-base lg:text-sm"
                    />
                </div>

                {/* Categoría */}
                <Select value={categoryId ?? "all"} onValueChange={onCategoryChange}>
                    <SelectTrigger className="w-full sm:w-48 bg-white shadow-none h-10" aria-label="select category">
                        <SelectValue placeholder="Category">
                            {(value: string) =>
                                value === "all"
                                    ? "All categories"
                                    : categories.find((c) => c.id === value)?.name ?? "All categories"
                            }
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Estado */}
                <Select value={status} onValueChange={onStatusChange}>
                    <SelectTrigger className="w-full sm:w-40 bg-white shadow-none h-10" aria-label="select status">
                        <SelectValue placeholder="Status">
                            {(value: string) =>
                                value === "all" ? "All status" : value === "active" ? "Active" : "Inactive"
                            }
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Contador de productos */}
            <p className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                Showing {totalCount} {totalCount === 1 ? "product" : "products"}
            </p>
        </div>
    )
}