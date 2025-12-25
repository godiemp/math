'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ClassifyQuestion {
  id: number;
  graphType: 'intersect' | 'parallel' | 'same';
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: ClassifyQuestion[] = [
  {
    id: 1,
    graphType: 'intersect',
    options: ['Una solución', 'Sin solución', 'Infinitas soluciones'],
    correctAnswer: 0,
    explanation: 'Las rectas se cruzan en un punto, por lo tanto hay exactamente una solución.',
  },
  {
    id: 2,
    graphType: 'parallel',
    options: ['Una solución', 'Sin solución', 'Infinitas soluciones'],
    correctAnswer: 1,
    explanation: 'Las rectas son paralelas y nunca se cruzan, por lo tanto no hay solución.',
  },
  {
    id: 3,
    graphType: 'same',
    options: ['Una solución', 'Sin solución', 'Infinitas soluciones'],
    correctAnswer: 2,
    explanation: 'Las rectas son la misma línea, por lo tanto todos los puntos de la recta son solución (infinitas).',
  },
  {
    id: 4,
    graphType: 'intersect',
    options: ['Una solución', 'Sin solución', 'Infinitas soluciones'],
    correctAnswer: 0,
    explanation: 'Las rectas se cruzan en exactamente un punto. Ese punto es la única solución del sistema.',
  },
  {
    id: 5,
    graphType: 'parallel',
    options: ['Una solución', 'Sin solución', 'Infinitas soluciones'],
    correctAnswer: 1,
    explanation: 'Las rectas tienen la misma pendiente pero diferente intercepto. Son paralelas y no hay solución.',
  },
];

function MiniGraph({ type }: { type: 'intersect' | 'parallel' | 'same' }) {
  return (
    <svg width="180" height="140" className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      {/* Grid */}
      {[0, 1, 2, 3, 4].map(i => (
        <g key={i}>
          <line x1={20 + i * 35} y1={10} x2={20 + i * 35} y2={130} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />
          <line x1={20} y1={10 + i * 30} x2={160} y2={10 + i * 30} stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />
        </g>
      ))}

      {type === 'intersect' && (
        <>
          <line x1="20" y1="120" x2="160" y2="20" stroke="#3B82F6" strokeWidth="3" />
          <line x1="20" y1="40" x2="160" y2="100" stroke="#10B981" strokeWidth="3" />
          <circle cx="90" cy="70" r="6" fill="#EF4444" className="animate-pulse" />
        </>
      )}

      {type === 'parallel' && (
        <>
          <line x1="20" y1="100" x2="160" y2="40" stroke="#3B82F6" strokeWidth="3" />
          <line x1="20" y1="120" x2="160" y2="60" stroke="#10B981" strokeWidth="3" />
        </>
      )}

      {type === 'same' && (
        <>
          <line x1="20" y1="110" x2="160" y2="30" stroke="#8B5CF6" strokeWidth="4" />
        </>
      )}
    </svg>
  );
}

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const question = QUESTIONS[currentQuestion];
  const isComplete = answers.length === QUESTIONS.length;
  const passed = score >= 4;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    const isCorrect = selectedAnswer === question.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([...answers, isCorrect]);
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnswers([]);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Clasifica el Sistema
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Observa el gráfico y determina cuántas soluciones tiene
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Ejercicio {currentQuestion + 1} de {QUESTIONS.length}
            </div>
            <div className="flex gap-1">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    i < answers.length
                      ? answers[i]
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentQuestion
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {i < answers.length ? (answers[i] ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* Graph display */}
            <div className="flex justify-center mb-6">
              <MiniGraph type={question.graphType} />
            </div>

            <p className="text-center text-gray-700 dark:text-gray-300 font-semibold mb-4">
              ¿Cuántas soluciones tiene este sistema?
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl text-center font-medium transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === question.correctAnswer
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200'
                      : showFeedback && index === question.correctAnswer
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-blue-400 dark:hover:border-blue-500'
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    {showFeedback && index === question.correctAnswer && (
                      <Check size={18} className="text-green-500" />
                    )}
                    {showFeedback && selectedAnswer === index && index !== question.correctAnswer && (
                      <X size={18} className="text-red-500" />
                    )}
                    <span className="text-gray-800 dark:text-gray-200">{option}</span>
                  </div>
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

          {/* Action buttons */}
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
            ) : currentQuestion < QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                <span>Siguiente</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={() => setAnswers([...answers])}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                <span>Ver resultados</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          <div className={cn(
            'rounded-2xl p-8 text-center',
            passed
              ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
              : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
          )}>
            <div className="text-6xl mb-4">
              {passed ? '🎯' : '💪'}
            </div>

            <h3 className={cn(
              'text-2xl font-bold mb-2',
              passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {passed ? '¡Excelente!' : '¡Sigue practicando!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {score} / {QUESTIONS.length}
            </div>

            <p className={cn(
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}>
              {passed
                ? 'Sabes clasificar sistemas gráficamente.'
                : 'Necesitas 4 respuestas correctas. ¡Inténtalo de nuevo!'}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            {!passed && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
                <span>Intentar de nuevo</span>
              </button>
            )}

            {passed && (
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Continuar</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
