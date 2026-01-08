import React from 'react';
import { cn } from '@/lib/utils';

interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  width?: 'md' | 'lg' | 'xl';
  className?: string;
}

const widths = {
  md: 'max-w-md',
  lg: 'max-w-xl',
  xl: 'max-w-2xl',
};

export const SlidePanel: React.FC<SlidePanelProps> = ({
  isOpen,
  onClose,
  children,
  title,
  width = 'lg',
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className={cn(
          // Position right
          'absolute right-0 top-0 h-full',
          // Liquid glass material
          'backdrop-blur-[20px]',
          'bg-white/95 dark:bg-[#1C1C1C]/95',
          // Border and shadow
          'border-l border-black/[0.12] dark:border-white/[0.16]',
          'shadow-[-20px_0_48px_rgba(0,0,0,0.26)]',
          // Layout
          'w-full overflow-y-auto',
          // Width
          widths[width],
          // Animation
          'animate-slide-in-right',
          // Custom className
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 border-b border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-[#1C1C1C]/80 backdrop-blur-md">
            <h3
              className="text-lg font-semibold text-black dark:text-white tracking-tight"
              style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-black/60 hover:text-black dark:text-white/70 dark:hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-[180ms]"
            >
              ×
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

SlidePanel.displayName = 'SlidePanel';
