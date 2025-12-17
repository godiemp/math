'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ClassifyExercise {
  id: string;
  question: string;
  data: number;
  intervals: string[];
  correctInterval: number;
  explanation: string;
}

const EXERCISES: ClassifyExercise[] = [
  {
    id: 'c1',
    question: '¿En que intervalo cae el valor 47?',
    data: 47,
    intervals: ['[30, 40)', '[40, 50)', '[50, 60)', '[60, 70)'],
    correctInterval: 1,
    explanation: '47 esta entre 40 y 50 (pero no llega a 50), entonces cae en [40, 50).',
  },
  {
    id: 'c2',
    question: '¿En que intervalo cae el valor 60?',
    data: 60,
    intervals: ['[40, 50)', '[50, 60)', '[60, 70)', '[70, 80)'],
    correctInterval: 2,
    explanation: '60 es exactamente el limite inferior del intervalo [60, 70), por lo que pertenece a el.',
  },
  {
    id: 'c3',
    question: 'Si un intervalo es [20, 25), ¿cual es su amplitud?',
    data: 0,
    intervals: ['3', '4', '5', '6'],
    correctInterval: 2,
    explanation: 'Amplitud = limite superior - limite inferior = 25 - 20 = 5',
  },
  {
    id: 'c4',
    question: '¿Cual es la marca de clase del intervalo [150, 160)?',
    data: 0,
    intervals: ['150', '155', '160', '157.5'],
    correctInterval: 1,
    explanation: 'Marca de clase = (150 + 160) / 2 = 310 / 2 = 155',
  },
  {
    id: 'c5',
    question: 'El valor 49.9 pertenece al intervalo [40, 50). ¿Verdadero o Falso?',
    data: 49.9,
    intervals: ['Verdadero', 'Falso'],
    correctInterval: 0,
    explanation: '49.9 es mayor o igual a 40 y menor que 50, entonces si pertenece a [40, 50).',
  },
];

const REQUIRED_CORRECT = 4;

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  if (!isActive) return null;

  const exercise = EXERCISES[currentExercise];
  const isCorrect = selectedAnswer === exercise.correctInterval;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (index === exercise.correctInterval) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentExercise === EXERCISES.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentExercise((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleRetry = () => {
    setCurrentExercise(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setIsComplete(false);
  };

  const passed = correctCount >= REQUIRED_CORRECT;

  // ============ RESULTS SCREEN ============
  if (isComplete) {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4',
              passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
            )}
          >
            <Target
              className={cn('w-5 h-5', passed ? 'text-green-600' : 'text-amber-600')}
            />
            <span
              className={cn(
                'font-medium',
                passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {passed ? '¡Excelente!' : 'Sigue practicando'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Resultados de Clasificacion
          </h2>
        </div>

        {/* Score display */}
        <div
          className={cn(
            'rounded-xl p-6 text-center',
            passed
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700'
          )}
        >
          <div className="text-5xl font-bold mb-2">
            <span className={passed ? 'text-green-600' : 'text-amber-600'}>{correctCount}</span>
            <span className="text-gray-400"> / </span>
            <span className="text-gray-600 dark:text-gray-400">{EXERCISES.length}</span>
          </div>
          <p
            className={cn(
              'text-sm',
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}
          >
            {passed
              ? `¡Muy bien! Dominas la clasificacion en intervalos.`
              : `Necesitas al menos ${REQUIRED_CORRECT} correctas para continuar.`}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          {!passed && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg"
            >
              <RotateCcw size={18} />
              <span>Reintentar</span>
            </button>
          )}
          <button
            onClick={passed ? onComplete : handleRetry}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>{passed ? 'Continuar' : 'Reintentar'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ EXERCISE SCREEN ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica los Datos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Practica identificando intervalos y sus propiedades
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Ejercicio {currentExercise + 1} de {EXERCISES.length}
        </div>
        <div className="flex gap-1">
          {EXERCISES.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                i < currentExercise
                  ? correctCount > i - (currentExercise - correctCount)
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : i === currentExercise
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              )}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
          {exercise.question}
        </h3>

        {/* Data display for relevant exercises */}
        {exercise.data !== 0 && (
          <div className="flex justify-center mb-6">
            <div className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
              <span className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                {exercise.data}
              </span>
            </div>
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {exercise.intervals.map((interval, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === exercise.correctInterval;

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl text-center font-mono font-semibold transition-all border-2',
                  !showFeedback && 'hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300',
                  !showFeedback && !isSelected && 'border-gray-200 dark:border-gray-700',
                  isSelected && !showFeedback && 'border-blue-500 bg-blue-50 dark:bg-blue-900/30',
                  showFeedback &&
                    isSelected &&
                    isCorrectOption &&
                    'border-green-500 bg-green-50 dark:bg-green-900/30',
                  showFeedback &&
                    isSelected &&
                    !isCorrectOption &&
                    'border-red-500 bg-red-50 dark:bg-red-900/30',
                  showFeedback &&
                    !isSelected &&
                    isCorrectOption &&
                    'border-green-500 bg-green-50/50 dark:bg-green-900/20',
                  showFeedback && !isSelected && !isCorrectOption && 'opacity-50'
                )}
              >
                <span className="text-gray-700 dark:text-gray-300">{interval}</span>
                {showFeedback && isSelected && (
                  <span className="ml-2">
                    {isCorrectOption ? (
                      <Check className="w-5 h-5 text-green-600 inline" />
                    ) : (
                      <X className="w-5 h-5 text-red-600 inline" />
                    )}
                  </span>
                )}
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
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
              : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
          )}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p
                className={cn(
                  'font-semibold mb-1',
                  isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                )}
              >
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <p
                className={cn(
                  'text-sm',
                  isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                )}
              >
                {exercise.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Continue button */}
      {showFeedback && (
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>{currentExercise === EXERCISES.length - 1 ? 'Ver Resultados' : 'Siguiente'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
