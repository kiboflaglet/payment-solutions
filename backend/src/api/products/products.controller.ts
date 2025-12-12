import { Request, RequestHandler, Response } from "express";
import { productService } from "./products.service";
import { ProductCreateSchema, ProductGetSchema, ProductSchema, ProductUpdateSchema } from "./products.model";
import { serviceResponse } from "@/common/utils/serviceResponse";

class ProductsController {

    public getProducts: RequestHandler = async (_req: Request, res: Response) => {
        const response = await productService.findAll()
        res.status(response.statusCode).send(response)
    }

    public getProduct: RequestHandler = async (req: Request, res: Response) => {
        const idValidated = ProductGetSchema.safeParse({ id: req.params.id })
        if (!idValidated.success) {
            const result = serviceResponse.failure("Invalid product ID", null)
            return res.status(result.statusCode).send(result)
        }
        const response = await productService.get(idValidated.data.id)
        res.status(response.statusCode).send(response)
    }

    public createProduct: RequestHandler = async (req: Request, res: Response) => {
        const validated = ProductCreateSchema.safeParse(req.body)
        if (!validated.success) {
            const result = serviceResponse.failure(validated.error.message, null)
            return res.status(result.statusCode).send(result)
        }
        const response = await productService.create(validated.data)
        res.status(response.statusCode).send(response)
    }

    public updateProduct: RequestHandler = async (req: Request, res: Response) => {
        const idValidated = ProductGetSchema.safeParse({ id: req.params.id })
        if (!idValidated.success) {
            const result = serviceResponse.failure("Invalid product ID", null)
            return res.status(result.statusCode).send(result)
        }
        const bodyValidated = ProductUpdateSchema.safeParse(req.body)
        if (!bodyValidated.success) {
            const result = serviceResponse.failure(bodyValidated?.error.message, null)
            return res.status(result.statusCode).send(result)
        }
        const response = await productService.update(idValidated.data.id, bodyValidated.data)
        res.status(response.statusCode).send(response)
    }


    public deleteProduct: RequestHandler = async (req: Request, res: Response) => {
        const idValidated = ProductGetSchema.safeParse({ id: req.params.id })
        if (!idValidated.success) {
            const result = serviceResponse.failure("Invalid product ID", null)
            return res.status(result.statusCode).send(result)
        }
        const response = await productService.delete(idValidated.data.id)
        res.status(response.statusCode).send(response)
    }
}

export const productsController = new ProductsController()