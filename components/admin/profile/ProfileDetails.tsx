// Importamos las librerias
import { ProfileData } from "@/src/types/profile";

type ProfileDetailsProps = {
    profile: ProfileData;
}

export default function ProfileDetails({ profile }: ProfileDetailsProps) {
    const fields = [
        { label: "Name", value: profile.name },
        { label: "Lastname", value: profile.lastname },
        { label: "Email", value: profile.email },
        { label: "Age", value: String(profile.age) },
    ];

    return (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6">
            <div className="flex flex-col gap-1 mb-6">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Personal information</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Your basic account details.</p>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                {fields.map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-1">
                        <dt className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase">
                            {label}
                        </dt>
                        <dd className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}