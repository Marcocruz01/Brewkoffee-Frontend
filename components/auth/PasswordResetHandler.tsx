"use client"

// Importamos las librerias
import { useEffect, useState } from "react"
import ValidateTokenForm from "./ValidateTokenForm";
import NewPasswordForm from "./NewPasswordForm";

// Definimos el componente PasswordResetHandler
export default function PasswordResetHandler() {
    // Estado para controlar el componente que se muestra
    const [isValidToken, setIsValidToken] = useState(false);
    // Estado para guardar el token
    const [token, setToken] = useState("");
    // Estado para guardar el email
    const [email, setEmail] = useState("");
    // Estado para la carga
    const [isLoading, setIsLoading] = useState(true);

    // Corre solo al montar la página para checar si el usuario recargó
    useEffect(() => {
        const savedToken = sessionStorage.getItem("bk_reset_token");
        const savedStatus = sessionStorage.getItem("bk_token_valid");
        const savedEmail = sessionStorage.getItem("bk_reset_email");

        if (savedToken && savedStatus === "true" && savedEmail) {
            setToken(savedToken);
            setEmail(savedEmail);
            setIsValidToken(true);
        }

        setIsLoading(false);
    }, []);

    // Función puente para el éxito de la validación (se pasa al primer formulario)
    const handleSuccessValidation = (verifiedToken: string, userEmail: string) => {
        setToken(verifiedToken);
        setEmail(userEmail);
        setIsValidToken(true);

        // Guardamos en la sesión de la pestaña actual del navegador
        sessionStorage.setItem("bk_reset_token", verifiedToken);
        sessionStorage.setItem("bk_reset_email", userEmail);
        sessionStorage.setItem("bk_token_valid", "true");
    };

    // Función de limpieza final (se pasa al formulario de contraseñas)
    const handleClearSession = () => {
        sessionStorage.removeItem("bk_reset_token");
        sessionStorage.removeItem("bk_token_valid");
        sessionStorage.removeItem("bk_reset_email");
    };

    // Renderizado de carga minimalista con un spinner elegante mientras lee la sesión
    if (isLoading) {
        return (
            <div className="w-full max-w-sm mx-auto flex items-center justify-center py-12">
                <div className="size-5 border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-50 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full">
            {!isValidToken ? (
                <ValidateTokenForm
                    setIsValidToken={(verifiedToken, verifiedEmail) => handleSuccessValidation(verifiedToken, verifiedEmail)}
                    setToken={setToken}
                />
            ) : (
                <NewPasswordForm
                    email={email}
                    token={token}
                    onSuccess={handleClearSession}
                />
            )}
        </div>
    );
}
