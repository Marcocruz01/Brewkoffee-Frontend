// Types para las órdenes
export type OrderType = "DINE_IN" | "TAKEOUT";
export type OrderStatus = "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED" | "CANCELLED";

export type Order = {
    id: string;
    type: OrderType;
    customerName: string | null;
    status: OrderStatus;
    paid: boolean;
    subtotal: number;
    tax: number;
    total: number;
    table: { id: string; number: number; zone: string } | null;
    employee: { id: string; name: string; lastname: string };
    items: {
        id: string;
        quantity: number;
        price: number;
        variant: {
            id: string;
            name: string;
            product: { id: string; name: string; image: string | null };
        };
    }[];
    createdAt: string;
    updatedAt: string;
}