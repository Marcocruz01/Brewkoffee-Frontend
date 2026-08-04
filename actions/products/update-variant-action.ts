"use server";

// Importamos las librerias
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { UpdateVariantSchema } from "@/src/schemas";

// Definimos el state
type ActionStateType = {
    success: boolean;
    message: string;
}

// Definimos el action para actualizar una variante
export async function updateVariant(id: string, data: { name: string; price: number }): Promise<ActionStateType> {
    const validate = UpdateVariantSchema.shape.body.safeParse(data);

    if (!validate.success) {
        return { success: false, message: validate.error.issues[0]?.message || "Invalid variant data" }
    }

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("BREWKOFFEE_TOKEN")?.value;

        const res = await fetch(`${process.env.API_BACKEND_URL}/products/variants/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(validate.data),
        });

        const json = await res.json();

        if (!res.ok) {
            return { success: false, message: json.message }
        }

        revalidatePath("/admin/products");

        return { success: true, message: json.message }
    } catch (error) {
        console.error("ERROR REAL:", error);
        return { success: false, message: "Server connection error" }
    }
}