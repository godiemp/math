'use client';

import { Check, X, Eye, ArrowRight } from 'lucide-react';
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

type ProblemType = 'coordinate' | 'segment' | 'area' | 'find-k';

interface Problem {
  id: string;
  type: ProblemType;
  question: string;
  givenData?: {
    original?: { x: number; y: number };
    center?: { x: number; y: number };
    k?: number;
    segmentLength?: number;
    area?: number;
  };
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    type: 'coordinate',
    question: 'Si A(4, 6) se transforma con centro O(0, 0) y k = 2, ¿cuáles son las coordenadas de A\'?',
    givenData: {
      original: { x: 4, y: 6 },
      center: { x: 0, y: 0 },
      k: 2,
    },
    options: ['(2, 3)', '(8, 12)', '(6, 8)', '(4, 6)'],
    correctIndex: 1,
    explanation: 'A\' = O + k(A - O) = (0,0) + 2((4,6) - (0,0)) = 2(4, 6) = (8, 12)',
    hint: 'Multiplica cada coordenada del punto por k.',
  },
  {
    id: 'p2',
    type: 'segment',
    question: 'Un segmento de 8 cm se transforma con k = 0.5. ¿Cuánto mide el segmento imagen?',
    givenData: {
      segmentLength: 8,
      k: 0.5,
    },
    options: ['4 cm', '16 cm', '8 cm', '2 cm'],
    correctIndex: 0,
    explanation: 'Segmento imagen = segmento original × |k| = 8 × 0.5 = 4 cm',
    hint: 'Las longitudes se multiplican por |k|.',
  },
  {
    id: 'p3',
    type: 'area',
    question: 'Una figura de área 12 cm² se transforma con k = 3. ¿Cuál es el área de la imagen?',
    givenData: {
      area: 12,
      k: 3,
    },
    options: ['36 cm²', '4 cm²', '108 cm²', '24 cm²'],
    correctIndex: 2,
    explanation: 'Área imagen = área original × k² = 12 × 3² = 12 × 9 = 108 cm²',
    hint: 'Las áreas se multiplican por k² (k al cuadrado).',
  },
  {
    id: 'p4',
    type: 'coordinate',
    question: 'Si P(3, 5) se transforma con centro O(1, 1) y k = 1.5, ¿cuáles son las coordenadas de P\'?',
    givenData: {
      original: { x: 3, y: 5 },
      center: { x: 1, y: 1 },
      k: 1.5,
    },
    options: ['(4, 7)', '(4.5, 7.5)', '(3.5, 6.5)', '(2, 4)'],
    correctIndex: 0,
    explanation: 'P\' = O + k(P - O) = (1,1) + 1.5((3,5) - (1,1)) = (1,1) + 1.5(2,4) = (1,1) + (3,6) = (4, 7)',
    hint: 'P\' = O + k × (P - O). Resta primero, multiplica por k, y suma O.',
  },
  {
    id: 'p5',
    type: 'find-k',
    question: 'Si una imagen es "3 veces más grande" que la original, ¿cuál es la razón k?',
    givenData: {
      k: 3,
    },
    options: ['k = 3', 'k = 1/3', 'k = 9', 'k = -3'],
    correctIndex: 0,
    explanation: '"3 veces más grande" significa que cada distancia se multiplica por 3, entonces k = 3.',
    hint: 'La razón k indica cuántas veces se multiplican las distancias.',
  },
];

const REQUIRED_CORRECT = 4;

// Helper to convert coordinates to SVG position
const toSvgX = (x: number, scale: number = 15) => 100 + x * scale;
const toSvgY = (y: number, scale: number = 15) => 100 - y * scale;

// SVG visualization for coordinate problems
function CoordinateVisualization({ problem, showHint }: { problem: Problem; showHint: boolean }) {
  const { original, center, k } = problem.givenData || {};
  if (!original || !center || k === undefined) return null;

  // Calculate image point
  const imageX = center.x + k * (original.x - center.x);
  const imageY = center.y + k * (original.y - center.y);

  const scale = 12;

  return (
    <div className="flex justify-center mb-4">
      <svg viewBox="0 0 200 200" className="w-56 h-56">
        {/* Grid */}
        {[-6, -4, -2, 0, 2, 4, 6, 8, 10, 12].map((i) => (
          <g key={`grid-${i}`}>
            <line
              x1={toSvgX(i, scale)}
              y1={20}
              x2={toSvgX(i, scale)}
              y2={180}
              className="stroke-gray-200 dark:stroke-gray-700"
              strokeWidth="0.5"
            />
            <line
              x1={20}
              y1={toSvgY(i, scale)}
              x2={180}
              y2={toSvgY(i, scale)}
              className="stroke-gray-200 dark:stroke-gray-700"
              strokeWidth="0.5"
            />
          </g>
        ))}

        {/* Axes */}
        <line x1="20" y1={toSvgY(0, scale)} x2="180" y2={toSvgY(0, scale)} stroke="#6b7280" strokeWidth="1.5" />
        <line x1={toSvgX(0, scale)} y1="180" x2={toSvgX(0, scale)} y2="20" stroke="#6b7280" strokeWidth="1.5" />

        {/* Center point O */}
        <circle cx={toSvgX(center.x, scale)} cy={toSvgY(center.y, scale)} r="6" fill="#dc2626" />
        <text
          x={toSvgX(center.x, scale) - 12}
          y={toSvgY(center.y, scale) + 4}
          fontSize="11"
          fontWeight="bold"
          fill="#dc2626"
        >
          O
        </text>

        {/* Dashed line from center through both points */}
        <line
          x1={toSvgX(center.x, scale)}
          y1={toSvgY(center.y, scale)}
          x2={toSvgX(imageX, scale)}
          y2={toSvgY(imageY, scale)}
          stroke="#9ca3af"
          strokeWidth="1"
          strokeDasharray="4,4"
        />

        {/* Original point */}
        <circle cx={toSvgX(original.x, scale)} cy={toSvgY(original.y, scale)} r="7" fill="#1d4ed8" />
        <text
          x={toSvgX(original.x, scale) + 10}
          y={toSvgY(original.y, scale) - 6}
          fontSize="10"
          fontWeight="bold"
          fill="#1d4ed8"
        >
          {problem.id === 'p1' ? 'A' : 'P'}({original.x},{original.y})
        </text>

        {/* Image point (only when showing hint) */}
        {showHint && (
          <>
            <circle cx={toSvgX(imageX, scale)} cy={toSvgY(imageY, scale)} r="7" fill="#16a34a" />
            <text
              x={toSvgX(imageX, scale) + 10}
              y={toSvgY(imageY, scale) - 6}
              fontSize="10"
              fontWeight="bold"
              fill="#16a34a"
            >
              {problem.id === 'p1' ? 'A\'' : 'P\''}
            </text>
          </>
        )}

        {/* k label */}
        <text
          x={100}
          y={190}
          textAnchor="middle"
          fontSize="11"
          className="fill-gray-600 dark:fill-gray-400"
        >
          k = {k}
        </text>
      </svg>
    </div>
  );
}

// SVG visualization for segment problems
function SegmentVisualization({ problem, showHint }: { problem: Problem; showHint: boolean }) {
  const { segmentLength, k } = problem.givenData || {};
  if (!segmentLength || k === undefined) return null;

  const resultLength = segmentLength * Math.abs(k);

  return (
    <div className="flex justify-center mb-4">
      <svg viewBox="0 0 200 100" className="w-64 h-32">
        {/* Original segment */}
        <g>
          <line x1="20" y1="35" x2="100" y2="35" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
          <text x="60" y="25" textAnchor="middle" fontSize="11" fill="#1d4ed8" fontWeight="bold">
            {segmentLength} cm
          </text>
          <text x="60" y="50" textAnchor="middle" fontSize="9" className="fill-gray-500">
            Original
          </text>
        </g>

        {/* Arrow */}
        <g>
          <line x1="110" y1="35" x2="130" y2="35" stroke="#9ca3af" strokeWidth="2" />
          <polygon points="135,35 128,30 128,40" fill="#9ca3af" />
          <text x="122" y="55" textAnchor="middle" fontSize="9" className="fill-gray-500">
            k = {k}
          </text>
        </g>

        {/* Image segment (shown with hint or always smaller if k < 1) */}
        <g>
          <line
            x1="145"
            y1="35"
            x2={145 + (showHint ? resultLength * 5 : segmentLength * 5 * Math.abs(k))}
            y2="35"
            stroke="#16a34a"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <text
            x={145 + (resultLength * 5) / 2}
            y="25"
            textAnchor="middle"
            fontSize="11"
            fill="#16a34a"
            fontWeight="bold"
          >
            {showHint ? `${resultLength} cm` : '?'}
          </text>
          <text x={145 + (resultLength * 5) / 2} y="50" textAnchor="middle" fontSize="9" className="fill-gray-500">
            Imagen
          </text>
        </g>
      </svg>
    </div>
  );
}

// SVG visualization for area problems
function AreaVisualization({ problem, showHint }: { problem: Problem; showHint: boolean }) {
  const { area, k } = problem.givenData || {};
  if (!area || k === undefined) return null;

  const resultArea = area * k * k;

  return (
    <div className="flex justify-center mb-4">
      <svg viewBox="0 0 240 100" className="w-72 h-28">
        {/* Original square */}
        <g>
          <rect x="20" y="25" width="40" height="40" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" rx="2" />
          <text x="40" y="78" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="bold">
            {area} cm²
          </text>
        </g>

        {/* Arrow */}
        <g>
          <line x1="70" y1="45" x2="90" y2="45" stroke="#9ca3af" strokeWidth="2" />
          <polygon points="95,45 88,40 88,50" fill="#9ca3af" />
          <text x="82" y="65" textAnchor="middle" fontSize="9" className="fill-gray-500">
            k = {k}
          </text>
        </g>

        {/* Image square (larger) */}
        <g>
          <rect x="105" y="5" width="80" height="80" fill="#bbf7d0" fillOpacity="0.7" stroke="#16a34a" strokeWidth="2" rx="2" />
          <text x="145" y={showHint ? 50 : 50} textAnchor="middle" fontSize="11" fill="#16a34a" fontWeight="bold">
            {showHint ? `${resultArea} cm²` : '?'}
          </text>
        </g>

        {/* Formula hint */}
        {showHint && (
          <text x="145" y="95" textAnchor="middle" fontSize="9" className="fill-gray-500">
            Área × k² = {area} × {k}² = {resultArea}
          </text>
        )}
      </svg>
    </div>
  );
}

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
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
          Practica Cálculos
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

            {/* Visual based on problem type */}
            {mc.currentItem.type === 'coordinate' && (
              <CoordinateVisualization problem={mc.currentItem} showHint={hint.showHint} />
            )}
            {mc.currentItem.type === 'segment' && (
              <SegmentVisualization problem={mc.currentItem} showHint={hint.showHint} />
            )}
            {mc.currentItem.type === 'area' && (
              <AreaVisualization problem={mc.currentItem} showHint={hint.showHint} />
            )}

            {/* Hint button */}
            {!mc.showFeedback && (
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

            {/* Text hint when shown */}
            {hint.showHint && !mc.showFeedback && (
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 mb-4 text-center">
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  💡 {mc.currentItem.hint}
                </p>
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
          successMessage="¡Excelente!"
          successSubtext="Dominas los cálculos de homotecia"
          failureSubtext="Recuerda: longitudes × |k|, áreas × k²"
          items={PROBLEMS}
          getIsCorrect={(_, i) => mc.answers[i] === PROBLEMS[i].correctIndex}
          renderItem={(problem, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300 text-sm flex-1">
                {problem.type === 'coordinate' ? 'Coordenadas' :
                 problem.type === 'segment' ? 'Segmento' :
                 problem.type === 'area' ? 'Área' : 'Razón k'}
              </span>
              <span className="font-mono text-sm text-purple-600 dark:text-purple-400">
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
