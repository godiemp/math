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
    system: ['y = 2x + 1', 'y = -x + 7'],
    question: '¿Qué expresiones debes igualar?',
    options: ['2x + 1 = -x + 7', 'y = y', '2x = -x', '1 = 7'],
    correctAnswer: 0,
    explanation: 'Como ambas expresiones son iguales a y, igualamos: 2x + 1 = -x + 7.',
  },
  {
    id: 2,
    system: ['x + y = 8', '2x - y = 7'],
    question: '¿Qué variable conviene despejar en ambas ecuaciones?',
    options: ['Solo x de la primera', 'Solo y de la segunda', 'y de ambas', 'x de ambas'],
    correctAnswer: 2,
    explanation: 'Despejando y: y = 8 - x y y = 2x - 7. Así podemos igualar las expresiones fácilmente.',
  },
  {
    id: 3,
    system: ['y = 4x', 'y = x + 6'],
    question: 'Si igualamos 4x = x + 6, ¿cuánto vale x?',
    options: ['x = 1', 'x = 2', 'x = 3', 'x = 6'],
    correctAnswer: 1,
    explanation: '4x = x + 6 → 4x - x = 6 → 3x = 6 → x = 2.',
  },
  {
    id: 4,
    system: ['y = x + 2', 'y = 3x - 4'],
    question: '¿Por qué este sistema es ideal para igualación?',
    options: ['Ambas ecuaciones ya tienen y despejada', 'Los coeficientes son opuestos', 'No tiene solución', 'Solo funciona sustitución'],
    correctAnswer: 0,
    explanation: 'Ambas ecuaciones ya tienen y despejada, así que podemos igualar directamente: x + 2 = 3x - 4 → x = 3, y = 5.',
  },
  {
    id: 5,
    system: ['x = 3y - 1', 'x = y + 5'],
    question: '¿Cuál es el valor de y si igualamos estas expresiones?',
    options: ['y = 2', 'y = 3', 'y = 4', 'y = 6'],
    correctAnswer: 1,
    explanation: '3y - 1 = y + 5 → 3y - y = 5 + 1 → 2y = 6 → y = 3.',
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
          Identifica las Expresiones
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Determina qué expresiones igualar en cada sistema
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
                        : 'bg-cyan-100 dark:bg-cyan-900/50 border-cyan-500 text-cyan-800 dark:text-cyan-200'
                      : mc.showFeedback && index === mc.currentItem.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-cyan-400 dark:hover:border-cyan-500'
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    {mc.showFeedback && index === mc.currentItem.correctAnswer && (
                      <Check size={18} className="text-green-500" />
                    )}
                    {mc.showFeedback && mc.selectedAnswer === index && index !== mc.currentItem.correctAnswer && (
                      <X size={18} className="text-red-500" />
                    )}
                    <span className="text-gray-800 dark:text-gray-200 font-mono">{option}</span>
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
          successSubtext="Sabes identificar las expresiones a igualar"
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
