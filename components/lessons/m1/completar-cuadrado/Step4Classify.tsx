'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  OptionButton,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

interface Expression {
  id: string;
  expression: string;
  b: number;
  halfB: number;
  halfBSquared: number;
  correctAnswer: number;
  options: string[];
  explanation: string;
}

const EXPRESSIONS: Expression[] = [
  {
    id: 'e1',
    expression: 'x² + 10x + 7',
    b: 10,
    halfB: 5,
    halfBSquared: 25,
    correctAnswer: 0,
    options: ['(x + 5)² - 18', '(x + 5)² + 18', '(x + 10)² - 18', '(x + 5)² - 7'],
    explanation: 'b = 10, b/2 = 5, (b/2)² = 25. Resultado: (x + 5)² + (7 - 25) = (x + 5)² - 18',
  },
  {
    id: 'e2',
    expression: 'x² - 4x + 1',
    b: -4,
    halfB: -2,
    halfBSquared: 4,
    correctAnswer: 1,
    options: ['(x + 2)² - 3', '(x - 2)² - 3', '(x - 2)² + 3', '(x - 4)² - 3'],
    explanation: 'b = -4, b/2 = -2, (b/2)² = 4. Resultado: (x - 2)² + (1 - 4) = (x - 2)² - 3',
  },
  {
    id: 'e3',
    expression: 'x² + 6x + 11',
    b: 6,
    halfB: 3,
    halfBSquared: 9,
    correctAnswer: 2,
    options: ['(x + 3)² - 2', '(x + 6)² + 2', '(x + 3)² + 2', '(x + 3)² + 11'],
    explanation: 'b = 6, b/2 = 3, (b/2)² = 9. Resultado: (x + 3)² + (11 - 9) = (x + 3)² + 2',
  },
  {
    id: 'e4',
    expression: 'x² - 8x + 12',
    b: -8,
    halfB: -4,
    halfBSquared: 16,
    correctAnswer: 0,
    options: ['(x - 4)² - 4', '(x - 4)² + 4', '(x + 4)² - 4', '(x - 8)² - 4'],
    explanation: 'b = -8, b/2 = -4, (b/2)² = 16. Resultado: (x - 4)² + (12 - 16) = (x - 4)² - 4',
  },
  {
    id: 'e5',
    expression: 'x² + 2x - 5',
    b: 2,
    halfB: 1,
    halfBSquared: 1,
    correctAnswer: 3,
    options: ['(x + 1)² + 6', '(x + 2)² - 6', '(x + 1)² - 5', '(x + 1)² - 6'],
    explanation: 'b = 2, b/2 = 1, (b/2)² = 1. Resultado: (x + 1)² + (-5 - 1) = (x + 1)² - 6',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: EXPRESSIONS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 4,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica el Cuadrado Completo
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Selecciona la forma correcta después de completar el cuadrado
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={EXPRESSIONS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === EXPRESSIONS[i].correctAnswer
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Expression card - unique content for this lesson */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Completa el cuadrado:</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {mc.currentItem.expression}
              </p>
            </div>

            {/* Show b values */}
            <div className="flex justify-center gap-6 mb-6 flex-wrap">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-blue-200 dark:border-blue-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">b =</span>
                <span
                  className={cn(
                    'font-mono text-xl font-bold ml-2',
                    mc.currentItem.b > 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {mc.currentItem.b > 0 ? '+' : ''}
                  {mc.currentItem.b}
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-purple-200 dark:border-purple-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">b/2 =</span>
                <span
                  className={cn(
                    'font-mono text-xl font-bold ml-2',
                    mc.currentItem.halfB > 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {mc.currentItem.halfB > 0 ? '+' : ''}
                  {mc.currentItem.halfB}
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-green-200 dark:border-green-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">(b/2)² =</span>
                <span className="font-mono text-xl text-green-600 font-bold ml-2">
                  {mc.currentItem.halfBSquared}
                </span>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mc.currentItem.options.map((option, index) => (
                <OptionButton
                  key={index}
                  label={option}
                  index={index}
                  isSelected={mc.selectedAnswer === index}
                  isCorrect={index === mc.currentItem.correctAnswer}
                  showFeedback={mc.showFeedback}
                  onClick={() => mc.select(index)}
                  isMono
                />
              ))}
            </div>
          </div>

          {mc.showFeedback && (
            <FeedbackPanel isCorrect={mc.isCorrect} explanation={mc.currentItem.explanation} />
          )}

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? mc.next : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < EXPRESSIONS.length - 1
                  ? 'Siguiente'
                  : 'Ver Resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={EXPRESSIONS.length}
          passed={mc.passed}
          passThreshold={4}
          successMessage="¡Excelente!"
          successSubtext="Identificas muy bien los cuadrados completos"
          failureSubtext="Sigue practicando para mejorar"
          items={EXPRESSIONS}
          getIsCorrect={(_, i) => mc.answers[i] === EXPRESSIONS[i].correctAnswer}
          renderItem={(expr, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="font-mono text-gray-700 dark:text-gray-300">{expr.expression}</span>
              <span className="font-mono text-sm text-purple-600 ml-auto">
                {expr.options[expr.correctAnswer]}
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
