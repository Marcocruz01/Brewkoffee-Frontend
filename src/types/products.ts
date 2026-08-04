// Type para una variante de producto
export type ProductVariant = {
    id: string;
    name: string;
    price: number;
    productId: string;
    createdAt: string;
    updatedAt?: string;
}

// Type para la categoría anidada en el producto
export type ProductCategory = {
    id: string;
    name: string;
}

// Type para el producto completo, con sus relaciones pobladas
export type Product = {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    active: boolean;
    categoryId: string;
    category: ProductCategory;
    variants: ProductVariant[];
    createdAt: string;
    updatedAt: string;
}