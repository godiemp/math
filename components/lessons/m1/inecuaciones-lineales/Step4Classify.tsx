'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import { InlineMath } from '@/components/math/MathDisplay';
import {
  ProgressDots,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

interface ClassifyQuestion {
  id: string;
  inequality: string;
  inequalityLatex: string;
  options: string[];
  optionsLatex: string[];
  correctAnswer: number;
  explanation: string;
  explanationLatex: string;
  isNegative: boolean;
}

const QUESTIONS: ClassifyQuestion[] = [
  {
    id: 'q1',
    inequality: '3x > 15',
    inequalityLatex: '3x > 15',
    options: ['x > 5', 'x < 5', 'x > 45', 'x < 45'],
    optionsLatex: ['x > 5', 'x < 5', 'x > 45', 'x < 45'],
    correctAnswer: 0,
    explanation: '3x > 15 → x > 15/3 → x > 5',
    explanationLatex: '3x > 15 \\rightarrow x > \\frac{15}{3} \\rightarrow x > 5',
    isNegative: false,
  },
  {
    id: 'q2',
    inequality: 'x/4 <= 3',
    inequalityLatex: '\\frac{x}{4} \\leq 3',
    options: ['x <= 12', 'x >= 12', 'x <= 0,75', 'x >= 0,75'],
    optionsLatex: ['x \\leq 12', 'x \\geq 12', 'x \\leq 0{,}75', 'x \\geq 0{,}75'],
    correctAnswer: 0,
    explanation: 'x/4 <= 3 → x <= 4·3 → x <= 12',
    explanationLatex: '\\frac{x}{4} \\leq 3 \\rightarrow x \\leq 4 \\cdot 3 \\rightarrow x \\leq 12',
    isNegative: false,
  },
  {
    id: 'q3',
    inequality: '-2x < 8',
    inequalityLatex: '-2x < 8',
    options: ['x < -4', 'x > -4', 'x < 4', 'x > 4'],
    optionsLatex: ['x < -4', 'x > -4', 'x < 4', 'x > 4'],
    correctAnswer: 1,
    explanation: '-2x < 8 → x > 8/(-2) → x > -4 (signo invertido)',
    explanationLatex: '-2x < 8 \\rightarrow x > \\frac{8}{-2} \\rightarrow x > -4 \\text{ (signo invertido)}',
    isNegative: true,
  },
  {
    id: 'q4',
    inequality: '2x - 5 >= 9',
    inequalityLatex: '2x - 5 \\geq 9',
    options: ['x >= 2', 'x >= 7', 'x <= 7', 'x <= 2'],
    optionsLatex: ['x \\geq 2', 'x \\geq 7', 'x \\leq 7', 'x \\leq 2'],
    correctAnswer: 1,
    explanation: '2x >= 9 + 5 → 2x >= 14 → x >= 7',
    explanationLatex: '2x \\geq 9 + 5 \\rightarrow 2x \\geq 14 \\rightarrow x \\geq 7',
    isNegative: false,
  },
  {
    id: 'q5',
    inequality: '10 - 3x > 1',
    inequalityLatex: '10 - 3x > 1',
    options: ['x > 3', 'x < 3', 'x > -3', 'x < -3'],
    optionsLatex: ['x > 3', 'x < 3', 'x > -3', 'x < -3'],
    correctAnswer: 1,
    explanation: '-3x > 1 - 10 → -3x > -9 → x < 3 (signo invertido)',
    explanationLatex: '-3x > 1 - 10 \\rightarrow -3x > -9 \\rightarrow x < 3 \\text{ (signo invertido)}',
    isNegative: true,
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 4,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Resuelve las Inecuaciones</h2>
        <p className="text-gray-600 dark:text-gray-300">Encuentra el intervalo solución para cada inecuación</p>
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
            {/* Warning for negative coefficient */}
            {mc.currentItem.isNegative && (
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 mb-4 border border-amber-200 dark:border-amber-700">
                <p className="text-amber-700 dark:text-amber-300 text-sm text-center">
                  ⚠️ Atención: Esta inecuación tiene un coeficiente negativo
                </p>
              </div>
            )}

            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Resuelve:</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                <InlineMath latex={mc.currentItem.inequalityLatex} />
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {mc.currentItem.optionsLatex.map((optionLatex, index) => (
                <button
                  key={index}
                  onClick={() => mc.select(index)}
                  disabled={mc.showFeedback}
                  className={cn(
                    'p-4 rounded-xl font-medium transition-all border-2 text-lg',
                    mc.showFeedback
                      ? index === mc.currentItem.correctAnswer
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                        : mc.selectedAnswer === index
                        ? 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-400'
                      : mc.selectedAnswer === index
                      ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                  )}
                >
                  <InlineMath latex={optionLatex} />
                </button>
              ))}
            </div>
          </div>

          {mc.showFeedback && (
            <div
              className={cn(
                'p-4 rounded-xl animate-fadeIn',
                mc.isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                  : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
              )}
            >
              <div className="flex items-start gap-3">
                {mc.isCorrect ? (
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4
                    className={cn(
                      'font-bold mb-1',
                      mc.isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                    )}
                  >
                    {mc.isCorrect ? '¡Correcto!' : 'Incorrecto'}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <InlineMath latex={mc.currentItem.explanationLatex} />
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? mc.next : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < QUESTIONS.length - 1
                  ? 'Siguiente'
                  : 'Ver resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={QUESTIONS.length}
          passed={mc.passed}
          passThreshold={4}
          successMessage="Excelente trabajo!"
          successSubtext="Has demostrado que sabes resolver inecuaciones lineales"
          failureSubtext="Necesitas al menos 4 correctas para continuar"
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === QUESTIONS[i].correctAnswer}
          renderItem={(q, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className={cn('text-gray-700 dark:text-gray-300', q.isNegative && 'text-purple-600')}>
                <InlineMath latex={q.inequalityLatex} />
              </span>
              <span className="text-sm text-purple-600 ml-auto">
                <InlineMath latex={q.optionsLatex[q.correctAnswer]} />
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
