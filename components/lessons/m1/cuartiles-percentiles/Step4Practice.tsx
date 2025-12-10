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
  measure: 'q1' | 'q2' | 'q3' | 'iqr' | 'outlier' | 'percentile';
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'notas',
    context: 'Notas del curso',
    emoji: '📊',
    question: '¿Cual es Q₁ (primer cuartil)?',
    data: [40, 50, 55, 60, 65, 70, 75, 80, 90],
    dataLabel: 'Notas ordenadas',
    measure: 'q1',
    options: ['50', '52.5', '55', '60'],
    correctAnswer: 1,
    explanation: 'Con 9 datos, Q₂=65 (5to valor). Mitad inferior: [40, 50, 55, 60]. Q₁ = (50+55)/2 = 52.5',
  },
  {
    id: 'salarios',
    context: 'Salarios de empleados',
    emoji: '💰',
    question: '¿Cual es Q₃ (tercer cuartil)?',
    data: [800, 900, 950, 1000, 1100, 1200, 1500],
    dataLabel: 'Salarios (miles)',
    measure: 'q3',
    options: ['1000', '1100', '1200', '1350'],
    correctAnswer: 2,
    explanation: 'Con 7 datos, Q₂=1000 (4to valor). Mitad superior: [1100, 1200, 1500]. Q₃ = 1200 (el del medio)',
  },
  {
    id: 'tiempos',
    context: 'Tiempos de carrera',
    emoji: '🏃',
    question: '¿Cual es el IQR (rango intercuartilico)?',
    data: [10, 12, 14, 15, 16, 18, 20, 22, 25],
    dataLabel: 'Minutos',
    measure: 'iqr',
    options: ['6', '8', '10', '15'],
    correctAnswer: 1,
    explanation: 'Q₁ = (12+14)/2 = 13, Q₃ = (20+22)/2 = 21. IQR = Q₃ - Q₁ = 21 - 13 = 8',
  },
  {
    id: 'ventas',
    context: 'Ventas mensuales',
    emoji: '📈',
    question: '¿El valor 500 es un outlier (valor atipico)?',
    data: [80, 90, 100, 110, 120, 130, 140, 500],
    dataLabel: 'Ventas (unidades)',
    measure: 'outlier',
    options: ['No, esta dentro del rango', 'Si, es un outlier', 'No se puede determinar', 'Depende del contexto'],
    correctAnswer: 1,
    explanation: 'Q₁=95, Q₃=135, IQR=40. Limite superior: 135 + 1.5(40) = 195. Como 500 > 195, es un OUTLIER.',
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

  const measureColors: Record<string, string> = {
    q1: 'blue',
    q2: 'green',
    q3: 'purple',
    iqr: 'orange',
    outlier: 'red',
    percentile: 'indigo',
  };

  const color = measureColors[problem.measure];

  const bgColors: Record<string, string> = {
    blue: 'rgb(239 246 255)',
    green: 'rgb(240 253 244)',
    purple: 'rgb(250 245 255)',
    orange: 'rgb(255 247 237)',
    red: 'rgb(254 242 242)',
    indigo: 'rgb(238 242 255)',
  };

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
      <div
        className="rounded-xl p-5 border border-gray-200 dark:border-gray-700"
        style={{ backgroundColor: bgColors[color] }}
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
            {problem.data.map((val, i) => (
              <div
                key={i}
                className={cn(
                  'w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm',
                  problem.measure === 'outlier' && val === 500
                    ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-2 border-red-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                )}
              >
                {val}
              </div>
            ))}
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
                  !showFeedback && !isSelected && 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800',
                  showFeedback && isThisCorrect && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                  showFeedback && isSelected && !isThisCorrect && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                  !showFeedback && isSelected && 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30',
                  showFeedback && !isSelected && !isThisCorrect && 'opacity-50 bg-white dark:bg-gray-800'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">{option}</span>
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
            <span>{isLastProblem ? 'Continuar al boxplot' : 'Siguiente problema'}</span>
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
