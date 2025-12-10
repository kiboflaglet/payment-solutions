import { openAPIResponseBuilder } from "@/api-docs/openAPIResponseBuilder";
import { serviceResponse } from "@/common/utils/serviceResponse";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import z from "zod";

export const healthRouter: Router = express.Router()

export const healthRegistery = new OpenAPIRegistry()

healthRegistery.registerPath({
    method: "get",
    path: "/health",
    responses: openAPIResponseBuilder(z.null(), "success")
})

healthRouter.get("/", (_req, res) => {
    const response = serviceResponse.success("app works very well", null)
    res.status(response.statusCode).send(response)
})
