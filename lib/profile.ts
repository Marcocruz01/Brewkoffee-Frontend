// Importamos las librerias
import { apiFetch } from "./fetcher";
import { ProfileData } from "@/src/types/profile";

// Obtenemos el perfil del usuario logeado consultando el backend
export function getProfile() {
    return apiFetch<ProfileData>("/profile", { cache: "no-store" });
}