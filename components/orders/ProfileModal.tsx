"use client"

// Importamos las librerias
import Image from "next/image";
import Avatar from "boring-avatars";
import { AVATAR_COLORS } from "@/lib/constants";
import { BriefcaseIcon, EnvelopeIcon, ClockIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Props
type ProfileModalProps = {
    isOpenModal: boolean;
    onClose: () => void;
    profile: {
        name: string;
        lastname: string;
        email: string;
        role: "ADMIN" | "WAITER" | "KITCHEN";
        age: number;
        schedule: "MORNING" | "EVENING" | "FULL";
        createdAt: string;
    };
}

function formatRole(role: ProfileModalProps["profile"]["role"]) {
    const map = { ADMIN: "Administrator", WAITER: "Waiter", KITCHEN: "Kitchen Staff" };
    return map[role];
}

function formatSchedule(schedule: ProfileModalProps["profile"]["schedule"]) {
    const map = { MORNING: "Morning shift", EVENING: "Evening shift", FULL: "Full time" };
    return map[schedule];
}

export default function ProfileModal({ isOpenModal, onClose, profile }: ProfileModalProps) {
    const joinedDate = new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const rows = [
        { icon: BriefcaseIcon, label: formatRole(profile.role) },
        { icon: ClockIcon, label: formatSchedule(profile.schedule) },
        { icon: EnvelopeIcon, label: profile.email },
        { icon: CalendarIcon, label: `Joined ${joinedDate}` },
    ];

    return (
        <Dialog open={isOpenModal} onOpenChange={onClose}>
            <DialogContent className="max-w-sm bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 p-0 overflow-hidden">
                {/* Banner */}
                <div className="relative h-20 w-full">
                    <Image
                        src="/img/header.jpg"
                        alt="Profile banner"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute -bottom-8 left-6">
                        <div className="rounded-full overflow-hidden ring-4 ring-white dark:ring-zinc-900">
                            <Avatar size={64} name={profile.email} variant="beam" colors={AVATAR_COLORS} />
                        </div>
                    </div>
                </div>

                <div className="pt-10 px-6 pb-6 flex flex-col gap-4">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                            {profile.name} {profile.lastname}
                        </DialogTitle>
                        <DialogDescription className="sr-only">User profile details</DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-3 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                        {rows.map(({ icon: Icon, label }, index) => (
                            <div key={index} className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-300 pt-3 first:pt-3">
                                <Icon className="size-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
                                <span className="truncate">{label}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center pt-2">
                        Contact an administrator to update your information.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}