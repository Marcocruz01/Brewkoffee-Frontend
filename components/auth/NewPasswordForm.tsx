"use client";

// Importamos las librerias
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/actions/auth/reset-password-action";
import { startTransition, useActionState, useEffect, useState } from "react";
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import SubmitButton from "../ui/SubmitButton";

// Definimos las props
type NewPasswordFormProp = {
  token: string;
  email: string;
  onSuccess: () => void;
}

// Definimos el componente
export default function NewPasswordForm({ token, email, onSuccess }: NewPasswordFormProp) {
  // Estado para mostrar/ocultar el password
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  // Hook de router
  const router = useRouter();

  // Inicializamos el estado del Action
  const [state, dispatch, isPending] = useActionState(resetPassword, {
    errors: {},
    success: false,
    message: null,
    inputs: { password: "", repeatPassword: "" }
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message); 
      onSuccess();                 
      router.push("/login");        
      return;
    }

    if (state.success === false && state.message) {
      toast.error(state.message); 
    }
  }, [state, onSuccess, router]);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      dispatch(formData);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 flex flex-col items-center">
      <div className="text-center space-y-1 w-full">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Create new password
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Your new password must be different from previous used passwords.
        </p>
      </div>

      <form action={handleSubmit} className="w-full space-y-5">
        {/* Pasamos los datos ocultos que necesita el backend para impactar la DB */}
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="email" value={email} />

        {/* --- CAMPO: PASSWORD --- */}
        <div className="space-y-1.5 w-full">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors">
            New Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              disabled={isPending}
              defaultValue={state.inputs?.password || ""}
              className="w-full pl-4 pr-11 py-2.5 rounded-lg text-base lg:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all duration-200"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:outline-hidden transition-colors cursor-pointer"
            >
              {showPassword ? <EyeSlashIcon className="size-4" /> : <EyeIcon className="size-4" />}
            </button>
          </div>
          {state.errors?.password && (
            <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-600 dark:text-red-400 animate-fadeIn">
              {/* Icono sutil de advertencia */}
              <ExclamationCircleIcon className="size-3.5 shrink-0" />
              <span>{state.errors.password[0]}</span>
            </div>
          )}
        </div>

        {/* --- CAMPO: REPEAT PASSWORD --- */}
        <div className="space-y-1.5 w-full">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors">
            Confirm Password
          </label>
          <div className="relative w-full">
            <input
              type={showRepeatPassword ? "text" : "password"}
              name="repeatPassword"
              placeholder="••••••••"
              disabled={isPending}
              defaultValue={state.inputs?.repeatPassword || ""}
              className="w-full pl-4 pr-11 py-2.5 rounded-lg text-base lg:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all duration-200"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:outline-hidden transition-colors cursor-pointer"
            >
              {showRepeatPassword ? <EyeSlashIcon className="size-4" /> : <EyeIcon className="size-4" />}
            </button>
          </div>
          {state.errors?.repeatPassword && (
            <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-600 dark:text-red-400 animate-fadeIn">
              {/* Icono sutil de advertencia */}
              <ExclamationCircleIcon className="size-3.5 shrink-0" />
              <span>{state.errors.repeatPassword[0]}</span>
            </div>
          )}
        </div>

        {/* --- BOTÓN DE ENVÍO --- */}
        <SubmitButton 
          label="Reset password" 
          loadingLabel="Resetting password..." 
        />
      </form>
    </div>
  );
}
