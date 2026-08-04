// Importamos los enums directamente desde el schema, para no duplicarlos
import { tableStatuses, tableZones } from "@/src/schemas/tables";

// Definimos los tipos a partir de los arrays de Zod (misma fuente de verdad)
export type TableStatus = (typeof tableStatuses)[number];
export type TableZone = (typeof tableZones)[number];

// Definimos el type para la mesa
export type Table = {
    id: string;
    number: number;
    capacity: number;
    status: TableStatus;
    zone: TableZone;
    createdAt: string;
    updatedAt: string;
}