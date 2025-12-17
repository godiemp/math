'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, Lightbulb, Trophy } from 'lucide-react';
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
    question: '¿Cuánto vale 4⁻²?',
    hint: 'Recuerda: a⁻ⁿ = 1/aⁿ. Primero calcula 4² y luego invierte.',
    options: ['1/8', '1/16', '-16', '16'],
    correctAnswer: 1,
    explanation: '4⁻² = 1/4² = 1/16. El exponente negativo invierte, no hace negativo.',
  },
  {
    id: 'p2',
    question: '¿Cuánto vale (-3)⁰?',
    hint: 'Cualquier número (excepto 0) elevado a 0 tiene el mismo resultado.',
    options: ['-3', '0', '1', '-1'],
    correctAnswer: 2,
    explanation: '(-3)⁰ = 1. Cualquier número distinto de cero elevado a 0 es 1.',
  },
  {
    id: 'p3',
    question: '¿Cuánto vale (2/5)⁻¹?',
    hint: 'Un exponente -1 simplemente invierte la fracción.',
    options: ['2/5', '-2/5', '5/2', '-5/2'],
    correctAnswer: 2,
    explanation: '(2/5)⁻¹ = 5/2. El exponente -1 invierte la fracción.',
  },
  {
    id: 'p4',
    question: '¿Cuánto vale 10⁻²?',
    hint: '10² = 100. Ahora aplica la regla del exponente negativo.',
    options: ['0.01', '0.1', '-100', '100'],
    correctAnswer: 0,
    explanation: '10⁻² = 1/10² = 1/100 = 0.01',
  },
  {
    id: 'p5',
    question: '¿Cuánto vale 2⁻³ × 2³?',
    hint: 'Puedes multiplicar primero y luego simplificar, o usar las propiedades de exponentes.',
    options: ['0', '1', '8', '1/8'],
    correctAnswer: 1,
    explanation: '2⁻³ × 2³ = 2⁻³⁺³ = 2⁰ = 1. También: (1/8) × 8 = 1.',
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
    if (isCorrect) setCorrectCount((prev) => prev + 1);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setShowHint(false);
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
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Practica Calculando
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplica las reglas para resolver estos problemas
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress indicators */}
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
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {answers[i] !== null ? (
                    answers[i] === PROBLEMS[i].correctAnswer ? (
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

          {/* Problem card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <p className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                {currentProblem.question}
              </p>
            </div>

            {/* Hint button */}
            {!showFeedback && (
              <div className="text-center mb-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 mx-auto text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400"
                >
                  <Lightbulb size={16} />
                  <span>{showHint ? 'Ocultar pista' : 'Ver pista'}</span>
                </button>
              </div>
            )}

            {showHint && !showFeedback && (
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mb-6 animate-fadeIn border border-amber-200 dark:border-amber-700">
                <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
                  {currentProblem.hint}
                </p>
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {currentProblem.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === currentProblem.correctAnswer;

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
                          : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500'
                        : showFeedback && isCorrectAnswer
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-400'
                    )}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                          isSelected
                            ? showFeedback
                              ? isCorrectAnswer
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                              : 'bg-blue-500 text-white'
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
                      <span className="font-mono text-lg text-gray-800 dark:text-gray-200">
                        {option}
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
                    {currentProblem.explanation}
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
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                <span>{currentIndex < PROBLEMS.length - 1 ? 'Siguiente' : 'Ver Resultados'}</span>
                <ArrowRight size={20} />
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
              {correctCount >= 4 ? '¡Excelente trabajo!' : '¡Sigue practicando!'}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Resolviste correctamente{' '}
              <span
                className={cn(
                  'font-bold',
                  correctCount >= 4 ? 'text-green-600' : 'text-amber-600'
                )}
              >
                {correctCount}/{PROBLEMS.length}
              </span>{' '}
              problemas
            </p>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
              Resumen:
            </h4>
            <div className="space-y-2">
              {PROBLEMS.map((problem, i) => {
                const wasCorrect = answers[i] === problem.correctAnswer;
                return (
                  <div
                    key={problem.id}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg',
                      wasCorrect
                        ? 'bg-green-50 dark:bg-green-900/30'
                        : 'bg-red-50 dark:bg-red-900/30'
                    )}
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                      {problem.question}
                    </span>
                    <span className="font-mono text-sm text-gray-600 dark:text-gray-400 mx-2">
                      {problem.options[problem.correctAnswer]}
                    </span>
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
              Continuar al checkpoint
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
