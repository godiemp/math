'use client';

import { Check, X, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

interface ClassifyQuestion {
  id: number;
  system: string[];
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: ClassifyQuestion[] = [
  {
    id: 1,
    system: ['x + 2y = 10', 'x - 2y = 2'],
    question: '¿Qué operación elimina una variable?',
    options: ['Sumar', 'Restar', 'Multiplicar por 2', 'No se puede usar reducción'],
    correctAnswer: 0,
    explanation: 'Los coeficientes de y son +2 y -2 (opuestos). Al sumar, se eliminan: (x + 2y) + (x - 2y) = 2x.',
  },
  {
    id: 2,
    system: ['3x + y = 11', '3x - 2y = 2'],
    question: '¿Qué operación elimina x?',
    options: ['Sumar', 'Restar', 'Multiplicar y sumar', 'Dividir'],
    correctAnswer: 1,
    explanation: 'Los coeficientes de x son iguales (3 y 3). Al restar: (3x + y) - (3x - 2y) = 3y.',
  },
  {
    id: 3,
    system: ['2x + 3y = 12', 'x + y = 5'],
    question: '¿Qué debes hacer para eliminar x?',
    options: ['Sumar directamente', 'Multiplicar la ec.2 por -2 y sumar', 'Restar directamente', 'Multiplicar la ec.1 por 2'],
    correctAnswer: 1,
    explanation: 'Multiplicando ec.2 por -2: -2x - 2y = -10. Sumando con ec.1: y = 2.',
  },
  {
    id: 4,
    system: ['4x - y = 10', '2x - y = 4'],
    question: '¿Qué operación elimina y?',
    options: ['Sumar', 'Restar', 'Multiplicar por -1 y sumar', 'No es posible'],
    correctAnswer: 1,
    explanation: 'Los coeficientes de y son iguales (-1 y -1). Al restar: (4x - y) - (2x - y) = 2x.',
  },
  {
    id: 5,
    system: ['x + y = 6', '2x + 2y = 12'],
    question: '¿Qué pasa con este sistema?',
    options: ['Tiene una solución única', 'No tiene solución', 'Tiene infinitas soluciones', 'Hay que multiplicar primero'],
    correctAnswer: 2,
    explanation: 'La ec.2 es el doble de la ec.1. Son la misma recta, por lo que hay infinitas soluciones.',
  },
];

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¿Sumar o Restar?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Determina qué operación elimina una variable
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={QUESTIONS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === QUESTIONS[i].correctAnswer
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Question card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* System display */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl px-6 py-4">
                {mc.currentItem.system.map((eq, i) => (
                  <p key={i} className="font-mono text-lg text-gray-800 dark:text-gray-200">
                    {eq}
                  </p>
                ))}
              </div>
            </div>

            <p className="text-center text-gray-700 dark:text-gray-300 font-semibold mb-4">
              {mc.currentItem.question}
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mc.currentItem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => mc.select(index)}
                  disabled={mc.showFeedback}
                  className={cn(
                    'p-4 rounded-xl text-center font-medium transition-all border-2',
                    mc.selectedAnswer === index
                      ? mc.showFeedback
                        ? index === mc.currentItem.correctAnswer
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-violet-100 dark:bg-violet-900/50 border-violet-500 text-violet-800 dark:text-violet-200'
                      : mc.showFeedback && index === mc.currentItem.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-violet-400 dark:hover:border-violet-500'
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    {option === 'Sumar' && <Plus size={18} className="text-green-500" />}
                    {option === 'Restar' && <Minus size={18} className="text-red-500" />}
                    {mc.showFeedback && index === mc.currentItem.correctAnswer && (
                      <Check size={18} className="text-green-500" />
                    )}
                    {mc.showFeedback && mc.selectedAnswer === index && index !== mc.currentItem.correctAnswer && (
                      <X size={18} className="text-red-500" />
                    )}
                    <span className="text-gray-800 dark:text-gray-200">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {mc.showFeedback && (
              <div className="mt-6">
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
                ? mc.currentIndex < QUESTIONS.length - 1
                  ? 'Siguiente'
                  : 'Ver Resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={QUESTIONS.length}
          passed={mc.passed}
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Excelente!"
          successSubtext="Sabes identificar la operación correcta"
          failureSubtext="Necesitas 4 respuestas correctas. ¡Inténtalo de nuevo!"
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === QUESTIONS[i].correctAnswer}
          renderItem={(q, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                {q.question}
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
