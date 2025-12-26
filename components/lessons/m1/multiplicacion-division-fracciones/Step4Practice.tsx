'use client';

import { Check, X, Eye } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice, useHintToggle } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  OptionButton,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';
import { colors } from '@/lib/lessons/styles';

interface Problem {
  id: string;
  fraction1: { num: number; den: number };
  fraction2: { num: number; den: number };
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    fraction1: { num: 1, den: 2 },
    fraction2: { num: 1, den: 4 },
    options: ['1/8', '2/6', '1/6', '2/4'],
    correctIndex: 0,
    hint: 'Multiplica 1×1 arriba y 2×4 abajo',
    explanation: '1/2 × 1/4 = (1×1)/(2×4) = 1/8',
  },
  {
    id: 'p2',
    fraction1: { num: 2, den: 3 },
    fraction2: { num: 3, den: 4 },
    options: ['5/7', '6/7', '1/2', '2/7'],
    correctIndex: 2,
    hint: 'Multiplica arriba por arriba y abajo por abajo, luego simplifica',
    explanation: '2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2',
  },
  {
    id: 'p3',
    fraction1: { num: 3, den: 5 },
    fraction2: { num: 2, den: 3 },
    options: ['5/8', '6/8', '2/5', '3/8'],
    correctIndex: 2,
    hint: 'Multiplica y luego simplifica dividiendo por 3',
    explanation: '3/5 × 2/3 = (3×2)/(5×3) = 6/15 = 2/5',
  },
  {
    id: 'p4',
    fraction1: { num: 4, den: 5 },
    fraction2: { num: 5, den: 8 },
    options: ['9/13', '4/13', '1/2', '2/3'],
    correctIndex: 2,
    hint: 'Observa que 4 y 8 tienen factor común, y 5 y 5 se cancelan',
    explanation: '4/5 × 5/8 = (4×5)/(5×8) = 20/40 = 1/2',
  },
];

const REQUIRED_CORRECT = 3;

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: PROBLEMS,
    getCorrectAnswer: (item) => item.correctIndex,
    passThreshold: REQUIRED_CORRECT,
  });

  const hint = useHintToggle();

  if (!isActive) return null;

  const handleNext = () => {
    hint.hideHint();
    mc.next();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica: Multiplicación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Problema {mc.currentIndex + 1} de {PROBLEMS.length}
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={PROBLEMS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === PROBLEMS[i].correctIndex
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Problem */}
          <div className="bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-900/30 dark:to-blue-900/30 rounded-xl p-6">
            <div className="text-center mb-6">
              <p className="text-gray-600 dark:text-gray-400 mb-2">Resuelve y simplifica:</p>
              <div className="text-3xl md:text-4xl font-bold">
                <span className="text-orange-600 dark:text-orange-400">
                  {mc.currentItem.fraction1.num}/{mc.currentItem.fraction1.den}
                </span>
                <span className="text-gray-400 mx-3">×</span>
                <span className="text-blue-600 dark:text-blue-400">
                  {mc.currentItem.fraction2.num}/{mc.currentItem.fraction2.den}
                </span>
                <span className="text-gray-400 mx-3">=</span>
                <span className="text-purple-600 dark:text-purple-400">?</span>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {mc.currentItem.options.map((option, index) => (
                <OptionButton
                  key={index}
                  label={option}
                  index={index}
                  isSelected={mc.selectedAnswer === index}
                  isCorrect={index === mc.currentItem.correctIndex}
                  showFeedback={mc.showFeedback}
                  onClick={() => mc.select(index)}
                />
              ))}
            </div>

            {/* Hint button */}
            {!mc.showFeedback && !hint.showHint && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={hint.toggleHint}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all ${colors.hint.container} ${colors.hint.text}`}
                >
                  <Eye size={16} className={colors.hint.icon} />
                  <span>Ver pista</span>
                </button>
              </div>
            )}

            {/* Hint */}
            {hint.showHint && !mc.showFeedback && (
              <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg border border-amber-300 dark:border-amber-700 animate-fadeIn">
                <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                  <strong>Pista:</strong> {mc.currentItem.hint}
                </p>
              </div>
            )}
          </div>

          {mc.showFeedback && (
            <FeedbackPanel isCorrect={mc.isCorrect} explanation={mc.currentItem.explanation} />
          )}

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? handleNext : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < PROBLEMS.length - 1
                  ? 'Siguiente'
                  : 'Ver resultados'
                : 'Comprobar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={PROBLEMS.length}
          passed={mc.passed}
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Muy bien!"
          successSubtext="Dominas la multiplicación de fracciones"
          failureSubtext="Repasa la regla y vuelve a intentarlo"
          items={PROBLEMS}
          getIsCorrect={(_, i) => mc.answers[i] === PROBLEMS[i].correctIndex}
          renderItem={(p, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300">
                {p.fraction1.num}/{p.fraction1.den} × {p.fraction2.num}/{p.fraction2.den}
              </span>
              <span className="font-mono text-sm text-purple-600 ml-auto">
                {p.options[p.correctIndex]}
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
