// Importamos las librerias
import { getProfile } from "@/lib/profile";
import KitchenNav from "@/components/kitchen/KitchenNav";

// Definimos el layout
export default async function KitchenLayout({ children }: { children: React.ReactNode }) {
    const profile = await getProfile();

    return (
        <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950">
            <KitchenNav user={profile} />
            <div className="flex-1 overflow-hidden">{children}</div>
        </div>
    )
}