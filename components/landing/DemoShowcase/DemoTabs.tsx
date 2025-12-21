'use client';

import { Circle, Box, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DemoIndex } from './useDemoCarousel';

interface DemoTabsProps {
  activeDemo: DemoIndex;
  onSelectDemo: (index: DemoIndex) => void;
  progress: number;
  isPaused: boolean;
}

const DEMOS = [
  { icon: Circle, label: 'Geometría', color: 'teal' },
  { icon: Box, label: 'Álgebra', color: 'purple' },
  { icon: BarChart3, label: 'Fracciones', color: 'blue' },
] as const;

export function DemoTabs({ activeDemo, onSelectDemo, progress, isPaused }: DemoTabsProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* Tabs */}
      <div className="flex justify-center gap-2">
        {DEMOS.map((demo, index) => {
          const Icon = demo.icon;
          const isActive = activeDemo === index;

          return (
            <button
              key={index}
              onClick={() => onSelectDemo(index as DemoIndex)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200',
                'text-sm font-medium',
                isActive
                  ? 'bg-white dark:bg-gray-800 shadow-md text-gray-900 dark:text-white'
                  : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
              )}
            >
              <Icon
                size={16}
                className={cn(
                  'transition-colors',
                  isActive && demo.color === 'teal' && 'text-teal-500',
                  isActive && demo.color === 'purple' && 'text-purple-500',
                  isActive && demo.color === 'blue' && 'text-blue-500'
                )}
              />
              <span className="hidden sm:inline">{demo.label}</span>
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-100 ease-linear rounded-full',
            activeDemo === 0 && 'bg-teal-500',
            activeDemo === 1 && 'bg-purple-500',
            activeDemo === 2 && 'bg-blue-500'
          )}
          style={{
            width: isPaused ? `${progress}%` : `${progress}%`,
            transition: isPaused ? 'none' : 'width 50ms linear',
          }}
        />
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <p className="text-center text-xs text-gray-400 dark:text-gray-500">
          Pausado
        </p>
      )}
    </div>
  );
}
