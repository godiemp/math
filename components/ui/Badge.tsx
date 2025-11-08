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
  info: 'bg-[#0A84FF]/10 text-[#0A84FF] dark:bg-[#0A84FF]/20 dark:text-[#66B2FF]',
  warning: 'bg-[#FF9F0A]/10 text-[#FF9F0A] dark:bg-[#FF9F0A]/20 dark:text-[#FFB84D]',
  danger: 'bg-[#FF453A]/10 text-[#FF453A] dark:bg-[#FF453A]/20 dark:text-[#FF7A72]',
  success: 'bg-[#34C759]/10 text-[#34C759] dark:bg-[#30D158]/20 dark:text-[#5DE38D]',
  neutral: 'bg-black/[0.04] text-black dark:bg-white/[0.06] dark:text-white',
  secondary: 'bg-[#5E5CE6]/10 text-[#5E5CE6] dark:bg-[#9A99FF]/20 dark:text-[#B2B1FF]',
};

const badgeSizes: Record<BadgeSize, string> = {
  sm: 'h-6 px-2 text-[12px]',
  md: 'h-7 px-3 text-[13px]',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', size = 'md', className, children, ...props }, ref) => {
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
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
