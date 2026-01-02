'use client';

import { useState } from 'react';
import { ArrowRight, Eye, Sparkles, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'enlarge' | 'reduce' | 'invert' | 'summary';

interface Point {
  x: number;
  y: number;
  label: string;
}

// SVG coordinate helpers (scale: 1 unit = 25px, origin at (75, 200))
const SCALE = 25;
const ORIGIN_X = 75;
const ORIGIN_Y = 200;
const toSvgX = (x: number) => ORIGIN_X + x * SCALE;
const toSvgY = (y: number) => ORIGIN_Y - y * SCALE;

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [showTransformed, setShowTransformed] = useState(false);

  // Same triangle as Step1Hook: P(1,2), Q(3,1), R(2,3)
  const originalPoints: Point[] = [
    { x: 1, y: 2, label: 'P' },
    { x: 3, y: 1, label: 'Q' },
    { x: 2, y: 3, label: 'R' },
  ];

  // Center at origin (0, 0)
  const center = { x: 0, y: 0 };

  // Apply homothety transformation (from origin, simplifies to k * point)
  const applyHomothety = (point: Point, k: number): Point => ({
    x: k * point.x,
    y: k * point.y,
    label: point.label + '′',
  });

  // Get k value based on phase
  const getK = (): number => {
    switch (phase) {
      case 'enlarge':
        return 2;
      case 'reduce':
        return 0.5;
      case 'invert':
        return -1;
      default:
        return 1;
    }
  };

  const k = getK();
  const transformedPoints = originalPoints.map(p => applyHomothety(p, k));

  if (!isActive) return null;

  // ============ PHASE: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Explorando la Homotecia
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Descubre cómo cambia la figura con diferentes valores de k
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <h3 className="font-bold text-gray-800 dark:text-gray-200">
              La razón de homotecia (k)
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <ZoomIn className="w-8 h-8 mx-auto text-green-500 mb-2" />
              <p className="font-bold text-green-600 dark:text-green-400">k &gt; 1</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Amplificación</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <ZoomOut className="w-8 h-8 mx-auto text-amber-500 mb-2" />
              <p className="font-bold text-amber-600 dark:text-amber-400">0 &lt; k &lt; 1</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Reducción</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <RotateCcw className="w-8 h-8 mx-auto text-red-500 mb-2" />
              <p className="font-bold text-red-600 dark:text-red-400">k &lt; 0</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Inversión</p>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-700 mb-4">
            <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
              <strong>Ojo:</strong> k negativo NO significa reducción. El signo controla la{' '}
              <em>dirección</em> (al lado opuesto). El tamaño lo determina |k|.
            </p>
          </div>

          <p className="text-center text-gray-700 dark:text-gray-300">
            Vamos a explorar cada caso con el mismo triángulo
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('enlarge')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>Comenzar exploración</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE: SUMMARY ============
  if (phase === 'summary') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Resumen de la Homotecia
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Los tres tipos de transformación según el valor de k
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* k > 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-green-300 dark:border-green-700">
              <div className="flex items-center gap-2 mb-3">
                <ZoomIn className="w-5 h-5 text-green-500" />
                <span className="font-bold text-green-600 dark:text-green-400">k = 2</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Amplificación</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Figura más grande</li>
                <li>• Misma posición relativa</li>
                <li>• Distancias × 2</li>
              </ul>
            </div>

            {/* 0 < k < 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-amber-300 dark:border-amber-700">
              <div className="flex items-center gap-2 mb-3">
                <ZoomOut className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-amber-600 dark:text-amber-400">k = 0.5</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Reducción</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Figura más pequeña</li>
                <li>• Misma posición relativa</li>
                <li>• Distancias × ½</li>
              </ul>
            </div>

            {/* k < 0 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-red-300 dark:border-red-700">
              <div className="flex items-center gap-2 mb-3">
                <RotateCcw className="w-5 h-5 text-red-500" />
                <span className="font-bold text-red-600 dark:text-red-400">k = -1</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Inversión</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Mismo tamaño</li>
                <li>• Lado opuesto del centro</li>
                <li>• Como un reflejo puntual</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
            <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Con centro en el origen, la fórmula es simple:
            </p>
            <p className="font-mono text-xl text-purple-600 dark:text-purple-400">
              P′ = k · P
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Cada coordenada se multiplica por k
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASES: ENLARGE, REDUCE, INVERT ============
  const phaseConfig = {
    enlarge: {
      title: 'Amplificación (k = 2)',
      description: 'El punto se aleja del origen: sus coordenadas se duplican',
      color: 'green',
      icon: ZoomIn,
      next: 'reduce' as Phase,
      buttonText: 'Probar reducción',
    },
    reduce: {
      title: 'Reducción (k = 0.5)',
      description: 'El punto se acerca al origen: sus coordenadas se reducen a la mitad',
      color: 'amber',
      icon: ZoomOut,
      next: 'invert' as Phase,
      buttonText: 'Probar inversión',
    },
    invert: {
      title: 'Inversión (k = -1)',
      description: 'El punto pasa al lado opuesto del origen: sus coordenadas cambian de signo',
      color: 'red',
      icon: RotateCcw,
      next: 'summary' as Phase,
      buttonText: 'Ver resumen',
    },
  };

  const config = phaseConfig[phase as keyof typeof phaseConfig];
  const IconComponent = config.icon;

  const colorClasses = {
    green: {
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-200 dark:border-green-700',
      text: 'text-green-600 dark:text-green-400',
      fill: 'fill-green-500',
      stroke: 'stroke-green-500',
      fillBg: 'fill-green-200/50 dark:fill-green-700/50',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/30',
      border: 'border-amber-200 dark:border-amber-700',
      text: 'text-amber-600 dark:text-amber-400',
      fill: 'fill-amber-500',
      stroke: 'stroke-amber-500',
      fillBg: 'fill-amber-200/50 dark:fill-amber-700/50',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/30',
      border: 'border-red-200 dark:border-red-700',
      text: 'text-red-600 dark:text-red-400',
      fill: 'fill-red-500',
      stroke: 'stroke-red-500',
      fillBg: 'fill-red-200/50 dark:fill-red-700/50',
    },
  };

  const colors = colorClasses[config.color as keyof typeof colorClasses];

  // Calculate grid range based on k to show all points
  const minX = k < 0 ? Math.min(...transformedPoints.map(p => p.x)) - 1 : -1;
  const maxX = Math.max(...transformedPoints.map(p => p.x), 4) + 1;
  const minY = k < 0 ? Math.min(...transformedPoints.map(p => p.y)) - 1 : -1;
  const maxY = Math.max(...transformedPoints.map(p => p.y), 4) + 1;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{config.title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{config.description}</p>
      </div>

      {/* Formula display */}
      <div className={cn('rounded-xl p-4 border text-center', colors.bg, colors.border)}>
        <p className="font-mono text-lg text-gray-800 dark:text-gray-200">
          P′ = <span className={colors.text}>{k}</span> · P
        </p>
      </div>

      {/* Interactive SVG */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
        <svg viewBox="-20 0 300 250" className="w-full max-w-lg mx-auto">
          {/* Grid */}
          {Array.from({ length: maxX - minX + 1 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={toSvgX(minX + i)}
              y1={toSvgY(minY)}
              x2={toSvgX(minX + i)}
              y2={toSvgY(maxY)}
              className="stroke-gray-200 dark:stroke-gray-700"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: maxY - minY + 1 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={toSvgX(minX)}
              y1={toSvgY(minY + i)}
              x2={toSvgX(maxX)}
              y2={toSvgY(minY + i)}
              className="stroke-gray-200 dark:stroke-gray-700"
              strokeWidth="0.5"
            />
          ))}

          {/* Axes */}
          <line
            x1={toSvgX(minX)}
            y1={toSvgY(0)}
            x2={toSvgX(maxX)}
            y2={toSvgY(0)}
            className="stroke-gray-500"
            strokeWidth="1.5"
          />
          <line
            x1={toSvgX(0)}
            y1={toSvgY(minY)}
            x2={toSvgX(0)}
            y2={toSvgY(maxY)}
            className="stroke-gray-500"
            strokeWidth="1.5"
          />

          {/* Axis labels */}
          {Array.from({ length: maxX - minX + 1 }).map((_, i) => {
            const val = minX + i;
            if (val === 0) return null;
            return (
              <text
                key={`x-${i}`}
                x={toSvgX(val)}
                y={toSvgY(0) + 12}
                textAnchor="middle"
                className="fill-gray-500 text-[8px]"
              >
                {val}
              </text>
            );
          })}
          {Array.from({ length: maxY - minY + 1 }).map((_, i) => {
            const val = minY + i;
            if (val === 0) return null;
            return (
              <text
                key={`y-${i}`}
                x={toSvgX(0) - 8}
                y={toSvgY(val) + 3}
                textAnchor="end"
                className="fill-gray-500 text-[8px]"
              >
                {val}
              </text>
            );
          })}

          {/* Center of homothety (origin) */}
          <circle cx={toSvgX(center.x)} cy={toSvgY(center.y)} r={8} className="fill-purple-500" />
          <text
            x={toSvgX(center.x)}
            y={toSvgY(center.y) + 4}
            textAnchor="middle"
            className="fill-white text-[8px] font-bold"
          >
            C
          </text>

          {/* Original triangle */}
          <polygon
            points={originalPoints.map(p => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ')}
            className="fill-blue-200/50 dark:fill-blue-700/50 stroke-blue-500"
            strokeWidth="2"
          />
          {/* Original point labels */}
          {originalPoints.map(p => (
            <g key={p.label}>
              <circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r={5} className="fill-blue-500" />
              <text
                x={toSvgX(p.x) + 8}
                y={toSvgY(p.y) - 5}
                className="fill-blue-600 text-[8px] font-bold"
              >
                {p.label}({p.x},{p.y})
              </text>
            </g>
          ))}

          {/* Transformed triangle (shown conditionally) */}
          {showTransformed && (
            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
              <polygon
                points={transformedPoints.map(p => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ')}
                className={cn('stroke-2', colors.fillBg, colors.stroke)}
              />
              {/* Transformed point labels */}
              {transformedPoints.map((p, i) => {
                // Custom offsets to avoid overlap
                const offsets = [
                  { x: 8, y: -5 },
                  { x: 8, y: 10 },
                  { x: -45, y: -5 },
                ];
                const offset = offsets[i] || { x: 8, y: -5 };

                return (
                  <g key={p.label}>
                    <circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r={5} className={colors.fill} />
                    <text
                      x={toSvgX(p.x) + offset.x}
                      y={toSvgY(p.y) + offset.y}
                      className={cn('text-[8px] font-bold', colors.text.replace('text', 'fill'))}
                    >
                      {p.label}({p.x},{p.y})
                    </text>
                  </g>
                );
              })}

              {/* Dashed lines from center to transformed points */}
              {transformedPoints.map((transformed, i) => (
                <line
                  key={`line-${i}`}
                  x1={toSvgX(center.x)}
                  y1={toSvgY(center.y)}
                  x2={toSvgX(transformed.x)}
                  y2={toSvgY(transformed.y)}
                  className="stroke-gray-400"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
              ))}
            </motion.g>
          )}

          {/* Legend */}
          <g transform="translate(190, 10)">
            <rect
              x={0}
              y={0}
              width={85}
              height={50}
              rx={4}
              className="fill-white dark:fill-gray-800 stroke-gray-300 dark:stroke-gray-600"
            />
            <circle cx={15} cy={15} r={5} className="fill-blue-500" />
            <text x={25} y={18} className="fill-gray-700 dark:fill-gray-300 text-[7px]">
              Original
            </text>
            {showTransformed && (
              <>
                <circle cx={15} cy={35} r={5} className={colors.fill} />
                <text x={25} y={38} className="fill-gray-700 dark:fill-gray-300 text-[7px]">
                  Imagen (k={k})
                </text>
              </>
            )}
          </g>
        </svg>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4">
        {!showTransformed ? (
          <button
            onClick={() => setShowTransformed(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
          >
            <Eye size={20} />
            <span>Aplicar k = {k}</span>
          </button>
        ) : (
          <div className="space-y-4 w-full max-w-md">
            {/* Calculation example */}
            <div className={cn('rounded-xl p-4 border', colors.bg, colors.border)}>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Ejemplo:</strong> Punto P(1, 2) con k = {k}
              </p>
              <div className="text-sm space-y-2">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Cálculo:</span>{' '}
                  <span className="font-mono">
                    P′ = {k} · (1, 2) = ({k * 1}, {k * 2})
                  </span>
                </p>
                <p className={cn('font-bold', colors.text)}>
                  <span className="font-semibold">Resultado:</span>{' '}
                  <span className="font-mono">
                    P′ = ({k * 1}, {k * 2})
                  </span>
                  {k > 1 && ' → se aleja del origen'}
                  {k > 0 && k < 1 && ' → se acerca al origen'}
                  {k < 0 && ' → pasa al lado opuesto'}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowTransformed(false);
                  setPhase(config.next);
                }}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>{config.buttonText}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
