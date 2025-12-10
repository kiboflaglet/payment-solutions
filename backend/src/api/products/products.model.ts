import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z)

export const ProductSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    price: z.number().positive()
})

export type Product = z.infer<typeof ProductSchema>;
