'use client';

import { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ExploreStep {
  id: number;
  instruction: string;
  equation1: string;
  equation2: string;
  highlight?: 'eq1' | 'eq2' | 'both';
  result?: string;
}

const STEPS: ExploreStep[] = [
  {
    id: 1,
    instruction: 'Tenemos el sistema. Observa que ambas ecuaciones pueden despejarse para y.',
    equation1: '2x + y = 8',
    equation2: 'x - y = 1',
    highlight: 'both',
  },
  {
    id: 2,
    instruction: 'Despejamos "y" de la primera ecuación.',
    equation1: 'y = 8 - 2x',
    equation2: 'x - y = 1',
    highlight: 'eq1',
  },
  {
    id: 3,
    instruction: 'Despejamos "y" de la segunda ecuación.',
    equation1: 'y = 8 - 2x',
    equation2: 'y = x - 1',
    highlight: 'eq2',
  },
  {
    id: 4,
    instruction: 'Igualamos las dos expresiones de y.',
    equation1: '8 - 2x = x - 1',
    equation2: '(ambas expresiones = y)',
    highlight: 'eq1',
  },
  {
    id: 5,
    instruction: 'Resolvemos para x.',
    equation1: '8 + 1 = x + 2x',
    equation2: '9 = 3x',
    highlight: 'eq1',
    result: 'x = 3',
  },
  {
    id: 6,
    instruction: 'Sustituimos x = 3 para encontrar y.',
    equation1: 'y = x - 1',
    equation2: 'y = 3 - 1 = 2',
    highlight: 'eq2',
    result: 'y = 2',
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const step = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Observa cómo se aplica el método de igualación paso a paso
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex justify-center gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-10 h-2 rounded-full transition-all',
              i <= currentStep
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500'
                : 'bg-gray-200 dark:bg-gray-700'
            )}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        {/* Instruction */}
        <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4 mb-6 border border-cyan-200 dark:border-cyan-800">
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            <span className="text-cyan-600 dark:text-cyan-400 font-bold">Paso {step.id}:</span> {step.instruction}
          </p>
        </div>

        {/* Equations display */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div
            className={cn(
              'font-mono text-xl px-6 py-3 rounded-xl transition-all',
              step.highlight === 'eq1' || step.highlight === 'both'
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-2 border-blue-400 scale-105'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            )}
          >
            {step.equation1}
          </div>
          <div
            className={cn(
              'font-mono text-xl px-6 py-3 rounded-xl transition-all',
              step.highlight === 'eq2' || step.highlight === 'both'
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
              (3, 2)
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Verificación: 2(3) + 2 = 8 ✓ y 3 - 2 = 1 ✓
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4">
        {currentStep > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            <RotateCcw size={18} />
            <span>Reiniciar</span>
          </button>
        )}
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg"
        >
          <span>{isLastStep ? 'Continuar' : 'Siguiente paso'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
