"use server";

// Importamos las librerias
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CreateVariantSchema } from "@/src/schemas";

// Definimos el estado
type ActionStateType = {
    errors: Record<string, string[]>;
    success: string;
}

// Bindeamos productId desde el componente, igual que updateCategory con el id
export async function createVariant(productId: string, _prevState: any, formData: FormData): Promise<ActionStateType> {
    const rawData = {
        name: formData.get("name"),
        price: formData.get("price"),
    }

    const validate = CreateVariantSchema.shape.body.safeParse(rawData);

    if (!validate.success) {
        const fieldErrors: Record<string, string[]> = {};
        for (const issue of validate.error.issues) {
            const field = issue.path[0] as string;
            if (!fieldErrors[field]) fieldErrors[field] = [];
            fieldErrors[field].push(issue.message);
        }
        return { errors: fieldErrors, success: "" }
    }

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("BREWKOFFEE_TOKEN")?.value;

        const res = await fetch(`${process.env.API_BACKEND_URL}/products/${productId}/variants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(validate.data),
        });

        const json = await res.json();

        if (!res.ok) {
            return { errors: { general: [json.message] }, success: '' }
        }

        revalidatePath("/admin/products");

        return { errors: {}, success: json.message }
    } catch (error) {
        console.error("ERROR REAL:", error);
        return { errors: { general: ["Server connection error"] }, success: '' }
    }
}