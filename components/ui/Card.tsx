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
          'group relative rounded-2xl p-[1px]',
          'transition-all duration-300 ease-out',
          hover && 'hover:-translate-y-1',
          className
        )}
        style={{
          background: 'linear-gradient(135deg, var(--color-tint) 0%, var(--color-tint-alt) 50%, var(--color-tint) 100%)',
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

        {/* Main content - covers everything except 1px border */}
        <div
          className={cn(
            'relative rounded-[15px]',
            paddingSizes[padding]
          )}
          style={{
            background: 'var(--color-elevated-surface)',
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
