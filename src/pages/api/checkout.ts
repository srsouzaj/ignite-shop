import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { priceId } = req.body;

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed." });
    }

    if (!priceId) {
        return res.status(400).json({ error: 'Price not found.' });
    }

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
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