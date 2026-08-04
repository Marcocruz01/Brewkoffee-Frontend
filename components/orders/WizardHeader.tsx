"use client";

import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";

type WizardHeaderProps = {
  step: number;
  onBack?: () => void;
};

const STEPS = [
  { id: 1, label: "Order type" },
  { id: 2, label: "Details" },
  { id: 3, label: "Build order" },
];

export default function WizardHeader({ step, onBack }: WizardHeaderProps) {
  return (
    <div className="relative flex items-center justify-between px-3 sm:px-6 h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
      {/* Botón Izquierda: Regresar */}
      <div className="flex items-center w-10 sm:w-24">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-xs font-medium"
          >
            <ArrowLeftIcon className="size-4 shrink-0" />
            <span className="hidden sm:inline">Back</span>
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* Stepper Centrado */}
      <div className="flex items-center justify-center flex-1 max-w-xl mx-auto px-2">
        {STEPS.map((s, index) => {
          const isCompleted = step > s.id;
          const isActive = step === s.id;

          return (
            <div key={s.id} className="flex items-center flex-1 last:flex-initial">
              {/* Paso Individual */}
              <div className="flex items-center gap-2">
                {/* Círculo */}
                <div
                  className={`size-7 sm:size-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 shrink-0 ${isCompleted
                    ? "bg-amber-500 text-white dark:bg-amber-500"
                    : isActive
                      ? "bg-amber-500/10 text-amber-600 border-2 border-amber-500 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-400 shadow-xs"
                      : "bg-zinc-100 text-zinc-400 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-500 dark:border-zinc-700"
                    }`}
                >
                  {isCompleted ? (
                    <CheckIcon className="size-3.5 sm:size-4 stroke-3" />
                  ) : (
                    <span>{s.id}</span>
                  )}
                </div>

                {/* Texto del Paso: Oculto en móvil (< md), visible en tablets/desktop */}
                <div className="hidden md:flex flex-col">
                  <span
                    className={`text-xs font-medium transition-colors whitespace-nowrap ${isActive
                      ? "text-zinc-900 dark:text-zinc-100 font-semibold"
                      : isCompleted
                        ? "text-zinc-600 dark:text-zinc-300"
                        : "text-zinc-400 dark:text-zinc-500"
                      }`}
                  >
                    {s.label}
                  </span>
                </div>
              </div>

              {/* Línea Conectora */}
              {index < STEPS.length - 1 && (
                <div className="flex-1 mx-1.5 sm:mx-3 md:mx-4 h-0.5 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden rounded-full">
                  <div
                    className={`absolute inset-0 bg-amber-600 dark:bg-amber-500 transition-all duration-500 ${step > s.id ? "w-full" : "w-0"
                      }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contador Derecha */}
      <div className="w-10 sm:w-24 flex justify-end">
        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium whitespace-nowrap">
          <span className="hidden sm:inline">Step </span>{step}/3
        </span>
      </div>
    </div>
  );
}