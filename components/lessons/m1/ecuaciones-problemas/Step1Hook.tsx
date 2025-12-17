'use client';

import { useState } from 'react';
import { ShoppingCart, Check, X, ArrowRight, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctAnswer = 1; // "2x + 5 = 17"

  const options = [
    'x + 5 = 17',
    '2x + 5 = 17',
    '2x - 5 = 17',
    '2(x + 5) = 17',
  ];

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    setTimeout(() => {
      setPhase('result');
    }, 1500);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Misterio del Precio
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resuelve problemas de la vida real usando ecuaciones
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Scenario */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Claudia fue a la tienda y compró lo siguiente:
            </p>

            {/* Shopping display */}
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              {/* 2 notebooks */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <div className="flex gap-2 mb-2">
                  <div className="w-12 h-14 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$x</span>
                  </div>
                  <div className="w-12 h-14 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$x</span>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  2 cuadernos
                </span>
                <span className="text-xs text-gray-500">precio desconocido</span>
              </div>

              <div className="flex items-center text-2xl font-bold text-gray-400">+</div>

              {/* 1 pen */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <div className="w-16 h-4 bg-green-500 rounded-full mb-2"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  1 lapicero
                </span>
                <span className="text-xs text-green-600 font-bold">$5</span>
              </div>

              <div className="flex items-center text-2xl font-bold text-gray-400">=</div>

              {/* Total */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border-2 border-amber-400">
                <ShoppingCart className="w-10 h-10 text-amber-500 mb-2" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total
                </span>
                <span className="text-xl font-bold text-amber-600">$17</span>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              ¿Cuánto cuesta cada cuaderno?
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>¿Cuál ecuación representa esto?</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Question */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 text-center border border-purple-200 dark:border-purple-700">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Si x es el precio de cada cuaderno, ¿cuál ecuación representa el problema?
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl text-left font-mono font-bold text-lg transition-all border-2',
                  selectedAnswer === index
                    ? showFeedback
                      ? index === correctAnswer
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                      : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                    : showFeedback && index === correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500'
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      selectedAnswer === index
                        ? showFeedback
                          ? index === correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-purple-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    )}
                  >
                    {showFeedback && index === correctAnswer ? (
                      <Check size={16} />
                    ) : showFeedback && selectedAnswer === index && index !== correctAnswer ? (
                      <X size={16} />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Check button */}
          {!showFeedback && (
            <div className="flex justify-center">
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div
              className={cn(
                'p-4 rounded-xl animate-fadeIn text-center',
                isCorrect
                  ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                  : 'bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700'
              )}
            >
              <p className={cn('font-semibold', isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
                {isCorrect ? '¡Exacto!' : '¡Casi!'} Veamos cómo resolver este problema...
              </p>
            </div>
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              Paso a paso:
            </h3>

            <div className="space-y-4">
              {/* Step 1: Identify */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">1. Identificar la incógnita</p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-mono bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">x</span> = precio de cada cuaderno
                </p>
              </div>

              {/* Step 2: Translate */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-purple-600 dark:text-purple-400 mb-2">2. Traducir a ecuación</p>
                <div className="flex flex-wrap items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded font-mono">2x</span>
                  <span>(2 cuadernos)</span>
                  <span className="font-bold">+</span>
                  <span className="bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded font-mono">5</span>
                  <span>(lapicero)</span>
                  <span className="font-bold">=</span>
                  <span className="bg-amber-100 dark:bg-amber-900/50 px-2 py-1 rounded font-mono">17</span>
                  <span>(total)</span>
                </div>
              </div>

              {/* Step 3: Solve */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-green-600 dark:text-green-400 mb-2">3. Resolver la ecuación</p>
                <div className="space-y-2 font-mono text-lg">
                  <p>2x + 5 = 17</p>
                  <p>2x = 17 - 5</p>
                  <p>2x = 12</p>
                  <p>x = 12 / 2</p>
                  <p className="text-green-600 font-bold">x = 6</p>
                </div>
              </div>

              {/* Final result */}
              <div className="text-center pt-4 border-t border-green-200 dark:border-green-700">
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Cada cuaderno cuesta <span className="text-green-600">$6</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bridge to lesson */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">
                  El secreto para resolver problemas
                </h4>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    Los problemas de la vida real se pueden traducir a <strong>ecuaciones</strong>.
                  </p>
                  <p className="text-sm mt-2">
                    Aprende a identificar la incógnita, armar la ecuación y resolverla paso a paso.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
