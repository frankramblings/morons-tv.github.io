import { QueryClient } from "@tanstack/react-query";
import { mockApi } from "./mockData";

// Function to route the API request to the appropriate mock data function
export async function staticApiRequest(
  method: string,
  endpoint: string,
  data?: any
): Promise<any> {
  console.log(`[Mock API] ${method} ${endpoint}`, data);
  
  // Handle different API endpoints
  if (endpoint === "/api/videos/featured") {
    const videos = await mockApi.getFeaturedVideos();
    return { videos };
  } 
  else if (endpoint === "/api/videos/trending") {
    const videos = await mockApi.getTrendingVideos();
    return { videos };
  } 
  else if (endpoint === "/api/videos/most-moronic") {
    const videos = await mockApi.getMostMoronicVideos();
    return { videos };
  } 
  else if (endpoint.startsWith("/api/videos/") && !endpoint.includes("most-moronic")) {
    const id = parseInt(endpoint.split("/api/videos/")[1], 10);
    if (!isNaN(id)) {
      const video = await mockApi.getVideo(id);
      return { video };
    }
  } 
  else if (endpoint.startsWith("/api/categories/")) {
    const category = endpoint.split("/api/categories/")[1];
    const videos = await mockApi.getVideosByCategory(category);
    return { videos };
  } 
  else if (endpoint === "/api/creators") {
    const creators = await mockApi.getCreators();
    return { creators };
  } 
  else if (endpoint.startsWith("/api/creators/")) {
    const id = parseInt(endpoint.split("/api/creators/")[1], 10);
    if (!isNaN(id)) {
      const creator = await mockApi.getCreator(id);
      return { creator };
    }
  } 
  else if (endpoint.startsWith("/api/ratings/")) {
    const videoId = parseInt(endpoint.split("/api/ratings/")[1], 10);
    if (!isNaN(videoId)) {
      const ratings = await mockApi.getRatings(videoId);
      return { ratings };
    }
  } 
  else if (endpoint === "/api/subscribe" && method === "POST") {
    if (data && data.email) {
      return await mockApi.createSubscription(data.email);
    }
  }
  
  // Default response for unhandled endpoints
  return { error: "API endpoint not implemented in static version" };
}

// Create a static query client for GitHub Pages
export const staticQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Define query function generator
export const getStaticQueryFn = <T>(options: { on401: "returnNull" | "throw" } = { on401: "throw" }) => {
  return async ({ queryKey }: { queryKey: (string | number)[] }): Promise<T> => {
    const [endpoint, ...params] = queryKey;
    if (typeof endpoint !== 'string') {
      throw new Error('Query key must be a string');
    }
    
    // For simple endpoints, just call the static API directly
    if (!params.length) {
      return staticApiRequest("GET", endpoint) as Promise<T>;
    }
    
    // For endpoints with parameters, construct the full path
    const fullPath = `${endpoint}/${params.join('/')}`;
    return staticApiRequest("GET", fullPath) as Promise<T>;
  };
};