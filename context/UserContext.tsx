"use client";

import { ProfileData } from "@/src/types/profile";
// Importamos las librerias
import { createContext, useContext } from "react";

// creamos el contextp
const UserContext = createContext<ProfileData | null>(null);

// Definimos el provider
export function UserProvider({ user, children }: { user: ProfileData | null; children: React.ReactNode }) {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

// Hook para consumir el usuario donde sea que lo necesites
export function useUser() {
    return useContext(UserContext);
}