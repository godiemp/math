'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

interface ClassifyQuestion {
  id: number;
  graphType: 'intersect' | 'parallel' | 'same';
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: ClassifyQuestion[] = [
  {
    id: 1,
    graphType: 'intersect',
    options: ['Una solución', 'Sin solución', 'Infinitas soluciones'],
    correctAnswer: 0,
    explanation: 'Las rectas se cruzan en un punto, por lo tanto hay exactamente una solución.',
  },
  {
    id: 2,
    graphType: 'parallel',
    options: ['Una solución', 'Sin solución', 'Infinitas soluciones'],
    correctAnswer: 1,
    explanation: 'Las rectas son paralelas y nunca se cruzan, por lo tanto no hay solución.',
  },
  {
    id: 3,
    graphType: 'same',
    options: ['Una solución', 'Sin solución', 'Infinitas soluciones'],
    correctAnswer: 2,
    explanation: 'Las rectas son la misma línea, por lo tanto todos los puntos de la recta son solución (infinitas).',
  },
  {
    id: 4,
    graphType: 'intersect',
    options: ['Una solución', 'Sin solución', 'Infinitas soluciones'],
    correctAnswer: 0,
    explanation: 'Las rectas se cruzan en exactamente un punto. Ese punto es la única solución del sistema.',
  },
  {
    id: 5,
    graphType: 'parallel',
    options: ['Una solución', 'Sin solución', 'Infinitas soluciones'],
    correctAnswer: 1,
    explanation: 'Las rectas tienen la misma pendiente pero diferente intercepto. Son paralelas y no hay solución.',
  },
];

function MiniGraph({ type }: { type: 'intersect' | 'parallel' | 'same' }) {
  return (
    <svg width="180" height="140" className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      {/* Grid */}
      {[0, 1, 2, 3, 4].map(i => (
        <g key={i}>
          <line x1={20 + i * 35} y1={10} x2={20 + i * 35} y2={130} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />
          <line x1={20} y1={10 + i * 30} x2={160} y2={10 + i * 30} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />
        </g>
      ))}

      {type === 'intersect' && (
        <>
          <line x1="20" y1="120" x2="160" y2="20" stroke="#3B82F6" strokeWidth="3" />
          <line x1="20" y1="40" x2="160" y2="100" stroke="#10B981" strokeWidth="3" />
          <circle cx="90" cy="70" r="6" fill="#EF4444" className="animate-pulse" />
        </>
      )}

      {type === 'parallel' && (
        <>
          <line x1="20" y1="100" x2="160" y2="40" stroke="#3B82F6" strokeWidth="3" />
          <line x1="20" y1="120" x2="160" y2="60" stroke="#10B981" strokeWidth="3" />
        </>
      )}

      {type === 'same' && (
        <>
          <line x1="20" y1="110" x2="160" y2="30" stroke="#8B5CF6" strokeWidth="4" />
        </>
      )}
    </svg>
  );
}

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica el Sistema
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Observa el gráfico y determina cuántas soluciones tiene
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
            {/* Graph display */}
            <div className="flex justify-center mb-6">
              <MiniGraph type={mc.currentItem.graphType} />
            </div>

            <p className="text-center text-gray-700 dark:text-gray-300 font-semibold mb-4">
              ¿Cuántas soluciones tiene este sistema?
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {mc.currentItem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => mc.select(index)}
                  disabled={mc.showFeedback}
                  className={cn(
                    'p-4 rounded-xl text-center font-medium transition-all border-2',
                    mc.selectedAnswer === index
                      ? mc.showFeedback
                        ? index === mc.currentItem.correctAnswer
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200'
                      : mc.showFeedback && index === mc.currentItem.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-blue-400 dark:hover:border-blue-500'
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    {mc.showFeedback && index === mc.currentItem.correctAnswer && (
                      <Check size={18} className="text-green-500" />
                    )}
                    {mc.showFeedback && mc.selectedAnswer === index && index !== mc.currentItem.correctAnswer && (
                      <X size={18} className="text-red-500" />
                    )}
                    <span className="text-gray-800 dark:text-gray-200">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {mc.showFeedback && (
              <div className="mt-6">
                <FeedbackPanel isCorrect={mc.isCorrect} explanation={mc.currentItem.explanation} />
              </div>
            )}
          </div>

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
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Excelente!"
          successSubtext="Sabes clasificar sistemas gráficamente"
          failureSubtext="Necesitas 4 respuestas correctas. ¡Inténtalo de nuevo!"
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === QUESTIONS[i].correctAnswer}
          renderItem={(q, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
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
