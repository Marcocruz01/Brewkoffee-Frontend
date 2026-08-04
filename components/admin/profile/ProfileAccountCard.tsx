// Importamos las librerias
import { ProfileData } from "@/src/types/profile";
import { BriefcaseIcon, EnvelopeIcon, ClockIcon, CalendarIcon } from "@heroicons/react/24/outline";

type ProfileAccountCardProps = {
    profile: ProfileData;
}

function formatRole(role: ProfileData["role"]) {
    const map = { ADMIN: "Administrator", WAITER: "Waiter", KITCHEN: "Kitchen Staff" };
    return map[role];
}

function formatSchedule(schedule: ProfileData["schedule"]) {
    const map = { MORNING: "Morning shift", EVENING: "Evening shift", FULL: "Full time" };
    return map[schedule];
}

export default function ProfileAccountCard({ profile }: ProfileAccountCardProps) {
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
    console.log("schedule value:", profile.schedule, typeof profile.schedule);
    return (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Account</h2>
            <div className="flex flex-col gap-3.5">
                {rows.map(({ icon: Icon, label }, index) => (
                    <div key={index} className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                        <Icon className="size-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
                        <span className="truncate">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}