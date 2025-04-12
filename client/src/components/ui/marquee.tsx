import { cn } from "@/lib/utils";

type BreakingTakesMarqueeProps = {
  className?: string;
  items: string[];
};

export function BreakingTakesMarquee({ className, items }: BreakingTakesMarqueeProps) {
  return (
    <div className={cn(
      "bg-[#FF0000] text-white py-2 border-b-2 border-black overflow-hidden whitespace-nowrap",
      className
    )}>
      <div className="marquee-content inline-block font-['Bangers'] text-xl animate-[marquee_30s_linear_infinite]">
        {items.map((item, index) => (
          <span key={index} className="mx-4">{item}</span>
        ))}
      </div>
    </div>
  );
}
