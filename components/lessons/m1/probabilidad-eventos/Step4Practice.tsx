'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

const DICE_ICONS = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

interface PracticeQuestion {
  id: string;
  scenario: string;
  question: string;
  context: 'dado' | 'monedas' | 'bolsa';
  visualHint?: React.ReactNode;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    scenario: 'Tienes un dado de 6 caras.',
    question: '¿Cuál es la probabilidad de sacar exactamente un 5?',
    context: 'dado',
    options: ['1/6', '2/6', '5/6', '1/5'],
    correctAnswer: 0,
    explanation: 'Solo hay 1 cara con el número 5, y hay 6 caras posibles. P(5) = 1/6',
  },
  {
    id: 'q2',
    scenario: 'Tienes un dado de 6 caras.',
    question: '¿Cuál es la probabilidad de sacar un número impar?',
    context: 'dado',
    options: ['1/6', '2/6', '3/6', '4/6'],
    correctAnswer: 2,
    explanation: 'Los números impares son: 1, 3, 5. Son 3 casos favorables de 6 posibles. P(impar) = 3/6 = 1/2',
  },
  {
    id: 'q3',
    scenario: 'Lanzas una moneda justa.',
    question: '¿Cuál es la probabilidad de obtener sello?',
    context: 'monedas',
    options: ['0', '1/4', '1/2', '1'],
    correctAnswer: 2,
    explanation: 'Una moneda tiene 2 resultados posibles y solo 1 es sello. P(sello) = 1/2',
  },
  {
    id: 'q4',
    scenario: 'Una bolsa tiene 4 bolas rojas y 6 bolas azules.',
    question: '¿Cuál es la probabilidad de sacar una bola roja?',
    context: 'bolsa',
    options: ['4/6', '6/10', '4/10', '1/4'],
    correctAnswer: 2,
    explanation: 'Hay 4 bolas rojas (favorables) y 10 bolas en total (posibles). P(roja) = 4/10 = 2/5',
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

  // Context-specific visual
  const renderContextVisual = () => {
    if (question.context === 'dado') {
      return (
        <div className="flex justify-center gap-2 py-2">
          {DICE_ICONS.map((DiceIcon, idx) => (
            <div key={idx} className="w-10 h-10 bg-white dark:bg-gray-700 rounded-lg shadow-sm flex items-center justify-center">
              <DiceIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          ))}
        </div>
      );
    }
    if (question.context === 'monedas') {
      return (
        <div className="flex justify-center gap-4 py-2">
          <div className="w-14 h-14 rounded-full bg-yellow-400 dark:bg-yellow-500 shadow-lg flex items-center justify-center border-4 border-yellow-500 dark:border-yellow-600">
            <span className="text-xl font-bold text-yellow-800">C</span>
          </div>
          <div className="w-14 h-14 rounded-full bg-gray-300 dark:bg-gray-500 shadow-lg flex items-center justify-center border-4 border-gray-400 dark:border-gray-600">
            <span className="text-xl font-bold text-gray-700 dark:text-gray-200">S</span>
          </div>
        </div>
      );
    }
    if (question.context === 'bolsa') {
      return (
        <div className="flex justify-center gap-1 py-2 flex-wrap max-w-xs mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={`red-${i}`} className="w-8 h-8 rounded-full bg-red-500 shadow-sm" />
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={`blue-${i}`} className="w-8 h-8 rounded-full bg-blue-500 shadow-sm" />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplica la fórmula de probabilidad
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
          <p className="text-gray-700 dark:text-gray-300 text-center">
            {question.scenario}
          </p>
          {renderContextVisual()}
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
