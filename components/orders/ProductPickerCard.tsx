"use client";

import Image from "next/image";
import { Product } from "@/src/types/products";
import { PhotoIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProductPickerCardProps = {
  product: Product;
  onAdd: (variantId: string, variantName: string, price: number) => void;
};

export default function ProductPickerCard({ product, onAdd }: ProductPickerCardProps) {
  const hasMultipleVariants = product.variants.length > 1;

  // Calculamos el precio único o el precio "Desde"
  const minPrice = Math.min(...product.variants.map((v) => v.price));

  function handleClick() {
    if (!hasMultipleVariants && product.variants.length > 0) {
      const variant = product.variants[0];
      onAdd(variant.id, variant.name, variant.price);
    }
  }

  // Tarjeta visual reutilizable
  const CardContent = (
    <div
      onClick={!hasMultipleVariants ? handleClick : undefined}
      className="group relative flex flex-col w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2.5 text-left transition-all duration-200 cursor-pointer hover:border-zinc-950 dark:hover:border-zinc-100 hover:shadow-md active:scale-[0.98] select-none"
    >
      {/* Badge si tiene múltiples opciones */}
      {hasMultipleVariants && (
        <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-900/80 text-white dark:bg-zinc-100/80 dark:text-zinc-900 backdrop-blur-xs">
          <span>{product.variants.length} options</span>
          <ChevronDownIcon className="size-2.5" />
        </span>
      )}

      {/* Contenedor de Imagen */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800/80">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PhotoIcon className="size-7 text-zinc-300 dark:text-zinc-700" />
          </div>
        )}
      </div>

      {/* Detalles del Producto */}
      <div className="flex flex-col gap-1 pt-3 px-0.5">
        <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
          {product.name}
        </h3>

        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          {hasMultipleVariants ? `From $${minPrice.toFixed(2)}` : `$${minPrice.toFixed(2)}`}
        </p>
      </div>
    </div>
  );

  // Si tiene múltiples variantes, envolvemos en el DropdownMenu usando asChild
  if (hasMultipleVariants) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          {CardContent}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 rounded-xl p-1">
          {product.variants.map((variant) => (
            <DropdownMenuItem
              key={variant.id}
              onClick={() => onAdd(variant.id, variant.name, variant.price)}
              className="flex items-center justify-between text-xs font-medium py-2 px-2.5 rounded-lg cursor-pointer focus:bg-zinc-100 dark:focus:bg-zinc-800"
            >
              <span className="text-zinc-900 dark:text-zinc-100">{variant.name}</span>
              <span className="text-zinc-500 dark:text-zinc-400 font-semibold">
                ${variant.price.toFixed(2)}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return CardContent;
}