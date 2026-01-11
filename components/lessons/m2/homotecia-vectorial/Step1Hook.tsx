'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, ZoomIn, Target } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import {
  ScenarioCard,
  QuestionPrompt,
  OptionGrid,
  OptionButton,
  ActionButton,
  FeedbackPanel,
  InsightCard,
} from '@/components/lessons/primitives';

type Phase = 'scenario' | 'question' | 'result';

const OPTIONS = [
  'P′ = (1, 2)',
  'P′ = (2, 4)',
  'P′ = (3, 4)',
  'P′ = (0.5, 1)',
];

const CORRECT_ANSWER = 1; // k=2 means (1,2) → (2,4)

// SVG coordinate helpers (scale: 1 unit = 25px, origin at (50, 200))
const SCALE = 25;
const ORIGIN_X = 50;
const ORIGIN_Y = 175;
const toSvgX = (x: number) => ORIGIN_X + x * SCALE;
const toSvgY = (y: number) => ORIGIN_Y - y * SCALE;

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const isCorrect = selectedAnswer === CORRECT_ANSWER;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    setTimeout(() => setPhase('result'), 1500);
  };

  if (!isActive) return null;

  // Triangle vertices (original)
  const triangleOriginal = [
    { x: 1, y: 2, label: 'P' },
    { x: 3, y: 1, label: 'Q' },
    { x: 2, y: 3, label: 'R' },
  ];

  // Triangle vertices (scaled by k=2)
  const triangleScaled = triangleOriginal.map(p => ({
    x: p.x * 2,
    y: p.y * 2,
    label: p.label + '′',
  }));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Diseñador Gráfico
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Escalar figuras desde el origen
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="cool">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Un diseñador gráfico necesita escalar un logo al{' '}
              <span className="font-bold text-blue-600">doble de tamaño</span> (k = 2).
              El logo debe escalarse desde el <span className="font-bold text-red-500">origen</span>{' '}
              del plano.
            </p>

            {/* Visual: Triangle at origin */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
              <svg viewBox="0 0 250 220" className="w-full max-w-md mx-auto">
                {/* Grid */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={toSvgX(i)}
                    y1={toSvgY(0)}
                    x2={toSvgX(i)}
                    y2={toSvgY(7)}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="0.5"
                  />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1={toSvgX(0)}
                    y1={toSvgY(i)}
                    x2={toSvgX(8)}
                    y2={toSvgY(i)}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="0.5"
                  />
                ))}

                {/* Axes */}
                <line
                  x1={toSvgX(0)}
                  y1={toSvgY(0)}
                  x2={toSvgX(8)}
                  y2={toSvgY(0)}
                  className="stroke-gray-400 dark:stroke-gray-500"
                  strokeWidth="1.5"
                />
                <line
                  x1={toSvgX(0)}
                  y1={toSvgY(0)}
                  x2={toSvgX(0)}
                  y2={toSvgY(7)}
                  className="stroke-gray-400 dark:stroke-gray-500"
                  strokeWidth="1.5"
                />

                {/* Axis labels */}
                <text x={toSvgX(8) + 5} y={toSvgY(0) + 4} className="fill-gray-500 text-[10px]">
                  x
                </text>
                <text x={toSvgX(0) - 3} y={toSvgY(7) - 5} className="fill-gray-500 text-[10px]">
                  y
                </text>

                {/* Number labels on axes */}
                {[1, 2, 3, 4, 5, 6, 7].map(n => (
                  <text
                    key={`x-${n}`}
                    x={toSvgX(n)}
                    y={toSvgY(0) + 12}
                    textAnchor="middle"
                    className="fill-gray-400 text-[8px]"
                  >
                    {n}
                  </text>
                ))}
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <text
                    key={`y-${n}`}
                    x={toSvgX(0) - 8}
                    y={toSvgY(n) + 3}
                    textAnchor="middle"
                    className="fill-gray-400 text-[8px]"
                  >
                    {n}
                  </text>
                ))}

                {/* Original triangle */}
                <polygon
                  points={triangleOriginal.map(p => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ')}
                  className="fill-blue-200/70 dark:fill-blue-800/50 stroke-blue-500"
                  strokeWidth="2"
                />

                {/* Point labels */}
                {triangleOriginal.map((p) => (
                  <g key={p.label}>
                    <circle
                      cx={toSvgX(p.x)}
                      cy={toSvgY(p.y)}
                      r={5}
                      className="fill-blue-500"
                    />
                    <text
                      x={toSvgX(p.x) + 8}
                      y={toSvgY(p.y) - 5}
                      className="fill-blue-600 dark:fill-blue-400 text-[9px] font-bold"
                    >
                      {p.label}({p.x}, {p.y})
                    </text>
                  </g>
                ))}

                {/* Center (origin) */}
                <circle cx={toSvgX(0)} cy={toSvgY(0)} r={7} className="fill-red-500" />
                <text
                  x={toSvgX(0)}
                  y={toSvgY(0) + 4}
                  textAnchor="middle"
                  className="fill-white text-[8px] font-bold"
                >
                  C
                </text>
              </svg>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center border border-blue-200 dark:border-blue-700">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-5 h-5 text-red-500" />
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  Centro de escalado:
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                El origen <span className="font-mono font-bold text-red-500">C = (0, 0)</span>
              </p>
            </div>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Ver el desafío
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              Si escalamos con <span className="text-purple-600 font-mono">k = 2</span> desde el origen,
              <br />
              <span className="text-blue-600">¿dónde termina el punto P(1, 2)?</span>
            </p>
          </QuestionPrompt>

          <OptionGrid columns={2}>
            {OPTIONS.map((option, index) => (
              <OptionButton
                key={index}
                label={option}
                index={index}
                isSelected={selectedAnswer === index}
                isCorrect={index === CORRECT_ANSWER}
                showFeedback={showFeedback}
                onClick={() => handleSelect(index)}
              />
            ))}
          </OptionGrid>

          {!showFeedback && (
            <div className="flex justify-center">
              <ActionButton onClick={handleCheck} disabled={selectedAnswer === null}>
                Verificar
              </ActionButton>
            </div>
          )}

          {showFeedback && (
            <FeedbackPanel
              isCorrect={isCorrect}
              title={isCorrect ? '¡Exacto!' : '¡Casi!'}
              explanation="Veamos cómo funciona el escalado desde el origen..."
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              La Transformación con k = 2
            </h3>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <svg viewBox="0 0 250 220" className="w-full max-w-lg mx-auto">
                {/* Grid */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={toSvgX(i)}
                    y1={toSvgY(0)}
                    x2={toSvgX(i)}
                    y2={toSvgY(7)}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="0.5"
                  />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1={toSvgX(0)}
                    y1={toSvgY(i)}
                    x2={toSvgX(8)}
                    y2={toSvgY(i)}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="0.5"
                  />
                ))}

                {/* Axes */}
                <line
                  x1={toSvgX(0)}
                  y1={toSvgY(0)}
                  x2={toSvgX(8)}
                  y2={toSvgY(0)}
                  className="stroke-gray-400"
                  strokeWidth="1.5"
                />
                <line
                  x1={toSvgX(0)}
                  y1={toSvgY(0)}
                  x2={toSvgX(0)}
                  y2={toSvgY(7)}
                  className="stroke-gray-400"
                  strokeWidth="1.5"
                />

                {/* Number labels */}
                {[1, 2, 3, 4, 5, 6, 7].map(n => (
                  <text
                    key={`x-${n}`}
                    x={toSvgX(n)}
                    y={toSvgY(0) + 12}
                    textAnchor="middle"
                    className="fill-gray-400 text-[8px]"
                  >
                    {n}
                  </text>
                ))}
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <text
                    key={`y-${n}`}
                    x={toSvgX(0) - 8}
                    y={toSvgY(n) + 3}
                    textAnchor="middle"
                    className="fill-gray-400 text-[8px]"
                  >
                    {n}
                  </text>
                ))}

                {/* Original triangle (faded) */}
                <polygon
                  points={triangleOriginal.map(p => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ')}
                  className="fill-blue-100/50 stroke-blue-300"
                  strokeWidth="1.5"
                  strokeDasharray="4"
                />

                {/* Scaled triangle */}
                <polygon
                  points={triangleScaled.map(p => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ')}
                  className="fill-green-200/70 dark:fill-green-800/50 stroke-green-500"
                  strokeWidth="2"
                />

                {/* Vectors from origin to scaled points */}
                {triangleScaled.map((p, i) => (
                  <line
                    key={`vec-${i}`}
                    x1={toSvgX(0)}
                    y1={toSvgY(0)}
                    x2={toSvgX(p.x)}
                    y2={toSvgY(p.y)}
                    className="stroke-green-400"
                    strokeWidth="1"
                    strokeDasharray="3"
                  />
                ))}

                {/* Center (origin) */}
                <circle cx={toSvgX(0)} cy={toSvgY(0)} r={7} className="fill-red-500" />
                <text
                  x={toSvgX(0)}
                  y={toSvgY(0) + 4}
                  textAnchor="middle"
                  className="fill-white text-[8px] font-bold"
                >
                  C
                </text>

                {/* Original point P */}
                <circle cx={toSvgX(1)} cy={toSvgY(2)} r={4} className="fill-blue-400" />
                <text x={toSvgX(1) - 25} y={toSvgY(2) - 3} className="fill-blue-500 text-[8px]">
                  P(1, 2)
                </text>

                {/* Scaled point P' - highlight */}
                <circle cx={toSvgX(2)} cy={toSvgY(4)} r={6} className="fill-green-500" />
                <text x={toSvgX(2) + 8} y={toSvgY(4) - 3} className="fill-green-600 text-[9px] font-bold">
                  P′(2, 4)
                </text>

                {/* Arrow from P to P' */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 6 3, 0 6" className="fill-purple-500" />
                  </marker>
                </defs>
                <line
                  x1={toSvgX(1) + 4}
                  y1={toSvgY(2) - 4}
                  x2={toSvgX(2) - 4}
                  y2={toSvgY(4) + 4}
                  className="stroke-purple-500"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <text x={toSvgX(1.5) + 8} y={toSvgY(3)} className="fill-purple-600 text-[9px] font-bold">
                  ×2
                </text>

                {/* Legend */}
                <g transform="translate(160, 10)">
                  <rect
                    x={0}
                    y={0}
                    width={75}
                    height={45}
                    rx={4}
                    className="fill-white/90 dark:fill-gray-800/90 stroke-gray-300 dark:stroke-gray-600"
                  />
                  <circle cx={12} cy={15} r={4} className="fill-blue-400" />
                  <text x={22} y={18} className="fill-gray-600 text-[8px]">Original</text>
                  <circle cx={12} cy={32} r={4} className="fill-green-500" />
                  <text x={22} y={35} className="fill-gray-600 text-[8px]">Imagen (k=2)</text>
                </g>
              </svg>
            </div>

            <div className="space-y-3 text-sm">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Desde el origen, ¡es simple!
                </p>
                <div className="font-mono text-gray-600 dark:text-gray-400 space-y-1">
                  <p>P = (1, 2)</p>
                  <p>P′ = <span className="text-purple-600">2</span> × (1, 2) = (<span className="text-green-600 font-bold">2, 4</span>)</p>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                  Cada coordenada se multiplica por k
                </p>
              </div>
            </div>
          </div>

          {/* Bridge to concept */}
          <InsightCard
            title="Esto es una Homotecia"
            icon={<ZoomIn className="w-8 h-8 text-purple-500" />}
            variant="purple"
          >
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                La <strong className="text-purple-600">homotecia</strong> es una transformación que
                escala figuras desde un punto fijo llamado <strong>centro</strong>.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="font-mono text-lg text-gray-800 dark:text-gray-200 text-center mb-3">
                  P′ = C + k · (P - C)
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-2">
                    Cuando <strong>C = (0, 0)</strong>, la fórmula se simplifica:
                  </p>
                  <p className="font-mono text-center text-purple-600 font-bold text-lg">
                    P′ = k · P
                  </p>
                </div>
              </div>
            </div>
          </InsightCard>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} icon={<ArrowRight size={20} />}>
              Explorar más casos
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
