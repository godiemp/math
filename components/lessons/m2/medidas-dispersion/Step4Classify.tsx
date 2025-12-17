'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ClassificationItem {
  id: number;
  description: string;
  dataA: number[];
  dataB: number[];
  question: string;
  correctAnswer: 'A' | 'B' | 'equal';
  explanation: string;
}

const CLASSIFICATION_ITEMS: ClassificationItem[] = [
  {
    id: 1,
    description: 'Dos grupos de estudiantes midieron sus tiempos de reaccion (en ms)',
    dataA: [200, 210, 205, 195, 190],
    dataB: [150, 180, 220, 250, 200],
    question: '¿Cual grupo tiene MAYOR dispersion?',
    correctAnswer: 'B',
    explanation: 'El grupo B tiene rango 100 (250-150), mientras que A tiene rango 20 (210-190). B es mas disperso.',
  },
  {
    id: 2,
    description: 'Dos maquinas producen tornillos con estos diametros (en mm)',
    dataA: [10, 10, 10, 10, 10],
    dataB: [9.8, 10.1, 9.9, 10.2, 10.0],
    question: '¿Cual maquina es MAS consistente?',
    correctAnswer: 'A',
    explanation: 'La maquina A produce tornillos identicos (σ = 0). La maquina B tiene variacion (σ > 0).',
  },
  {
    id: 3,
    description: 'Temperaturas de dos ciudades durante una semana (°C)',
    dataA: [15, 18, 20, 17, 16, 19, 15],
    dataB: [5, 25, 10, 30, 8, 22, 12],
    question: '¿Cual ciudad tiene clima MAS estable?',
    correctAnswer: 'A',
    explanation: 'La ciudad A varia entre 15-20°C (rango 5), la ciudad B varia entre 5-30°C (rango 25). A es mas estable.',
  },
  {
    id: 4,
    description: 'Puntajes de dos jugadores de basketball en 5 partidos',
    dataA: [20, 22, 18, 21, 19],
    dataB: [10, 30, 15, 25, 20],
    question: '¿Cual jugador es MAS predecible?',
    correctAnswer: 'A',
    explanation: 'El jugador A siempre anota cerca de 20 puntos. El jugador B varia mucho mas (10 a 30 puntos).',
  },
  {
    id: 5,
    description: 'Notas de dos estudiantes en 4 pruebas',
    dataA: [5.5, 6.0, 5.8, 5.7],
    dataB: [4.0, 7.0, 5.0, 6.0],
    question: '¿Cual estudiante tiene rendimiento MAS variable?',
    correctAnswer: 'B',
    explanation: 'El estudiante B varia entre 4.0 y 7.0 (rango 3.0), mientras que A varia solo entre 5.5 y 6.0 (rango 0.5).',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'equal' | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  if (!isActive) return null;

  const currentItem = CLASSIFICATION_ITEMS[currentIndex];
  const isCorrect = selectedAnswer === currentItem.correctAnswer;
  const progress = ((currentIndex + 1) / CLASSIFICATION_ITEMS.length) * 100;

  // Calculate simple stats for display
  const rangeA = Math.max(...currentItem.dataA) - Math.min(...currentItem.dataA);
  const rangeB = Math.max(...currentItem.dataB) - Math.min(...currentItem.dataB);

  const handleAnswer = () => {
    setHasAnswered(true);
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < CLASSIFICATION_ITEMS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setCorrectCount(0);
    setShowResults(false);
  };

  // Results screen
  if (showResults) {
    const passed = correctCount >= 4;

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4',
            passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
          )}>
            {passed ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-700 dark:text-green-300 font-medium">
                  ¡Excelente trabajo!
                </span>
              </>
            ) : (
              <>
                <RotateCcw className="w-5 h-5 text-amber-600" />
                <span className="text-amber-700 dark:text-amber-300 font-medium">
                  Necesitas mas practica
                </span>
              </>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Resultado: {correctCount}/{CLASSIFICATION_ITEMS.length}
          </h2>
        </div>

        {/* Score visualization */}
        <div className="flex justify-center gap-2">
          {CLASSIFICATION_ITEMS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold',
                i < correctCount
                  ? 'bg-green-500 text-white'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-500'
              )}
            >
              {i < correctCount ? <Check size={20} /> : <X size={20} />}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          {passed ? (
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Continuar a practica</span>
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <RotateCcw size={20} />
              <span>Intentar de nuevo</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <span className="text-purple-700 dark:text-purple-300 font-medium">
            Clasificacion {currentIndex + 1} de {CLASSIFICATION_ITEMS.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-purple-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Description */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <p className="text-gray-700 dark:text-gray-300">{currentItem.description}</p>
      </div>

      {/* Data comparison */}
      <div className="grid grid-cols-2 gap-4">
        {/* Dataset A */}
        <div className={cn(
          'p-4 rounded-xl border-2 transition-all',
          hasAnswered && currentItem.correctAnswer === 'A'
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
            : hasAnswered && selectedAnswer === 'A' && !isCorrect
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
              : 'border-gray-200 dark:border-gray-700'
        )}>
          <div className="text-center mb-2">
            <span className="font-bold text-lg text-blue-600 dark:text-blue-400">Grupo A</span>
          </div>
          <div className="flex flex-wrap gap-1 justify-center mb-2">
            {currentItem.dataA.map((d, i) => (
              <span key={i} className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-sm font-mono">
                {d}
              </span>
            ))}
          </div>
          <div className="text-center text-xs text-gray-500">
            Rango: <span className="font-bold">{rangeA.toFixed(1)}</span>
          </div>
        </div>

        {/* Dataset B */}
        <div className={cn(
          'p-4 rounded-xl border-2 transition-all',
          hasAnswered && currentItem.correctAnswer === 'B'
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
            : hasAnswered && selectedAnswer === 'B' && !isCorrect
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
              : 'border-gray-200 dark:border-gray-700'
        )}>
          <div className="text-center mb-2">
            <span className="font-bold text-lg text-orange-600 dark:text-orange-400">Grupo B</span>
          </div>
          <div className="flex flex-wrap gap-1 justify-center mb-2">
            {currentItem.dataB.map((d, i) => (
              <span key={i} className="bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded text-sm font-mono">
                {d}
              </span>
            ))}
          </div>
          <div className="text-center text-xs text-gray-500">
            Rango: <span className="font-bold">{rangeB.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
        <p className="text-center font-semibold text-purple-800 dark:text-purple-200">
          {currentItem.question}
        </p>
      </div>

      {/* Answer options */}
      {!hasAnswered && (
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setSelectedAnswer('A')}
            className={cn(
              'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
              selectedAnswer === 'A'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
            )}
          >
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <span className="font-semibold">Grupo A</span>
          </button>
          <button
            onClick={() => setSelectedAnswer('equal')}
            className={cn(
              'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
              selectedAnswer === 'equal'
                ? 'border-gray-500 bg-gray-50 dark:bg-gray-800'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
            )}
          >
            <Minus className="w-6 h-6 text-gray-600" />
            <span className="font-semibold">Igual</span>
          </button>
          <button
            onClick={() => setSelectedAnswer('B')}
            className={cn(
              'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
              selectedAnswer === 'B'
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
            )}
          >
            <TrendingDown className="w-6 h-6 text-orange-600" />
            <span className="font-semibold">Grupo B</span>
          </button>
        </div>
      )}

      {/* Feedback after answering */}
      {hasAnswered && (
        <div className={cn(
          'rounded-xl p-4 animate-fadeIn',
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
            : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
        )}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <X className="w-6 h-6 text-red-600 flex-shrink-0" />
            )}
            <div>
              <p className={cn(
                'font-semibold',
                isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
              )}>
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <p className={cn(
                'text-sm mt-1',
                isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
              )}>
                {currentItem.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-center">
        {!hasAnswered ? (
          <button
            onClick={handleAnswer}
            disabled={!selectedAnswer}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg',
              selectedAnswer
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            )}
          >
            <span>Verificar</span>
            <Check size={20} />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>{currentIndex < CLASSIFICATION_ITEMS.length - 1 ? 'Siguiente' : 'Ver resultados'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
