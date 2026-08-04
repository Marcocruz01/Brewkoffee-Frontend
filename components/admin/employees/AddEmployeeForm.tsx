// Importamos las librerias
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/SubmitButton";
import { useActionState, useEffect, useRef } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { createEmployee } from "@/actions/employee/create-employee-action";
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
;

// Definimos la prop 
type AddEmployeeForm = {
    onClose: () => void;
}

// Definimos el formulario
export default function AddEmployeeForm({ onClose }: AddEmployeeForm) {
    // Creamos una referencia del form
    const formRef = useRef<HTMLFormElement>(null);

    // Estados para el campo password
    const [showPassword, setShowPassword] = useState(false);

    // Inicializamos el estado del formulario 
    const [state, dispatch] = useActionState(createEmployee, {
        errors: {},
        success: ""
    });

    // Escuchamos cambios del estado
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
        <>
            {/* Formulario para agregar nuevo empleado */}
            <form action={dispatch} ref={formRef} className="flex flex-col gap-4 mt-2">
                <FieldGroup className="gap-0 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <Field className="gap-1">
                            <FieldLabel htmlFor="employee-name">First name</FieldLabel>
                            <Input
                                id="employee-name"
                                name="name"
                                placeholder="e.g., Marco"
                                className="bg-white shadow-none h-10"
                            />
                            {state.errors?.name?.[0] && (
                                <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                                    <ExclamationCircleIcon className="size-3.5 shrink-0" />
                                    <span>{state.errors.name[0]}</span>
                                </div>
                            )}
                        </Field>

                        <Field className="gap-1">
                            <FieldLabel htmlFor="employee-lastname">Last name</FieldLabel>
                            <Input
                                id="employee-lastname"
                                name="lastname"
                                placeholder="e.g., Cruz"
                                className="bg-white shadow-none h-10"
                            />
                            {state.errors?.lastname?.[0] && (
                                <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                                    <ExclamationCircleIcon className="size-3.5 shrink-0" />
                                    <span>{state.errors.lastname[0]}</span>
                                </div>
                            )}
                        </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                        <div className="sm:col-span-2">
                            <Field className="gap-1">
                                <FieldLabel htmlFor="employee-email">Email address</FieldLabel>
                                <Input
                                    id="employee-email"
                                    type="email"
                                    name="email"
                                    placeholder="example@brewkoffee.com"
                                    className="bg-white shadow-none h-10"
                                />
                                {state.errors?.email?.[0] && (
                                    <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                                        <ExclamationCircleIcon className="size-3.5 shrink-0" />
                                        <span>{state.errors.email[0]}</span>
                                    </div>
                                )}
                            </Field>
                        </div>

                        <Field className="gap-1">
                            <FieldLabel htmlFor="employee-age">Age</FieldLabel>
                            <Input
                                id="employee-age"
                                type="number"
                                name="age"
                                min="18"
                                placeholder="e.g., 25"
                                className="bg-white shadow-none h-10"
                            />
                            {state.errors?.age?.[0] && (
                                <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                                    <ExclamationCircleIcon className="size-3.5 shrink-0" />
                                    <span>{state.errors.age[0]}</span>
                                </div>
                            )}
                        </Field>
                    </div>

                    <Field className="gap-1">
                        <FieldLabel htmlFor="employee-password">Password</FieldLabel>
                        <div className="relative">
                            <Input
                                id="employee-password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Minimum 8 characters"
                                className="bg-white shadow-none h-10 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="size-4" />
                                ) : (
                                    <EyeIcon className="size-4" />
                                )}
                            </button>
                        </div>
                        {state.errors?.password?.[0] && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                                <ExclamationCircleIcon className="size-3.5 shrink-0" />
                                <span>{state.errors.password[0]}</span>
                            </div>
                        )}
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <Field className="gap-1">
                            <FieldLabel>Assigned role</FieldLabel>
                            <Select name="role">
                                <SelectTrigger className="w-full bg-white shadow-none">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ADMIN">Administrator</SelectItem>
                                    <SelectItem value="WAITER">Waiter</SelectItem>
                                    <SelectItem value="KITCHEN">Kitchen</SelectItem>
                                </SelectContent>
                            </Select>
                            {state.errors?.role?.[0] && (
                                <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                                    <ExclamationCircleIcon className="size-3.5 shrink-0" />
                                    <span>{state.errors.role[0]}</span>
                                </div>
                            )}
                        </Field>

                        <Field className="gap-1">
                            <FieldLabel>Schedule / Shift</FieldLabel>
                            <Select name="schedule">
                                <SelectTrigger className="w-full bg-white shadow-none">
                                    <SelectValue placeholder="Select a shift" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MORNING">Morning (6:00 AM - 2:00 PM)</SelectItem>
                                    <SelectItem value="EVENING">Evening (2:00 PM - 10:00 PM)</SelectItem>
                                    <SelectItem value="FULL">Full Time</SelectItem>
                                </SelectContent>
                            </Select>
                            {state.errors?.schedule?.[0] && (
                                <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                                    <ExclamationCircleIcon className="size-3.5 shrink-0" />
                                    <span>{state.errors.schedule[0]}</span>
                                </div>
                            )}
                        </Field>
                    </div>

                    <div className="flex items-center justify-end gap-2 w-full border-t border-zinc-100 dark:border-zinc-800/50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 mt-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        >
                            Cancel
                        </button>
                        <SubmitButton
                            loadingLabel="Registering..."
                            label="Register employee"
                        />
                    </div>
                </FieldGroup>
            </form>
        </>
    )
}
