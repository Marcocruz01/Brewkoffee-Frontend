"use client"

// Importamos las librerias
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ProfileData } from "@/src/types/profile";
import SubmitButton from "@/components/ui/SubmitButton";
import { useActionState, useEffect } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { updateProfile } from "@/actions/profile/update-profile-action";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

type EditProfileFormProps = {
    profile: ProfileData;
    onClose: () => void;
}

export default function EditProfileForm({ profile, onClose }: EditProfileFormProps) {
    // Controlado para evitar el warning de Base UI al reabrir el modal
    const [name, setName] = useState(profile.name);
    const [lastname, setLastname] = useState(profile.lastname);
    const [email, setEmail] = useState(profile.email);
    const [age, setAge] = useState(String(profile.age));

    const [state, dispatch] = useActionState(updateProfile, {
        errors: {},
        success: ""
    });

    useEffect(() => {
        if (state.success) {
            toast.success(state.success);
            onClose();
        } else if (state.errors.general) {
            toast.error(state.errors.general[0]);
        }
    }, [state]);

    return (
        <form action={dispatch} className="flex flex-col gap-4">
            <FieldGroup className="gap-0 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field className="gap-1">
                        <FieldLabel htmlFor="edit-profile-name">Name</FieldLabel>
                        <Input
                            id="edit-profile-name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        <FieldLabel htmlFor="edit-profile-lastname">Lastname</FieldLabel>
                        <Input
                            id="edit-profile-lastname"
                            name="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
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

                <Field className="gap-1">
                    <FieldLabel htmlFor="edit-profile-email">Email</FieldLabel>
                    <Input
                        id="edit-profile-email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white shadow-none h-10"
                    />
                    {state.errors?.email?.[0] && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                            <ExclamationCircleIcon className="size-3.5 shrink-0" />
                            <span>{state.errors.email[0]}</span>
                        </div>
                    )}
                </Field>

                <Field className="gap-1">
                    <FieldLabel htmlFor="edit-profile-age">Age</FieldLabel>
                    <Input
                        id="edit-profile-age"
                        name="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="bg-white shadow-none h-10"
                    />
                    {state.errors?.age?.[0] && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                            <ExclamationCircleIcon className="size-3.5 shrink-0" />
                            <span>{state.errors.age[0]}</span>
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