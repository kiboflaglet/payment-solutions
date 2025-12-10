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
            return serviceResponse.success<Product[]>("Users found", data)
        } catch (error) {
            const errorMessage = `Error finding all users: ${(error as Error).message}`
            console.log(errorMessage)
            return serviceResponse.failure("An error occurred while retrieving users", null, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
}

export const productService = new ProductService()