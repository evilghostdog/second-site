import { pgTable, text, serial, integer, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image").notNull(),
  flavors: text("flavors").array().notNull(),
  gradient: text("gradient").notNull(),
  inStock: boolean("in_stock").notNull().default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Create proper Zod schema with robust number validation for price
export const insertProductSchema = createInsertSchema(products).omit({}).extend({
  price: z.coerce.number()
    .finite()
    .nonnegative({ message: "Price must be a positive number" })
    .max(1_000_000, { message: "Price cannot exceed $1,000,000" })
    .transform(n => n.toFixed(2))
});
export const updateProductSchema = insertProductSchema.partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
export type Product = typeof products.$inferSelect;
