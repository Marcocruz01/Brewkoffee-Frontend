// Importamos las librerias
import { Metadata } from "next";
import { getEmployees } from "@/lib/employees";
import DataTable from "@/components/admin/employees/DataTable";
import AddEmployeeButton from "@/components/admin/employees/AddEmployeeButton";
import EmployeeStats from "@/components/admin/employees/EmployeeStats";

// Definimos el metadata
export const metadata: Metadata = {
  title: "Work Team | BrewKoffee",
  description: "Manage and consult the information of all employees registered with BrewKoffee.",
};

// Definimos la vista
export default async function EmployeePage() {
  // Hacemos el fetch 
  const employees = await getEmployees();

  // Calculamos los stats
  const stats = {
    total: employees.length,
    kitchen: employees.filter((e) => e.role === "KITCHEN").length,
    waiter: employees.filter((e) => e.role === "WAITER").length,
    avgAge:
      employees.length > 0
        ? Math.round(employees.reduce((acc, e) => acc + e.age, 0) / employees.length)
        : 0,
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* TEXTO INFORMATIVO */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Work team
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage and consult the information of all <span className="text-zinc-900 dark:text-zinc-50 font-medium">employees</span> registered with BrewKoffee.
          </p>
        </div>

        {/* Boton de la accion para agregar un empleado */}
        <div className="w-full md:w-auto shrink-0">
          <AddEmployeeButton />
        </div>
      </div>
      {/* Employee stats */}
      <div className="mt-8">
        <EmployeeStats stats={stats} />
      </div>

      {/* Tabla de empleados */}
      <div className="mt-5">
        <DataTable data={employees} />
      </div>
    </>
  )
}
