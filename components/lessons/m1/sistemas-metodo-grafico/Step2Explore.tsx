'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Point {
  x: number;
  y: number;
}

interface ExploreExample {
  id: number;
  title: string;
  equation1: string;
  equation2: string;
  line1Points: Point[];
  line2Points: Point[];
  solution: Point;
  explanation: string;
}

const EXAMPLES: ExploreExample[] = [
  {
    id: 1,
    title: 'Ejemplo 1: Primer cuadrante',
    equation1: 'x + y = 4',
    equation2: 'x - y = 2',
    line1Points: [{ x: 0, y: 4 }, { x: 4, y: 0 }],
    line2Points: [{ x: 0, y: -2 }, { x: 4, y: 2 }],
    solution: { x: 3, y: 1 },
    explanation: 'Solución en cuadrante I: x e y son positivos. Verifica: 3 + 1 = 4 ✓',
  },
  {
    id: 2,
    title: 'Ejemplo 2: Segundo cuadrante',
    equation1: 'x + 2y = 3',
    equation2: '2x + y = 0',
    line1Points: [{ x: -3, y: 3 }, { x: 3, y: 0 }],
    line2Points: [{ x: -2, y: 4 }, { x: 2, y: -4 }],
    solution: { x: -1, y: 2 },
    explanation: 'Solución en cuadrante II: x negativo, y positivo. Verifica: -1 + 2(2) = 3 ✓',
  },
  {
    id: 3,
    title: 'Ejemplo 3: Cuarto cuadrante',
    equation1: 'x - y = 5',
    equation2: 'x + y = 1',
    line1Points: [{ x: 0, y: -5 }, { x: 5, y: 0 }],
    line2Points: [{ x: 0, y: 1 }, { x: 4, y: -3 }],
    solution: { x: 3, y: -2 },
    explanation: 'Solución en cuadrante IV: x positivo, y negativo. Verifica: 3 - (-2) = 5 ✓',
  },
];

function MiniGraph({ example, showSolution }: { example: ExploreExample; showSolution: boolean }) {
  const gridSize = 200;
  const scale = gridSize / 10;
  const centerX = gridSize / 2;
  const centerY = gridSize / 2;

  const toSvgX = (x: number) => centerX + x * scale;
  const toSvgY = (y: number) => centerY - y * scale;

  const line1Start = example.line1Points[0];
  const line1End = example.line1Points[1];
  const line2Start = example.line2Points[0];
  const line2End = example.line2Points[1];

  return (
    <svg width={gridSize} height={gridSize} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Grid */}
      {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map(i => (
        <g key={i}>
          <line
            x1={toSvgX(i)}
            y1={0}
            x2={toSvgX(i)}
            y2={gridSize}
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-700"
            strokeWidth="1"
          />
          <line
            x1={0}
            y1={toSvgY(i)}
            x2={gridSize}
            y2={toSvgY(i)}
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-700"
            strokeWidth="1"
          />
        </g>
      ))}

      {/* Axes */}
      <line
        x1={centerX}
        y1={0}
        x2={centerX}
        y2={gridSize}
        stroke="currentColor"
        className="text-gray-400 dark:text-gray-500"
        strokeWidth="2"
      />
      <line
        x1={0}
        y1={centerY}
        x2={gridSize}
        y2={centerY}
        stroke="currentColor"
        className="text-gray-400 dark:text-gray-500"
        strokeWidth="2"
      />

      {/* Line 1 */}
      <line
        x1={toSvgX(line1Start.x - 2)}
        y1={toSvgY(line1Start.y + (line1End.y - line1Start.y) / (line1End.x - line1Start.x) * (-2))}
        x2={toSvgX(line1End.x + 1)}
        y2={toSvgY(line1End.y + (line1End.y - line1Start.y) / (line1End.x - line1Start.x) * (1))}
        stroke="#3B82F6"
        strokeWidth="2"
      />

      {/* Line 2 */}
      <line
        x1={toSvgX(line2Start.x - 1)}
        y1={toSvgY(line2Start.y + (line2End.y - line2Start.y) / (line2End.x - line2Start.x) * (-1))}
        x2={toSvgX(line2End.x + 1)}
        y2={toSvgY(line2End.y + (line2End.y - line2Start.y) / (line2End.x - line2Start.x) * (1))}
        stroke="#10B981"
        strokeWidth="2"
      />

      {/* Solution point */}
      {showSolution && (
        <g>
          <circle
            cx={toSvgX(example.solution.x)}
            cy={toSvgY(example.solution.y)}
            r="8"
            fill="#EF4444"
            className="animate-pulse"
          />
          <text
            x={toSvgX(example.solution.x) + 12}
            y={toSvgY(example.solution.y) - 8}
            fill="#EF4444"
            fontSize="12"
            fontWeight="bold"
          >
            ({example.solution.x}, {example.solution.y})
          </text>
        </g>
      )}
    </svg>
  );
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [currentExample, setCurrentExample] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [discoveredPatterns, setDiscoveredPatterns] = useState<number[]>([]);

  const example = EXAMPLES[currentExample];
  const allDiscovered = discoveredPatterns.length === EXAMPLES.length;

  const handleRevealSolution = () => {
    setShowSolution(true);
    if (!discoveredPatterns.includes(currentExample)) {
      setDiscoveredPatterns([...discoveredPatterns, currentExample]);
    }
  };

  const handleNext = () => {
    if (currentExample < EXAMPLES.length - 1) {
      setCurrentExample(currentExample + 1);
      setShowSolution(false);
    }
  };

  const handlePrev = () => {
    if (currentExample > 0) {
      setCurrentExample(currentExample - 1);
      setShowSolution(true);
    }
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Representación Gráfica
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Descubre cómo las rectas revelan la solución
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-2">
        {EXAMPLES.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
              discoveredPatterns.includes(i)
                ? 'bg-green-500 text-white'
                : i === currentExample
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            )}
          >
            {discoveredPatterns.includes(i) ? '✓' : i + 1}
          </div>
        ))}
      </div>

      {/* Current example */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
          {example.title}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Equations */}
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Sistema de ecuaciones:</p>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 px-4 py-2 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-mono text-lg">{example.equation1}</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/50 px-4 py-2 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-mono text-lg">{example.equation2}</span>
                </div>
              </div>
            </div>

            {showSolution && (
              <div className="animate-fadeIn bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
                  <Sparkles size={20} />
                  <span className="font-semibold">Punto de intersección</span>
                </div>
                <p className="text-2xl font-mono font-bold text-gray-800 dark:text-gray-200 mt-2">
                  ({example.solution.x}, {example.solution.y})
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {example.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Graph */}
          <div className="flex flex-col items-center gap-4">
            <MiniGraph example={example} showSolution={showSolution} />
            <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Ecuación 1</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Ecuación 2</span>
              </div>
              {showSolution && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Solución</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center gap-4">
        {currentExample > 0 && (
          <button
            onClick={handlePrev}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            Anterior
          </button>
        )}

        {!showSolution ? (
          <button
            onClick={handleRevealSolution}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Encontrar la solución</span>
            <MoveRight size={18} />
          </button>
        ) : currentExample < EXAMPLES.length - 1 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Siguiente ejemplo</span>
            <ArrowRight size={18} />
          </button>
        ) : null}
      </div>

      {/* Summary when all discovered */}
      {allDiscovered && (
        <div className="animate-fadeIn space-y-6">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-300 mb-3 text-center">
              💡 Patrón descubierto
            </h4>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p className="text-center">
                <strong>La solución de un sistema 2x2 es el punto donde se cruzan las dos rectas.</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <strong>x</strong> = coordenada horizontal
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <strong>y</strong> = coordenada vertical
                </div>
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
