"use client";

// Importamos las librerias
import Link from "next/link";
import { toast } from "sonner";
import SubmitButton from "../ui/SubmitButton";
import { useActionState, useEffect, useRef } from "react";
import { forgotPasswordAction } from "@/actions/auth/forgot-password-action";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

// Ddefinimos el componente del formulario para restablecer la contraseña
export default function ForgotPasswordForm() {
    // Creamos una referencia para resetear el form
    const formRef = useRef<HTMLFormElement>(null);

    // Inicializamos el estado del formulario 
    const [state, dispatch] = useActionState(forgotPasswordAction, {
        errors: {},
        success: false,
        message: ""
    });

    // Detectamos cambios en el estado para mostrar el toast correspondiente referente al resultado del backend
    useEffect(() => {
        // Si la petición falló y el backend nos mandó un mensaje de error global
        if (!state.success && state.message && Object.keys(state.errors || {}).length === 0) {
            toast.error(state.message);
        }

        // Si hay un mensaje de éxito del backend
        if (state.success && state.message) {
            toast.success(state.message); 

            // Reseteamos el formulario nativamente a través de su referencia
            formRef.current?.reset();
        }
    }, [state]);

    return (
        <form action={dispatch} ref={formRef} className="w-full max-w-md mx-auto space-y-5" noValidate>
            {/* Campo Correo Electrónico */}
            <div className="space-y-1.5">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="your_email@example.com"
                    className="w-full px-4 py-2.5 text-base lg:text-sm rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all duration-200"
                />
                {state.errors?.email && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-600 dark:text-red-400 animate-fadeIn">
                        {/* Icono sutil de advertencia */}
                        <ExclamationCircleIcon className="size-3.5 shrink-0" />
                        <span>{state.errors.email[0]}</span>
                    </div>
                )}
            </div>

            {/* Botón de envío global */}
            <SubmitButton label="Send request" loadingLabel="Sending..." />

            {/* Enlace para volver al Login */}
            <div className="text-center pt-2">
                <Link
                    href="/login"
                    className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors focus:outline-hidden focus:underline"
                >
                    Back to Login
                </Link>
            </div>
        </form>
    )
}
