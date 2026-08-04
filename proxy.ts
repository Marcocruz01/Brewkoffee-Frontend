// Importamos las librerias
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

// Mapa de qué rol puede entrar a qué prefijo de ruta
const roleRoutes: Record<string, string> = {
    ADMIN: "/admin",
    WAITER: "/orders",
    KITCHEN: "/kitchen",
};

// Todas las rutas protegidas (cualquier usuario logeado, sin importar el rol)
const protectedPrefixes = Object.values(roleRoutes);

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Si la ruta no es protegida, dejamos pasar sin validar nada
    const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
    if (!isProtected) return NextResponse.next();

    // Leemos el token del cookie
    const token = request.cookies.get("BREWKOFFEE_TOKEN")?.value;

    // Sin token, no hay sesión -> al login
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        // Verificamos la firma y leemos el payload
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        const role = payload.role as string;
        const allowedPrefix = roleRoutes[role];

        // Si el rol no existe en el mapa, o intenta entrar a un prefijo que no es el suyo
        if (!allowedPrefix || !pathname.startsWith(allowedPrefix)) {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }

        return NextResponse.next();

    } catch (error) {
        // Token inválido o expirado
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("BREWKOFFEE_TOKEN");
        return response;
    }
}

export const config = {
    matcher: [
        "/admin/:path*", 
        "/orders/:path*", 
        "/kitchen/:path*"
    ],
};