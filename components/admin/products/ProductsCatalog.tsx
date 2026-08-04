"use client"

// Importamos las librerias
import ProductsGrid from "./ProductsGrid";
import Pagination from "./Pagination";
import { useMemo, useState } from "react";
import ProductFilters from "./ProductFilters";
import { Product } from "@/src/types/products";
import { Category } from "@/src/types/categories";

// Definimos las props
type ProductsCatalogProps = {
    data: Product[];
    categories: Category[];
}

// Paginador
const PAGE_SIZE = 15;

// Componente que orquesta filtros + paginación + grid, 100% client-side
export default function ProductsCatalog({ data, categories }: ProductsCatalogProps) {
    const [search, setSearch] = useState("");
    const [categoryId, setCategoryId] = useState("all");
    const [status, setStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = useMemo(() => {
        return data.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = categoryId === "all" || product.categoryId === categoryId;
            const matchesStatus =
                status === "all" ||
                (status === "active" && product.active) ||
                (status === "inactive" && !product.active);

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [data, search, categoryId, status]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredProducts.slice(start, start + PAGE_SIZE);
    }, [filteredProducts, currentPage]);

    // Handlers que resetean a página 1 cada vez que cambia un filtro,
    // para no quedarte viendo una página vacía si el nuevo filtro tiene menos resultados
    function handleSearchChange(value: string) {
        setSearch(value);
        setCurrentPage(1);
    }

    function handleCategoryChange(val: string | null) {
        setCategoryId(val ?? "all");
        setCurrentPage(1);
    }

    function handleStatusChange(val: string | null) {
        setStatus(val ?? "all");
        setCurrentPage(1);
    }

    return (
        <div className="flex flex-col gap-6">
            <ProductFilters
                categories={categories}
                search={search}
                onSearchChange={handleSearchChange}
                categoryId={categoryId}
                onCategoryChange={handleCategoryChange}
                status={status}
                onStatusChange={handleStatusChange}
                totalCount={filteredProducts.length}
            />

            <ProductsGrid data={paginatedProducts} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}