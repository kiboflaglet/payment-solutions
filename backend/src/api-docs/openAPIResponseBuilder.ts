import { StatusCodes } from "http-status-codes";
import z from "zod";

export function openAPIResponseBuilder(schema: z.ZodType, description: string, statusCode = StatusCodes.OK) {
    return {
        [statusCode]: {
            description,
            content: {
                "application/json": {
                    schema: schema
                }
            }
        }
    }
}