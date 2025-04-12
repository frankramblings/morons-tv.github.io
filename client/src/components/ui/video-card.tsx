import { Link } from "wouter";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrainRating } from "./brain-rating";
import type { Video } from "@/lib/types";

type VideoCardProps = {
  video: Video;
  index?: number;
  variant?: "default" | "featured" | "ranked";
  className?: string;
};

export function VideoCard({ video, index, variant = "default", className }: VideoCardProps) {
  const { id, title, thumbnailUrl, duration, views, rating = 0 } = video;

  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  const rankColors = [
    "bg-[#FF4B00]", // orange for #1
    "bg-[#FFD600]", // yellow for #2
    "bg-white", // white for #3
  ];

  return (
    <Link href={`/video/${id}`}>
      <div 
        className={cn(
          "video-card bg-white rounded-lg overflow-hidden border-2 border-black transition-all duration-200 cursor-pointer",
          "hover:transform hover:scale-105 hover:shadow-lg",
          variant === "ranked" && "relative",
          className
        )}
      >
        {variant === "ranked" && typeof index === "number" && (
          <div className={cn(
            "absolute top-0 left-0 text-[#1C304A] p-2 font-['Bangers'] text-2xl border-r-2 border-b-2 border-black z-10",
            rankColors[index] || "bg-gray-200"
          )}>
            #{index + 1}
          </div>
        )}

        <div className={cn("relative", variant === "ranked" && "pt-6")}>
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="w-full h-48 object-cover" 
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-[#FF0000] text-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-white hover:bg-[#FF4B00] transition-colors">
              <Play className="h-6 w-6" />
            </button>
          </div>
          
          <div className="absolute top-0 right-0 bg-[#FFD600] text-[#1C304A] p-1 font-['Bangers'] text-sm border-2 border-black transform rotate-3 m-2">
            {duration}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-['Bangers'] text-xl text-[#1C304A] line-clamp-2">{title}</h3>
          
          <div className="flex items-center justify-between mt-3">
            <BrainRating rating={rating} readOnly size="md" />
            <div className="text-sm text-gray-500">{formatViews(views)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

type VideoCardFeaturedProps = {
  video: Video;
  className?: string;
};

export function VideoCardFeatured({ video, className }: VideoCardFeaturedProps) {
  const { id, title, thumbnailUrl, duration, views, rating = 0 } = video;

  return (
    <Link href={`/video/${id}`}>
      <div className={cn(
        "relative video-player bg-black rounded-lg overflow-hidden border-2 border-black",
        className
      )}>
        <div className="aspect-w-16 aspect-h-9 relative">
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="w-full object-cover" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-[#FF0000] text-white rounded-full w-16 h-16 flex items-center justify-center border-2 border-white hover:bg-[#FF4B00] transition-colors">
              <Play className="h-8 w-8" />
            </button>
          </div>
          <div className="absolute top-0 right-0 bg-[#FFD600] text-[#1C304A] p-2 font-['Bangers'] text-lg border-2 border-black transform rotate-3 m-2 hot-take-badge">
            🔥 HOT TAKE 🔥
          </div>
        </div>
        <div className="bg-[#1C304A] p-3 video-controls">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <button className="text-white hover:text-[#FFD600]">
                <Play className="h-6 w-6" />
              </button>
              <div className="text-white text-sm">{duration}</div>
            </div>
          </div>
          <div className="mt-2 bg-gray-700 h-1 rounded-full overflow-hidden">
            <div className="bg-[#FF0000] h-full w-1/4 rounded-full"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

type VideoCardSmallProps = {
  video: Video;
  className?: string;
};

export function VideoCardSmall({ video, className }: VideoCardSmallProps) {
  const { id, title, thumbnailUrl, rating = 0 } = video;

  return (
    <Link href={`/video/${id}`}>
      <div className={cn(
        "flex space-x-3 video-card bg-white p-2 rounded border border-gray-200 cursor-pointer",
        "hover:border-black hover:shadow-md transition-all duration-200",
        className
      )}>
        <div className="w-1/3">
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="w-full h-20 object-cover rounded" 
          />
        </div>
        <div className="w-2/3">
          <h4 className="font-['Bangers'] text-lg text-[#1C304A] line-clamp-2">{title}</h4>
          <div className="flex items-center mt-1">
            <BrainRating rating={rating} readOnly size="sm" />
            <span className="text-xs ml-1">{rating}/5</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
