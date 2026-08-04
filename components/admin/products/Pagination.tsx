"use client"

// Importamos las librerias
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

// Definimos el componente paginador
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    // Genera un rango corto de páginas alrededor de la actual, con "..." si hace falta
    function getPageNumbers() {
        const pages: (number | "ellipsis")[] = [];
        const range = 1; // páginas visibles a cada lado de la actual

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - range && i <= currentPage + range)
            ) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== "ellipsis") {
                pages.push("ellipsis");
            }
        }

        return pages;
    }

    return (
        <div className="flex items-center justify-center gap-1.5">
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Previous page"
            >
                <ChevronLeftIcon className="size-4" />
            </button>

            {getPageNumbers().map((page, index) =>
                page === "ellipsis" ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-sm text-zinc-400">
                        …
                    </span>
                ) : (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        className={`min-w-8 h-8 px-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${page === currentPage
                                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950"
                                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                            }`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Next page"
            >
                <ChevronRightIcon className="size-4" />
            </button>
        </div>
    )
}