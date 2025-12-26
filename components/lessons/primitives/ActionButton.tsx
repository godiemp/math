'use client';

import { cn } from '@/lib/utils';
import { colors, ActionButtonVariant } from '@/lib/lessons/styles';

export interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: ActionButtonVariant;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export function ActionButton({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  className,
}: ActionButtonProps) {
  const effectiveVariant = disabled ? 'disabled' : variant;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'px-8 py-3 rounded-xl font-semibold transition-all shadow-lg text-white',
        'flex items-center justify-center gap-2',
        colors.gradient[effectiveVariant],
        disabled && 'cursor-not-allowed shadow-none',
        className
      )}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}
