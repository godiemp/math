'use client';

import { Button, Text } from '@/components/ui';
import { useEffect, useState } from 'react';

interface ContextualTooltipProps {
  targetId?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  title: string;
  description: string;
  onNext?: () => void;
  onSkip?: () => void;
  showSkip?: boolean;
  step?: number;
  totalSteps?: number;
}

export function ContextualTooltip({
  targetId,
  position = 'bottom',
  title,
  description,
  onNext,
  onSkip,
  showSkip = true,
  step,
  totalSteps,
}: ContextualTooltipProps) {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (targetId) {
      const element = document.getElementById(targetId);
      setTargetElement(element);

      if (element) {
        // Calculate position relative to target element
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        let top = 0;
        let left = 0;

        switch (position) {
          case 'bottom':
            top = rect.bottom + scrollTop + 16;
            left = rect.left + scrollLeft + rect.width / 2;
            break;
          case 'top':
            top = rect.top + scrollTop - 16;
            left = rect.left + scrollLeft + rect.width / 2;
            break;
          case 'left':
            top = rect.top + scrollTop + rect.height / 2;
            left = rect.left + scrollLeft - 16;
            break;
          case 'right':
            top = rect.top + scrollTop + rect.height / 2;
            left = rect.right + scrollLeft + 16;
            break;
        }

        setTooltipPosition({ top, left });

        // Scroll element into view
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [targetId, position]);

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onSkip} />

      {/* Highlight Ring around target */}
      {targetElement && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            top: targetElement.getBoundingClientRect().top - 8,
            left: targetElement.getBoundingClientRect().left - 8,
            width: targetElement.getBoundingClientRect().width + 16,
            height: targetElement.getBoundingClientRect().height + 16,
          }}
        >
          <div className="w-full h-full rounded-2xl ring-4 ring-[#0A84FF] animate-pulse-ring" />
        </div>
      )}

      {/* Tooltip */}
      <div
        className="fixed z-50 animate-fade-in"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          transform:
            position === 'top'
              ? 'translate(-50%, -100%)'
              : position === 'bottom'
              ? 'translate(-50%, 0)'
              : position === 'left'
              ? 'translate(-100%, -50%)'
              : 'translate(0, -50%)',
          maxWidth: '400px',
        }}
      >
        <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-6 border-2 border-[#0A84FF]">
          {/* Progress indicator */}
          {step && totalSteps && (
            <div className="flex gap-1.5 mb-3">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i < step ? 'bg-[#0A84FF]' : 'bg-black/10 dark:bg-white/10'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Title */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#0A84FF] animate-pulse" />
            <Text size="sm" className="font-semibold">
              {title}
            </Text>
          </div>

          {/* Description */}
          <Text size="sm" variant="secondary" className="mb-4 leading-relaxed">
            {description}
          </Text>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            {showSkip && onSkip && (
              <Button variant="ghost" size="sm" onClick={onSkip}>
                Saltar
              </Button>
            )}
            {onNext && (
              <Button variant="primary" size="sm" onClick={onNext}>
                {step && totalSteps && step < totalSteps ? 'Siguiente →' : 'Entendido'}
              </Button>
            )}
          </div>
        </div>

        {/* Arrow pointer */}
        <div
          className={`absolute w-0 h-0 border-8 ${
            position === 'bottom'
              ? 'border-transparent border-b-[#0A84FF] -top-4 left-1/2 -translate-x-1/2'
              : position === 'top'
              ? 'border-transparent border-t-[#0A84FF] -bottom-4 left-1/2 -translate-x-1/2'
              : position === 'right'
              ? 'border-transparent border-r-[#0A84FF] -left-4 top-1/2 -translate-y-1/2'
              : 'border-transparent border-l-[#0A84FF] -right-4 top-1/2 -translate-y-1/2'
          }`}
        />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        @keyframes pulse-ring {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s infinite;
        }
      `}</style>
    </>
  );
}
