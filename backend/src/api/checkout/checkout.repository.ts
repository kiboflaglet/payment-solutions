import prisma from "@/common/utils/prisma"
import {  OrderCreate } from "../orders/orders.model";
import { OrderCheckout } from "./checkout.model";

export class CheckoutRepository {

    async findOrder(id: number): Promise<OrderCheckout> {
        const res = await prisma.order.findUniqueOrThrow({
            where: { id },
            include: {
                OrderItems: {
                    select: {
                        id: true,
                        quantity: true,
                        product: {
                            select: {
                                id: true,
                                title: true,
                                price: true
                            }
                        }
                    }
                }
            }
        })

        return res;
    }
}
