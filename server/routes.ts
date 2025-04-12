import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRatingSchema, insertSubscriptionSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api
  
  // Special video endpoints (need to come before the /:id endpoint to avoid conflicts)
  // Get featured videos
  app.get("/api/videos/featured", async (req, res) => {
    try {
      const videos = await storage.getFeaturedVideos();
      res.json({ videos });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured videos" });
    }
  });

  // Get trending videos
  app.get("/api/videos/trending", async (req, res) => {
    try {
      const videos = await storage.getTrendingVideos();
      res.json({ videos });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trending videos" });
    }
  });

  // Get most moronic videos
  app.get("/api/videos/most-moronic", async (req, res) => {
    try {
      const videos = await storage.getMostMoronicVideos();
      res.json({ videos });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch most moronic videos" });
    }
  });
  
  // Get videos by category
  app.get("/api/videos/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const videos = await storage.getVideosByCategory(category);
      res.json({ videos });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos by category" });
    }
  });
  
  // Get all videos
  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getVideos();
      res.json({ videos });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  // Get video by ID - needs to come after other specific /api/videos/... routes
  app.get("/api/videos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid video ID" });
      }

      const video = await storage.getVideo(id);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      // Increment view count
      await storage.updateVideoViews(id);
      
      // Get average rating
      const averageRating = await storage.getAverageRating(id);
      
      res.json({ video, averageRating });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video" });
    }
  });

  // Get all creators
  app.get("/api/creators", async (req, res) => {
    try {
      const creators = await storage.getCreators();
      res.json({ creators });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creators" });
    }
  });

  // Get creator by ID
  app.get("/api/creators/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid creator ID" });
      }

      const creator = await storage.getCreator(id);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }

      res.json({ creator });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creator" });
    }
  });

  // Rate a video
  app.post("/api/videos/:id/rate", async (req, res) => {
    try {
      const videoId = parseInt(req.params.id);
      if (isNaN(videoId)) {
        return res.status(400).json({ message: "Invalid video ID" });
      }

      const video = await storage.getVideo(videoId);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      const ratingData = insertRatingSchema.parse({
        ...req.body,
        videoId
      });

      const rating = await storage.createRating(ratingData);
      const averageRating = await storage.getAverageRating(videoId);

      res.status(201).json({ rating, averageRating });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid rating data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to rate video" });
    }
  });

  // Subscribe to newsletter
  app.post("/api/subscribe", async (req, res) => {
    try {
      const subscriptionData = insertSubscriptionSchema.parse(req.body);
      
      // Check if email already exists
      const existingUser = await storage.getUserByEmail(subscriptionData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already subscribed" });
      }

      const subscription = await storage.createSubscription(subscriptionData);
      res.status(201).json({ subscription, message: "Successfully subscribed to newsletter" });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid subscription data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
