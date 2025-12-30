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
          'group relative rounded-2xl',
          'transition-all duration-300 ease-out',
          hover && 'hover:-translate-y-1',
          paddingSizes[padding],
          className
        )}
        style={{
          background: `radial-gradient(ellipse at center,
            var(--color-surface) 0%,
            var(--color-surface) 60%,
            var(--color-tint) 95%,
            var(--color-tint-alt) 100%
          )`,
          ...style,
        }}
        {...props}
      >
        {/* Glow layer - only visible on hover */}
        {hover && (
          <div
            className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"
            style={{
              background: 'linear-gradient(135deg, var(--color-tint) 0%, var(--color-tint-alt) 100%)',
            }}
          />
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
