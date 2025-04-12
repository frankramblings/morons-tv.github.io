import { cn } from "@/lib/utils";

type MoronLogoTextProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function MoronLogoText({ size = "md", className }: MoronLogoTextProps) {
  const sizeClasses = {
    sm: "text-3xl md:text-4xl",
    md: "text-4xl md:text-5xl",
    lg: "text-5xl md:text-6xl",
  };

  return (
    <h1 className={cn(
      "font-['Bangers'] text-[#FFD600] text-shadow-md transform rotate-0",
      sizeClasses[size],
      className
    )}>
      MORONS<span className="text-white">.TV</span>
    </h1>
  );
}

type HotTakeBadgeProps = {
  text: string;
  variant?: "yellow" | "red" | "orange";
  className?: string;
};

export function HotTakeBadge({ text, variant = "yellow", className }: HotTakeBadgeProps) {
  const variants = {
    yellow: "bg-[#FFD600] text-[#1C304A]",
    red: "bg-[#FF0000] text-white",
    orange: "bg-[#FF4B00] text-white",
  };

  return (
    <div className={cn(
      "p-2 font-['Bangers'] text-lg border-2 border-black transform rotate-3 hot-take-badge inline-block",
      variants[variant],
      className
    )}>
      {text}
    </div>
  );
}

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
  badge?: {
    text: string;
    variant?: "yellow" | "red" | "orange";
  };
};

export function SectionTitle({ children, className, badge }: SectionTitleProps) {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <h2 className="font-['Bangers'] text-4xl text-[#1C304A]">{children}</h2>
      {badge && <HotTakeBadge text={badge.text} variant={badge.variant} />}
    </div>
  );
}

type CategoryTitleProps = {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
};

export function CategoryTitle({ children, className, centered = false }: CategoryTitleProps) {
  return (
    <h2 className={cn(
      "font-['Bangers'] text-4xl text-white mb-6",
      centered && "text-center",
      className
    )}>
      {children}
    </h2>
  );
}
