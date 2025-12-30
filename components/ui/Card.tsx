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
          'rounded-2xl',
          'border',
          'transition-all duration-200 ease-out',
          hover && 'hover:-translate-y-1 hover:border-[var(--color-tint)]/30',
          paddingSizes[padding],
          className
        )}
        style={{
          background: 'var(--color-elevated-surface)',
          borderColor: 'var(--color-separator-strong)',
          boxShadow: 'var(--shadow-ambient)',
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
