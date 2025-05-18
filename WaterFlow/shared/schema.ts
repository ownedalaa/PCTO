import { pgTable, text, serial, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const waterUsage = pgTable("water_usage", {
  id: serial("id").primaryKey(),
  value: numeric("value").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWaterUsageSchema = createInsertSchema(waterUsage).pick({
  value: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertWaterUsage = z.infer<typeof insertWaterUsageSchema>;
export type WaterUsage = typeof waterUsage.$inferSelect;

// Client-side types
export interface WaterData {
  value: number;
  timestamp: string;
  location?: string; // 'B' for bathroom, 'K' for kitchen, 'L' for laundry, 'O' for other
}
