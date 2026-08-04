// Importamos las librerias
import { EmployeeRole } from "@/src/types/employees";
import TopRoleCard from "./TopRoleCard";

// Definimos el type
type EmployeeStatsProps = {
    stats: {
        total: number;
        kitchen: number;
        waiter: number;
        avgAge: number;
    }
}

// Definimos los roles
const roleLabels: Record<EmployeeRole, string> = {
    ADMIN: "Admin",
    KITCHEN: "Kitchen",
    WAITER: "Waiter",
}

// Helpers fuera del componente
function getTotalMsg(n: number): [string, string, string] {
    if (n === 0) return ["text-blue-500 dark:text-blue-400", "bg-blue-500/10", "Add your first employee!"];
    if (n <= 3) return ["text-blue-500 dark:text-blue-400", "bg-blue-500/10", "Great start, keep growing!"];
    if (n <= 10) return ["text-blue-500 dark:text-blue-400", "bg-blue-500/10", "Your team is taking shape"];
    if (n <= 20) return ["text-violet-500 dark:text-violet-400", "bg-violet-500/10", "A solid, growing team!"];
    if (n <= 35) return ["text-green-500 dark:text-green-400", "bg-green-500/10", "An impressive team you built!"];
    return ["text-amber-500 dark:text-amber-400", "bg-amber-500/10", "A top-tier team!"];
}

function getAgeMsg(age: number): [string, string, string] {
    if (age === 0) return ["text-blue-500 dark:text-blue-400", "bg-blue-500/10", "No data yet"];
    if (age < 22) return ["text-blue-500 dark:text-blue-400", "bg-blue-500/10", "A young, dynamic team!"];
    if (age < 28) return ["text-green-500 dark:text-green-400", "bg-green-500/10", "Energy and freshness on the team"];
    if (age < 35) return ["text-green-500 dark:text-green-400", "bg-green-500/10", "A perfect balance of experience"];
    if (age < 45) return ["text-violet-500 dark:text-violet-400", "bg-violet-500/10", "Maturity and judgment in every shift"];
    return ["text-amber-500 dark:text-amber-400", "bg-amber-500/10", "Experience that's priceless"];
}

// Definimos el componente de stats
export default function EmployeeStats({ stats }: EmployeeStatsProps) {
    // Calculamos el rol mas comun
    const topRole = Object.entries({
        KITCHEN: stats.kitchen,
        WAITER: stats.waiter,
    }).sort((a, b) => b[1] - a[1])[0];

    // Obtenemos el porcentaje
    const topRolePercentage = stats.total > 0
        ? Math.round((topRole[1] / stats.total) * 100)
        : 0;

    // Total de empleados
    const [totalColor, totalBg, totalMsg] = getTotalMsg(stats.total);
    // Edad promedio
    const [ageColor, ageBg, ageMsg] = getAgeMsg(stats.avgAge);

    return (
        <section
            aria-label="Team statistics"
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4 scrollbar-none sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none sm:mx-0 sm:px-0 sm:gap-6 lg:grid-cols-4"
        >
            {/* Total empleados */}
            <dl className="shrink-0 w-[80%] xs:w-[70%] snap-center sm:w-auto sm:shrink sm:snap-none bg-white dark:bg-zinc-900 rounded-xl p-4 flex flex-col gap-3 border border-zinc-200 dark:border-zinc-800/70">
                <dt className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    Total employees
                </dt>
                <dd className="text-4xl font-medium text-zinc-900 dark:text-white">
                    {stats.total}
                </dd>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    Registered in the system
                </p>
                <p className={`text-xs font-medium px-2 py-1 rounded-md w-fit ${totalColor} ${totalBg}`}>
                    {totalMsg}
                </p>
            </dl>

            {/* Distribucion por rol */}
            <dl className="shrink-0 w-[80%] xs:w-[70%] snap-center sm:w-auto sm:shrink sm:snap-none bg-white dark:bg-zinc-900 rounded-xl p-4 flex flex-col gap-3 border border-zinc-200 dark:border-zinc-800/70">
                <dt className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    Distribution by role
                </dt>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <dt className="text-xs text-zinc-600 dark:text-zinc-400">Kitchen</dt>
                        <dd className="text-xs font-medium bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                            {stats.kitchen}
                        </dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-xs text-zinc-600 dark:text-zinc-400">Waiter</dt>
                        <dd className="text-xs font-medium bg-teal-500/10 text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded-full">
                            {stats.waiter}
                        </dd>
                    </div>
                </div>
            </dl>

            {/* Promedio de edad */}
            <dl className="shrink-0 w-[80%] xs:w-[70%] snap-center sm:w-auto sm:shrink sm:snap-none bg-white dark:bg-zinc-900 rounded-xl p-4 flex flex-col gap-3 border border-zinc-200 dark:border-zinc-800/70">
                <dt className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    Average age
                </dt>
                <dd className="text-4xl font-medium text-zinc-900 dark:text-white">
                    {stats.avgAge}
                </dd>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    years between the team
                </p>
                <p className={`text-xs font-medium px-2 py-1 rounded-md w-fit ${ageColor} ${ageBg}`}>
                    {ageMsg}
                </p>
            </dl>

            {/* Rol mas comun */}
            <div className="shrink-0 w-[80%] xs:w-[70%] snap-center sm:w-auto sm:shrink sm:snap-none">
                <TopRoleCard
                    role={stats.total > 0 ? roleLabels[topRole[0] as EmployeeRole] : "No data yet"}
                    percentage={topRolePercentage}
                />
            </div>
        </section>
    )
}