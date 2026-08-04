"use client"

// Importamos las librerias
import { toast } from "sonner";
import { useState } from "react";
import { Order } from "@/src/types/orders";
import { updateOrderStatus } from "@/actions/orders/update-order-status-action";
import { CheckCircleIcon, PlayIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { CookingStation } from "@vectoricons/atlas-icons-react";

// Definimos el componente
export default function KitchenOrderCard({ order }: { order: Order }) {
    const [isUpdating, setIsUpdating] = useState<string | null>(null);
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    async function handleStatusChange(status: string) {
        setIsUpdating(status);
        const result = await updateOrderStatus(order.id, status);
        setIsUpdating(null);

        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    }

    async function handleCancel() {
        setIsCancelOpen(false);
        await handleStatusChange("CANCELLED");
    }

    return (
        <>
            <div className="flex flex-col gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {order.type === "DINE_IN" ? `Table ${order.table?.number}` : order.customerName || "Takeout"}
                        </span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">
                            {new Date(order.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                        {order.type === "DINE_IN" ? "Dine in" : "Takeout"}
                    </span>
                </div>

                <div className="flex flex-col gap-1">
                    {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 text-sm">
                            <span className="font-semibold text-zinc-900 dark:text-white shrink-0">{item.quantity}x</span>
                            <span className="text-zinc-600 dark:text-zinc-300">
                                {item.variant.product.name} ({item.variant.name})
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/50">
                    {order.status === "PENDING" && (
                        <button
                            type="button"
                            onClick={() => handleStatusChange("IN_PROGRESS")}
                            disabled={isUpdating === "IN_PROGRESS"}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                        >
                            <CookingStation className="size-3.5"/>
                            {isUpdating === "IN_PROGRESS" ? "Accepting..." : "Accept"}
                        </button>
                    )}

                    {order.status === "IN_PROGRESS" && (
                        <button
                            type="button"
                            onClick={() => handleStatusChange("READY")}
                            disabled={isUpdating === "READY"}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                        >
                            <CheckCircleIcon className="size-3.5" />
                            {isUpdating === "READY" ? "Marking..." : "Mark ready"}
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => setIsCancelOpen(true)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                        aria-label="Cancel order"
                    >
                        <XCircleIcon className="size-4" />
                    </button>
                </div>
            </div>

            <AlertDialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will mark the order as cancelled
                            {order.type === "DINE_IN" && " and free up the table"}. This can't be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Keep order</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleCancel}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600 cursor-pointer"
                        >
                            Cancel order
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}