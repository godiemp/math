'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Play, RotateCcw, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import MathDisplay from '@/components/math/MathDisplay';

type ProofPhase = 'intro' | 'step1' | 'step2' | 'step3' | 'conclusion';

const PHASES: { id: ProofPhase; title: string; description: string }[] = [
  { id: 'intro', title: 'Preparación', description: 'Tenemos un triángulo rectángulo con lados a, b y c' },
  { id: 'step1', title: 'Paso 1', description: 'Copiamos el triángulo 4 veces' },
  { id: 'step2', title: 'Paso 2', description: 'Formamos un cuadrado grande de lado (a + b)' },
  { id: 'step3', title: 'Paso 3', description: 'Reorganizamos los triángulos' },
  { id: 'conclusion', title: 'Conclusión', description: 'Las áreas son iguales: a² + b² = c²' },
];

export default function Step3Proof({ onComplete, isActive }: LessonStepProps) {
  const [currentPhase, setCurrentPhase] = useState<ProofPhase>('intro');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  // Triangle dimensions (3-4-5 scaled)
  const a = 60;
  const b = 80;
  const c = 100;
  const size = a + b; // 140

  const phaseIndex = PHASES.findIndex(p => p.id === currentPhase);

  const handleNextPhase = () => {
    if (isAnimating) return;

    const nextIndex = phaseIndex + 1;
    if (nextIndex < PHASES.length) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPhase(PHASES[nextIndex].id);
        setIsAnimating(false);

        if (PHASES[nextIndex].id === 'conclusion') {
          setTimeout(() => setShowComplete(true), 1000);
        }
      }, 300);
    }
  };

  const handleReset = () => {
    setCurrentPhase('intro');
    setShowComplete(false);
  };

  const handleAutoPlay = () => {
    if (isAnimating) return;

    const playNextPhase = (index: number) => {
      if (index >= PHASES.length) return;

      setCurrentPhase(PHASES[index].id);

      if (PHASES[index].id === 'conclusion') {
        setTimeout(() => setShowComplete(true), 1000);
      } else {
        setTimeout(() => playNextPhase(index + 1), 1500);
      }
    };

    playNextPhase(0);
  };

  if (!isActive) return null;

  // SVG coordinates for triangles
  const triangle1 = `0,${a} ${b},${a} ${b},0`; // bottom-left, rotated
  const triangle2 = `0,0 0,${a} ${b},0`; // top-left

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Prueba Visual
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Por qué siempre funciona? Veamos una demostración elegante
        </p>
      </div>

      {/* Phase indicator */}
      <div className="flex justify-center items-center gap-2">
        {PHASES.map((phase, i) => (
          <div
            key={phase.id}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              i === phaseIndex
                ? 'bg-green-500 scale-125'
                : i < phaseIndex
                ? 'bg-green-400'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Current phase info */}
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
          {PHASES[phaseIndex].title}
        </span>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {PHASES[phaseIndex].description}
        </p>
      </div>

      {/* Proof visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
        <div className="flex justify-center">
          <svg viewBox="-20 -20 340 200" className="w-full max-w-2xl h-64">
            {/* Background grid */}
            <defs>
              <pattern id="proofGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect x="-20" y="-20" width="340" height="200" fill="url(#proofGrid)" className="dark:opacity-20" />

            {/* LEFT SIDE: First arrangement (4 triangles around c² square) */}
            <g className={cn('transition-all duration-700', currentPhase === 'intro' ? 'opacity-100' : 'opacity-100')}>
              {/* Outer square outline */}
              <rect
                x="0" y="0"
                width={size} height={size}
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeDasharray={currentPhase === 'intro' ? '0' : '5,5'}
                className={cn(currentPhase !== 'intro' && currentPhase !== 'step1' && currentPhase !== 'step2' && 'opacity-50')}
              />

              {/* Four triangles - arrangement 1 (around c² square) */}
              {(currentPhase === 'step1' || currentPhase === 'step2') && (
                <>
                  {/* Triangle 1: bottom-left */}
                  <polygon
                    points={`0,${size} ${b},${size} 0,${size - a}`}
                    fill="#3B82F6"
                    fillOpacity="0.7"
                    stroke="#1E40AF"
                    strokeWidth="2"
                    className="transition-all duration-700"
                  />
                  {/* Triangle 2: bottom-right */}
                  <polygon
                    points={`${b},${size} ${size},${size} ${size},${size - a}`}
                    fill="#10B981"
                    fillOpacity="0.7"
                    stroke="#047857"
                    strokeWidth="2"
                    className="transition-all duration-700"
                  />
                  {/* Triangle 3: top-right */}
                  <polygon
                    points={`${size},${size - a} ${size},0 ${size - b},0`}
                    fill="#F59E0B"
                    fillOpacity="0.7"
                    stroke="#B45309"
                    strokeWidth="2"
                    className="transition-all duration-700"
                  />
                  {/* Triangle 4: top-left */}
                  <polygon
                    points={`${size - b},0 0,0 0,${size - a}`}
                    fill="#EF4444"
                    fillOpacity="0.7"
                    stroke="#B91C1C"
                    strokeWidth="2"
                    className="transition-all duration-700"
                  />

                  {/* Inner c² square */}
                  <polygon
                    points={`0,${size - a} ${b},${size} ${size},${size - a} ${size - b},0`}
                    fill="#8B5CF6"
                    fillOpacity="0.3"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    className="transition-all duration-700"
                  />

                  {/* c² label */}
                  <text x={size / 2} y={size / 2 + 5} textAnchor="middle" className="text-lg font-bold fill-purple-600">
                    c²
                  </text>
                </>
              )}

              {/* Single triangle for intro */}
              {currentPhase === 'intro' && (
                <g>
                  <polygon
                    points={`20,${size - 20} ${20 + b},${size - 20} 20,${size - 20 - a}`}
                    fill="#3B82F6"
                    fillOpacity="0.7"
                    stroke="#1E40AF"
                    strokeWidth="2"
                  />
                  {/* Labels */}
                  <text x="5" y={size - 20 - a / 2} textAnchor="middle" className="text-sm font-bold fill-blue-600">a</text>
                  <text x={20 + b / 2} y={size - 5} textAnchor="middle" className="text-sm font-bold fill-green-600">b</text>
                  <text x={20 + b / 2 + 10} y={size - 20 - a / 2 - 5} textAnchor="middle" className="text-sm font-bold fill-amber-600">c</text>
                </g>
              )}
            </g>

            {/* RIGHT SIDE: Second arrangement (a² and b² squares) */}
            <g className={cn(
              'transition-all duration-700',
              currentPhase === 'step3' || currentPhase === 'conclusion' ? 'opacity-100' : 'opacity-0'
            )}>
              {/* Offset for right side */}
              <g transform="translate(170, 0)">
                {/* Outer square outline */}
                <rect
                  x="0" y="0"
                  width={size} height={size}
                  fill="none"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="opacity-50"
                />

                {/* Triangle 1: top-left */}
                <polygon
                  points={`0,0 ${b},0 0,${a}`}
                  fill="#3B82F6"
                  fillOpacity="0.7"
                  stroke="#1E40AF"
                  strokeWidth="2"
                />
                {/* Triangle 2: top-right of a² */}
                <polygon
                  points={`${b},0 ${b},${a} ${size},${a}`}
                  fill="#10B981"
                  fillOpacity="0.7"
                  stroke="#047857"
                  strokeWidth="2"
                />
                {/* Triangle 3: bottom-left of b² */}
                <polygon
                  points={`0,${a} ${b},${a} 0,${size}`}
                  fill="#F59E0B"
                  fillOpacity="0.7"
                  stroke="#B45309"
                  strokeWidth="2"
                />
                {/* Triangle 4: bottom-right */}
                <polygon
                  points={`${b},${a} ${b},${size} ${size},${size}`}
                  fill="#EF4444"
                  fillOpacity="0.7"
                  stroke="#B91C1C"
                  strokeWidth="2"
                />

                {/* a² square */}
                <rect
                  x={b} y={0}
                  width={a} height={a}
                  fill="#3B82F6"
                  fillOpacity="0.2"
                  stroke="#1E40AF"
                  strokeWidth="2"
                />
                <text x={b + a / 2} y={a / 2 + 5} textAnchor="middle" className="text-sm font-bold fill-blue-600">
                  a²
                </text>

                {/* b² square */}
                <rect
                  x={0} y={a}
                  width={b} height={b}
                  fill="#10B981"
                  fillOpacity="0.2"
                  stroke="#047857"
                  strokeWidth="2"
                />
                <text x={b / 2} y={a + b / 2 + 5} textAnchor="middle" className="text-sm font-bold fill-green-600">
                  b²
                </text>
              </g>
            </g>

            {/* Equals sign between arrangements */}
            {(currentPhase === 'step3' || currentPhase === 'conclusion') && (
              <text x="155" y={size / 2 + 5} textAnchor="middle" className="text-3xl font-bold fill-gray-600 dark:fill-gray-400">
                =
              </text>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded" />
            <span className="text-gray-600 dark:text-gray-400">Triángulo 1</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span className="text-gray-600 dark:text-gray-400">Triángulo 2</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-amber-500 rounded" />
            <span className="text-gray-600 dark:text-gray-400">Triángulo 3</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded" />
            <span className="text-gray-600 dark:text-gray-400">Triángulo 4</span>
          </div>
        </div>
      </div>

      {/* Explanation for current phase */}
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6">
        {currentPhase === 'intro' && (
          <p className="text-green-800 dark:text-green-200">
            Empezamos con un triángulo rectángulo con catetos <strong>a</strong> y <strong>b</strong>, e hipotenusa <strong>c</strong>.
          </p>
        )}
        {currentPhase === 'step1' && (
          <p className="text-green-800 dark:text-green-200">
            Hacemos 4 copias del triángulo y las colocamos dentro de un cuadrado de lado <strong>(a + b)</strong>.
            En el centro queda un cuadrado de lado <strong>c</strong>.
          </p>
        )}
        {currentPhase === 'step2' && (
          <div className="text-green-800 dark:text-green-200">
            <p className="mb-2">El área total del cuadrado grande es:</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
              <MathDisplay latex="(a + b)^2 = 4 \cdot \frac{ab}{2} + c^2" />
            </div>
          </div>
        )}
        {currentPhase === 'step3' && (
          <div className="text-green-800 dark:text-green-200">
            <p className="mb-2">Ahora reorganizamos los mismos 4 triángulos en las esquinas.</p>
            <p>El área total sigue siendo <strong>(a + b)²</strong>, pero ahora vemos:</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center mt-2">
              <MathDisplay latex="(a + b)^2 = 4 \cdot \frac{ab}{2} + a^2 + b^2" />
            </div>
          </div>
        )}
        {currentPhase === 'conclusion' && (
          <div className="text-green-800 dark:text-green-200">
            <p className="mb-2">Como ambos arreglos tienen el mismo área total y los mismos 4 triángulos:</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
              <MathDisplay latex="c^2 = a^2 + b^2" displayMode />
            </div>
            <p className="mt-2 text-center font-bold">¡El teorema queda demostrado!</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {currentPhase !== 'conclusion' ? (
          <>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <RotateCcw size={18} />
              <span>Reiniciar</span>
            </button>
            <button
              onClick={handleNextPhase}
              disabled={isAnimating}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Siguiente</span>
              <ChevronRight size={18} />
            </button>
          </>
        ) : showComplete && (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
