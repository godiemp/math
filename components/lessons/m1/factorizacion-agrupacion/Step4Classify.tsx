'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

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

// Binary choice as a multiple choice: 0 = true (Yes), 1 = false (No)
function boolToIndex(val: boolean): number {
  return val ? 0 : 1;
}

function indexToBool(index: number): boolean {
  return index === 0;
}

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: ITEMS,
    getCorrectAnswer: (item) => boolToIndex(item.canBeGrouped),
    passThreshold: 4,
  });

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

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={ITEMS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === boolToIndex(ITEMS[i].canBeGrouped)
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Expression card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-3">¿Se puede factorizar por agrupación?</p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 inline-block">
                <p className="font-mono text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {mc.currentItem.expression}
                </p>
              </div>
            </div>

            {/* Answer buttons */}
            {!mc.showFeedback && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => mc.select(0)} // 0 = true
                  className={cn(
                    'px-8 py-4 rounded-xl font-semibold transition-all border-2',
                    mc.selectedAnswer === 0
                      ? 'bg-green-200 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 hover:bg-green-200 dark:hover:bg-green-900/50'
                  )}
                >
                  <span className="text-2xl block mb-1">✓</span>
                  Sí, se puede
                </button>
                <button
                  onClick={() => mc.select(1)} // 1 = false
                  className={cn(
                    'px-8 py-4 rounded-xl font-semibold transition-all border-2',
                    mc.selectedAnswer === 1
                      ? 'bg-red-200 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-900/50'
                  )}
                >
                  <span className="text-2xl block mb-1">✗</span>
                  No se puede
                </button>
              </div>
            )}

            {/* Feedback with explanation */}
            {mc.showFeedback && (
              <div className="space-y-4 animate-fadeIn">
                <div
                  className={cn(
                    'p-4 rounded-xl text-center',
                    mc.isCorrect
                      ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                      : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
                  )}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {mc.isCorrect ? (
                      <Check className="w-6 h-6 text-green-600" />
                    ) : (
                      <X className="w-6 h-6 text-red-600" />
                    )}
                    <p
                      className={cn(
                        'font-bold text-lg',
                        mc.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                      )}
                    >
                      {mc.isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </p>
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {mc.currentItem.explanation}
                  </p>
                  {mc.currentItem.correctGrouping && (
                    <p className="mt-2 font-mono text-lg text-center font-bold text-blue-600">
                      = {mc.currentItem.correctGrouping}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? mc.next : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < ITEMS.length - 1
                  ? 'Siguiente'
                  : 'Ver resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={ITEMS.length}
          passed={mc.passed}
          passThreshold={4}
          successMessage="¡Excelente trabajo!"
          successSubtext="Dominas la identificación de expresiones agrupables"
          failureSubtext="Necesitas 4 respuestas correctas para continuar"
          items={ITEMS}
          getIsCorrect={(_, i) => mc.answers[i] === boolToIndex(ITEMS[i].canBeGrouped)}
          renderItem={(item, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                {item.expression}
              </span>
              <span className="text-xs text-gray-500 ml-auto">
                {item.canBeGrouped ? 'Sí' : 'No'}
              </span>
            </>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
        />
      )}
    </div>
  );
}
