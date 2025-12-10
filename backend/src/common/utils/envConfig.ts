import dotenv from 'dotenv'
import z from 'zod'
dotenv.config()

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
    HOST: z.string().min(1).default('localhost'),
    PORT: z.coerce.number().int().positive().default(8080)
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
    console.error(`invalid enviroment values`, parsedEnv.error.format())
    throw new Error("invalid enviroment values")
}

export const env = {
    ...parsedEnv.data
}