'use client';

import { Check, X } from 'lucide-react';
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
  type: 'intercept-y' | 'intercept-x' | 'point-on-line' | 'identify-coef';
  equation: string;
  correctAnswer: number;
  options: string[];
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'intercept-y',
    equation: '2x + 4y = 8',
    correctAnswer: 1,
    options: ['(0, 4)', '(0, 2)', '(0, 8)', '(0, 1)'],
    explanation: 'Sustituyendo x = 0: 4y = 8, entonces y = 2. El intercepto Y es (0, 2).',
  },
  {
    id: 'q2',
    type: 'intercept-x',
    equation: '2x + 4y = 8',
    correctAnswer: 0,
    options: ['(4, 0)', '(2, 0)', '(8, 0)', '(1, 0)'],
    explanation: 'Sustituyendo y = 0: 2x = 8, entonces x = 4. El intercepto X es (4, 0).',
  },
  {
    id: 'q3',
    type: 'intercept-y',
    equation: '3x + y = 6',
    correctAnswer: 2,
    options: ['(0, 3)', '(0, 2)', '(0, 6)', '(0, 9)'],
    explanation: 'Sustituyendo x = 0: y = 6. El intercepto Y es (0, 6).',
  },
  {
    id: 'q4',
    type: 'intercept-x',
    equation: 'x + 2y = 10',
    correctAnswer: 3,
    options: ['(2, 0)', '(5, 0)', '(20, 0)', '(10, 0)'],
    explanation: 'Sustituyendo y = 0: x = 10. El intercepto X es (10, 0).',
  },
  {
    id: 'q5',
    type: 'point-on-line',
    equation: 'x + y = 5',
    correctAnswer: 1,
    options: ['(1, 3)', '(2, 3)', '(3, 3)', '(4, 3)'],
    explanation: 'Verificando: 2 + 3 = 5 ✓. El punto (2, 3) esta en la recta.',
  },
  {
    id: 'q6',
    type: 'intercept-y',
    equation: '5x + 2y = 10',
    correctAnswer: 2,
    options: ['(0, 2)', '(0, 10)', '(0, 5)', '(0, 25)'],
    explanation: 'Sustituyendo x = 0: 2y = 10, entonces y = 5. El intercepto Y es (0, 5).',
  },
  {
    id: 'q7',
    type: 'identify-coef',
    equation: '4x + 3y = 12',
    correctAnswer: 0,
    options: ['a = 4, b = 3, c = 12', 'a = 3, b = 4, c = 12', 'a = 12, b = 3, c = 4', 'a = 4, b = 12, c = 3'],
    explanation: 'En ax + by = c: a = 4 (coef. de x), b = 3 (coef. de y), c = 12 (constante).',
  },
  {
    id: 'q8',
    type: 'point-on-line',
    equation: '2x + 3y = 12',
    correctAnswer: 2,
    options: ['(1, 3)', '(2, 2)', '(3, 2)', '(4, 2)'],
    explanation: 'Verificando: 2(3) + 3(2) = 6 + 6 = 12 ✓. El punto (3, 2) esta en la recta.',
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
      case 'intercept-y':
        return '¿Cual es el intercepto Y?';
      case 'intercept-x':
        return '¿Cual es el intercepto X?';
      case 'point-on-line':
        return '¿Cual punto esta en la recta?';
      case 'identify-coef':
        return 'Identifica los coeficientes';
    }
  };

  const getHint = (type: Question['type']) => {
    switch (type) {
      case 'intercept-y':
        return 'Sustituye x = 0 y despeja y';
      case 'intercept-x':
        return 'Sustituye y = 0 y despeja x';
      case 'point-on-line':
        return 'Verifica cual punto satisface la ecuacion';
      case 'identify-coef':
        return 'ax + by = c';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identificacion de Interceptos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Practica encontrar interceptos y puntos en la recta
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
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-700">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                {getQuestionTitle(mc.currentItem.type)}
              </p>
              <p className="font-mono text-3xl font-bold text-amber-600 dark:text-amber-400">
                {mc.currentItem.equation}
              </p>
            </div>

            {/* Hint */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Pista: {getHint(mc.currentItem.type)}
                </p>
              </div>
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
          successSubtext="Dominas los interceptos de relaciones lineales"
          failureSubtext="Repasa como encontrar interceptos X e Y"
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
              <span className="text-sm text-amber-600 dark:text-amber-400 ml-auto">
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
