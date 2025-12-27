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

type ProblemType = 'segment' | 'area' | 'perimeter' | 'find-k';

interface Problem {
  id: string;
  type: ProblemType;
  question: string;
  givenData?: {
    k?: number;
    segmentLength?: number;
    area?: number;
    perimeter?: number;
  };
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    type: 'segment',
    question: 'Un lado de un triángulo mide 6 cm. Si se aplica una homotecia con k = 2, ¿cuánto mide el lado imagen?',
    givenData: {
      segmentLength: 6,
      k: 2,
    },
    options: ['3 cm', '8 cm', '12 cm', '36 cm'],
    correctIndex: 2,
    explanation: 'Lado imagen = lado original × |k| = 6 × 2 = 12 cm',
    hint: 'Las longitudes se multiplican por |k|.',
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
    type: 'perimeter',
    question: 'Un cuadrado tiene perímetro de 20 cm. Si se aplica k = 0.5, ¿cuál es el perímetro de la imagen?',
    givenData: {
      perimeter: 20,
      k: 0.5,
    },
    options: ['40 cm', '10 cm', '5 cm', '100 cm'],
    correctIndex: 1,
    explanation: 'Perímetro imagen = perímetro original × |k| = 20 × 0.5 = 10 cm',
    hint: 'El perímetro (suma de lados) también se multiplica por |k|.',
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

// SVG visualization for perimeter problems
function PerimeterVisualization({ problem, showHint }: { problem: Problem; showHint: boolean }) {
  const { perimeter, k } = problem.givenData || {};
  if (!perimeter || k === undefined) return null;

  const resultPerimeter = perimeter * Math.abs(k);
  const sideOriginal = perimeter / 4; // Assuming square
  const sideImage = sideOriginal * Math.abs(k);

  return (
    <div className="flex justify-center mb-4">
      <svg viewBox="0 0 240 100" className="w-72 h-28">
        {/* Original square */}
        <g>
          <rect x="25" y="20" width="45" height="45" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" rx="2" />
          <text x="47" y="50" textAnchor="middle" fontSize="9" fill="#1d4ed8" fontWeight="bold">
            P = {perimeter} cm
          </text>
        </g>

        {/* Arrow */}
        <g>
          <line x1="80" y1="42" x2="100" y2="42" stroke="#9ca3af" strokeWidth="2" />
          <polygon points="105,42 98,37 98,47" fill="#9ca3af" />
          <text x="92" y="62" textAnchor="middle" fontSize="9" className="fill-gray-500">
            k = {k}
          </text>
        </g>

        {/* Image square (smaller) */}
        <g>
          <rect x="120" y="30" width="25" height="25" fill="#bbf7d0" fillOpacity="0.7" stroke="#16a34a" strokeWidth="2" rx="2" />
          <text x="132" y="47" textAnchor="middle" fontSize="9" fill="#16a34a" fontWeight="bold">
            {showHint ? `P = ${resultPerimeter} cm` : 'P = ?'}
          </text>
        </g>

        {/* Formula hint */}
        {showHint && (
          <text x="132" y="75" textAnchor="middle" fontSize="8" className="fill-gray-500">
            {perimeter} × {k} = {resultPerimeter}
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
            {mc.currentItem.type === 'segment' && (
              <SegmentVisualization problem={mc.currentItem} showHint={hint.showHint} />
            )}
            {mc.currentItem.type === 'area' && (
              <AreaVisualization problem={mc.currentItem} showHint={hint.showHint} />
            )}
            {mc.currentItem.type === 'perimeter' && (
              <PerimeterVisualization problem={mc.currentItem} showHint={hint.showHint} />
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
                {problem.type === 'segment' ? 'Segmento' :
                 problem.type === 'area' ? 'Área' :
                 problem.type === 'perimeter' ? 'Perímetro' : 'Razón k'}
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
