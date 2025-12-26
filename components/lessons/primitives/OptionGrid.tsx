'use client';

import { cn } from '@/lib/utils';

export interface OptionGridProps {
  children: React.ReactNode;
  columns?: 1 | 2;
  className?: string;
}

export function OptionGrid({ children, columns = 2, className }: OptionGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2',
        className
      )}
    >
      {children}
    </div>
  );
}
