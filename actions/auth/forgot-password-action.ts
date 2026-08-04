"use server";

// Importamos las librerias
import { cookies } from "next/headers";
import { forgotPasswordSchema } from "@/src/schemas/auth";

// Definimos el type de estado que manejara el action
type ActionStateType = {
    errors: { email?: string[]; },
    success: boolean;
    message: string | null;
}

// Definimos el action para el olvido del password
export async function forgotPasswordAction(_prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {
    // Creamos el objeto para obtener los datos del formulario
    const email = formData.get("email");

    // Validamos los datos con el schema de zod
    const validation = forgotPasswordSchema.safeParse({email});

    // Si la validacion falla, retornamos el mensaje de error
    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors,
            success: false,
            message: null
        };
    }

    try {
        // Obtenemos la url del backend
        const url = `${process.env.API_BACKEND_URL}/auth/forgot-password`;
        // Enviamos la peticion
        const req = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: validation.data.email 
            }),
        });

        // Obtenemos la respuesta en formato json
        const json = await req.json();

        // Si la API del backend responde con un código de error (ej: 400, 404, 500)
        if (!req.ok) {
            return {
                // Si el correo no existe, lo mapeamos directo al input de email
                errors: {
                    email: [json.message]
                },
                success: false,
                message: null
            };
        }

        // Si la respuesta de la API es exitosa (ej: 200)
        return {
            errors: {},
            success: true,
            message: json.message
        };

    } catch (error) {
        // Captura si el servidor de la API está caído o no responde el fetch
        return {
            errors: {},
            success: false,
            message: "Connection error. Please try again later."
        };
    }
}