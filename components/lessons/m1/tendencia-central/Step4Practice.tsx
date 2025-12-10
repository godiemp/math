'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Check, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  id: string;
  context: string;
  emoji: string;
  question: string;
  data: number[];
  dataLabel: string;
  measure: 'media' | 'mediana' | 'moda' | 'rango';
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'notas',
    context: 'Notas del semestre',
    emoji: '📚',
    question: '¿Cual es la MEDIANA de estas notas?',
    data: [4.5, 5.0, 5.5, 5.5, 6.0, 6.5, 7.0],
    dataLabel: 'Notas',
    measure: 'mediana',
    options: ['5.0', '5.5', '5.7', '6.0'],
    correctAnswer: 1,
    explanation: 'Con 7 datos (impar), la mediana es el 4to valor. Ordenados: 4.5, 5.0, 5.5, [5.5], 6.0, 6.5, 7.0',
  },
  {
    id: 'tallas',
    context: 'Pedido de poleras',
    emoji: '👕',
    question: '¿Cual talla es la MODA (mas pedida)?',
    data: [1, 2, 2, 3, 2, 1, 2, 4, 2], // 1=S, 2=M, 3=L, 4=XL
    dataLabel: 'Tallas: S, M, M, L, M, S, M, XL, M',
    measure: 'moda',
    options: ['S (2 veces)', 'M (5 veces)', 'L (1 vez)', 'XL (1 vez)'],
    correctAnswer: 1,
    explanation: 'La talla M aparece 5 veces, mas que cualquier otra. Es la MODA.',
  },
  {
    id: 'temperaturas',
    context: 'Temperaturas de la semana',
    emoji: '🌡️',
    question: '¿Cual es el RANGO de temperaturas?',
    data: [18, 22, 19, 25, 20, 23, 21],
    dataLabel: 'Temperaturas (°C)',
    measure: 'rango',
    options: ['5°C', '7°C', '21°C', '25°C'],
    correctAnswer: 1,
    explanation: 'Rango = Maximo - Minimo = 25 - 18 = 7°C',
  },
  {
    id: 'edades',
    context: 'Edades del grupo',
    emoji: '👥',
    question: '¿Cual es la MEDIA de edades?',
    data: [12, 14, 14, 15, 20],
    dataLabel: 'Edades',
    measure: 'media',
    options: ['14', '14.5', '15', '15.5'],
    correctAnswer: 2,
    explanation: 'Media = (12 + 14 + 14 + 15 + 20) / 5 = 75 / 5 = 15',
  },
];

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  if (!isActive) return null;

  const problem = PROBLEMS[currentProblem];
  const isCorrect = selectedAnswer === problem.correctAnswer;
  const isLastProblem = currentProblem === PROBLEMS.length - 1;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (index === problem.correctAnswer) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    if (isLastProblem) {
      onComplete();
    } else {
      setCurrentProblem(currentProblem + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const measureColors = {
    media: 'blue',
    mediana: 'green',
    moda: 'purple',
    rango: 'orange',
  };

  const color = measureColors[problem.measure];

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span className="text-indigo-700 dark:text-indigo-300 font-medium">
            Problema {currentProblem + 1} de {PROBLEMS.length}
          </span>
        </div>
        <div className="flex justify-center gap-2 mb-4">
          {PROBLEMS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-8 h-2 rounded-full transition-all',
                i < currentProblem
                  ? 'bg-green-500'
                  : i === currentProblem
                    ? 'bg-indigo-500'
                    : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>
      </div>

      {/* Problem card */}
      <div className={cn(
        'rounded-xl p-5 border',
        `bg-${color}-50 dark:bg-${color}-900/20`,
        `border-${color}-200 dark:border-${color}-700`
      )}
      style={{
        backgroundColor: color === 'blue' ? 'rgb(239 246 255)' : color === 'green' ? 'rgb(240 253 244)' : color === 'purple' ? 'rgb(250 245 255)' : 'rgb(255 247 237)'
      }}
      >
        {/* Context */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{problem.emoji}</span>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">{problem.context}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{problem.dataLabel}</p>
          </div>
        </div>

        {/* Data visualization */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {problem.measure !== 'moda' || problem.id !== 'tallas' ? (
              problem.data.map((val, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300"
                >
                  {val}
                </div>
              ))
            ) : (
              // Special display for t-shirt sizes
              ['S', 'M', 'M', 'L', 'M', 'S', 'M', 'XL', 'M'].map((size, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300"
                >
                  {size}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Question */}
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle size={20} className="text-gray-500" />
          <p className="font-semibold text-gray-800 dark:text-gray-200">{problem.question}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {problem.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isThisCorrect = index === problem.correctAnswer;

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-left',
                  !showFeedback && 'hover:border-gray-400',
                  !showFeedback && !isSelected && 'border-gray-200 dark:border-gray-600',
                  showFeedback && isThisCorrect && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                  showFeedback && isSelected && !isThisCorrect && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                  !showFeedback && isSelected && 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30',
                  showFeedback && !isSelected && !isThisCorrect && 'opacity-50'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{option}</span>
                  {showFeedback && isThisCorrect && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                  {showFeedback && isSelected && !isThisCorrect && (
                    <X className="w-5 h-5 text-red-600" />
                  )}
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
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700'
          )}
        >
          <p className={cn(
            'font-semibold mb-1',
            isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
          )}>
            {isCorrect ? '¡Correcto!' : 'No exactamente'}
          </p>
          <p className={cn(
            'text-sm',
            isCorrect ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
          )}>
            {problem.explanation}
          </p>
        </div>
      )}

      {/* Continue button */}
      {showFeedback && (
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className={cn(
              'flex items-center gap-2 px-6 py-3 text-white rounded-xl font-semibold transition-all shadow-lg',
              isLastProblem
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
            )}
          >
            <span>{isLastProblem ? 'Continuar al desafio' : 'Siguiente problema'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      {/* Score indicator */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        {correctCount} de {currentProblem + (showFeedback ? 1 : 0)} correctas
      </div>
    </div>
  );
}
