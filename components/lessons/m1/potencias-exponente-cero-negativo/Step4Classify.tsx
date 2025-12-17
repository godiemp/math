'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type ResultType = '1' | 'positive-fraction' | 'negative-fraction' | 'whole-number';

interface Expression {
  id: string;
  expression: string;
  correctType: ResultType;
  explanation: string;
}

const EXPRESSIONS: Expression[] = [
  {
    id: 'e1',
    expression: '8⁰',
    correctType: '1',
    explanation: 'Cualquier número distinto de cero elevado a 0 es igual a 1.',
  },
  {
    id: 'e2',
    expression: '3⁻²',
    correctType: 'positive-fraction',
    explanation: '3⁻² = 1/3² = 1/9, que es una fracción positiva.',
  },
  {
    id: 'e3',
    expression: '(-4)⁰',
    correctType: '1',
    explanation: 'Incluso con base negativa, cualquier número ≠ 0 elevado a 0 es 1.',
  },
  {
    id: 'e4',
    expression: '5⁻¹',
    correctType: 'positive-fraction',
    explanation: '5⁻¹ = 1/5, que es una fracción positiva.',
  },
  {
    id: 'e5',
    expression: '(1/2)⁻¹',
    correctType: 'whole-number',
    explanation: '(1/2)⁻¹ = 2/1 = 2. El exponente negativo invierte la fracción.',
  },
];

const TYPE_OPTIONS: { id: ResultType; label: string; color: string }[] = [
  { id: '1', label: 'Igual a 1', color: 'blue' },
  { id: 'positive-fraction', label: 'Fracción positiva', color: 'purple' },
  { id: 'whole-number', label: 'Número entero > 1', color: 'teal' },
  { id: 'negative-fraction', label: 'Fracción negativa', color: 'pink' },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/50',
    border: 'border-blue-500',
    text: 'text-blue-700 dark:text-blue-300',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/50',
    border: 'border-purple-500',
    text: 'text-purple-700 dark:text-purple-300',
  },
  teal: {
    bg: 'bg-teal-100 dark:bg-teal-900/50',
    border: 'border-teal-500',
    text: 'text-teal-700 dark:text-teal-300',
  },
  pink: {
    bg: 'bg-pink-100 dark:bg-pink-900/50',
    border: 'border-pink-500',
    text: 'text-pink-700 dark:text-pink-300',
  },
};

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<ResultType | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(ResultType | null)[]>(
    Array(EXPRESSIONS.length).fill(null)
  );

  const isComplete = currentIndex >= EXPRESSIONS.length;
  const currentExpression = isComplete ? EXPRESSIONS[0] : EXPRESSIONS[currentIndex];
  const isCorrect = selectedType === currentExpression.correctType;

  const handleSelect = (type: ResultType) => {
    if (showFeedback) return;
    setSelectedType(type);
  };

  const handleCheck = () => {
    if (selectedType === null) return;
    setShowFeedback(true);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedType;
    setAnswers(newAnswers);
    if (isCorrect) setCorrectCount((prev) => prev + 1);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedType(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedType(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setAnswers(Array(EXPRESSIONS.length).fill(null));
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica el Resultado
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Qué tipo de resultado produce cada potencia?
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress indicators */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Expresión {currentIndex + 1} de {EXPRESSIONS.length}
            </div>
            <div className="flex gap-1">
              {EXPRESSIONS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    answers[i] !== null
                      ? answers[i] === EXPRESSIONS[i].correctType
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentIndex
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {answers[i] !== null ? (
                    answers[i] === EXPRESSIONS[i].correctType ? (
                      '✓'
                    ) : (
                      '✗'
                    )
                  ) : (
                    i + 1
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Expression card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <p className="text-gray-500 dark:text-gray-400 mb-2">¿Qué tipo de resultado da?</p>
              <p className="font-mono text-4xl font-bold text-gray-800 dark:text-gray-200">
                {currentExpression.expression}
              </p>
            </div>

            {/* Type options */}
            <div className="grid grid-cols-2 gap-4">
              {TYPE_OPTIONS.map((option) => {
                const colors = colorClasses[option.color];
                const isSelected = selectedType === option.id;
                const isCorrectAnswer = option.id === currentExpression.correctType;

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
                    <div className="flex items-center justify-center gap-2">
                      {showFeedback && isCorrectAnswer && (
                        <Check size={18} className="text-green-600" />
                      )}
                      {showFeedback && isSelected && !isCorrectAnswer && (
                        <X size={18} className="text-red-600" />
                      )}
                      <span
                        className={cn(
                          'font-semibold',
                          isSelected && !showFeedback
                            ? colors.text
                            : 'text-gray-700 dark:text-gray-300'
                        )}
                      >
                        {option.label}
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
                      isCorrect
                        ? 'text-green-800 dark:text-green-300'
                        : 'text-amber-800 dark:text-amber-300'
                    )}
                  >
                    {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {currentExpression.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedType === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedType !== null
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                {currentIndex < EXPRESSIONS.length - 1 ? 'Siguiente' : 'Ver Resultados'}
              </button>
            )}
          </div>
        </>
      ) : (
        /* Results screen */
        <div className="space-y-6 animate-fadeIn">
          {/* Results card */}
          <div
            className={cn(
              'rounded-2xl p-8 text-center',
              correctCount >= 4
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-800'
                : 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-800'
            )}
          >
            {correctCount >= 4 ? (
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            ) : (
              <div className="text-6xl mb-4">💪</div>
            )}
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {correctCount >= 4 ? '¡Excelente!' : '¡Buen intento!'}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Obtuviste{' '}
              <span
                className={cn(
                  'font-bold',
                  correctCount >= 4 ? 'text-green-600' : 'text-amber-600'
                )}
              >
                {correctCount}/{EXPRESSIONS.length}
              </span>{' '}
              respuestas correctas
            </p>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
              Resumen:
            </h4>
            <div className="space-y-2">
              {EXPRESSIONS.map((expr, i) => {
                const wasCorrect = answers[i] === expr.correctType;
                const typeLabel = TYPE_OPTIONS.find((t) => t.id === expr.correctType)?.label;
                return (
                  <div
                    key={expr.id}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg',
                      wasCorrect
                        ? 'bg-green-50 dark:bg-green-900/30'
                        : 'bg-red-50 dark:bg-red-900/30'
                    )}
                  >
                    <span className="font-mono text-gray-700 dark:text-gray-300">
                      {expr.expression}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{typeLabel}</span>
                    {wasCorrect ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

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
