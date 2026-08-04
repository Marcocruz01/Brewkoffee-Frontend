// Importamos zod
import { z } from "zod";

// Tipos válidos
export const validOrderTypes = ["DINE_IN", "TAKEOUT"] as const;

// Schema para un item dentro de la orden
const orderItemSchema = z.object({
    variantId: z.string().uuid("Invalid variant"),
    quantity: z.number().int().positive(),
});

// Schema para crear la orden
export const CreateOrderSchema = z.object({
    body: z.object({
        type: z.enum(validOrderTypes, { message: "Order type is required" }),
        tableId: z.string().uuid("Invalid table").optional(),
        customerName: z.string().trim().min(1).max(60).optional(),
        items: z.array(orderItemSchema).min(1, "At least one item is required"),
    })
});

// Tipos inferidos
export type CreateOrderType = z.infer<typeof CreateOrderSchema.shape.body>;