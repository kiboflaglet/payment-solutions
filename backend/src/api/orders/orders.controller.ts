import { Request, RequestHandler, Response } from "express";
import { orderService } from "./orders.service";
import { OrderItemCreateSchema, OrderItemSchema } from "./orders.model";
import z from "zod";
import { serviceResponse } from "@/common/utils/serviceResponse";

export class OrderController {
    public getOrders: RequestHandler = async (_req: Request, res: Response) => {
        const result = await orderService.findAll()
        res.status(res.statusCode).send(result)
    }

    public createOrder: RequestHandler = async (req: Request, res: Response) => {
        const orderItemsValidated = OrderItemCreateSchema.safeParse(req.body.items)

        if (!orderItemsValidated.success) {
            const result = serviceResponse.failure("Invalid Items", null)
            console.log(orderItemsValidated.error.message)
            return res.status(result.statusCode).send(result)
        }

        const result = await orderService.create(orderItemsValidated.data)
        res.status(result.statusCode).send(result)
    }
}

export const orderController = new OrderController()