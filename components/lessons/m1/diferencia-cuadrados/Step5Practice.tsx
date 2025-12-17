'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Lightbulb, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  id: string;
  question: string;
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    question: 'Factoriza: x² - 64',
    hint: '64 = 8². Entonces tenemos x² - 8². Aplica (a + b)(a - b)',
    options: ['(x + 8)(x - 8)', '(x + 32)(x - 32)', '(x - 8)²', '(x + 4)(x - 16)'],
    correctAnswer: 0,
    explanation: 'x² - 64 = x² - 8² = (x + 8)(x - 8). Verificación: (x+8)(x-8) = x² - 64 ✓',
  },
  {
    id: 'p2',
    question: 'Factoriza: 9x² - 1',
    hint: '9x² = (3x)² y 1 = 1². Entonces tenemos (3x)² - 1²',
    options: ['(3x + 1)(3x - 1)', '(9x + 1)(x - 1)', '(3x - 1)²', '(x + 1)(9x - 1)'],
    correctAnswer: 0,
    explanation: '9x² - 1 = (3x)² - 1² = (3x + 1)(3x - 1)',
  },
  {
    id: 'p3',
    question: 'Factoriza: 25x² - 49y²',
    hint: '25x² = (5x)² y 49y² = (7y)². Entonces a = 5x y b = 7y',
    options: ['(5x + 7y)(5x - 7y)', '(5x - 7y)²', '(25x + 49y)(x - y)', '(x + y)(25x - 49y)'],
    correctAnswer: 0,
    explanation: '25x² - 49y² = (5x)² - (7y)² = (5x + 7y)(5x - 7y)',
  },
  {
    id: 'p4',
    question: 'Factoriza: 4x² - 81',
    hint: '4x² = (2x)² y 81 = 9². Identifica a y b correctamente',
    options: ['(2x + 9)(2x - 9)', '(4x + 81)(x - 1)', '(x + 9)(4x - 9)', '(2x - 9)²'],
    correctAnswer: 0,
    explanation: '4x² - 81 = (2x)² - 9² = (2x + 9)(2x - 9)',
  },
  {
    id: 'p5',
    question: 'Factoriza: 100 - x²',
    hint: 'Reordena: es lo mismo que 10² - x². a = 10 y b = x',
    options: ['(10 + x)(10 - x)', '(100 + x)(1 - x)', '(10 - x)²', '(x + 10)(x - 10)'],
    correctAnswer: 0,
    explanation: '100 - x² = 10² - x² = (10 + x)(10 - x). Nota: el orden de los factores puede variar.',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(PROBLEMS.length).fill(null));

  const isComplete = currentIndex >= PROBLEMS.length;
  const currentProblem = isComplete ? PROBLEMS[0] : PROBLEMS[currentIndex];
  const isCorrect = selectedAnswer === currentProblem.correctAnswer;

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
    setShowHint(false);
    setSelectedAnswer(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHint(false);
    setCorrectCount(0);
    setAnswers(Array(PROBLEMS.length).fill(null));
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">Factoriza las diferencias de cuadrados</p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentIndex + 1} de {PROBLEMS.length}
            </div>
            <div className="flex gap-1">
              {PROBLEMS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    answers[i] !== null
                      ? answers[i] === PROBLEMS[i].correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentIndex
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {answers[i] !== null
                    ? answers[i] === PROBLEMS[i].correctAnswer
                      ? '✓'
                      : '✗'
                    : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* Problem type badge */}
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                Diferencia de Cuadrados
              </span>
              {!showFeedback && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400"
                >
                  <Lightbulb size={16} />
                  <span>{showHint ? 'Ocultar pista' : 'Ver pista'}</span>
                </button>
              )}
            </div>

            {/* Question */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {currentProblem.question}
            </h3>

            {/* Hint */}
            {showHint && !showFeedback && (
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mb-6 animate-fadeIn border border-amber-200 dark:border-amber-700">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-200">{currentProblem.hint}</p>
                </div>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              {currentProblem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'w-full p-4 rounded-xl text-left font-medium transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === currentProblem.correctAnswer
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-amber-100 dark:bg-amber-900/50 border-amber-500 text-amber-800 dark:text-amber-200'
                      : showFeedback && index === currentProblem.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                        selectedAnswer === index
                          ? showFeedback
                            ? index === currentProblem.correctAnswer
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-amber-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      )}
                    >
                      {showFeedback && index === currentProblem.correctAnswer ? (
                        <Check size={16} />
                      ) : showFeedback &&
                        selectedAnswer === index &&
                        index !== currentProblem.correctAnswer ? (
                        <X size={16} />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200 font-mono">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div
                className={cn(
                  'mt-6 p-4 rounded-xl animate-fadeIn',
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
                      {currentProblem.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

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
                {currentIndex < PROBLEMS.length - 1 ? 'Siguiente Problema' : 'Ver Resultados'}
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
            <div className="text-6xl mb-4">
              {correctCount === 5 ? '🏆' : correctCount >= 4 ? '🌟' : '💪'}
            </div>
            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                correctCount >= 4
                  ? 'text-green-800 dark:text-green-300'
                  : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {correctCount === 5 ? '¡Perfecto!' : correctCount >= 4 ? '¡Muy bien!' : '¡Sigue practicando!'}
            </h3>
            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {PROBLEMS.length}
            </div>
            <p
              className={cn(
                correctCount >= 4
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {correctCount >= 4
                ? 'Dominas la diferencia de cuadrados'
                : 'Repasa los pasos y vuelve a intentar'}
            </p>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="space-y-2">
              {PROBLEMS.map((problem, i) => (
                <div
                  key={problem.id}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg',
                    answers[i] === problem.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30'
                      : 'bg-red-50 dark:bg-red-900/30'
                  )}
                >
                  {answers[i] === problem.correctAnswer ? (
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">{problem.question}</span>
                </div>
              ))}
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
              Continuar al Checkpoint
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
