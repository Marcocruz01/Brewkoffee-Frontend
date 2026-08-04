"use client"

// Importamos las librerias
import { toast } from "sonner";
import { Table } from "@/src/types/tables";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/SubmitButton";
import { useActionState, useEffect, useRef } from "react";
import { updateTable } from "@/actions/table/update-table-action";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Definimos el prop
type EditTableFormProps = {
    table: Table;
    onClose: () => void;
}

// Definimos el componente
export default function EditTableForm({ table, onClose }: EditTableFormProps) {
    // Hacemos la referencia
    const formRef = useRef<HTMLFormElement>(null);

    // Mandamos a llamar el update 
    const updateTableWithId = updateTable.bind(null, table.id);

    // Inicializamos el estado
    const [state, dispatch] = useActionState(updateTableWithId, {
        errors: {},
        success: ""
    });

    // Escuchamos cambios del estado
    useEffect(() => {
        if (state.success) {
            toast.success(state.success);
            onClose();
        } else if (state.errors.general) {
            toast.error(state.errors.general[0]);
        }
    }, [state]);

    return (
        <form action={dispatch} ref={formRef} className="flex flex-col gap-4">
            <FieldGroup className="gap-0 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <Field className="gap-1">
                        <FieldLabel htmlFor="table-number">Table number</FieldLabel>
                        <Input
                            id="table-number"
                            type="number"
                            name="number"
                            min="1"
                            defaultValue={table.number}
                            className="bg-white shadow-none h-10"
                        />
                        {state.errors?.number?.[0] && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                                <ExclamationCircleIcon className="size-3.5 shrink-0" />
                                <span>{state.errors.number[0]}</span>
                            </div>
                        )}
                    </Field>

                    <Field className="gap-1">
                        <FieldLabel htmlFor="table-capacity">Seating capacity</FieldLabel>
                        <Input
                            id="table-capacity"
                            type="number"
                            name="capacity"
                            min="1"
                            defaultValue={table.capacity}
                            className="bg-white shadow-none h-10"
                        />
                        {state.errors?.capacity?.[0] && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                                <ExclamationCircleIcon className="size-3.5 shrink-0" />
                                <span>{state.errors.capacity[0]}</span>
                            </div>
                        )}
                    </Field>
                </div>

                <Field className="gap-1">
                    <FieldLabel>Zone</FieldLabel>
                    <Select name="zone" defaultValue={table.zone}>
                        <SelectTrigger className="w-full bg-white shadow-none">
                            <SelectValue placeholder="Select a zone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="INDOOR">Indoor</SelectItem>
                            <SelectItem value="OUTDOOR">Outdoor</SelectItem>
                            <SelectItem value="TERRACE">Terrace</SelectItem>
                            <SelectItem value="BAR">Bar</SelectItem>
                        </SelectContent>
                    </Select>
                    {state.errors?.zone?.[0] && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                            <ExclamationCircleIcon className="size-3.5 shrink-0" />
                            <span>{state.errors.zone[0]}</span>
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
                    <SubmitButton loadingLabel="Saving..." label="Save changes" />
                </div>
            </FieldGroup>
        </form>
    )
}