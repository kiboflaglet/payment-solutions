import express, { type Router } from "express";
import { usersController } from "./users.controller";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { UserSchema } from "./users.model";
import { openAPIResponseBuilder } from "@/api-docs/openAPIResponseBuilder";
import z from "zod";

export const userRegistry = new OpenAPIRegistry()
userRegistry.register("User", UserSchema)

export const usersRoute: Router = express.Router();

userRegistry.registerPath({
    "method": "get",
    path: "/users",
    responses: openAPIResponseBuilder(z.array(UserSchema), "Success")
})
usersRoute.get("/", usersController.getUsers)