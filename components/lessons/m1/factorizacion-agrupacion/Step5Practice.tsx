'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: string;
  expression: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: '1',
    expression: 'xy + xz + 2y + 2z',
    options: ['(x + 2)(y + z)', '(x + y)(2 + z)', 'xy(1 + z) + 2(y + z)', '(xy + 2)(z + 1)'],
    correctAnswer: 0,
    hint: 'Agrupa (xy + xz) y (2y + 2z). Saca factor común de cada grupo.',
    explanation:
      '(xy + xz) + (2y + 2z) = x(y + z) + 2(y + z) = (y + z)(x + 2) = (x + 2)(y + z)',
  },
  {
    id: '2',
    expression: 'x² + 4x + 2x + 8',
    options: ['(x + 2)(x + 4)', '(x + 4)(x + 2)', '(x + 8)(x + 1)', 'x(x + 6) + 8'],
    correctAnswer: 1,
    hint: 'Agrupa (x² + 4x) y (2x + 8). Del primer grupo sale x, del segundo sale 2.',
    explanation:
      '(x² + 4x) + (2x + 8) = x(x + 4) + 2(x + 4) = (x + 4)(x + 2)',
  },
  {
    id: '3',
    expression: 'ab + ac + 3b + 3c',
    options: ['(a + 3)(b + c)', '(a + b)(3 + c)', 'a(b + c) + 3b + 3c', '(ab + 3)(c + 1)'],
    correctAnswer: 0,
    hint: 'Agrupa (ab + ac) y (3b + 3c). Ambos grupos tienen (b + c) como resultado.',
    explanation:
      '(ab + ac) + (3b + 3c) = a(b + c) + 3(b + c) = (b + c)(a + 3) = (a + 3)(b + c)',
  },
  {
    id: '4',
    expression: 'x² - 5x + 3x - 15',
    options: ['(x - 5)(x + 3)', '(x + 5)(x - 3)', '(x - 3)(x + 5)', '(x - 15)(x + 1)'],
    correctAnswer: 0,
    hint: 'Agrupa (x² - 5x) y (3x - 15). ¡Cuidado con los signos!',
    explanation:
      '(x² - 5x) + (3x - 15) = x(x - 5) + 3(x - 5) = (x - 5)(x + 3)',
  },
  {
    id: '5',
    expression: '2xy + 2xz + 3y + 3z',
    options: ['(2x + 3)(y + z)', '(2y + 3)(x + z)', '2x(y + z) + 3(y + z)', '(x + 3)(2y + z)'],
    correctAnswer: 0,
    hint: 'Agrupa (2xy + 2xz) y (3y + 3z). Saca 2x del primero y 3 del segundo.',
    explanation:
      '(2xy + 2xz) + (3y + 3z) = 2x(y + z) + 3(y + z) = (y + z)(2x + 3) = (2x + 3)(y + z)',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const question = QUESTIONS[currentQuestion];
  const selectedAnswer = answers[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const correctCount = answers.filter((a, i) => a === QUESTIONS[i].correctAnswer).length;
  const passed = correctCount >= 4;

  const handleSelect = (optionIndex: number) => {
    if (showFeedback) return;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    setShowHint(false);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setShowHint(false);
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setShowFeedback(false);
    setShowHint(false);
    setIsComplete(false);
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
          Factoriza cada expresión por agrupación
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentQuestion + 1} de {QUESTIONS.length}
            </div>
            <div className="flex gap-1">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    answers[i] !== null
                      ? answers[i] === QUESTIONS[i].correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentQuestion
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {answers[i] !== null ? (
                    answers[i] === QUESTIONS[i].correctAnswer ? '✓' : '✗'
                  ) : (
                    i + 1
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-3">Factoriza por agrupación:</p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 inline-block">
                <p className="font-mono text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {question.expression}
                </p>
              </div>
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
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mb-4 animate-fadeIn border border-amber-200 dark:border-amber-700">
                <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
                  {question.hint}
                </p>
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl text-left font-medium transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === question.correctAnswer
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200'
                      : showFeedback && index === question.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
                        selectedAnswer === index
                          ? showFeedback
                            ? index === question.correctAnswer
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      )}
                    >
                      {showFeedback && index === question.correctAnswer ? (
                        <Check size={16} />
                      ) : showFeedback && selectedAnswer === index && index !== question.correctAnswer ? (
                        <X size={16} />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </span>
                    <span className="font-mono text-gray-800 dark:text-gray-200">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div
                className={cn(
                  'p-4 rounded-xl animate-fadeIn mb-4',
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
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                      {question.explanation}
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
                  <span>{currentQuestion < QUESTIONS.length - 1 ? 'Siguiente' : 'Ver resultados'}</span>
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Results */
        <div className="space-y-6 animate-fadeIn">
          <div
            className={cn(
              'rounded-2xl p-8 text-center',
              passed
                ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
            )}
          >
            <div className="text-5xl mb-4">{passed ? '🏆' : '💪'}</div>
            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {passed ? '¡Excelente trabajo!' : '¡Sigue practicando!'}
            </h3>
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {QUESTIONS.length}
            </div>
            <p className={cn(passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
              {passed
                ? 'Has dominado la factorización por agrupación'
                : 'Necesitas 4 respuestas correctas para continuar'}
            </p>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="space-y-2">
              {QUESTIONS.map((q, i) => (
                <div
                  key={q.id}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg',
                    answers[i] === q.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30'
                      : 'bg-red-50 dark:bg-red-900/30'
                  )}
                >
                  <span className="font-mono text-sm text-gray-700 dark:text-gray-300">{q.expression}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-500">{q.options[q.correctAnswer]}</span>
                    {answers[i] === q.correctAnswer ? (
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            {!passed && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
                <span>Intentar de nuevo</span>
              </button>
            )}
            {passed && (
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
              >
                <span>Ir al Checkpoint</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
