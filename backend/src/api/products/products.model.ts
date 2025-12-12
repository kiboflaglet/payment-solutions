import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z)

export const ProductGetSchema = z.object({
    id: z.coerce.number().int().positive()
})

export const ProductSchema = ProductGetSchema.extend({
    title: z.string().min(1),
    price: z.number().positive()
})

export const ProductCreateSchema = ProductSchema.omit({ id: true })
export const ProductUpdateSchema = ProductCreateSchema.partial()


export type Product = z.infer<typeof ProductSchema>;
