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
  scenario: string;
  useMultiplication: boolean;
  explanation: string;
  alternativeMethod?: string;
}

const ITEMS: ClassificationItem[] = [
  {
    id: '1',
    scenario: 'Tienes 5 camisas y 3 pantalones. ¿Cuántos conjuntos puedes formar?',
    useMultiplication: true,
    explanation: 'Sí, se multiplica: 5 × 3 = 15 conjuntos. Cada camisa puede combinarse con cada pantalón.',
  },
  {
    id: '2',
    scenario: 'Tienes 4 manzanas y 6 naranjas. ¿Cuántas frutas tienes en total?',
    useMultiplication: false,
    explanation: 'No, se suma: 4 + 6 = 10 frutas. Aquí cuentas elementos, no combinaciones.',
    alternativeMethod: 'Suma',
  },
  {
    id: '3',
    scenario: 'Un código tiene 2 letras seguidas de 3 números. ¿Cuántos códigos son posibles?',
    useMultiplication: true,
    explanation: 'Sí, se multiplica: 26 × 26 × 10 × 10 × 10 = 676,000 códigos. Cada posición es independiente.',
  },
  {
    id: '4',
    scenario: 'En una clase hay 12 niños y 15 niñas. ¿Cuántos estudiantes hay?',
    useMultiplication: false,
    explanation: 'No, se suma: 12 + 15 = 27 estudiantes. Cuentas el total de personas, no combinaciones.',
    alternativeMethod: 'Suma',
  },
  {
    id: '5',
    scenario: 'Una pizzería ofrece 3 tamaños, 4 masas y 8 ingredientes. ¿Cuántas pizzas diferentes puedes pedir?',
    useMultiplication: true,
    explanation: 'Sí, se multiplica: 3 × 4 × 8 = 96 pizzas. Cada elección es independiente de las otras.',
  },
];

const ANSWER_OPTIONS = [
  { label: 'Sí, multiplicar', symbol: '×' },
  { label: 'No, otro método', symbol: '+' },
];

// Map boolean answer to index
const answerToIndex = (useMultiplication: boolean): number => {
  return useMultiplication ? 0 : 1;
};

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: ITEMS,
    getCorrectAnswer: (item) => answerToIndex(item.useMultiplication),
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¿Multiplicar o No?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Identifica cuándo usar el principio multiplicativo
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={ITEMS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === answerToIndex(ITEMS[i].useMultiplication)
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Scenario card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-3">¿Se resuelve multiplicando?</p>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {mc.currentItem.scenario}
                </p>
              </div>
            </div>

            {/* Answer buttons */}
            {!mc.showFeedback && (
              <div className="flex justify-center gap-4">
                {ANSWER_OPTIONS.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      mc.select(index);
                      // Auto-check since this is a binary choice
                      setTimeout(() => mc.check(), 0);
                    }}
                    className={cn(
                      'px-8 py-4 rounded-xl font-semibold transition-all border-2',
                      index === 0
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 hover:bg-green-200 dark:hover:bg-green-900/50'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                    )}
                  >
                    <span className="text-2xl block mb-1">{option.symbol}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {/* Feedback */}
            {mc.showFeedback && (
              <div className="space-y-4 animate-fadeIn">
                <FeedbackPanel
                  isCorrect={mc.isCorrect}
                  explanation={
                    mc.currentItem.alternativeMethod
                      ? `${mc.currentItem.explanation}\n\nMétodo correcto: ${mc.currentItem.alternativeMethod}`
                      : mc.currentItem.explanation
                  }
                />

                <div className="flex justify-center">
                  <ActionButton onClick={mc.next}>
                    {mc.currentIndex < ITEMS.length - 1 ? 'Siguiente' : 'Ver resultados'}
                  </ActionButton>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <ResultsSummary
            correctCount={mc.correctCount}
            totalCount={ITEMS.length}
            passed={mc.passed}
            passThreshold={REQUIRED_CORRECT}
            successMessage="¡Excelente trabajo!"
            successSubtext="Identificas correctamente cuándo usar el principio multiplicativo"
            failureSubtext="Necesitas 4 respuestas correctas para continuar"
            items={ITEMS}
            getIsCorrect={(_, i) => mc.answers[i] === answerToIndex(ITEMS[i].useMultiplication)}
            renderItem={(item, i, isCorrect) => (
              <>
                {isCorrect ? (
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 pr-4">
                  {item.scenario.substring(0, 50)}...
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {item.useMultiplication ? '× Multiplicar' : '+ Sumar'}
                </span>
              </>
            )}
            onRetry={mc.reset}
            onContinue={onComplete}
          />

          {/* Key takeaway */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
            <p className="text-purple-800 dark:text-purple-200 text-center font-medium">
              <strong>Recuerda:</strong> Multiplica cuando combinas opciones independientes.
              <br />
              Suma cuando cuentas elementos de un grupo.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
