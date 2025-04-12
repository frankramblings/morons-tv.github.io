import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Users, Award, Twitter, Instagram, Youtube } from "lucide-react";
import type { Creator } from "@/lib/types";

type CreatorCardProps = {
  creator: Creator;
  index: number;
};

function CreatorCard({ creator, index }: CreatorCardProps) {
  const { name, description, imageUrl, specialty, followers } = creator;
  
  const formatFollowers = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return `${count}`;
  };

  const specialtyColors: Record<string, string> = {
    "FINANCE EXPERT": "bg-blue-600",
    "TRUTH SEEKER": "bg-[#FF0000]",
    "FREE THINKER": "bg-[#FF4B00]",
    "HEALTH GURU": "bg-green-600"
  };
  
  // Social icons for talent pages
  const socialIcons = [
    <Twitter key="twitter" className="h-4 w-4" />,
    <Instagram key="instagram" className="h-4 w-4" />,
    <Youtube key="youtube" className="h-4 w-4" />
  ];

  return (
    <div className="bg-white rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-56 object-cover" 
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white text-xl font-bold">{name}</h3>
          <div className="flex items-center mt-1">
            <div className={cn(
              "px-2 py-1 rounded-sm text-xs font-semibold text-white",
              specialtyColors[specialty] || "bg-gray-600"
            )}>
              {specialty}
            </div>
            <div className="flex items-center ml-3 text-gray-300 text-xs">
              <Users className="h-3 w-3 mr-1" />
              {formatFollowers(followers)}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 line-clamp-2 h-10">{description}</p>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex space-x-2">
            {socialIcons.map((icon, i) => (
              <Button key={i} variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-gray-100 hover:bg-gray-200">
                {icon}
              </Button>
            ))}
          </div>
          {index === 0 && (
            <div className="flex items-center text-amber-500 text-xs font-semibold">
              <Award className="h-3 w-3 mr-1" /> 
              FEATURED TALENT
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContentCreatorsSection() {
  const { data: creatorsData, isLoading } = useQuery<{ creators: Creator[] }>({
    queryKey: ['/api/creators'],
  });
  
  const creators = creatorsData?.creators || [];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1C304A]">Our Talent</h2>
            <p className="text-gray-600">Meet the "experts" behind our programming</p>
          </div>
          <Button 
            variant="outline"
            className="border-[#1C304A] text-[#1C304A] hover:bg-[#1C304A] hover:text-white"
          >
            Meet All Talent
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-200 rounded h-80"></div>
            ))}
          </div>
        ) : creators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {creators.map((creator, index) => (
              <CreatorCard key={creator.id} creator={creator} index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded p-8 text-center">
            <p className="text-lg text-[#1C304A] font-semibold">
              No talent profiles available at the moment.
            </p>
          </div>
        )}
        
        <div className="mt-10 bg-[#0A1B31] rounded-lg p-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white text-xl font-bold mb-2">Join Our Talent Network</h3>
              <p className="text-gray-300 text-sm">
                Have questionable expertise and poor critical thinking skills? We want you!
              </p>
            </div>
            <Button className="bg-[#FF0000] hover:bg-[#E60000] text-white font-semibold">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
