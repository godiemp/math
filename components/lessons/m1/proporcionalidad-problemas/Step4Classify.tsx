'use client';

import { Check, X, ArrowUp, ArrowDown } from 'lucide-react';
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
  problem: string;
  var1: string;
  var2: string;
  correctType: 'direct' | 'inverse';
  explanation: string;
}

const CLASSIFY_PROBLEMS: ClassifyProblem[] = [
  {
    id: '1',
    problem: 'Una fábrica produce piezas. Cuantas más máquinas trabajan, más piezas se producen en el mismo tiempo.',
    var1: 'Máquinas',
    var2: 'Piezas producidas',
    correctType: 'direct',
    explanation: 'Más máquinas = Más piezas. Ambas cantidades aumentan juntas → Directa',
  },
  {
    id: '2',
    problem: 'Un camión debe recorrer 200 km. Cuanto más rápido vaya, menos tiempo tardará en llegar.',
    var1: 'Velocidad',
    var2: 'Tiempo',
    correctType: 'inverse',
    explanation: 'Más velocidad = Menos tiempo. Una aumenta y la otra disminuye → Inversa',
  },
  {
    id: '3',
    problem: 'En una tienda, cuantos más productos compras, más pagas (el precio por unidad es fijo).',
    var1: 'Productos',
    var2: 'Precio total',
    correctType: 'direct',
    explanation: 'Más productos = Más costo. Ambas cantidades aumentan juntas → Directa',
  },
  {
    id: '4',
    problem: 'Un grifo llena una piscina. Si abren más grifos iguales, la piscina se llena en menos tiempo.',
    var1: 'Grifos',
    var2: 'Tiempo de llenado',
    correctType: 'inverse',
    explanation: 'Más grifos = Menos tiempo. Una aumenta y la otra disminuye → Inversa',
  },
  {
    id: '5',
    problem: 'Un conductor paga peaje según los kilómetros recorridos en la autopista.',
    var1: 'Kilómetros',
    var2: 'Costo del peaje',
    correctType: 'direct',
    explanation: 'Más kilómetros = Más costo. Ambas cantidades aumentan juntas → Directa',
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
          Clasifica el Tipo de Proporcionalidad
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
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 text-center">
              {mc.currentItem.problem}
            </p>

            {/* Variables */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
                <span className="text-blue-700 dark:text-blue-300 font-semibold">{mc.currentItem.var1}</span>
              </div>
              <span className="text-gray-400 text-2xl">↔</span>
              <div className="bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-lg">
                <span className="text-purple-700 dark:text-purple-300 font-semibold">
                  {mc.currentItem.var2}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
              ¿Qué tipo de proporcionalidad es?
            </p>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  mc.select(0);
                  setTimeout(() => mc.check(), 0);
                }}
                disabled={mc.showFeedback}
                className={cn(
                  'p-4 rounded-xl font-bold text-lg transition-all border-2',
                  mc.showFeedback
                    ? mc.currentItem.correctType === 'direct'
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400'
                    : 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 hover:border-green-500 text-green-700 dark:text-green-300'
                )}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1">
                    <ArrowUp className="w-5 h-5" />
                    <ArrowUp className="w-5 h-5" />
                  </div>
                  <span>Directa</span>
                </div>
              </button>

              <button
                onClick={() => {
                  mc.select(1);
                  setTimeout(() => mc.check(), 0);
                }}
                disabled={mc.showFeedback}
                className={cn(
                  'p-4 rounded-xl font-bold text-lg transition-all border-2',
                  mc.showFeedback
                    ? mc.currentItem.correctType === 'inverse'
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400'
                    : 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700 hover:border-orange-500 text-orange-700 dark:text-orange-300'
                )}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1">
                    <ArrowUp className="w-5 h-5" />
                    <ArrowDown className="w-5 h-5" />
                  </div>
                  <span>Inversa</span>
                </div>
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
          successMessage="¡Excelente!"
          successSubtext="Has demostrado que puedes identificar el tipo de proporcionalidad"
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
                {problem.var1} ↔ {problem.var2}
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
