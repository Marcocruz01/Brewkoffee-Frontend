// Importamos las librerias
import { Metadata } from "next";
import { getProfile } from "@/lib/profile";
import ProfileHeader from "@/components/admin/profile/ProfileHeader";
import ProfileDetails from "@/components/admin/profile/ProfileDetails";
import ProfileAccountCard from "@/components/admin/profile/ProfileAccountCard";

export const metadata: Metadata = {
    title: "Profile | BrewKoffee",
    description: "Manage your personal information.",
};

export default async function ProfilePage() {
    const profile = await getProfile();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Your profile</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    View and manage your personal information.
                </p>
            </div>
            <div className="mx-10">
                <ProfileHeader profile={profile} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div className="lg:col-span-2">
                        <ProfileDetails profile={profile} />
                    </div>
                    <ProfileAccountCard profile={profile} />
                </div>
            </div>
        </div>
    )
}