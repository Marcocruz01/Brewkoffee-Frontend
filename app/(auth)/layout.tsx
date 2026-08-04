// Importamos las librerias
import Image from "next/image";

// Definimos el layout para manejar las vistas de la autenticidad
export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="min-h-screen flex">
            {/* Panel izquierdo — identidad de marca, compartido en todas las vistas de auth */}
            <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden bg-stone-900">
                
                {/* Capa de Imagen de Fondo */}
                <Image
                    src="/img/bg-image.jpg"
                    alt="BrewKoffee background"
                    fill
                    priority
                    className="object-cover object-center"
                />

                {/* Capa Oscura (Gradient Overlay: más oscura abajo, aclara hacia arriba) */}
                <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/70 to-stone-950/30 z-0" />

                {/* Logo arriba */}
                <div className="relative z-10 flex items-center gap-3">
                    <Image
                        src="/img/icono-brewkoffee.png"
                        alt="BrewKoffee icon"
                        width={32}
                        height={32}
                        className="invert"
                    />
                    <span className="text-lg font-semibold text-stone-100">Brew Koffee</span>
                </div>

                {/* Mensaje central */}
                <div className="relative z-10 flex flex-col gap-4 max-w-sm">
                    <h2 className="text-5xl font-bold text-stone-50 leading-tight">
                        Run your café with clarity.
                    </h2>
                    <p className="text-sm text-stone-300 leading-relaxed">
                        One system for your team, your tables, and your menu — built to keep every shift running smooth.
                    </p>
                </div>

                {/* Footer del panel */}
                <p className="relative z-10 text-xs text-stone-400">
                    © {new Date().getFullYear()} BrewKoffee. All rights reserved.
                </p>
            </div>

            {/* Panel derecho — contenido de cada vista de auth */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-sm flex flex-col">
                    {/* Logo mobile-only, ya que el panel izquierdo se oculta en pantallas chicas */}
                    <div className="lg:hidden flex flex-col items-center gap-3 mb-8">
                        <Image
                            src="/img/icono-brewkoffee.png"
                            alt="BrewKoffee icon"
                            width={40}
                            height={40}
                            className="dark:invert"
                        />
                        <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Brew Koffee</span>
                    </div>

                    {children}
                </div>
            </div>
        </main>
    )
}