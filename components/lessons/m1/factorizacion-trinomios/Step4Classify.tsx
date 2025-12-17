'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type SignCase = 'both-positive' | 'both-negative' | 'mixed-positive' | 'mixed-negative';

interface Expression {
  id: string;
  expression: string;
  b: number;
  c: number;
  correctCase: SignCase;
  explanation: string;
}

const EXPRESSIONS: Expression[] = [
  {
    id: 'e1',
    expression: 'x² + 6x + 8',
    b: 6,
    c: 8,
    correctCase: 'both-positive',
    explanation: 'b=6 (positivo), c=8 (positivo) → ambos números son positivos: (x+2)(x+4)',
  },
  {
    id: 'e2',
    expression: 'x² - 5x + 6',
    b: -5,
    c: 6,
    correctCase: 'both-negative',
    explanation: 'b=-5 (negativo), c=6 (positivo) → ambos números son negativos: (x-2)(x-3)',
  },
  {
    id: 'e3',
    expression: 'x² + x - 12',
    b: 1,
    c: -12,
    correctCase: 'mixed-positive',
    explanation: 'b=1 (positivo), c=-12 (negativo) → signos diferentes, el positivo mayor: (x+4)(x-3)',
  },
  {
    id: 'e4',
    expression: 'x² - 3x - 10',
    b: -3,
    c: -10,
    correctCase: 'mixed-negative',
    explanation: 'b=-3 (negativo), c=-10 (negativo) → signos diferentes, el negativo mayor: (x-5)(x+2)',
  },
  {
    id: 'e5',
    expression: 'x² + 11x + 24',
    b: 11,
    c: 24,
    correctCase: 'both-positive',
    explanation: 'b=11 (positivo), c=24 (positivo) → ambos números son positivos: (x+3)(x+8)',
  },
];

const CASE_OPTIONS: { id: SignCase; label: string; description: string; color: string }[] = [
  {
    id: 'both-positive',
    label: '(+)(+)',
    description: 'Ambos positivos',
    color: 'green',
  },
  {
    id: 'both-negative',
    label: '(-)(‑)',
    description: 'Ambos negativos',
    color: 'purple',
  },
  {
    id: 'mixed-positive',
    label: '(+)(-) mayor +',
    description: 'Diferentes, + mayor',
    color: 'blue',
  },
  {
    id: 'mixed-negative',
    label: '(+)(-) mayor -',
    description: 'Diferentes, - mayor',
    color: 'pink',
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  green: {
    bg: 'bg-green-100 dark:bg-green-900/50',
    border: 'border-green-500',
    text: 'text-green-700 dark:text-green-300',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/50',
    border: 'border-purple-500',
    text: 'text-purple-700 dark:text-purple-300',
  },
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/50',
    border: 'border-blue-500',
    text: 'text-blue-700 dark:text-blue-300',
  },
  pink: {
    bg: 'bg-pink-100 dark:bg-pink-900/50',
    border: 'border-pink-500',
    text: 'text-pink-700 dark:text-pink-300',
  },
};

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCase, setSelectedCase] = useState<SignCase | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(SignCase | null)[]>(Array(EXPRESSIONS.length).fill(null));

  const isComplete = currentIndex >= EXPRESSIONS.length;
  const currentExpression = isComplete ? EXPRESSIONS[0] : EXPRESSIONS[currentIndex];
  const isCorrect = selectedCase === currentExpression.correctCase;

  const handleSelect = (caseId: SignCase) => {
    if (showFeedback) return;
    setSelectedCase(caseId);
  };

  const handleCheck = () => {
    if (selectedCase === null) return;
    setShowFeedback(true);

    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedCase;
    setAnswers(newAnswers);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedCase(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedCase(null);
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
          Identifica el Caso de Signos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Determina qué signos tendrán los factores
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
                      ? answers[i] === EXPRESSIONS[i].correctCase
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentIndex
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {answers[i] !== null ? (answers[i] === EXPRESSIONS[i].correctCase ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Expression card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">¿Qué signos tendrán p y q?</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {currentExpression.expression}
              </p>
            </div>

            {/* Show b and c values */}
            <div className="flex justify-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-amber-200 dark:border-amber-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">b =</span>
                <span
                  className={cn(
                    'font-mono text-xl font-bold ml-2',
                    currentExpression.b > 0 ? 'text-green-600' : 'text-red-600'
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
                    currentExpression.c > 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {currentExpression.c > 0 ? '+' : ''}
                  {currentExpression.c}
                </span>
              </div>
            </div>

            {/* Case options */}
            <div className="grid grid-cols-2 gap-4">
              {CASE_OPTIONS.map((option) => {
                const colors = colorClasses[option.color];
                const isSelected = selectedCase === option.id;
                const isCorrectAnswer = option.id === currentExpression.correctCase;

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
                          : `${colors.bg} ${colors.border}`
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
                      <span
                        className={cn(
                          'font-semibold font-mono',
                          isSelected && !showFeedback ? colors.text : 'text-gray-700 dark:text-gray-300'
                        )}
                      >
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{option.description}</span>
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
                disabled={selectedCase === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedCase !== null
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
                ? 'Identificas muy bien los casos de signos'
                : 'Sigue practicando para mejorar'}
            </p>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="space-y-2">
              {EXPRESSIONS.map((expr, i) => {
                const isCorrectAnswer = answers[i] === expr.correctCase;
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
                      {CASE_OPTIONS.find((c) => c.id === expr.correctCase)?.label}
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
