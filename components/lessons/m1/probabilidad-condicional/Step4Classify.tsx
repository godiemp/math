'use client';

import { Check, X, Link2, Unlink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

type CategoryType = 'independent' | 'dependent';

interface Scenario {
  id: string;
  description: string;
  correctType: CategoryType;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    description: 'Lanzar un dado y luego lanzar una moneda.',
    correctType: 'independent',
    explanation: 'El resultado del dado no afecta el resultado de la moneda. Son eventos completamente separados.',
  },
  {
    id: 's2',
    description: 'Sacar una carta de una baraja, NO devolverla, y sacar otra carta.',
    correctType: 'dependent',
    explanation: 'Al no devolver la primera carta, cambian las probabilidades de la segunda extracción. Por ejemplo, P(As₂ | As₁) = 3/51 ≠ 4/52.',
  },
  {
    id: 's3',
    description: 'El color de ojos de un estudiante y su promedio de notas.',
    correctType: 'independent',
    explanation: 'El color de ojos no tiene relación con el rendimiento académico. Saber uno no cambia la probabilidad del otro.',
  },
  {
    id: 's4',
    description: 'Estudiar para un examen y obtener buena calificación.',
    correctType: 'dependent',
    explanation: 'Estudiar aumenta la probabilidad de buena nota. P(buena nota | estudió) > P(buena nota). Son eventos dependientes.',
  },
  {
    id: 's5',
    description: 'Lanzar la misma moneda dos veces seguidas.',
    correctType: 'independent',
    explanation: 'Cada lanzamiento es independiente. La moneda no tiene "memoria". P(cara₂ | cara₁) = P(cara₂) = 0.5.',
  },
];

const TYPE_OPTIONS: { id: CategoryType; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'independent', label: 'Independientes', icon: <Unlink size={20} />, color: 'green' },
  { id: 'dependent', label: 'Dependientes', icon: <Link2 size={20} />, color: 'red' },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  green: { bg: 'bg-green-100 dark:bg-green-900/50', border: 'border-green-500', text: 'text-green-700 dark:text-green-300' },
  red: { bg: 'bg-red-100 dark:bg-red-900/50', border: 'border-red-500', text: 'text-red-700 dark:text-red-300' },
};

// Map string answer to index
const answerToIndex = (answer: CategoryType): number => {
  return answer === 'independent' ? 0 : 1;
};

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: SCENARIOS,
    getCorrectAnswer: (item) => answerToIndex(item.correctType),
    passThreshold: REQUIRED_CORRECT,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica los Eventos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Son independientes o dependientes?
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={SCENARIOS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === answerToIndex(SCENARIOS[i].correctType)
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Scenario card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <p className="text-gray-500 dark:text-gray-400 mb-3">Considera este escenario:</p>
              <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
                {mc.currentItem.description}
              </p>
            </div>

            {/* Type options */}
            <div className="grid grid-cols-2 gap-4">
              {TYPE_OPTIONS.map((option, index) => {
                const colors = colorClasses[option.color];
                const isSelected = mc.selectedAnswer === index;
                const isCorrectAnswer = index === answerToIndex(mc.currentItem.correctType);

                return (
                  <button
                    key={option.id}
                    onClick={() => mc.select(index)}
                    disabled={mc.showFeedback}
                    className={cn(
                      'p-6 rounded-xl border-2 transition-all font-medium',
                      isSelected
                        ? mc.showFeedback
                          ? isCorrectAnswer
                            ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                            : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                          : `${colors.bg} ${colors.border}`
                        : mc.showFeedback && isCorrectAnswer
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-400'
                    )}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center',
                        isSelected && !mc.showFeedback ? colors.bg : 'bg-gray-100 dark:bg-gray-700'
                      )}>
                        {mc.showFeedback && isCorrectAnswer && <Check size={24} className="text-green-600" />}
                        {mc.showFeedback && isSelected && !isCorrectAnswer && <X size={24} className="text-red-600" />}
                        {!mc.showFeedback && option.icon}
                      </div>
                      <span className={cn('font-semibold', isSelected && !mc.showFeedback ? colors.text : 'text-gray-700 dark:text-gray-300')}>
                        {option.label}
                      </span>
                    </div>
                  </button>
                );
              })}
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
                ? mc.currentIndex < SCENARIOS.length - 1
                  ? 'Siguiente'
                  : 'Ver Resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={SCENARIOS.length}
          passed={mc.passed}
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Excelente trabajo!"
          successSubtext="Clasificas correctamente los eventos"
          failureSubtext="Necesitas 4 de 5 correctas para avanzar"
          items={SCENARIOS}
          getIsCorrect={(_, i) => mc.answers[i] === answerToIndex(SCENARIOS[i].correctType)}
          renderItem={(scenario, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                {scenario.description.substring(0, 50)}...
              </span>
              <span className="text-xs text-purple-600 font-semibold">
                {scenario.correctType === 'independent' ? 'Independientes' : 'Dependientes'}
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
