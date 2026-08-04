// Importamos las librerias
import { z } from "zod";

// Definimos el schema para el formulario de crear
export const CreateCategorySchema = z.object({
    body: z.object({
        name: z.string().min(1, "Category name is required").trim(),
    })
});

// Schema para actualizar (todos los campos opcionales)
export const UpdateCategorySchema = z.object({
    body: CreateCategorySchema.shape.body.partial()
});

// Definimos los types
export type CreateCategoryType = z.infer<typeof CreateCategorySchema.shape.body>;
export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema.shape.body>;