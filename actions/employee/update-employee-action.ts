"use server";

// Importamos las librerias
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { UpdateEmployeeSchema } from "@/src/schemas";

// Definimos el estado
type ActionStateType = {
    errors: Record<string, string[]>;
    success: string;
}

// Definimo el action de actualizar
export async function updateEmployee(id: string, _prevState: any, formData: FormData): Promise<ActionStateType> {
    const rawData = Object.fromEntries(formData);

    // Si el usuario dejó password vacío, lo quitamos para no mandarlo
    const employeeData = {
        ...rawData,
        password: rawData.password ? rawData.password : undefined,
    };

    const validate = UpdateEmployeeSchema.shape.body.safeParse(employeeData);

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

        const res = await fetch(`${process.env.API_BACKEND_URL}/employees/${id}`, {
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
                fieldErrors["general"] = [json.message];
            }
            return { errors: fieldErrors, success: '' }
        }

        revalidatePath("/admin/employees");

        return { errors: {}, success: json.message }
    } catch (error) {
        console.error("ERROR REAL:", error);
        return { errors: { general: ["Server connection error"] }, success: '' }
    }
}