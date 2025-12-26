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

type SignCase = 'both-positive' | 'both-negative' | 'mixed-positive' | 'mixed-negative';

interface Expression {
  id: string;
  expression: string;
  b: number;
  c: number;
  correctCase: SignCase;
  explanation: string;
}

const EXPRESSIONS: Expression[] = [
  {
    id: 'e1',
    expression: 'x² + 6x + 8',
    b: 6,
    c: 8,
    correctCase: 'both-positive',
    explanation: 'b=6 (positivo), c=8 (positivo) → ambos números son positivos: (x+2)(x+4)',
  },
  {
    id: 'e2',
    expression: 'x² - 5x + 6',
    b: -5,
    c: 6,
    correctCase: 'both-negative',
    explanation: 'b=-5 (negativo), c=6 (positivo) → ambos números son negativos: (x-2)(x-3)',
  },
  {
    id: 'e3',
    expression: 'x² + x - 12',
    b: 1,
    c: -12,
    correctCase: 'mixed-positive',
    explanation: 'b=1 (positivo), c=-12 (negativo) → signos diferentes, el positivo mayor: (x+4)(x-3)',
  },
  {
    id: 'e4',
    expression: 'x² - 3x - 10',
    b: -3,
    c: -10,
    correctCase: 'mixed-negative',
    explanation: 'b=-3 (negativo), c=-10 (negativo) → signos diferentes, el negativo mayor: (x-5)(x+2)',
  },
  {
    id: 'e5',
    expression: 'x² + 11x + 24',
    b: 11,
    c: 24,
    correctCase: 'both-positive',
    explanation: 'b=11 (positivo), c=24 (positivo) → ambos números son positivos: (x+3)(x+8)',
  },
];

const CASE_OPTIONS: { id: SignCase; label: string; description: string; color: string }[] = [
  {
    id: 'both-positive',
    label: '(+)(+)',
    description: 'Ambos positivos',
    color: 'green',
  },
  {
    id: 'both-negative',
    label: '(-)(‑)',
    description: 'Ambos negativos',
    color: 'purple',
  },
  {
    id: 'mixed-positive',
    label: '(+)(-) mayor +',
    description: 'Diferentes, + mayor',
    color: 'blue',
  },
  {
    id: 'mixed-negative',
    label: '(+)(-) mayor -',
    description: 'Diferentes, - mayor',
    color: 'pink',
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  green: {
    bg: 'bg-green-100 dark:bg-green-900/50',
    border: 'border-green-500',
    text: 'text-green-700 dark:text-green-300',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/50',
    border: 'border-purple-500',
    text: 'text-purple-700 dark:text-purple-300',
  },
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/50',
    border: 'border-blue-500',
    text: 'text-blue-700 dark:text-blue-300',
  },
  pink: {
    bg: 'bg-pink-100 dark:bg-pink-900/50',
    border: 'border-pink-500',
    text: 'text-pink-700 dark:text-pink-300',
  },
};

// Map SignCase to index for useMultipleChoice
const caseToIndex = (caseId: SignCase): number => CASE_OPTIONS.findIndex(o => o.id === caseId);

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: EXPRESSIONS,
    getCorrectAnswer: (item) => caseToIndex(item.correctCase),
    passThreshold: 4,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica el Caso de Signos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Determina qué signos tendrán los factores
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={EXPRESSIONS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === caseToIndex(EXPRESSIONS[i].correctCase)
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Expression card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">¿Qué signos tendrán p y q?</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {mc.currentItem.expression}
              </p>
            </div>

            {/* Show b and c values */}
            <div className="flex justify-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-amber-200 dark:border-amber-600 text-center">
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
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-green-200 dark:border-green-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">c =</span>
                <span
                  className={cn(
                    'font-mono text-xl font-bold ml-2',
                    mc.currentItem.c > 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {mc.currentItem.c > 0 ? '+' : ''}
                  {mc.currentItem.c}
                </span>
              </div>
            </div>

            {/* Case options */}
            <div className="grid grid-cols-2 gap-4">
              {CASE_OPTIONS.map((option, index) => {
                const colors = colorClasses[option.color];
                const isSelected = mc.selectedAnswer === index;
                const isCorrectAnswer = index === caseToIndex(mc.currentItem.correctCase);

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
                    <div className="flex flex-col items-center gap-1">
                      {mc.showFeedback && isCorrectAnswer && <Check size={18} className="text-green-600" />}
                      {mc.showFeedback && isSelected && !isCorrectAnswer && (
                        <X size={18} className="text-red-600" />
                      )}
                      <span
                        className={cn(
                          'font-semibold font-mono',
                          isSelected && !mc.showFeedback ? colors.text : 'text-gray-700 dark:text-gray-300'
                        )}
                      >
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{option.description}</span>
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
          passThreshold={4}
          successMessage="¡Excelente!"
          successSubtext="Identificas muy bien los casos de signos"
          failureSubtext="Sigue practicando para mejorar"
          items={EXPRESSIONS}
          getIsCorrect={(_, i) => mc.answers[i] === caseToIndex(EXPRESSIONS[i].correctCase)}
          renderItem={(expr, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="font-mono text-gray-700 dark:text-gray-300">{expr.expression}</span>
              <span className="font-mono text-sm text-purple-600 ml-auto">
                {CASE_OPTIONS.find((c) => c.id === expr.correctCase)?.label}
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
