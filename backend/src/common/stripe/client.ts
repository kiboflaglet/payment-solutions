import { env } from "@/common/utils/envConfig";
import Stripe from "stripe";

export const stripe = new Stripe(
    env.STRIPE_SECRET_KEY || "",
    { apiVersion: "2025-11-17.clover" }
)