// Importamos las librerias
import { OrderType } from "@/src/types/orders";
import { BuildingStorefrontIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

// Definimos las props
type OrderTypeStepProps = {
    onSelect: (type: OrderType) => void;
}

// Definimos el componente de el tipo de orden
export default function OrderTypeStep({ onSelect }: OrderTypeStepProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full px-6">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">New order</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">How will this order be served?</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
                <button
                    type="button"
                    onClick={() => onSelect("DINE_IN")}
                    className="flex flex-col items-center gap-3 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-800 dark:hover:border-zinc-50 hover:shadow-md transition-all cursor-pointer"
                >
                    <div className="flex items-center justify-center size-14 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <BuildingStorefrontIcon className="size-7" />
                    </div>
                    <span className="text-base font-semibold text-zinc-900 dark:text-white">Dine In</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 text-center">Assign this order to a table</span>
                </button>

                <button
                    type="button"
                    onClick={() => onSelect("TAKEOUT")}
                    className="flex flex-col items-center gap-3 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-800 dark:hover:border-zinc-50 hover:shadow-md transition-all cursor-pointer"
                >
                    <div className="flex items-center justify-center size-14 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <ShoppingBagIcon className="size-7" />
                    </div>
                    <span className="text-base font-semibold text-zinc-900 dark:text-white">Takeout</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 text-center">No table needed</span>
                </button>
            </div>
        </div>
    )
}