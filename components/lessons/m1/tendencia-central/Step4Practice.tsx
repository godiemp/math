'use client';

import { Check, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

interface Problem {
  id: string;
  context: string;
  emoji: string;
  question: string;
  data: number[];
  dataLabel: string;
  measure: 'media' | 'mediana' | 'moda' | 'rango';
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'notas',
    context: 'Notas del semestre',
    emoji: '📚',
    question: '¿Cual es la MEDIANA de estas notas?',
    data: [4.5, 5.0, 5.5, 5.5, 6.0, 6.5, 7.0],
    dataLabel: 'Notas',
    measure: 'mediana',
    options: ['5.0', '5.5', '5.7', '6.0'],
    correctAnswer: 1,
    explanation: 'Con 7 datos (impar), la mediana es el 4to valor. Ordenados: 4.5, 5.0, 5.5, [5.5], 6.0, 6.5, 7.0',
  },
  {
    id: 'tallas',
    context: 'Pedido de poleras',
    emoji: '👕',
    question: '¿Cual talla es la MODA (mas pedida)?',
    data: [1, 2, 2, 3, 2, 1, 2, 4, 2], // 1=S, 2=M, 3=L, 4=XL
    dataLabel: 'Tallas: S, M, M, L, M, S, M, XL, M',
    measure: 'moda',
    options: ['S (2 veces)', 'M (5 veces)', 'L (1 vez)', 'XL (1 vez)'],
    correctAnswer: 1,
    explanation: 'La talla M aparece 5 veces, mas que cualquier otra. Es la MODA.',
  },
  {
    id: 'temperaturas',
    context: 'Temperaturas de la semana',
    emoji: '🌡️',
    question: '¿Cual es el RANGO de temperaturas?',
    data: [18, 22, 19, 25, 20, 23, 21],
    dataLabel: 'Temperaturas (°C)',
    measure: 'rango',
    options: ['5°C', '7°C', '21°C', '25°C'],
    correctAnswer: 1,
    explanation: 'Rango = Maximo - Minimo = 25 - 18 = 7°C',
  },
  {
    id: 'edades',
    context: 'Edades del grupo',
    emoji: '👥',
    question: '¿Cual es la MEDIA de edades?',
    data: [12, 14, 14, 15, 20],
    dataLabel: 'Edades',
    measure: 'media',
    options: ['14', '14.5', '15', '15.5'],
    correctAnswer: 2,
    explanation: 'Media = (12 + 14 + 14 + 15 + 20) / 5 = 75 / 5 = 15',
  },
];

const measureColors: Record<string, string> = {
  media: 'blue',
  mediana: 'green',
  moda: 'purple',
  rango: 'orange',
};

const REQUIRED_CORRECT = 3;

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: PROBLEMS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  const color = measureColors[mc.currentItem.measure];

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Necesitas {REQUIRED_CORRECT} de {PROBLEMS.length} correctas
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={PROBLEMS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === PROBLEMS[i].correctAnswer
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Problem card */}
          <div
            className={cn(
              'rounded-xl p-5 border',
              `bg-${color}-50 dark:bg-${color}-900/20`,
              `border-${color}-200 dark:border-${color}-700`
            )}
            style={{
              backgroundColor:
                color === 'blue'
                  ? 'rgb(239 246 255)'
                  : color === 'green'
                  ? 'rgb(240 253 244)'
                  : color === 'purple'
                  ? 'rgb(250 245 255)'
                  : 'rgb(255 247 237)',
            }}
          >
            {/* Context */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{mc.currentItem.emoji}</span>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  {mc.currentItem.context}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {mc.currentItem.dataLabel}
                </p>
              </div>
            </div>

            {/* Data visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {mc.currentItem.measure !== 'moda' || mc.currentItem.id !== 'tallas' ? (
                  mc.currentItem.data.map((val, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300"
                    >
                      {val}
                    </div>
                  ))
                ) : (
                  // Special display for t-shirt sizes
                  ['S', 'M', 'M', 'L', 'M', 'S', 'M', 'XL', 'M'].map((size, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300"
                    >
                      {size}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Question */}
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle size={20} className="text-gray-500" />
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {mc.currentItem.question}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {mc.currentItem.options.map((option, index) => {
                const isSelected = mc.selectedAnswer === index;
                const isThisCorrect = index === mc.currentItem.correctAnswer;

                return (
                  <button
                    key={index}
                    onClick={() => mc.select(index)}
                    disabled={mc.showFeedback}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all text-left',
                      !mc.showFeedback && 'hover:border-gray-400',
                      !mc.showFeedback && !isSelected && 'border-gray-200 dark:border-gray-600',
                      mc.showFeedback &&
                        isThisCorrect &&
                        'border-green-500 bg-green-50 dark:bg-green-900/30',
                      mc.showFeedback &&
                        isSelected &&
                        !isThisCorrect &&
                        'border-red-500 bg-red-50 dark:bg-red-900/30',
                      !mc.showFeedback &&
                        isSelected &&
                        'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30',
                      mc.showFeedback && !isSelected && !isThisCorrect && 'opacity-50'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{option}</span>
                      {mc.showFeedback && isThisCorrect && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                      {mc.showFeedback && isSelected && !isThisCorrect && (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
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
                ? mc.currentIndex < PROBLEMS.length - 1
                  ? 'Siguiente problema'
                  : 'Ver Resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={PROBLEMS.length}
          passed={mc.passed}
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Excelente trabajo!"
          successSubtext="Dominas las medidas de tendencia central"
          failureSubtext={`Necesitas ${REQUIRED_CORRECT} respuestas correctas. ¡Puedes intentarlo de nuevo!`}
          items={PROBLEMS}
          getIsCorrect={(_, i) => mc.answers[i] === PROBLEMS[i].correctAnswer}
          renderItem={(item, _, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{item.context}</span>
            </>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
        />
      )}
    </div>
  );
}
