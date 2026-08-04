"use client"

import { toast } from "sonner";
import { useEffect, useActionState } from "react";
import SubmitButton from "@/components/ui/SubmitButton";
import { TrashIcon, MinusIcon, PlusIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import { createOrder } from "@/actions/orders/create-order-action";
import { CartItem } from "./Wizard";
import { OrderType } from "@/src/types/orders";

const TAX_RATE = 0.16; // 16% IVA México

type CartPanelProps = {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  orderType: OrderType;
  tableId: string | null;
  customerName: string;
  onOrderCreated: () => void;
}

export default function CartPanel({ cart, setCart, orderType, tableId, customerName, onOrderCreated }: CartPanelProps) {
  const [state, dispatch] = useActionState(createOrder, { errors: {}, success: "" });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      onOrderCreated();
    } else if (state.errors.general) {
      toast.error(state.errors.general[0]);
    }
  }, [state]);

  function updateQuantity(variantId: string, delta: number) {
    setCart(
      cart
        .map((item) => (item.variantId === variantId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(variantId: string) {
    setCart(cart.filter((item) => item.variantId !== variantId));
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const items = cart.map((item) => ({ variantId: item.variantId, quantity: item.quantity }));

  return (
    <div className="flex flex-col h-full w-80 lg:w-96 shrink-0 border-l border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      {/* Header con Badge Sistemático */}
      <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Current Order</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/50">
              {orderType === "DINE_IN" ? "Dine in" : "Takeout"}
            </span>
            {customerName && (
              <span className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium truncate max-w-30">
                <UserIcon className="size-3 text-zinc-400 shrink-0" />
                {customerName}
              </span>
            )}
          </div>
        </div>

        {/* Total de Items en Cart */}
        <div className="flex items-center justify-center size-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-bold">
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </div>
      </div>

      {/* Lista de Productos */}
      <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-zinc-100 dark:divide-zinc-800/50">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4 select-none">
            {/* Contenedor del Ícono con Luz/Glow */}
            <div className="relative flex items-center justify-center size-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-400 dark:text-zinc-500 mb-3 border border-zinc-200/50 dark:border-zinc-700/50 shadow-2xs">
              <ShoppingBagIcon className="size-7 stroke-[1.5]" />

              {/* Punto de estado o adorno tenue */}
              <span className="absolute -top-1 -right-1 size-3 rounded-full bg-blue-500/80 ring-2 ring-white dark:ring-zinc-900 animate-pulse" />
            </div>

            {/* Texto Principal */}
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Your cart is empty
            </h3>

            {/* Subtexto */}
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 max-w-45 mt-1 leading-relaxed">
              Select products from the catalog to build the order.
            </p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.variantId} className="py-3.5 first:pt-0 last:pb-0 flex flex-col gap-2 group">
              {/* Línea 1: Nombre y Borrar */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
                    {item.productName}
                  </span>
                  <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                    {item.variantName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.variantId)}
                  className="p-1 -mr-1 rounded-md text-zinc-300 hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <TrashIcon className="size-3.5" />
                </button>
              </div>

              {/* Línea 2: Controles de Cantidad y Precio Total del Item */}
              <div className="flex items-center justify-between pt-0.5">
                {/* Controller estilo Segmented / Pill */}
                <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5 bg-zinc-50 dark:bg-zinc-800/40">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.variantId, -1)}
                    className="size-6 flex items-center justify-center rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700 hover:shadow-2xs transition-all cursor-pointer"
                  >
                    <MinusIcon className="size-3 stroke-[2.5]" />
                  </button>
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 w-7 text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.variantId, 1)}
                    className="size-6 flex items-center justify-center rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700 hover:shadow-2xs transition-all cursor-pointer"
                  >
                    <PlusIcon className="size-3 stroke-[2.5]" />
                  </button>
                </div>

                {/* Precio Acumulado por ítem */}
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer / Summary Form */}
      <form action={dispatch} className="border-t border-zinc-100 dark:border-zinc-800/60 p-5 flex flex-col gap-4 bg-zinc-50/50 dark:bg-zinc-900/50">
        <input type="hidden" name="type" value={orderType} />
        {tableId && <input type="hidden" name="tableId" value={tableId} />}
        {orderType === "TAKEOUT" && customerName && (
          <input type="hidden" name="customerName" value={customerName} />
        )}
        <input type="hidden" name="items" value={JSON.stringify(items)} />

        {/* Desglose de totales */}
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
            <span>Subtotal</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
            <span>Tax (16%)</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-zinc-900 dark:text-zinc-100 text-sm pt-2 border-t border-zinc-200/80 dark:border-zinc-800">
            <span>Total</span>
            <span className="text-base">${total.toFixed(2)}</span>
          </div>
        </div>

        <SubmitButton
          loadingLabel="Sending..."
          label="Send to kitchen"
          disabled={cart.length === 0}
        />
      </form>
    </div>
  )
}