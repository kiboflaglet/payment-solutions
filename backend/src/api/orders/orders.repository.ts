import prisma from "@/common/utils/prisma"
import { Order, OrderCreate, OrderItem } from "./orders.model"

export class OrderRepository {
    async findAllOrders(): Promise<Order[] | null> {
        const res = await prisma.order.findMany({
            select: {
                id: true,
                total: true,
                status: true,
                createdAt: true,
                OrderItems: true,
            }
        })

        return res
    }

    async createOrder(orderData: OrderCreate): Promise<Order | null> {
        const res = await prisma.order.create({
            data: {
                total: orderData.total,
                status: orderData.status,
                OrderItems: {
                    create: orderData.OrderItems
                },
            },
            include: {
                OrderItems: true
            }
        })

        return res;
    }



}
