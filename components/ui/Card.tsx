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
  ({ className, children, hover = true, padding = 'md', style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Liquid glass material
          'backdrop-blur-[12px]',
          // Border and shadow
          'rounded-2xl',
          'border',
          // Transition
          'transition-all duration-[240ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]',
          // Padding
          paddingSizes[padding],
          // Custom className
          className
        )}
        style={{
          background: 'color-mix(in srgb, var(--color-elevated-surface) 60%, transparent)',
          borderColor: 'var(--color-separator)',
          boxShadow: hover ? 'var(--shadow-ambient)' : 'none',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
