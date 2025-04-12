import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

// Videos schema
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url").notNull(),
  duration: text("duration").notNull(),
  category: text("category").notNull(),
  views: integer("views").default(0),
  isFeatured: boolean("is_featured").default(false),
  isTrending: boolean("is_trending").default(false),
  isMostMoronic: boolean("is_most_moronic").default(false),
  rank: integer("rank"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true,
});

// Creators schema
export const creators = pgTable("creators", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  specialty: text("specialty").notNull(),
  followers: integer("followers").default(0),
});

export const insertCreatorSchema = createInsertSchema(creators).omit({
  id: true,
});

// Ratings schema
export const ratings = pgTable("ratings", {
  id: serial("id").primaryKey(),
  videoId: integer("video_id").notNull(),
  userId: integer("user_id"),
  rating: integer("rating").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRatingSchema = createInsertSchema(ratings).omit({
  id: true,
  createdAt: true,
});

// Newsletter subscriptions
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  email: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Video = typeof videos.$inferSelect;
export type InsertVideo = z.infer<typeof insertVideoSchema>;

export type Creator = typeof creators.$inferSelect;
export type InsertCreator = z.infer<typeof insertCreatorSchema>;

export type Rating = typeof ratings.$inferSelect;
export type InsertRating = z.infer<typeof insertRatingSchema>;

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
