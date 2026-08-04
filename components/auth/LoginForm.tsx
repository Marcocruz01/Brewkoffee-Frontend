'use client';

// Importamos las librerias
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SubmitButton from "../ui/SubmitButton";
import { login } from "@/actions/auth/login-action";
import { useActionState, useEffect, useRef, useState } from "react";
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// Definimos el componente de Login Form
export default function LoginForm() {
  // Estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Hook del router
  const router = useRouter();

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Creamos una referencia para resetear el form
  const formRef = useRef<HTMLFormElement>(null);

  // Inicializamos el estado del formulario 
  const [state, dispatch] = useActionState(login, {
    errors: {},
    success: false,
    message: null,
    inputs: { email: "", password: "" }
  });

  // UseEffect para detectar los cambios de estado 
  useEffect(() => {
    // Si el login es exitoso
    if (state.success) {
      // Reseteamos el formulario
      formRef.current?.reset();
      // Validamos que la URL exista antes de redirigir
      if (state.url) {
        router.push(state.url);
      }
    }
    // Solo si explícitamente falló Y además hay un mensaje que mostrar
    if (state.success === false && state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={dispatch} ref={formRef} className="w-full max-w-md mx-auto space-y-5">
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
          defaultValue={state.inputs?.email || ""}
          className="w-full px-4 py-2.5 rounded-lg text-base lg:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all duration-200"
        />
        {state.errors?.email?.[0] && (
          <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-600 dark:text-red-400 animate-fadeIn">
            {/* Icono sutil de advertencia */}
            <ExclamationCircleIcon className="size-3.5 shrink-0" />
            <span>{state.errors.email[0]}</span>
          </div>
        )}
      </div>

      {/* Campo Contraseña */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            Password
          </label>

          {/* Enlace de recuperación ubicado estratégicamente arriba del input */}
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors focus:outline-hidden focus:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            defaultValue={state.inputs?.password || ""}
            className="w-full pl-4 pr-11 py-2.5 text-base lg:text-sm rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all duration-200"
          />
          {state.errors?.password?.[0] && (
            <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-600 dark:text-red-400 animate-fadeIn">
              {/* Icono sutil de advertencia */}
              <ExclamationCircleIcon className="size-3.5 shrink-0" />
              <span>{state.errors.password?.[0]}</span>
            </div>
          )}
          {/* Botón para alternar visibilidad */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:outline-hidden transition-colors cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeIcon className="w-4 h-4" />
            ) : (
              <EyeSlashIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <SubmitButton label="Login" loadingLabel="Logging In..." />
    </form>
  );
}