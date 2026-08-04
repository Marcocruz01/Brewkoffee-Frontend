"use client";

// Importamos las librerías
import { toast } from "sonner";
import { OTPInput } from "input-otp";
import { useRouter } from "next/navigation";
import { validateToken } from "@/actions/auth/validate-token-action";
import { startTransition, useActionState, useEffect, useState } from "react";

// Definimos las props del componente
type ValidateTokenFormProps = {
  setIsValidToken: (verifiedToken: string, verifiedEmail: string) => void;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

// Definimos el componente para validar el token
export default function ValidateTokenForm({ setIsValidToken, setToken: setTokenParent }: ValidateTokenFormProps) {
  // Estado para controlar los pasos
  const [step, setStep] = useState<"email" | "otp">("email");
  // Estado para el email
  const [email, setEmail] = useState("");
  // Estado para guardar el token ingresado por el usuario
  const [token, setToken] = useState("");
  // Hook de router
  const router = useRouter();

  // Inicializamos el estado del Action 
  const [state, dispatch, isPending] = useActionState(validateToken, {
    errors: {},
    success: false,
    message: null
  });

  // Detectamos si el token ha sido bloqueado definitivamente por el backend
  const isCodeBlocked = state.message?.toLowerCase().includes("blocked") || false;

  // Efecto para actualizar el estado del token en el componente padre cuando cambia
  useEffect(() => {
    // Si la respuesta es exitosa
    if (state.success) {
      setTokenParent(token);
      setIsValidToken(token, email);
      toast.success(state.message);
      return;
    }

    // Si hay errores en la respuesta
    if (state.success === false && state.message) {
      toast.error(state.message);
      setToken("");
    }
  }, [state, setTokenParent, setTokenParent, email]);

  // Avanzar al OTP tras validar que al menos escribió algo en el email
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Por favor, ingresa un correo válido.");
      return;
    }
    setStep("otp");
  };

  // Funcion que se ejecuta cuando el usuario ingresa un token válido
  const handleComplete = (value: string) => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("token", value);
      formData.append("email", email);
      dispatch(formData);
    });
  };

  // Función para reiniciar el flujo completo si deciden pedir otro código
  const handleResetFlow = () => {
    setToken("");
    setStep("email");
    if (state) state.message = null;
    router.push("/forgot-password");
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 flex flex-col items-center">

      {/* --- SUB-PASO 1: PEDIR EMAIL --- */}
      {step === "email" && (
        <form onSubmit={handleEmailSubmit} className="w-full space-y-4 flex flex-col items-center">
          <div className="text-center space-y-1 w-full">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Confirm your identity
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Please re-enter the email address associated with your account.
            </p>
          </div>
          <div className="space-y-1.5 w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              Email
            </label>
            <input
              type="email"
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your_email@example.com"
              className="w-full px-4 py-2.5 rounded-lg text-base lg:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer py-2.5 px-4 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Continue
          </button>
        </form>
      )}

      {/* --- SUB-PASO 2: INPUT OTP --- */}
      {step === "otp" && (
        <form action={dispatch} className="space-y-6 flex flex-col items-center w-full">
          <div className="text-center space-y-1 w-full">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {isCodeBlocked ? "Account Blocked" : "Enter verification code"}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {isCodeBlocked
                ? "This verification flow has been terminated due to security reasons."
                : <>We sent a 6-digit code to <span className="font-medium text-zinc-900 dark:text-zinc-50">{email}</span></>
              }
            </p>
          </div>

          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="email" value={email} />

          {!isCodeBlocked ? (
            <OTPInput
              maxLength={6}
              value={token}
              onChange={setToken}
              onComplete={handleComplete}
              autoFocus
              containerClassName="flex items-center gap-2 select-none"
              render={({ slots }) => (
                <div className="flex gap-2">
                  {slots.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`
                      size-11 rounded-lg text-base font-semibold flex items-center justify-center border transition-all duration-200 relative bg-white dark:bg-zinc-950
                      ${slot.isActive ? "border-zinc-900 dark:border-zinc-50 ring-2 ring-zinc-950/10 dark:ring-zinc-50/10" : "border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50"}
                      ${isPending ? "opacity-50" : ""}
                    `}
                    >
                      {slot.char}
                      {slot.isActive && !slot.char && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-[1.5px] h-5 bg-zinc-950 dark:bg-zinc-50 animate-bkp-caret" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            />
          ) : (
            <button
              type="button"
              onClick={handleResetFlow}
              className="w-full py-2.5 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity text-center shadow-sm"
            >
              Request a new code
            </button>
          )}

          {!isCodeBlocked && (
            /* Si todo marcha normal, mantiene el comportamiento clásico hacia atrás */
            <button
              type="button"
              onClick={() => setStep("email")}
              className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            >
              ← Back to email
            </button>
          )}

          {isPending && <p className="text-xs text-zinc-400 animate-pulse">Checking code...</p>}
        </form>
      )}
    </div>
  );
}