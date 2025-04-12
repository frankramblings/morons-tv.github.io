import { 
  BadgeCheck, Building2, Heart, Rocket, 
  Globe, Film, Landmark, OctagonAlert,
  Newspaper, Dumbbell, VideoIcon, BarChart3, TrendingUp
} from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

type CategoryItemProps = {
  href: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  showCount?: boolean;
};

function CategoryItem({ href, title, icon, description, showCount = true }: CategoryItemProps) {
  // Generate a random count for shows in each category (for visual effect only)
  const count = Math.floor(Math.random() * 20) + 5;
  
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group">
        <div className="h-2 bg-[#FF0000]"></div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="bg-[#0A1B31] text-white p-2 rounded-full mr-3">
              {icon}
            </div>
            <div>
              <h3 className="font-bold text-[#1C304A] group-hover:text-[#FF4B00] transition-colors">
                {title}
              </h3>
              {showCount && (
                <p className="text-xs text-gray-500">{count} shows</p>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function CategoriesSection() {
  const categories = [
    { 
      title: "NEWS", 
      href: "/browse?category=news",
      icon: <Newspaper className="h-5 w-5" />,
      description: "Breaking news that's breaking logic."
    },
    { 
      title: "POLITICS", 
      href: "/browse?category=politics",
      icon: <Landmark className="h-5 w-5" />,
      description: "Where facts are optional and opinions are weaponized."
    },
    { 
      title: "FINANCE", 
      href: "/browse?category=finance",
      icon: <BadgeCheck className="h-5 w-5" />,
      description: "Get rich quick with advice from people who aren't."
    },
    { 
      title: "HEALTH", 
      href: "/browse?category=health",
      icon: <Heart className="h-5 w-5" />,
      description: "Medical advice from non-medical professionals."
    },
    { 
      title: "SPORTS", 
      href: "/browse?category=sports",
      icon: <Dumbbell className="h-5 w-5" />,
      description: "Armchair athletes analyze professional sports."
    },
    { 
      title: "TECH", 
      href: "/browse?category=tech",
      icon: <Rocket className="h-5 w-5" />,
      description: "Technology explained by people who still use flip phones."
    },
    { 
      title: "SCIENCE", 
      href: "/browse?category=science",
      icon: <Globe className="h-5 w-5" />,
      description: "Where theories are facts and facts are opinions."
    },
    { 
      title: "ENTERTAINMENT", 
      href: "/browse?category=entertainment",
      icon: <VideoIcon className="h-5 w-5" />,
      description: "Celebrity gossip and reality shows that kill brain cells."
    },
    { 
      title: "BUSINESS", 
      href: "/browse?category=business",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "Business advice from failed entrepreneurs."
    },
    { 
      title: "CONSPIRACY", 
      href: "/browse?category=conspiracy",
      icon: <OctagonAlert className="h-5 w-5" />,
      description: "Secret truths that only Facebook researchers can find."
    },
    { 
      title: "TRENDING", 
      href: "/browse?category=trending",
      icon: <TrendingUp className="h-5 w-5" />,
      description: "What's hot in the world of misinformation."
    }
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#1C304A] mb-2">Browse Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find shows across our network channels, organized by subject matter and level of misinformation
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryItem 
              key={index}
              href={category.href}
              title={category.title}
              icon={category.icon}
              description={category.description}
            />
          ))}
        </div>
        
        <div className="mt-10 flex justify-center">
          <Link href="/browse">
            <div className="inline-block text-center bg-[#0A1B31] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#1C304A] transition-colors cursor-pointer">
              View Full Program Guide
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
