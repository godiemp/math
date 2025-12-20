'use client';

import { useState } from 'react';
import { ArrowRight, ArrowUp, ArrowDown, Check, X, RotateCcw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ClassifyQuestion {
  id: string;
  magnitude: string;
  target: string;
  correctAnswer: 'direct' | 'inverse';
  userAnswer: 'direct' | 'inverse' | null;
  isCorrect: boolean | null;
  explanation: string;
}

const QUESTIONS: ClassifyQuestion[] = [
  {
    id: '1',
    magnitude: 'Número de obreros',
    target: 'Tiempo para terminar una obra',
    correctAnswer: 'inverse',
    userAnswer: null,
    isCorrect: null,
    explanation: 'Más obreros = menos tiempo. Son inversamente proporcionales.',
  },
  {
    id: '2',
    magnitude: 'Horas de trabajo por día',
    target: 'Producción total',
    correctAnswer: 'direct',
    userAnswer: null,
    isCorrect: null,
    explanation: 'Más horas = más producción. Son directamente proporcionales.',
  },
  {
    id: '3',
    magnitude: 'Velocidad de un auto',
    target: 'Tiempo de viaje',
    correctAnswer: 'inverse',
    userAnswer: null,
    isCorrect: null,
    explanation: 'Más velocidad = menos tiempo. Son inversamente proporcionales.',
  },
  {
    id: '4',
    magnitude: 'Número de máquinas',
    target: 'Piezas producidas',
    correctAnswer: 'direct',
    userAnswer: null,
    isCorrect: null,
    explanation: 'Más máquinas = más piezas. Son directamente proporcionales.',
  },
  {
    id: '5',
    magnitude: 'Número de grifos',
    target: 'Tiempo para llenar un tanque',
    correctAnswer: 'inverse',
    userAnswer: null,
    isCorrect: null,
    explanation: 'Más grifos = menos tiempo. Son inversamente proporcionales.',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [questions, setQuestions] = useState(QUESTIONS);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  if (!isActive) return null;

  const question = questions[currentQuestion];
  const correctCount = questions.filter((q) => q.isCorrect).length;
  const passed = correctCount >= 4;

  const handleAnswer = (answer: 'direct' | 'inverse') => {
    if (question.userAnswer !== null) return;

    const isCorrect = answer === question.correctAnswer;
    setQuestions((prev) =>
      prev.map((q, i) => (i === currentQuestion ? { ...q, userAnswer: answer, isCorrect } : q))
    );
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowComplete(true);
    }
  };

  const handleReset = () => {
    setQuestions(QUESTIONS);
    setCurrentQuestion(0);
    setShowComplete(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica la Relación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {!showComplete
            ? `¿Es directa o inversa? Necesitas 4 de ${questions.length} correctas.`
            : '¡Resultados!'}
        </p>
      </div>

      {!showComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Pregunta {currentQuestion + 1} de {questions.length}
            </div>
            <div className="flex gap-1">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    q.userAnswer !== null
                      ? q.isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentQuestion
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {q.userAnswer !== null ? (q.isCorrect ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <p className="text-gray-600 dark:text-gray-400 mb-2">Si aumenta...</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                {question.magnitude}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">¿Qué pasa con...?</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {question.target}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer('direct')}
                disabled={question.userAnswer !== null}
                className={cn(
                  'p-6 rounded-xl font-semibold transition-all flex flex-col items-center gap-2 border-2',
                  question.userAnswer === 'direct'
                    ? question.isCorrect
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                    : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:border-green-400',
                  question.userAnswer !== null && 'cursor-not-allowed'
                )}
              >
                <div className="flex items-center gap-1 text-2xl">
                  <ArrowUp className="w-6 h-6" />
                  <ArrowUp className="w-6 h-6" />
                </div>
                <span>DIRECTA</span>
                <span className="text-xs font-normal opacity-70">También aumenta</span>
              </button>

              <button
                onClick={() => handleAnswer('inverse')}
                disabled={question.userAnswer !== null}
                className={cn(
                  'p-6 rounded-xl font-semibold transition-all flex flex-col items-center gap-2 border-2',
                  question.userAnswer === 'inverse'
                    ? question.isCorrect
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                    : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 hover:border-orange-400',
                  question.userAnswer !== null && 'cursor-not-allowed'
                )}
              >
                <div className="flex items-center gap-1 text-2xl">
                  <ArrowUp className="w-6 h-6" />
                  <ArrowDown className="w-6 h-6" />
                </div>
                <span>INVERSA</span>
                <span className="text-xs font-normal opacity-70">Disminuye</span>
              </button>
            </div>

            {/* Feedback */}
            {question.userAnswer !== null && (
              <div
                className={cn(
                  'mt-4 p-4 rounded-xl animate-fadeIn',
                  question.isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                    : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
                )}
              >
                <div className="flex items-start gap-3">
                  {question.isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  )}
                  <div>
                    <p
                      className={cn(
                        'font-bold',
                        question.isCorrect
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-amber-700 dark:text-amber-300'
                      )}
                    >
                      {question.isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Next button */}
          {question.userAnswer !== null && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>{currentQuestion < questions.length - 1 ? 'Siguiente' : 'Ver Resultados'}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        // Results
        <div className="space-y-6 animate-fadeIn">
          <div
            className={cn(
              'rounded-2xl p-8 text-center',
              passed
                ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
            )}
          >
            {passed ? (
              <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
            ) : (
              <RotateCcw className="w-20 h-20 mx-auto text-amber-500 mb-4" />
            )}

            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {passed ? '¡Excelente!' : '¡Sigue practicando!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {questions.length}
            </div>

            <p
              className={cn(
                passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {passed
                ? '¡Sabes identificar si la relación es directa o inversa!'
                : 'Necesitas 4 respuestas correctas. ¡Intenta de nuevo!'}
            </p>
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
                <span>Continuar a Práctica</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
