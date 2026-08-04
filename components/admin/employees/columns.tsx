"use client"

// Importamos las librerias
import Avatar from "boring-avatars";
import { AVATAR_COLORS } from "@/lib/constants";
import EmployeeActions from "./EmployeeActions";
import { ColumnDef } from "@tanstack/react-table";
import { Employee, EmployeeRole, EmployeeSchedule } from "@/src/types/employees";

// Estilos  por rol
const roleStyles: Record<EmployeeRole, string> = {
    KITCHEN: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    WAITER: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
    ADMIN: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
}

// Labels por rol
const roleLabels: Record<EmployeeRole, string> = {
    KITCHEN: "Kitchen",
    WAITER: "Waiter",
    ADMIN: "Admin",
}

// Minusculas para el horario
const scheduleLabels: Record<EmployeeSchedule, string> = {
    MORNING: "Morning",
    EVENING: "Evening",
    FULL: "Full"
}

// Definimos las columnas
export const columns: ColumnDef<Employee>[] = [
    {
        accessorKey: "name",
        header: "Employee",
        cell: ({ row }) => {
            const name: string = row.getValue("name");
            const lastname = row.original.lastname;
            const email = row.original.email;
            return (
                <div className="flex items-center gap-3">
                    <Avatar
                        name={email}
                        variant="beam"
                        size={32}
                        colors={AVATAR_COLORS}
                        className="shrink-0 border rounded-full"
                        aria-label="avatar"
                    />
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">
                        {name} {lastname}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {row.getValue("email")}
            </span>
        )
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role: EmployeeRole = row.getValue("role");
            return (
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleStyles[role]}`}>
                    {roleLabels[role]}
                </span>
            )
        }
    },
    {
        accessorKey: "age",
        header: "Age",
        cell: ({ row }) => (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {row.getValue("age")} years
            </span>
        )
    },
    {
        accessorKey: "schedule",
        header: "Schedule",
        cell: ({ row }) => {
            const schedule: EmployeeSchedule = row.getValue("schedule");
            return (
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {scheduleLabels[schedule]}
                </span>
            )
        }
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => <EmployeeActions employee={row.original}/>
    }
]