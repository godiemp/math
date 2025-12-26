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

type FactorType = 'numeric' | 'variable' | 'combined' | 'none';

interface Expression {
  id: string;
  expression: string;
  correctFactor: string;
  correctType: FactorType;
  explanation: string;
}

const EXPRESSIONS: Expression[] = [
  {
    id: 'e1',
    expression: '8x + 12',
    correctFactor: '4',
    correctType: 'numeric',
    explanation: 'El MCD de 8 y 12 es 4. Resultado: 4(2x + 3)',
  },
  {
    id: 'e2',
    expression: 'x³ + x²',
    correctFactor: 'x²',
    correctType: 'variable',
    explanation: 'Ambos términos tienen x², la menor potencia común. Resultado: x²(x + 1)',
  },
  {
    id: 'e3',
    expression: '6a²b + 9ab²',
    correctFactor: '3ab',
    correctType: 'combined',
    explanation: 'MCD(6,9)=3, menor potencia de a es a¹, menor de b es b¹. Resultado: 3ab(2a + 3b)',
  },
  {
    id: 'e4',
    expression: 'x + 7',
    correctFactor: '1',
    correctType: 'none',
    explanation: 'x y 7 no tienen factores comunes (excepto 1). No se puede factorizar.',
  },
  {
    id: 'e5',
    expression: '15x²y + 20xy²',
    correctFactor: '5xy',
    correctType: 'combined',
    explanation: 'MCD(15,20)=5, x y y aparecen en ambos con potencia mínima 1. Resultado: 5xy(3x + 4y)',
  },
];

const TYPE_OPTIONS: { id: FactorType; label: string; description: string; color: string }[] = [
  { id: 'numeric', label: 'Número', description: 'Solo número', color: 'blue' },
  { id: 'variable', label: 'Variable', description: 'Solo variable(s)', color: 'purple' },
  { id: 'combined', label: 'Combinado', description: 'Número + variable', color: 'teal' },
  { id: 'none', label: 'Sin factor', description: 'No factorizable', color: 'gray' },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/50', border: 'border-blue-500', text: 'text-blue-700 dark:text-blue-300' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-900/50', border: 'border-purple-500', text: 'text-purple-700 dark:text-purple-300' },
  teal: { bg: 'bg-teal-100 dark:bg-teal-900/50', border: 'border-teal-500', text: 'text-teal-700 dark:text-teal-300' },
  gray: { bg: 'bg-gray-100 dark:bg-gray-900/50', border: 'border-gray-500', text: 'text-gray-700 dark:text-gray-300' },
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
          Identifica el Tipo de Factor
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Clasifica cada expresión según su factor común
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
            <div className="text-center mb-8">
              <p className="text-gray-500 dark:text-gray-400 mb-2">¿Qué tipo de factor común tiene?</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {mc.currentItem.expression}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {TYPE_OPTIONS.map((option) => {
                const optionColors = colorClasses[option.color];
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
                          : `${optionColors.bg} ${optionColors.border}`
                        : mc.showFeedback && isCorrectAnswer
                          ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-400'
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {mc.showFeedback && isCorrectAnswer && (
                        <Check size={18} className="text-green-600" />
                      )}
                      {mc.showFeedback && isSelected && !isCorrectAnswer && (
                        <X size={18} className="text-red-600" />
                      )}
                      <span className={cn(
                        'font-semibold',
                        isSelected && !mc.showFeedback ? optionColors.text : 'text-gray-700 dark:text-gray-300'
                      )}>
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {option.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {mc.showFeedback && (
            <FeedbackPanel
              isCorrect={mc.isCorrect}
              explanation={`Factor común: ${mc.currentItem.correctFactor}. ${mc.currentItem.explanation}`}
            />
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
          successSubtext="Identificas muy bien los tipos de factor común"
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
                {expr.correctFactor}
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
