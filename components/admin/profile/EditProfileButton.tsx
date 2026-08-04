"use client"

// Importamos las librerias
import { useState } from "react";
import { ProfileData } from "@/src/types/profile";
import EditProfileModal from "./EditProfileModal";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

type EditProfileButtonProps = {
    profile: ProfileData;
}

export default function EditProfileButton({ profile }: EditProfileButtonProps) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-200 backdrop-blur-sm shadow-sm hover:bg-white dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            >
                <PencilSquareIcon className="size-4" />
                Edit profile
            </button>
            <EditProfileModal profile={profile} isOpenModal={openModal} onClose={() => setOpenModal(false)} />
        </>
    )
}