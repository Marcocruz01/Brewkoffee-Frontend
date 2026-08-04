// Importamos las librerias
import { z } from "zod";

// Estados de la mesa (AJUSTAR según tu enum real de Prisma)
export const tableStatuses = ["AVAILABLE", "OCCUPIED", "RESERVED"] as const;
// Zonas de la mesa (AJUSTAR según tu enum real de Prisma)
export const tableZones = ["INDOOR", "OUTDOOR", "TERRACE", "BAR"] as const;

// Definimos el schema para el formulario de crear
export const CreateTableSchema = z.object({
    body: z.object({
        // Number validation and string-to-number transformation
        number: z.coerce.number()
            .int("Table number must be a whole number")
            .positive("Table number must be greater than 0"),

        // Capacity validation and string-to-number transformation
        capacity: z.coerce.number()
            .int("Capacity must be a whole number")
            .min(1, "Capacity must be at least 1"),

        // Zone enum validation
        zone: z.enum(tableZones, {
            message: "Zone is required and must be a valid selection"
        }),

        // Status enum validation (opcional al crear, con default)
        status: z.enum(tableStatuses).optional(),
    })
});

// Schema para actualizar (todos los campos opcionales)
export const UpdateTableSchema = z.object({
    body: CreateTableSchema.shape.body.partial()
});

// Definimos los types
export type CreateTableType = z.infer<typeof CreateTableSchema.shape.body>;
export type UpdateTableType = z.infer<typeof UpdateTableSchema.shape.body>;