"use client"

// Importamos las librerias
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/SubmitButton";
import { useActionState, useEffect, useRef } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { createCategory } from "@/actions/categories/create-category-action";

// Definimos las props
type AddCategoryFormProps = {
    onClose: () => void;
}

// Definimos el componente
export default function AddCategoryForm({ onClose }: AddCategoryFormProps) {
    // hacemos una referencia al form
    const formRef = useRef<HTMLFormElement>(null);

    // Inicializamos el state
    const [state, dispatch] = useActionState(createCategory, {
        errors: {},
        success: ""
    });

    // Efecto para escuchar cambios del state
    useEffect(() => {
        if (state.success) {
            toast.success(state.success);
            formRef.current?.reset();
            onClose();
        } else if (state.errors.general) {
            toast.error(state.errors.general[0]);
        }
    }, [state]);

    return (
        <form action={dispatch} ref={formRef} className="flex flex-col gap-4">
            <FieldGroup className="gap-0 space-y-6">
                <Field className="gap-1">
                    <FieldLabel htmlFor="category-name">Category name</FieldLabel>
                    <Input
                        id="category-name"
                        name="name"
                        placeholder="e.g., Beverages"
                        className="bg-white shadow-none h-10"
                    />
                    {state.errors?.name?.[0] && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                            <ExclamationCircleIcon className="size-3.5 shrink-0" />
                            <span>{state.errors.name[0]}</span>
                        </div>
                    )}
                </Field>

                <div className="flex items-center justify-end gap-2 w-full border-t border-zinc-100 dark:border-zinc-800/50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 mt-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                        Cancel
                    </button>
                    <SubmitButton loadingLabel="Creating..." label="Create category" />
                </div>
            </FieldGroup>
        </form>
    )
}