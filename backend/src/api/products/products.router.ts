import express, { type Router } from "express";
import { productsController } from "./products.controller";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { ProductCreateSchema, ProductSchema } from "./products.model";
import { openAPIResponseBuilder } from "@/api-docs/openAPIResponseBuilder";
import z from "zod";

export const productRegistry = new OpenAPIRegistry()
productRegistry.register("Product", ProductSchema)
productRegistry.register("ProductCreate", ProductCreateSchema)

export const productsRoute: Router = express.Router();

productRegistry.registerPath({
    method: "get",
    path: "/products",
    responses: openAPIResponseBuilder(z.array(ProductSchema), "Success")
})

// productRegistry.registerPath({
//     method: "post",
//     path: "/products",
//     description: "Create a product",
//     requestBody: {
//         required: true,
//         content: {
//             "application/json": {
//                 schema: ProductCreateSchema
//             }
//         }
//     },
//     responses: openAPIResponseBuilder(ProductCreateSchema, "Success")
// });

productsRoute.get("/", productsController.getProducts)
productsRoute.get("/:id", productsController.getProduct)
productsRoute.post("/", productsController.createProduct)
productsRoute.patch("/:id", productsController.updateProduct)
productsRoute.delete("/:id", productsController.deleteProduct)