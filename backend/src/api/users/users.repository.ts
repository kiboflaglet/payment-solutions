import { User } from "./users.model";

const users: User[] = [
    {
        id: "1",
        email: "khalaf@email.com"
    },
    {
        id: "2",
        email: "aynur@email.com"
    },
]

export class UserRepository {
    async findAllUsers(): Promise<User[]> {
        return users
    }

    async findUserById(id: string): Promise<User | null> {
        return users.find(item => item.id === id) || null
    }
}
