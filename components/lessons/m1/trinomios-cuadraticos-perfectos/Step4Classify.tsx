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

interface ClassifyItem {
  expression: string;
  isPerfectSquare: boolean;
  explanation: string;
  factorization?: string;
}

const ITEMS: ClassifyItem[] = [
  {
    expression: 'x² + 12x + 36',
    isPerfectSquare: true,
    explanation: 'a = x, b = 6 → 2(x)(6) = 12x ✓',
    factorization: '(x + 6)²',
  },
  {
    expression: 'x² + 10x + 16',
    isPerfectSquare: false,
    explanation: 'Si fuera TCP: a = x, b = 4 → 2(x)(4) = 8x ≠ 10x',
  },
  {
    expression: '4x² - 20x + 25',
    isPerfectSquare: true,
    explanation: 'a = 2x, b = 5 → 2(2x)(5) = 20x ✓',
    factorization: '(2x - 5)²',
  },
  {
    expression: '9a² + 30ab + 25b²',
    isPerfectSquare: true,
    explanation: 'a = 3a, b = 5b → 2(3a)(5b) = 30ab ✓',
    factorization: '(3a + 5b)²',
  },
  {
    expression: 'x² - 8x + 12',
    isPerfectSquare: false,
    explanation: 'Si fuera TCP: √12 no es entero, y 2(x)(√12) ≠ 8x',
  },
];

// Map boolean answer to index: true (isPerfectSquare) = 0, false = 1
const answerToIndex = (answer: boolean): number => {
  return answer ? 0 : 1;
};

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: ITEMS,
    getCorrectAnswer: (item) => answerToIndex(item.isPerfectSquare),
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica el Tipo
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Es un trinomio cuadrático perfecto? Necesitas {REQUIRED_CORRECT} de {ITEMS.length} correctas.
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={ITEMS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === answerToIndex(ITEMS[i].isPerfectSquare)
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Expression to classify */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <div className="flex justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl px-10 py-6 shadow-inner">
                <span className="font-mono text-3xl text-gray-800 dark:text-gray-200">
                  {mc.currentItem.expression}
                </span>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => mc.select(0)}
              disabled={mc.showFeedback}
              className={cn(
                'p-6 rounded-xl text-center font-semibold transition-all border-2',
                mc.selectedAnswer === 0
                  ? mc.showFeedback
                    ? mc.isCorrect
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                    : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                  : mc.showFeedback && mc.currentItem.isPerfectSquare
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500'
              )}
            >
              <div className="flex flex-col items-center gap-2">
                <Check
                  size={32}
                  className={cn(
                    mc.selectedAnswer === 0 && mc.showFeedback && mc.isCorrect
                      ? 'text-green-500'
                      : mc.selectedAnswer === 0
                      ? 'text-purple-500'
                      : 'text-gray-400'
                  )}
                />
                <span className="text-lg">Sí es TCP</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Se puede factorizar como (a ± b)²</span>
              </div>
            </button>

            <button
              onClick={() => mc.select(1)}
              disabled={mc.showFeedback}
              className={cn(
                'p-6 rounded-xl text-center font-semibold transition-all border-2',
                mc.selectedAnswer === 1
                  ? mc.showFeedback
                    ? mc.isCorrect
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                    : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                  : mc.showFeedback && !mc.currentItem.isPerfectSquare
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-500'
              )}
            >
              <div className="flex flex-col items-center gap-2">
                <X
                  size={32}
                  className={cn(
                    mc.selectedAnswer === 1 && mc.showFeedback && mc.isCorrect
                      ? 'text-green-500'
                      : mc.selectedAnswer === 1
                      ? 'text-purple-500'
                      : 'text-gray-400'
                  )}
                />
                <span className="text-lg">No es TCP</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">El término medio no coincide</span>
              </div>
            </button>
          </div>

          {/* Feedback with factorization */}
          {mc.showFeedback && (
            <div
              className={cn(
                'p-4 rounded-xl',
                mc.isCorrect
                  ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                  : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
              )}
            >
              <p
                className={cn(
                  'font-semibold mb-2',
                  mc.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                )}
              >
                {mc.isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {mc.currentItem.explanation}
              </p>
              {mc.currentItem.isPerfectSquare && mc.currentItem.factorization && (
                <p className="font-mono text-sm mt-2 text-gray-600 dark:text-gray-400">
                  Factorización: <span className="font-bold text-purple-600">{mc.currentItem.factorization}</span>
                </p>
              )}
            </div>
          )}

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? mc.next : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < ITEMS.length - 1
                  ? 'Siguiente'
                  : 'Ver Resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={ITEMS.length}
          passed={mc.passed}
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Excelente trabajo!"
          successSubtext="Sabes identificar trinomios cuadráticos perfectos"
          failureSubtext="Necesitas 4 respuestas correctas. ¡Puedes intentarlo de nuevo!"
          items={ITEMS}
          getIsCorrect={(_, i) => mc.answers[i] === answerToIndex(ITEMS[i].isPerfectSquare)}
          renderItem={(item, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="font-mono text-gray-700 dark:text-gray-300">{item.expression}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                {item.isPerfectSquare ? `= ${item.factorization}` : '(No es TCP)'}
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
