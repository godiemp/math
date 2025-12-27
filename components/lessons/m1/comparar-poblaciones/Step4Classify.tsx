'use client';

import { ArrowRight, Check, X, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons/useMultipleChoice';
import { ProgressDots, FeedbackPanel, ActionButton, ResultsSummary } from '@/components/lessons/primitives';
import { CLASSIFY_CHALLENGES, ClassifyChallenge, POPULATION_COLORS, DataPoint } from './data';

// Scatter plot for challenges
function ChallengeScatter({
  dataA,
  dataB,
}: {
  dataA: DataPoint[];
  dataB?: DataPoint[];
}) {
  const width = 280;
  const height = 200;
  const padding = 30;

  const toX = (x: number) => padding + (x / 10) * (width - padding * 2);
  const toY = (y: number) => height - padding - (y / 100) * (height - padding * 2);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[280px] mx-auto">
      {/* Grid */}
      {[0, 25, 50, 75, 100].map((y) => (
        <line
          key={`h-${y}`}
          x1={padding}
          y1={toY(y)}
          x2={width - padding}
          y2={toY(y)}
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeWidth="0.5"
          strokeDasharray="2,2"
        />
      ))}
      {[0, 2, 4, 6, 8, 10].map((x) => (
        <line
          key={`v-${x}`}
          x1={toX(x)}
          y1={padding}
          x2={toX(x)}
          y2={height - padding}
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeWidth="0.5"
          strokeDasharray="2,2"
        />
      ))}

      {/* Axes */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        className="stroke-gray-500 dark:stroke-gray-400"
        strokeWidth="1.5"
      />
      <line
        x1={padding}
        y1={height - padding}
        x2={padding}
        y2={padding}
        className="stroke-gray-500 dark:stroke-gray-400"
        strokeWidth="1.5"
      />

      {/* Axis labels */}
      <text x={width / 2} y={height - 5} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-[10px]">
        X
      </text>
      <text x={10} y={height / 2} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-[10px]" transform="rotate(-90, 10, 100)">
        Y
      </text>

      {/* Data A */}
      {dataA.map((p) => (
        <circle
          key={p.id}
          cx={toX(p.x)}
          cy={toY(p.y)}
          r={6}
          fill={POPULATION_COLORS.A.fill}
        />
      ))}

      {/* Data B */}
      {dataB?.map((p) => (
        <circle
          key={p.id}
          cx={toX(p.x)}
          cy={toY(p.y)}
          r={6}
          fill={POPULATION_COLORS.B.fill}
        />
      ))}

      {/* Legend */}
      {dataB && dataB.length > 0 && (
        <g>
          <circle cx={padding + 10} cy={15} r={4} fill={POPULATION_COLORS.A.fill} />
          <text x={padding + 20} y={18} className="fill-gray-600 dark:fill-gray-400 text-[9px]">A</text>
          <circle cx={padding + 45} cy={15} r={4} fill={POPULATION_COLORS.B.fill} />
          <text x={padding + 55} y={18} className="fill-gray-600 dark:fill-gray-400 text-[9px]">B</text>
        </g>
      )}
    </svg>
  );
}

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice<ClassifyChallenge>({
    items: CLASSIFY_CHALLENGES,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 5,
  });

  if (!isActive) return null;

  // Results screen
  if (mc.isComplete) {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={CLASSIFY_CHALLENGES.length}
          passed={mc.passed}
          passThreshold={5}
          successMessage="¡Excelente!"
          successSubtext="Dominas la comparación de poblaciones"
          failureSubtext="Repasa cómo interpretar gráficos de dispersión"
          items={CLASSIFY_CHALLENGES}
          getIsCorrect={(_, i) => mc.answers[i] === CLASSIFY_CHALLENGES[i].correctAnswer}
          renderItem={(q, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300 text-sm">{q.question}</span>
            </>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
          continueLabel="Continuar a práctica"
        />
      </div>
    );
  }

  const challenge = mc.currentItem;
  const progress = ((mc.currentIndex + 1) / CLASSIFY_CHALLENGES.length) * 100;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <span className="text-purple-700 dark:text-purple-300 font-medium">
            Clasificacion {mc.currentIndex + 1} de {CLASSIFY_CHALLENGES.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-purple-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Description */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <p className="text-gray-700 dark:text-gray-300 text-center">
          {challenge.description}
        </p>
      </div>

      {/* Scatter plot */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
        <ChallengeScatter dataA={challenge.dataA} dataB={challenge.dataB} />
      </div>

      {/* Question */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
        <p className="text-center font-semibold text-purple-800 dark:text-purple-200">
          {challenge.question}
        </p>
      </div>

      {/* Options */}
      {!mc.showFeedback && (
        <div className="space-y-3">
          {challenge.options.map((option, index) => (
            <button
              key={index}
              onClick={() => mc.select(index)}
              className={cn(
                'w-full p-4 rounded-xl border-2 text-left transition-all',
                mc.selectedAnswer === index
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold',
                    mc.selectedAnswer === index
                      ? 'border-purple-500 bg-purple-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-400'
                  )}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Feedback */}
      {mc.showFeedback && (
        <FeedbackPanel
          isCorrect={mc.isCorrect}
          explanation={challenge.explanation}
        />
      )}

      {/* Action button */}
      <div className="flex justify-center">
        {!mc.showFeedback ? (
          <button
            onClick={mc.check}
            disabled={mc.selectedAnswer === null}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg',
              mc.selectedAnswer !== null
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            )}
          >
            <span>Verificar</span>
            <Check size={20} />
          </button>
        ) : (
          <button
            onClick={mc.next}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>
              {mc.currentIndex < CLASSIFY_CHALLENGES.length - 1 ? 'Siguiente' : 'Ver resultados'}
            </span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>

      {/* Progress dots */}
      <ProgressDots
        items={CLASSIFY_CHALLENGES}
        currentIndex={mc.currentIndex}
        getStatus={(_, i) =>
          mc.answers[i] !== null
            ? mc.answers[i] === CLASSIFY_CHALLENGES[i].correctAnswer
              ? 'correct'
              : 'incorrect'
            : i === mc.currentIndex
              ? 'current'
              : 'pending'
        }
      />
    </div>
  );
}
