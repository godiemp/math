'use client';

import { cn } from '@/lib/utils';
import { colors } from '@/lib/lessons/styles';

export interface QuestionPromptProps {
  children: React.ReactNode;
  variant?: 'default' | 'math';
  className?: string;
}

export function QuestionPrompt({ children, variant = 'default', className }: QuestionPromptProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-xl',
        colors.questionPrompt[variant],
        variant === 'math' && 'font-mono',
        className
      )}
    >
      {children}
    </div>
  );
}
