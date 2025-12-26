'use client';

import { useState, useMemo } from 'react';
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

interface Expression {
  id: string;
  expression: string;
  a: number;
  b: number;
  c: number;
  ac: number;
  correctM: number;
  correctN: number;
  explanation: string;
}

interface Option {
  m: number;
  n: number;
  label: string;
  isCorrect: boolean;
}

const EXPRESSIONS: Expression[] = [
  {
    id: 'e1',
    expression: '2x² + 9x + 4',
    a: 2,
    b: 9,
    c: 4,
    ac: 8,
    correctM: 1,
    correctN: 8,
    explanation: 'a×c = 2×4 = 8. Necesitamos m+n=9 y m×n=8. Los números 1 y 8 cumplen: 1+8=9 ✓ y 1×8=8 ✓',
  },
  {
    id: 'e2',
    expression: '3x² + 8x + 4',
    a: 3,
    b: 8,
    c: 4,
    ac: 12,
    correctM: 2,
    correctN: 6,
    explanation: 'a×c = 3×4 = 12. Necesitamos m+n=8 y m×n=12. Los números 2 y 6 cumplen: 2+6=8 ✓ y 2×6=12 ✓',
  },
  {
    id: 'e3',
    expression: '2x² + 3x - 5',
    a: 2,
    b: 3,
    c: -5,
    ac: -10,
    correctM: 5,
    correctN: -2,
    explanation: 'a×c = 2×(-5) = -10. Necesitamos m+n=3 y m×n=-10. Los números 5 y -2 cumplen: 5+(-2)=3 ✓ y 5×(-2)=-10 ✓',
  },
  {
    id: 'e4',
    expression: '4x² - 4x - 3',
    a: 4,
    b: -4,
    c: -3,
    ac: -12,
    correctM: 2,
    correctN: -6,
    explanation: 'a×c = 4×(-3) = -12. Necesitamos m+n=-4 y m×n=-12. Los números 2 y -6 cumplen: 2+(-6)=-4 ✓ y 2×(-6)=-12 ✓',
  },
  {
    id: 'e5',
    expression: '5x² - 13x + 6',
    a: 5,
    b: -13,
    c: 6,
    ac: 30,
    correctM: -3,
    correctN: -10,
    explanation: 'a×c = 5×6 = 30. Necesitamos m+n=-13 y m×n=30. Los números -3 y -10 cumplen: -3+(-10)=-13 ✓ y (-3)×(-10)=30 ✓',
  },
];

function getOptionsForExpression(expr: Expression): Option[] {
  const { b, ac, correctM, correctN } = expr;

  // Generate wrong options that look plausible
  const options: Option[] = [
    { m: correctM, n: correctN, label: `m=${correctM}, n=${correctN}`, isCorrect: true },
  ];

  // Wrong option 1: numbers that sum to b but don't multiply to ac
  const wrongSum1 = Math.floor(b / 2);
  const wrongSum2 = b - wrongSum1;
  if (wrongSum1 * wrongSum2 !== ac) {
    options.push({ m: wrongSum1, n: wrongSum2, label: `m=${wrongSum1}, n=${wrongSum2}`, isCorrect: false });
  }

  // Wrong option 2: numbers that multiply to c (not ac) and might sum differently
  const wrongMult1 = expr.c > 0 ? 1 : -1;
  const wrongMult2 = expr.c;
  if (wrongMult1 + wrongMult2 !== b || wrongMult1 * wrongMult2 !== ac) {
    options.push({ m: wrongMult1, n: wrongMult2, label: `m=${wrongMult1}, n=${wrongMult2}`, isCorrect: false });
  }

  // Wrong option 3: swap signs or use factors of ac that don't sum to b
  const wrongAlt1 = correctM * -1;
  const wrongAlt2 = correctN * -1;
  if (wrongAlt1 + wrongAlt2 !== b) {
    options.push({ m: wrongAlt1, n: wrongAlt2, label: `m=${wrongAlt1}, n=${wrongAlt2}`, isCorrect: false });
  }

  // Ensure we have exactly 4 options
  while (options.length < 4) {
    const rand1 = Math.floor(Math.random() * 10) - 5;
    const rand2 = b - rand1 + 1; // Will not sum to b correctly
    if (!options.some(o => o.m === rand1 && o.n === rand2)) {
      options.push({ m: rand1, n: rand2, label: `m=${rand1}, n=${rand2}`, isCorrect: false });
    }
  }

  // Shuffle options and return exactly 4
  return options.slice(0, 4).sort(() => Math.random() - 0.5);
}

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  // Generate shuffled options once per component mount
  const optionSets = useMemo(() => EXPRESSIONS.map(getOptionsForExpression), []);

  // Create a map from expression id to the correct answer index
  const correctAnswerMap = useMemo(() => {
    const map: Record<string, number> = {};
    EXPRESSIONS.forEach((expr, i) => {
      const options = optionSets[i];
      map[expr.id] = options.findIndex(o => o.isCorrect);
    });
    return map;
  }, [optionSets]);

  const mc = useMultipleChoice({
    items: EXPRESSIONS,
    getCorrectAnswer: (item) => correctAnswerMap[item.id],
    passThreshold: 4,
  });

  const currentOptions = optionSets[mc.currentIndex];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica los Valores m y n
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Encuentra los números correctos para el Método AC
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={EXPRESSIONS}
            currentIndex={mc.currentIndex}
            getStatus={(item, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === correctAnswerMap[item.id]
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Expression card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">¿Qué valores de m y n necesitas?</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {mc.currentItem.expression}
              </p>
            </div>

            {/* Show a, b, c, and a×c values */}
            <div className="flex justify-center gap-4 mb-6 flex-wrap">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-red-200 dark:border-red-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">a =</span>
                <span className="font-mono text-xl text-red-600 font-bold ml-2">{mc.currentItem.a}</span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-amber-200 dark:border-amber-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">b =</span>
                <span className="font-mono text-xl font-bold ml-2 text-amber-600">
                  {mc.currentItem.b > 0 ? '+' : ''}
                  {mc.currentItem.b}
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-green-200 dark:border-green-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">c =</span>
                <span className="font-mono text-xl font-bold ml-2 text-green-600">
                  {mc.currentItem.c > 0 ? '+' : ''}
                  {mc.currentItem.c}
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-purple-200 dark:border-purple-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">a×c =</span>
                <span className="font-mono text-xl text-purple-600 font-bold ml-2">{mc.currentItem.ac}</span>
              </div>
            </div>

            {/* Reminder */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 mb-6 text-center">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Recuerda: <strong>m + n = {mc.currentItem.b}</strong> y{' '}
                <strong>m × n = {mc.currentItem.ac}</strong>
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {currentOptions.map((option, index) => {
                const isSelected = mc.selectedAnswer === index;
                const isCorrectAnswer = option.isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => mc.select(index)}
                    disabled={mc.showFeedback}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all font-medium',
                      isSelected
                        ? mc.showFeedback
                          ? isCorrectAnswer
                            ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                            : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                          : 'bg-amber-100 dark:bg-amber-900/50 border-amber-500'
                        : mc.showFeedback && isCorrectAnswer
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-400'
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {mc.showFeedback && isCorrectAnswer && <Check size={18} className="text-green-600" />}
                      {mc.showFeedback && isSelected && !isCorrectAnswer && (
                        <X size={18} className="text-red-600" />
                      )}
                      <span className="font-mono text-lg text-gray-700 dark:text-gray-300">
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        suma: {option.m + option.n}, producto: {option.m * option.n}
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
                ? mc.currentIndex < EXPRESSIONS.length - 1
                  ? 'Siguiente'
                  : 'Ver Resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={EXPRESSIONS.length}
          passed={mc.passed}
          passThreshold={4}
          successMessage="¡Excelente!"
          successSubtext="Identificas muy bien los valores m y n"
          failureSubtext="Sigue practicando para mejorar"
          items={EXPRESSIONS}
          getIsCorrect={(item, i) => mc.answers[i] === correctAnswerMap[item.id]}
          renderItem={(expr, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="font-mono text-gray-700 dark:text-gray-300">{expr.expression}</span>
              <span className="font-mono text-sm text-purple-600 ml-auto">
                m={expr.correctM}, n={expr.correctN}
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
