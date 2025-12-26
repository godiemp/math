'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type ProblemType = 'read' | 'quadrant' | 'special';

interface Problem {
  id: string;
  type: ProblemType;
  question: string;
  point?: { x: number; y: number };
  options: string[];
  correctIndex: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    type: 'read',
    question: '¿Cuáles son las coordenadas del punto P?',
    point: { x: 2, y: 4 },
    options: ['(4, 2)', '(2, 4)', '(-2, 4)', '(2, -4)'],
    correctIndex: 1,
    explanation: 'El punto está 2 a la derecha (x = 2) y 4 arriba (y = 4).',
  },
  {
    id: 'p2',
    type: 'quadrant',
    question: '¿En qué cuadrante está el punto (-3, 5)?',
    options: ['Cuadrante I', 'Cuadrante II', 'Cuadrante III', 'Cuadrante IV'],
    correctIndex: 1,
    explanation: 'x negativo (izquierda) + y positivo (arriba) = Cuadrante II.',
  },
  {
    id: 'p3',
    type: 'read',
    question: '¿Cuáles son las coordenadas del punto Q?',
    point: { x: -1, y: -3 },
    options: ['(-1, -3)', '(-3, -1)', '(1, 3)', '(3, 1)'],
    correctIndex: 0,
    explanation: 'El punto está 1 a la izquierda (x = -1) y 3 abajo (y = -3).',
  },
  {
    id: 'p4',
    type: 'quadrant',
    question: '¿En qué cuadrante está el punto (7, -2)?',
    options: ['Cuadrante I', 'Cuadrante II', 'Cuadrante III', 'Cuadrante IV'],
    correctIndex: 3,
    explanation: 'x positivo (derecha) + y negativo (abajo) = Cuadrante IV.',
  },
  {
    id: 'p5',
    type: 'read',
    question: '¿Cuáles son las coordenadas del punto R?',
    point: { x: 0, y: -4 },
    options: ['(-4, 0)', '(0, -4)', '(0, 4)', '(4, 0)'],
    correctIndex: 1,
    explanation: 'El punto está en x = 0 (sobre el eje Y) y 4 abajo (y = -4).',
  },
  {
    id: 'p6',
    type: 'special',
    question: 'El origen del plano cartesiano tiene coordenadas:',
    options: ['(1, 1)', '(0, 1)', '(1, 0)', '(0, 0)'],
    correctIndex: 3,
    explanation: 'El origen es el punto donde se cruzan los ejes, en (0, 0).',
  },
  {
    id: 'p7',
    type: 'quadrant',
    question: '¿En qué cuadrante está el punto (-4, -6)?',
    options: ['Cuadrante I', 'Cuadrante II', 'Cuadrante III', 'Cuadrante IV'],
    correctIndex: 2,
    explanation: 'Ambos valores negativos (izquierda y abajo) = Cuadrante III.',
  },
  {
    id: 'p8',
    type: 'read',
    question: '¿Cuáles son las coordenadas del punto S?',
    point: { x: 5, y: 0 },
    options: ['(0, 5)', '(5, 0)', '(-5, 0)', '(0, -5)'],
    correctIndex: 1,
    explanation: 'El punto está 5 a la derecha (x = 5) sobre el eje X (y = 0).',
  },
];

const REQUIRED_CORRECT = 6;

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!isActive) return null;

  const currentProblem = PROBLEMS[currentIndex];
  const isCorrect = selectedAnswer === currentProblem?.correctIndex;

  const toSvgX = (x: number) => 100 + x * 15;
  const toSvgY = (y: number) => 100 - y * 15;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < PROBLEMS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowHint(false);
    setCorrectCount(0);
    setIsComplete(false);
  };

  // ============ COMPLETE STATE ============
  if (isComplete) {
    const passed = correctCount >= REQUIRED_CORRECT;
    const percentage = Math.round((correctCount / PROBLEMS.length) * 100);

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Práctica Completada!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Resultado de tu práctica</p>
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
            {passed ? '🌟' : '📚'}
          </motion.div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
            {correctCount} de {PROBLEMS.length}
          </p>
          <p className="text-gray-600 dark:text-gray-400">{percentage}% correcto</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            (Necesitas {REQUIRED_CORRECT} para aprobar)
          </p>
        </div>

        {passed ? (
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
            <p className="text-green-800 dark:text-green-200 text-center">
              <strong>¡Muy bien!</strong> Estás listo para el checkpoint final.
            </p>
          </div>
        ) : (
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
            <p className="text-amber-800 dark:text-amber-200 text-center">
              <strong>Sigue practicando.</strong> Recuerda: (x, y) = primero horizontal, luego
              vertical.
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
            <span>Ir al checkpoint</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ MAIN PRACTICE ============
  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Practica Coordenadas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Problema {currentIndex + 1} de {PROBLEMS.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / PROBLEMS.length) * 100}%` }}
        />
      </div>

      {/* Score tracker */}
      <div className="flex justify-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-1 text-sm">
          <span className="text-green-600 dark:text-green-400 font-bold">{correctCount}</span>
          <span className="text-gray-500 dark:text-gray-400"> correctas</span>
        </div>
      </div>

      {/* Problem area */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
        {/* Question */}
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-center mb-4">
          {currentProblem.question}
        </p>

        {/* Visual for 'read' type problems */}
        {currentProblem.type === 'read' && currentProblem.point && (
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 200 200" className="w-56 h-56">
              {/* Grid lines */}
              {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((i) => (
                <g key={`grid-${i}`}>
                  <line
                    x1={toSvgX(i)}
                    y1={20}
                    x2={toSvgX(i)}
                    y2={180}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="1"
                  />
                  <line
                    x1={20}
                    y1={toSvgY(i)}
                    x2={180}
                    y2={toSvgY(i)}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="1"
                  />
                </g>
              ))}

              {/* Axes */}
              <line x1="20" y1="100" x2="180" y2="100" stroke="#3b82f6" strokeWidth="2" />
              <line x1="100" y1="180" x2="100" y2="20" stroke="#22c55e" strokeWidth="2" />

              {/* Axis numbers */}
              {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((n) => (
                <g key={`num-${n}`}>
                  <text
                    x={toSvgX(n)}
                    y={110}
                    fontSize="8"
                    textAnchor="middle"
                    className="fill-gray-500"
                  >
                    {n}
                  </text>
                  <text x={92} y={toSvgY(n) + 3} fontSize="8" textAnchor="middle" className="fill-gray-500">
                    {n}
                  </text>
                </g>
              ))}

              {/* Origin */}
              <circle cx="100" cy="100" r="3" fill="#ef4444" />

              {/* Target point */}
              <motion.circle
                cx={toSvgX(currentProblem.point.x)}
                cy={toSvgY(currentProblem.point.y)}
                r="8"
                fill="#8b5cf6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
              <motion.circle
                cx={toSvgX(currentProblem.point.x)}
                cy={toSvgY(currentProblem.point.y)}
                r="14"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <text
                x={toSvgX(currentProblem.point.x) + 12}
                y={toSvgY(currentProblem.point.y) - 8}
                fontSize="12"
                fontWeight="bold"
                fill="#8b5cf6"
              >
                {currentProblem.id === 'p1'
                  ? 'P'
                  : currentProblem.id === 'p3'
                  ? 'Q'
                  : currentProblem.id === 'p5'
                  ? 'R'
                  : 'S'}
              </text>

              {/* Hint lines when showing hint */}
              {showHint && (
                <g>
                  <line
                    x1={toSvgX(0)}
                    y1={toSvgY(currentProblem.point.y)}
                    x2={toSvgX(currentProblem.point.x)}
                    y2={toSvgY(currentProblem.point.y)}
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                  <line
                    x1={toSvgX(currentProblem.point.x)}
                    y1={toSvgY(0)}
                    x2={toSvgX(currentProblem.point.x)}
                    y2={toSvgY(currentProblem.point.y)}
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                </g>
              )}
            </svg>
          </div>
        )}

        {/* Hint button for read problems */}
        {currentProblem.type === 'read' && !showFeedback && (
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-lg transition-all"
            >
              <Eye size={16} />
              <span>{showHint ? 'Ocultar pista' : 'Ver pista'}</span>
            </button>
          </div>
        )}

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {currentProblem.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrectOption = idx === currentProblem.correctIndex;

            return (
              <button
                key={idx}
                onClick={() => !showFeedback && setSelectedAnswer(idx)}
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
                    ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                    : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
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
                {currentProblem.explanation}
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
            <span>
              {currentIndex < PROBLEMS.length - 1 ? 'Siguiente problema' : 'Ver resultado'}
            </span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
