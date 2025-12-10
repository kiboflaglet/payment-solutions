import express, { type Router } from "express";
import { productsController } from "./products.controller";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { ProductSchema } from "./products.model";
import { openAPIResponseBuilder } from "@/api-docs/openAPIResponseBuilder";
import z from "zod";

export const productRegistry = new OpenAPIRegistry()
productRegistry.register("Product", ProductSchema)

export const productsRoute: Router = express.Router();

productRegistry.registerPath({
    "method": "get",
    path: "/products",
    responses: openAPIResponseBuilder(z.array(ProductSchema), "Success")
})
productsRoute.get("/", productsController.getProducts)