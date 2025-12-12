export interface Product {
    id: number;
    title: string;
    price: number;
}

export interface Order {
    id: number;
    status: 'pending' | 'failed' | 'paid';
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