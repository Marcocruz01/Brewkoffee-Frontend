// Importamos la libreria
import { cookies } from "next/headers";

// Variable global
const BASE_URL = process.env.API_BACKEND_URL;

// Funcion para el fetch
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Obtenemos el cookie
    const cookieStore = await cookies();
    // Obtenemos el cookie y su lectura
    const token = cookieStore.get("BREWKOFFEE_TOKEN")?.value;

    // Hacemos el fetch
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    // Validamos la respuesta
    if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message || `Request failed: ${res.status}`);
    }

    // Leemos el json
    const json = await res.json();
    // Retornamos la respuesta
    return json.data as T;
}