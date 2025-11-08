import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'success' | 'secondary' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-[#0A84FF] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]',
  ghost: 'bg-black/[0.04] dark:bg-white/[0.06] text-black dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12]',
  danger: 'bg-[#FF453A] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]',
  success: 'bg-[#34C759] dark:bg-[#30D158] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]',
  secondary: 'bg-[#5E5CE6] dark:bg-[#9A99FF] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]',
  link: 'bg-transparent text-[#0A84FF] dark:text-[#66B2FF] hover:text-[#0A84FF]/80 dark:hover:text-[#66B2FF]/80 underline',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-[13px]',
  md: 'h-11 px-4 text-[15px]',
  lg: 'h-12 px-6 text-[17px]',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, fullWidth, disabled, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-xl font-semibold',
          'transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]',
          'active:scale-[0.98]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
          // Variant styles
          buttonVariants[variant],
          // Size styles
          buttonSizes[size],
          // Full width
          fullWidth && 'w-full',
          // Custom className
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
