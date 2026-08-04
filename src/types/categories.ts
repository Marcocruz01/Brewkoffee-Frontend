// Definimos el type para la categoría
export type Category = {
    id: string;
    name: string;
    createdAt: string;
    _count?: {
        products: number;
    };
}