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
import { MathText } from '@/components/math/MathDisplay';

type ResultType = '1' | 'positive-fraction' | 'negative-fraction' | 'whole-number';

interface Expression {
  id: string;
  expression: string;
  correctType: ResultType;
  explanation: string;
}

const EXPRESSIONS: Expression[] = [
  {
    id: 'e1',
    expression: '$8^0$',
    correctType: '1',
    explanation: 'Cualquier número distinto de cero elevado a 0 es igual a 1.',
  },
  {
    id: 'e2',
    expression: '$3^{-2}$',
    correctType: 'positive-fraction',
    explanation: '$3^{-2} = \\frac{1}{3^2} = \\frac{1}{9}$, que es una fracción positiva.',
  },
  {
    id: 'e3',
    expression: '$(-4)^0$',
    correctType: '1',
    explanation: 'Incluso con base negativa, cualquier número $\\neq 0$ elevado a 0 es 1.',
  },
  {
    id: 'e4',
    expression: '$5^{-1}$',
    correctType: 'positive-fraction',
    explanation: '$5^{-1} = \\frac{1}{5}$, que es una fracción positiva.',
  },
  {
    id: 'e5',
    expression: '$\\left(\\frac{1}{2}\\right)^{-1}$',
    correctType: 'whole-number',
    explanation: '$\\left(\\frac{1}{2}\\right)^{-1} = \\frac{2}{1} = 2$. El exponente negativo invierte la fracción.',
  },
];

const TYPE_OPTIONS: { id: ResultType; label: string; color: string }[] = [
  { id: '1', label: 'Igual a 1', color: 'blue' },
  { id: 'positive-fraction', label: 'Fracción positiva', color: 'purple' },
  { id: 'whole-number', label: 'Número entero > 1', color: 'teal' },
  { id: 'negative-fraction', label: 'Fracción negativa', color: 'pink' },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/50',
    border: 'border-blue-500',
    text: 'text-blue-700 dark:text-blue-300',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/50',
    border: 'border-purple-500',
    text: 'text-purple-700 dark:text-purple-300',
  },
  teal: {
    bg: 'bg-teal-100 dark:bg-teal-900/50',
    border: 'border-teal-500',
    text: 'text-teal-700 dark:text-teal-300',
  },
  pink: {
    bg: 'bg-pink-100 dark:bg-pink-900/50',
    border: 'border-pink-500',
    text: 'text-pink-700 dark:text-pink-300',
  },
};

// Map string answer to index
const answerToIndex = (answer: ResultType): number => {
  return TYPE_OPTIONS.findIndex((opt) => opt.id === answer);
};

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: EXPRESSIONS,
    getCorrectAnswer: (item) => answerToIndex(item.correctType),
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica el Resultado
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Qué tipo de resultado produce cada potencia?
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={EXPRESSIONS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === answerToIndex(EXPRESSIONS[i].correctType)
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Expression card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <p className="text-gray-500 dark:text-gray-400 mb-2">¿Qué tipo de resultado da?</p>
              <p className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                <MathText content={mc.currentItem.expression} />
              </p>
            </div>

            {/* Type options */}
            <div className="grid grid-cols-2 gap-4">
              {TYPE_OPTIONS.map((option, index) => {
                const colors = colorClasses[option.color];
                const isSelected = mc.selectedAnswer === index;
                const isCorrectAnswer = index === answerToIndex(mc.currentItem.correctType);

                return (
                  <button
                    key={option.id}
                    onClick={() => mc.select(index)}
                    disabled={mc.showFeedback}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all font-medium',
                      isSelected
                        ? mc.showFeedback
                          ? isCorrectAnswer
                            ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                            : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                          : `${colors.bg} ${colors.border}`
                        : mc.showFeedback && isCorrectAnswer
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-400'
                    )}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {mc.showFeedback && isCorrectAnswer && (
                        <Check size={18} className="text-green-600" />
                      )}
                      {mc.showFeedback && isSelected && !isCorrectAnswer && (
                        <X size={18} className="text-red-600" />
                      )}
                      <span
                        className={cn(
                          'font-semibold',
                          isSelected && !mc.showFeedback
                            ? colors.text
                            : 'text-gray-700 dark:text-gray-300'
                        )}
                      >
                        {option.label}
                      </span>
                    </div>
                  </button>
                );
              })}
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
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Excelente!"
          successSubtext="Clasificas correctamente los resultados de potencias"
          failureSubtext="Sigue practicando las potencias"
          items={EXPRESSIONS}
          getIsCorrect={(_, i) => mc.answers[i] === answerToIndex(EXPRESSIONS[i].correctType)}
          renderItem={(expr, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300"><MathText content={expr.expression} /></span>
              <span className="text-sm text-purple-600 ml-auto">
                {TYPE_OPTIONS.find((t) => t.id === expr.correctType)?.label}
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
