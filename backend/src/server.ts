import express, { type Express } from "express"
import { healthRouter } from "./api/health/health.router"
import { usersRoute } from "./api/users/users.router"
import { openAPIRouter } from "./api-docs/openApi.router"
const app: Express = express()

app.use('/health', healthRouter )
app.use('/swagger', openAPIRouter)
app.use('/users', usersRoute)

export { app }
