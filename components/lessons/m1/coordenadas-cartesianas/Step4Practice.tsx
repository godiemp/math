'use client';

import { Check, X, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice, useHintToggle } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  OptionButton,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';
import { colors } from '@/lib/lessons/styles';

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

// Helper to convert coordinates to SVG position
const toSvgX = (x: number) => 100 + x * 15;
const toSvgY = (y: number) => 100 - y * 15;

// Get point label based on problem id
function getPointLabel(problemId: string): string {
  const labels: Record<string, string> = { p1: 'P', p3: 'Q', p5: 'R', p8: 'S' };
  return labels[problemId] || '';
}

// Coordinate grid visualization component
function CoordinateGrid({ problem, showHint }: { problem: Problem; showHint: boolean }) {
  if (!problem.point) return null;

  return (
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
          cx={toSvgX(problem.point.x)}
          cy={toSvgY(problem.point.y)}
          r="8"
          fill="#8b5cf6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
        <motion.circle
          cx={toSvgX(problem.point.x)}
          cy={toSvgY(problem.point.y)}
          r="14"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <text
          x={toSvgX(problem.point.x) + 12}
          y={toSvgY(problem.point.y) - 8}
          fontSize="12"
          fontWeight="bold"
          fill="#8b5cf6"
        >
          {getPointLabel(problem.id)}
        </text>

        {/* Hint lines when showing hint */}
        {showHint && (
          <g>
            <line
              x1={toSvgX(0)}
              y1={toSvgY(problem.point.y)}
              x2={toSvgX(problem.point.x)}
              y2={toSvgY(problem.point.y)}
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <line
              x1={toSvgX(problem.point.x)}
              y1={toSvgY(0)}
              x2={toSvgX(problem.point.x)}
              y2={toSvgY(problem.point.y)}
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: PROBLEMS,
    getCorrectAnswer: (item) => item.correctIndex,
    passThreshold: REQUIRED_CORRECT,
  });

  const hint = useHintToggle();

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Practica Coordenadas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Problema {mc.currentIndex + 1} de {PROBLEMS.length}
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={PROBLEMS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === PROBLEMS[i].correctIndex
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Score tracker */}
          <div className="flex justify-center">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-1 text-sm">
              <span className="text-green-600 dark:text-green-400 font-bold">{mc.correctCount}</span>
              <span className="text-gray-500 dark:text-gray-400"> correctas</span>
            </div>
          </div>

          {/* Problem area */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg">
            {/* Question */}
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-center mb-4">
              {mc.currentItem.question}
            </p>

            {/* Visual for 'read' type problems */}
            {mc.currentItem.type === 'read' && mc.currentItem.point && (
              <CoordinateGrid problem={mc.currentItem} showHint={hint.showHint} />
            )}

            {/* Hint button for read problems */}
            {mc.currentItem.type === 'read' && !mc.showFeedback && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={hint.toggleHint}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all',
                    colors.hint.container,
                    colors.hint.text
                  )}
                >
                  <Eye size={16} className={colors.hint.icon} />
                  <span>{hint.showHint ? 'Ocultar pista' : 'Ver pista'}</span>
                </button>
              </div>
            )}

            {/* Answer options */}
            <div className="grid grid-cols-2 gap-3">
              {mc.currentItem.options.map((option, idx) => (
                <OptionButton
                  key={idx}
                  label={option}
                  index={idx}
                  isSelected={mc.selectedAnswer === idx}
                  isCorrect={idx === mc.currentItem.correctIndex}
                  showFeedback={mc.showFeedback}
                  onClick={() => mc.select(idx)}
                />
              ))}
            </div>
          </div>

          {mc.showFeedback && (
            <FeedbackPanel isCorrect={mc.isCorrect} explanation={mc.currentItem.explanation} />
          )}

          <div className="flex justify-center">
            <ActionButton
              onClick={() => {
                if (mc.showFeedback) {
                  hint.hideHint();
                  mc.next();
                } else {
                  mc.check();
                }
              }}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < PROBLEMS.length - 1
                  ? 'Siguiente problema'
                  : 'Ver resultado'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={PROBLEMS.length}
          passed={mc.passed}
          passThreshold={REQUIRED_CORRECT}
          successMessage="¡Muy bien!"
          successSubtext="Estás listo para el checkpoint final"
          failureSubtext="Recuerda: (x, y) = primero horizontal, luego vertical"
          items={PROBLEMS}
          getIsCorrect={(_, i) => mc.answers[i] === PROBLEMS[i].correctIndex}
          renderItem={(problem, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300">{problem.question}</span>
              <span className="font-mono text-sm text-purple-600 ml-auto">
                {problem.options[problem.correctIndex]}
              </span>
            </>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
        />
      )}
    </div>
  );
}
