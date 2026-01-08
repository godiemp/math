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

interface ClassifyItem {
  id: string;
  number: string;
  correctAnswer: 'valid' | 'invalid-coefficient';
  explanation: string;
}

const ITEMS: ClassifyItem[] = [
  {
    id: '1',
    number: '$3.5 \\times 10^4$',
    correctAnswer: 'valid',
    explanation: '¡Correcto! El coeficiente 3.5 está entre 1 y 10, y el exponente es un entero.',
  },
  {
    id: '2',
    number: '$15 \\times 10^3$',
    correctAnswer: 'invalid-coefficient',
    explanation: 'El coeficiente 15 es mayor que 10. Debería ser $1.5 \\times 10^4$.',
  },
  {
    id: '3',
    number: '$7.02 \\times 10^{-5}$',
    correctAnswer: 'valid',
    explanation: '¡Correcto! 7.02 está entre 1 y 10, y el exponente negativo es válido.',
  },
  {
    id: '4',
    number: '$0.8 \\times 10^6$',
    correctAnswer: 'invalid-coefficient',
    explanation: 'El coeficiente 0.8 es menor que 1. Debería ser $8 \\times 10^5$.',
  },
  {
    id: '5',
    number: '$9.99 \\times 10^{-2}$',
    correctAnswer: 'valid',
    explanation: '¡Correcto! 9.99 está entre 1 y 10 (justo en el límite pero válido).',
  },
];

const ANSWER_OPTIONS = [
  { id: 'valid', label: '✓ Válida', color: 'green' },
  { id: 'invalid-coefficient', label: '✗ Coeficiente incorrecto', color: 'red' },
];

// Map string answer to index
const answerToIndex = (answer: 'valid' | 'invalid-coefficient'): number => {
  return answer === 'valid' ? 0 : 1;
};

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: ITEMS,
    getCorrectAnswer: (item) => answerToIndex(item.correctAnswer),
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica la Notación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Está correctamente escrita en notación científica?
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={ITEMS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === answerToIndex(ITEMS[i].correctAnswer)
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Number display */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                ¿Esta expresión está en notación científica correcta?
              </p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                <MathText content={mc.currentItem.number} />
              </p>
            </div>

            {/* Options */}
            <div className="grid gap-3">
              {ANSWER_OPTIONS.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => mc.select(index)}
                  disabled={mc.showFeedback}
                  className={cn(
                    'w-full p-4 rounded-xl text-left font-medium transition-all border-2',
                    mc.selectedAnswer === index
                      ? mc.showFeedback
                        ? index === answerToIndex(mc.currentItem.correctAnswer)
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                        : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500'
                      : mc.showFeedback && index === answerToIndex(mc.currentItem.correctAnswer)
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      option.color === 'green'
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                    )}>
                      {option.color === 'green' ? <Check size={16} /> : <X size={16} />}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Reminder card */}
          {!mc.showFeedback && (
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Recuerda:</strong> En notación científica válida, el coeficiente debe ser ≥ 1 y &lt; 10
              </p>
            </div>
          )}

          {mc.showFeedback && (
            <FeedbackPanel isCorrect={mc.isCorrect} explanation={mc.currentItem.explanation} />
          )}

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? mc.next : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < ITEMS.length - 1
                  ? 'Siguiente'
                  : 'Ver resultados'
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
          successMessage="¡Excelente!"
          successSubtext="Dominas la identificación de notación científica"
          failureSubtext="Necesitas 4 respuestas correctas"
          items={ITEMS}
          getIsCorrect={(_, i) => mc.answers[i] === answerToIndex(ITEMS[i].correctAnswer)}
          renderItem={(item, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300"><MathText content={item.number} /></span>
              <span className="text-sm text-purple-600 ml-auto">
                {item.correctAnswer === 'valid' ? '✓ Válida' : '✗ Inválida'}
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
