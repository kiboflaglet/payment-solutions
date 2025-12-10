import express, { type Router } from "express";
import swaggerUI from 'swagger-ui-express'
import { generateOpenAPIDocument } from "./openAPIGenerator";


export const openAPIRouter: Router = express.Router()
const openAPIDocument = generateOpenAPIDocument()

openAPIRouter.use('/', swaggerUI.serve, swaggerUI.setup(openAPIDocument))