'use client';

import { ArrowRight, Check, X, BookOpen, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons/useMultipleChoice';
import { useHintToggle } from '@/hooks/lessons/useHintToggle';
import { ProgressDots, FeedbackPanel, ResultsSummary } from '@/components/lessons/primitives';
import { PRACTICE_PROBLEMS, PracticeProblem, POPULATION_COLORS, DataPoint } from './data';

// Scatter plot for practice problems
function ProblemScatter({
  dataA,
  dataB,
}: {
  dataA: DataPoint[];
  dataB?: DataPoint[];
}) {
  const width = 260;
  const height = 180;
  const padding = 25;

  const toX = (x: number) => padding + (x / 10) * (width - padding * 2);
  const toY = (y: number) => height - padding - (y / 100) * (height - padding * 2);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[260px] mx-auto">
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

      {/* Axes */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        className="stroke-gray-400 dark:stroke-gray-500"
        strokeWidth="1.5"
      />
      <line
        x1={padding}
        y1={height - padding}
        x2={padding}
        y2={padding}
        className="stroke-gray-400 dark:stroke-gray-500"
        strokeWidth="1.5"
      />

      {/* Data A */}
      {dataA.map((p) => (
        <circle
          key={p.id}
          cx={toX(p.x)}
          cy={toY(p.y)}
          r={5}
          fill={POPULATION_COLORS.A.fill}
        />
      ))}

      {/* Data B */}
      {dataB?.map((p) => (
        <circle
          key={p.id}
          cx={toX(p.x)}
          cy={toY(p.y)}
          r={5}
          fill={POPULATION_COLORS.B.fill}
        />
      ))}

      {/* Legend */}
      {dataB && dataB.length > 0 && (
        <g>
          <circle cx={padding + 10} cy={12} r={4} fill={POPULATION_COLORS.A.fill} />
          <text x={padding + 18} y={15} className="fill-gray-600 dark:fill-gray-400 text-[8px]">A</text>
          <circle cx={padding + 40} cy={12} r={4} fill={POPULATION_COLORS.B.fill} />
          <text x={padding + 48} y={15} className="fill-gray-600 dark:fill-gray-400 text-[8px]">B</text>
        </g>
      )}
    </svg>
  );
}

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice<PracticeProblem>({
    items: PRACTICE_PROBLEMS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 4,
  });

  const hint = useHintToggle();

  if (!isActive) return null;

  // Hide hint when moving to next problem
  const handleNext = () => {
    hint.hideHint();
    mc.next();
  };

  // Results screen
  if (mc.isComplete) {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={PRACTICE_PROBLEMS.length}
          passed={mc.passed}
          passThreshold={4}
          successMessage="¡Excelente!"
          successSubtext="Dominas la interpretación de datos"
          failureSubtext="Repasa cómo analizar correlaciones"
          items={PRACTICE_PROBLEMS}
          getIsCorrect={(_, i) => mc.answers[i] === PRACTICE_PROBLEMS[i].correctAnswer}
          renderItem={(q, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300 text-sm">{q.context.slice(0, 50)}...</span>
            </>
          )}
          onRetry={() => {
            hint.hideHint();
            mc.reset();
          }}
          onContinue={onComplete}
          continueLabel="Ir al checkpoint"
        />
      </div>
    );
  }

  const problem = mc.currentItem;
  const progress = ((mc.currentIndex + 1) / PRACTICE_PROBLEMS.length) * 100;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-blue-700 dark:text-blue-300 font-medium">
            Problema {mc.currentIndex + 1} de {PRACTICE_PROBLEMS.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Context */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <p className="text-gray-700 dark:text-gray-300">
          {problem.context}
        </p>
      </div>

      {/* Scatter plot (if applicable) */}
      {problem.dataA && problem.dataA.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <ProblemScatter dataA={problem.dataA} dataB={problem.dataB} />
        </div>
      )}

      {/* Question */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <p className="font-semibold text-gray-800 dark:text-gray-200 text-center">
          {problem.question}
        </p>
      </div>

      {/* Hint toggle */}
      {!mc.showFeedback && (
        <button
          onClick={hint.toggleHint}
          className={cn(
            'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all',
            hint.showHint
              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
          )}
        >
          <Lightbulb size={18} />
          <span>{hint.showHint ? 'Ocultar pista' : 'Ver pista'}</span>
          {hint.showHint ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      )}

      {/* Hint content */}
      {hint.showHint && !mc.showFeedback && (
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700 animate-fadeIn">
          <p className="text-amber-800 dark:text-amber-200 text-sm">
            <strong>Pista:</strong> {problem.hint}
          </p>
        </div>
      )}

      {/* Options */}
      {!mc.showFeedback && (
        <div className="space-y-3">
          {problem.options.map((option, index) => (
            <button
              key={index}
              onClick={() => mc.select(index)}
              className={cn(
                'w-full p-4 rounded-xl border-2 text-left transition-all',
                mc.selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0',
                    mc.selectedAnswer === index
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-400'
                  )}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-sm">{option}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Feedback */}
      {mc.showFeedback && (
        <FeedbackPanel
          isCorrect={mc.isCorrect}
          explanation={problem.explanation}
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
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            )}
          >
            <span>Verificar</span>
            <Check size={20} />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>
              {mc.currentIndex < PRACTICE_PROBLEMS.length - 1 ? 'Siguiente' : 'Ver resultados'}
            </span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>

      {/* Progress dots */}
      <ProgressDots
        items={PRACTICE_PROBLEMS}
        currentIndex={mc.currentIndex}
        getStatus={(_, i) =>
          mc.answers[i] !== null
            ? mc.answers[i] === PRACTICE_PROBLEMS[i].correctAnswer
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
