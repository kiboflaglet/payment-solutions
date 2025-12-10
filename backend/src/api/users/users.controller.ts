import { Request, RequestHandler, Response } from "express";
import { userService } from "./users.service";

class UsersController {
    public getUsers: RequestHandler = async (_req: Request, res: Response) => {
        const response = await userService.findAll()
        res.status(response.statusCode).send(response)
    }
}

export const usersController = new UsersController()