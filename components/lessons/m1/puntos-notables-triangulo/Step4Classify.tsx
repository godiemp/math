'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

type NotablePoint = 'circuncentro' | 'incentro' | 'baricentro' | 'ortocentro';

interface ClassifyQuestion {
  id: string;
  figure: React.ReactNode;
  description: string;
  correctAnswer: NotablePoint;
  explanation: string;
}

const OPTIONS: { id: NotablePoint; label: string; color: string }[] = [
  { id: 'circuncentro', label: 'Circuncentro', color: 'purple' },
  { id: 'incentro', label: 'Incentro', color: 'amber' },
  { id: 'baricentro', label: 'Baricentro', color: 'emerald' },
  { id: 'ortocentro', label: 'Ortocentro', color: 'red' },
];

// Triangle vertices for SVG figures
const TRI = { A: { x: 150, y: 30 }, B: { x: 50, y: 220 }, C: { x: 250, y: 220 } };
const TRI2 = { A: { x: 80, y: 30 }, B: { x: 30, y: 200 }, C: { x: 270, y: 180 } }; // Obtuse

// Calculate midpoints
const midAB = { x: (TRI.A.x + TRI.B.x) / 2, y: (TRI.A.y + TRI.B.y) / 2 };
const midBC = { x: (TRI.B.x + TRI.C.x) / 2, y: (TRI.B.y + TRI.C.y) / 2 };
const midAC = { x: (TRI.A.x + TRI.C.x) / 2, y: (TRI.A.y + TRI.C.y) / 2 };

// Perpendicular bisector directions (rotate side by 90°)
const perpAB = { dx: -(TRI.B.y - TRI.A.y) / 5, dy: (TRI.B.x - TRI.A.x) / 5 };
const perpBC = { dx: -(TRI.C.y - TRI.B.y) / 5, dy: (TRI.C.x - TRI.B.x) / 5 };
const perpAC = { dx: -(TRI.C.y - TRI.A.y) / 5, dy: (TRI.C.x - TRI.A.x) / 5 };

// Circuncentro (approx)
const circuncentro = { x: 150, y: 115 };
const incentro = { x: 140, y: 150 };
const baricentro = { x: 150, y: 157 };
const ortocentro = { x: 150, y: 80 };

const QUESTIONS: ClassifyQuestion[] = [
  {
    id: 'q1',
    description: '¿Qué punto notable se muestra?',
    figure: (
      <svg viewBox="0 0 300 250" className="w-full h-full">
        {/* Triangle */}
        <polygon
          points={`${TRI.A.x},${TRI.A.y} ${TRI.B.x},${TRI.B.y} ${TRI.C.x},${TRI.C.y}`}
          fill="rgb(243, 244, 246)"
          stroke="rgb(75, 85, 99)"
          strokeWidth="2"
          className="dark:fill-gray-700"
        />
        {/* Simetrales (perpendicular bisectors) */}
        <line
          x1={midAB.x - perpAB.dx * 4}
          y1={midAB.y - perpAB.dy * 4}
          x2={midAB.x + perpAB.dx * 4}
          y2={midAB.y + perpAB.dy * 4}
          stroke="rgb(147, 51, 234)"
          strokeWidth="2"
          strokeDasharray="6,3"
        />
        <line
          x1={midBC.x - perpBC.dx * 4}
          y1={midBC.y - perpBC.dy * 4}
          x2={midBC.x + perpBC.dx * 4}
          y2={midBC.y + perpBC.dy * 4}
          stroke="rgb(147, 51, 234)"
          strokeWidth="2"
          strokeDasharray="6,3"
        />
        <line
          x1={midAC.x - perpAC.dx * 3}
          y1={midAC.y - perpAC.dy * 3}
          x2={midAC.x + perpAC.dx * 3}
          y2={midAC.y + perpAC.dy * 3}
          stroke="rgb(147, 51, 234)"
          strokeWidth="2"
          strokeDasharray="6,3"
        />
        {/* Midpoint markers */}
        <circle cx={midAB.x} cy={midAB.y} r="4" fill="rgb(147, 51, 234)" />
        <circle cx={midBC.x} cy={midBC.y} r="4" fill="rgb(147, 51, 234)" />
        <circle cx={midAC.x} cy={midAC.y} r="4" fill="rgb(147, 51, 234)" />
        {/* Point */}
        <circle cx={circuncentro.x} cy={circuncentro.y} r="8" fill="rgb(147, 51, 234)" stroke="white" strokeWidth="2" />
        <text x={circuncentro.x + 15} y={circuncentro.y + 5} fontSize="14" fill="rgb(147, 51, 234)" fontWeight="bold">?</text>
      </svg>
    ),
    correctAnswer: 'circuncentro',
    explanation: 'Las simetrales (perpendiculares por el punto medio de cada lado) se cruzan en el circuncentro.',
  },
  {
    id: 'q2',
    description: '¿Qué punto notable se muestra?',
    figure: (
      <svg viewBox="0 0 300 250" className="w-full h-full">
        {/* Triangle */}
        <polygon
          points={`${TRI.A.x},${TRI.A.y} ${TRI.B.x},${TRI.B.y} ${TRI.C.x},${TRI.C.y}`}
          fill="rgb(243, 244, 246)"
          stroke="rgb(75, 85, 99)"
          strokeWidth="2"
          className="dark:fill-gray-700"
        />
        {/* Medianas */}
        <line x1={TRI.A.x} y1={TRI.A.y} x2={midBC.x} y2={midBC.y} stroke="rgb(16, 185, 129)" strokeWidth="2" />
        <line x1={TRI.B.x} y1={TRI.B.y} x2={midAC.x} y2={midAC.y} stroke="rgb(16, 185, 129)" strokeWidth="2" />
        <line x1={TRI.C.x} y1={TRI.C.y} x2={midAB.x} y2={midAB.y} stroke="rgb(16, 185, 129)" strokeWidth="2" />
        {/* Midpoint markers */}
        <circle cx={midAB.x} cy={midAB.y} r="4" fill="rgb(16, 185, 129)" />
        <circle cx={midBC.x} cy={midBC.y} r="4" fill="rgb(16, 185, 129)" />
        <circle cx={midAC.x} cy={midAC.y} r="4" fill="rgb(16, 185, 129)" />
        {/* Point */}
        <circle cx={baricentro.x} cy={baricentro.y} r="8" fill="rgb(16, 185, 129)" stroke="white" strokeWidth="2" />
        <text x={baricentro.x + 15} y={baricentro.y + 5} fontSize="14" fill="rgb(16, 185, 129)" fontWeight="bold">?</text>
      </svg>
    ),
    correctAnswer: 'baricentro',
    explanation: 'Las medianas (líneas desde cada vértice al punto medio del lado opuesto) se cruzan en el baricentro.',
  },
  {
    id: 'q3',
    description: '¿Qué punto notable se muestra?',
    figure: (
      <svg viewBox="0 0 300 250" className="w-full h-full">
        {/* Triangle */}
        <polygon
          points={`${TRI.A.x},${TRI.A.y} ${TRI.B.x},${TRI.B.y} ${TRI.C.x},${TRI.C.y}`}
          fill="rgb(243, 244, 246)"
          stroke="rgb(75, 85, 99)"
          strokeWidth="2"
          className="dark:fill-gray-700"
        />
        {/* Bisectrices (angle bisectors) - approximated */}
        <line x1={TRI.A.x} y1={TRI.A.y} x2={incentro.x} y2={220} stroke="rgb(245, 158, 11)" strokeWidth="2" />
        <line x1={TRI.B.x} y1={TRI.B.y} x2={220} y2={incentro.y} stroke="rgb(245, 158, 11)" strokeWidth="2" />
        <line x1={TRI.C.x} y1={TRI.C.y} x2={80} y2={incentro.y} stroke="rgb(245, 158, 11)" strokeWidth="2" />
        {/* Angle arc markers */}
        <path d={`M ${TRI.A.x - 10} ${TRI.A.y + 15} A 15 15 0 0 1 ${TRI.A.x + 10} ${TRI.A.y + 15}`} fill="none" stroke="rgb(245, 158, 11)" strokeWidth="1.5" />
        {/* Point */}
        <circle cx={incentro.x} cy={incentro.y} r="8" fill="rgb(245, 158, 11)" stroke="white" strokeWidth="2" />
        <text x={incentro.x + 15} y={incentro.y + 5} fontSize="14" fill="rgb(245, 158, 11)" fontWeight="bold">?</text>
      </svg>
    ),
    correctAnswer: 'incentro',
    explanation: 'Las bisectrices (líneas que dividen cada ángulo en dos partes iguales) se cruzan en el incentro.',
  },
  {
    id: 'q4',
    description: '¿Qué punto notable se muestra?',
    figure: (
      <svg viewBox="0 0 300 250" className="w-full h-full">
        {/* Triangle */}
        <polygon
          points={`${TRI.A.x},${TRI.A.y} ${TRI.B.x},${TRI.B.y} ${TRI.C.x},${TRI.C.y}`}
          fill="rgb(243, 244, 246)"
          stroke="rgb(75, 85, 99)"
          strokeWidth="2"
          className="dark:fill-gray-700"
        />
        {/* Alturas (heights) */}
        <line x1={TRI.A.x} y1={TRI.A.y} x2={TRI.A.x} y2={220} stroke="rgb(239, 68, 68)" strokeWidth="2" />
        <line x1={TRI.B.x} y1={TRI.B.y} x2={105} y2={95} stroke="rgb(239, 68, 68)" strokeWidth="2" />
        <line x1={TRI.C.x} y1={TRI.C.y} x2={195} y2={95} stroke="rgb(239, 68, 68)" strokeWidth="2" />
        {/* Right angle markers */}
        <rect x={TRI.A.x} y={212} width="8" height="8" fill="none" stroke="rgb(239, 68, 68)" strokeWidth="1.5" />
        {/* Point */}
        <circle cx={ortocentro.x} cy={ortocentro.y} r="8" fill="rgb(239, 68, 68)" stroke="white" strokeWidth="2" />
        <text x={ortocentro.x + 15} y={ortocentro.y + 5} fontSize="14" fill="rgb(239, 68, 68)" fontWeight="bold">?</text>
      </svg>
    ),
    correctAnswer: 'ortocentro',
    explanation: 'Las alturas (perpendiculares desde cada vértice al lado opuesto) se cruzan en el ortocentro.',
  },
  {
    id: 'q5',
    description: 'El punto está equidistante de los 3 vértices. ¿Cuál es?',
    figure: (
      <svg viewBox="0 0 300 250" className="w-full h-full">
        {/* Triangle */}
        <polygon
          points={`${TRI.A.x},${TRI.A.y} ${TRI.B.x},${TRI.B.y} ${TRI.C.x},${TRI.C.y}`}
          fill="rgb(243, 244, 246)"
          stroke="rgb(75, 85, 99)"
          strokeWidth="2"
          className="dark:fill-gray-700"
        />
        {/* Equal distance lines */}
        <line x1={circuncentro.x} y1={circuncentro.y} x2={TRI.A.x} y2={TRI.A.y} stroke="rgb(147, 51, 234)" strokeWidth="2" strokeDasharray="4,4" />
        <line x1={circuncentro.x} y1={circuncentro.y} x2={TRI.B.x} y2={TRI.B.y} stroke="rgb(147, 51, 234)" strokeWidth="2" strokeDasharray="4,4" />
        <line x1={circuncentro.x} y1={circuncentro.y} x2={TRI.C.x} y2={TRI.C.y} stroke="rgb(147, 51, 234)" strokeWidth="2" strokeDasharray="4,4" />
        {/* Equal markers */}
        <text x={110} y={65} fontSize="12" fill="rgb(147, 51, 234)" fontWeight="bold">=</text>
        <text x={85} y={165} fontSize="12" fill="rgb(147, 51, 234)" fontWeight="bold">=</text>
        <text x={210} y={165} fontSize="12" fill="rgb(147, 51, 234)" fontWeight="bold">=</text>
        {/* Point */}
        <circle cx={circuncentro.x} cy={circuncentro.y} r="8" fill="rgb(147, 51, 234)" stroke="white" strokeWidth="2" />
        <text x={circuncentro.x + 15} y={circuncentro.y + 5} fontSize="14" fill="rgb(147, 51, 234)" fontWeight="bold">?</text>
      </svg>
    ),
    correctAnswer: 'circuncentro',
    explanation: 'El circuncentro está equidistante de los 3 vértices. Es el centro del círculo circunscrito.',
  },
  {
    id: 'q6',
    description: 'El punto está equidistante de los 3 lados. ¿Cuál es?',
    figure: (
      <svg viewBox="0 0 300 250" className="w-full h-full">
        {/* Triangle */}
        <polygon
          points={`${TRI.A.x},${TRI.A.y} ${TRI.B.x},${TRI.B.y} ${TRI.C.x},${TRI.C.y}`}
          fill="rgb(243, 244, 246)"
          stroke="rgb(75, 85, 99)"
          strokeWidth="2"
          className="dark:fill-gray-700"
        />
        {/* Perpendicular distances to each side */}
        <line x1={incentro.x} y1={incentro.y} x2={incentro.x} y2={220} stroke="rgb(245, 158, 11)" strokeWidth="2" strokeDasharray="4,4" />
        <line x1={incentro.x} y1={incentro.y} x2={88} y2={137} stroke="rgb(245, 158, 11)" strokeWidth="2" strokeDasharray="4,4" />
        <line x1={incentro.x} y1={incentro.y} x2={192} y2={137} stroke="rgb(245, 158, 11)" strokeWidth="2" strokeDasharray="4,4" />
        {/* Equal markers */}
        <text x={incentro.x + 5} y={185} fontSize="12" fill="rgb(245, 158, 11)" fontWeight="bold">=</text>
        <text x={105} y={145} fontSize="12" fill="rgb(245, 158, 11)" fontWeight="bold">=</text>
        <text x={168} y={145} fontSize="12" fill="rgb(245, 158, 11)" fontWeight="bold">=</text>
        {/* Point */}
        <circle cx={incentro.x} cy={incentro.y} r="8" fill="rgb(245, 158, 11)" stroke="white" strokeWidth="2" />
        <text x={incentro.x + 15} y={incentro.y + 5} fontSize="14" fill="rgb(245, 158, 11)" fontWeight="bold">?</text>
      </svg>
    ),
    correctAnswer: 'incentro',
    explanation: 'El incentro está equidistante de los 3 lados. Es el centro del círculo inscrito.',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 5,
  });

  if (!isActive) return null;

  const getOptionStyles = (optionId: NotablePoint) => {
    const option = OPTIONS.find(o => o.id === optionId)!;
    const isSelected = mc.selectedAnswer === optionId;
    const isCorrectAnswer = mc.currentItem.correctAnswer === optionId;

    if (isSelected) {
      if (mc.showFeedback) {
        return isCorrectAnswer
          ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
          : 'bg-red-100 dark:bg-red-900/50 border-red-500';
      }
      return option.color === 'purple'
        ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500'
        : option.color === 'amber'
          ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-500'
          : option.color === 'emerald'
            ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-500'
            : 'bg-red-100 dark:bg-red-900/50 border-red-500';
    }

    if (mc.showFeedback && isCorrectAnswer) {
      return 'bg-green-50 dark:bg-green-900/30 border-green-400';
    }

    return 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-500';
  };

  const getDotStyles = (optionId: NotablePoint) => {
    const option = OPTIONS.find(o => o.id === optionId)!;
    const isSelected = mc.selectedAnswer === optionId;
    const isCorrectAnswer = mc.currentItem.correctAnswer === optionId;

    if (isSelected && mc.showFeedback) {
      return isCorrectAnswer ? 'bg-green-500' : 'bg-red-500';
    }
    if (mc.showFeedback && isCorrectAnswer) {
      return 'bg-green-500';
    }

    return option.color === 'purple'
      ? 'bg-purple-500'
      : option.color === 'amber'
        ? 'bg-amber-500'
        : option.color === 'emerald'
          ? 'bg-emerald-500'
          : 'bg-red-500';
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica el Punto
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Observa las líneas y reconoce el punto notable
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Pregunta {mc.currentIndex + 1} de {QUESTIONS.length}
            </div>
            <ProgressDots
              items={QUESTIONS}
              currentIndex={mc.currentIndex}
              getStatus={(_, i) =>
                mc.answers[i] !== null
                  ? mc.answers[i] === QUESTIONS[i].correctAnswer
                    ? 'correct'
                    : 'incorrect'
                  : i === mc.currentIndex
                    ? 'current'
                    : 'pending'
              }
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-gray-700 dark:text-gray-300 text-center mb-4 font-medium">
              {mc.currentItem.description}
            </p>

            <div className="flex justify-center mb-6">
              <div className="w-64 h-52 bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                {mc.currentItem.figure}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => mc.select(option.id)}
                  disabled={mc.showFeedback}
                  className={cn(
                    'p-3 rounded-xl transition-all border-2 flex items-center gap-3',
                    getOptionStyles(option.id)
                  )}
                >
                  <div className={cn('w-4 h-4 rounded-full flex-shrink-0', getDotStyles(option.id))} />
                  <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            {mc.showFeedback && (
              <FeedbackPanel
                isCorrect={mc.isCorrect}
                explanation={mc.currentItem.explanation}
                className="mt-6"
              />
            )}
          </div>

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? mc.next : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < QUESTIONS.length - 1
                  ? 'Siguiente'
                  : 'Ver resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={QUESTIONS.length}
          passed={mc.passed}
          passThreshold={5}
          successMessage="¡Excelente!"
          successSubtext="Reconoces bien los puntos notables"
          failureSubtext={`Necesitas 5 correctas. ¡Inténtalo de nuevo!`}
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === QUESTIONS[i].correctAnswer}
          renderItem={(_, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300">Pregunta {i + 1}</span>
            </>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
        />
      )}
    </div>
  );
}
