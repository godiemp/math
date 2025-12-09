'use client';

import { useState } from 'react';
import { Apple, Cherry, Check, X, ArrowRight, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctAnswer = 1; // "7 manzanas + 2 naranjas"

  const options = [
    '9 frutas',
    '7 manzanas + 2 naranjas',
    '9 mannaranjas',
    '5 manzanas + 4 naranjas',
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
          La Frutería Matemática
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Un vendedor de frutas tiene un problema...
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Scenario */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Don Pedro tiene una frutería y necesita contar su inventario del día:
            </p>

            {/* Fruit display */}
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              {/* 3 apples */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <div className="flex gap-1 mb-2">
                  <Apple className="w-8 h-8 text-red-500" />
                  <Apple className="w-8 h-8 text-red-500" />
                  <Apple className="w-8 h-8 text-red-500" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  3 manzanas
                </span>
              </div>

              <div className="flex items-center text-2xl font-bold text-gray-400">+</div>

              {/* 2 oranges */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <div className="flex gap-1 mb-2">
                  <Cherry className="w-8 h-8 text-orange-500" />
                  <Cherry className="w-8 h-8 text-orange-500" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  2 naranjas
                </span>
              </div>

              <div className="flex items-center text-2xl font-bold text-gray-400">+</div>

              {/* 4 more apples */}
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <div className="flex gap-1 mb-2">
                  <Apple className="w-8 h-8 text-red-500" />
                  <Apple className="w-8 h-8 text-red-500" />
                  <Apple className="w-8 h-8 text-red-500" />
                  <Apple className="w-8 h-8 text-red-500" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  4 manzanas
                </span>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              = ???
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>¿Cuál es el total?</span>
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
              ¿Cómo podemos escribir el total de frutas de Don Pedro?
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
                  'p-4 rounded-xl text-left font-medium transition-all border-2',
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
                {isCorrect ? '¡Exacto!' : '¡Casi!'} Solo podemos sumar frutas del mismo tipo...
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
              {/* Step 1: Group apples */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg">
                  <Apple className="w-6 h-6 text-red-500" />
                  <span className="font-mono font-bold">3</span>
                </div>
                <span className="text-xl font-bold text-gray-400">+</span>
                <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg">
                  <Apple className="w-6 h-6 text-red-500" />
                  <span className="font-mono font-bold">4</span>
                </div>
                <span className="text-xl font-bold text-gray-400">=</span>
                <div className="flex items-center gap-2 bg-red-200 dark:bg-red-800/50 px-4 py-2 rounded-lg border-2 border-red-400">
                  <Apple className="w-6 h-6 text-red-500" />
                  <span className="font-mono font-bold">7</span>
                </div>
              </div>

              {/* Step 2: Oranges stay separate */}
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-lg">
                  <Cherry className="w-6 h-6 text-orange-500" />
                  <span className="font-mono font-bold">2</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">(se quedan separadas)</span>
              </div>

              {/* Final result */}
              <div className="text-center pt-4 border-t border-green-200 dark:border-green-700">
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Total: <span className="text-red-600">7 manzanas</span> + <span className="text-orange-500">2 naranjas</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bridge to algebra */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">
                  ¡En álgebra funciona igual!
                </h4>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    Si usamos <strong className="text-red-600">x</strong> para manzanas y <strong className="text-orange-500">y</strong> para naranjas:
                  </p>
                  <p className="font-mono text-lg bg-white dark:bg-gray-800 px-4 py-2 rounded-lg inline-block">
                    3<span className="text-red-600">x</span> + 2<span className="text-orange-500">y</span> + 4<span className="text-red-600">x</span> = 7<span className="text-red-600">x</span> + 2<span className="text-orange-500">y</span>
                  </p>
                  <p className="text-sm mt-2">
                    Solo podemos sumar <strong>términos semejantes</strong> (los que tienen la misma variable).
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
