'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: number;
  context: string;
  system: string[];
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 1,
    context: 'Resuelve usando el método de sustitución.',
    system: ['y = x + 2', 'x + y = 10'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(3, 7)', '(4, 6)', '(5, 5)', '(6, 4)'],
    correctAnswer: 1,
    hint: 'Sustituye y por (x + 2) en la segunda ecuación: x + (x + 2) = 10.',
    explanation: 'Sustituyendo: x + (x + 2) = 10 → 2x + 2 = 10 → 2x = 8 → x = 4. Luego y = 4 + 2 = 6.',
  },
  {
    id: 2,
    context: 'Resuelve usando el método de sustitución.',
    system: ['x = 3y', '2x + y = 14'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(3, 1)', '(6, 2)', '(9, 3)', '(12, 4)'],
    correctAnswer: 1,
    hint: 'Sustituye x por 3y en la segunda ecuación: 2(3y) + y = 14.',
    explanation: 'Sustituyendo: 6y + y = 14 → 7y = 14 → y = 2. Luego x = 3(2) = 6.',
  },
  {
    id: 3,
    context: 'Resuelve usando el método de sustitución.',
    system: ['x + y = 12', 'y = 2x'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(3, 6)', '(4, 8)', '(5, 10)', '(6, 6)'],
    correctAnswer: 1,
    hint: 'Sustituye y por 2x en la primera ecuación: x + 2x = 12.',
    explanation: 'Sustituyendo: x + 2x = 12 → 3x = 12 → x = 4. Luego y = 2(4) = 8.',
  },
  {
    id: 4,
    context: 'Resuelve usando el método de sustitución.',
    system: ['2x + y = 11', 'y = x - 1'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(3, 2)', '(4, 3)', '(5, 4)', '(2, 1)'],
    correctAnswer: 1,
    hint: 'Sustituye y por (x - 1) en la primera ecuación.',
    explanation: 'Sustituyendo: 2x + (x - 1) = 11 → 3x - 1 = 11 → 3x = 12 → x = 4. Luego y = 4 - 1 = 3.',
  },
  {
    id: 5,
    context: 'Resuelve usando el método de sustitución.',
    system: ['x - y = 3', '2x + 3y = 16'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(4, 1)', '(5, 2)', '(6, 3)', '(7, 4)'],
    correctAnswer: 1,
    hint: 'De la primera ecuación: x = y + 3. Sustituye en la segunda.',
    explanation: 'Despejando x = y + 3. Sustituyendo: 2(y + 3) + 3y = 16 → 2y + 6 + 3y = 16 → 5y = 10 → y = 2. Luego x = 2 + 3 = 5.',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const question = QUESTIONS[currentQuestion];
  const isComplete = answers.length === QUESTIONS.length;
  const passed = score >= 3;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    const isCorrect = selectedAnswer === question.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([...answers, isCorrect]);
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHint(false);
    setScore(0);
    setAnswers([]);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica de Sustitución
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resuelve los sistemas usando el método de sustitución
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
                    i < answers.length
                      ? answers[i]
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentQuestion
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {i < answers.length ? (answers[i] ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* Context */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-4 mb-4 border border-amber-200 dark:border-amber-700">
              <p className="text-gray-700 dark:text-gray-300">{question.context}</p>
            </div>

            {/* System display */}
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Sistema de ecuaciones:</p>
              <div className="inline-flex flex-col gap-1 bg-gray-100 dark:bg-gray-700 px-6 py-3 rounded-lg">
                {question.system.map((eq, i) => (
                  <span key={i} className="font-mono text-lg text-gray-800 dark:text-gray-200">{eq}</span>
                ))}
              </div>
            </div>

            {/* Question */}
            <p className="text-center text-gray-800 dark:text-gray-200 font-semibold mb-4">
              {question.question}
            </p>

            {/* Hint button */}
            {!showHint && !showFeedback && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                >
                  <Lightbulb size={16} />
                  <span>Ver pista</span>
                </button>
              </div>
            )}

            {/* Hint display */}
            {showHint && !showFeedback && (
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 mb-4 border border-amber-200 dark:border-amber-700 animate-fadeIn">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{question.hint}</p>
                </div>
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl text-center font-mono font-semibold transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === question.correctAnswer
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-amber-100 dark:bg-amber-900/50 border-amber-500 text-amber-800 dark:text-amber-200'
                      : showFeedback && index === question.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-amber-400 dark:hover:border-amber-500'
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    {showFeedback && index === question.correctAnswer && (
                      <Check size={16} className="text-green-500" />
                    )}
                    {showFeedback && selectedAnswer === index && index !== question.correctAnswer && (
                      <X size={16} className="text-red-500" />
                    )}
                    <span className="text-gray-800 dark:text-gray-200">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={cn(
                'mt-6 p-4 rounded-xl animate-fadeIn',
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                  : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
              )}>
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className={cn(
                      'font-bold mb-1',
                      isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                    )}>
                      {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {question.explanation}
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
            ) : currentQuestion < QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
              >
                <span>Siguiente</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={() => setAnswers([...answers])}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
              >
                <span>Ver resultados</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <div className={cn(
            'rounded-2xl p-8 text-center',
            passed
              ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
              : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
          )}>
            <div className="text-6xl mb-4">
              {passed ? '🏆' : '💪'}
            </div>

            <h3 className={cn(
              'text-2xl font-bold mb-2',
              passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {passed ? '¡Muy bien!' : '¡Sigue practicando!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {score} / {QUESTIONS.length}
            </div>

            <p className={cn(
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}>
              {passed
                ? 'Dominas el método de sustitución.'
                : 'Necesitas 3 respuestas correctas. ¡Inténtalo de nuevo!'}
            </p>
          </div>

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
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Continuar al Checkpoint</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
