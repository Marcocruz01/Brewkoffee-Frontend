"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type ActionStateType = {
    success: boolean;
    message: string;
}

export async function createPayment(
    tableId: string | null,
    orderIds: string[],
    method: "CASH" | "CARD"
): Promise<ActionStateType> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("BREWKOFFEE_TOKEN")?.value;

        const res = await fetch(`${process.env.API_BACKEND_URL}/payments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ tableId, orderIds, method }),
        });

        const json = await res.json();

        if (!res.ok) {
            return { success: false, message: json.message || "Failed to process payment" };
        }

        revalidatePath("/orders/tables");
        revalidatePath("/orders/history");

        return { success: true, message: json.message || "Payment processed successfully" };
    } catch (error) {
        console.error("ERROR REAL:", error);
        return { success: false, message: "Server connection error" };
    }
}