'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: string;
  scenario: string;
  question: string;
  shape: 'rectangle' | 'triangle' | 'square';
  dimensions: {
    base?: number;
    height: number;
    side?: number;
  };
  unit: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    scenario: 'Un jardín rectangular',
    question: '¿Cuál es el área del jardín?',
    shape: 'rectangle',
    dimensions: { base: 6, height: 4 },
    unit: 'm',
    options: ['10 m²', '20 m²', '24 m²', '12 m²'],
    correctAnswer: 2,
    explanation: 'Área del rectángulo = base × altura = 6 × 4 = 24 m²',
  },
  {
    id: 'q2',
    scenario: 'Una vela triangular',
    question: '¿Cuál es el área de la vela?',
    shape: 'triangle',
    dimensions: { base: 10, height: 8 },
    unit: 'cm',
    options: ['80 cm²', '40 cm²', '18 cm²', '20 cm²'],
    correctAnswer: 1,
    explanation: 'Área del triángulo = ½ × base × altura = ½ × 10 × 8 = 40 cm²',
  },
  {
    id: 'q3',
    scenario: 'Una baldosa cuadrada',
    question: '¿Cuál es el área de la baldosa?',
    shape: 'square',
    dimensions: { side: 8, height: 8 },
    unit: 'cm',
    options: ['32 cm²', '16 cm²', '64 cm²', '24 cm²'],
    correctAnswer: 2,
    explanation: 'Área del cuadrado = lado × lado = 8 × 8 = 64 cm²',
  },
  {
    id: 'q4',
    scenario: 'Un cartel triangular',
    question: '¿Cuál es el área del cartel?',
    shape: 'triangle',
    dimensions: { base: 12, height: 5 },
    unit: 'm',
    options: ['60 m²', '17 m²', '30 m²', '35 m²'],
    correctAnswer: 2,
    explanation: 'Área del triángulo = ½ × base × altura = ½ × 12 × 5 = 30 m²',
  },
];

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const question = QUESTIONS[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (isLastQuestion) {
      onComplete();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  if (!isActive) return null;

  // Render shape visualization
  const renderShape = () => {
    const { shape, dimensions, unit } = question;

    if (shape === 'rectangle') {
      return (
        <svg viewBox="0 0 160 120" className="w-40 h-32">
          <rect x="20" y="20" width="120" height="80" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
          <text x="80" y="115" textAnchor="middle" fontSize="12" fill="#1f2937">{dimensions.base} {unit}</text>
          <text x="150" y="65" textAnchor="start" fontSize="12" fill="#1f2937">{dimensions.height} {unit}</text>
        </svg>
      );
    }

    if (shape === 'triangle') {
      return (
        <svg viewBox="0 0 160 120" className="w-40 h-32">
          <polygon points="80,15 20,100 140,100" fill="#86efac" stroke="#166534" strokeWidth="2" />
          <line x1="80" y1="15" x2="80" y2="100" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />
          <text x="80" y="115" textAnchor="middle" fontSize="12" fill="#1f2937">{dimensions.base} {unit}</text>
          <text x="90" y="60" textAnchor="start" fontSize="12" fill="#1f2937">{dimensions.height} {unit}</text>
        </svg>
      );
    }

    if (shape === 'square') {
      return (
        <svg viewBox="0 0 160 120" className="w-40 h-32">
          <rect x="40" y="20" width="80" height="80" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
          <text x="80" y="115" textAnchor="middle" fontSize="12" fill="#1f2937">{dimensions.side} {unit}</text>
        </svg>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Calcula el área de cada figura
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Pregunta {currentQuestion + 1} de {QUESTIONS.length}
        </div>
        <div className="flex gap-1">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                i < currentQuestion
                  ? 'bg-green-500'
                  : i === currentQuestion
                  ? 'bg-blue-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        {/* Scenario */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <p className="text-gray-700 dark:text-gray-300 text-center font-medium">
            {question.scenario}
          </p>
          <div className="flex justify-center mt-3">
            {renderShape()}
          </div>
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          {question.question}
        </h3>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showFeedback}
              className={cn(
                'p-4 rounded-xl font-semibold text-lg transition-all border-2',
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
              {option}
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

      {/* Action button */}
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
            <span>{isLastQuestion ? 'Continuar' : 'Siguiente'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>

      {/* Score indicator */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Correctas: {correctCount} / {currentQuestion + (showFeedback ? 1 : 0)}
      </div>
    </div>
  );
}
