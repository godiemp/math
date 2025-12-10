'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: string;
  scenario: string;
  question: string;
  shape: 'parallelogram' | 'trapezoid';
  dimensions: {
    base?: number;
    height: number;
    baseMayor?: number;
    baseMenor?: number;
  };
  unit: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    scenario: 'Una ventana con forma de paralelogramo',
    question: '¿Cuál es el área del vidrio?',
    shape: 'parallelogram',
    dimensions: { base: 5, height: 3 },
    unit: 'm',
    options: ['8 m²', '15 m²', '7.5 m²', '16 m²'],
    correctAnswer: 1,
    explanation: 'Área del paralelogramo = base × altura = 5 × 3 = 15 m²',
  },
  {
    id: 'q2',
    scenario: 'Un terreno en forma de trapecio',
    question: '¿Cuál es el área del terreno?',
    shape: 'trapezoid',
    dimensions: { baseMayor: 10, baseMenor: 6, height: 4 },
    unit: 'm',
    options: ['24 m²', '32 m²', '40 m²', '16 m²'],
    correctAnswer: 1,
    explanation: 'Área del trapecio = ½ × (B + b) × h = ½ × (10 + 6) × 4 = ½ × 16 × 4 = 32 m²',
  },
  {
    id: 'q3',
    scenario: 'Un mosaico con forma de paralelogramo',
    question: '¿Cuál es el área del mosaico?',
    shape: 'parallelogram',
    dimensions: { base: 8, height: 6 },
    unit: 'cm',
    options: ['48 cm²', '14 cm²', '24 cm²', '56 cm²'],
    correctAnswer: 0,
    explanation: 'Área del paralelogramo = base × altura = 8 × 6 = 48 cm²',
  },
  {
    id: 'q4',
    scenario: 'Una mesa con forma de trapecio',
    question: '¿Cuál es el área de la superficie?',
    shape: 'trapezoid',
    dimensions: { baseMayor: 12, baseMenor: 8, height: 5 },
    unit: 'cm',
    options: ['100 cm²', '40 cm²', '50 cm²', '60 cm²'],
    correctAnswer: 2,
    explanation: 'Área del trapecio = ½ × (B + b) × h = ½ × (12 + 8) × 5 = ½ × 20 × 5 = 50 cm²',
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

    if (shape === 'parallelogram') {
      return (
        <svg viewBox="0 0 160 120" className="w-40 h-32">
          <polygon points="40,100 60,20 140,20 120,100" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
          <line x1="60" y1="20" x2="60" y2="100" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />
          <text x="90" y="115" textAnchor="middle" fontSize="12" fill="#1f2937">{dimensions.base} {unit}</text>
          <text x="48" y="65" textAnchor="end" fontSize="12" fill="#1f2937">{dimensions.height} {unit}</text>
        </svg>
      );
    }

    if (shape === 'trapezoid') {
      return (
        <svg viewBox="0 0 160 120" className="w-40 h-32">
          <polygon points="30,100 50,20 110,20 130,100" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
          <line x1="80" y1="20" x2="80" y2="100" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />
          <text x="80" y="14" textAnchor="middle" fontSize="10" fill="#1f2937">{dimensions.baseMenor} {unit}</text>
          <text x="80" y="115" textAnchor="middle" fontSize="10" fill="#1f2937">{dimensions.baseMayor} {unit}</text>
          <text x="90" y="65" textAnchor="start" fontSize="12" fill="#1f2937">{dimensions.height} {unit}</text>
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
                ? 'bg-gradient-to-r from-purple-500 to-orange-500 text-white hover:from-purple-600 hover:to-orange-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-orange-600 transition-all shadow-lg"
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
