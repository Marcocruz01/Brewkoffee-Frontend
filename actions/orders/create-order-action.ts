"use server";

// Importamos las librerias
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CreateOrderSchema } from "@/src/schemas/orders";

// Definimos el type
type ActionStateType = {
    errors: Record<string, string[]>;
    success: string;
}

// Definimos el action para crear una orden
export async function createOrder(_prevState: any, formData: FormData): Promise<ActionStateType> {
    let items = [];
    try {
        items = JSON.parse((formData.get("items") as string) || "[]");
    } catch {
        return { errors: { items: ["Invalid items data"] }, success: "" };
    }

    const rawData = {
        type: formData.get("type"),
        tableId: formData.get("tableId") || undefined,
        customerName: formData.get("customerName") || undefined,
        items,
    };

    const validate = CreateOrderSchema.shape.body.safeParse(rawData);

    if (!validate.success) {
        const fieldErrors: Record<string, string[]> = {};
        for (const issue of validate.error.issues) {
            const field = issue.path[0] as string;
            if (!fieldErrors[field]) fieldErrors[field] = [];
            fieldErrors[field].push(issue.message);
        }
        return { errors: fieldErrors, success: "" };
    }

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("BREWKOFFEE_TOKEN")?.value;

        const res = await fetch(`${process.env.API_BACKEND_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(validate.data),
        });

        const json = await res.json();

        if (!res.ok) {
            const fieldErrors: Record<string, string[]> = {};
            if (json.errors) {
                for (const { field, message } of json.errors) {
                    if (!fieldErrors[field]) fieldErrors[field] = [];
                    fieldErrors[field].push(message);
                }
            } else {
                fieldErrors["general"] = [json.message];
            }
            return { errors: fieldErrors, success: "" };
        }

        // Revalidamos las rutas
        revalidatePath("/orders");
        revalidatePath("/tables");
        // Retornamos mensaje
        return { errors: {}, success: json.message };
    } catch (error) {
        console.error("ERROR REAL:", error);
        return { errors: { general: ["Server connection error"] }, success: "" };
    }
}