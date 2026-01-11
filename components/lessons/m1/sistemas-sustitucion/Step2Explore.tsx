'use client';

import { ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useStepWalkthrough } from '@/hooks/lessons';

interface ExploreStep {
  id: number;
  instruction: string;
  equation1: string;
  equation2: string;
  highlight?: string;
  result?: string;
}

const STEPS: ExploreStep[] = [
  {
    id: 1,
    instruction: 'Tenemos el sistema. Observa que y ya está despejada en la segunda ecuación.',
    equation1: 'x + y = 7',
    equation2: 'y = x + 1',
    highlight: 'equation2',
  },
  {
    id: 2,
    instruction: 'Sustituimos "y" por "x + 1" en la primera ecuación.',
    equation1: 'x + (x + 1) = 7',
    equation2: 'y = x + 1',
    highlight: 'equation1',
  },
  {
    id: 3,
    instruction: 'Simplificamos la ecuación.',
    equation1: '2x + 1 = 7',
    equation2: 'y = x + 1',
    highlight: 'equation1',
  },
  {
    id: 4,
    instruction: 'Despejamos x.',
    equation1: '2x = 6',
    equation2: 'y = x + 1',
    highlight: 'equation1',
    result: 'x = 3',
  },
  {
    id: 5,
    instruction: 'Sustituimos x = 3 en y = x + 1 para encontrar y.',
    equation1: 'x = 3',
    equation2: 'y = 3 + 1 = 4',
    highlight: 'equation2',
    result: 'y = 4',
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const {
    step,
    currentIndex,
    isLastStep,
    isFirstStep,
    next,
    reset,
  } = useStepWalkthrough({
    steps: STEPS,
    onComplete,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Observa cómo se aplica el método de sustitución paso a paso
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex justify-center gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-12 h-2 rounded-full transition-all',
              i <= currentIndex
                ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                : 'bg-gray-200 dark:bg-gray-700'
            )}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        {/* Instruction */}
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 mb-6 border border-amber-200 dark:border-amber-800">
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            <span className="text-amber-600 dark:text-amber-400 font-bold">Paso {step.id}:</span> {step.instruction}
          </p>
        </div>

        {/* Equations display */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div
            className={cn(
              'font-mono text-xl px-6 py-3 rounded-xl transition-all',
              step.highlight === 'equation1'
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-2 border-blue-400 scale-105'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            )}
          >
            {step.equation1}
          </div>
          <div
            className={cn(
              'font-mono text-xl px-6 py-3 rounded-xl transition-all',
              step.highlight === 'equation2'
                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-400 scale-105'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            )}
          >
            {step.equation2}
          </div>
        </div>

        {/* Result highlight */}
        {step.result && (
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 text-center animate-fadeIn">
            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {step.result}
            </p>
          </div>
        )}

        {/* Final solution */}
        {isLastStep && (
          <div className="mt-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 text-center animate-fadeIn">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Solución del sistema:</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
              (3, 4)
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Verificación: 3 + 4 = 7 ✓ y 4 = 3 + 1 ✓
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4">
        {!isFirstStep && (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            <RotateCcw size={18} />
            <span>Reiniciar</span>
          </button>
        )}
        <button
          onClick={next}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
        >
          <span>{isLastStep ? 'Continuar' : 'Siguiente paso'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
