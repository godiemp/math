'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, Trophy, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps, VerifyQuestion } from '@/lib/lessons/types';
import { BarChart, PieChart, FrequencyTable } from '@/components/lessons/shared';

const QUESTIONS: (VerifyQuestion & { visual?: 'bar' | 'pie' | 'table'; visualData?: { categories: string[]; values: number[]; colors: string[] } })[] = [
  {
    id: 'v1',
    question: 'Segun esta tabla, ¿cual categoria tiene la mayor frecuencia?',
    type: 'multiple-choice',
    visual: 'table',
    visualData: {
      categories: ['Perro', 'Gato', 'Pajaro', 'Pez'],
      values: [12, 15, 8, 5],
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    },
    options: ['Perro', 'Gato', 'Pajaro', 'Pez'],
    correctAnswer: 1,
    explanation: 'Gato tiene frecuencia 15, que es la mayor de todas las categorias.',
  },
  {
    id: 'v2',
    question: 'Si en una encuesta participaron 50 personas y 20 eligieron "Cine", ¿cual es la frecuencia relativa?',
    type: 'multiple-choice',
    options: ['20', '0.40', '50', '2.5'],
    correctAnswer: 1,
    explanation: 'Frecuencia relativa = fi/n = 20/50 = 0.40 (o 40%)',
  },
  {
    id: 'v3',
    question: 'Segun este grafico de barras, ¿cuantas personas eligieron "Futbol"?',
    type: 'multiple-choice',
    visual: 'bar',
    visualData: {
      categories: ['Futbol', 'Tenis', 'Basket', 'Natacion'],
      values: [18, 12, 15, 5],
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    },
    options: ['12', '15', '18', '5'],
    correctAnswer: 2,
    explanation: 'La barra de Futbol llega hasta 18.',
  },
  {
    id: 'v4',
    question: 'En un grafico circular, si un sector representa 25%, ¿a cuantas personas corresponde si el total es 80?',
    type: 'multiple-choice',
    visual: 'pie',
    visualData: {
      categories: ['Sector A', 'Sector B', 'Sector C', 'Sector D'],
      values: [25, 30, 25, 20],
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    },
    options: ['25', '20', '4', '0.25'],
    correctAnswer: 1,
    explanation: '25% de 80 = 0.25 × 80 = 20 personas.',
  },
  {
    id: 'v5',
    question: '¿Cual tipo de grafico es mejor para mostrar como se distribuye un presupuesto en diferentes categorias?',
    type: 'multiple-choice',
    options: ['Grafico de Barras', 'Grafico Circular', 'Histograma', 'Grafico de Lineas'],
    correctAnswer: 1,
    explanation: 'El grafico circular es ideal para mostrar partes de un todo (proporciones del 100%).',
  },
];

const REQUIRED_CORRECT = 4;

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [showResults, setShowResults] = useState(false);

  if (!isActive) return null;

  const question = QUESTIONS[currentQuestion];
  const selectedAnswer = answers[currentQuestion];
  const correctCount = answers.filter((a, i) => a === QUESTIONS[i].correctAnswer).length;
  const isCorrect = selectedAnswer === question.correctAnswer;
  const passed = correctCount >= REQUIRED_CORRECT;

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion === QUESTIONS.length - 1) {
      setShowResults(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setShowFeedback(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setShowFeedback(false);
    setShowResults(false);
  };

  // Prepare visual data if exists
  const chartData = question.visualData?.categories.map((cat, i) => ({
    category: cat,
    value: question.visualData!.values[i],
    color: question.visualData!.colors[i],
  }));

  const tableData = question.visualData?.categories.map((cat, i) => ({
    category: cat,
    frequency: question.visualData!.values[i],
    color: question.visualData!.colors[i],
  }));

  // ============ RESULTS SCREEN ============
  if (showResults) {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4',
              passed
                ? 'bg-green-100 dark:bg-green-900/30'
                : 'bg-amber-100 dark:bg-amber-900/30'
            )}
          >
            {passed ? (
              <Trophy className="w-5 h-5 text-green-600" />
            ) : (
              <Target className="w-5 h-5 text-amber-600" />
            )}
            <span
              className={cn(
                'font-medium',
                passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {passed ? '¡Aprobado!' : 'Sigue practicando'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Resultados
          </h2>
        </div>

        {/* Score display */}
        <div
          className={cn(
            'rounded-xl p-6 text-center',
            passed
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700'
          )}
        >
          <div className="text-5xl font-bold mb-2">
            <span className={passed ? 'text-green-600' : 'text-amber-600'}>{correctCount}</span>
            <span className="text-gray-400"> / </span>
            <span className="text-gray-600 dark:text-gray-400">{QUESTIONS.length}</span>
          </div>
          <p className={cn('text-sm', passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
            {passed
              ? `¡Felicitaciones! Necesitabas ${REQUIRED_CORRECT} correctas.`
              : `Necesitas al menos ${REQUIRED_CORRECT} correctas para aprobar.`}
          </p>
        </div>

        {/* Question review */}
        <div className="space-y-2">
          {QUESTIONS.map((q, i) => {
            const wasCorrect = answers[i] === q.correctAnswer;
            return (
              <div
                key={q.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg',
                  wasCorrect
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-red-50 dark:bg-red-900/20'
                )}
              >
                {wasCorrect ? (
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  Pregunta {i + 1}
                </span>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          {!passed && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg"
            >
              <RotateCcw size={18} />
              <span>Reintentar</span>
            </button>
          )}
          <button
            onClick={passed ? onComplete : handleRetry}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>{passed ? 'Completar Leccion' : 'Reintentar'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ QUESTION SCREEN ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Checkpoint
        </h2>
        <div className="flex items-center justify-center gap-2">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                i === currentQuestion
                  ? 'bg-blue-500 scale-125'
                  : answers[i] !== null
                    ? answers[i] === QUESTIONS[i].correctAnswer
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Pregunta {currentQuestion + 1} de {QUESTIONS.length} (necesitas {REQUIRED_CORRECT} correctas)
        </p>
      </div>

      {/* Visual if exists */}
      {question.visual && chartData && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          {question.visual === 'bar' && (
            <BarChart data={chartData} height="md" animated />
          )}
          {question.visual === 'pie' && (
            <PieChart data={chartData} showPercentages size="md" />
          )}
          {question.visual === 'table' && tableData && (
            <FrequencyTable data={tableData} />
          )}
        </div>
      )}

      {/* Question */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-center">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {(question.options as string[]).map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;
          const showResult = showFeedback && isSelected;

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showFeedback}
              className={cn(
                'p-4 rounded-xl border-2 font-medium transition-all text-left',
                !showFeedback && 'hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-300',
                !showFeedback && !isSelected && 'border-gray-200 dark:border-gray-700',
                isSelected && !showFeedback && 'border-blue-500 bg-blue-50 dark:bg-blue-900/30',
                showResult && isCorrectOption && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                showResult && !isCorrectOption && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                showFeedback && !isSelected && isCorrectOption && 'border-green-500 bg-green-50/50',
                showFeedback && !isSelected && !isCorrectOption && 'opacity-50'
              )}
            >
              <span className="text-gray-700 dark:text-gray-300">{option}</span>
              {showFeedback && isSelected && (
                <span className="ml-2">
                  {isCorrectOption ? (
                    <Check className="w-5 h-5 text-green-600 inline" />
                  ) : (
                    <X className="w-5 h-5 text-red-600 inline" />
                  )}
                </span>
              )}
            </button>
          );
        })}
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
              isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
            )}
          >
            {isCorrect ? '¡Correcto!' : 'Incorrecto'}
          </p>
          <p
            className={cn(
              'text-sm',
              isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
            )}
          >
            {question.explanation}
          </p>
        </div>
      )}

      {/* Continue button */}
      {showFeedback && (
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>{currentQuestion === QUESTIONS.length - 1 ? 'Ver Resultados' : 'Siguiente'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
