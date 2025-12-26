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

type ExpressionType = 'difference-of-squares' | 'sum-of-squares' | 'not-perfect-squares' | 'trinomial';

interface Expression {
  id: string;
  expression: string;
  correctType: ExpressionType;
  explanation: string;
}

const EXPRESSIONS: Expression[] = [
  {
    id: 'e1',
    expression: 'x² - 36',
    correctType: 'difference-of-squares',
    explanation: 'Es diferencia de cuadrados: x² - 6² = (x + 6)(x - 6)',
  },
  {
    id: 'e2',
    expression: 'x² + 16',
    correctType: 'sum-of-squares',
    explanation: 'Es SUMA de cuadrados. No se puede factorizar con números reales.',
  },
  {
    id: 'e3',
    expression: '4x² - 9',
    correctType: 'difference-of-squares',
    explanation: 'Es diferencia de cuadrados: (2x)² - 3² = (2x + 3)(2x - 3)',
  },
  {
    id: 'e4',
    expression: 'x² - 5',
    correctType: 'not-perfect-squares',
    explanation: '5 no es un cuadrado perfecto (√5 no es entero). No aplica la fórmula estándar.',
  },
  {
    id: 'e5',
    expression: 'x² + 4x + 4',
    correctType: 'trinomial',
    explanation: 'Es un trinomio (tres términos), no una diferencia de cuadrados.',
  },
];

const TYPE_OPTIONS: { id: ExpressionType; label: string; description: string; color: string }[] = [
  {
    id: 'difference-of-squares',
    label: 'a² - b²',
    description: 'Diferencia de cuadrados',
    color: 'green',
  },
  {
    id: 'sum-of-squares',
    label: 'a² + b²',
    description: 'Suma de cuadrados',
    color: 'red',
  },
  {
    id: 'not-perfect-squares',
    label: 'No perfectos',
    description: 'No son cuadrados perfectos',
    color: 'purple',
  },
  {
    id: 'trinomial',
    label: 'Trinomio',
    description: 'Tiene tres términos',
    color: 'blue',
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  green: {
    bg: 'bg-green-100 dark:bg-green-900/50',
    border: 'border-green-500',
    text: 'text-green-700 dark:text-green-300',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-900/50',
    border: 'border-red-500',
    text: 'text-red-700 dark:text-red-300',
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
};

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: EXPRESSIONS,
    getCorrectAnswer: (item) => item.correctType,
    passThreshold: 4,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica el Tipo de Expresión
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Es una diferencia de cuadrados?
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Expresión {mc.currentIndex + 1} de {EXPRESSIONS.length}
            </div>
            <ProgressDots
              items={EXPRESSIONS}
              currentIndex={mc.currentIndex}
              getStatus={(_, i) =>
                mc.answers[i] !== null
                  ? mc.answers[i] === EXPRESSIONS[i].correctType
                    ? 'correct'
                    : 'incorrect'
                  : i === mc.currentIndex
                    ? 'current'
                    : 'pending'
              }
            />
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">¿Qué tipo de expresión es?</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {mc.currentItem.expression}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {TYPE_OPTIONS.map((option) => {
                const colors = colorClasses[option.color];
                const isSelected = mc.selectedAnswer === option.id;
                const isCorrectAnswer = option.id === mc.currentItem.correctType;

                return (
                  <button
                    key={option.id}
                    onClick={() => mc.select(option.id)}
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
          successSubtext="Identificas muy bien las diferencias de cuadrados"
          failureSubtext="Sigue practicando para mejorar"
          items={EXPRESSIONS}
          getIsCorrect={(_, i) => mc.answers[i] === EXPRESSIONS[i].correctType}
          renderItem={(expr, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="font-mono text-gray-700 dark:text-gray-300">{expr.expression}</span>
              <span className="font-mono text-sm text-purple-600 ml-auto">
                {TYPE_OPTIONS.find((c) => c.id === expr.correctType)?.label}
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
