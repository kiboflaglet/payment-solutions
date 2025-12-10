import { serviceResponse } from "@/common/utils/serviceResponse";
import { UserRepository } from "./users.repository";
import { StatusCodes } from "http-status-codes";
import { User } from "./users.model";

class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository = new UserRepository()) {
        this.userRepository = userRepository
    }
    async findAll(): Promise<serviceResponse<User[] | null>> {
        try {
            const data = await this.userRepository.findAllUsers()
            if (!data || !data.length) {
                return serviceResponse.failure("No users found", null, StatusCodes.NOT_FOUND)
            }
            return serviceResponse.success<User[]>("Users found", data)
        } catch (error) {
            const errorMessage = `Error finding all users: ${(error as Error).message}`
            console.log(errorMessage)
            return serviceResponse.failure("An error occurred while retrieving users", null, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
}

export const userService = new UserService()