"use server";

// Importamos las librerias
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CreateEmployeeSchema } from "@/src/schemas";

// Definimos el type
type ActionStateType = {
    errors: Record<string, string[]>;
    success: string;
}

// Definimos el action
export async function createEmployee(_prevState: any, formData: FormData): Promise<ActionStateType> {
    const employeeData = {
        name: formData.get('name'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: formData.get('role'),
        age: formData.get('age'),
        schedule: formData.get('schedule'),
    }

    // Validamos contra el shape interno
    const validate = CreateEmployeeSchema.shape.body.safeParse(employeeData);

    if (!validate.success) {
        // Mapeamos cada issue de Zod a su campo correspondiente
        const fieldErrors: Record<string, string[]> = {};

        for (const issue of validate.error.issues) {
            const field = issue.path[0] as string;
            if (!fieldErrors[field]) fieldErrors[field] = [];
            fieldErrors[field].push(issue.message);
        }

        return {
            errors: fieldErrors,
            success: "",
        }
    }

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("BREWKOFFEE_TOKEN")?.value;

        const res = await fetch(`${process.env.API_BACKEND_URL}/employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(validate.data),
        });

        const json = await res.json();
        console.log(json);
        

        if (!res.ok) {
            // Errores del backend también los mapeamos por campo
            const fieldErrors: Record<string, string[]> = {};

            if (json.errors) {
                for (const { field, message } of json.errors) {
                    if (!fieldErrors[field]) fieldErrors[field] = [];
                    fieldErrors[field].push(message);
                }
            } else {
                fieldErrors["general"] = [json.message];
            }

            return {
                errors: fieldErrors,
                success: '',
            }
        }

        revalidatePath("/admin/employees");

        return {
            errors: {},
            success: json.message,
        }
    } catch(error) {
        console.error("ERROR REAL:", error);
        return {
            errors: { general: ["Server connection error"] },
            success: '',
        }
    }
}