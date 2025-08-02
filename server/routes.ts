import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Stripe payment route for one-time payments
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, items } = req.body;
      
      // Calculate shipping
      const shipping = amount >= 50 ? 0 : 8.99;
      const totalAmount = amount + shipping;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          items: JSON.stringify(items),
          subtotal: amount.toString(),
          shipping: shipping.toString(),
        }
      });
      
      res.json({ 
        clientSecret: paymentIntent.client_secret,
        amount: totalAmount 
      });
    } catch (error: any) {
      console.error('Stripe payment intent creation error:', error);
      res
        .status(500)
        .json({ message: "Error creating payment intent: " + error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
