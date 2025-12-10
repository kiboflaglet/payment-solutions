import { StatusCodes } from "http-status-codes";
import z from "zod";

export class serviceResponse<T = null> {
    readonly success: boolean
    readonly responseObject: T
    readonly statusCode: number
    readonly message: string

    private constructor(success: boolean, responseObject: T, statusCode: number, message: string) {
        this.success = success;
        this.responseObject = responseObject;
        this.statusCode = statusCode
        this.message = message
    }

    static success<T>(message: string, responseObject: T, statusCode: number = StatusCodes.OK) {
        return new serviceResponse(true, responseObject, statusCode, message)
    }

    static failure<T>(message: string, responseObject: T, statusCode: number = StatusCodes.BAD_REQUEST) {
        return new serviceResponse(false, responseObject, statusCode, message)
    }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        success: z.boolean(),
        message: z.string(),
        responseObject: dataSchema.optional(),
        statusCode: z.number(),
    });