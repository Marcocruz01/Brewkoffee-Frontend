// Importamos las librerias
import Image from "next/image";
import Avatar from "boring-avatars";
import { ProfileData } from "@/src/types/profile";
import { CalendarIcon } from "@heroicons/react/24/outline";
import EditProfileButton from "./EditProfileButton";
import { AVATAR_COLORS } from "@/lib/constants";

// Definimos las props
type ProfileHeaderProps = {
    profile: ProfileData;
}

// Formatea el role a un texto legible
function formatRole(role: ProfileData["role"]) {
    const map = { ADMIN: "Administrator", WAITER: "Waiter", KITCHEN: "Kitchen Staff" };
    return map[role];
}

// Definimos el componente del header
export default function ProfileHeader({ profile }: ProfileHeaderProps) {
    const joinedDate = new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-hidden">
            {/* Banner */}
            <div className="relative h-40 sm:h-52 w-full">
                <Image
                    src="/img/header.jpg"
                    alt="Profile banner"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Botón de editar, flotando sobre el banner */}
            <div className="absolute top-4 right-4">
                <EditProfileButton profile={profile} />
            </div>

            {/* Avatar + info */}
            <div className="relative z-10 flex flex-col items-center -mt-12 px-6 pb-6">
                <div className="rounded-full overflow-hidden ring-4 ring-white dark:ring-zinc-900">
                    <Avatar
                        size={96}
                        name={profile.email}
                        variant="beam"
                        colors={AVATAR_COLORS}
                    />
                </div>

                <h1 className="mt-3 text-xl font-bold text-zinc-900 dark:text-white">
                    {profile.name} {profile.lastname}
                </h1>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">
                        {formatRole(profile.role)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <CalendarIcon className="size-3.5" />
                        Joined {joinedDate}
                    </span>
                </div>
            </div>
        </div>
    )
}