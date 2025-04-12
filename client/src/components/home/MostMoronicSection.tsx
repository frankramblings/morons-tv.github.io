import { useQuery } from "@tanstack/react-query";
import { VideoCard } from "@/components/ui/video-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Trophy, Star, TrendingUp } from "lucide-react";
import type { Video } from "@/lib/types";

export default function MostMoronicSection() {
  const { data: moronicData, isLoading } = useQuery<{ videos: Video[] }>({
    queryKey: ['/api/videos/most-moronic'],
  });
  
  const moronicVideos = moronicData?.videos || [];

  return (
    <section className="bg-[#0A1B31] py-12 text-white">
      <div className="container mx-auto px-4">
        {/* Award-style header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <Trophy className="text-[#FFD600] h-8 w-8 mr-2" />
            <h2 className="text-3xl font-bold">VIEWER'S CHOICE AWARDS</h2>
            <Trophy className="text-[#FFD600] h-8 w-8 ml-2" />
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            The most acclaimed shows according to our viewers with questionable critical thinking skills
          </p>
        </div>
        
        {/* Award categories tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[#1C304A] rounded-full overflow-hidden">
            <Button variant="ghost" className="text-white bg-[#FF4B00] hover:bg-[#FF4B00] rounded-full px-6">
              <Trophy className="h-4 w-4 mr-2" /> Most Moronic
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-[#1C304A]/80 rounded-full px-6">
              <Star className="h-4 w-4 mr-2" /> Fan Favorites
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-[#1C304A]/80 rounded-full px-6">
              <TrendingUp className="h-4 w-4 mr-2" /> Rising Stars
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse bg-[#1C304A] rounded h-64"></div>
            ))}
          </div>
        ) : moronicVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {moronicVideos.map((video, index) => (
              <div key={video.id} className="relative">
                <div className="absolute -top-4 -left-4 z-10 w-12 h-12 rounded-full bg-[#FF0000] border-2 border-white flex items-center justify-center text-xl font-bold">
                  #{index + 1}
                </div>
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  index={index} 
                  variant="ranked" 
                  className="transform hover:scale-105 transition-transform shadow-lg" 
                />
                {index === 0 && (
                  <div className="absolute -top-2 -right-2 bg-[#FFD600] text-[#1C304A] px-3 py-1 rounded-full text-sm font-bold transform rotate-12">
                    VIEWERS' CHOICE
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1C304A] rounded p-8 text-center shadow-lg">
            <p className="text-lg text-white font-semibold">
              Award nominees are currently being evaluated. Check back soon!
            </p>
          </div>
        )}
        
        <div className="text-center mt-10">
          <Link href="/most-moronic">
            <div className="inline-block cursor-pointer">
              <Button 
                variant="default" 
                className="bg-[#FF0000] hover:bg-[#E60000] text-white font-semibold px-8 py-2 rounded-full"
              >
                See All Award Winners
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
