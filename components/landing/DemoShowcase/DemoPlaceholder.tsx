'use client';

import { cn } from '@/lib/utils';

interface DemoPlaceholderProps {
  className?: string;
}

export function DemoPlaceholder({ className }: DemoPlaceholderProps) {
  return (
    <div
      className={cn(
        'w-full h-full rounded-xl overflow-hidden',
        'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900',
        className
      )}
    >
      {/* Animated shimmer effect */}
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            animation: 'shimmer 2s infinite',
          }}
        />

        {/* Placeholder content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          {/* Fake animation elements */}
          <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="w-32 h-3 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <div className="w-24 h-3 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
