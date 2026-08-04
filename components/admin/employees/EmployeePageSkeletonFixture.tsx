// @/components/admin/employees/EmployeePageSkeletonFixture.tsx
import AddEmployeeButton from "./AddEmployeeButton";
import EmployeeStats from "./EmployeeStats";
import DataTable from "./DataTable";

// Datos de prueba idénticos en estructura para que la tabla y las stats se pinten reales
const MOCK_STATS = {
    total: 12,
    kitchen: 4,
    waiter: 8,
    avgAge: 29,
};

const MOCK_EMPLOYEES = Array.from({ length: 5 }).map((_, i) => ({
    id: String(i),
    name: "John Doe",
    email: "employee@brewkoffee.com",
    role: "WAITER" as const,
    age: 25,
    schedule: "Full-time",
}));

export default function EmployeePageSkeletonFixture() {
    return (
        <>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        Work team
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Manage and consult the information of all <span className="text-zinc-900 dark:text-zinc-50 font-medium">employees</span> registered with BrewKoffee.
                    </p>
                </div>
                <div className="w-full md:w-auto shrink-0">
                    <AddEmployeeButton />
                </div>
            </div>
            <div className="mt-10">
                <EmployeeStats stats={MOCK_STATS} />
            </div>
            <div className="mt-10">
                <DataTable data={MOCK_EMPLOYEES as any} />
            </div>
        </>
    );
}