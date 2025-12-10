import { env } from "./common/utils/envConfig";
import { app } from "./server";

const server = app.listen(env.PORT, () => {
    console.log(`server start at http://${env.HOST}:${env.PORT}`)
})

const onCloseSignal = () => {
    console.log("shutting down")
    server.close(() => {
        console.log('signal recieved, shutting down')
        process.exit()
    })
    setTimeout(() => {
        process.exit(1)
    }, 10000).unref();
}

process.on("SIGINT", onCloseSignal)
process.on("SIGTERM", onCloseSignal)