import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'glow';
}

const paddingSizes = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = true, padding = 'md', variant = 'gradient', style, ...props }, ref) => {
    // Gradient border card with glow effect
    if (variant === 'gradient' || variant === 'glow') {
      return (
        <div
          ref={ref}
          className={cn(
            'group relative rounded-2xl',
            'transition-all duration-300 ease-out',
            hover && 'hover:scale-[1.02] hover:-translate-y-0.5',
            className
          )}
          style={style}
          {...props}
        >
          {/* Gradient border layer */}
          <div
            className={cn(
              'absolute -inset-[1px] rounded-2xl opacity-50',
              'transition-opacity duration-300',
              hover && 'group-hover:opacity-100'
            )}
            style={{
              background: 'linear-gradient(135deg, var(--color-tint) 0%, var(--color-tint-alt) 50%, var(--color-info) 100%)',
            }}
          />

          {/* Glow effect layer */}
          <div
            className={cn(
              'absolute -inset-1 rounded-2xl opacity-0 blur-xl',
              'transition-opacity duration-300',
              hover && 'group-hover:opacity-30'
            )}
            style={{
              background: 'linear-gradient(135deg, var(--color-tint) 0%, var(--color-tint-alt) 100%)',
            }}
          />

          {/* Main content */}
          <div
            className={cn(
              'relative rounded-2xl backdrop-blur-xl',
              paddingSizes[padding]
            )}
            style={{
              background: 'var(--color-surface)',
            }}
          >
            {children}
          </div>
        </div>
      );
    }

    // Default simple card
    return (
      <div
        ref={ref}
        className={cn(
          'backdrop-blur-[12px]',
          'rounded-2xl',
          'border',
          'transition-all duration-[240ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]',
          paddingSizes[padding],
          className
        )}
        style={{
          background: 'var(--color-elevated-surface)',
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
