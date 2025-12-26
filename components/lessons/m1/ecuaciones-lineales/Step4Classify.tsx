'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  OptionButton,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

interface ClassifyQuestion {
  id: string;
  equation: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: ClassifyQuestion[] = [
  {
    id: 'q1',
    equation: '2x + 8 = 20',
    options: ['x = 4', 'x = 6', 'x = 8', 'x = 14'],
    correctAnswer: 1, // x = 6
    explanation: '2x = 20 - 8 = 12, entonces x = 12 / 2 = 6',
  },
  {
    id: 'q2',
    equation: 'x - 5 = 12',
    options: ['x = 7', 'x = 17', 'x = -7', 'x = 60'],
    correctAnswer: 1, // x = 17
    explanation: 'x = 12 + 5 = 17',
  },
  {
    id: 'q3',
    equation: '4x = 28',
    options: ['x = 32', 'x = 24', 'x = 7', 'x = 112'],
    correctAnswer: 2, // x = 7
    explanation: 'x = 28 / 4 = 7',
  },
  {
    id: 'q4',
    equation: '3x + 4 = x + 12',
    options: ['x = 2', 'x = 4', 'x = 6', 'x = 8'],
    correctAnswer: 1, // x = 4
    explanation: '3x - x = 12 - 4, entonces 2x = 8, x = 4',
  },
  {
    id: 'q5',
    equation: '5x - 3 = 2x + 9',
    options: ['x = 2', 'x = 3', 'x = 4', 'x = 6'],
    correctAnswer: 2, // x = 4
    explanation: '5x - 2x = 9 + 3, entonces 3x = 12, x = 4',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 4,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Resuelve las Ecuaciones
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Encuentra el valor de x en cada ecuación
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
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Resuelve:</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {mc.currentItem.equation}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {mc.currentItem.options.map((option, index) => (
                <OptionButton
                  key={index}
                  label={option}
                  index={index}
                  isSelected={mc.selectedAnswer === index}
                  isCorrect={index === mc.currentItem.correctAnswer}
                  showFeedback={mc.showFeedback}
                  onClick={() => mc.select(index)}
                  isMono
                />
              ))}
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
                ? mc.currentIndex < QUESTIONS.length - 1
                  ? 'Siguiente'
                  : 'Ver resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={QUESTIONS.length}
          passed={mc.passed}
          passThreshold={4}
          successMessage="¡Excelente trabajo!"
          successSubtext="Has demostrado que sabes resolver ecuaciones lineales"
          failureSubtext="Necesitas al menos 4 correctas para continuar"
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === QUESTIONS[i].correctAnswer}
          renderItem={(q, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="font-mono text-gray-700 dark:text-gray-300">{q.equation}</span>
              <span className="font-mono text-sm text-purple-600 ml-auto">
                {q.options[q.correctAnswer]}
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
