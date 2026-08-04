"use server";

// Importamos las librerias
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Definimos el action de cerrar sesion
export async function logout() {
    (await cookies()).delete("BREWKOFFEE_TOKEN");
    redirect("/login");
}