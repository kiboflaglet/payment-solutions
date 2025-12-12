import { OrderStatus } from "@/generated/prisma/enums";
import z from "zod";

// export const OrderStatus = z.nativeEnum(Order)

export const OrderGetSchema = z.object({
    id: z.coerce.number().int().positive()
})

export const OrderSchema = OrderGetSchema.extend({
    total: z.number().int().positive(),
    status: z.nativeEnum(OrderStatus),
    createdAt: z.date()
})

export const OrderItemSchema = z.object({
    id: z.coerce.number().int().positive(),
    quantity: z.number().int().positive(),
    productId: z.coerce.number().int().positive(),
    orderId: z.coerce.number().int().positive(),
})

export const OrderItemCreateSchema = z.array(OrderItemSchema.omit({ id: true, orderId: true })).min(1)
export const OrderCreateSchema = OrderSchema.extend({
    OrderItems: OrderItemCreateSchema
}).omit({id: true, createdAt: true})

export type Order = z.infer<typeof OrderSchema>
export type OrderCreate = z.infer<typeof OrderCreateSchema>

export type OrderItem = z.infer<typeof OrderItemSchema>
export type OrderItemCreate = z.infer<typeof OrderItemCreateSchema>
