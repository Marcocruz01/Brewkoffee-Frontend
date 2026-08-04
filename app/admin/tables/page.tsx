// Importamos las libreias
import { Metadata } from "next";
import { getTables } from "@/lib/tables";
import TablesGrid from "@/components/admin/tables/TablesGrid";
import AddTableButton from "@/components/admin/tables/AddTableButton";

// Definimos el metadata
export const metadata: Metadata = {
    title: "Tables | BrewKoffee",
    description: "Manage and consult the real-time status and capacity of BrewKoffee tables.",
};

// Definimos la vista
export default async function page() {
    // Obtenemos las tables
    const tables = await getTables();
    return (
        <>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                {/* TEXTO INFORMATIVO */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        Overview of your tables
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Manage and consult the status, capacity, and assignments of all <span className="text-zinc-900 dark:text-zinc-50 font-medium">tables</span> in BrewKoffee.
                    </p>
                </div>

                {/* Boton de la accion para agregar una nueva mesa */}
                <div className="w-full md:w-auto shrink-0">
                    <AddTableButton />
                </div>
            </div>
            <div className="mt-10">
                <TablesGrid data={tables} />
            </div>
        </>
    )
}
