import { BreakingTakesMarquee } from "@/components/ui/marquee";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import TrendingSection from "@/components/home/TrendingSection";
import ContentCreatorsSection from "@/components/home/ContentCreatorsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import MostMoronicSection from "@/components/home/MostMoronicSection";
import { BREAKING_TAKES } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <BreakingTakesMarquee items={BREAKING_TAKES} />
      <HeroSection />
      <CategoriesSection />
      <TrendingSection />
      <ContentCreatorsSection />
      <NewsletterSection />
      <MostMoronicSection />
    </>
  );
}
