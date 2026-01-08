'use client';

import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useExampleReveal } from '@/hooks/lessons';
import { MathText } from '@/components/math/MathDisplay';

interface ConversionExample {
  id: string;
  standard: string;
  scientific: string;
  coefficient: string;
  exponent: number;
  direction: 'right' | 'left';
  steps: number;
  description: string;
}

const EXAMPLES: ConversionExample[] = [
  {
    id: 'large1',
    standard: '3.000',
    scientific: '$3 \\times 10^3$',
    coefficient: '3',
    exponent: 3,
    direction: 'left',
    steps: 3,
    description: 'Movemos la coma 3 lugares a la izquierda',
  },
  {
    id: 'large2',
    standard: '45.000.000',
    scientific: '$4,5 \\times 10^7$',
    coefficient: '4,5',
    exponent: 7,
    direction: 'left',
    steps: 7,
    description: 'Movemos la coma 7 lugares a la izquierda',
  },
  {
    id: 'small1',
    standard: '0,006',
    scientific: '$6 \\times 10^{-3}$',
    coefficient: '6',
    exponent: -3,
    direction: 'right',
    steps: 3,
    description: 'Movemos la coma 3 lugares a la derecha',
  },
  {
    id: 'small2',
    standard: '0,0000072',
    scientific: '$7,2 \\times 10^{-6}$',
    coefficient: '7,2',
    exponent: -6,
    direction: 'right',
    steps: 6,
    description: 'Movemos la coma 6 lugares a la derecha',
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const {
    example,
    currentIndex,
    isRevealed,
    isLastExample,
    completedIds,
    completedCount,
    reveal,
    nextExample,
    complete,
  } = useExampleReveal({
    examples: EXAMPLES,
    getExampleId: (ex) => ex.id,
    onAllCompleted: onComplete,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Observa cómo se transforman los números
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2">
        {EXAMPLES.map((ex, i) => (
          <div
            key={ex.id}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all',
              completedIds.has(ex.id)
                ? 'bg-green-500 text-white'
                : i === currentIndex
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            )}
          >
            {completedIds.has(ex.id) ? <Check size={18} /> : i + 1}
          </div>
        ))}
      </div>

      {/* Category indicator */}
      <div className="flex justify-center">
        <span className={cn(
          'px-4 py-2 rounded-full font-semibold text-sm',
          example.exponent > 0
            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
            : 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
        )}>
          {example.exponent > 0 ? '📈 Número Grande' : '🔬 Número Pequeño'}
        </span>
      </div>

      {/* Main conversion display */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        {/* Standard number */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Número estándar:</p>
          <p className="text-4xl font-mono font-bold text-gray-900 dark:text-white">
            {example.standard}
          </p>
        </div>

        {/* Animation area */}
        {!isRevealed ? (
          <div className="flex justify-center">
            <button
              onClick={reveal}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <Sparkles size={18} />
              <span>Ver la transformación</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            {/* Visual explanation */}
            <div className={cn(
              'p-4 rounded-xl border-2',
              example.exponent > 0
                ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700'
                : 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-700'
            )}>
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl">{example.direction === 'left' ? '⬅️' : '➡️'}</span>
                <span className={cn(
                  'font-semibold',
                  example.exponent > 0
                    ? 'text-purple-700 dark:text-purple-300'
                    : 'text-teal-700 dark:text-teal-300'
                )}>
                  {example.description}
                </span>
              </div>

              {/* Decimal movement visualization */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-center">
                <div className="flex items-center justify-center gap-1 text-lg">
                  {example.exponent > 0 ? (
                    <>
                      <span className="text-gray-400">{example.standard.replace(/\./g, '')}</span>
                      <span className="mx-2">→</span>
                      <span className="text-purple-600 dark:text-purple-400 font-bold">{example.coefficient}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-gray-400">{example.standard}</span>
                      <span className="mx-2">→</span>
                      <span className="text-teal-600 dark:text-teal-400 font-bold">{example.coefficient}</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {example.steps} {example.steps === 1 ? 'posición' : 'posiciones'} = exponente {example.exponent > 0 ? '+' : ''}{example.exponent}
                </p>
              </div>
            </div>

            {/* Result */}
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
              <p className="text-sm text-green-600 dark:text-green-400 mb-2 text-center">
                Notación científica:
              </p>
              <p className="text-3xl font-bold text-center text-green-800 dark:text-green-200">
                <MathText content={example.scientific} />
              </p>
            </div>

            {/* Key insight */}
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                💡 <strong>Observa:</strong> El exponente {example.exponent > 0 ? 'positivo indica un número grande' : 'negativo indica un número pequeño (menor que 1)'}.
                {' '}El coeficiente <span className="font-mono font-bold">{example.coefficient}</span> siempre está entre 1 y 10.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pattern summary - shown after all examples */}
      {completedCount >= 2 && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800 animate-fadeIn">
          <h3 className="font-bold text-indigo-800 dark:text-indigo-200 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            ¿Ves el patrón?
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="font-semibold text-purple-700 dark:text-purple-300 mb-2">📈 Números grandes:</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Mueves la coma hacia la <strong>izquierda</strong></li>
                <li>• El exponente es <strong>positivo</strong></li>
                <li>• Más ceros = exponente más grande</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="font-semibold text-teal-700 dark:text-teal-300 mb-2">🔬 Números pequeños:</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Mueves la coma hacia la <strong>derecha</strong></li>
                <li>• El exponente es <strong>negativo</strong></li>
                <li>• Más ceros después del 0. = exponente más negativo</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      {isRevealed && (
        <div className="flex justify-center gap-4 animate-fadeIn">
          {!isLastExample ? (
            <button
              onClick={nextExample}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Siguiente ejemplo</span>
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={complete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
