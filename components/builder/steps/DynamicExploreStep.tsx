'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ExploreStep, DynamicStepProps, ThemeColor } from '@/lib/builder/types';
import { RichText } from '../primitives';

interface DynamicExploreStepProps extends DynamicStepProps<ExploreStep> {}

/**
 * Color classes for themed elements
 */
const colorClasses: Record<ThemeColor, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-700' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-700' },
  teal: { bg: 'bg-teal-50 dark:bg-teal-900/30', text: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-700' },
  pink: { bg: 'bg-pink-50 dark:bg-pink-900/30', text: 'text-pink-700 dark:text-pink-300', border: 'border-pink-200 dark:border-pink-700' },
  green: { bg: 'bg-green-50 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', border: 'border-green-200 dark:border-green-700' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-700' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-700' },
  red: { bg: 'bg-red-50 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-700' },
};

/**
 * DynamicExploreStep - Renders an explore step from JSON schema
 *
 * Features:
 * - Introduction section
 * - Optional category cards
 * - Interactive examples with hints
 * - Summary with key takeaways
 */
export default function DynamicExploreStep({
  step,
  isActive,
  onComplete,
}: DynamicExploreStepProps) {
  const { content } = step;
  const [exploredExamples, setExploredExamples] = useState<Set<string>>(new Set());
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const allExplored = exploredExamples.size >= content.examples.length;

  const handleExampleClick = (id: string) => {
    setSelectedExample(selectedExample === id ? null : id);
    setExploredExamples(prev => new Set([...prev, id]));
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {step.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {content.subtitle}
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          <RichText content={content.intro.text} />
        </p>
      </div>

      {/* Category cards (if provided) */}
      {content.intro.categories && content.intro.categories.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {content.intro.categories.map((category) => {
            const colors = colorClasses[category.color];
            return (
              <div
                key={category.id}
                className={cn('p-4 rounded-xl border', colors.bg, colors.border)}
              >
                <h4 className={cn('font-bold mb-2', colors.text)}>{category.label}</h4>
                {category.examples && (
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {category.examples.map((ex, i) => (
                      <li key={i} className="font-mono">
                        <RichText content={ex} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive examples */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">
            Explora los ejemplos:
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {exploredExamples.size} / {content.examples.length} explorados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.examples.map((example) => {
            const isExplored = exploredExamples.has(example.id);
            const isSelected = selectedExample === example.id;

            return (
              <button
                key={example.id}
                onClick={() => handleExampleClick(example.id)}
                className={cn(
                  'p-4 rounded-xl text-left transition-all border-2',
                  isSelected
                    ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-500'
                    : isExplored
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-amber-400'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-lg text-gray-800 dark:text-gray-200">
                    <RichText content={example.expression} />
                  </span>
                  {isExplored && !isSelected && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                </div>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-amber-300 dark:border-amber-700 animate-fadeIn">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        <RichText content={example.hint} />
                      </span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mt-2">
                      <p className="font-mono text-green-600 dark:text-green-400 font-bold">
                        = <RichText content={example.result} />
                      </p>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      {allExplored && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700 animate-fadeIn">
          <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">
            {content.summary.title}
          </h3>
          {content.summary.steps && (
            <ul className="space-y-2">
              {content.summary.steps.map((summaryStep, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <RichText content={summaryStep} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          disabled={!allExplored}
          className={cn(
            'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all',
            allExplored
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
          )}
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {!allExplored && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Explora todos los ejemplos para continuar
        </p>
      )}
    </div>
  );
}
