"use client"

// Importamos las librerias
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Order } from "@/src/types/orders";
import { BanknotesIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { createPayment } from "@/actions/payment/create-payment-action";

type ChargeModalProps = {
    customerLabel: string;
    orders: Order[];
    isOpenModal: boolean;
    onClose: () => void;
}

type PaymentMethod = "CASH" | "CARD";

export default function ChargeModal({ customerLabel, orders, isOpenModal, onClose }: ChargeModalProps) {
    const router = useRouter();
    const [method, setMethod] = useState<PaymentMethod | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const total = orders.reduce((sum, order) => sum + order.total, 0);

    async function handleConfirm() {
        if (!method) return;
        setIsSubmitting(true);

        const orderIds = orders.map((order) => order.id);
        const tableId = orders[0]?.table?.id ?? null;

        const result = await createPayment(tableId, orderIds, method);

        setIsSubmitting(false);

        if (result.success) {
            toast.success(result.message);
            setMethod(null);
            onClose();
            router.refresh();
        } else {
            toast.error(result.message);
        }
    }

    function handleClose() {
        setMethod(null);
        onClose();
    }

    return (
        <Dialog open={isOpenModal} onOpenChange={handleClose}>
            <DialogContent className="max-w-md bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                        Charge <span className="text-amber-600">{customerLabel}</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                        Review the total and select a payment method.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-1 py-2">
                    {orders.map((order) => (
                        <div key={order.id} className="flex flex-col gap-1 py-2 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between text-sm">
                                    <span className="text-zinc-600 dark:text-zinc-300">
                                        {item.quantity}x {item.variant.product.name} ({item.variant.name})
                                    </span>
                                    <span className="text-zinc-400 dark:text-zinc-500">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between py-2 border-t border-zinc-200 dark:border-zinc-800">
                    <span className="text-base font-semibold text-zinc-900 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-zinc-900 dark:text-white">${total.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                    <button
                        type="button"
                        onClick={() => setMethod("CASH")}
                        disabled={isSubmitting}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${method === "CASH"
                            ? "border-amber-500 bg-amber-50 dark:bg-amber-500/10"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                            }`}
                    >
                        <BanknotesIcon className="size-6 text-zinc-600 dark:text-zinc-300" />
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">Cash</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setMethod("CARD")}
                        disabled={isSubmitting}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${method === "CARD"
                            ? "border-amber-500 bg-amber-50 dark:bg-amber-500/10"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                            }`}
                    >
                        <CreditCardIcon className="size-6 text-zinc-600 dark:text-zinc-300" />
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">Card</span>
                    </button>
                </div>

                <div className="flex items-center justify-end gap-2 mt-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={!method || isSubmitting}
                        className="px-4 py-2 rounded-lg text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                        {isSubmitting ? "Processing..." : "Confirm payment"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}