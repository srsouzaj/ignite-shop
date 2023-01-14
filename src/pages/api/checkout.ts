import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const priceId = 'price_1MPvieFfwzHRaijr8ODpgC5q'
    const successUrl = `${process.env.NEXT_URL}/success`
    const cancelUrl = `${process.env.NEXT_URL}/`

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{
            price: priceId,
            quantity: 1
        }],
        success_url: successUrl,
        cancel_url: cancelUrl
    })
    return res.status(201).json({
        checkoutUrl: checkoutSession.url,
    })
}