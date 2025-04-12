import { Video, Creator, Rating, Subscription } from "./types";

// Mock Videos data
export const mockVideos: Video[] = [
  {
    id: 1,
    title: "Why Drinking Water is a LIBERAL CONSPIRACY!",
    description: "The truth about hydration they don't want you to know.",
    thumbnailUrl: "https://placehold.co/600x400/FF4B00/FFFFFF?text=Liberal+Water+Conspiracy",
    duration: "14:32",
    category: "CONSPIRACY",
    views: 541287,
    isFeatured: true,
    createdAt: "2023-09-12",
    rating: 4.2
  },
  {
    id: 2,
    title: "My Cat Understands Economics Better Than The Fed Chairman",
    description: "Mr. Whiskers explains monetary policy while licking himself.",
    thumbnailUrl: "https://placehold.co/600x400/1C304A/FFFFFF?text=Cat+Economics",
    duration: "22:15",
    category: "FINANCE",
    views: 328977,
    isTrending: true,
    createdAt: "2023-10-05",
    rating: 3.8
  },
  {
    id: 3,
    title: "I Replaced All My Meals with Dirt and Feel AMAZING",
    description: "Nature's perfect superfood has zero calories and it's FREE!",
    thumbnailUrl: "https://placehold.co/600x400/FF0000/FFFFFF?text=Dirt+Diet",
    duration: "18:45",
    category: "HEALTH",
    views: 892364,
    isMostMoronic: true,
    rank: 1,
    createdAt: "2023-11-20",
    rating: 2.1
  },
  {
    id: 4,
    title: "5G Towers Are Making My Plants Vote Republican",
    description: "My ficus tree now watches Fox News all day. Coincidence?",
    thumbnailUrl: "https://placehold.co/600x400/FFD600/1C304A?text=5G+Plant+Politics",
    duration: "25:18",
    category: "CONSPIRACY",
    views: 423112,
    isMostMoronic: true,
    rank: 2,
    createdAt: "2023-08-30",
    rating: 1.9
  },
  {
    id: 5,
    title: "I Quit My Job to Invest in NFTs: A Success Story",
    description: "How I turned my life savings into digital pictures of monkeys.",
    thumbnailUrl: "https://placehold.co/600x400/0A1B31/FFFFFF?text=NFT+Success",
    duration: "31:42",
    category: "FINANCE",
    views: 752498,
    isMostMoronic: true,
    rank: 3,
    createdAt: "2023-07-15",
    rating: 2.4
  },
  {
    id: 6,
    title: "The Moon Landing Was Fake Because The Moon Doesn't Exist",
    description: "Think about it: have you ever TOUCHED the moon?",
    thumbnailUrl: "https://placehold.co/600x400/FF4B00/FFFFFF?text=Moon+Truther",
    duration: "42:18",
    category: "CONSPIRACY",
    views: 628741,
    isTrending: true,
    createdAt: "2023-12-01",
    rating: 1.5
  },
  {
    id: 7,
    title: "Why My Essential Oils Business Makes Me Basically A Doctor",
    description: "Hospitals HATE this woman who cures diseases with smells!",
    thumbnailUrl: "https://placehold.co/600x400/FFD600/1C304A?text=Oil+Doctor",
    duration: "16:25",
    category: "HEALTH",
    views: 983125,
    isTrending: true,
    createdAt: "2023-11-08",
    rating: 1.8
  },
  {
    id: 8,
    title: "How I Made $1 Million by Sending Money to a Nigerian Prince",
    description: "The investment opportunity of a lifetime came in my spam folder.",
    thumbnailUrl: "https://placehold.co/600x400/FF0000/FFFFFF?text=Nigerian+Prince",
    duration: "28:37",
    category: "FINANCE",
    views: 845632,
    isFeatured: true,
    createdAt: "2023-10-22",
    rating: 2.2
  }
];

// Mock Creators data
export const mockCreators: Creator[] = [
  {
    id: 1,
    name: "Dr. Finance Bro",
    description: "Self-proclaimed finance guru who predicted 47 of the last 2 market crashes.",
    imageUrl: "https://placehold.co/400x400/1C304A/FFFFFF?text=Finance+Bro",
    specialty: "FINANCE EXPERT",
    followers: 1235000
  },
  {
    id: 2,
    name: "Conspiracy Karen",
    description: "Researches global conspiracies using Facebook and a strong intuition.",
    imageUrl: "https://placehold.co/400x400/FF0000/FFFFFF?text=Karen",
    specialty: "TRUTH SEEKER",
    followers: 896400
  },
  {
    id: 3,
    name: "Health Guru Greg",
    description: "Discovered that vegetables are a hoax perpetuated by Big Agriculture.",
    imageUrl: "https://placehold.co/400x400/FFD600/1C304A?text=Health+Guru",
    specialty: "HEALTH GURU",
    followers: 735200
  },
  {
    id: 4,
    name: "Political Pam",
    description: "Expert at forming opinions without reading past headlines.",
    imageUrl: "https://placehold.co/400x400/FF4B00/FFFFFF?text=Political",
    specialty: "FREE THINKER",
    followers: 582300
  }
];

// Mock Ratings data
export const mockRatings: Rating[] = [
  { id: 1, videoId: 1, rating: 4.2, createdAt: "2023-09-20" },
  { id: 2, videoId: 2, rating: 3.8, createdAt: "2023-10-15" },
  { id: 3, videoId: 3, rating: 2.1, createdAt: "2023-11-28" },
  { id: 4, videoId: 4, rating: 1.9, createdAt: "2023-09-05" },
  { id: 5, videoId: 5, rating: 2.4, createdAt: "2023-08-10" },
  { id: 6, videoId: 6, rating: 1.5, createdAt: "2023-12-05" },
  { id: 7, videoId: 7, rating: 1.8, createdAt: "2023-11-12" },
  { id: 8, videoId: 8, rating: 2.2, createdAt: "2023-10-30" }
];

// Mock API functions that mimic the backend
export const mockApi = {
  // Video operations
  getVideos: (): Promise<Video[]> => {
    return Promise.resolve(mockVideos);
  },
  getVideo: (id: number): Promise<Video | undefined> => {
    return Promise.resolve(mockVideos.find(v => v.id === id));
  },
  getVideosByCategory: (category: string): Promise<Video[]> => {
    return Promise.resolve(mockVideos.filter(v => v.category === category));
  },
  getFeaturedVideos: (): Promise<Video[]> => {
    return Promise.resolve(mockVideos.filter(v => v.isFeatured));
  },
  getTrendingVideos: (): Promise<Video[]> => {
    return Promise.resolve(mockVideos.filter(v => v.isTrending));
  },
  getMostMoronicVideos: (): Promise<Video[]> => {
    return Promise.resolve(mockVideos.filter(v => v.isMostMoronic)
      .sort((a, b) => (a.rank || 99) - (b.rank || 99)));
  },
  
  // Creator operations
  getCreators: (): Promise<Creator[]> => {
    return Promise.resolve(mockCreators);
  },
  getCreator: (id: number): Promise<Creator | undefined> => {
    return Promise.resolve(mockCreators.find(c => c.id === id));
  },
  
  // Rating operations
  getRatings: (videoId: number): Promise<Rating[]> => {
    return Promise.resolve(mockRatings.filter(r => r.videoId === videoId));
  },
  getAverageRating: (videoId: number): Promise<number> => {
    const videoRatings = mockRatings.filter(r => r.videoId === videoId);
    if (videoRatings.length === 0) return Promise.resolve(0);
    const sum = videoRatings.reduce((acc, curr) => acc + curr.rating, 0);
    return Promise.resolve(sum / videoRatings.length);
  },
  
  // Newsletter subscription (mock implementation)
  createSubscription: (email: string): Promise<{ success: boolean }> => {
    console.log(`Mock subscription created for: ${email}`);
    return Promise.resolve({ success: true });
  }
};