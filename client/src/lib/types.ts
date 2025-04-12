export interface Video {
  id: number;
  title: string;
  description?: string;
  thumbnailUrl: string;
  duration: string;
  category: string;
  views: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isMostMoronic?: boolean;
  rank?: number;
  rating?: number;
  createdAt?: string;
}

export interface Creator {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  specialty: string;
  followers: number;
}

export interface Rating {
  id: number;
  videoId: number;
  userId?: number | null;
  rating: number;
  createdAt?: string;
}

export interface Subscription {
  id: number;
  email: string;
  subscribedAt?: string;
}
