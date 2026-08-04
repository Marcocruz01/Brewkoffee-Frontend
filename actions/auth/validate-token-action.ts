"use server";

import { tokenSchema } from "@/src/schemas";

// Definimos el type de estado que manejara el action
type ActionStateType = {
    errors: { 
        token?: string[]; 
        email?: string[];
    };
    success: boolean;
    message?: string | null;
}

// Definimos el action para validar el token 
export async function validateToken(_prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {    
    // Extraemos el token y el email del formData
    const token = formData.get("token");
    const email = formData.get("email");

    // Validamos el token que llega con zod
    const validate = tokenSchema.safeParse({ token, email });

    // Si la validacion falla 
    if(!validate.success) {
        // Transformamos los errores de zod a un objeto 
        const flattenedErrors = validate.error.flatten().fieldErrors;
        return {
            errors: flattenedErrors,
            success: false,
            message: flattenedErrors.token?.[0] || flattenedErrors.email?.[0]
        };
    }
    
    try {
        // Obtenemos la url del backend 
        const url = `${process.env.API_BACKEND_URL}/auth/validate-token`;
        // Enviamos la peticion al backend
        const req = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: validate.data.token,
                email: email
            })
        });

        // Obtenemos la respuesta en formato json
        const json = await req.json();

        // Si la API del backend responde con un código de error (ej: 400, 404, 500)
        if (!req.ok) {
            return {
                // Si el correo no existe, lo mapeamos directo al input de email
                errors: {
                    token: [json.message]
                },
                success: false,
                message: json.message
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
