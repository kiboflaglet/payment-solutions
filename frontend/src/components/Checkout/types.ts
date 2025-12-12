export interface Product {
    id: number;
    title: string;
    price: number;
}

export const OrderTypes = {
    pending: "Pending",
    failed: "Failed",
    paid: "Paid",
} as const

export interface Order {
    id: number;
    status: keyof typeof OrderTypes
    total: number;
    createdAt: string;
    OrderItems: OrderItem[]
}

export interface OrderItem {
    id: number;
    quantity: number;
    productId: number;
    orderId: number
}

export interface CheckoutRedirect {
    url: string | null
}