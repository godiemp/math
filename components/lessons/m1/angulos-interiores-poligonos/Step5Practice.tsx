'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: string;
  question: string;
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  steps: string[];
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'p1',
    question: 'Calcula la suma de los ángulos interiores de un heptágono (7 lados).',
    hint: 'Usa la fórmula: (n - 2) × 180°, donde n = 7',
    options: ['720°', '810°', '900°', '1080°'],
    correctAnswer: 2,
    explanation: 'Un heptágono tiene 7 lados.',
    steps: [
      'n = 7 (heptágono tiene 7 lados)',
      '(n - 2) = 7 - 2 = 5 triángulos',
      'Suma = 5 × 180° = 900°',
    ],
  },
  {
    id: 'p2',
    question: '¿Cuánto mide cada ángulo interior de un octágono regular (8 lados)?',
    hint: 'Primero calcula la suma total, luego divide por 8',
    options: ['120°', '128°', '135°', '140°'],
    correctAnswer: 2,
    explanation: 'En un polígono regular, todos los ángulos son iguales.',
    steps: [
      'Suma = (8 - 2) × 180° = 6 × 180° = 1080°',
      'Cada ángulo = 1080° ÷ 8 = 135°',
    ],
  },
  {
    id: 'p3',
    question: 'Si la suma de los ángulos interiores de un polígono es 1080°, ¿cuántos lados tiene?',
    hint: 'Despeja n: n = (Suma ÷ 180°) + 2',
    options: ['6', '7', '8', '9'],
    correctAnswer: 2,
    explanation: 'Podemos despejar n de la fórmula.',
    steps: [
      '(n - 2) × 180° = 1080°',
      'n - 2 = 1080° ÷ 180° = 6',
      'n = 6 + 2 = 8 lados',
    ],
  },
  {
    id: 'p4',
    question: 'Un polígono regular tiene ángulos interiores de 144° cada uno. ¿Cuántos lados tiene?',
    hint: 'Si cada ángulo es 144°, la suma = 144° × n. Iguala con (n-2)×180°',
    options: ['8', '9', '10', '12'],
    correctAnswer: 2,
    explanation: 'Este problema requiere plantear una ecuación.',
    steps: [
      'Cada ángulo = (n - 2) × 180° ÷ n = 144°',
      '(n - 2) × 180° = 144° × n',
      '180n - 360 = 144n',
      '36n = 360',
      'n = 10 lados',
    ],
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
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
      setShowHint(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Resuelve problemas aplicando las fórmulas
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
                ? 'bg-blue-500 scale-125'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Question card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="text-center mb-4">
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            Problema {currentQuestion + 1} de {QUESTIONS.length}
          </span>
        </div>

        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-center mb-6">
          {question.question}
        </p>

        {/* Hint button */}
        {!showFeedback && (
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                showHint
                  ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
            >
              <HelpCircle size={16} />
              <span>{showHint ? 'Ocultar pista' : 'Ver pista'}</span>
            </button>
          </div>
        )}

        {/* Hint */}
        {showHint && !showFeedback && (
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mb-4 border border-amber-200 dark:border-amber-700 animate-fadeIn">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Pista:</strong> {question.hint}
            </p>
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && setSelectedAnswer(index)}
              disabled={showFeedback}
              className={cn(
                'p-4 rounded-xl font-semibold transition-all border-2 text-lg',
                selectedAnswer === index
                  ? showFeedback
                    ? index === question.correctAnswer
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                    : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200'
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

      {/* Feedback with steps */}
      {showFeedback && (
        <div
          className={cn(
            'p-5 rounded-xl animate-fadeIn',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
          )}
        >
          <div className="flex items-start gap-3 mb-4">
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
                {isCorrect ? '¡Excelente!' : '¡Casi! Veamos la solución:'}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {question.explanation}
              </p>
            </div>
          </div>

          {/* Step by step solution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="font-medium text-gray-800 dark:text-gray-200 mb-2 text-sm">
              Solución paso a paso:
            </p>
            <ol className="space-y-1">
              {question.steps.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
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
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
          >
            <span>{isLastQuestion ? 'Ir al checkpoint' : 'Siguiente problema'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
