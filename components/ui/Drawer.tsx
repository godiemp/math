'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side: 'left' | 'right';
  title?: string;
  width?: 'sm' | 'md' | 'lg';
  className?: string;
}

const widthClasses = {
  sm: 'w-80', // 320px
  md: 'w-96', // 384px
  lg: 'w-[420px]',
};

export function Drawer({
  isOpen,
  onClose,
  children,
  side,
  title,
  width = 'md',
  className,
}: DrawerProps) {
  return (
    <div
      className={cn(
        'fixed inset-y-0 z-40',
        side === 'left' ? 'left-0' : 'right-0',
        widthClasses[width],
        // Solid background
        'bg-white dark:bg-[#1C1C1C]',
        // Border
        side === 'left'
          ? 'border-r border-black/[0.12] dark:border-white/[0.16]'
          : 'border-l border-black/[0.12] dark:border-white/[0.16]',
        // Shadow
        'shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
        // Animation
        'transform transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
        isOpen
          ? 'translate-x-0'
          : side === 'left'
            ? '-translate-x-full'
            : 'translate-x-full',
        className
      )}
    >
      {/* Header */}
      {title && (
        <div className="h-16 flex items-center justify-between px-4 border-b border-black/[0.08] dark:border-white/[0.08]">
          <h2
            className="text-lg font-semibold text-black dark:text-white"
            style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5 text-black/60 dark:text-white/70" />
          </button>
        </div>
      )}

      {/* Content */}
      <div className={cn('overflow-y-auto', title ? 'h-[calc(100%-4rem)]' : 'h-full')}>
        {children}
      </div>
    </div>
  );
}

Drawer.displayName = 'Drawer';
