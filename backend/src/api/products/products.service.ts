import { serviceResponse } from "@/common/utils/serviceResponse";
import { ProductRepository } from "./products.repository";
import { StatusCodes } from "http-status-codes";
import { Product } from "./products.model";

class ProductService {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository = new ProductRepository()) {
        this.productRepository = productRepository
    }
    async findAll(): Promise<serviceResponse<Product[] | null>> {
        try {
            const data = await this.productRepository.findAllProducts()
            return serviceResponse.success<Product[]>("Products found", data)
        } catch (error) {
            const errorMessage = `Error finding all products: ${(error as Error).message}`
            console.log(errorMessage)
            return serviceResponse.failure("An error occurred while retrieving products", null, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async get(id: number): Promise<serviceResponse<Product| null>> {
        try {
            const data = await this.productRepository.findProduct(id)
            return serviceResponse.success<Product | null>("Product found", data)
        } catch (error) {
            const errorMessage = `Error finding product: ${(error as Error).message}`
            console.log(errorMessage)
            return serviceResponse.failure("An error occurred while retrieving product", null, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async create(req: Omit<Product, 'id'>): Promise<serviceResponse<Product | null>> {
        try {
            const data = await this.productRepository.createProduct(req)
            return serviceResponse.success<Product>("Product created", data)
        } catch (error) {
            const errorMessage = `Error creating product: ${(error as Error).message}`
            console.log(errorMessage)
            return serviceResponse.failure("An error occurred while creating product", null, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async update(id: number, req: Partial<Product>): Promise<serviceResponse<Product | null>> {
        try {
            const data = await this.productRepository.updateProduct(id, req)
            return serviceResponse.success<Product>("Product updated", data)
        } catch (error) {
            const errorMessage = `Error updating product: ${(error as Error).message}`
            console.log(errorMessage)
            return serviceResponse.failure("An error occurred while updating product", null, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async delete(id: number): Promise<serviceResponse<null>> {
        try {
            await this.productRepository.deleteProduct(id)
            return serviceResponse.success<null>("Product deleted", null)
        } catch (error) {
            const errorMessage = `Error deleting product: ${(error as Error).message}`
            console.log(errorMessage)
            return serviceResponse.failure("An error occurred while deleting product", null, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
}

export const productService = new ProductService()