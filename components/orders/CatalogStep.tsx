"use client";

// Importamos las librerias
import { CartItem } from "./Wizard";
import CartPanel from "./CartPanel";
import { useMemo, useState } from "react";
import { Product } from "@/src/types/products";
import { OrderType } from "@/src/types/orders";
import { Category } from "@/src/types/categories";
import ProductPickerCard from "./ProductPickerCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Definimos las porps
type CatalogStepProps = {
    categories: Category[];
    products: Product[];
    cart: CartItem[];
    setCart: (cart: CartItem[]) => void;
    orderType: OrderType;
    tableId: string | null;
    customerName: string;
    onOrderCreated: () => void;
}

// Definimos el componente
export default function CatalogStep({ categories, products, cart, setCart, orderType, tableId, customerName, onOrderCreated }: CatalogStepProps) {
    // Estado de la categoria
    const [categoryId, setCategoryId] = useState("all");
    // Estado para la busqueda
    const [search, setSearch] = useState("");

    // Aplicacion de filtros a los productos
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = categoryId === "all" || product.categoryId === categoryId;
            return matchesSearch && matchesCategory && product.active;
        });
    }, [products, search, categoryId]);

    // Agrega una variante al carrito, incrementando la cantidad si ya existía
    function handleAddToCart(productName: string, image: string | null, variantId: string, variantName: string, price: number) {
        const existing = cart.find((item) => item.variantId === variantId);
        if (existing) {
            setCart(cart.map((item) => (item.variantId === variantId ? { ...item, quantity: item.quantity + 1 } : item)));
        } else {
            setCart([...cart, { variantId, variantName, productName, price, quantity: 1, image }]);
        }
    }

    return (
        <div className="flex h-full">
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex items-end gap-3 p-5">
                    {/* Filtros por busqueda */}
                    <div className="relative flex-1 max-w-sm">
                        <MagnifyingGlassIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search menu..."
                            className="w-full pl-4 pr-11 py-2.5 text-base lg:text-sm rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all duration-200"
                        />
                    </div>

                    {/* Filtros por categoria botones */}
                    <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800 rounded-xl w-fit overflow-x-auto scrollbar-none mx-5">
                        <button
                            type="button"
                            onClick={() => setCategoryId("all")}
                            className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${categoryId === "all"
                                ? "bg-zinc-900 text-zinc-50 shadow-2xs dark:bg-white dark:text-zinc-900 dark:shadow-none"
                                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50"
                                }`}
                        >
                            All
                        </button>

                        {categories.map((category) => {
                            const isSelected = categoryId === category.id;
                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => setCategoryId(category.id)}
                                    className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${isSelected
                                        ? "bg-zinc-900 text-zinc-50 shadow-2xs dark:bg-white dark:text-zinc-900 dark:shadow-none"
                                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50"
                                        }`}
                                >
                                    {category.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Productos catalogo */}
                <div className="flex-1 overflow-y-auto p-5">
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                        {filteredProducts.map((product) => (
                            <ProductPickerCard
                                key={product.id}
                                product={product}
                                onAdd={(variantId, variantName, price) =>
                                    handleAddToCart(product.name, product.image, variantId, variantName, price)
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
            <CartPanel
                cart={cart}
                setCart={setCart}
                orderType={orderType}
                tableId={tableId}
                customerName={customerName}
                onOrderCreated={onOrderCreated}
            />
        </div>

    )
}
