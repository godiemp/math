'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: string;
  scenario: string;
  question: string;
  type: 'circumference' | 'area';
  givenValue: 'radius' | 'diameter';
  value: number;
  unit: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    scenario: 'Una pizza familiar',
    question: '¿Cual es el area de la pizza?',
    type: 'area',
    givenValue: 'diameter',
    value: 30,
    unit: 'cm',
    options: ['94.2 cm²', '706.5 cm²', '2826 cm²', '188.4 cm²'],
    correctAnswer: 1,
    explanation: 'Radio = 30÷2 = 15 cm. Area = π × 15² = 3.14 × 225 = 706.5 cm²',
  },
  {
    id: 'q2',
    scenario: 'Una rueda de bicicleta',
    question: '¿Cuanto recorre la rueda en una vuelta completa?',
    type: 'circumference',
    givenValue: 'radius',
    value: 35,
    unit: 'cm',
    options: ['109.9 cm', '219.8 cm', '3846.5 cm²', '70 cm'],
    correctAnswer: 1,
    explanation: 'Circunferencia = 2πr = 2 × 3.14 × 35 = 219.8 cm',
  },
  {
    id: 'q3',
    scenario: 'Una piscina circular',
    question: '¿Que area debe cubrir la lona?',
    type: 'area',
    givenValue: 'radius',
    value: 4,
    unit: 'm',
    options: ['25.12 m²', '50.24 m²', '12.56 m²', '100.48 m²'],
    correctAnswer: 1,
    explanation: 'Area = πr² = 3.14 × 4² = 3.14 × 16 = 50.24 m²',
  },
  {
    id: 'q4',
    scenario: 'Un reloj de pared',
    question: '¿Cual es la circunferencia del reloj?',
    type: 'circumference',
    givenValue: 'diameter',
    value: 24,
    unit: 'cm',
    options: ['452.16 cm²', '75.36 cm', '37.68 cm', '150.72 cm'],
    correctAnswer: 1,
    explanation: 'Circunferencia = πd = 3.14 × 24 = 75.36 cm',
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
    const { type, givenValue, value, unit } = question;
    const isArea = type === 'area';

    return (
      <svg viewBox="0 0 160 140" className="w-44 h-36">
        {/* Main circle */}
        <circle
          cx="80"
          cy="70"
          r="50"
          fill={isArea ? '#5eead4' : 'none'}
          stroke="#0d9488"
          strokeWidth="3"
        />

        {/* Center point */}
        <circle cx="80" cy="70" r="3" fill="#0d9488" />

        {givenValue === 'radius' ? (
          <>
            {/* Radius line */}
            <line x1="80" y1="70" x2="130" y2="70" stroke="#dc2626" strokeWidth="2" />
            <text x="105" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
              r = {value} {unit}
            </text>
          </>
        ) : (
          <>
            {/* Diameter line */}
            <line x1="30" y1="70" x2="130" y2="70" stroke="#7c3aed" strokeWidth="2" />
            <text x="80" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">
              d = {value} {unit}
            </text>
          </>
        )}

        {/* Label for what we're finding */}
        <text x="80" y="135" textAnchor="middle" fontSize="11" fill="#6b7280">
          {isArea ? 'Encontrar: Area' : 'Encontrar: Circunferencia'}
        </text>
      </svg>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Practica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Calcula usando las formulas del circulo
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
