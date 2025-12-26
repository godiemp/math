'use client';

import { Lightbulb, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/lessons/styles';

export interface InsightCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'purple' | 'green' | 'blue';
  className?: string;
}

export function InsightCard({
  title,
  children,
  icon,
  variant = 'purple',
  className,
}: InsightCardProps) {
  const defaultIcon = (
    <div className="flex items-center gap-1">
      <Lightbulb className="text-current" size={20} />
      <Sparkles className="text-current" size={16} />
    </div>
  );

  const iconColors: Record<typeof variant, string> = {
    purple: 'text-purple-600 dark:text-purple-400',
    green: 'text-green-600 dark:text-green-400',
    blue: 'text-blue-600 dark:text-blue-400',
  };

  const titleColors: Record<typeof variant, string> = {
    purple: 'text-purple-800 dark:text-purple-200',
    green: 'text-green-800 dark:text-green-200',
    blue: 'text-blue-800 dark:text-blue-200',
  };

  return (
    <div className={cn('p-5 rounded-xl', colors.insight[variant], className)}>
      <div className="flex items-center gap-2 mb-3">
        <span className={iconColors[variant]}>{icon ?? defaultIcon}</span>
        <h4 className={cn('font-bold', titleColors[variant])}>{title}</h4>
      </div>
      <div className="text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );
}
