'use client';

import { useState } from 'react';
import { ArrowRight, Check, Sparkles, RotateCcw, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import MathDisplay from '@/components/math/MathDisplay';

interface Configuration {
  id: string;
  name: string;
  icon: string;
  // Segments on first transversal
  AB: number;
  BC: number;
  // Segments on second transversal (corresponding)
  AB_prime: number;
  BC_prime: number;
  description: string;
}

const CONFIGURATIONS: Configuration[] = [
  {
    id: 'escalera',
    name: 'Escalera',
    icon: '🪜',
    AB: 3,
    BC: 6,
    AB_prime: 2,
    BC_prime: 4,
    description: 'Peldanos de una escalera cortados por dos cuerdas',
  },
  {
    id: 'mapa',
    name: 'Mapa',
    icon: '🗺️',
    AB: 4,
    BC: 8,
    AB_prime: 5,
    BC_prime: 10,
    description: 'Lineas de latitud cortadas por dos caminos',
  },
  {
    id: 'veneciana',
    name: 'Persiana',
    icon: '🪟',
    AB: 2,
    BC: 3,
    AB_prime: 4,
    BC_prime: 6,
    description: 'Tablillas de una persiana cortadas por dos cuerdas',
  },
];

function ParallelLinesViz({ config }: { config: Configuration }) {
  // SVG dimensions
  const width = 320;
  const height = 220;

  // Three parallel horizontal lines
  const lineY1 = 40;
  const lineY2 = lineY1 + 60;
  const lineY3 = lineY2 + 80;

  // Two transversals
  const trans1X1 = 80;
  const trans1X2 = 120;
  const trans2X1 = 200;
  const trans2X2 = 240;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-sm mx-auto">
      {/* Parallel lines (horizontal) */}
      <g className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="2">
        <line x1="20" y1={lineY1} x2={width - 20} y2={lineY1} />
        <line x1="20" y1={lineY2} x2={width - 20} y2={lineY2} />
        <line x1="20" y1={lineY3} x2={width - 20} y2={lineY3} />
      </g>

      {/* Parallel symbols */}
      <g className="fill-gray-500 dark:fill-gray-400 text-xs">
        <text x="30" y={lineY1 - 5}>L₁</text>
        <text x="30" y={lineY2 - 5}>L₂</text>
        <text x="30" y={lineY3 - 5}>L₃</text>
      </g>

      {/* First transversal */}
      <line
        x1={trans1X1}
        y1={lineY1}
        x2={trans1X2}
        y2={lineY3}
        className="stroke-blue-500 dark:stroke-blue-400"
        strokeWidth="3"
      />

      {/* Second transversal */}
      <line
        x1={trans2X1}
        y1={lineY1}
        x2={trans2X2}
        y2={lineY3}
        className="stroke-purple-500 dark:stroke-purple-400"
        strokeWidth="3"
      />

      {/* Points on first transversal */}
      <g>
        <circle cx={trans1X1} cy={lineY1} r="5" className="fill-blue-500" />
        <text x={trans1X1 - 15} y={lineY1 + 5} className="fill-blue-600 dark:fill-blue-400 text-sm font-bold">
          A
        </text>

        <circle cx={(trans1X1 + trans1X2) / 2} cy={lineY2} r="5" className="fill-blue-500" />
        <text
          x={(trans1X1 + trans1X2) / 2 - 15}
          y={lineY2 + 5}
          className="fill-blue-600 dark:fill-blue-400 text-sm font-bold"
        >
          B
        </text>

        <circle cx={trans1X2} cy={lineY3} r="5" className="fill-blue-500" />
        <text x={trans1X2 - 15} y={lineY3 + 5} className="fill-blue-600 dark:fill-blue-400 text-sm font-bold">
          C
        </text>
      </g>

      {/* Points on second transversal */}
      <g>
        <circle cx={trans2X1} cy={lineY1} r="5" className="fill-purple-500" />
        <text x={trans2X1 + 8} y={lineY1 + 5} className="fill-purple-600 dark:fill-purple-400 text-sm font-bold">
          A&apos;
        </text>

        <circle cx={(trans2X1 + trans2X2) / 2} cy={lineY2} r="5" className="fill-purple-500" />
        <text
          x={(trans2X1 + trans2X2) / 2 + 8}
          y={lineY2 + 5}
          className="fill-purple-600 dark:fill-purple-400 text-sm font-bold"
        >
          B&apos;
        </text>

        <circle cx={trans2X2} cy={lineY3} r="5" className="fill-purple-500" />
        <text x={trans2X2 + 8} y={lineY3 + 5} className="fill-purple-600 dark:fill-purple-400 text-sm font-bold">
          C&apos;
        </text>
      </g>

      {/* Segment labels */}
      <g className="text-xs font-bold">
        {/* AB segment */}
        <text x={trans1X1 - 25} y={(lineY1 + lineY2) / 2} className="fill-blue-600 dark:fill-blue-400">
          {config.AB}
        </text>
        {/* BC segment */}
        <text x={trans1X2 - 30} y={(lineY2 + lineY3) / 2 + 5} className="fill-blue-600 dark:fill-blue-400">
          {config.BC}
        </text>
        {/* A'B' segment */}
        <text x={trans2X1 + 15} y={(lineY1 + lineY2) / 2} className="fill-purple-600 dark:fill-purple-400">
          {config.AB_prime}
        </text>
        {/* B'C' segment */}
        <text x={trans2X2 + 10} y={(lineY2 + lineY3) / 2 + 5} className="fill-purple-600 dark:fill-purple-400">
          {config.BC_prime}
        </text>
      </g>

      {/* Parallel indicator arrows */}
      <g className="fill-gray-400 dark:fill-gray-500">
        <text x={width - 40} y={(lineY1 + lineY2) / 2} className="text-sm">
          ∥
        </text>
        <text x={width - 40} y={(lineY2 + lineY3) / 2} className="text-sm">
          ∥
        </text>
      </g>
    </svg>
  );
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [currentConfig, setCurrentConfig] = useState(0);
  const [showRatios, setShowRatios] = useState(false);
  const [discoveredPattern, setDiscoveredPattern] = useState(false);
  const [checkedConfigs, setCheckedConfigs] = useState<Set<number>>(new Set());

  const config = CONFIGURATIONS[currentConfig];

  // Calculate ratios
  const ratio1 = config.AB / config.BC;
  const ratio2 = config.AB_prime / config.BC_prime;
  const ratiosEqual = Math.abs(ratio1 - ratio2) < 0.001;

  const handleCalculate = () => {
    setShowRatios(true);
    setCheckedConfigs((prev) => new Set([...prev, currentConfig]));

    // Check if discovered pattern (after checking at least 2 configurations)
    if (checkedConfigs.size >= 1 && !discoveredPattern) {
      setTimeout(() => {
        setDiscoveredPattern(true);
      }, 1500);
    }
  };

  const handleNextConfig = () => {
    setShowRatios(false);
    setCurrentConfig((prev) => (prev + 1) % CONFIGURATIONS.length);
  };

  const handleReset = () => {
    setShowRatios(false);
    setCheckedConfigs(new Set());
    setDiscoveredPattern(false);
    setCurrentConfig(0);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Descubre el Patron</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explora diferentes configuraciones y encuentra que tienen en comun
        </p>
      </div>

      {/* Configuration selector */}
      <div className="flex justify-center gap-3">
        {CONFIGURATIONS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => {
              setCurrentConfig(i);
              setShowRatios(false);
            }}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
              currentConfig === i
                ? 'bg-green-500 text-white'
                : checkedConfigs.has(i)
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            <span>{c.icon}</span>
            {c.name}
            {checkedConfigs.has(i) && <Check size={14} />}
          </button>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Configuraciones exploradas: {checkedConfigs.size} / {CONFIGURATIONS.length}
      </div>

      {/* Main visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="text-center mb-4">
          <span className="text-3xl">{config.icon}</span>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{config.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{config.description}</p>
        </div>

        <ParallelLinesViz config={config} />

        {/* Segment values display */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
              Primera transversal
            </h4>
            <div className="space-y-1 font-mono text-blue-600 dark:text-blue-400">
              <p>
                AB = <strong>{config.AB}</strong>
              </p>
              <p>
                BC = <strong>{config.BC}</strong>
              </p>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">
              Segunda transversal
            </h4>
            <div className="space-y-1 font-mono text-purple-600 dark:text-purple-400">
              <p>
                A&apos;B&apos; = <strong>{config.AB_prime}</strong>
              </p>
              <p>
                B&apos;C&apos; = <strong>{config.BC_prime}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Ratio calculation section */}
        {!showRatios ? (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleCalculate}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-colors"
            >
              <Calculator size={20} />
              Calcular razones
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Razon en transversal 1</p>
                <MathDisplay
                  latex={`\\frac{AB}{BC} = \\frac{${config.AB}}{${config.BC}} = ${ratio1.toFixed(2)}`}
                />
              </div>

              <div className="bg-purple-100 dark:bg-purple-900/50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Razon en transversal 2</p>
                <MathDisplay
                  latex={`\\frac{A'B'}{B'C'} = \\frac{${config.AB_prime}}{${config.BC_prime}} = ${ratio2.toFixed(2)}`}
                />
              </div>
            </div>

            {/* Comparison result */}
            <div
              className={cn(
                'rounded-lg p-4 text-center',
                ratiosEqual
                  ? 'bg-green-100 dark:bg-green-900/50'
                  : 'bg-red-100 dark:bg-red-900/50'
              )}
            >
              <p className="font-bold text-lg">
                {ratio1.toFixed(2)} {ratiosEqual ? '=' : '≠'} {ratio2.toFixed(2)}
              </p>
              <p
                className={cn(
                  'text-sm font-semibold',
                  ratiosEqual
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                )}
              >
                {ratiosEqual ? '¡Las razones son IGUALES!' : 'Las razones son diferentes'}
              </p>
            </div>

            {/* Next configuration button */}
            {!discoveredPattern && (
              <div className="flex justify-center">
                <button
                  onClick={handleNextConfig}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                >
                  Probar otra configuracion
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pattern discovered section */}
      {discoveredPattern && (
        <div className="animate-fadeIn space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border-2 border-green-300 dark:border-green-700">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300">
                ¡Patron descubierto!
              </h3>
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cuando <strong>lineas paralelas</strong> cortan dos transversales, los segmentos
                correspondientes son <strong className="text-green-600">proporcionales</strong>:
              </p>
              <div className="text-2xl">
                <MathDisplay latex="\frac{AB}{BC} = \frac{A'B'}{B'C'}" displayMode />
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Esto funciona para <strong>cualquier</strong> par de lineas paralelas y cualquier
                par de transversales.
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <RotateCcw size={16} />
              Explorar mas
            </button>

            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
            >
              Ver la prueba
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
