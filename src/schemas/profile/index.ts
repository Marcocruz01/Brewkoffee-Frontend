// Importamos zod
import { z } from "zod";

// Schema para actualizar el perfil
export const UpdateProfileSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required").trim().optional(),
        lastname: z.string().min(1, "Lastname is required").trim().optional(),
        email: z.string().email("Invalid email").optional(),
        age: z.coerce.number().int().positive("Age must be greater than 0").optional(),
    })
});

// Tipos
export type UpdateProfileType = z.infer<typeof UpdateProfileSchema.shape.body>;