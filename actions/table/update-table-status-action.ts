"use server";

// Importamos las librerias
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { TableStatus } from "@/src/types/tables";

// Definimos el type
type ActionStateType = {
    success: boolean;
    message: string;
}

// Definimos el action
export async function updateTableStatus(id: string, status: TableStatus): Promise<ActionStateType> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("BREWKOFFEE_TOKEN")?.value;

        const res = await fetch(`${process.env.API_BACKEND_URL}/tables/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
        });

        const json = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: json.message,
            }
        }

        revalidatePath("/admin/tables");

        return {
            success: true,
            message: json.message,
        }
    } catch (error) {
        console.error("ERROR REAL:", error);
        return {
            success: false,
            message: "Server connection error",
        }
    }
}