import { Prisma } from "@/generated/prisma/client";

export type OrderCheckout = Prisma.OrderGetPayload<{
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
}>

export type PaymentRedirect = {
    url: string
}