"use server";

// Importamos las librerias
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Definimos el estado
type ActionStateTypeProps = {
    success: boolean;
    message: string;
}

// Definimos el action de eliminar
export async function deleteEmployee(id: string): Promise<ActionStateTypeProps> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("BREWKOFFEE_TOKEN")?.value;

        const res = await fetch(`${process.env.API_BACKEND_URL}/employees/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const json = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: json.message || "Failed to delete employee",
            }
        }

        revalidatePath("/admin/employees");

        return {
            success: true,
            message: json.message || "Employee deleted successfully",
        }
    } catch (error) {
        console.error("ERROR REAL:", error);
        return {
            success: false,
            message: "Server connection error",
        }
    }
}