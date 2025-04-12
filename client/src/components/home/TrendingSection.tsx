import { useQuery } from "@tanstack/react-query";
import { VideoCard } from "@/components/ui/video-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import type { Video } from "@/lib/types";

export default function TrendingSection() {
  const { toast } = useToast();
  
  const { data: trendingData, isLoading } = useQuery<{ videos: Video[] }>({
    queryKey: ['/api/videos/trending'],
  });
  
  const trendingVideos = trendingData?.videos || [];
  
  const handleLoadMore = () => {
    toast({
      title: "Loading More Shows",
      description: "Just kidding! There's only so much stupidity we can handle at once."
    });
  };

  // Categories to show as program sections
  const programCategories = [
    { label: "PRIMETIME", description: "Our most-watched shows" },
    { label: "REALITY", description: "Reality disconnected from reality" },
    { label: "NEWS", description: "The latest in things that aren't happening" }
  ];

  return (
    <section className="bg-[#F9F7F0] py-12">
      <div className="container mx-auto px-4">
        {/* Section header that mimics broadcast network styling */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#1C304A] mb-2">Popular Shows</h2>
          <p className="text-gray-600">The most-watched programs by viewers with questionable judgment</p>
        </div>
        
        {/* Program categories that scroll horizontally on mobile */}
        <div className="flex flex-wrap gap-6 mb-8">
          {programCategories.map((category, index) => (
            <div key={index} className="flex-1 min-w-[250px] bg-white rounded shadow-md overflow-hidden">
              <div className="bg-[#0A1B31] text-white p-3 flex items-center justify-between">
                <h3 className="font-bold">{category.label}</h3>
                <Link href={`/browse?category=${category.label.toLowerCase()}`}>
                  <div className="text-[#FF4B00] hover:text-white text-sm font-medium flex items-center cursor-pointer">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </Link>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                <div className="bg-[#FF0000] text-white text-xs font-bold rounded px-2 py-1 inline-block">
                  NOW STREAMING
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <h2 className="text-xl font-bold text-[#1C304A] border-b border-gray-300 pb-2 mb-6">
          Trending Shows
        </h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-200 rounded h-64"></div>
            ))}
          </div>
        ) : trendingVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingVideos.map((video) => (
              <VideoCard key={video.id} video={video} className="border-none shadow-md hover:shadow-xl transition-shadow" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded p-8 text-center shadow-md">
            <p className="text-lg text-[#1C304A] font-semibold">
              No trending shows available at the moment.
            </p>
          </div>
        )}
        
        <div className="flex justify-center mt-10">
          <Button 
            variant="default" 
            className="bg-[#0A1B31] hover:bg-[#1C304A] text-white font-semibold px-8 py-3 rounded-full"
            onClick={handleLoadMore}
          >
            Load More Shows
          </Button>
        </div>
      </div>
    </section>
  );
}
