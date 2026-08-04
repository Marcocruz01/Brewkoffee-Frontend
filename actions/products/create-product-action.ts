"use server";

// Importamos las librerias
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CreateProductSchema } from "@/src/schemas/products";

// Definimos el type
type ActionStateType = {
    errors: Record<string, string[]>;
    success: string;
}

// Definimos el action
export async function createProduct(_prevState: any, formData: FormData): Promise<ActionStateType> {
    // Las variantes vienen serializadas como JSON en un hidden input
    let parsedVariants = [];
    try {
        parsedVariants = JSON.parse((formData.get("variants") as string) || "[]");
    } catch {
        parsedVariants = [];
    }

    const productData = {
        name: formData.get("name"),
        description: formData.get("description") || undefined,
        image: formData.get("image") || undefined,
        active: formData.get("active") || undefined,
        categoryId: formData.get("categoryId"),
        variants: parsedVariants,
    }

    const validate = CreateProductSchema.shape.body.safeParse(productData);

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

        const res = await fetch(`${process.env.API_BACKEND_URL}/products`, {
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
            return { errors: fieldErrors, success: "" }
        }

        revalidatePath("/admin/products");

        return { errors: {}, success: json.message }
    } catch (error) {
        console.error("ERROR REAL:", error);
        return { errors: { general: ["Server connection error"] }, success: "" }
    }
}