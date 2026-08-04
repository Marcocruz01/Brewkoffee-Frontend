"use server";

// Importamos las librerias
import { loginSchema } from "@/src/schemas";
import { cookies } from "next/headers";

// Definimos el type 
type ActionStateType = {
    errors: { 
        email?: string[]; 
        password?: string[];
    },
    success: boolean;
    message: string | null;
    inputs?: {
        email?: string;
        password?: string;
    },
    url?: string;
}

// Definimos la accion para logearse
export async function login(_prevState: any, formData: FormData): Promise<ActionStateType> {
    // Extraemos el email y el password
    const data = {
        email: formData.get("email"),
        password: formData.get("password")
    }

    // Validamos la entrada de los datos con zod
    const validate = loginSchema.safeParse(data);
    // Si hay errores los retornamos
    if(!validate.success) {
        return {
            errors: validate.error.flatten().fieldErrors,
            success: false,
            message: null,
            inputs: {
                email: data.email?.toString() || "",
                password: data.password?.toString() || ""
            }
        }
    }

    // Contruimos la peticion
    try {
        // Agregamos la url 
        const url = `${process.env.API_BACKEND_URL}/auth/login`;
        const req = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: validate.data.email,
                password: validate.data.password
            })
        });

        // Obtenemos la respuesta del backend
        const json = await req.json();

        // Si la respuesta da errores los retornamos
        if(!req.ok) {
            return {
                errors: {},
                success: false,
                message: json.message,
            }
        }
        
        // Seteamos el cookie del usuario 
        (await cookies()).set({
            name: "BREWKOFFEE_TOKEN",
            value: json.data.token,
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            maxAge: 60 * 60 * 8
        });

        // Obtenemos el rol del usuario 
        const role = json.data.user.role;
        // Variable para setear la url
        let targetUrl = "";

        // Seteamos la ruta sin redirigir 
        if(role === "ADMIN") targetUrl = "/admin";
        else if(role === "WAITER") targetUrl = "/orders";
        else if(role === "KITCHEN") targetUrl = "/kitchen";
        
        return {
            errors: {},
            success: true,
            message: json.message,
            url: targetUrl
        }

    } catch (error) {
        return {
            errors: {},
            success: false,
            message: "Connection error. Please try again later."
        }
    }    
}