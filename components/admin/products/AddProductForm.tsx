"use client"

// Importamos las librerias
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { CldUploadWidget } from "next-cloudinary";
import { Category } from "@/src/types/categories";
import SubmitButton from "@/components/ui/SubmitButton";
import { useActionState, useEffect, useRef, useState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { createProduct } from "@/actions/products/create-product-action";
import { PhotoIcon, PlusIcon, XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type AddProductFormProps = {
    categories: Category[];
    onClose: () => void;
}

type CloudinaryResult = {
    secure_url: string;
}

type VariantDraft = {
    name: string;
    price: string;
}

export default function AddProductForm({ categories, onClose }: AddProductFormProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const [imageUrl, setImageUrl] = useState("");
    const [variants, setVariants] = useState<VariantDraft[]>([{ name: "", price: "" }]);

    const addVariant = () => setVariants([...variants, { name: "", price: "" }]);
    const removeVariant = (index: number) => {
        if (variants.length === 1) return;
        setVariants(variants.filter((_, i) => i !== index));
    };
    const updateVariant = (index: number, field: keyof VariantDraft, value: string) => {
        const updated = [...variants];
        updated[index] = { ...updated[index], [field]: value };
        setVariants(updated);
    };

    const [state, dispatch] = useActionState(createProduct, {
        errors: {},
        success: ""
    });

    useEffect(() => {
        if (state.success) {
            toast.success(state.success);
            formRef.current?.reset();
            setImageUrl("");
            setVariants([{ name: "", price: "" }]);
            onClose();
        } else if (state.errors.general) {
            toast.error(state.errors.general[0]);
        }
    }, [state]);

    return (
        <form action={dispatch} ref={formRef} className="flex flex-col gap-4">
            <FieldGroup className="gap-0 space-y-5">
                {/* Nombre */}
                <Field className="gap-1">
                    <FieldLabel htmlFor="product-name">Product name</FieldLabel>
                    <Input
                        id="product-name"
                        name="name"
                        placeholder="e.g., Classic Cappuccino"
                        className="bg-white shadow-none h-10"
                    />
                    {state.errors?.name?.[0] && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                            <ExclamationCircleIcon className="size-3.5 shrink-0" />
                            <span>{state.errors.name[0]}</span>
                        </div>
                    )}
                </Field>

                {/* Descripción */}
                <Field className="gap-1">
                    <FieldLabel htmlFor="product-description">
                        Description <span className="text-zinc-400 font-normal">(optional)</span>
                    </FieldLabel>
                    <Textarea
                        id="product-description"
                        name="description"
                        rows={2}
                        placeholder="Short description of the product..."
                        className="bg-white shadow-none resize-none"
                    />
                </Field>

                {/* Categoría + Estado */}
                <div className="grid grid-cols-2 gap-3">
                    <Field className="gap-1">
                        <FieldLabel>Category</FieldLabel>
                        <Select name="categoryId">
                            <SelectTrigger className="w-full bg-white shadow-none h-10">
                                <SelectValue placeholder="Select a category">
                                    {(value: string) =>
                                        categories.find((c) => c.id === value)?.name ?? "Select a category"
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {state.errors?.categoryId?.[0] && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                                <ExclamationCircleIcon className="size-3.5 shrink-0" />
                                <span>{state.errors.categoryId[0]}</span>
                            </div>
                        )}
                    </Field>

                    <Field className="gap-1">
                        <FieldLabel>Status</FieldLabel>
                        <Select name="active" defaultValue="true">
                            <SelectTrigger className="w-full bg-white shadow-none h-10">
                                <SelectValue placeholder="Select a status">
                                    {(value: string) => (value === "true" ? "Active" : "Inactive")}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Active</SelectItem>
                                <SelectItem value="false">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>

                {/* Imagen */}
                <Field className="gap-1">
                    <FieldLabel>Image</FieldLabel>
                    <input type="hidden" name="image" value={imageUrl} />
                    {imageUrl ? (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                            <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" />
                            <button
                                type="button"
                                onClick={() => setImageUrl("")}
                                className="absolute top-2 right-2 bg-zinc-900/80 p-1.5 rounded-lg cursor-pointer"
                            >
                                <XMarkIcon className="size-4 text-white" />
                            </button>
                        </div>
                    ) : (
                        <CldUploadWidget
                            uploadPreset="brewkoffee"
                            onSuccess={(res) => setImageUrl((res.info as CloudinaryResult).secure_url)}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    onClick={() => open()}
                                    className="w-full h-40 flex flex-col items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-400 hover:border-amber-500 hover:text-amber-600 transition-colors cursor-pointer"
                                >
                                    <PhotoIcon className="size-7" />
                                    <span className="text-xs">Click to upload</span>
                                </button>
                            )}
                        </CldUploadWidget>
                    )}
                    {state.errors?.image?.[0] && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                            <ExclamationCircleIcon className="size-3.5 shrink-0" />
                            <span>{state.errors.image[0]}</span>
                        </div>
                    )}
                </Field>

                {/* Variantes */}
                <Field className="gap-1">
                    <div className="flex items-center justify-between">
                        <FieldLabel>Variants</FieldLabel>
                        <button
                            type="button"
                            onClick={addVariant}
                            className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700 cursor-pointer"
                        >
                            <PlusIcon className="size-3.5" />
                            Add variant
                        </button>
                    </div>

                    <input type="hidden" name="variants" value={JSON.stringify(variants)} />

                    <div className="flex flex-col gap-2 mt-1">
                        {variants.map((variant, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input
                                    value={variant.name}
                                    onChange={(e) => updateVariant(index, "name", e.target.value)}
                                    placeholder="e.g., Large 16oz"
                                    className="bg-white shadow-none h-10 flex-1"
                                />
                                <Input
                                    value={variant.price}
                                    onChange={(e) => updateVariant(index, "price", e.target.value)}
                                    placeholder="0.00"
                                    inputMode="decimal"
                                    className="bg-white shadow-none h-10 w-24"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeVariant(index)}
                                    disabled={variants.length === 1}
                                    className="p-2 text-zinc-400 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <XMarkIcon className="size-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    {state.errors?.variants?.[0] && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                            <ExclamationCircleIcon className="size-3.5 shrink-0" />
                            <span>{state.errors.variants[0]}</span>
                        </div>
                    )}
                </Field>

                <div className="flex items-center justify-end gap-2 w-full border-t border-zinc-100 dark:border-zinc-800/50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 mt-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                        Cancel
                    </button>
                    <SubmitButton loadingLabel="Creating..." label="Create product" />
                </div>
            </FieldGroup>
        </form>
    )
}