import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Brain } from 'lucide-react';

type BrainRatingProps = {
  rating: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withLabel?: boolean;
};

export function BrainRating({ 
  rating, 
  onChange, 
  readOnly = false, 
  size = 'md', 
  className,
  withLabel = false
}: BrainRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoverRating(index);
    }
  };
  
  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (!readOnly && onChange) {
      onChange(index);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div 
        className={cn(
          "flex brain-rating", 
          readOnly ? "" : "cursor-pointer",
          className
        )}
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((index) => (
          <Brain
            key={index}
            className={cn(
              sizeClasses[size],
              "text-[#FF0000] transition-opacity",
              (hoverRating >= index || rating >= index) ? "opacity-100" : "opacity-30"
            )}
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      {withLabel && (
        <span className={cn(
          "font-bold",
          {
            'text-xs': size === 'sm',
            'text-sm': size === 'md',
            'text-base': size === 'lg',
          }
        )}>
          {rating}/5 MORONIC
        </span>
      )}
    </div>
  );
}
