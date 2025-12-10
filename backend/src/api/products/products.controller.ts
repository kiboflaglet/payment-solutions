import { Request, RequestHandler, Response } from "express";
import { productService } from "./products.service";

class ProductsController {
    public getProducts: RequestHandler = async (_req: Request, res: Response) => {
        const response = await productService.findAll()
        res.status(response.statusCode).send(response)
    }
}

export const productsController = new ProductsController()