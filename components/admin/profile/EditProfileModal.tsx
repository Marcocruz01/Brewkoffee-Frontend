"use client"

// Importamos las librerias
import EditProfileForm from "./EditProfileForm";
import { ProfileData } from "@/src/types/profile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type EditProfileModalProps = {
    profile: ProfileData;
    isOpenModal: boolean;
    onClose: () => void;
}

export default function EditProfileModal({ profile, isOpenModal, onClose }: EditProfileModalProps) {
    return (
        <Dialog open={isOpenModal} onOpenChange={onClose}>
            <DialogContent
                initialFocus={() => document.getElementById("edit-profile-name")}
                className="max-w-lg bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            >
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                        Edit <span className="text-amber-600">profile</span>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                        Update your personal information.
                    </DialogDescription>
                </DialogHeader>

                <EditProfileForm profile={profile} onClose={onClose} />
            </DialogContent>
        </Dialog>
    )
}