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
  inequality: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  isNegative: boolean;
}

const QUESTIONS: ClassifyQuestion[] = [
  {
    id: 'q1',
    inequality: '3x > 15',
    options: ['x > 5', 'x < 5', 'x > 45', 'x < 45'],
    correctAnswer: 0, // x > 5
    explanation: '3x > 15 → x > 15/3 → x > 5',
    isNegative: false,
  },
  {
    id: 'q2',
    inequality: 'x/4 <= 3',
    options: ['x <= 12', 'x >= 12', 'x <= 0,75', 'x >= 0,75'],
    correctAnswer: 0, // x <= 12
    explanation: 'x/4 <= 3 → x <= 4 3 → x <= 12',
    isNegative: false,
  },
  {
    id: 'q3',
    inequality: '-2x < 8',
    options: ['x < -4', 'x > -4', 'x < 4', 'x > 4'],
    correctAnswer: 1, // x > -4
    explanation: '-2x < 8 → x > 8/(-2) → x > -4 (signo invertido)',
    isNegative: true,
  },
  {
    id: 'q4',
    inequality: '2x - 5 >= 9',
    options: ['x >= 2', 'x >= 7', 'x <= 7', 'x <= 2'],
    correctAnswer: 1, // x >= 7
    explanation: '2x >= 9 + 5 → 2x >= 14 → x >= 7',
    isNegative: false,
  },
  {
    id: 'q5',
    inequality: '10 - 3x > 1',
    options: ['x > 3', 'x < 3', 'x > -3', 'x < -3'],
    correctAnswer: 1, // x < 3
    explanation: '-3x > 1 - 10 → -3x > -9 → x < 3 (signo invertido)',
    isNegative: true,
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Resuelve las Inecuaciones</h2>
        <p className="text-gray-600 dark:text-gray-300">Encuentra el intervalo solucin para cada inecuacin</p>
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
            {/* Warning for negative coefficient */}
            {mc.currentItem.isNegative && (
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 mb-4 border border-amber-200 dark:border-amber-700">
                <p className="text-amber-700 dark:text-amber-300 text-sm text-center">
                  Atencin: Esta inecuacin tiene un coeficiente negativo
                </p>
              </div>
            )}

            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Resuelve:</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {mc.currentItem.inequality}
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
            <FeedbackPanel
              isCorrect={mc.isCorrect}
              explanation={mc.currentItem.explanation}
            />
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
          successMessage="Excelente trabajo!"
          successSubtext="Has demostrado que sabes resolver inecuaciones lineales"
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
              <span className={cn('font-mono text-gray-700 dark:text-gray-300', q.isNegative && 'text-purple-600')}>
                {q.inequality}
              </span>
              <span className="font-mono text-sm text-purple-600 ml-auto">{q.options[q.correctAnswer]}</span>
            </>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
        />
      )}
    </div>
  );
}
