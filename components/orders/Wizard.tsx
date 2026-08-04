"use client";

// Importamos las librerias
import { useState } from "react";
import CatalogStep from "./CatalogStep";
import TableStep from "./steps/TableStep";
import WizardHeader from "./WizardHeader";
import { Table } from "@/src/types/tables";
import { OrderType } from "@/src/types/orders";
import { Product } from "@/src/types/products";
import OrderTypeStep from "./steps/OrderTypeStep";
import { Category } from "@/src/types/categories";
import CustomerNameStep from "./steps/CustomerNameStep";

// Type de un producto dentro del carrito
export type CartItem = {
    variantId: string;
    productName: string;
    variantName: string;
    price: number;
    quantity: number;
    image: string | null;
}

// Definimos las porps
type WaiterWizardProps = {
    categories: Category[];
    products: Product[];
    tables: Table[];
}

// Definimos el componente
export default function Wizard({ categories, products, tables }: WaiterWizardProps) {
    const [step, setStep] = useState(1);
    const [orderType, setOrderType] = useState<OrderType | null>(null);
    const [tableId, setTableId] = useState<string | null>(null);
    const [customerName, setCustomerName] = useState("");
    const [cart, setCart] = useState<CartItem[]>([]);

    // Selecciona el tipo de orden y avanza al paso 2
    function handleSelectType(type: OrderType) {
        setOrderType(type);
        setStep(2);
    }

    // Selecciona la mesa y avanza directo al catálogo
    function handleSelectTable(id: string) {
        setTableId(id);
        setStep(3);
    }

    // Confirma el nombre (o lo deja vacío) y avanza al catálogo
    function handleConfirmCustomerName() {
        setStep(3);
    }

    // Regresa un paso, limpiando la selección del paso que se abandona
    function handleBack() {
        if (step === 2) setOrderType(null);
        if (step === 3) setTableId(null);
        setStep((prev) => Math.max(1, prev - 1));
    }

    // Reinicia todo el wizard para armar una nueva orden desde cero
    function handleReset() {
        setStep(1);
        setOrderType(null);
        setTableId(null);
        setCustomerName("");
        setCart([]);
    }

    return (
        <div className="flex flex-col h-full">
            <WizardHeader step={step} onBack={step > 1 ? handleBack : undefined} />

            <div className="flex-1 overflow-hidden">
                {/* Paso 1 Tipo de orden */}
                {step === 1 && <OrderTypeStep onSelect={handleSelectType} />}

                {/* Paso 2 DINE IN Seleccion de mesa */}
                {step === 2 && orderType === "DINE_IN" && (
                    <TableStep tables={tables} onSelect={handleSelectTable} />
                )}

                {/* Paso 2 TAKEOUT Nombre del cliente */}
                {step === 2 && orderType === "TAKEOUT" && (
                    <CustomerNameStep
                        customerName={customerName}
                        onChange={setCustomerName}
                        onConfirm={handleConfirmCustomerName}
                    />
                )}

                {/*  Paso 3 Seleccion de productos del carrito y crear orden */}
                {step === 3 && orderType && (
                    <CatalogStep
                        categories={categories}
                        products={products}
                        cart={cart}
                        setCart={setCart}
                        orderType={orderType}
                        tableId={tableId}
                        customerName={customerName}
                        onOrderCreated={handleReset}
                    />
                )}
            </div>
        </div>
    )
}