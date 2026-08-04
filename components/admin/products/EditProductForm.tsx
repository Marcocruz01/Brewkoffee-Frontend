"use client"

// Importamos las librerias
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Product } from "@/src/types/products";
import { CldUploadWidget } from "next-cloudinary";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/ui/SubmitButton";
import { useActionState, useEffect, useRef, useState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { updateProduct } from "@/actions/products/update-product-action";
import { PhotoIcon, XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Definimos el prop
type EditProductFormProps = {
    product: Product;
    onClose: () => void;
}

// Definimos el prop
type CloudinaryResult = {
    secure_url: string;
}

// Definimos el componente
export default function EditProductForm({ product, onClose }: EditProductFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description ?? "");
    const [active, setActive] = useState(String(product.active));
    const [imageUrl, setImageUrl] = useState(product.image || "");

    const updateProductWithId = updateProduct.bind(null, product.id);

    const [state, dispatch] = useActionState(updateProductWithId, {
        errors: {},
        success: ""
    });

    useEffect(() => {
        if (state.success) {
            toast.success(state.success);
            onClose();
        } else if (state.errors.general) {
            toast.error(state.errors.general[0]);
        }
    }, [state]);

    return (
        <form action={dispatch} ref={formRef} className="flex flex-col gap-4">
            <FieldGroup className="gap-0 space-y-5">
                <Field className="gap-1">
                    <FieldLabel htmlFor="edit-product-name">Product name</FieldLabel>
                    <Input
                        id="edit-product-name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white shadow-none h-10"
                    />
                    {state.errors?.name?.[0] && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                            <ExclamationCircleIcon className="size-3.5 shrink-0" />
                            <span>{state.errors.name[0]}</span>
                        </div>
                    )}
                </Field>

                <Field className="gap-1">
                    <FieldLabel htmlFor="edit-product-description">
                        Description <span className="text-zinc-400 font-normal">(optional)</span>
                    </FieldLabel>
                    <Textarea
                        id="edit-product-description"
                        name="description"
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-white shadow-none resize-none"
                    />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                    {/* Categoría */}
                    <Field className="gap-1">
                        <FieldLabel>Category</FieldLabel>
                        <Select name="categoryId" defaultValue={product.categoryId}>
                            <SelectTrigger className="w-full bg-white shadow-none h-10">
                                <SelectValue placeholder="Select a category">
                                    {() => product.category.name}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={product.categoryId}>
                                    {product.category.name}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* Estado */}
                    <Field className="gap-1">
                        <FieldLabel>Status</FieldLabel>
                        <Select name="active" value={active} onValueChange={(value) => value && setActive(value)}>
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
                </Field>

                <div className="flex items-center justify-end gap-2 w-full border-t border-zinc-100 dark:border-zinc-800/50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 mt-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                        Cancel
                    </button>
                    <SubmitButton loadingLabel="Saving..." label="Save changes" />
                </div>
            </FieldGroup>
        </form>
    )
}