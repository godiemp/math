'use client';

import { ArrowUp, ArrowDown, Check, X } from 'lucide-react';
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
  id: string;
  magnitude: string;
  target: string;
  correctAnswer: 'direct' | 'inverse';
  explanation: string;
}

const QUESTIONS: ClassifyQuestion[] = [
  {
    id: '1',
    magnitude: 'Número de obreros',
    target: 'Tiempo para terminar una obra',
    correctAnswer: 'inverse',
    explanation: 'Más obreros = menos tiempo. Son inversamente proporcionales.',
  },
  {
    id: '2',
    magnitude: 'Horas de trabajo por día',
    target: 'Producción total',
    correctAnswer: 'direct',
    explanation: 'Más horas = más producción. Son directamente proporcionales.',
  },
  {
    id: '3',
    magnitude: 'Velocidad de un auto',
    target: 'Tiempo de viaje',
    correctAnswer: 'inverse',
    explanation: 'Más velocidad = menos tiempo. Son inversamente proporcionales.',
  },
  {
    id: '4',
    magnitude: 'Número de máquinas',
    target: 'Piezas producidas',
    correctAnswer: 'direct',
    explanation: 'Más máquinas = más piezas. Son directamente proporcionales.',
  },
  {
    id: '5',
    magnitude: 'Número de grifos',
    target: 'Tiempo para llenar un tanque',
    correctAnswer: 'inverse',
    explanation: 'Más grifos = menos tiempo. Son inversamente proporcionales.',
  },
];

// Map string answer to index: direct = 0, inverse = 1
const answerToIndex = (answer: 'direct' | 'inverse'): number => {
  return answer === 'direct' ? 0 : 1;
};

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => answerToIndex(item.correctAnswer),
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica la Relación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Es directa o inversa? Necesitas {REQUIRED_CORRECT} de {QUESTIONS.length} correctas.
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={QUESTIONS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === answerToIndex(QUESTIONS[i].correctAnswer)
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Question card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <p className="text-gray-600 dark:text-gray-400 mb-2">Si aumenta...</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                {mc.currentItem.magnitude}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">¿Qué pasa con...?</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {mc.currentItem.target}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  mc.select(0);
                  setTimeout(() => mc.check(), 0);
                }}
                disabled={mc.showFeedback}
                className={cn(
                  'p-6 rounded-xl font-semibold transition-all flex flex-col items-center gap-2 border-2',
                  mc.showFeedback && mc.selectedAnswer === 0
                    ? mc.isCorrect
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                    : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:border-green-400',
                  mc.showFeedback && 'cursor-not-allowed'
                )}
              >
                <div className="flex items-center gap-1 text-2xl">
                  <ArrowUp className="w-6 h-6" />
                  <ArrowUp className="w-6 h-6" />
                </div>
                <span>DIRECTA</span>
                <span className="text-xs font-normal opacity-70">También aumenta</span>
              </button>

              <button
                onClick={() => {
                  mc.select(1);
                  setTimeout(() => mc.check(), 0);
                }}
                disabled={mc.showFeedback}
                className={cn(
                  'p-6 rounded-xl font-semibold transition-all flex flex-col items-center gap-2 border-2',
                  mc.showFeedback && mc.selectedAnswer === 1
                    ? mc.isCorrect
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                    : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 hover:border-orange-400',
                  mc.showFeedback && 'cursor-not-allowed'
                )}
              >
                <div className="flex items-center gap-1 text-2xl">
                  <ArrowUp className="w-6 h-6" />
                  <ArrowDown className="w-6 h-6" />
                </div>
                <span>INVERSA</span>
                <span className="text-xs font-normal opacity-70">Disminuye</span>
              </button>
            </div>

            {mc.showFeedback && (
              <div className="mt-4">
                <FeedbackPanel isCorrect={mc.isCorrect} explanation={mc.currentItem.explanation} />
              </div>
            )}
          </div>

          {mc.showFeedback && (
            <div className="flex justify-center">
              <ActionButton onClick={mc.next}>
                {mc.currentIndex < QUESTIONS.length - 1 ? 'Siguiente' : 'Ver Resultados'}
              </ActionButton>
            </div>
          )}
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={QUESTIONS.length}
          passed={mc.passed}
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Excelente!"
          successSubtext="¡Sabes identificar si la relación es directa o inversa!"
          failureSubtext="Necesitas 4 respuestas correctas. ¡Intenta de nuevo!"
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === answerToIndex(QUESTIONS[i].correctAnswer)}
          renderItem={(question, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                {question.magnitude} → {question.target}
              </span>
              <span className="text-xs text-purple-600 font-semibold">
                {question.correctAnswer === 'direct' ? 'Directa' : 'Inversa'}
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
