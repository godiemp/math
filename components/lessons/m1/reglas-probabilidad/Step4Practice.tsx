'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Sun, Cloud, Gift, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Question {
  id: string;
  type: 'complement' | 'exclusive' | 'non_exclusive';
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  visual?: 'weather' | 'gift' | 'dice' | 'cards' | 'sports';
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'complement',
    scenario: 'El pronóstico dice que hay un 65% de probabilidad de sol mañana.',
    question: '¿Cuál es la probabilidad de que NO haya sol?',
    options: ['0.65', '0.35', '0.50', '1.65'],
    correctIndex: 1,
    explanation: 'P(no sol) = 1 - P(sol) = 1 - 0.65 = 0.35',
    visual: 'weather',
  },
  {
    id: 'q2',
    type: 'exclusive',
    scenario: 'En la bolsa de Sofía hay 4 Netflix, 3 Spotify y 2 PlayStation.',
    question: '¿Cuál es P(Netflix O PlayStation)?',
    options: ['4/9', '6/9', '2/9', '8/9'],
    correctIndex: 1,
    explanation: 'Son excluyentes: P(N O P) = 4/9 + 2/9 = 6/9 = 2/3',
    visual: 'gift',
  },
  {
    id: 'q3',
    type: 'non_exclusive',
    scenario: 'Al lanzar un dado, quieres sacar un número PAR O un número mayor que 4.',
    question: '¿Cuál es P(PAR O >4)?',
    options: ['5/6', '4/6', '3/6', '2/6'],
    correctIndex: 1,
    explanation: '¡Cuidado! El 6 es PAR Y >4. P = 3/6 + 2/6 - 1/6 = 4/6',
    visual: 'dice',
  },
  {
    id: 'q4',
    type: 'non_exclusive',
    scenario: 'En una baraja de 52 cartas, quieres sacar un Rey O un Corazón.',
    question: '¿Cuál es P(Rey O Corazón)?',
    options: ['17/52', '16/52', '4/52', '13/52'],
    correctIndex: 1,
    explanation: 'P = 4/52 + 13/52 - 1/52 = 16/52 (el Rey de Corazones está en ambos)',
    visual: 'cards',
  },
  {
    id: 'q5',
    type: 'non_exclusive',
    scenario: 'En una clase: 60% juegan fútbol, 40% juegan básquet, 20% juegan ambos.',
    question: '¿Qué % juega al menos un deporte?',
    options: ['100%', '80%', '60%', '120%'],
    correctIndex: 1,
    explanation: 'P = 60% + 40% - 20% = 80%',
    visual: 'sports',
  },
];

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  if (!isActive) return null;

  const question = QUESTIONS[currentQuestion];
  const isCorrect = selectedAnswer === question.correctIndex;
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (isCorrect) {
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

  // Visual components based on question type
  const renderVisual = () => {
    switch (question.visual) {
      case 'weather':
        return (
          <div className="flex justify-center gap-4 py-3">
            <div className="flex flex-col items-center">
              <Sun className="w-12 h-12 text-yellow-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Sol: 65%</span>
            </div>
            <div className="flex flex-col items-center">
              <Cloud className="w-12 h-12 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">No sol: ?</span>
            </div>
          </div>
        );
      case 'gift':
        return (
          <div className="flex justify-center gap-2 py-3">
            <div className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold">
              🎬 Netflix: 4
            </div>
            <div className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold">
              🎵 Spotify: 3
            </div>
            <div className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
              🎮 PS: 2
            </div>
          </div>
        );
      case 'dice':
        const DICE_ICONS = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
        return (
          <div className="flex justify-center gap-2 py-3">
            {DICE_ICONS.map((DiceIcon, i) => {
              const value = i + 1;
              const isPar = value % 2 === 0;
              const isGreater = value > 4;
              const isBoth = isPar && isGreater;
              return (
                <div
                  key={i}
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    isBoth
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 ring-2 ring-yellow-400'
                      : isPar
                      ? 'bg-blue-100 dark:bg-blue-900/50'
                      : isGreater
                      ? 'bg-purple-100 dark:bg-purple-900/50'
                      : 'bg-gray-100 dark:bg-gray-800'
                  )}
                >
                  <DiceIcon
                    className={cn(
                      'w-6 h-6',
                      isBoth
                        ? 'text-white'
                        : isPar || isGreater
                        ? 'text-gray-700 dark:text-gray-300'
                        : 'text-gray-400'
                    )}
                  />
                </div>
              );
            })}
          </div>
        );
      case 'cards':
        return (
          <div className="flex justify-center gap-4 py-3">
            <div className="text-center">
              <div className="text-2xl">👑</div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Reyes: 4</span>
            </div>
            <div className="text-center">
              <div className="text-2xl">♥️</div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Corazones: 13</span>
            </div>
            <div className="text-center">
              <div className="text-2xl">👑♥️</div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Rey ♥️: 1</span>
            </div>
          </div>
        );
      case 'sports':
        return (
          <div className="flex justify-center gap-4 py-3">
            <div className="text-center">
              <div className="text-2xl">⚽</div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Fútbol: 60%</span>
            </div>
            <div className="text-center">
              <div className="text-2xl">🏀</div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Básquet: 40%</span>
            </div>
            <div className="text-center">
              <div className="text-2xl">⚽🏀</div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Ambos: 20%</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Pregunta {currentQuestion + 1} de {QUESTIONS.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-2 flex-1 rounded-full transition-all',
              i < currentQuestion
                ? 'bg-green-500'
                : i === currentQuestion
                ? 'bg-blue-500'
                : 'bg-gray-200 dark:bg-gray-700'
            )}
          />
        ))}
      </div>

      {/* Question card */}
      <div className={cn(
        'rounded-xl p-6 border',
        question.type === 'complement'
          ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700'
          : question.type === 'exclusive'
          ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700'
          : 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700'
      )}>
        {/* Type badge */}
        <div className="flex justify-center mb-3">
          <span className={cn(
            'px-3 py-1 rounded-full text-xs font-semibold',
            question.type === 'complement'
              ? 'bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200'
              : question.type === 'exclusive'
              ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
              : 'bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200'
          )}>
            {question.type === 'complement'
              ? 'Complemento'
              : question.type === 'exclusive'
              ? 'Eventos Excluyentes'
              : 'Eventos NO Excluyentes'}
          </span>
        </div>

        {/* Scenario */}
        <p className="text-gray-700 dark:text-gray-300 text-center mb-2">
          {question.scenario}
        </p>

        {/* Visual */}
        {renderVisual()}

        {/* Question */}
        <p className="text-lg font-semibold text-gray-900 dark:text-white text-center mt-3">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isThisCorrect = index === question.correctIndex;

          return (
            <button
              key={index}
              onClick={() => !showFeedback && setSelectedAnswer(index)}
              disabled={showFeedback}
              className={cn(
                'p-4 rounded-xl font-semibold transition-all border-2 text-lg',
                showFeedback
                  ? isThisCorrect
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                    : isSelected
                    ? 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 opacity-50'
                  : isSelected
                  ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400'
              )}
            >
              <div className="flex items-center justify-center gap-2">
                {showFeedback && isThisCorrect && <Check className="w-5 h-5 text-green-600" />}
                {showFeedback && isSelected && !isThisCorrect && <X className="w-5 h-5 text-red-600" />}
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={cn(
            'p-4 rounded-xl border animate-fadeIn',
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
              <p className={cn(
                'font-semibold mb-1',
                isCorrect ? 'text-green-800 dark:text-green-200' : 'text-amber-800 dark:text-amber-200'
              )}>
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

      {/* Score */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Correctas: {correctCount} / {currentQuestion + (showFeedback ? 1 : 0)}
      </div>
    </div>
  );
}
