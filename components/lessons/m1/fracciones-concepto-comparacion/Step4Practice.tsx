'use client';

import { useState } from 'react';
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

type Answer = 'left' | 'right' | 'equal';

interface ComparisonQuestion {
  id: number;
  fraction1: { num: number; den: number };
  fraction2: { num: number; den: number };
  correctAnswer: Answer;
  explanation: string;
  strategy: string;
}

const QUESTIONS: ComparisonQuestion[] = [
  {
    id: 1,
    fraction1: { num: 3, den: 8 },
    fraction2: { num: 5, den: 8 },
    correctAnswer: 'right',
    explanation: 'Cuando el denominador es igual, la fracción con mayor numerador es más grande.',
    strategy: 'Mismo denominador',
  },
  {
    id: 2,
    fraction1: { num: 1, den: 3 },
    fraction2: { num: 1, den: 5 },
    correctAnswer: 'left',
    explanation: '¡Cuidado! Con el mismo numerador, el denominador menor da una fracción más grande.',
    strategy: 'Mismo numerador',
  },
  {
    id: 3,
    fraction1: { num: 3, den: 4 },
    fraction2: { num: 2, den: 5 },
    correctAnswer: 'left',
    explanation: '3/4 es mayor que 1/2, mientras que 2/5 es menor que 1/2. Así que 3/4 > 2/5.',
    strategy: 'Comparar con 1/2',
  },
  {
    id: 4,
    fraction1: { num: 1, den: 2 },
    fraction2: { num: 2, den: 4 },
    correctAnswer: 'equal',
    explanation: '1/2 y 2/4 son fracciones equivalentes. Ambas representan la mitad.',
    strategy: 'Fracciones equivalentes',
  },
];

// Map answer to index: left=0, equal=1, right=2
const answerToIndex = (answer: Answer): number => {
  const map: Record<Answer, number> = { left: 0, equal: 1, right: 2 };
  return map[answer];
};

const indexToAnswer = (index: number): Answer => {
  const answers: Answer[] = ['left', 'equal', 'right'];
  return answers[index];
};

// Fraction bar for visual feedback
function FractionBar({
  numerator,
  denominator,
  color = 'blue',
}: {
  numerator: number;
  denominator: number;
  color?: 'blue' | 'purple';
}) {
  const colorClasses = {
    blue: {
      filled: 'bg-blue-500 dark:bg-blue-600',
      empty: 'bg-blue-100 dark:bg-blue-900/30',
      border: 'border-blue-700 dark:border-blue-400',
    },
    purple: {
      filled: 'bg-purple-500 dark:bg-purple-600',
      empty: 'bg-purple-100 dark:bg-purple-900/30',
      border: 'border-purple-700 dark:border-purple-400',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className={cn('relative w-full h-6 rounded overflow-hidden border', colors.border)}>
      <div className="flex h-full">
        {Array.from({ length: denominator }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 h-full transition-all duration-300',
              i < numerator ? colors.filled : colors.empty,
              i > 0 && 'border-l',
              colors.border
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const [showVisual, setShowVisual] = useState(false);

  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => answerToIndex(item.correctAnswer),
    passThreshold: 3,
  });

  // Get the selected answer as the original type
  const selectedAnswer = mc.selectedAnswer !== null ? indexToAnswer(mc.selectedAnswer as number) : null;

  if (!isActive) return null;

  const handleCheck = () => {
    mc.check();
    setShowVisual(true);
  };

  const handleNext = () => {
    mc.next();
    setShowVisual(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¿Cuál es Mayor?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Pregunta {mc.currentIndex + 1} de {QUESTIONS.length}
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={QUESTIONS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === answerToIndex(QUESTIONS[i].correctAnswer)
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Strategy hint */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg px-4 py-2 text-center">
            <span className="text-sm text-purple-700 dark:text-purple-300">
              <strong>Estrategia:</strong> {mc.currentItem.strategy}
            </span>
          </div>

          {/* Question */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
              ¿Cuál fracción es mayor?
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              {/* Fraction 1 */}
              <button
                onClick={() => mc.select(0)} // left = 0
                disabled={mc.showFeedback}
                className={cn(
                  'flex flex-col items-center p-4 rounded-xl transition-all min-w-[100px]',
                  selectedAnswer === 'left'
                    ? 'bg-blue-100 dark:bg-blue-900/50 ring-4 ring-blue-400 scale-105'
                    : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600',
                  mc.showFeedback && mc.currentItem.correctAnswer === 'left' && 'ring-4 ring-green-400',
                  mc.showFeedback && selectedAnswer === 'left' && !mc.isCorrect && 'ring-4 ring-red-400'
                )}
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {mc.currentItem.fraction1.num}
                </div>
                <div className="h-1 w-12 bg-gray-400 dark:bg-gray-500 my-1"></div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {mc.currentItem.fraction1.den}
                </div>
              </button>

              {/* Comparison buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => mc.select(1)} // equal = 1
                  disabled={mc.showFeedback}
                  className={cn(
                    'px-4 py-2 rounded-lg font-bold transition-all',
                    selectedAnswer === 'equal'
                      ? 'bg-amber-100 dark:bg-amber-900/50 ring-2 ring-amber-400 text-amber-700 dark:text-amber-300'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300',
                    mc.showFeedback && mc.currentItem.correctAnswer === 'equal' && 'ring-2 ring-green-400',
                    mc.showFeedback && selectedAnswer === 'equal' && !mc.isCorrect && 'ring-2 ring-red-400'
                  )}
                >
                  =
                </button>
              </div>

              {/* Fraction 2 */}
              <button
                onClick={() => mc.select(2)} // right = 2
                disabled={mc.showFeedback}
                className={cn(
                  'flex flex-col items-center p-4 rounded-xl transition-all min-w-[100px]',
                  selectedAnswer === 'right'
                    ? 'bg-purple-100 dark:bg-purple-900/50 ring-4 ring-purple-400 scale-105'
                    : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600',
                  mc.showFeedback && mc.currentItem.correctAnswer === 'right' && 'ring-4 ring-green-400',
                  mc.showFeedback && selectedAnswer === 'right' && !mc.isCorrect && 'ring-4 ring-red-400'
                )}
              >
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {mc.currentItem.fraction2.num}
                </div>
                <div className="h-1 w-12 bg-gray-400 dark:bg-gray-500 my-1"></div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {mc.currentItem.fraction2.den}
                </div>
              </button>
            </div>

            {/* Visual comparison (shown after feedback) */}
            {showVisual && mc.showFeedback && (
              <div className="mt-6 space-y-3 animate-fadeIn max-w-sm mx-auto">
                <div className="space-y-1">
                  <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {mc.currentItem.fraction1.num}/{mc.currentItem.fraction1.den}
                  </div>
                  <FractionBar
                    numerator={mc.currentItem.fraction1.num}
                    denominator={mc.currentItem.fraction1.den}
                    color="blue"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    {mc.currentItem.fraction2.num}/{mc.currentItem.fraction2.den}
                  </div>
                  <FractionBar
                    numerator={mc.currentItem.fraction2.num}
                    denominator={mc.currentItem.fraction2.den}
                    color="purple"
                  />
                </div>
              </div>
            )}
          </div>

          {mc.showFeedback && (
            <FeedbackPanel isCorrect={mc.isCorrect} explanation={mc.currentItem.explanation} />
          )}

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? handleNext : handleCheck}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < QUESTIONS.length - 1
                  ? 'Siguiente'
                  : 'Ver resultados'
                : 'Comprobar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={QUESTIONS.length}
          passed={mc.passed}
          passThreshold={3}
          successMessage="¡Muy bien!"
          successSubtext="Dominas la comparación de fracciones"
          failureSubtext="Sigue practicando las estrategias de comparación"
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === answerToIndex(QUESTIONS[i].correctAnswer)}
          renderItem={(q, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300">
                {q.fraction1.num}/{q.fraction1.den} vs {q.fraction2.num}/{q.fraction2.den}
              </span>
              <span className="text-sm text-purple-600 ml-auto">
                {q.correctAnswer === 'left' ? 'Izquierda' : q.correctAnswer === 'right' ? 'Derecha' : 'Iguales'}
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
