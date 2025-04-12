// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  videos;
  creators;
  ratings;
  subscriptions;
  currentUserId;
  currentVideoId;
  currentCreatorId;
  currentRatingId;
  currentSubscriptionId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.videos = /* @__PURE__ */ new Map();
    this.creators = /* @__PURE__ */ new Map();
    this.ratings = /* @__PURE__ */ new Map();
    this.subscriptions = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentVideoId = 1;
    this.currentCreatorId = 1;
    this.currentRatingId = 1;
    this.currentSubscriptionId = 1;
    this.initializeData();
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Video operations
  async getVideos() {
    return Array.from(this.videos.values());
  }
  async getVideo(id) {
    return this.videos.get(id);
  }
  async getVideosByCategory(category) {
    return Array.from(this.videos.values()).filter((video) => video.category === category);
  }
  async getFeaturedVideos() {
    return Array.from(this.videos.values()).filter((video) => video.isFeatured);
  }
  async getTrendingVideos() {
    return Array.from(this.videos.values()).filter((video) => video.isTrending).sort((a, b) => b.views - a.views);
  }
  async getMostMoronicVideos() {
    return Array.from(this.videos.values()).filter((video) => video.isMostMoronic).sort((a, b) => (a.rank || 999) - (b.rank || 999));
  }
  async createVideo(insertVideo) {
    const id = this.currentVideoId++;
    const now = /* @__PURE__ */ new Date();
    const video = {
      ...insertVideo,
      id,
      createdAt: now
    };
    this.videos.set(id, video);
    return video;
  }
  async updateVideoViews(id) {
    const video = await this.getVideo(id);
    if (video) {
      const updatedVideo = { ...video, views: (video.views || 0) + 1 };
      this.videos.set(id, updatedVideo);
      return updatedVideo;
    }
    return void 0;
  }
  // Creator operations
  async getCreators() {
    return Array.from(this.creators.values());
  }
  async getCreator(id) {
    return this.creators.get(id);
  }
  async createCreator(insertCreator) {
    const id = this.currentCreatorId++;
    const creator = { ...insertCreator, id };
    this.creators.set(id, creator);
    return creator;
  }
  // Rating operations
  async getRatings(videoId) {
    return Array.from(this.ratings.values()).filter((rating) => rating.videoId === videoId);
  }
  async createRating(insertRating) {
    const id = this.currentRatingId++;
    const now = /* @__PURE__ */ new Date();
    const rating = {
      ...insertRating,
      id,
      createdAt: now
    };
    this.ratings.set(id, rating);
    return rating;
  }
  async getAverageRating(videoId) {
    const ratings2 = await this.getRatings(videoId);
    if (ratings2.length === 0) return 0;
    const sum = ratings2.reduce((acc, curr) => acc + curr.rating, 0);
    return Math.round(sum / ratings2.length * 10) / 10;
  }
  // Newsletter subscription
  async createSubscription(insertSubscription) {
    const id = this.currentSubscriptionId++;
    const now = /* @__PURE__ */ new Date();
    const subscription = {
      ...insertSubscription,
      id,
      subscribedAt: now
    };
    this.subscriptions.set(id, subscription);
    return subscription;
  }
  // Initialize with sample data
  initializeData() {
    const videoData = [
      {
        title: "Why Drinking Water is a LIBERAL CONSPIRACY!",
        description: "Exposing the truth behind Big Water's agenda to control your mind through hydration.",
        thumbnailUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=450&fit=crop",
        duration: "5:46",
        category: "health",
        views: 125e4,
        isFeatured: true,
        isTrending: false,
        isMostMoronic: false
      },
      {
        title: "My Cat Understands Economics Better Than You!",
        description: "Mr. Whiskers shares his insights on cryptocurrency and fiscal policy.",
        thumbnailUrl: "https://images.unsplash.com/photo-1583908701673-4cb5f290b548?w=150&h=100&fit=crop",
        duration: "8:32",
        category: "finance",
        views: 455e3,
        isFeatured: true,
        isTrending: false,
        isMostMoronic: false
      },
      {
        title: "Why I Haven't Showered in 6 Months: A Wellness Journey",
        description: "Embracing your natural musk is the key to spiritual enlightenment.",
        thumbnailUrl: "https://images.unsplash.com/photo-1513682322455-ea8b2d81d418?w=150&h=100&fit=crop",
        duration: "10:45",
        category: "health",
        views: 789e3,
        isFeatured: true,
        isTrending: false,
        isMostMoronic: false
      },
      {
        title: "Running Actually DESTROYS Your Body: A Couch Expert Explains",
        description: "Why exercise is a scam and how remaining stationary is the true path to health.",
        thumbnailUrl: "https://images.unsplash.com/photo-1501447748741-aca2be65f92c?w=150&h=100&fit=crop",
        duration: "7:18",
        category: "health",
        views: 325e3,
        isFeatured: true,
        isTrending: false,
        isMostMoronic: false
      },
      {
        title: "Why Flat Earth Theory Makes Perfect Sense (Trust Me, I'm an Instagram Expert)",
        description: "Irrefutable evidence gathered from memes and conspiracy forums.",
        thumbnailUrl: "https://images.unsplash.com/photo-1503551723145-6c040742065b-v2?w=400&h=225&fit=crop",
        duration: "12:34",
        category: "science",
        views: 345e3,
        isFeatured: false,
        isTrending: true,
        isMostMoronic: false
      },
      {
        title: "I Became a Finance Expert by Watching TikToks for 3 Days",
        description: "How 15-second videos made me a Wall Street genius overnight.",
        thumbnailUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=225&fit=crop",
        duration: "8:52",
        category: "finance",
        views: 12e5,
        isFeatured: false,
        isTrending: true,
        isMostMoronic: false
      },
      {
        title: "Why 5G Towers Are Actually Mind-Control Devices (I Did My Own Research)",
        description: "The sinister truth behind your faster internet connection.",
        thumbnailUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=225&fit=crop",
        duration: "16:05",
        category: "tech",
        views: 892e3,
        isFeatured: false,
        isTrending: true,
        isMostMoronic: false
      },
      {
        title: "The Secret Health Benefits of NEVER Exercising (Big Fitness Doesn't Want You to Know!)",
        description: "Why the couch is your true fitness partner.",
        thumbnailUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=225&fit=crop",
        duration: "7:12",
        category: "health",
        views: 678e3,
        isFeatured: false,
        isTrending: true,
        isMostMoronic: false
      },
      {
        title: "Why My Essential Oil Business Is Better Than Medical School",
        description: "Skip the student loans and go straight to healing with these magic bottles!",
        thumbnailUrl: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=400&h=225&fit=crop",
        duration: "10:22",
        category: "health",
        views: 21e5,
        isFeatured: false,
        isTrending: true,
        isMostMoronic: false
      },
      {
        title: "I Quit My Job to Invest in NFTs: A Success Story (Please Send Money)",
        description: "How digital pictures of monkeys ruined my life but I'm still calling it a win!",
        thumbnailUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=225&fit=crop",
        duration: "14:42",
        category: "finance",
        views: 532e3,
        isFeatured: false,
        isTrending: true,
        isMostMoronic: false
      },
      {
        title: "I Replaced All Medicines With Energy Crystals: What Happened Next Will Shock You!",
        description: "Spoiler: I'm recording this from a hospital bed.",
        thumbnailUrl: "https://images.unsplash.com/photo-1567364300385-a9c0013e1daf?w=400&h=225&fit=crop",
        duration: "18:27",
        category: "health",
        views: 58e5,
        isFeatured: false,
        isTrending: false,
        isMostMoronic: true,
        rank: 1
      },
      {
        title: "Why I've Never Paid Taxes and Neither Should You (DISCLAIMER: I'm Currently in Prison)",
        description: "The government hates this one weird trick!",
        thumbnailUrl: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400&h=225&fit=crop",
        duration: "21:08",
        category: "finance",
        views: 42e5,
        isFeatured: false,
        isTrending: false,
        isMostMoronic: true,
        rank: 2
      },
      {
        title: "I Started a Business Selling Air in Jars: My Journey to Almost Being a Millionaire",
        description: "Premium oxygen from exotic locations, now available in installments!",
        thumbnailUrl: "https://images.unsplash.com/photo-1541560052-5e137f229371?w=400&h=225&fit=crop",
        duration: "15:45",
        category: "finance",
        views: 39e5,
        isFeatured: false,
        isTrending: false,
        isMostMoronic: true,
        rank: 3
      }
    ];
    videoData.forEach((video) => {
      const id = this.currentVideoId++;
      const now = /* @__PURE__ */ new Date();
      const newVideo = { ...video, id, createdAt: now };
      this.videos.set(id, newVideo);
    });
    const creatorData = [
      {
        name: "Dr. Finance Bro",
        description: "Dropped out of business school after 2 weeks. Now a crypto millionaire (allegedly).",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop",
        specialty: "FINANCE EXPERT",
        followers: 24e5
      },
      {
        name: "Conspiracy Carol",
        description: "Professional dot-connector. Sees patterns where there are none. Has a tinfoil hat collection.",
        imageUrl: "https://images.unsplash.com/photo-1590649232850-54b5f324069f?w=300&h=300&fit=crop",
        specialty: "TRUTH SEEKER",
        followers: 18e5
      },
      {
        name: "Science Denier Dave",
        description: "Did his own research on YouTube. Questions gravity. Thinks clouds are government drones.",
        imageUrl: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=300&h=300&fit=crop",
        specialty: "FREE THINKER",
        followers: 32e5
      },
      {
        name: "Wellness Wanda",
        description: 'Sells miracle cures. Believes diseases are just "bad vibes." Charges $500 for consultations.',
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
        specialty: "HEALTH GURU",
        followers: 47e5
      }
    ];
    creatorData.forEach((creator) => {
      const id = this.currentCreatorId++;
      const newCreator = { ...creator, id };
      this.creators.set(id, newCreator);
    });
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true
});
var videos = pgTable("videos", {
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
  createdAt: timestamp("created_at").defaultNow()
});
var insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true
});
var creators = pgTable("creators", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  specialty: text("specialty").notNull(),
  followers: integer("followers").default(0)
});
var insertCreatorSchema = createInsertSchema(creators).omit({
  id: true
});
var ratings = pgTable("ratings", {
  id: serial("id").primaryKey(),
  videoId: integer("video_id").notNull(),
  userId: integer("user_id"),
  rating: integer("rating").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertRatingSchema = createInsertSchema(ratings).omit({
  id: true,
  createdAt: true
});
var subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow()
});
var insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  email: true
});

// server/routes.ts
import { ZodError } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/videos/featured", async (req, res) => {
    try {
      const videos2 = await storage.getFeaturedVideos();
      res.json({ videos: videos2 });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured videos" });
    }
  });
  app2.get("/api/videos/trending", async (req, res) => {
    try {
      const videos2 = await storage.getTrendingVideos();
      res.json({ videos: videos2 });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trending videos" });
    }
  });
  app2.get("/api/videos/most-moronic", async (req, res) => {
    try {
      const videos2 = await storage.getMostMoronicVideos();
      res.json({ videos: videos2 });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch most moronic videos" });
    }
  });
  app2.get("/api/videos/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const videos2 = await storage.getVideosByCategory(category);
      res.json({ videos: videos2 });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos by category" });
    }
  });
  app2.get("/api/videos", async (req, res) => {
    try {
      const videos2 = await storage.getVideos();
      res.json({ videos: videos2 });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });
  app2.get("/api/videos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid video ID" });
      }
      const video = await storage.getVideo(id);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      await storage.updateVideoViews(id);
      const averageRating = await storage.getAverageRating(id);
      res.json({ video, averageRating });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video" });
    }
  });
  app2.get("/api/creators", async (req, res) => {
    try {
      const creators2 = await storage.getCreators();
      res.json({ creators: creators2 });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creators" });
    }
  });
  app2.get("/api/creators/:id", async (req, res) => {
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
  app2.post("/api/videos/:id/rate", async (req, res) => {
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
  app2.post("/api/subscribe", async (req, res) => {
    try {
      const subscriptionData = insertSubscriptionSchema.parse(req.body);
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
