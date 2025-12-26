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

interface ClassifyProblem {
  id: string;
  problem: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const CLASSIFY_PROBLEMS: ClassifyProblem[] = [
  {
    id: '1',
    problem: 'Juan tiene 3 veces más dinero que Pedro. Juntos tienen $80.',
    options: ['x + 3x = 80', '3x = 80', 'x + 3 = 80', 'x - 3x = 80'],
    correctIndex: 0,
    explanation: 'Si Pedro tiene x, Juan tiene 3x. Juntos: x + 3x = 80',
  },
  {
    id: '2',
    problem: 'Un número aumentado en 12 es igual a 45.',
    options: ['x - 12 = 45', '12x = 45', 'x + 12 = 45', 'x / 12 = 45'],
    correctIndex: 2,
    explanation: '"Aumentado en" significa sumar: x + 12 = 45',
  },
  {
    id: '3',
    problem: 'La mitad de un número menos 3 es 10.',
    options: ['x/2 - 3 = 10', '(x - 3)/2 = 10', '2x - 3 = 10', 'x - 3/2 = 10'],
    correctIndex: 0,
    explanation: '"La mitad de un número" es x/2, luego le restamos 3: x/2 - 3 = 10',
  },
  {
    id: '4',
    problem: 'El doble de la suma de un número y 4 es 18.',
    options: ['2x + 4 = 18', '2(x + 4) = 18', 'x + 4 = 18/2', '2x + 8 = 18'],
    correctIndex: 1,
    explanation: 'Primero "la suma de x y 4" es (x + 4), luego "el doble de" es 2(x + 4)',
  },
  {
    id: '5',
    problem: 'Si a un número le resto 7 obtengo el triple del número.',
    options: ['x - 7 = 3x', '7 - x = 3x', 'x - 7 = 3', '3(x - 7) = x'],
    correctIndex: 0,
    explanation: '"A un número le resto 7" es x - 7, "el triple del número" es 3x',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: CLASSIFY_PROBLEMS,
    getCorrectAnswer: (item) => item.correctIndex,
    passThreshold: 4,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica la Ecuación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {!mc.isComplete
            ? `Necesitas 4 de ${CLASSIFY_PROBLEMS.length} correctas para avanzar`
            : '¡Resultados!'}
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={CLASSIFY_PROBLEMS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === CLASSIFY_PROBLEMS[i].correctIndex
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 text-center font-medium">
              &ldquo;{mc.currentItem.problem}&rdquo;
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
              ¿Qué ecuación representa este problema?
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mc.currentItem.options.map((option, index) => (
                <OptionButton
                  key={index}
                  label={option}
                  index={index}
                  isSelected={mc.selectedAnswer === index}
                  isCorrect={index === mc.currentItem.correctIndex}
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
                ? mc.currentIndex < CLASSIFY_PROBLEMS.length - 1
                  ? 'Siguiente'
                  : 'Ver Resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={CLASSIFY_PROBLEMS.length}
          passed={mc.passed}
          passThreshold={4}
          successMessage="¡Buen trabajo!"
          successSubtext="Has demostrado que puedes identificar ecuaciones correctamente"
          failureSubtext="Necesitas 4 respuestas correctas. ¡Puedes intentarlo de nuevo!"
          items={CLASSIFY_PROBLEMS}
          getIsCorrect={(_, i) => mc.answers[i] === CLASSIFY_PROBLEMS[i].correctIndex}
          renderItem={(problem, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300 text-sm truncate">
                {problem.problem.slice(0, 40)}...
              </span>
              <span className="font-mono text-sm text-purple-600 ml-auto">
                {problem.options[problem.correctIndex]}
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
