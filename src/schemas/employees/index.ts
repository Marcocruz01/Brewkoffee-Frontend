// Importamos las librerias
import { z } from "zod";

// Roles 
export const roles = ["ADMIN", "WAITER", "KITCHEN"] as const;
// Turnos
export const turnos = ["MORNING", "EVENING", "FULL"] as const;

// Definimos el schema para el formulario de crear
export const CreateEmployeeSchema = z.object({
    body: z.object({
        name: z.string().min(1, "First name is required").trim(),
        lastname: z.string().min(1, "Last name is required").trim(),
        email: z.string().email("Invalid email address").trim(),
        // Role enum validation
        role: z.enum(roles, {
            message: "Role is required and must be a valid selection"
        }),
        // Password validation
        password: z.string().min(8, "Password must be at least 8 characters long"),
        // Age validation and string-to-number transformation
        age: z.coerce.number()
            .int("Age must be a whole number")
            .min(18, "Employee must be at least 18 years old"),
        // Schedule enum validation
        schedule: z.enum(turnos, {
            message: "Schedule shift is required and must be a valid selection"
        })
    })
});

// Definimos el schema para el formulario de actualizar
export const UpdateEmployeeSchema = z.object({
    body: CreateEmployeeSchema.shape.body.partial()
});

// Definimos los types, extraídos directamente de los schemas
export type CreateEmployeeType = z.infer<typeof CreateEmployeeSchema.shape.body>;
export type UpdateEmployeeType = z.infer<typeof UpdateEmployeeSchema.shape.body>;