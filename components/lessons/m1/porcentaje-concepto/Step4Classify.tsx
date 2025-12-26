'use client';

import { useMemo } from 'react';
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

interface Expression {
  id: string;
  expression: string;
  correctValue: number;
  options: number[];
  explanation: string;
}

const EXPRESSIONS: Expression[] = [
  {
    id: 'e1',
    expression: '10% de 50',
    correctValue: 5,
    options: [5, 10, 15, 50],
    explanation: '10% de 50 = 50 ÷ 10 = 5 (10% es la décima parte)',
  },
  {
    id: 'e2',
    expression: '50% de 120',
    correctValue: 60,
    options: [24, 60, 70, 100],
    explanation: '50% de 120 = 120 ÷ 2 = 60 (50% es la mitad)',
  },
  {
    id: 'e3',
    expression: '25% de 80',
    correctValue: 20,
    options: [8, 16, 20, 40],
    explanation: '25% de 80 = 80 ÷ 4 = 20 (25% es un cuarto)',
  },
  {
    id: 'e4',
    expression: '20% de 150',
    correctValue: 30,
    options: [15, 20, 30, 75],
    explanation: '20% de 150 = 150 ÷ 5 = 30 (20% es un quinto)',
  },
  {
    id: 'e5',
    expression: '100% de 45',
    correctValue: 45,
    options: [0, 45, 90, 100],
    explanation: '100% de 45 = 45 (100% es el total completo)',
  },
];

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  // Create a map from expression id to the correct option index
  const correctAnswerMap = useMemo(() => {
    const map: Record<string, number> = {};
    EXPRESSIONS.forEach((expr) => {
      map[expr.id] = expr.options.indexOf(expr.correctValue);
    });
    return map;
  }, []);

  const mc = useMultipleChoice({
    items: EXPRESSIONS,
    getCorrectAnswer: (item) => correctAnswerMap[item.id],
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica el Valor
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Calcula el resultado de cada porcentaje
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={EXPRESSIONS}
            currentIndex={mc.currentIndex}
            getStatus={(item, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === correctAnswerMap[item.id]
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
              <p className="text-gray-500 dark:text-gray-400 mb-2">¿Cuánto es?</p>
              <p className="font-mono text-4xl font-bold text-gray-800 dark:text-gray-200">
                {mc.currentItem.expression}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {mc.currentItem.options.map((option, index) => {
                const isSelected = mc.selectedAnswer === index;
                const isCorrectAnswer = option === mc.currentItem.correctValue;

                return (
                  <button
                    key={option}
                    onClick={() => mc.select(index)}
                    disabled={mc.showFeedback}
                    className={cn(
                      'p-6 rounded-xl border-2 transition-all font-mono text-2xl font-bold',
                      isSelected
                        ? mc.showFeedback
                          ? isCorrectAnswer
                            ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                            : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                          : 'bg-amber-100 dark:bg-amber-900/50 border-amber-500 text-amber-800 dark:text-amber-200'
                        : mc.showFeedback && isCorrectAnswer
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-400 text-green-700'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-400 text-gray-700 dark:text-gray-300'
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {mc.showFeedback && isCorrectAnswer && (
                        <Check size={18} className="text-green-600" />
                      )}
                      {mc.showFeedback && isSelected && !isCorrectAnswer && (
                        <X size={18} className="text-red-600" />
                      )}
                      <span>{option}</span>
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
          successSubtext="Calculas muy bien los porcentajes"
          failureSubtext="Sigue practicando para mejorar"
          items={EXPRESSIONS}
          getIsCorrect={(item, i) => mc.answers[i] === correctAnswerMap[item.id]}
          renderItem={(expr, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="font-mono text-gray-700 dark:text-gray-300">{expr.expression}</span>
              <span className="font-mono text-sm text-purple-600 font-bold ml-auto">
                = {expr.correctValue}
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
