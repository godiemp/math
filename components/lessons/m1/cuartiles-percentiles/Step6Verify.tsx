'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Question {
  id: string;
  question: string;
  data?: number[];
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: 'Datos ordenados: 10, 15, 20, 25, 30, 35, 40. ¿Cual es Q₁?',
    data: [10, 15, 20, 25, 30, 35, 40],
    options: ['10', '15', '17.5', '20'],
    correctAnswer: 1,
    explanation: 'Con 7 datos, Q₂=25 (4to valor). Mitad inferior: 10, 15, 20. Q₁ = 15 (el valor central de la mitad inferior).',
  },
  {
    id: 'q2',
    question: 'Si Q₁ = 20 y Q₃ = 50, ¿cual es el IQR (rango intercuartilico)?',
    options: ['20', '30', '35', '50'],
    correctAnswer: 1,
    explanation: 'IQR = Q₃ - Q₁ = 50 - 20 = 30. El IQR mide la amplitud del 50% central de los datos.',
  },
  {
    id: 'q3',
    question: 'Si Juan obtuvo P₈₅ = 700 en un test, ¿que significa?',
    options: [
      'Juan obtuvo 85% de respuestas correctas',
      'El 85% de los participantes obtuvo mas que Juan',
      'El 85% de los participantes obtuvo menos o igual que Juan',
      'Juan obtuvo 700 de 850 puntos',
    ],
    correctAnswer: 2,
    explanation: 'P₈₅ = 700 significa que el 85% de los participantes obtuvo 700 puntos o menos. Juan esta en el top 15%.',
  },
  {
    id: 'q4',
    question: 'En un diagrama de caja (boxplot), ¿que representa la CAJA?',
    options: [
      'El rango total de los datos',
      'El rango intercuartilico (IQR)',
      'Los valores atipicos',
      'La media de los datos',
    ],
    correctAnswer: 1,
    explanation: 'La caja va desde Q₁ hasta Q₃, que es el IQR. Contiene el 50% central de los datos.',
  },
  {
    id: 'q5',
    question: 'Con Q₁=10, Q₃=30 e IQR=20, ¿el valor 75 seria un outlier?',
    data: [5, 10, 15, 20, 25, 30, 35, 75],
    options: [
      'No, esta dentro del rango normal',
      'Si, es un outlier',
      'Depende del contexto',
      'No se puede determinar',
    ],
    correctAnswer: 1,
    explanation: 'Limite superior = Q₃ + 1.5×IQR = 30 + 1.5(20) = 30 + 30 = 60. Como 75 > 60, SI es un outlier.',
  },
];

const PASS_THRESHOLD = 4;

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(QUESTIONS.length).fill(null)
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  if (!isActive) return null;

  const question = QUESTIONS[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  const correctCount = selectedAnswers.filter(
    (answer, i) => answer === QUESTIONS[i].correctAnswer
  ).length;

  const handleSelect = (index: number) => {
    if (showFeedback) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion === QUESTIONS.length - 1) {
      setQuizComplete(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(QUESTIONS.length).fill(null));
    setShowFeedback(false);
    setQuizComplete(false);
  };

  const passed = correctCount >= PASS_THRESHOLD;

  // ============ QUIZ COMPLETE VIEW ============
  if (quizComplete) {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div
            className={cn(
              'inline-flex items-center justify-center w-20 h-20 rounded-full mb-4',
              passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
            )}
          >
            {passed ? (
              <Trophy className="w-10 h-10 text-green-600" />
            ) : (
              <RotateCcw className="w-10 h-10 text-amber-600" />
            )}
          </div>

          <h2
            className={cn(
              'text-2xl font-bold mb-2',
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}
          >
            {passed ? '¡Felicitaciones!' : 'Casi lo logras'}
          </h2>

          <p className="text-gray-600 dark:text-gray-400">
            Obtuviste <strong>{correctCount}</strong> de{' '}
            <strong>{QUESTIONS.length}</strong> correctas
          </p>
        </div>

        {/* Results breakdown */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Resumen:
          </h4>
          <div className="space-y-2">
            {QUESTIONS.map((q, i) => {
              const wasCorrect = selectedAnswers[i] === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className="flex items-center gap-2 text-sm"
                >
                  {wasCorrect ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : (
                    <XCircle size={16} className="text-red-500" />
                  )}
                  <span className={cn(
                    wasCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                  )}>
                    Pregunta {i + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* What you learned */}
        {passed && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
              Lo que aprendiste:
            </h4>
            <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
              <li>• Calcular cuartiles (Q₁, Q₂, Q₃)</li>
              <li>• Calcular el rango intercuartilico (IQR)</li>
              <li>• Interpretar percentiles</li>
              <li>• Identificar valores atipicos (outliers)</li>
              <li>• Leer diagramas de caja (boxplots)</li>
            </ul>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          {!passed && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <RotateCcw size={20} />
              <span>Intentar de nuevo</span>
            </button>
          )}

          {passed && (
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>¡Completar leccion!</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>

        {!passed && (
          <p className="text-center text-sm text-gray-500">
            Necesitas {PASS_THRESHOLD} correctas para aprobar. ¡Vuelve a intentarlo!
          </p>
        )}
      </div>
    );
  }

  // ============ QUESTION VIEW ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Checkpoint
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Pregunta {currentQuestion + 1} de {QUESTIONS.length}
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-2">
        {QUESTIONS.map((_, i) => {
          const answered = selectedAnswers[i] !== null;
          const correct = selectedAnswers[i] === QUESTIONS[i].correctAnswer;

          return (
            <div
              key={i}
              className={cn(
                'w-10 h-2 rounded-full transition-all',
                !answered && 'bg-gray-300 dark:bg-gray-600',
                answered && correct && 'bg-green-500',
                answered && !correct && 'bg-red-500',
                i === currentQuestion && !answered && 'bg-blue-500'
              )}
            />
          );
        })}
      </div>

      {/* Question card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
        <p className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
          {question.question}
        </p>

        {/* Data visualization if present */}
        {question.data && (
          <div className="flex flex-wrap gap-2 justify-center mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            {question.data.map((val, i) => (
              <div
                key={i}
                className={cn(
                  'w-12 h-12 rounded-lg border flex items-center justify-center font-mono font-bold',
                  question.id === 'q5' && val === 75
                    ? 'bg-red-100 dark:bg-red-900/50 border-red-400 text-red-700 dark:text-red-300'
                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                )}
              >
                {val}
              </div>
            ))}
          </div>
        )}

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isThisCorrect = index === question.correctAnswer;

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'w-full p-4 rounded-xl border-2 transition-all text-left',
                  !showFeedback && 'hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20',
                  !showFeedback && !isSelected && 'border-gray-200 dark:border-gray-600',
                  showFeedback && isThisCorrect && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                  showFeedback && isSelected && !isThisCorrect && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                  showFeedback && !isSelected && !isThisCorrect && 'opacity-50'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                    {option}
                  </span>
                  {showFeedback && isThisCorrect && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {showFeedback && isSelected && !isThisCorrect && (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={cn(
            'p-4 rounded-xl animate-fadeIn',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
              : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
          )}
        >
          <p
            className={cn(
              'font-semibold mb-1',
              isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
            )}
          >
            {isCorrect ? '¡Correcto!' : 'Incorrecto'}
          </p>
          <p
            className={cn(
              'text-sm',
              isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            )}
          >
            {question.explanation}
          </p>
        </div>
      )}

      {/* Next button */}
      {showFeedback && (
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>
              {currentQuestion === QUESTIONS.length - 1 ? 'Ver resultados' : 'Siguiente'}
            </span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      {/* Current score */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        {correctCount} correctas hasta ahora (necesitas {PASS_THRESHOLD} para aprobar)
      </p>
    </div>
  );
}
