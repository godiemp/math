'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

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
  id: string;
  m: number;
  n: number;
  label: string;
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
    { id: 'correct', m: correctM, n: correctN, label: `m=${correctM}, n=${correctN}` },
  ];

  // Wrong option 1: numbers that sum to b but don't multiply to ac
  const wrongSum1 = Math.floor(b / 2);
  const wrongSum2 = b - wrongSum1;
  if (wrongSum1 * wrongSum2 !== ac) {
    options.push({ id: 'wrong1', m: wrongSum1, n: wrongSum2, label: `m=${wrongSum1}, n=${wrongSum2}` });
  }

  // Wrong option 2: numbers that multiply to c (not ac) and might sum differently
  const wrongMult1 = expr.c > 0 ? 1 : -1;
  const wrongMult2 = expr.c;
  if (wrongMult1 + wrongMult2 !== b || wrongMult1 * wrongMult2 !== ac) {
    options.push({ id: 'wrong2', m: wrongMult1, n: wrongMult2, label: `m=${wrongMult1}, n=${wrongMult2}` });
  }

  // Wrong option 3: swap signs or use factors of ac that don't sum to b
  const wrongAlt1 = correctM * -1;
  const wrongAlt2 = correctN * -1;
  if (wrongAlt1 + wrongAlt2 !== b) {
    options.push({ id: 'wrong3', m: wrongAlt1, n: wrongAlt2, label: `m=${wrongAlt1}, n=${wrongAlt2}` });
  }

  // Ensure we have exactly 4 options
  while (options.length < 4) {
    const rand1 = Math.floor(Math.random() * 10) - 5;
    const rand2 = b - rand1 + 1; // Will not sum to b correctly
    if (!options.some(o => o.m === rand1 && o.n === rand2)) {
      options.push({ id: `wrong${options.length}`, m: rand1, n: rand2, label: `m=${rand1}, n=${rand2}` });
    }
  }

  // Shuffle options
  return options.slice(0, 4).sort(() => Math.random() - 0.5);
}

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(EXPRESSIONS.length).fill(null));
  const [optionSets] = useState(() => EXPRESSIONS.map(getOptionsForExpression));

  const isComplete = currentIndex >= EXPRESSIONS.length;
  const currentExpression = isComplete ? EXPRESSIONS[0] : EXPRESSIONS[currentIndex];
  const currentOptions = optionSets[currentIndex] || optionSets[0];

  const isCorrect = selectedOption === 'correct';

  const handleSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setShowFeedback(true);

    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedOption;
    setAnswers(newAnswers);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setAnswers(Array(EXPRESSIONS.length).fill(null));
  };

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

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Trinomio {currentIndex + 1} de {EXPRESSIONS.length}
            </div>
            <div className="flex gap-1">
              {EXPRESSIONS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    answers[i] !== null
                      ? answers[i] === 'correct'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentIndex
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {answers[i] !== null ? (answers[i] === 'correct' ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Expression card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">¿Qué valores de m y n necesitas?</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {currentExpression.expression}
              </p>
            </div>

            {/* Show a, b, c, and a×c values */}
            <div className="flex justify-center gap-4 mb-6 flex-wrap">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-red-200 dark:border-red-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">a =</span>
                <span className="font-mono text-xl text-red-600 font-bold ml-2">{currentExpression.a}</span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-amber-200 dark:border-amber-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">b =</span>
                <span
                  className={cn(
                    'font-mono text-xl font-bold ml-2',
                    currentExpression.b > 0 ? 'text-amber-600' : 'text-amber-600'
                  )}
                >
                  {currentExpression.b > 0 ? '+' : ''}
                  {currentExpression.b}
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-green-200 dark:border-green-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">c =</span>
                <span
                  className={cn(
                    'font-mono text-xl font-bold ml-2',
                    currentExpression.c > 0 ? 'text-green-600' : 'text-green-600'
                  )}
                >
                  {currentExpression.c > 0 ? '+' : ''}
                  {currentExpression.c}
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-purple-200 dark:border-purple-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">a×c =</span>
                <span className="font-mono text-xl text-purple-600 font-bold ml-2">{currentExpression.ac}</span>
              </div>
            </div>

            {/* Reminder */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 mb-6 text-center">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Recuerda: <strong>m + n = {currentExpression.b}</strong> y{' '}
                <strong>m × n = {currentExpression.ac}</strong>
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {currentOptions.map((option) => {
                const isSelected = selectedOption === option.id;
                const isCorrectAnswer = option.id === 'correct';

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    disabled={showFeedback}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all font-medium',
                      isSelected
                        ? showFeedback
                          ? isCorrectAnswer
                            ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                            : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                          : 'bg-amber-100 dark:bg-amber-900/50 border-amber-500'
                        : showFeedback && isCorrectAnswer
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-400'
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {showFeedback && isCorrectAnswer && <Check size={18} className="text-green-600" />}
                      {showFeedback && isSelected && !isCorrectAnswer && (
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

          {/* Feedback */}
          {showFeedback && (
            <div
              className={cn(
                'p-4 rounded-xl animate-fadeIn',
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                  : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
              )}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4
                    className={cn(
                      'font-bold mb-1',
                      isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                    )}
                  >
                    {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{currentExpression.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedOption === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedOption !== null
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
              >
                {currentIndex < EXPRESSIONS.length - 1 ? 'Siguiente' : 'Ver Resultados'}
              </button>
            )}
          </div>
        </>
      ) : (
        // Results
        <div className="space-y-6 animate-fadeIn">
          <div
            className={cn(
              'rounded-2xl p-8 text-center',
              correctCount >= 4
                ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
            )}
          >
            <div className="text-6xl mb-4">{correctCount >= 4 ? '🎯' : '💪'}</div>
            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                correctCount >= 4 ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {correctCount >= 4 ? '¡Excelente!' : '¡Buen intento!'}
            </h3>
            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {EXPRESSIONS.length}
            </div>
            <p
              className={cn(
                correctCount >= 4 ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {correctCount >= 4
                ? 'Identificas muy bien los valores m y n'
                : 'Sigue practicando para mejorar'}
            </p>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="space-y-2">
              {EXPRESSIONS.map((expr, i) => {
                const isCorrectAnswer = answers[i] === 'correct';
                return (
                  <div
                    key={expr.id}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg',
                      isCorrectAnswer ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {isCorrectAnswer ? (
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                      )}
                      <span className="font-mono text-gray-700 dark:text-gray-300">{expr.expression}</span>
                    </div>
                    <span className="font-mono text-sm text-purple-600">
                      m={expr.correctM}, n={expr.correctN}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            {correctCount < 4 && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
                <span>Intentar de nuevo</span>
              </button>
            )}
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
