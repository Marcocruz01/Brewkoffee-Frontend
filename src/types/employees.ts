// Importamos los roles y turnp de schema
import { roles, turnos } from "@/src/schemas/employees";

// Definimos los tipos a partir de los arrays de Zod (misma fuente de verdad)
export type EmployeeRole = (typeof roles)[number];
export type EmployeeSchedule = (typeof turnos)[number];

// Definimos el type para el empleado
export type Employee = {
    id: string;
    name: string;
    lastname: string;
    email: string;
    password?: string;
    role: EmployeeRole;
    age: number;
    schedule: EmployeeSchedule;
    createdAt: string;
}