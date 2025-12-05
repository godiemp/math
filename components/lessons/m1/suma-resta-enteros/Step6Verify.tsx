'use client';

import { useState } from 'react';
import { Check, X, Trophy, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { Celebration } from '@/components/lessons/shared';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'direction',
    question: 'Si empiezas en −5 y sumas un número positivo, ¿hacia dónde te mueves?',
    options: ['Hacia la izquierda', 'Hacia la derecha', 'Te quedas en el mismo lugar'],
    correctAnswer: 1,
    explanation: 'Sumar un positivo siempre te mueve a la derecha, sin importar dónde empieces.',
  },
  {
    id: 'equivalent',
    question: '¿Qué operación da el mismo resultado que 6 − (−2)?',
    options: ['6 − 2', '6 + 2', '−6 + 2'],
    correctAnswer: 1,
    explanation: 'Restar un negativo es sumar el opuesto: 6 − (−2) = 6 + 2',
  },
  {
    id: 'negative-sum',
    question: '¿Qué pasa cuando sumas un número negativo?',
    options: ['El resultado siempre es negativo', 'Te mueves a la izquierda en la recta', 'El resultado siempre aumenta'],
    correctAnswer: 1,
    explanation: 'Sumar un negativo te mueve a la izquierda. El resultado puede ser positivo, negativo o cero dependiendo de dónde empieces.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const question = QUESTIONS[currentQuestion];
  const isCorrect = selectedAnswer === question?.correctAnswer;
  const allCorrect = correctAnswers === QUESTIONS.length;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (selectedAnswer === question.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
      // Show celebration if got all correct OR at least 2/3
      if (correctAnswers + (isCorrect ? 1 : 0) >= 2) {
        setShowCelebration(true);
      }
    }
  };

  const handleCelebrationContinue = () => {
    setShowCelebration(false);
    onComplete();
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Checkpoint
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Demuestra lo que aprendiste
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress dots */}
          <div className="flex justify-center gap-2">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-3 h-3 rounded-full transition-all',
                  i === currentQuestion
                    ? 'bg-purple-500 scale-125'
                    : i < currentQuestion
                    ? 'bg-green-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                )}
              />
            ))}
          </div>

          {/* Question */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'w-full p-4 rounded-xl text-left font-medium transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === question.correctAnswer
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                      : showFeedback && index === question.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-purple-300 dark:hover:border-purple-500'
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
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className={cn(
                      'font-bold mb-1',
                      isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                    )}>
                      {isCorrect ? '¡Exacto!' : 'No del todo...'}
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
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>{currentQuestion < QUESTIONS.length - 1 ? 'Siguiente' : 'Finalizar'}</span>
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </>
      ) : (
        // Results
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-8 text-center">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">
              ¡Lección Completada!
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Obtuviste {correctAnswers + (selectedAnswer === question.correctAnswer ? 1 : 0)} de {QUESTIONS.length} conceptos
            </p>
          </div>

          {/* Key takeaways */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">
              Recuerda:
            </h4>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li>• Sumar positivo = moverse a la derecha</li>
              <li>• Sumar negativo = moverse a la izquierda</li>
              <li>• Restar es sumar el opuesto</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setShowCelebration(true)}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              Finalizar Lección
            </button>
          </div>
        </div>
      )}

      {/* Celebration */}
      {showCelebration && (
        <Celebration
          title="¡Excelente trabajo!"
          message="Ahora entiendes cómo funciona la suma y resta de enteros. Practica más en el modo Operaciones."
          onContinue={handleCelebrationContinue}
          continueLabel="Terminar"
        />
      )}
    </div>
  );
}
