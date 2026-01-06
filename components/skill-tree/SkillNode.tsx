'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Lock, CheckCircle, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SkillStatus } from '@/hooks/useSkillTree';

interface SkillNodeProps {
  id: string;
  name: string;
  description: string;
  status: SkillStatus;
  onClick: () => void;
}

export function SkillNode({
  name,
  description,
  status,
  onClick,
}: SkillNodeProps) {
  const isClickable = status === 'unlocked';

  return (
    <Card
      hover={isClickable}
      padding="md"
      className={cn(
        'w-64 cursor-pointer select-none',
        status === 'locked' && 'opacity-50 cursor-not-allowed',
        status === 'verified' && 'ring-2 ring-[#30D158]'
      )}
      onClick={isClickable ? onClick : undefined}
    >
      <div className="flex items-start gap-3">
        {/* Status Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
            status === 'locked' && 'bg-black/10 dark:bg-white/10',
            status === 'unlocked' && 'bg-[#0A84FF]/10 dark:bg-[#0A84FF]/20',
            status === 'verified' && 'bg-[#30D158]/10 dark:bg-[#30D158]/20'
          )}
        >
          {status === 'locked' && (
            <Lock className="w-5 h-5 text-black/40 dark:text-white/40" />
          )}
          {status === 'unlocked' && (
            <PlayCircle className="w-5 h-5 text-[#0A84FF]" />
          )}
          {status === 'verified' && (
            <CheckCircle className="w-5 h-5 text-[#30D158]" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-base text-black dark:text-white truncate">
              {name}
            </h3>
            {status === 'verified' && (
              <Badge variant="success" size="sm">
                Completado
              </Badge>
            )}
          </div>
          <p className="text-sm text-black/60 dark:text-white/60 line-clamp-2">
            {description}
          </p>

          {/* Call to action for unlocked */}
          {status === 'unlocked' && (
            <p className="text-xs text-[#0A84FF] mt-2 font-medium">
              Toca para demostrar que lo entiendes
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
