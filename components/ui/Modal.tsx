import React from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const maxWidths = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-3xl',
  xl: 'max-w-4xl',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = 'lg',
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className={cn(
          // Liquid glass material
          'backdrop-blur-[20px]',
          // Border and shadow
          'rounded-3xl',
          'border',
          // Layout
          'w-full max-h-[90vh] overflow-y-auto p-8',
          // Max width
          maxWidths[maxWidth],
          // Custom className
          className
        )}
        style={{
          background: 'color-mix(in srgb, var(--color-elevated-surface) 90%, transparent)',
          borderColor: 'var(--color-separator)',
          boxShadow: 'var(--shadow-popover)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-start mb-6">
            <h3
              className="text-[28px] font-semibold tracking-tight"
              style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif', color: 'var(--color-label-primary)' }}
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-3xl leading-none w-8 h-8 flex items-center justify-center rounded-full transition-all duration-[180ms]"
              style={{ color: 'var(--color-label-secondary)' }}
            >
              ×
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';
