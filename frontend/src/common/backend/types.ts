export type serviceResponse<T = null> = {
    message: string | null;
    responseObject: T;
    statusCode: number;
    success: boolean;
}