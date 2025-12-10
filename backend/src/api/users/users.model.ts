import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z)

export const UserSchema = z.object({
    id: z.string().min(1),
    email: z.string().min(1),
})

export type User = z.infer<typeof UserSchema>;
