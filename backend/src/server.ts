import express, { type Express } from "express"
import { healthRouter } from "./api/health/health.router"
import { usersRoute } from "./api/users/users.router"
import { openAPIRouter } from "./api-docs/openAPI.router"
import { productsRoute } from "./api/products/users.router"
const app: Express = express()

app.use('/health', healthRouter )
app.use('/swagger', openAPIRouter)
app.use('/users', usersRoute)
app.use('/products', productsRoute)

export { app }
