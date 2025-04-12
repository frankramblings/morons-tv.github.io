import { useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { VideoCardSmall } from "@/components/ui/video-card";
import { BrainRating } from "@/components/ui/brain-rating";
import { Button } from "@/components/ui/button";
import { Share, Play, SkipBack, SkipForward, Volume2, Maximize2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { BreakingTakesMarquee } from "@/components/ui/marquee";
import { BREAKING_TAKES } from "@/lib/constants";

export default function Video() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [userRating, setUserRating] = useState<number>(0);
  
  const { data: videoData, isLoading } = useQuery({
    queryKey: [`/api/videos/${id}`],
  });
  
  const { data: trendingData, isLoading: trendingLoading } = useQuery({
    queryKey: ['/api/videos/trending'],
  });
  
  const ratingMutation = useMutation({
    mutationFn: (rating: number) => 
      apiRequest('POST', `/api/videos/${id}/rate`, { rating, userId: null }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/videos/${id}`] });
      toast({
        title: "Rating Submitted",
        description: `You've rated this content ${userRating}/5 on the moronic scale!`,
      });
    },
    onError: () => {
      toast({
        title: "Rating Failed",
        description: "Could not submit your rating at this time.",
        variant: "destructive",
      });
    }
  });

  const handleRating = (rating: number) => {
    setUserRating(rating);
    ratingMutation.mutate(rating);
  };

  const handleShare = () => {
    toast({
      title: "Shared Successfully",
      description: "Now your friends will know you watch moronic content too!",
    });
  };
  
  const video = videoData?.video;
  const averageRating = videoData?.averageRating || 0;
  const relatedVideos = trendingData?.videos?.slice(0, 3) || [];

  return (
    <>
      <BreakingTakesMarquee items={BREAKING_TAKES} />
      
      <section className="bg-[#F9F7F0] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              {isLoading ? (
                <div className="animate-pulse bg-gray-200 rounded-lg w-full aspect-video"></div>
              ) : video ? (
                <div className="video-player bg-black rounded-lg overflow-hidden border-5 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.5)]">
                  <div className="aspect-video relative">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="bg-[#FF0000] text-white rounded-full w-20 h-20 flex items-center justify-center border-2 border-white hover:bg-[#FF4B00] transition-colors">
                        <Play className="h-10 w-10" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-[#1C304A] p-4 border-t-3 border-black video-controls">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        <button className="text-white hover:text-[#FFD600]">
                          <Play className="h-6 w-6" />
                        </button>
                        <button className="text-white hover:text-[#FFD600]">
                          <SkipBack className="h-6 w-6" />
                        </button>
                        <button className="text-white hover:text-[#FFD600]">
                          <SkipForward className="h-6 w-6" />
                        </button>
                        <button className="text-white hover:text-[#FFD600]">
                          <Volume2 className="h-6 w-6" />
                        </button>
                        <div className="text-white text-sm">
                          0:00 / {video.duration}
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="text-white hover:text-[#FFD600]">
                          <Settings className="h-6 w-6" />
                        </button>
                        <button className="text-white hover:text-[#FFD600]">
                          <Maximize2 className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#FF0000] h-full w-[5%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center border-2 border-black">
                  <p className="text-lg font-['Bangers'] text-[#1C304A]">
                    VIDEO NOT FOUND! EVEN WE COULDN'T HANDLE THIS LEVEL OF STUPIDITY.
                  </p>
                </div>
              )}
              
              {!isLoading && video && (
                <div className="mt-6">
                  <h1 className="font-['Bangers'] text-3xl text-[#1C304A] mb-2">{video.title}</h1>
                  {video.description && (
                    <p className="text-gray-700 mb-4">{video.description}</p>
                  )}
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border-2 border-black">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-sm font-medium mb-1">Community Rating:</div>
                        <BrainRating rating={Math.round(averageRating)} readOnly withLabel />
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Your Rating:</div>
                      <BrainRating 
                        rating={userRating} 
                        onChange={handleRating}
                        withLabel
                      />
                    </div>
                    
                    <Button 
                      variant="default" 
                      className="bg-[#FF4B00] text-white px-4 py-2 rounded-full hover:bg-[#1C304A]"
                      onClick={handleShare}
                    >
                      <Share className="h-4 w-4 mr-2" /> Share This Genius
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-[#1C304A] p-4 rounded-lg border-2 border-black">
                <h3 className="font-['Bangers'] text-2xl text-white mb-4">MORE "GENIUS" CONTENT</h3>
                
                <div className="space-y-4">
                  {trendingLoading ? (
                    Array(3).fill(0).map((_, i) => (
                      <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-24"></div>
                    ))
                  ) : relatedVideos.length > 0 ? (
                    relatedVideos.map((video) => (
                      <VideoCardSmall 
                        key={video.id} 
                        video={video} 
                        className="bg-[#F9F7F0]" 
                      />
                    ))
                  ) : (
                    <div className="bg-white rounded-lg p-4 text-center">
                      <p className="text-[#1C304A] font-['Bangers']">
                        NO RELATED CONTENT FOUND!
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 bg-[#FFD600] p-4 rounded-lg border-2 border-black">
                  <h3 className="font-['Bangers'] text-xl text-[#1C304A] mb-2">MORONIC INSIGHT:</h3>
                  <p className="text-black text-sm">
                    If you enjoyed this video, our algorithm suggests you might benefit from 
                    professional help. Just kidding! (But seriously, consider it.)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
