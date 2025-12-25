'use client';

import { useState } from 'react';
import { ArrowRight, RotateCcw, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ExploreStep {
  id: number;
  instruction: string;
  equation1: string;
  equation2: string;
  operation?: string;
  highlight?: 'eq1' | 'eq2' | 'both';
  result?: string;
}

const STEPS: ExploreStep[] = [
  {
    id: 1,
    instruction: 'Tenemos el sistema. Observa los coeficientes de y.',
    equation1: '3x + 2y = 16',
    equation2: 'x - 2y = 0',
    highlight: 'both',
  },
  {
    id: 2,
    instruction: 'Los coeficientes de y son +2 y -2 (opuestos). ¡Podemos sumar!',
    equation1: '3x + 2y = 16',
    equation2: 'x - 2y = 0',
    highlight: 'both',
    operation: 'SUMA',
  },
  {
    id: 3,
    instruction: 'Al sumar, las "y" se eliminan.',
    equation1: '(3x + 2y) + (x - 2y)',
    equation2: '= 16 + 0',
    highlight: 'eq1',
  },
  {
    id: 4,
    instruction: 'Simplificamos y encontramos x.',
    equation1: '4x = 16',
    equation2: 'x = 4',
    highlight: 'eq2',
    result: 'x = 4',
  },
  {
    id: 5,
    instruction: 'Sustituimos x = 4 en la segunda ecuación para encontrar y.',
    equation1: '4 - 2y = 0',
    equation2: '-2y = -4',
    highlight: 'eq1',
  },
  {
    id: 6,
    instruction: 'Despejamos y.',
    equation1: 'y = 2',
    equation2: 'Solución: (4, 2)',
    highlight: 'eq1',
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
          Observa cómo se aplica el método de reducción paso a paso
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
                ? 'bg-gradient-to-r from-violet-500 to-purple-500'
                : 'bg-gray-200 dark:bg-gray-700'
            )}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        {/* Instruction */}
        <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 mb-6 border border-violet-200 dark:border-violet-800">
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            <span className="text-violet-600 dark:text-violet-400 font-bold">Paso {step.id}:</span> {step.instruction}
          </p>
        </div>

        {/* Operation badge */}
        {step.operation && (
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
              <Plus className="text-green-600" size={18} />
              <span className="font-bold text-green-700 dark:text-green-300">{step.operation}</span>
            </div>
          </div>
        )}

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
              (4, 2)
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Verificación: 3(4) + 2(2) = 16 ✓ y 4 - 2(2) = 0 ✓
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
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>{isLastStep ? 'Continuar' : 'Siguiente paso'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
