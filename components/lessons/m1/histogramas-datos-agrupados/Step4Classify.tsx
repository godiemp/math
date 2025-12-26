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

interface ClassifyExercise {
  id: string;
  question: string;
  data: number;
  intervals: string[];
  correctInterval: number;
  explanation: string;
}

const EXERCISES: ClassifyExercise[] = [
  {
    id: 'c1',
    question: '¿En que intervalo cae el valor 47?',
    data: 47,
    intervals: ['[30, 40)', '[40, 50)', '[50, 60)', '[60, 70)'],
    correctInterval: 1,
    explanation: '47 esta entre 40 y 50 (pero no llega a 50), entonces cae en [40, 50).',
  },
  {
    id: 'c2',
    question: '¿En que intervalo cae el valor 60?',
    data: 60,
    intervals: ['[40, 50)', '[50, 60)', '[60, 70)', '[70, 80)'],
    correctInterval: 2,
    explanation: '60 es exactamente el limite inferior del intervalo [60, 70), por lo que pertenece a el.',
  },
  {
    id: 'c3',
    question: 'Si un intervalo es [20, 25), ¿cual es su amplitud?',
    data: 0,
    intervals: ['3', '4', '5', '6'],
    correctInterval: 2,
    explanation: 'Amplitud = limite superior - limite inferior = 25 - 20 = 5',
  },
  {
    id: 'c4',
    question: '¿Cual es la marca de clase del intervalo [150, 160)?',
    data: 0,
    intervals: ['150', '155', '160', '157.5'],
    correctInterval: 1,
    explanation: 'Marca de clase = (150 + 160) / 2 = 310 / 2 = 155',
  },
  {
    id: 'c5',
    question: 'El valor 49.9 pertenece al intervalo [40, 50). ¿Verdadero o Falso?',
    data: 49.9,
    intervals: ['Verdadero', 'Falso'],
    correctInterval: 0,
    explanation: '49.9 es mayor o igual a 40 y menor que 50, entonces si pertenece a [40, 50).',
  },
];

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: EXERCISES,
    getCorrectAnswer: (item) => item.correctInterval,
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica los Datos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Practica identificando intervalos y sus propiedades
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={EXERCISES}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === EXERCISES[i].correctInterval
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Question card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
              {mc.currentItem.question}
            </h3>

            {/* Data display for relevant exercises */}
            {mc.currentItem.data !== 0 && (
              <div className="flex justify-center mb-6">
                <div className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                  <span className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                    {mc.currentItem.data}
                  </span>
                </div>
              </div>
            )}

            {/* Options */}
            <div className={cn('grid gap-3', mc.currentItem.intervals.length <= 2 ? 'grid-cols-2' : 'grid-cols-2')}>
              {mc.currentItem.intervals.map((interval, index) => (
                <OptionButton
                  key={index}
                  label={interval}
                  index={index}
                  isSelected={mc.selectedAnswer === index}
                  isCorrect={index === mc.currentItem.correctInterval}
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
                ? mc.currentIndex < EXERCISES.length - 1
                  ? 'Siguiente'
                  : 'Ver Resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={EXERCISES.length}
          passed={mc.passed}
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Muy bien!"
          successSubtext="Dominas la clasificacion en intervalos"
          failureSubtext={`Necesitas al menos ${REQUIRED_CORRECT} correctas para continuar`}
          items={EXERCISES}
          getIsCorrect={(_, i) => mc.answers[i] === EXERCISES[i].correctInterval}
          renderItem={(exercise, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300 text-sm truncate">
                {exercise.question.slice(0, 35)}...
              </span>
              <span className="font-mono text-sm text-purple-600 ml-auto">
                {exercise.intervals[exercise.correctInterval]}
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
