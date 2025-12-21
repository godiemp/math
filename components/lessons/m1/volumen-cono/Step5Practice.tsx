'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  id: number;
  question: string;
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'facil' | 'medio' | 'dificil';
}

const PROBLEMS: Problem[] = [
  {
    id: 1,
    question: 'Un cono tiene radio 3 cm y altura 4 cm. ¿Cual es su volumen? (Usa π ≈ 3.14)',
    hint: 'V = (1/3) × π × r² × h',
    options: ['37.68 cm³', '113.04 cm³', '12.56 cm³', '75.36 cm³'],
    correctAnswer: 0,
    explanation: 'V = (1/3) × 3.14 × 3² × 4 = (1/3) × 3.14 × 9 × 4 = (1/3) × 113.04 = 37.68 cm³',
    difficulty: 'facil',
  },
  {
    id: 2,
    question: 'Un cono tiene diametro 10 cm y altura 6 cm. ¿Cual es su volumen?',
    hint: 'Recuerda: el radio es la mitad del diametro (r = d/2)',
    options: ['78.5 cm³', '157 cm³', '471 cm³', '314 cm³'],
    correctAnswer: 1,
    explanation: 'r = d/2 = 10/2 = 5 cm. V = (1/3) × 3.14 × 5² × 6 = (1/3) × 3.14 × 25 × 6 = (1/3) × 471 = 157 cm³',
    difficulty: 'medio',
  },
  {
    id: 3,
    question: 'Un vaso conico tiene capacidad para 94.2 mL. Si el radio es 3 cm, ¿cual es su altura? (1 mL = 1 cm³)',
    hint: 'Despeja h de la formula: h = (3V) ÷ (π × r²)',
    options: ['8 cm', '10 cm', '12 cm', '15 cm'],
    correctAnswer: 1,
    explanation: '94.2 = (1/3) × 3.14 × 9 × h → 94.2 = 9.42 × h → h = 94.2 ÷ 9.42 = 10 cm',
    difficulty: 'dificil',
  },
  {
    id: 4,
    question: '¿Cual cono tiene MAYOR volumen? Cono A: r=6 cm, h=8 cm. Cono B: r=8 cm, h=4 cm.',
    hint: 'Calcula ambos volumenes y compara',
    options: ['Cono A (301.44 cm³)', 'Cono B (268.08 cm³)', 'Tienen el mismo volumen', 'Cono B tiene el doble'],
    correctAnswer: 0,
    explanation: 'Cono A: V = (1/3) × 3.14 × 36 × 8 = 301.44 cm³. Cono B: V = (1/3) × 3.14 × 64 × 4 = 268.08 cm³. ¡Cono A es mayor!',
    difficulty: 'dificil',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentProblem = PROBLEMS[currentIndex];
  const isLastProblem = currentIndex === PROBLEMS.length - 1;

  if (!isActive) return null;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (selectedAnswer === currentProblem.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastProblem) {
      onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    }
  };

  const isCorrect = selectedAnswer === currentProblem.correctAnswer;

  const difficultyColor = {
    facil: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    medio: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    dificil: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Practica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Problema {currentIndex + 1} de {PROBLEMS.length}
        </p>
      </div>

      {/* Progress and difficulty */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 flex-1">
          {PROBLEMS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-2 flex-1 rounded-full transition-all',
                i < currentIndex
                  ? 'bg-green-500'
                  : i === currentIndex
                  ? 'bg-purple-500'
                  : 'bg-gray-200 dark:bg-gray-700'
              )}
            />
          ))}
        </div>
        <span className={cn('ml-4 px-3 py-1 rounded-full text-xs font-medium', difficultyColor[currentProblem.difficulty])}>
          {currentProblem.difficulty.charAt(0).toUpperCase() + currentProblem.difficulty.slice(1)}
        </span>
      </div>

      {/* Problem card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Cone visualization */}
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 120 100" className="w-32 h-28">
            <ellipse cx="60" cy="80" rx="35" ry="10" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
            <line x1="25" y1="80" x2="60" y2="15" stroke="#0d9488" strokeWidth="2" />
            <line x1="95" y1="80" x2="60" y2="15" stroke="#0d9488" strokeWidth="2" />
            <circle cx="60" cy="15" r="3" fill="#0d9488" />
            <line x1="60" y1="15" x2="60" y2="80" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" />
            <line x1="60" y1="80" x2="95" y2="80" stroke="#ef4444" strokeWidth="1.5" />
          </svg>
        </div>

        <p className="text-lg text-gray-800 dark:text-gray-200 text-center mb-4">
          {currentProblem.question}
        </p>

        {/* Hint button */}
        {!showHint && !showFeedback && (
          <button
            onClick={() => setShowHint(true)}
            className="flex items-center gap-2 mx-auto mb-4 text-sm text-yellow-600 dark:text-yellow-400 hover:underline"
          >
            <Lightbulb className="w-4 h-4" />
            Ver pista
          </button>
        )}

        {/* Hint */}
        {showHint && !showFeedback && (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-3 mb-4 text-sm text-yellow-700 dark:text-yellow-300 text-center">
            <Lightbulb className="w-4 h-4 inline mr-2" />
            {currentProblem.hint}
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {currentProblem.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && setSelectedAnswer(index)}
              disabled={showFeedback}
              className={cn(
                'p-4 rounded-xl font-medium transition-all border-2 text-sm',
                showFeedback
                  ? index === currentProblem.correctAnswer
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                    : selectedAnswer === index
                    ? 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-400'
                  : selectedAnswer === index
                  ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 text-gray-700 dark:text-gray-300'
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={cn(
            'p-4 rounded-xl border-2',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
              : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
          )}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
            )}
            <div>
              <p
                className={cn(
                  'font-bold',
                  isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}
              >
                {isCorrect ? '¡Excelente!' : '¡Casi!'}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm font-mono">
                {currentProblem.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Score */}
      <div className="text-center text-gray-600 dark:text-gray-400">
        Correctas: {correctCount} de {currentIndex + (showFeedback ? 1 : 0)}
      </div>

      {/* Action button */}
      <div className="flex justify-center">
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
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
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>{isLastProblem ? 'Ir al checkpoint' : 'Siguiente'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
