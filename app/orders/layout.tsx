// Importamos las librerias
import WaiterNav from "@/components/orders/Navbar";
import { getProfile } from "@/lib/profile";

export default async function OrdersLayout({ children }: { children: React.ReactNode }) {
    const profile = await getProfile();

    return (
        <main className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950">
            <WaiterNav user={profile} />
            <div className="flex-1 overflow-hidden">{children}</div>
        </main>
    )
}