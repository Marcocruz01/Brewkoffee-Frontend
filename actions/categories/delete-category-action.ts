"use server";

// Importamos las librerias
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Definimos el estado
type ActionStateType = {
    success: boolean;
    message: string;
}

// Definimos el actionn para eliminar una categoria
export async function deleteCategory(id: string): Promise<ActionStateType> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("BREWKOFFEE_TOKEN")?.value;

        const res = await fetch(`${process.env.API_BACKEND_URL}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const json = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: json.message || "Failed to delete category",
            }
        }

        revalidatePath("/admin/products/categories");

        return {
            success: true,
            message: json.message || "Category deleted successfully",
        }
    } catch (error) {
        console.error("ERROR REAL:", error);
        return {
            success: false,
            message: "Server connection error",
        }
    }
}