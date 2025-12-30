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
  primary: 'text-white',
  ghost: 'hover:opacity-80',
  danger: 'text-white',
  success: 'text-white',
  secondary: 'text-white',
  link: 'bg-transparent underline hover:opacity-80',
};

const buttonStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: { background: 'var(--color-tint)' },
  ghost: { background: 'var(--color-fill)', color: 'var(--color-label-primary)' },
  danger: { background: 'var(--color-danger)' },
  success: { background: 'var(--color-success)' },
  secondary: { background: 'var(--color-tint-alt)' },
  link: { color: 'var(--color-link)' },
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-[13px]',
  md: 'h-11 px-4 text-[15px]',
  lg: 'h-12 px-6 text-[17px]',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, fullWidth, disabled, asChild = false, style, ...props }, ref) => {
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
        style={{ ...buttonStyles[variant], ...style }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
