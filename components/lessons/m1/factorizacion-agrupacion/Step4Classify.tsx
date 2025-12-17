'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ClassificationItem {
  id: string;
  expression: string;
  canBeGrouped: boolean;
  explanation: string;
  correctGrouping?: string;
}

const ITEMS: ClassificationItem[] = [
  {
    id: '1',
    expression: 'ax + ay + bx + by',
    canBeGrouped: true,
    explanation: 'Sí, se puede agrupar: (ax + ay) + (bx + by) = a(x + y) + b(x + y) = (x + y)(a + b)',
    correctGrouping: '(x + y)(a + b)',
  },
  {
    id: '2',
    expression: 'x² + 3x + 2y + 6',
    canBeGrouped: false,
    explanation: 'No se puede agrupar directamente. (x² + 3x) = x(x + 3), pero (2y + 6) = 2(y + 3). Los paréntesis son diferentes.',
  },
  {
    id: '3',
    expression: 'x² + 2x + 3x + 6',
    canBeGrouped: true,
    explanation: 'Sí: (x² + 2x) + (3x + 6) = x(x + 2) + 3(x + 2) = (x + 2)(x + 3)',
    correctGrouping: '(x + 2)(x + 3)',
  },
  {
    id: '4',
    expression: 'xy + 2x + y + 2',
    canBeGrouped: true,
    explanation: 'Sí: (xy + 2x) + (y + 2) = x(y + 2) + 1(y + 2) = (y + 2)(x + 1)',
    correctGrouping: '(y + 2)(x + 1)',
  },
  {
    id: '5',
    expression: 'x² + 2x + y² + 3y',
    canBeGrouped: false,
    explanation: 'No se puede agrupar. (x² + 2x) = x(x + 2), pero (y² + 3y) = y(y + 3). Los binomios son completamente diferentes.',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(ITEMS.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentItem = ITEMS[currentIndex];
  const userAnswer = answers[currentIndex];
  const isCorrect = userAnswer === currentItem.canBeGrouped;
  const correctCount = answers.filter((a, i) => a === ITEMS[i].canBeGrouped).length;
  const passed = correctCount >= 4;

  const handleAnswer = (answer: boolean) => {
    if (showFeedback) return;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = answer;
    setAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIndex < ITEMS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers(Array(ITEMS.length).fill(null));
    setShowFeedback(false);
    setIsComplete(false);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¿Se Puede Agrupar?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Identifica si la expresión se puede factorizar por agrupación
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex justify-center gap-2">
            {ITEMS.map((item, i) => (
              <div
                key={item.id}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  answers[i] !== null
                    ? answers[i] === ITEMS[i].canBeGrouped
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : i === currentIndex
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                )}
              >
                {answers[i] !== null ? (
                  answers[i] === ITEMS[i].canBeGrouped ? <Check size={18} /> : <X size={18} />
                ) : (
                  i + 1
                )}
              </div>
            ))}
          </div>

          {/* Expression card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-3">¿Se puede factorizar por agrupación?</p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 inline-block">
                <p className="font-mono text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {currentItem.expression}
                </p>
              </div>
            </div>

            {/* Answer buttons */}
            {!showFeedback && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleAnswer(true)}
                  className="px-8 py-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition-all border-2 border-green-300 dark:border-green-700"
                >
                  <span className="text-2xl block mb-1">✓</span>
                  Sí, se puede
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="px-8 py-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all border-2 border-red-300 dark:border-red-700"
                >
                  <span className="text-2xl block mb-1">✗</span>
                  No se puede
                </button>
              </div>
            )}

            {/* Feedback */}
            {showFeedback && (
              <div className="space-y-4 animate-fadeIn">
                <div
                  className={cn(
                    'p-4 rounded-xl text-center',
                    isCorrect
                      ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                      : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
                  )}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {isCorrect ? (
                      <Check className="w-6 h-6 text-green-600" />
                    ) : (
                      <X className="w-6 h-6 text-red-600" />
                    )}
                    <p
                      className={cn(
                        'font-bold text-lg',
                        isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                      )}
                    >
                      {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </p>
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {currentItem.explanation}
                  </p>
                  {currentItem.correctGrouping && (
                    <p className="mt-2 font-mono text-lg text-center font-bold text-blue-600">
                      = {currentItem.correctGrouping}
                    </p>
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
                  >
                    <span>{currentIndex < ITEMS.length - 1 ? 'Siguiente' : 'Ver resultados'}</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Results */
        <div className="space-y-6 animate-fadeIn">
          <div
            className={cn(
              'rounded-2xl p-8 text-center',
              passed
                ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
            )}
          >
            <div className="text-5xl mb-4">{passed ? '🎉' : '💪'}</div>
            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {passed ? '¡Excelente trabajo!' : '¡Sigue practicando!'}
            </h3>
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {ITEMS.length}
            </div>
            <p className={cn(passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
              {passed
                ? 'Dominas la identificación de expresiones agrupables'
                : 'Necesitas 4 respuestas correctas para continuar'}
            </p>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="space-y-2">
              {ITEMS.map((item, i) => (
                <div
                  key={item.id}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg',
                    answers[i] === item.canBeGrouped
                      ? 'bg-green-50 dark:bg-green-900/30'
                      : 'bg-red-50 dark:bg-red-900/30'
                  )}
                >
                  <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                    {item.expression}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {item.canBeGrouped ? 'Sí' : 'No'}
                    </span>
                    {answers[i] === item.canBeGrouped ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            {!passed && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
                <span>Intentar de nuevo</span>
              </button>
            )}
            {passed && (
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
              >
                <span>Continuar</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
