"use server";

// Importamos las librerias
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { UpdateProfileSchema } from "@/src/schemas/profile";

// Definimos el state
type ActionStateType = {
    errors: Record<string, string[]>;
    success: string;
}

// Definimos el action para actualizar al empleado
export async function updateProfile(_prevState: any, formData: FormData): Promise<ActionStateType> {
    const rawData = {
        name: formData.get("name"),
        lastname: formData.get("lastname"),
        email: formData.get("email"),
        age: formData.get("age"),
    }

    const validate = UpdateProfileSchema.shape.body.safeParse(rawData);

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

        const res = await fetch(`${process.env.API_BACKEND_URL}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
                fieldErrors["general"] = [json.message || "Error updating profile"];
            }
            return { errors: fieldErrors, success: '' }
        }

        revalidatePath("/admin/profile");

        return { errors: {}, success: json.message }
    } catch (error) {
        console.error("ERROR REAL:", error);
        return { errors: { general: ["Server connection error"] }, success: '' }
    }
}