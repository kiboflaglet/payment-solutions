import express, { type Router } from "express";
import { orderController, OrderController } from "./orders.controller";

export const orderRoute: Router = express.Router()

orderRoute.get('/', orderController.getOrders)
orderRoute.post('/', orderController.createOrder)