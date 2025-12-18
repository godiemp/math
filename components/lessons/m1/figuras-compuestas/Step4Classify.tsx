'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ClassifyQuestion {
  id: string;
  figure: React.ReactNode;
  description: string;
  bestStrategy: 'add' | 'subtract';
  explanation: string;
}

const QUESTIONS: ClassifyQuestion[] = [
  {
    id: 'q1',
    description: 'Figura en forma de L',
    figure: (
      <svg viewBox="0 0 100 80" className="w-full h-full">
        <path
          d="M 10 10 L 60 10 L 60 40 L 40 40 L 40 70 L 10 70 Z"
          fill="#e0e7ff"
          stroke="#4f46e5"
          strokeWidth="2"
        />
      </svg>
    ),
    bestStrategy: 'add',
    explanation: 'La L se divide fácilmente en dos rectángulos: uno horizontal y uno vertical.',
  },
  {
    id: 'q2',
    description: 'Cuadrado con esquina cortada',
    figure: (
      <svg viewBox="0 0 100 80" className="w-full h-full">
        <path
          d="M 10 10 L 70 10 L 70 50 L 50 50 L 50 70 L 10 70 Z"
          fill="#fef3c7"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <rect x="50" y="50" width="20" height="20" fill="#fecaca" stroke="#dc2626" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
      </svg>
    ),
    bestStrategy: 'subtract',
    explanation: 'Es un rectángulo "casi completo". Más fácil calcular el total y restar la esquina.',
  },
  {
    id: 'q3',
    description: 'Figura en forma de T',
    figure: (
      <svg viewBox="0 0 100 80" className="w-full h-full">
        <path
          d="M 10 10 L 90 10 L 90 30 L 60 30 L 60 70 L 40 70 L 40 30 L 10 30 Z"
          fill="#d1fae5"
          stroke="#059669"
          strokeWidth="2"
        />
      </svg>
    ),
    bestStrategy: 'add',
    explanation: 'La T se divide claramente en dos rectángulos: el horizontal arriba y el vertical abajo.',
  },
  {
    id: 'q4',
    description: 'Marco rectangular (con hueco)',
    figure: (
      <svg viewBox="0 0 100 80" className="w-full h-full">
        <rect x="10" y="10" width="80" height="60" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
        <rect x="25" y="22" width="50" height="36" fill="white" stroke="#4f46e5" strokeWidth="2" strokeDasharray="3,3" />
      </svg>
    ),
    bestStrategy: 'subtract',
    explanation: 'Es un rectángulo externo menos el rectángulo interno (el hueco).',
  },
  {
    id: 'q5',
    description: 'Escalera de dos peldaños',
    figure: (
      <svg viewBox="0 0 100 80" className="w-full h-full">
        <path
          d="M 10 70 L 10 50 L 35 50 L 35 30 L 60 30 L 60 10 L 90 10 L 90 70 Z"
          fill="#fce7f3"
          stroke="#db2777"
          strokeWidth="2"
        />
      </svg>
    ),
    bestStrategy: 'add',
    explanation: 'La escalera se divide en tres rectángulos apilados de diferentes tamaños.',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'add' | 'subtract' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (!isActive) return null;

  const currentQuestion = QUESTIONS[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.bestStrategy;
  const requiredCorrect = 4;
  const passed = correctCount >= requiredCorrect;

  const handleSelect = (strategy: 'add' | 'subtract') => {
    if (showFeedback) return;
    setSelectedAnswer(strategy);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (selectedAnswer === currentQuestion.bestStrategy) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setCompleted(false);
  };

  // ============ COMPLETED STATE ============
  if (completed) {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Resultados
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Clasificación de estrategias
          </p>
        </div>

        <div className={cn(
          'rounded-2xl p-8 text-center',
          passed
            ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
            : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
        )}>
          {passed ? (
            <Check className="w-16 h-16 mx-auto text-green-500 mb-4" />
          ) : (
            <RotateCcw className="w-16 h-16 mx-auto text-amber-500 mb-4" />
          )}

          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {correctCount} / {QUESTIONS.length}
          </div>

          <p className={cn(
            'text-lg',
            passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
          )}>
            {passed
              ? '¡Excelente! Ya sabes identificar la mejor estrategia.'
              : `Necesitas ${requiredCorrect} correctas. ¡Inténtalo de nuevo!`}
          </p>
        </div>

        {/* Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
          <div className="grid grid-cols-5 gap-2">
            {QUESTIONS.map((q, i) => (
              <div
                key={q.id}
                className={cn(
                  'w-12 h-12 rounded-lg flex items-center justify-center',
                  i < correctCount ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'
                )}
              >
                {i < correctCount ? (
                  <Check className="w-6 h-6 text-green-600" />
                ) : (
                  <X className="w-6 h-6 text-red-600" />
                )}
              </div>
            ))}
          </div>
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
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ QUESTION STATE ============
  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¿Sumar o Restar?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Identifica la mejor estrategia para cada figura
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Figura {currentIndex + 1} de {QUESTIONS.length}
        </div>
        <div className="flex gap-1">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                i < currentIndex
                  ? 'bg-green-500 text-white'
                  : i === currentIndex
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              )}
            >
              {i < currentIndex ? '✓' : i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
          {currentQuestion.description}
        </p>

        {/* Figure */}
        <div className="flex justify-center mb-6">
          <div className="w-48 h-36 bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
            {currentQuestion.figure}
          </div>
        </div>

        {/* Strategy options */}
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-3">
          ¿Cuál estrategia es más conveniente?
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* Add option */}
          <button
            onClick={() => handleSelect('add')}
            disabled={showFeedback}
            className={cn(
              'p-4 rounded-xl transition-all border-2 flex flex-col items-center gap-2',
              selectedAnswer === 'add'
                ? showFeedback
                  ? currentQuestion.bestStrategy === 'add'
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                    : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                  : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500'
                : showFeedback && currentQuestion.bestStrategy === 'add'
                ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
            )}
          >
            <div className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center',
              selectedAnswer === 'add'
                ? showFeedback
                  ? currentQuestion.bestStrategy === 'add'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white'
                : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600'
            )}>
              <Plus size={24} />
            </div>
            <span className="font-semibold text-gray-800 dark:text-gray-200">Sumar partes</span>
          </button>

          {/* Subtract option */}
          <button
            onClick={() => handleSelect('subtract')}
            disabled={showFeedback}
            className={cn(
              'p-4 rounded-xl transition-all border-2 flex flex-col items-center gap-2',
              selectedAnswer === 'subtract'
                ? showFeedback
                  ? currentQuestion.bestStrategy === 'subtract'
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                    : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                  : 'bg-orange-100 dark:bg-orange-900/50 border-orange-500'
                : showFeedback && currentQuestion.bestStrategy === 'subtract'
                ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
            )}
          >
            <div className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center',
              selectedAnswer === 'subtract'
                ? showFeedback
                  ? currentQuestion.bestStrategy === 'subtract'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-orange-500 text-white'
                : 'bg-orange-100 dark:bg-orange-900/50 text-orange-600'
            )}>
              <Minus size={24} />
            </div>
            <span className="font-semibold text-gray-800 dark:text-gray-200">Restar parte</span>
          </button>
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
                  {isCorrect ? '¡Correcto!' : 'No exactamente'}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {currentQuestion.explanation}
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
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>{currentIndex < QUESTIONS.length - 1 ? 'Siguiente' : 'Ver resultados'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
