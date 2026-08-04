"use server";

// Importamos las librerias
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CreateTableSchema } from "@/src/schemas";

// Definimos el type
type ActionStateType = {
    errors: Record<string, string[]>;
    success: string;
}

// Definimos el action
export async function createTable(_prevState: any, formData: FormData): Promise<ActionStateType> {
    const tableData = {
        number: formData.get('number'),
        capacity: formData.get('capacity'),
        zone: formData.get('zone'),
        status: formData.get('status') || undefined,
    }

    // Validamos contra el shape interno
    const validate = CreateTableSchema.shape.body.safeParse(tableData);

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

        const res = await fetch(`${process.env.API_BACKEND_URL}/tables`, {
            method: 'POST',
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
                fieldErrors["general"] = [json.message || "Error creating table"];
            }
            return { errors: fieldErrors, success: '' }
        }

        revalidatePath("/admin/tables");

        return { errors: {}, success: json.message }
    } catch (error) {
        console.error("ERROR REAL:", error);
        return { errors: { general: ["Server connection error"] }, success: '' }
    }
}