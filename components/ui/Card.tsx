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
          'transition-transform duration-300 ease-out',
          hover && 'hover:-translate-y-1',
          className
        )}
        style={style}
        {...props}
      >
        {/* Gradient border layer - subtle, intensifies on hover */}
        <div
          className={cn(
            'absolute -inset-[1px] rounded-2xl',
            'transition-opacity duration-300',
            hover ? 'opacity-30 group-hover:opacity-70' : 'opacity-30'
          )}
          style={{
            background: 'linear-gradient(135deg, var(--color-tint) 0%, var(--color-tint-alt) 50%, var(--color-tint) 100%)',
          }}
        />

        {/* Glow layer - only visible on hover */}
        {hover && (
          <div
            className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--color-tint) 0%, var(--color-tint-alt) 100%)',
            }}
          />
        )}

        {/* Main content with solid background */}
        <div
          className={cn(
            'relative rounded-2xl',
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
