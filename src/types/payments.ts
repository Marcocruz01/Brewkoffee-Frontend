export type PaymentMethod = "CASH" | "CARD";

export type Payment = {
    id: string;
    amount: number;
    method: "CASH" | "CARD";
    table: { number: number } | null;
    employee: { name: string; lastname: string };
    createdAt: string;
}