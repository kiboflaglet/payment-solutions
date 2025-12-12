import { Request, RequestHandler, Response } from "express";
import { checkoutService } from "./checkout.service";
import { OrderGetSchema } from "../orders/orders.model";
import { serviceResponse } from "@/common/utils/serviceResponse";

export class CheckoutController {
    public processPayment: RequestHandler = async (req: Request, res: Response) => {
        const idValidated = OrderGetSchema.safeParse({ id: req.body.orderId })
        if (!idValidated.success) {
            const result = serviceResponse.failure("Invalid Order ID", null)
            return res.status(result.statusCode).send(result)
        }
        const result = await checkoutService.processPayment(idValidated.data.id)
        res.status(result.statusCode).send(result)
    }
}

export const checkoutController = new CheckoutController()