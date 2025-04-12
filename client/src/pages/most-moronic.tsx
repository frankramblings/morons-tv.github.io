import { useQuery } from "@tanstack/react-query";
import { VideoCard } from "@/components/ui/video-card";
import { SectionTitle, HotTakeBadge } from "@/components/ui/typography";
import { BreakingTakesMarquee } from "@/components/ui/marquee";
import { BREAKING_TAKES } from "@/lib/constants";

export default function MostMoronic() {
  const { data: moronicData, isLoading } = useQuery({
    queryKey: ['/api/videos/most-moronic'],
  });
  
  const moronicVideos = moronicData?.videos || [];

  return (
    <>
      <BreakingTakesMarquee items={BREAKING_TAKES} />
      
      <section className="bg-[#F9F7F0] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center mb-8 text-center">
            <HotTakeBadge text="🏆 HALL OF SHAME 🏆" variant="red" className="mb-4" />
            <SectionTitle className="mb-2">THE MOST MORONIC CONTENT</SectionTitle>
            <p className="max-w-2xl text-center text-gray-700">
              Welcome to our showcase of the absolute dumbest content on the internet. 
              These videos have achieved legendary status in the realm of stupidity.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(9).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          ) : moronicVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {moronicVideos.map((video, index) => (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  index={index} 
                  variant="ranked" 
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center border-2 border-black">
              <p className="text-lg font-['Bangers'] text-[#1C304A]">
                NO HALL OF FAME CONTENT YET! BE THE FIRST TO MAKE HISTORY WITH YOUR STUPIDITY.
              </p>
            </div>
          )}
        </div>
      </section>
      
      <section className="bg-[#1C304A] py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-['Bangers'] text-3xl text-white mb-4">THINK YOU'RE MORONIC ENOUGH?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Do you have what it takes to join the ranks of the internet's most magnificently moronic content creators?
            Share your hottest takes and most questionable logic with the world!
          </p>
          <button className="bg-[#FF0000] text-white font-['Bangers'] px-8 py-3 rounded-lg border-2 border-black transform rotate-1 hover:-rotate-1 transition-transform text-xl animate-pulse">
            SUBMIT YOUR STUPIDITY
          </button>
        </div>
      </section>
    </>
  );
}
