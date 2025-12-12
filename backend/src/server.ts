import express, { type Express } from "express"
import { healthRouter } from "./api/health/health.router"
import { openAPIRouter } from "./api-docs/openAPI.router"
import { productsRoute } from "./api/products/products.router"
import { orderRoute } from "./api/orders/orders.router"
const app: Express = express()
app.use(express.json())

const apiRouterV1 = express.Router();
apiRouterV1.use('/health', healthRouter)
apiRouterV1.use('/swagger', openAPIRouter)
apiRouterV1.use('/products', productsRoute)
apiRouterV1.use('/orders', orderRoute)

app.use("/api/v1", apiRouterV1)

export { app }
