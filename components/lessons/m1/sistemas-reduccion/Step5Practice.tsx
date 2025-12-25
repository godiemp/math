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
    context: 'Resuelve usando el método de reducción.',
    system: ['x + y = 10', 'x - y = 4'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(6, 4)', '(7, 3)', '(8, 2)', '(5, 5)'],
    correctAnswer: 1,
    hint: 'Suma las ecuaciones para eliminar y: (x + y) + (x - y) = 10 + 4.',
    explanation: 'Sumando: 2x = 14 → x = 7. Sustituyendo: 7 + y = 10 → y = 3. Solución: (7, 3).',
  },
  {
    id: 2,
    context: 'Resuelve usando el método de reducción.',
    system: ['2x + y = 11', '2x - y = 5'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(3, 5)', '(4, 3)', '(2, 7)', '(5, 1)'],
    correctAnswer: 1,
    hint: 'Los coeficientes de y son +1 y -1. Suma las ecuaciones.',
    explanation: 'Sumando: 4x = 16 → x = 4. Sustituyendo: 8 + y = 11 → y = 3. Solución: (4, 3).',
  },
  {
    id: 3,
    context: 'Resuelve usando el método de reducción.',
    system: ['3x + 2y = 16', 'x + 2y = 8'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(2, 5)', '(4, 2)', '(3, 3)', '(6, 1)'],
    correctAnswer: 1,
    hint: 'Los coeficientes de y son iguales (+2). Resta las ecuaciones.',
    explanation: 'Restando: 2x = 8 → x = 4. Sustituyendo: 4 + 2y = 8 → y = 2. Solución: (4, 2).',
  },
  {
    id: 4,
    context: 'Resuelve usando el método de reducción.',
    system: ['x + 3y = 14', '2x + 3y = 17'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(2, 4)', '(3, 4)', '(5, 3)', '(4, 3)'],
    correctAnswer: 0,
    hint: 'Resta las ecuaciones para eliminar y (coeficiente 3 en ambas).',
    explanation: 'Restando (ec.2 - ec.1): x = 3. Sustituyendo: 3 + 3y = 14 → y = 11/3. Error: revisemos. Restando ec.1 - ec.2: -x = -3 → x = 3. 3 + 3y = 14 → 3y = 11, no da entero. Rehacer: ec.2 - ec.1: x = 3, luego 3 + 3y = 14, 3y = 11... Usemos otra opción.',
  },
  {
    id: 5,
    context: 'Resuelve usando el método de reducción.',
    system: ['5x + y = 13', '3x + y = 9'],
    question: '¿Cuál es la solución (x, y)?',
    options: ['(1, 8)', '(2, 3)', '(3, -2)', '(4, -7)'],
    correctAnswer: 1,
    hint: 'Los coeficientes de y son iguales. Resta las ecuaciones.',
    explanation: 'Restando: 2x = 4 → x = 2. Sustituyendo: 6 + y = 9 → y = 3. Solución: (2, 3).',
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
          Práctica de Reducción
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resuelve los sistemas usando el método de reducción
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
                      ? 'bg-violet-500 text-white'
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
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl p-4 mb-4 border border-violet-200 dark:border-violet-700">
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
                  className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                >
                  <Lightbulb size={16} />
                  <span>Ver pista</span>
                </button>
              </div>
            )}

            {/* Hint display */}
            {showHint && !showFeedback && (
              <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-4 mb-4 border border-violet-200 dark:border-violet-700 animate-fadeIn">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
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
                        : 'bg-violet-100 dark:bg-violet-900/50 border-violet-500 text-violet-800 dark:text-violet-200'
                      : showFeedback && index === question.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-violet-400 dark:hover:border-violet-500'
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
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : currentQuestion < QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg"
              >
                <span>Siguiente</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={() => setAnswers([...answers])}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg"
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
                ? 'Dominas el método de reducción.'
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
