import { stripe } from "@/common/stripe/client";
import { env } from "@/common/utils/envConfig";
import { serviceResponse } from "@/common/utils/serviceResponse";
import { PaymentRedirect } from "./checkout.model";
import { CheckoutRepository } from "./checkout.repository";

export class CheckoutService {
    private checkoutRepo: CheckoutRepository

    constructor(checkoutRepo: CheckoutRepository = new CheckoutRepository) {
        this.checkoutRepo = checkoutRepo
    }

    async processPayment(id: number): Promise<serviceResponse<PaymentRedirect | null>> {
        try {
            const res = await this.checkoutRepo.findOrder(id)

            const stripeSession = await stripe.checkout.sessions.create({
                mode: "payment",
                payment_method_types: ["card"],
                line_items: res?.OrderItems.map(item => ({
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.product.title,
                        },
                        unit_amount: item.product.price * 100
                    },
                    quantity: item.quantity
                })),
                metadata: {
                    orderId: res.id
                },
                success_url: env.FRONTEND_PAYMENT_SUCCESS_URL,
                cancel_url: env.FRONTEND_PAYMENT_FAILED_URL
            })

            if (!stripeSession.url) {
                throw new Error("Payment has failed, redirect url hasn't been provided")
            }

            return serviceResponse.success("You are going to redirect to payment page", { url: stripeSession.url })
        } catch (error) {
            const errorMessage = "Error while processing payment"
            console.log(`${errorMessage}: ${(error as Error).message}`)
            return serviceResponse.failure(errorMessage, null)
        }
    }
}

export const checkoutService = new CheckoutService()