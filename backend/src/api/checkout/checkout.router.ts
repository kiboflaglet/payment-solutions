import express, { type Router } from "express";
import { checkoutController } from "./checkout.controller";

export const checkoutRoute: Router = express.Router()

checkoutRoute.post('/', checkoutController.processPayment)