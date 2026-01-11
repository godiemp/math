'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { PolygonFigure } from '@/components/figures/PolygonFigure';

interface ClassifyQuestion {
  id: string;
  sides: number;
  name: string;
  isRegular: boolean;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: ClassifyQuestion[] = [
  {
    id: 'q1',
    sides: 5,
    name: 'Pentágono',
    isRegular: true,
    question: '¿Cuál es la suma de los ángulos interiores de este pentágono?',
    options: ['360°', '450°', '540°', '720°'],
    correctAnswer: 2,
    explanation: '(5 - 2) × 180° = 3 × 180° = 540°',
  },
  {
    id: 'q2',
    sides: 8,
    name: 'Octágono',
    isRegular: true,
    question: '¿Cuánto mide cada ángulo de este octágono regular?',
    options: ['120°', '135°', '144°', '150°'],
    correctAnswer: 1,
    explanation: '(8 - 2) × 180° ÷ 8 = 1080° ÷ 8 = 135°',
  },
  {
    id: 'q3',
    sides: 7,
    name: 'Heptágono',
    isRegular: true,
    question: '¿Cuál es la suma de los ángulos interiores de este heptágono?',
    options: ['720°', '810°', '900°', '1080°'],
    correctAnswer: 2,
    explanation: '(7 - 2) × 180° = 5 × 180° = 900°',
  },
  {
    id: 'q4',
    sides: 10,
    name: 'Decágono',
    isRegular: true,
    question: '¿Cuánto mide cada ángulo de este decágono regular?',
    options: ['135°', '140°', '144°', '150°'],
    correctAnswer: 2,
    explanation: '(10 - 2) × 180° ÷ 10 = 1440° ÷ 10 = 144°',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  if (!isActive) return null;

  const question = QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (selectedAnswer === question.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica los Ángulos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplica las fórmulas a diferentes polígonos
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2">
        {QUESTIONS.map((_, index) => (
          <div
            key={index}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              index < currentQuestion
                ? 'bg-green-500'
                : index === currentQuestion
                ? 'bg-purple-500 scale-125'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Question card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="text-center mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Pregunta {currentQuestion + 1} de {QUESTIONS.length}
          </span>
        </div>

        {/* Polygon visualization */}
        <div className="flex justify-center mb-4">
          <PolygonFigure
            fromRegular={{ sides: question.sides, radius: 60, centerX: 80, centerY: 70 }}
            fill={showFeedback && isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(147, 51, 234, 0.2)'}
            stroke={showFeedback && isCorrect ? 'rgb(34, 197, 94)' : 'rgb(147, 51, 234)'}
            strokeWidth={3}
            angles={question.question.includes('cada ángulo') ? [
              { showArc: true, color: '#f59e0b', arcRadius: 15 },
              ...Array(question.sides - 1).fill({}),
            ] : []}
            width={160}
            height={140}
          />
        </div>

        <div className="text-center mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {question.name} ({question.sides} lados)
          </p>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            {question.question}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && setSelectedAnswer(index)}
              disabled={showFeedback}
              className={cn(
                'p-3 rounded-xl font-semibold transition-all border-2',
                selectedAnswer === index
                  ? showFeedback
                    ? index === question.correctAnswer
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                    : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                  : showFeedback && index === question.correctAnswer
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                  : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
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
            'p-4 rounded-xl animate-fadeIn',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
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
                  'font-bold mb-1',
                  isCorrect
                    ? 'text-green-800 dark:text-green-300'
                    : 'text-amber-800 dark:text-amber-300'
                )}
              >
                {isCorrect ? '¡Correcto!' : '¡Casi!'}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action button */}
      <div className="flex justify-center">
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>{isLastQuestion ? 'Continuar a práctica' : 'Siguiente'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
