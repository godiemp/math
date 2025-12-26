'use client';

import { cn } from '@/lib/utils';
import { colors } from '@/lib/lessons/styles';

export interface ScenarioCardProps {
  children: React.ReactNode;
  variant?: 'warm' | 'cool' | 'neutral';
  className?: string;
}

export function ScenarioCard({ children, variant = 'warm', className }: ScenarioCardProps) {
  return (
    <div
      className={cn(
        'p-6 rounded-2xl',
        colors.scenario[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
