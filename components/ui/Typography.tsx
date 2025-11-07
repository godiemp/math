import React from 'react';
import { cn } from '@/lib/utils';

// Heading Component
export type HeadingLevel = 1 | 2 | 3 | 4;
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  size?: HeadingSize;
  children: React.ReactNode;
}

const headingSizes: Record<HeadingSize, string> = {
  xs: 'text-[19px]', // 19px
  sm: 'text-[28px]', // 28px
  md: 'text-[34px]', // 34px
  lg: 'text-[44px]', // 44px
  xl: 'text-[56px]', // 56px
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, size = 'lg', className, children, ...props }, ref) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    return React.createElement(
      Tag,
      {
        ref,
        className: cn(
          // Base styles
          'font-semibold tracking-tight text-black dark:text-white',
          'leading-[1.1]',
          // Size
          headingSizes[size],
          // Custom className
          className
        ),
        style: { fontFamily: 'SF Pro Display, system-ui, sans-serif' },
        ...props,
      },
      children
    );
  }
);

Heading.displayName = 'Heading';

// Text Component
export type TextSize = 'xs' | 'sm' | 'md' | 'lg';
export type TextVariant = 'primary' | 'secondary';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize;
  variant?: TextVariant;
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div';
}

const textSizes: Record<TextSize, string> = {
  xs: 'text-[13px]', // 13px
  sm: 'text-[15px]', // 15px
  md: 'text-[17px]', // 17px
  lg: 'text-[19px]', // 19px
};

const textVariants: Record<TextVariant, string> = {
  primary: 'text-black dark:text-white',
  secondary: 'text-black/60 dark:text-white/70',
};

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ size = 'sm', variant = 'primary', as = 'p', className, children, ...props }, ref) => {
    const Tag = as;

    return React.createElement(
      Tag,
      {
        ref,
        className: cn(
          // Base styles
          'leading-[1.4]',
          // Size
          textSizes[size],
          // Variant
          textVariants[variant],
          // Custom className
          className
        ),
        ...props,
      },
      children
    );
  }
);

Text.displayName = 'Text';
