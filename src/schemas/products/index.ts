// Importamos zod
import { z } from "zod";

// Schema para una variante individual (usado dentro de la creación del producto)
const variantSchema = z.object({
    name: z.string().min(1, "Variant name is required").trim(),
    price: z.coerce.number().positive("Price must be greater than 0"),
});

// Schema para el formulario de creación
export const CreateProductSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Product name is required").trim(),
        description: z.string().trim().optional(),

        // "" (sin imagen aún) se convierte en undefined antes de validar como URL
        image: z.preprocess(
            (val) => (val === "" ? undefined : val),
            z.string().url("Image must be a valid URL").optional()
        ),

        // El Select manda "true"/"false" como string, lo convertimos a boolean real
        active: z.preprocess(
            (val) => (val === "true" ? true : val === "false" ? false : val),
            z.boolean().optional()
        ),

        categoryId: z.string().min(1, "Please select a category").uuid("Please select a category"),
        variants: z.array(variantSchema).min(1, "At least one variant with a price is required"),
    })
});

// Schema para actualizar (sin variantes, se administran aparte)
export const UpdateProductSchema = z.object({
    body: CreateProductSchema.shape.body.omit({ variants: true }).partial()
});

// Schema para crear/actualizar una variante suelta
export const CreateVariantSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Variant name is required").trim(),
        price: z.coerce.number().positive("Price must be greater than 0"),
    })
});

export const UpdateVariantSchema = z.object({
    body: CreateVariantSchema.shape.body.partial()
});

// Tipos
export type CreateVariantType = z.infer<typeof CreateVariantSchema.shape.body>;
export type UpdateVariantType = z.infer<typeof UpdateVariantSchema.shape.body>;
