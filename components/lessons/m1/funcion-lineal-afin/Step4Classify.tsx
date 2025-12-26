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

interface Question {
  id: string;
  type: 'classify' | 'identify-m' | 'identify-b';
  equation: string;
  correctAnswer: number;
  options: string[];
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'classify',
    equation: 'y = 3x',
    correctAnswer: 0,
    options: ['Función Lineal', 'Función Afín'],
    explanation: 'y = 3x tiene la forma y = mx con b = 0, por lo tanto es una función lineal.',
  },
  {
    id: 'q2',
    type: 'classify',
    equation: 'y = 2x + 5',
    correctAnswer: 1,
    options: ['Función Lineal', 'Función Afín'],
    explanation: 'y = 2x + 5 tiene b = 5 ≠ 0, por lo tanto es una función afín.',
  },
  {
    id: 'q3',
    type: 'identify-m',
    equation: 'y = 4x + 3',
    correctAnswer: 0,
    options: ['m = 4', 'm = 3', 'm = 7', 'm = 1'],
    explanation: 'En y = mx + b, la pendiente m es el coeficiente de x. Aquí m = 4.',
  },
  {
    id: 'q4',
    type: 'identify-b',
    equation: 'y = -2x + 1',
    correctAnswer: 1,
    options: ['b = -2', 'b = 1', 'b = 2', 'b = -1'],
    explanation: 'En y = mx + b, el coeficiente de posición b es el término independiente. Aquí b = 1.',
  },
  {
    id: 'q5',
    type: 'classify',
    equation: 'y = -5x',
    correctAnswer: 0,
    options: ['Función Lineal', 'Función Afín'],
    explanation: 'y = -5x tiene b = 0 (no hay término independiente), es función lineal.',
  },
  {
    id: 'q6',
    type: 'identify-m',
    equation: 'y = x - 8',
    correctAnswer: 2,
    options: ['m = -8', 'm = 8', 'm = 1', 'm = -1'],
    explanation: 'En y = x - 8, el coeficiente de x es 1 (implícito). Por tanto m = 1.',
  },
  {
    id: 'q7',
    type: 'identify-b',
    equation: 'y = 3x',
    correctAnswer: 0,
    options: ['b = 0', 'b = 3', 'b = 1', 'No tiene b'],
    explanation: 'En y = 3x no hay término independiente, lo que significa b = 0.',
  },
  {
    id: 'q8',
    type: 'classify',
    equation: 'y = x - 3',
    correctAnswer: 1,
    options: ['Función Lineal', 'Función Afín'],
    explanation: 'y = x - 3 tiene b = -3 ≠ 0, por lo tanto es una función afín.',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 6,
  });

  if (!isActive) return null;

  const getQuestionTitle = (type: Question['type']) => {
    switch (type) {
      case 'classify':
        return '¿Es lineal o afín?';
      case 'identify-m':
        return '¿Cuál es la pendiente (m)?';
      case 'identify-b':
        return '¿Cuál es el coeficiente de posición (b)?';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasificación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Identifica el tipo de función y sus componentes
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
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                {getQuestionTitle(mc.currentItem.type)}
              </p>
              <p className="font-mono text-3xl font-bold text-purple-600 dark:text-purple-400">
                {mc.currentItem.equation}
              </p>
            </div>

            {/* Color-coded equation breakdown */}
            {mc.currentItem.type !== 'classify' && (
              <div className="flex justify-center mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-1">
                    Recuerda: y = <span className="text-purple-600 font-bold">m</span>x +{' '}
                    <span className="text-amber-600 font-bold">b</span>
                  </p>
                </div>
              </div>
            )}

            {/* Options */}
            <div
              className={cn(
                'grid gap-4',
                mc.currentItem.options.length === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2'
              )}
            >
              {mc.currentItem.options.map((option, index) => (
                <OptionButton
                  key={index}
                  label={option}
                  index={index}
                  isSelected={mc.selectedAnswer === index}
                  isCorrect={index === mc.currentItem.correctAnswer}
                  showFeedback={mc.showFeedback}
                  onClick={() => mc.select(index)}
                  isMono={mc.currentItem.type !== 'classify'}
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
          passThreshold={6}
          successMessage="¡Excelente!"
          successSubtext="Dominas la clasificación de funciones"
          failureSubtext="Repasa las diferencias entre lineal y afín"
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
              <span className="text-sm text-purple-600 dark:text-purple-400 ml-auto">
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
