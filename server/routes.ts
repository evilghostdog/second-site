import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertProductSchema, updateProductSchema } from "@shared/schema";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Simple admin credentials - in production, use proper password hashing
      const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
      
      if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
        return res.status(500).json({ message: 'Admin credentials not configured' });
      }
      
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
        
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
        
        if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
          return res.status(401).json({ message: 'Admin credentials not configured' });
        }
        
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

  // Product management routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching products: " + error.message });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching product: " + error.message });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ message: "Error creating product: " + error.message });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const validatedData = updateProductSchema.parse(req.body);
      const product = await storage.updateProduct(req.params.id, validatedData);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ message: "Error updating product: " + error.message });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProduct(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting product: " + error.message });
    }
  });

  // Stripe payment route for one-time payments
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { items } = req.body;
      
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Items are required" });
      }
      
      // Calculate subtotal from server-side product prices (SECURITY: never trust client amounts)
      let subtotal = 0;
      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(400).json({ message: `Product ${item.productId} not found` });
        }
        if (!product.inStock) {
          return res.status(400).json({ message: `Product ${product.name} is out of stock` });
        }
        const productPrice = parseFloat(product.price);
        const quantity = parseInt(item.quantity) || 1;
        subtotal += productPrice * quantity;
      }
      
      // Calculate shipping based on server-computed subtotal
      const shipping = subtotal >= 50 ? 0 : 8.99;
      const totalAmount = subtotal + shipping;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          items: JSON.stringify(items),
          subtotal: subtotal.toFixed(2),
          shipping: shipping.toFixed(2),
        }
      });
      
      res.json({ 
        clientSecret: paymentIntent.client_secret,
        amount: totalAmount,
        subtotal,
        shipping
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
