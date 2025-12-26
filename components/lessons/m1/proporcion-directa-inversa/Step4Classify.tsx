'use client';

import { Check, X, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

interface ClassifyProblem {
  id: string;
  situation: string;
  magnitudes: string;
  correctType: 'direct' | 'inverse';
  explanation: string;
}

const CLASSIFY_PROBLEMS: ClassifyProblem[] = [
  {
    id: '1',
    situation: 'Comprar naranjas a $500 cada kilo',
    magnitudes: 'Kilos de naranjas vs Precio total',
    correctType: 'direct',
    explanation: 'Más kilos = más precio. Si compras el doble de kilos, pagas el doble.',
  },
  {
    id: '2',
    situation: 'Repartir una pizza entre amigos',
    magnitudes: 'Número de amigos vs Pedazos por persona',
    correctType: 'inverse',
    explanation: 'Más amigos = menos pedazos cada uno. Si hay el doble de amigos, cada uno recibe la mitad.',
  },
  {
    id: '3',
    situation: 'Un auto viaja a velocidad constante',
    magnitudes: 'Tiempo de viaje vs Distancia recorrida',
    correctType: 'direct',
    explanation: 'Más tiempo viajando = más distancia. Si viaja el doble de tiempo, recorre el doble.',
  },
  {
    id: '4',
    situation: 'Llenar una piscina con mangueras',
    magnitudes: 'Número de mangueras vs Tiempo para llenar',
    correctType: 'inverse',
    explanation: 'Más mangueras = menos tiempo. Si usas el doble de mangueras, tardas la mitad.',
  },
  {
    id: '5',
    situation: 'Trabajar horas extra con pago por hora',
    magnitudes: 'Horas trabajadas vs Sueldo total',
    correctType: 'direct',
    explanation: 'Más horas = más sueldo. Si trabajas el doble de horas, ganas el doble.',
  },
];

// Map string answer to index: direct = 0, inverse = 1
const answerToIndex = (answer: 'direct' | 'inverse'): number => {
  return answer === 'direct' ? 0 : 1;
};

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: CLASSIFY_PROBLEMS,
    getCorrectAnswer: (item) => answerToIndex(item.correctType),
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica la Proporción
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Necesitas {REQUIRED_CORRECT} de {CLASSIFY_PROBLEMS.length} correctas para avanzar
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={CLASSIFY_PROBLEMS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === answerToIndex(CLASSIFY_PROBLEMS[i].correctType)
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* Situation */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 mb-4">
              <p className="text-lg text-gray-800 dark:text-gray-200 font-medium text-center">
                {mc.currentItem.situation}
              </p>
            </div>

            {/* Magnitudes */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Magnitudes relacionadas:</p>
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                {mc.currentItem.magnitudes}
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
                  'p-6 rounded-xl transition-all border-2 flex flex-col items-center gap-2',
                  mc.showFeedback
                    ? mc.currentItem.correctType === 'direct'
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                      : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-50'
                    : 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 hover:border-green-500'
                )}
              >
                <TrendingUp className={cn(
                  'w-10 h-10',
                  mc.showFeedback && mc.currentItem.correctType === 'direct'
                    ? 'text-green-600'
                    : 'text-green-500'
                )} />
                <span className="font-bold text-green-700 dark:text-green-300">Directa</span>
                <span className="text-xs text-green-600 dark:text-green-400">
                  Ambas suben juntas
                </span>
              </button>

              <button
                onClick={() => {
                  mc.select(1);
                  setTimeout(() => mc.check(), 0);
                }}
                disabled={mc.showFeedback}
                className={cn(
                  'p-6 rounded-xl transition-all border-2 flex flex-col items-center gap-2',
                  mc.showFeedback
                    ? mc.currentItem.correctType === 'inverse'
                      ? 'bg-orange-100 dark:bg-orange-900/50 border-orange-500'
                      : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-50'
                    : 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700 hover:border-orange-500'
                )}
              >
                <TrendingDown className={cn(
                  'w-10 h-10',
                  mc.showFeedback && mc.currentItem.correctType === 'inverse'
                    ? 'text-orange-600'
                    : 'text-orange-500'
                )} />
                <span className="font-bold text-orange-700 dark:text-orange-300">Inversa</span>
                <span className="text-xs text-orange-600 dark:text-orange-400">
                  Una sube, otra baja
                </span>
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
                {mc.currentIndex < CLASSIFY_PROBLEMS.length - 1 ? 'Siguiente' : 'Ver Resultados'}
              </ActionButton>
            </div>
          )}
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={CLASSIFY_PROBLEMS.length}
          passed={mc.passed}
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Buen trabajo!"
          successSubtext="Has demostrado que puedes identificar tipos de proporciones"
          failureSubtext="Necesitas 4 respuestas correctas. ¡Puedes intentarlo de nuevo!"
          items={CLASSIFY_PROBLEMS}
          getIsCorrect={(_, i) => mc.answers[i] === answerToIndex(CLASSIFY_PROBLEMS[i].correctType)}
          renderItem={(problem, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                {problem.situation}
              </span>
              <span className="text-xs text-purple-600 font-semibold">
                {problem.correctType === 'direct' ? 'Directa' : 'Inversa'}
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
