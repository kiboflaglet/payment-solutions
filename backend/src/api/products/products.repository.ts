import { Product } from "./products.model";

const products: Product[] = [
    {
        id: "1",
        title: "T-Shirt",
        price: 100
    },
    {
        id: "2",
        title: "Pants",
        price: 200
    },
]

export class ProductRepository {
    async findAllProducts(): Promise<Product[]> {
        return products
    }

    async findProductById(id: string): Promise<Product | null> {
        return products.find(item => item.id === id) || null
    }
}
