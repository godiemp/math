'use client';

import Link from 'next/link';
import { Card, Badge, Text, Button } from '@/components/ui';

interface DetectedGap {
  skillId: string;
  skillName: string;
  severity: 'critical' | 'moderate' | 'minor';
  specificIssue: string;
  conceptMissing: string;
}

interface GapCardProps {
  gap: DetectedGap;
  showActions?: boolean;
}

export function GapCard({ gap, showActions = true }: GapCardProps) {
  const severityConfig = {
    critical: {
      badge: 'danger' as const,
      label: 'Crítica',
      borderColor: 'border-l-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/10',
    },
    moderate: {
      badge: 'warning' as const,
      label: 'Moderada',
      borderColor: 'border-l-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/10',
    },
    minor: {
      badge: 'info' as const,
      label: 'Menor',
      borderColor: 'border-l-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/10',
    },
  };

  const config = severityConfig[gap.severity];

  return (
    <Card
      className={`border-l-4 ${config.borderColor} ${config.bgColor} p-4`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Text className="font-medium text-gray-900 dark:text-white truncate">
              {gap.skillName}
            </Text>
            <Badge variant={config.badge} size="sm">
              {config.label}
            </Badge>
          </div>

          <Text size="sm" className="text-gray-700 dark:text-gray-300 mb-2">
            {gap.specificIssue}
          </Text>

          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span>Concepto:</span>
            <span className="font-medium">{gap.conceptMissing}</span>
          </div>
        </div>
      </div>

      {showActions && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Link
            href={`/learn?skill=${gap.skillId}`}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Ver lección
          </Link>
          <span className="text-gray-300 dark:text-gray-600">|</span>
          <Link
            href={`/quiz/zen?skill=${gap.skillId}`}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Practicar
          </Link>
        </div>
      )}
    </Card>
  );
}
