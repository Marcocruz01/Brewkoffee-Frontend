// Importamos las librerias
import { apiFetch } from "@/lib/fetcher";

type Payment = {
    id: string;
    amount: number;
    method: "CASH" | "CARD";
    table: { number: number } | null;
    employee: { name: string; lastname: string };
    createdAt: string;
}

export function getPayments() {
    return apiFetch<Payment[]>("/payments", { cache: "no-store" });
}