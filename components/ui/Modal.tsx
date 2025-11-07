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
          'bg-white/90 dark:bg-[#1C1C1C]/90',
          // Border and shadow
          'rounded-3xl',
          'border border-black/[0.12] dark:border-white/[0.16]',
          'shadow-[0_20px_48px_rgba(0,0,0,0.26)]',
          // Layout
          'w-full max-h-[90vh] overflow-y-auto p-8',
          // Max width
          maxWidths[maxWidth],
          // Custom className
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-start mb-6">
            <h3
              className="text-[28px] font-semibold text-black dark:text-white tracking-tight"
              style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-black/60 hover:text-black dark:text-white/70 dark:hover:text-white text-3xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-[180ms]"
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
