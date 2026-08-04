// Importamos las librerias
import Image from "next/image";
import { getProfile } from "@/lib/profile";
import Sidebar from "@/components/admin/Sidebar";
import { UserProvider } from "@/context/UserContext";
import { MobileSidebar } from "@/components/admin/MobileSidebar";

// Definimos el layout principal
export default async function Layout({ children }: { children: React.ReactNode }) {
    // Obtenemos el perfil del usuario logeado
    const profile = await getProfile();
    return (
        <UserProvider user={profile}>
            <div className="flex h-screen w-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
                {/* Sidebar fijo, solo visible en md+ */}
                <Sidebar/>

                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Topbar solo en mobile */}
                    <header className="md:hidden flex items-center gap-3 p-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-10">
                        <MobileSidebar />
                        <div className="flex items-center justify-start gap-3">
                            <Image
                                src="/img/icono-brewkoffee.png"
                                alt="Icono de Brew Koffee"
                                className="drop-shadow-2xl dark:invert"
                                width={28}
                                height={28}
                                priority
                            />
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </UserProvider>
    )
}