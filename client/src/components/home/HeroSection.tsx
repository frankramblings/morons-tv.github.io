import { useQuery } from "@tanstack/react-query";
import { VideoCardFeatured, VideoCardSmall } from "@/components/ui/video-card";
import { BrainRating } from "@/components/ui/brain-rating";
import { Button } from "@/components/ui/button";
import { Share, Plus, PlayCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { Link } from "wouter";
import type { Video } from "@/lib/types";

export default function HeroSection() {
  const { toast } = useToast();
  const [currentRating, setCurrentRating] = useState(1);
  
  const { data: featuredData, isLoading: featuredLoading } = useQuery<{ videos: Video[] }>({
    queryKey: ['/api/videos/featured'],
  });

  const handleRating = async (rating: number) => {
    setCurrentRating(rating);
    try {
      if (featuredData?.videos?.[0]) {
        await apiRequest('POST', `/api/videos/${featuredData.videos[0].id}/rate`, {
          rating,
          userId: null // Anonymous rating
        });
        
        toast({
          title: "Rating Submitted",
          description: `You've rated this content ${rating}/5 on the moronic scale!`,
        });
      }
    } catch (error) {
      toast({
        title: "Rating Failed",
        description: "Could not submit your rating at this time.",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    toast({
      title: "Shared Successfully",
      description: "Now your friends will know you watch moronic content too!",
    });
  };

  const handleSave = () => {
    toast({
      title: "Saved to Watchlist",
      description: "Added to your collection of moronic content.",
    });
  };

  const featuredVideo = featuredData?.videos?.[0];
  const recommendedVideos = featuredData?.videos?.slice(1);

  // Prominent feature tag that mimics broadcast networks
  const FeatureTag = ({ text }: { text: string }) => (
    <div className="bg-[#FF0000] text-white font-semibold text-sm px-3 py-1 rounded-sm inline-flex items-center">
      {text}
    </div>
  );

  return (
    <section className="bg-gradient-to-b from-[#0A1B31] to-[#1C304A] py-8">
      <div className="container mx-auto px-4">
        {/* Featured Content Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FeatureTag text="FEATURED" />
            <span className="ml-3 text-white font-semibold">TONIGHT'S HIGHLIGHTS</span>
          </div>
          <Link href="/browse">
            <div className="text-[#FF4B00] hover:text-white text-sm font-semibold cursor-pointer">View All</div>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Featured Video Player */}
          <div className="md:w-2/3">
            {featuredLoading ? (
              <div className="animate-pulse bg-gray-800 rounded w-full aspect-video"></div>
            ) : featuredVideo ? (
              <>
                <div className="relative group overflow-hidden rounded">
                  <VideoCardFeatured video={featuredVideo} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center mb-2">
                      <FeatureTag text="PREMIERE" />
                      <span className="text-white text-sm ml-2">NEW EPISODE TONIGHT</span>
                    </div>
                    <h2 className="text-white text-2xl font-bold mb-1">{featuredVideo.title}</h2>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                      {featuredVideo.description || "The latest installment in our moronic content series that challenges your intelligence and common sense."}
                    </p>
                    <div className="flex items-center space-x-4">
                      <Button 
                        className="bg-[#FF0000] hover:bg-[#E60000] text-white rounded-full"
                      >
                        <PlayCircle className="h-5 w-5 mr-2" /> Watch Now
                      </Button>
                      <Button variant="outline" className="text-white border-white hover:bg-white/20 rounded-full" onClick={handleSave}>
                        <Plus className="h-4 w-4 mr-2" /> Add to Watchlist
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-[#0A1B31] p-4 rounded flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="text-gray-400 h-4 w-4 mr-2" />
                    <span className="text-gray-300 text-sm">Airs tonight at 8/7c</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-300 text-sm mr-2">Moronic Rating:</span>
                    <BrainRating 
                      rating={currentRating} 
                      onChange={handleRating} 
                      size="md" 
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gray-800 rounded p-8 text-center">
                <p className="text-gray-400">No featured content available</p>
              </div>
            )}
          </div>
          
          {/* Right Sidebar */}
          <div className="md:w-1/3">
            <div className="bg-[#0A1B31] p-4 rounded border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">COMING UP NEXT</h3>
                <span className="text-[#FF4B00] text-sm font-semibold">FULL SCHEDULE</span>
              </div>
              
              <div className="space-y-4">
                {featuredLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-800 rounded h-24"></div>
                  ))
                ) : recommendedVideos && recommendedVideos.length > 0 ? (
                  recommendedVideos.map((video, index) => (
                    <div key={video.id} className="relative">
                      <VideoCardSmall video={video} className="bg-[#1C304A] border border-gray-700" />
                      <div className="absolute top-0 left-0 bg-[#FF0000] text-white text-xs font-bold px-2 py-1">
                        {index === 0 ? 'TONIGHT 8PM' : index === 1 ? 'TOMORROW 9PM' : 'THURSDAY 8PM'}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-800 rounded p-4 text-center">
                    <p className="text-gray-400">No upcoming shows</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 bg-[#FF0000] p-4 rounded text-center">
              <h3 className="text-white font-bold mb-2">SUBSCRIBE NOW</h3>
              <p className="text-white text-sm mb-4">Get unlimited access to the most moronic content on the planet!</p>
              <Button 
                variant="default" 
                className="bg-white text-[#FF0000] hover:bg-gray-200 font-bold rounded-full"
              >
                START FREE TRIAL
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
