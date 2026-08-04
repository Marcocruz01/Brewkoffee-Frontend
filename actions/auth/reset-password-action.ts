"use server";

// Importamos las librerias
import { resetPasswordSchema } from "@/src/schemas";

// Definimos el type de estado que manejara el action
type ActionStateType = {
    errors: {
        email?: string[];
        token?: string[];
        password?: string[];
        repeatPassword?: string[];
    };
    success: boolean;
    message?: string | null;
    inputs?: {
        password?: string;
        repeatPassword?: string;
    }
}

// Definimos el action para restablecer el password
export async function resetPassword(_prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {
    // Obtenemos lo datos
    const data = {
        email: formData.get("email"),
        token: formData.get("token"),
        password: formData.get("password"),
        repeatPassword: formData.get("repeatPassword")
    }

    // Validamos los datos entrantes
    const validate = resetPasswordSchema.safeParse(data);
    // Si falla y retorna errores mostramos
    if (!validate.success) {
        return {
            errors: validate.error.flatten().fieldErrors,
            success: false,
            message: null,
            inputs: {
                password: data.password?.toString() || "",
                repeatPassword: data.repeatPassword?.toString() || ""
            }
        }
    }

    // Contruimos la peticion con el try
    try {
        // construimos la url
        const url = `${process.env.API_BACKEND_URL}/auth/reset-password`;
        const req = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: validate.data.email,
                token: validate.data.token,
                password: validate.data.password,
                repeatPassword: validate.data.repeatPassword
            })
        });

        // Consumimos la respuesta
        const json = await req.json();
        // Validamos el estado de la respuesta del json
        if(!req.ok) {
            return {
                errors: {},
                success: false,
                message: json.message,
                inputs: {
                    password: validate.data.password,
                    repeatPassword: validate.data.repeatPassword
                }
            }
        }

        // Si la respuesta es valida mandamos mensaje ok
        return {
            errors: {},
            success: true,
            message: json.message
        }

    } catch (error) {
        return {
            errors: {},
            success: false,
            message: "Connection error. Please try again later.",
            inputs: {
                password: validate.data.password,
                repeatPassword: validate.data.repeatPassword
            }
        }
    }
}