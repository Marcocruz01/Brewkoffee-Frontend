'use client';

// Importamos las librerías
import { useFormStatus } from "react-dom";

// Definimos el type
type SubmitButtonProps = {
    label: string;
    loadingLabel: string;
    disabled?: boolean;
}

// Definimos nuestro botón global para BrewKoffee
export default function SubmitButton({ label, loadingLabel, disabled }: SubmitButtonProps) {
    // pending es true automáticamente mientras se procesa el Server Action del formulario padre
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending || disabled}
            className="w-full mt-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 focus:outline-hidden focus:ring-2 focus:ring-zinc-950/10 dark:focus:ring-zinc-100/10 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
        >
            {pending && (
                <svg
                    className="size-4 shrink-0 block text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="32"
                        strokeDashoffset="12"
                        className="opacity-80"
                    >
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            from="0 12 12"
                            to="360 12 12"
                            dur="0.8s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </svg>
            )}
            <span>
                {pending ? loadingLabel : label}
            </span>
        </button>
    );
}