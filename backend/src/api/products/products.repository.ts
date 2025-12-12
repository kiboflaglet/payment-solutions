import prisma from "@/lib/prisma";
import { Product } from "./products.model";


export class ProductRepository {
    async findAllProducts(): Promise<Product[]> {
        const res = await prisma.product.findMany({
            select: {
                id: true,
                title: true,
                price: true
            }
        })

        return res
    }

    async findProduct(id: number): Promise<Product | null> {
        const res = await prisma.product.findFirstOrThrow({
            where: { id },
            select: {
                id: true,
                title: true,
                price: true
            }
        })

        return res
    }

    async createProduct(data: Omit<Product, 'id'>): Promise<Product> {
        const res = await prisma.product.create({
            data
        })

        return res
    }

    async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
        const res = await prisma.product.update({
            where: { id },
            data
        })

        return res
    }

    async deleteProduct(id: number): Promise<null> {
        await prisma.product.delete({
            where: { id },
        })

        return null
    }
}
