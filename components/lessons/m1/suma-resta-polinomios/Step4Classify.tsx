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

interface ClassifyProblem {
  id: string;
  expression: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const PROBLEMS: ClassifyProblem[] = [
  {
    id: 'c1',
    expression: '(2x + 3) + (4x - 1)',
    options: ['6x + 2', '6x + 4', '8x + 2', '6x - 2'],
    correctIndex: 0,
    explanation: '(2x + 4x) + (3 - 1) = 6x + 2',
  },
  {
    id: 'c2',
    expression: '(5x - 2) - (3x + 4)',
    options: ['2x - 6', '8x - 6', '2x + 2', '2x + 6'],
    correctIndex: 0,
    explanation: '(5x - 3x) + (-2 - 4) = 2x - 6. Recuerda: -(+4) = -4',
  },
  {
    id: 'c3',
    expression: '(x² + 2x) + (3x² - x)',
    options: ['4x² + x', '4x² + 3x', '3x² + x', '4x³ + x'],
    correctIndex: 0,
    explanation: '(x² + 3x²) + (2x - x) = 4x² + x',
  },
  {
    id: 'c4',
    expression: '(4x² - 3x + 1) - (x² + 2x - 5)',
    options: ['3x² - 5x + 6', '3x² - x - 4', '5x² - 5x + 6', '3x² - 5x - 4'],
    correctIndex: 0,
    explanation: '(4x² - x²) + (-3x - 2x) + (1 + 5) = 3x² - 5x + 6',
  },
  {
    id: 'c5',
    expression: '(2x² + 5) + (-x² + 3x - 2)',
    options: ['x² + 3x + 3', '3x² + 3x + 3', 'x² + 3x + 7', 'x² - 3x + 3'],
    correctIndex: 0,
    explanation: '(2x² - x²) + (0 + 3x) + (5 - 2) = x² + 3x + 3',
  },
];

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: PROBLEMS,
    getCorrectAnswer: (item) => item.correctIndex,
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica el Resultado
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Necesitas {REQUIRED_CORRECT} de {PROBLEMS.length} correctas para avanzar
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={PROBLEMS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === PROBLEMS[i].correctIndex
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-center">
              ¿Cuál es el resultado de esta operación?
            </p>
            <p className="text-2xl font-mono font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
              {mc.currentItem.expression}
            </p>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {mc.currentItem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => mc.select(index)}
                  disabled={mc.showFeedback}
                  className={cn(
                    'p-4 rounded-xl font-mono font-bold text-lg transition-all border-2',
                    mc.selectedAnswer === index
                      ? mc.showFeedback
                        ? index === mc.currentItem.correctIndex
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                      : mc.showFeedback && index === mc.currentItem.correctIndex
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-400'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            {mc.showFeedback && (
              <div className="mt-4">
                <FeedbackPanel isCorrect={mc.isCorrect} explanation={mc.currentItem.explanation} />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? mc.next : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < PROBLEMS.length - 1
                  ? 'Siguiente'
                  : 'Ver Resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={PROBLEMS.length}
          passed={mc.passed}
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Felicitaciones!"
          successSubtext="Has demostrado que identificas bien las operaciones"
          failureSubtext="Necesitas 4 respuestas correctas. ¡Puedes intentarlo de nuevo!"
          items={PROBLEMS}
          getIsCorrect={(_, i) => mc.answers[i] === PROBLEMS[i].correctIndex}
          renderItem={(problem, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
                {problem.expression}
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
