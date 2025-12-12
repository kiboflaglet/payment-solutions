import { serviceResponse } from "@/common/utils/serviceResponse";
import { OrderRepository } from "./orders.repository";
import { Order, OrderItemCreate, OrderItem } from "./orders.model";
import { OrderStatus } from "@/generated/prisma/enums";

export class OrderService {
    private orderRepo: OrderRepository

    constructor(orderRepo: OrderRepository = new OrderRepository) {
        this.orderRepo = orderRepo
    }

    async findAll(): Promise<serviceResponse<Order[] | null>> {
        try {
            const res = await this.orderRepo.findAllOrders()
            return serviceResponse.success("Orders found", res)
        } catch (error) {
            const errorMessage = "Error while retreving orders"
            console.log(`${errorMessage}: ${(error as Error).message}`)
            return serviceResponse.failure(errorMessage, null)
        }
    }

    async create(orderItemData: OrderItemCreate): Promise<serviceResponse<Order | null>> {
        try {
            const total = orderItemData.reduce((total, acc) => total + acc.quantity, 0)
            const status: OrderStatus = "pending";
            const orderRequestData = {
                total,
                status,
                OrderItems: orderItemData
            }
            const res = await this.orderRepo.createOrder(orderRequestData)
            return serviceResponse.success("Order created", res)
        } catch (error) {
            const errorMessage = "Error while creating order"
            console.log(`${errorMessage}: ${(error as Error).message}`)
            return serviceResponse.failure(errorMessage, null)
        }
    }
}

export const orderService = new OrderService()