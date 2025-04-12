import {
  users, type User, type InsertUser,
  videos, type Video, type InsertVideo,
  creators, type Creator, type InsertCreator,
  ratings, type Rating, type InsertRating,
  subscriptions, type Subscription, type InsertSubscription
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Video operations
  getVideos(): Promise<Video[]>;
  getVideo(id: number): Promise<Video | undefined>;
  getVideosByCategory(category: string): Promise<Video[]>;
  getFeaturedVideos(): Promise<Video[]>;
  getTrendingVideos(): Promise<Video[]>;
  getMostMoronicVideos(): Promise<Video[]>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideoViews(id: number): Promise<Video | undefined>;
  
  // Creator operations
  getCreators(): Promise<Creator[]>;
  getCreator(id: number): Promise<Creator | undefined>;
  createCreator(creator: InsertCreator): Promise<Creator>;
  
  // Rating operations
  getRatings(videoId: number): Promise<Rating[]>;
  createRating(rating: InsertRating): Promise<Rating>;
  getAverageRating(videoId: number): Promise<number>;
  
  // Newsletter subscription
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private videos: Map<number, Video>;
  private creators: Map<number, Creator>;
  private ratings: Map<number, Rating>;
  private subscriptions: Map<number, Subscription>;
  
  currentUserId: number;
  currentVideoId: number;
  currentCreatorId: number;
  currentRatingId: number;
  currentSubscriptionId: number;

  constructor() {
    this.users = new Map();
    this.videos = new Map();
    this.creators = new Map();
    this.ratings = new Map();
    this.subscriptions = new Map();
    
    this.currentUserId = 1;
    this.currentVideoId = 1;
    this.currentCreatorId = 1;
    this.currentRatingId = 1;
    this.currentSubscriptionId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Video operations
  async getVideos(): Promise<Video[]> {
    return Array.from(this.videos.values());
  }

  async getVideo(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async getVideosByCategory(category: string): Promise<Video[]> {
    return Array.from(this.videos.values())
      .filter(video => video.category === category);
  }

  async getFeaturedVideos(): Promise<Video[]> {
    return Array.from(this.videos.values())
      .filter(video => video.isFeatured);
  }

  async getTrendingVideos(): Promise<Video[]> {
    return Array.from(this.videos.values())
      .filter(video => video.isTrending)
      .sort((a, b) => b.views - a.views);
  }

  async getMostMoronicVideos(): Promise<Video[]> {
    return Array.from(this.videos.values())
      .filter(video => video.isMostMoronic)
      .sort((a, b) => (a.rank || 999) - (b.rank || 999));
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = this.currentVideoId++;
    const now = new Date();
    const video: Video = { 
      ...insertVideo, 
      id, 
      createdAt: now 
    };
    this.videos.set(id, video);
    return video;
  }

  async updateVideoViews(id: number): Promise<Video | undefined> {
    const video = await this.getVideo(id);
    if (video) {
      const updatedVideo = { ...video, views: (video.views || 0) + 1 };
      this.videos.set(id, updatedVideo);
      return updatedVideo;
    }
    return undefined;
  }

  // Creator operations
  async getCreators(): Promise<Creator[]> {
    return Array.from(this.creators.values());
  }

  async getCreator(id: number): Promise<Creator | undefined> {
    return this.creators.get(id);
  }

  async createCreator(insertCreator: InsertCreator): Promise<Creator> {
    const id = this.currentCreatorId++;
    const creator: Creator = { ...insertCreator, id };
    this.creators.set(id, creator);
    return creator;
  }

  // Rating operations
  async getRatings(videoId: number): Promise<Rating[]> {
    return Array.from(this.ratings.values())
      .filter(rating => rating.videoId === videoId);
  }

  async createRating(insertRating: InsertRating): Promise<Rating> {
    const id = this.currentRatingId++;
    const now = new Date();
    const rating: Rating = { 
      ...insertRating, 
      id, 
      createdAt: now 
    };
    this.ratings.set(id, rating);
    return rating;
  }

  async getAverageRating(videoId: number): Promise<number> {
    const ratings = await this.getRatings(videoId);
    if (ratings.length === 0) return 0;
    
    const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return Math.round((sum / ratings.length) * 10) / 10;
  }

  // Newsletter subscription
  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const id = this.currentSubscriptionId++;
    const now = new Date();
    const subscription: Subscription = { 
      ...insertSubscription, 
      id, 
      subscribedAt: now 
    };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  // Initialize with sample data
  private initializeData() {
    // Sample videos
    const videoData: InsertVideo[] = [
      {
        title: "Why Drinking Water is a LIBERAL CONSPIRACY!",
        description: "Exposing the truth behind Big Water's agenda to control your mind through hydration.",
        thumbnailUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=450&fit=crop",
        duration: "5:46",
        category: "health",
        views: 1250000,
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
        views: 455000,
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
        views: 789000,
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
        views: 325000,
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
        views: 345000,
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
        views: 1200000,
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
        views: 892000,
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
        views: 678000,
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
        views: 2100000,
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
        views: 532000,
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
        views: 5800000,
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
        views: 4200000,
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
        views: 3900000,
        isFeatured: false,
        isTrending: false,
        isMostMoronic: true,
        rank: 3
      }
    ];

    // Add sample videos
    videoData.forEach(video => {
      const id = this.currentVideoId++;
      const now = new Date();
      const newVideo: Video = { ...video, id, createdAt: now };
      this.videos.set(id, newVideo);
    });

    // Sample creators
    const creatorData: InsertCreator[] = [
      {
        name: "Dr. Finance Bro",
        description: "Dropped out of business school after 2 weeks. Now a crypto millionaire (allegedly).",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop",
        specialty: "FINANCE EXPERT",
        followers: 2400000
      },
      {
        name: "Conspiracy Carol",
        description: "Professional dot-connector. Sees patterns where there are none. Has a tinfoil hat collection.",
        imageUrl: "https://images.unsplash.com/photo-1590649232850-54b5f324069f?w=300&h=300&fit=crop",
        specialty: "TRUTH SEEKER",
        followers: 1800000
      },
      {
        name: "Science Denier Dave",
        description: "Did his own research on YouTube. Questions gravity. Thinks clouds are government drones.",
        imageUrl: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=300&h=300&fit=crop",
        specialty: "FREE THINKER",
        followers: 3200000
      },
      {
        name: "Wellness Wanda",
        description: "Sells miracle cures. Believes diseases are just \"bad vibes.\" Charges $500 for consultations.",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
        specialty: "HEALTH GURU",
        followers: 4700000
      }
    ];

    // Add sample creators
    creatorData.forEach(creator => {
      const id = this.currentCreatorId++;
      const newCreator: Creator = { ...creator, id };
      this.creators.set(id, newCreator);
    });
  }
}

export const storage = new MemStorage();
