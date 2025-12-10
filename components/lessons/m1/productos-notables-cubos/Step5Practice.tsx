'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Lightbulb, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type ProblemType = 'expand' | 'factor';

interface Problem {
  id: string;
  type: ProblemType;
  question: string;
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    type: 'expand',
    question: 'Desarrolla: (x + 3)³',
    hint: 'Usa (a + b)³ = a³ + 3a²b + 3ab² + b³ con a = x y b = 3',
    options: [
      'x³ + 27',
      'x³ + 9x² + 27x + 27',
      'x³ + 3x² + 9x + 27',
      'x³ + 6x² + 9x + 27',
    ],
    correctAnswer: 1,
    explanation: '(x + 3)³ = x³ + 3(x²)(3) + 3(x)(9) + 27 = x³ + 9x² + 27x + 27',
  },
  {
    id: 'p2',
    type: 'expand',
    question: 'Desarrolla: (2a - 1)³',
    hint: 'Usa (a - b)³ = a³ - 3a²b + 3ab² - b³ con a = 2a y b = 1. Los signos alternan.',
    options: [
      '8a³ - 1',
      '8a³ - 6a² + 6a - 1',
      '8a³ - 12a² + 6a - 1',
      '2a³ - 6a² + 6a - 1',
    ],
    correctAnswer: 2,
    explanation: '(2a - 1)³ = (2a)³ - 3(2a)²(1) + 3(2a)(1²) - 1³ = 8a³ - 12a² + 6a - 1',
  },
  {
    id: 'p3',
    type: 'factor',
    question: 'Factoriza: x³ + 125',
    hint: '125 = 5³, entonces es una suma de cubos: a³ + b³ = (a + b)(a² - ab + b²)',
    options: [
      '(x + 5)³',
      '(x + 5)(x² + 5x + 25)',
      '(x + 5)(x² - 5x + 25)',
      '(x - 5)(x² + 5x + 25)',
    ],
    correctAnswer: 2,
    explanation: 'x³ + 125 = x³ + 5³ = (x + 5)(x² - 5x + 25). Recuerda SOAP: el término medio tiene signo opuesto.',
  },
  {
    id: 'p4',
    type: 'factor',
    question: 'Factoriza: 27y³ - 8',
    hint: '27y³ = (3y)³ y 8 = 2³. Es una diferencia de cubos: a³ - b³ = (a - b)(a² + ab + b²)',
    options: [
      '(3y - 2)(9y² - 6y + 4)',
      '(3y - 2)(9y² + 6y + 4)',
      '(3y + 2)(9y² - 6y + 4)',
      '(3y - 2)³',
    ],
    correctAnswer: 1,
    explanation: '27y³ - 8 = (3y)³ - 2³ = (3y - 2)((3y)² + (3y)(2) + 2²) = (3y - 2)(9y² + 6y + 4)',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(PROBLEMS.length).fill(null));

  const currentProblem = PROBLEMS[currentIndex];
  const isCorrect = selectedAnswer === currentProblem.correctAnswer;
  const isComplete = currentIndex >= PROBLEMS.length;

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
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setShowHint(false);
    setSelectedAnswer(null);
    setCurrentIndex(prev => prev + 1);
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
        <p className="text-gray-600 dark:text-gray-300">
          Desarrolla y factoriza expresiones con cubos
        </p>
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
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {answers[i] !== null ? (
                    answers[i] === PROBLEMS[i].correctAnswer ? '✓' : '✗'
                  ) : (
                    i + 1
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* Problem type badge */}
            <div className="flex justify-between items-center mb-4">
              <span
                className={cn(
                  'px-3 py-1 rounded-full text-sm font-medium',
                  currentProblem.type === 'expand'
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300'
                )}
              >
                {currentProblem.type === 'expand' ? 'Desarrollar' : 'Factorizar'}
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
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    {currentProblem.hint}
                  </p>
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
                        : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
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
                            : 'bg-purple-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      )}
                    >
                      {showFeedback && index === currentProblem.correctAnswer ? (
                        <Check size={16} />
                      ) : showFeedback && selectedAnswer === index && index !== currentProblem.correctAnswer ? (
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
                        isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                      )}
                    >
                      {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{currentProblem.explanation}</p>
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
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
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
              correctCount >= 3
                ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
            )}
          >
            <div className="text-6xl mb-4">
              {correctCount === 4 ? '🏆' : correctCount >= 3 ? '🌟' : '💪'}
            </div>
            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                correctCount >= 3 ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {correctCount === 4 ? '¡Perfecto!' : correctCount >= 3 ? '¡Muy bien!' : '¡Sigue practicando!'}
            </h3>
            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {PROBLEMS.length}
            </div>
            <p className={cn(correctCount >= 3 ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
              {correctCount >= 3
                ? 'Dominas los productos notables con cubos'
                : 'Repasa las fórmulas y vuelve a intentar'}
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
            {correctCount < 3 && (
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
