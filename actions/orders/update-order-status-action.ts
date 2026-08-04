"use server";

// Importamos las librerias
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type ActionStateType = {
    success: boolean;
    message: string;
}

// Action para avanzar el status de una orden (el mesero solo marca DELIVERED cuando está READY)
export async function updateOrderStatus(orderId: string, status: string): Promise<ActionStateType> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("BREWKOFFEE_TOKEN")?.value;

        const res = await fetch(`${process.env.API_BACKEND_URL}/orders/${orderId}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
        });

        const json = await res.json();

        if (!res.ok) {
            return { success: false, message: json.message};
        }

        revalidatePath("/orders/status");

        return { success: true, message: json.message};
    } catch (error) {
        console.error("ERROR REAL:", error);
        return { success: false, message: "Server connection error" };
    }
}