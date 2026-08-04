"use client"

// Importamos las librerias
import { useMemo, useState } from "react";
import { Order } from "@/src/types/orders";
import OrderHistoryFilters from "./OrderHistoryFilters";
import OrderHistoryRow from "./OrderHistoryRow";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import Pagination from "../admin/products/Pagination";

type OrderHistoryTableProps = {
    orders: Order[];
}

const PAGE_SIZE = 15;

export default function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
    const [search, setSearch] = useState("");
    const [type, setType] = useState("all");
    const [status, setStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const label = order.type === "DINE_IN" ? `table ${order.table?.number}` : order.customerName || "";
            const matchesSearch = label.toLowerCase().includes(search.toLowerCase());
            const matchesType = type === "all" || order.type === type;
            const matchesStatus = status === "all" || order.status === status;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [orders, search, type, status]);

    const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));

    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredOrders.slice(start, start + PAGE_SIZE);
    }, [filteredOrders, currentPage]);

    function handleSearchChange(value: string) {
        setSearch(value);
        setCurrentPage(1);
    }

    function handleTypeChange(value: string | null) {
        setType(value ?? "all");
        setCurrentPage(1);
    }

    function handleStatusChange(value: string | null) {
        setStatus(value ?? "all");
        setCurrentPage(1);
    }

    return (
        <div className="flex flex-col gap-6">
            <OrderHistoryFilters
                search={search}
                onSearchChange={handleSearchChange}
                type={type}
                onTypeChange={handleTypeChange}
                status={status}
                onStatusChange={handleStatusChange}
                totalCount={filteredOrders.length}
            />

            {filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-72 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
                    <ArchiveBoxIcon className="size-8 text-zinc-300 dark:text-zinc-700 mb-3" />
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white">No orders found</h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Try adjusting your filters.</p>
                </div>
            ) : (
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                    <div className="grid grid-cols-[100px_180px_1fr_90px_110px_130px] gap-3 px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/40 border-b border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">                        <span>Type</span>
                        <span>Table / Customer</span>
                        <span>Items</span>
                        <span>Total</span>
                        <span>Status</span>
                        <span>Time</span>
                    </div>

                    {paginatedOrders.map((order) => (
                        <OrderHistoryRow key={order.id} order={order} />
                    ))}
                </div>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    )
}