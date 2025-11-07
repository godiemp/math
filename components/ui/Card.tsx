import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingSizes = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = true, padding = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Liquid glass material
          'backdrop-blur-[12px]',
          'bg-white/60 dark:bg-[#1C1C1C]/60',
          // Border and shadow
          'rounded-2xl',
          'border border-black/[0.12] dark:border-white/[0.16]',
          'shadow-[0_8px_24px_rgba(0,0,0,0.18)]',
          // Hover effect
          hover && 'hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)]',
          // Transition
          'transition-all duration-[240ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]',
          // Padding
          paddingSizes[padding],
          // Custom className
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
