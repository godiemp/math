'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Expression {
  id: string;
  expression: string;
  b: number;
  halfB: number;
  halfBSquared: number;
  correctAnswer: number; // index of correct option
  options: string[];
  explanation: string;
}

const EXPRESSIONS: Expression[] = [
  {
    id: 'e1',
    expression: 'x² + 10x + 7',
    b: 10,
    halfB: 5,
    halfBSquared: 25,
    correctAnswer: 0,
    options: ['(x + 5)² - 18', '(x + 5)² + 18', '(x + 10)² - 18', '(x + 5)² - 7'],
    explanation: 'b = 10, b/2 = 5, (b/2)² = 25. Resultado: (x + 5)² + (7 - 25) = (x + 5)² - 18',
  },
  {
    id: 'e2',
    expression: 'x² - 4x + 1',
    b: -4,
    halfB: -2,
    halfBSquared: 4,
    correctAnswer: 1,
    options: ['(x + 2)² - 3', '(x - 2)² - 3', '(x - 2)² + 3', '(x - 4)² - 3'],
    explanation: 'b = -4, b/2 = -2, (b/2)² = 4. Resultado: (x - 2)² + (1 - 4) = (x - 2)² - 3',
  },
  {
    id: 'e3',
    expression: 'x² + 6x + 11',
    b: 6,
    halfB: 3,
    halfBSquared: 9,
    correctAnswer: 2,
    options: ['(x + 3)² - 2', '(x + 6)² + 2', '(x + 3)² + 2', '(x + 3)² + 11'],
    explanation: 'b = 6, b/2 = 3, (b/2)² = 9. Resultado: (x + 3)² + (11 - 9) = (x + 3)² + 2',
  },
  {
    id: 'e4',
    expression: 'x² - 8x + 12',
    b: -8,
    halfB: -4,
    halfBSquared: 16,
    correctAnswer: 0,
    options: ['(x - 4)² - 4', '(x - 4)² + 4', '(x + 4)² - 4', '(x - 8)² - 4'],
    explanation: 'b = -8, b/2 = -4, (b/2)² = 16. Resultado: (x - 4)² + (12 - 16) = (x - 4)² - 4',
  },
  {
    id: 'e5',
    expression: 'x² + 2x - 5',
    b: 2,
    halfB: 1,
    halfBSquared: 1,
    correctAnswer: 3,
    options: ['(x + 1)² + 6', '(x + 2)² - 6', '(x + 1)² - 5', '(x + 1)² - 6'],
    explanation: 'b = 2, b/2 = 1, (b/2)² = 1. Resultado: (x + 1)² + (-5 - 1) = (x + 1)² - 6',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(EXPRESSIONS.length).fill(null));

  const isComplete = currentIndex >= EXPRESSIONS.length;
  const currentExpression = isComplete ? EXPRESSIONS[0] : EXPRESSIONS[currentIndex];
  const isCorrect = selectedAnswer === currentExpression.correctAnswer;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);

    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
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
          Identifica el Cuadrado Completo
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Selecciona la forma correcta después de completar el cuadrado
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
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
                      ? answers[i] === EXPRESSIONS[i].correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentIndex
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {answers[i] !== null ? (answers[i] === EXPRESSIONS[i].correctAnswer ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Expression card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Completa el cuadrado:</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {currentExpression.expression}
              </p>
            </div>

            {/* Show b values */}
            <div className="flex justify-center gap-6 mb-6 flex-wrap">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-blue-200 dark:border-blue-600 text-center">
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
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-purple-200 dark:border-purple-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">b/2 =</span>
                <span
                  className={cn(
                    'font-mono text-xl font-bold ml-2',
                    currentExpression.halfB > 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {currentExpression.halfB > 0 ? '+' : ''}
                  {currentExpression.halfB}
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-green-200 dark:border-green-600 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">(b/2)² =</span>
                <span className="font-mono text-xl text-green-600 font-bold ml-2">
                  {currentExpression.halfBSquared}
                </span>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentExpression.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === currentExpression.correctAnswer;

                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
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
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                          isSelected
                            ? showFeedback
                              ? isCorrectAnswer
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                              : 'bg-amber-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                        )}
                      >
                        {showFeedback && isCorrectAnswer ? (
                          <Check size={16} />
                        ) : showFeedback && isSelected && !isCorrectAnswer ? (
                          <X size={16} />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </span>
                      <span className="font-mono text-lg text-gray-800 dark:text-gray-200">{option}</span>
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
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
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
                ? 'Identificas muy bien los cuadrados completos'
                : 'Sigue practicando para mejorar'}
            </p>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="space-y-2">
              {EXPRESSIONS.map((expr, i) => {
                const isCorrectAnswer = answers[i] === expr.correctAnswer;
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
                      {expr.options[expr.correctAnswer]}
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
