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
    system: ['y = 3x - 2', 'x + y = 6'],
    question: '¿Qué variable conviene despejar primero?',
    options: ['x de la primera', 'y de la primera', 'x de la segunda', 'Ninguna, usar otro método'],
    correctAnswer: 1,
    explanation: 'La "y" ya está despejada en la primera ecuación: y = 3x - 2. Podemos sustituir directamente.',
  },
  {
    id: 2,
    system: ['2x + y = 10', '5x + 3y = 27'],
    question: '¿Cuál es la mejor opción para despejar?',
    options: ['x de la primera', 'y de la primera', 'x de la segunda', 'y de la segunda'],
    correctAnswer: 1,
    explanation: 'Despejando "y" de la primera: y = 10 - 2x. El coeficiente de y es 1, mientras que en la segunda ecuación ningún coeficiente es 1.',
  },
  {
    id: 3,
    system: ['x = 5 - y', '3x + 2y = 12'],
    question: '¿Qué debes sustituir en la segunda ecuación?',
    options: ['y por (5 - x)', 'x por (5 - y)', '3x por 12', '2y por x'],
    correctAnswer: 1,
    explanation: 'Como x = 5 - y, sustituimos x por (5 - y) en la segunda: 3(5 - y) + 2y = 12.',
  },
  {
    id: 4,
    system: ['y = 4x - 3', '2x + y = 9'],
    question: 'Si y = 4x - 3, ¿qué ecuación resulta al sustituir en la segunda?',
    options: ['2x + 4x - 3 = 9', '2y + 4x - 3 = 9', '2x + y = 4x - 3', '2(4x - 3) + y = 9'],
    correctAnswer: 0,
    explanation: 'Reemplazamos y por (4x - 3) en 2x + y = 9, obteniendo: 2x + (4x - 3) = 9, que simplifica a 6x - 3 = 9.',
  },
  {
    id: 5,
    system: ['3x + y = 11', '2x + 5y = 18'],
    question: '¿Qué variable es más fácil de despejar?',
    options: ['x de la primera', 'y de la primera', 'x de la segunda', 'y de la segunda'],
    correctAnswer: 1,
    explanation: 'De la primera ecuación: y = 11 - 3x. El coeficiente 1 de y permite despejar sin fracciones. Las otras opciones generarían fracciones.',
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
          Elige la Variable
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Identifica qué variable conviene despejar en cada sistema
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
                        : 'bg-amber-100 dark:bg-amber-900/50 border-amber-500 text-amber-800 dark:text-amber-200'
                      : mc.showFeedback && index === mc.currentItem.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-amber-400 dark:hover:border-amber-500'
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
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
          successSubtext="Sabes elegir la variable correcta para sustituir"
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
