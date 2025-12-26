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

interface PracticeQuestion {
  id: string;
  type: 'to-mixed' | 'to-improper';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  // Improper to Mixed
  {
    id: 'q1',
    type: 'to-mixed',
    question: 'Convierte 7/4 a número mixto:',
    options: ['1 1/4', '1 3/4', '2 1/4', '1 2/4'],
    correctAnswer: 1, // 1 3/4
    explanation: '7 ÷ 4 = 1 con resto 3. Por lo tanto, 7/4 = 1 3/4',
  },
  {
    id: 'q2',
    type: 'to-mixed',
    question: 'Convierte 5/2 a número mixto:',
    options: ['2 1/2', '1 1/2', '2 1/4', '3 1/2'],
    correctAnswer: 0, // 2 1/2
    explanation: '5 ÷ 2 = 2 con resto 1. Por lo tanto, 5/2 = 2 1/2',
  },
  {
    id: 'q3',
    type: 'to-mixed',
    question: 'Convierte 11/3 a número mixto:',
    options: ['3 1/3', '2 2/3', '3 2/3', '4 1/3'],
    correctAnswer: 2, // 3 2/3
    explanation: '11 ÷ 3 = 3 con resto 2. Por lo tanto, 11/3 = 3 2/3',
  },
  {
    id: 'q4',
    type: 'to-mixed',
    question: 'Convierte 8/5 a número mixto:',
    options: ['1 2/5', '1 3/5', '2 3/5', '1 4/5'],
    correctAnswer: 1, // 1 3/5
    explanation: '8 ÷ 5 = 1 con resto 3. Por lo tanto, 8/5 = 1 3/5',
  },
  // Mixed to Improper
  {
    id: 'q5',
    type: 'to-improper',
    question: 'Convierte 2 1/4 a fracción impropia:',
    options: ['9/4', '7/4', '8/4', '6/4'],
    correctAnswer: 0, // 9/4
    explanation: '(2 × 4) + 1 = 9. Por lo tanto, 2 1/4 = 9/4',
  },
  {
    id: 'q6',
    type: 'to-improper',
    question: 'Convierte 1 2/3 a fracción impropia:',
    options: ['4/3', '5/3', '6/3', '3/3'],
    correctAnswer: 1, // 5/3
    explanation: '(1 × 3) + 2 = 5. Por lo tanto, 1 2/3 = 5/3',
  },
  {
    id: 'q7',
    type: 'to-improper',
    question: 'Convierte 3 1/2 a fracción impropia:',
    options: ['5/2', '6/2', '7/2', '8/2'],
    correctAnswer: 2, // 7/2
    explanation: '(3 × 2) + 1 = 7. Por lo tanto, 3 1/2 = 7/2',
  },
  {
    id: 'q8',
    type: 'to-improper',
    question: 'Convierte 2 3/5 a fracción impropia:',
    options: ['11/5', '12/5', '13/5', '10/5'],
    correctAnswer: 2, // 13/5
    explanation: '(2 × 5) + 3 = 13. Por lo tanto, 2 3/5 = 13/5',
  },
];

const REQUIRED_CORRECT = 6;

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Conversiones
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Pregunta {mc.currentIndex + 1} de {QUESTIONS.length}
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

          {/* Question type indicator */}
          <div className="flex justify-center">
            <span
              className={cn(
                'px-4 py-1 rounded-full text-sm font-medium',
                mc.currentItem.type === 'to-mixed'
                  ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300'
                  : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
              )}
            >
              {mc.currentItem.type === 'to-mixed'
                ? 'Impropia → Mixto'
                : 'Mixto → Impropia'}
            </span>
          </div>

          {/* Question */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              {mc.currentItem.question}
            </h3>

            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {mc.currentItem.options.map((option, index) => (
                <OptionButton
                  key={index}
                  label={option}
                  index={index}
                  isSelected={mc.selectedAnswer === index}
                  isCorrect={index === mc.currentItem.correctAnswer}
                  showFeedback={mc.showFeedback}
                  onClick={() => mc.select(index)}
                />
              ))}
            </div>
          </div>

          {/* Strategy hint */}
          {!mc.showFeedback && (
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3 border border-purple-200 dark:border-purple-700">
              <p className="text-purple-800 dark:text-purple-200 text-sm text-center">
                {mc.currentItem.type === 'to-mixed' ? (
                  <>
                    <strong>Estrategia:</strong> Divide el numerador entre el
                    denominador
                  </>
                ) : (
                  <>
                    <strong>Estrategia:</strong> (entero × denominador) + numerador
                  </>
                )}
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
                ? mc.currentIndex < QUESTIONS.length - 1
                  ? 'Siguiente'
                  : 'Ver resultados'
                : 'Comprobar'}
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
          successSubtext="Dominas las conversiones de fracciones"
          failureSubtext="Sigue practicando las conversiones"
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === QUESTIONS[i].correctAnswer}
          renderItem={(q, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300 text-sm truncate">
                {q.question.slice(0, 25)}...
              </span>
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
