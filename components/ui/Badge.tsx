import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'info' | 'warning' | 'danger' | 'success' | 'neutral' | 'secondary';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
}

const badgeVariants: Record<BadgeVariant, string> = {
  info: '',
  warning: '',
  danger: '',
  success: '',
  neutral: '',
  secondary: '',
};

const badgeStyles: Record<BadgeVariant, React.CSSProperties> = {
  info: { background: 'color-mix(in srgb, var(--color-info) 15%, transparent)', color: 'var(--color-info)' },
  warning: { background: 'color-mix(in srgb, var(--color-warning) 15%, transparent)', color: 'var(--color-warning)' },
  danger: { background: 'color-mix(in srgb, var(--color-danger) 15%, transparent)', color: 'var(--color-danger)' },
  success: { background: 'color-mix(in srgb, var(--color-success) 15%, transparent)', color: 'var(--color-success)' },
  neutral: { background: 'var(--color-fill)', color: 'var(--color-label-primary)' },
  secondary: { background: 'color-mix(in srgb, var(--color-tint-alt) 15%, transparent)', color: 'var(--color-tint-alt)' },
};

const badgeSizes: Record<BadgeSize, string> = {
  sm: 'h-6 px-2 text-[12px]',
  md: 'h-7 px-3 text-[13px]',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', size = 'md', className, children, style, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center rounded-full font-medium',
          'transition-all duration-[120ms]',
          // Variant styles
          badgeVariants[variant],
          // Size styles
          badgeSizes[size],
          // Custom className
          className
        )}
        style={{ ...badgeStyles[variant], ...style }}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
