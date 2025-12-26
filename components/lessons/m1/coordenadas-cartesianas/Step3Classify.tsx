'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PointData {
  id: string;
  label: string;
  x: number;
  y: number;
  correctAnswer: string;
}

const POINTS: PointData[] = [
  { id: 'a', label: 'A', x: 4, y: 3, correctAnswer: 'I' },
  { id: 'b', label: 'B', x: -2, y: 5, correctAnswer: 'II' },
  { id: 'c', label: 'C', x: -3, y: -4, correctAnswer: 'III' },
  { id: 'd', label: 'D', x: 5, y: -2, correctAnswer: 'IV' },
  { id: 'e', label: 'E', x: 0, y: 3, correctAnswer: 'eje-y' },
  { id: 'f', label: 'F', x: -4, y: 0, correctAnswer: 'eje-x' },
];

const OPTIONS = [
  { id: 'I', label: 'Cuadrante I', color: 'green' },
  { id: 'II', label: 'Cuadrante II', color: 'blue' },
  { id: 'III', label: 'Cuadrante III', color: 'purple' },
  { id: 'IV', label: 'Cuadrante IV', color: 'orange' },
  { id: 'eje-x', label: 'Eje X', color: 'gray' },
  { id: 'eje-y', label: 'Eje Y', color: 'gray' },
];

export default function Step3Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  if (!isActive) return null;

  const currentPoint = POINTS[currentPointIndex];
  const isCorrect = selectedAnswer === currentPoint?.correctAnswer;

  const toSvgX = (x: number) => 150 + x * 18;
  const toSvgY = (y: number) => 150 - y * 18;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentPointIndex < POINTS.length - 1) {
      setCurrentPointIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentPointIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setIsComplete(false);
  };

  const getColorClasses = (optionId: string) => {
    const option = OPTIONS.find((o) => o.id === optionId);
    if (!option) return '';

    switch (option.color) {
      case 'green':
        return 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200';
      case 'blue':
        return 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200';
      case 'purple':
        return 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200';
      case 'orange':
        return 'bg-orange-100 dark:bg-orange-900/50 border-orange-500 text-orange-800 dark:text-orange-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 border-gray-500 text-gray-800 dark:text-gray-200';
    }
  };

  // ============ COMPLETE STATE ============
  if (isComplete) {
    const percentage = Math.round((correctCount / POINTS.length) * 100);
    const passed = correctCount >= 4;

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Ejercicio Completado!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Veamos cómo te fue identificando cuadrantes
          </p>
        </div>

        <div
          className={cn(
            'rounded-xl p-6 text-center',
            passed
              ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-400'
              : 'bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-400'
          )}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-5xl font-bold mb-2"
          >
            {passed ? '🎉' : '💪'}
          </motion.div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
            {correctCount} de {POINTS.length}
          </p>
          <p className="text-gray-600 dark:text-gray-400">{percentage}% correcto</p>
        </div>

        {passed ? (
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
            <p className="text-green-800 dark:text-green-200 text-center">
              <strong>¡Excelente!</strong> Dominas la identificación de cuadrantes.
            </p>
          </div>
        ) : (
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
            <p className="text-amber-800 dark:text-amber-200 text-center">
              <strong>¡Casi!</strong> Recuerda: el cuadrante I está arriba a la derecha
              <br />y se numeran en sentido antihorario.
            </p>
          </div>
        )}

        <div className="flex justify-center gap-3">
          {!passed && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <RotateCcw size={18} />
              <span>Intentar de nuevo</span>
            </button>
          )}
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ MAIN EXERCISE ============
  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica el Cuadrante
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Punto {currentPointIndex + 1} de {POINTS.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentPointIndex) / POINTS.length) * 100}%` }}
        />
      </div>

      {/* Coordinate grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
        <div className="flex justify-center mb-2">
          <svg viewBox="0 0 300 300" className="w-72 h-72">
            {/* Quadrant backgrounds (subtle) */}
            <rect x="150" y="30" width="120" height="120" className="fill-green-50 dark:fill-green-900/20" />
            <rect x="30" y="30" width="120" height="120" className="fill-blue-50 dark:fill-blue-900/20" />
            <rect x="30" y="150" width="120" height="120" className="fill-purple-50 dark:fill-purple-900/20" />
            <rect x="150" y="150" width="120" height="120" className="fill-orange-50 dark:fill-orange-900/20" />

            {/* Grid lines */}
            {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((i) => (
              <g key={`grid-${i}`}>
                <line
                  x1={toSvgX(i)}
                  y1={30}
                  x2={toSvgX(i)}
                  y2={270}
                  className="stroke-gray-200 dark:stroke-gray-700"
                  strokeWidth="1"
                />
                <line
                  x1={30}
                  y1={toSvgY(i)}
                  x2={270}
                  y2={toSvgY(i)}
                  className="stroke-gray-200 dark:stroke-gray-700"
                  strokeWidth="1"
                />
              </g>
            ))}

            {/* Axes */}
            <line x1="30" y1="150" x2="270" y2="150" stroke="#3b82f6" strokeWidth="2" />
            <line x1="150" y1="270" x2="150" y2="30" stroke="#22c55e" strokeWidth="2" />

            {/* Axis labels */}
            <text x="275" y="155" fontSize="12" fontWeight="bold" fill="#3b82f6">X</text>
            <text x="155" y="25" fontSize="12" fontWeight="bold" fill="#22c55e">Y</text>

            {/* Axis numbers */}
            {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((n) => (
              <g key={`num-${n}`}>
                <text
                  x={toSvgX(n)}
                  y={163}
                  fontSize="9"
                  textAnchor="middle"
                  className="fill-gray-500 dark:fill-gray-500"
                >
                  {n}
                </text>
                <text
                  x={140}
                  y={toSvgY(n) + 3}
                  fontSize="9"
                  textAnchor="middle"
                  className="fill-gray-500 dark:fill-gray-500"
                >
                  {n}
                </text>
              </g>
            ))}

            {/* Origin */}
            <circle cx="150" cy="150" r="4" fill="#ef4444" />

            {/* All points (dimmed except current) */}
            {POINTS.map((point, idx) => {
              const isCurrent = idx === currentPointIndex;
              const isPast = idx < currentPointIndex;

              return (
                <g key={point.id}>
                  {/* Point circle */}
                  <circle
                    cx={toSvgX(point.x)}
                    cy={toSvgY(point.y)}
                    r={isCurrent ? 10 : 6}
                    className={cn(
                      'transition-all',
                      isCurrent
                        ? 'fill-purple-500'
                        : isPast
                        ? 'fill-gray-400 dark:fill-gray-600'
                        : 'fill-gray-300 dark:fill-gray-700'
                    )}
                  />
                  {/* Point label */}
                  <text
                    x={toSvgX(point.x) + (isCurrent ? 15 : 10)}
                    y={toSvgY(point.y) - (isCurrent ? 5 : 3)}
                    fontSize={isCurrent ? 14 : 11}
                    fontWeight="bold"
                    className={cn(
                      isCurrent
                        ? 'fill-purple-700 dark:fill-purple-300'
                        : isPast
                        ? 'fill-gray-500 dark:fill-gray-500'
                        : 'fill-gray-400 dark:fill-gray-600'
                    )}
                  >
                    {point.label}
                  </text>
                </g>
              );
            })}

            {/* Current point highlight */}
            <motion.circle
              cx={toSvgX(currentPoint.x)}
              cy={toSvgY(currentPoint.y)}
              r="16"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </svg>
        </div>

        {/* Current point info */}
        <div className="text-center bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
          <p className="text-purple-800 dark:text-purple-200">
            Punto <strong>{currentPoint.label}</strong> está en{' '}
            <span className="font-mono bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">
              ({currentPoint.x}, {currentPoint.y})
            </span>
          </p>
        </div>
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-2 gap-2">
        {OPTIONS.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrectOption = option.id === currentPoint.correctAnswer;

          return (
            <button
              key={option.id}
              onClick={() => !showFeedback && setSelectedAnswer(option.id)}
              disabled={showFeedback}
              className={cn(
                'p-3 rounded-xl font-medium transition-all border-2',
                showFeedback
                  ? isCorrectOption
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                    : isSelected && !isCorrect
                    ? 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-50'
                  : isSelected
                  ? getColorClasses(option.id)
                  : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'p-4 rounded-xl',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700'
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
                  'font-bold',
                  isCorrect
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-amber-800 dark:text-amber-200'
                )}
              >
                {isCorrect ? '¡Correcto!' : '¡Casi!'}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {currentPoint.correctAnswer === 'eje-x' ? (
                  <>
                    El punto ({currentPoint.x}, {currentPoint.y}) tiene <strong>y = 0</strong>, así
                    que está sobre el <strong>Eje X</strong>.
                  </>
                ) : currentPoint.correctAnswer === 'eje-y' ? (
                  <>
                    El punto ({currentPoint.x}, {currentPoint.y}) tiene <strong>x = 0</strong>, así
                    que está sobre el <strong>Eje Y</strong>.
                  </>
                ) : (
                  <>
                    El punto ({currentPoint.x}, {currentPoint.y}) está en el{' '}
                    <strong>Cuadrante {currentPoint.correctAnswer}</strong> porque x es{' '}
                    {currentPoint.x > 0 ? 'positivo' : 'negativo'} e y es{' '}
                    {currentPoint.y > 0 ? 'positivo' : 'negativo'}.
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.div>
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
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>{currentPointIndex < POINTS.length - 1 ? 'Siguiente punto' : 'Ver resultado'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
