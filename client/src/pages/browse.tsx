import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { VideoCard } from "@/components/ui/video-card";
import { SectionTitle } from "@/components/ui/typography";
import { BreakingTakesMarquee } from "@/components/ui/marquee";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BREAKING_TAKES, CATEGORIES } from "@/lib/constants";

export default function Browse() {
  const [location] = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { toast } = useToast();
  
  useEffect(() => {
    // Extract category from URL if present
    const urlParams = new URLSearchParams(location.split("?")[1]);
    const category = urlParams.get("category");
    if (category && CATEGORIES.map(c => c.value).includes(category)) {
      setActiveCategory(category);
    }
  }, [location]);
  
  const { data: videosData, isLoading } = useQuery({
    queryKey: [activeCategory === "all" ? '/api/videos' : `/api/videos/category/${activeCategory}`],
  });
  
  const videos = videosData?.videos || [];
  
  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
  };

  const handleLoadMore = () => {
    toast({
      title: "Loading More Content",
      description: "Just kidding! There's only so much stupidity we can handle at once."
    });
  };

  return (
    <>
      <BreakingTakesMarquee items={BREAKING_TAKES} />
      
      <section className="bg-[#F9F7F0] py-8">
        <div className="container mx-auto px-4">
          <SectionTitle>BROWSE CONTENT</SectionTitle>
          
          <Tabs
            defaultValue={activeCategory}
            value={activeCategory}
            onValueChange={handleCategoryChange}
            className="w-full mb-8"
          >
            <div className="overflow-x-auto pb-2">
              <TabsList className="bg-[#1C304A] p-1 border-2 border-black">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-[#FF4B00] data-[state=active]:text-white font-['Bangers']"
                >
                  ALL
                </TabsTrigger>
                {CATEGORIES.map((category) => (
                  <TabsTrigger 
                    key={category.value} 
                    value={category.value}
                    className="data-[state=active]:bg-[#FF4B00] data-[state=active]:text-white font-['Bangers']"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value={activeCategory} className="mt-6">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, index) => (
                    <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
                  ))}
                </div>
              ) : videos.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <Button 
                      variant="default" 
                      className="bg-[#FF4B00] text-white font-['Bangers'] px-8 py-3 rounded-lg border-2 border-black transform rotate-1 hover:-rotate-1 transition-transform text-xl"
                      onClick={handleLoadMore}
                    >
                      LOAD MORE MORONS
                    </Button>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center border-2 border-black">
                  <p className="text-lg font-['Bangers'] text-[#1C304A]">
                    NO CONTENT FOUND IN THIS CATEGORY! EVEN MORONS HAVE STANDARDS.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
