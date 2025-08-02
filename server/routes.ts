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
  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Simple admin credentials - in production, use proper password hashing
      const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'nava2025';
      
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Generate a simple JWT-like token (in production, use proper JWT library)
        const token = Buffer.from(`${username}:${password}:${Date.now()}`).toString('base64');
        res.json({ token, message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error: any) {
      res.status(500).json({ message: 'Login failed: ' + error.message });
    }
  });

  app.get("/api/admin/verify", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const token = authHeader.substring(7);
      
      try {
        // Decode and verify token (simple implementation)
        const decoded = Buffer.from(token, 'base64').toString();
        const [username, password, timestamp] = decoded.split(':');
        
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'nava2025';
        
        // Check if token is valid and not expired (24 hours)
        const tokenAge = Date.now() - parseInt(timestamp);
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD && tokenAge < 24 * 60 * 60 * 1000) {
          res.json({ valid: true });
        } else {
          res.status(401).json({ message: 'Invalid or expired token' });
        }
      } catch (decodeError) {
        res.status(401).json({ message: 'Invalid token format' });
      }
    } catch (error: any) {
      res.status(500).json({ message: 'Token verification failed: ' + error.message });
    }
  });

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
