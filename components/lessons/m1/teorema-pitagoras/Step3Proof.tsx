'use client';

import { useState } from 'react';
import { ArrowRight, RotateCcw, ChevronRight, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import MathDisplay from '@/components/math/MathDisplay';

type ProofPhase = 'goal' | 'setup' | 'arrange1' | 'arrange2' | 'conclusion';

const PHASES: { id: ProofPhase; title: string; description: string }[] = [
  {
    id: 'goal',
    title: 'Objetivo',
    description: '¿Por qué a² + b² = c² funciona SIEMPRE?'
  },
  {
    id: 'setup',
    title: 'Preparación',
    description: 'Construimos un cuadrado grande de lado (a + b)'
  },
  {
    id: 'arrange1',
    title: 'Primer arreglo',
    description: '4 triángulos + cuadrado c² en el centro'
  },
  {
    id: 'arrange2',
    title: 'Segundo arreglo',
    description: '4 triángulos + cuadrados a² y b²'
  },
  {
    id: 'conclusion',
    title: '¡Conclusión!',
    description: 'Los mismos triángulos, diferente espacio libre'
  },
];

export default function Step3Proof({ onComplete, isActive }: LessonStepProps) {
  const [currentPhase, setCurrentPhase] = useState<ProofPhase>('goal');
  const [showComplete, setShowComplete] = useState(false);

  // Triangle dimensions (scaled for visualization)
  const a = 50;
  const b = 70;
  const size = a + b; // 120

  const phaseIndex = PHASES.findIndex(p => p.id === currentPhase);

  const handleNextPhase = () => {
    const nextIndex = phaseIndex + 1;
    if (nextIndex < PHASES.length) {
      setCurrentPhase(PHASES[nextIndex].id);

      if (PHASES[nextIndex].id === 'conclusion') {
        setTimeout(() => setShowComplete(true), 1000);
      }
    }
  };

  const handleReset = () => {
    setCurrentPhase('goal');
    setShowComplete(false);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Prueba Visual
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Vamos a demostrar por qué el teorema siempre funciona
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
        <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
          {PHASES[phaseIndex].description}
        </p>
      </div>

      {/* Proof visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
        {currentPhase === 'goal' ? (
          // Goal phase - no diagram yet
          <div className="flex flex-col items-center justify-center py-8">
            <Target className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-md">
              Ya descubriste que <MathDisplay latex="a^2 + b^2 = c^2" /> funciona para varios triángulos.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-md mt-2">
              Ahora vamos a <strong>demostrar</strong> que funciona para <strong>TODOS</strong>.
            </p>
          </div>
        ) : currentPhase === 'setup' ? (
          // Setup phase - show empty square
          <div className="flex justify-center">
            <svg viewBox="-10 -10 160 160" className="w-full max-w-xs h-auto">
              <rect
                x="0" y="0"
                width={size} height={size}
                fill="#F3F4F6"
                stroke="#6B7280"
                strokeWidth="2"
              />
              {/* Dimension labels */}
              <text x={size / 2} y={-3} textAnchor="middle" className="text-xs fill-gray-500">a + b</text>
              <text x={size + 5} y={size / 2} className="text-xs fill-gray-500">a + b</text>

              {/* Side breakdown on top */}
              <line x1="0" y1="-8" x2={b} y2="-8" stroke="#10B981" strokeWidth="2" />
              <line x1={b} y1="-8" x2={size} y2="-8" stroke="#3B82F6" strokeWidth="2" />
              <text x={b / 2} y="-12" textAnchor="middle" className="text-[10px] fill-green-600">b</text>
              <text x={b + a / 2} y="-12" textAnchor="middle" className="text-[10px] fill-blue-600">a</text>
            </svg>
          </div>
        ) : currentPhase === 'arrange1' || currentPhase === 'arrange2' || currentPhase === 'conclusion' ? (
          // Show both arrangements side by side
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {/* First arrangement */}
            <div className={cn(
              'flex flex-col items-center transition-opacity duration-500',
              (currentPhase === 'arrange2' || currentPhase === 'conclusion') ? 'opacity-100' : 'opacity-100'
            )}>
              <span className="text-xs text-gray-500 mb-2">Arreglo 1</span>
              <svg viewBox="-5 -5 130 130" className="w-32 h-32 md:w-40 md:h-40">
                {/* Outer square */}
                <rect x="0" y="0" width={size} height={size} fill="none" stroke="#9CA3AF" strokeWidth="1" />

                {/* Four triangles around c² */}
                <polygon points={`0,${size} ${b},${size} 0,${size - a}`} fill="#3B82F6" fillOpacity="0.7" stroke="#1E40AF" strokeWidth="1" />
                <polygon points={`${b},${size} ${size},${size} ${size},${size - a}`} fill="#10B981" fillOpacity="0.7" stroke="#047857" strokeWidth="1" />
                <polygon points={`${size},${size - a} ${size},0 ${size - b},0`} fill="#F59E0B" fillOpacity="0.7" stroke="#B45309" strokeWidth="1" />
                <polygon points={`${size - b},0 0,0 0,${size - a}`} fill="#EF4444" fillOpacity="0.7" stroke="#B91C1C" strokeWidth="1" />

                {/* Inner c² square */}
                <polygon
                  points={`0,${size - a} ${b},${size} ${size},${size - a} ${size - b},0`}
                  fill="#8B5CF6"
                  fillOpacity="0.3"
                  stroke="#7C3AED"
                  strokeWidth="2"
                />
                <text x={size / 2} y={size / 2 + 4} textAnchor="middle" className="text-sm font-bold fill-purple-600">c²</text>
              </svg>
            </div>

            {/* Equals sign */}
            {(currentPhase === 'arrange2' || currentPhase === 'conclusion') && (
              <span className="text-3xl font-bold text-gray-400">=</span>
            )}

            {/* Second arrangement */}
            {(currentPhase === 'arrange2' || currentPhase === 'conclusion') && (
              <div className="flex flex-col items-center animate-fadeIn">
                <span className="text-xs text-gray-500 mb-2">Arreglo 2</span>
                <svg viewBox="-5 -5 130 130" className="w-32 h-32 md:w-40 md:h-40">
                  {/* Outer square */}
                  <rect x="0" y="0" width={size} height={size} fill="none" stroke="#9CA3AF" strokeWidth="1" />

                  {/* Four triangles in corners */}
                  <polygon points={`0,0 ${b},0 0,${a}`} fill="#3B82F6" fillOpacity="0.7" stroke="#1E40AF" strokeWidth="1" />
                  <polygon points={`${b},0 ${b},${a} ${size},${a}`} fill="#10B981" fillOpacity="0.7" stroke="#047857" strokeWidth="1" />
                  <polygon points={`0,${a} ${b},${a} 0,${size}`} fill="#F59E0B" fillOpacity="0.7" stroke="#B45309" strokeWidth="1" />
                  <polygon points={`${b},${a} ${b},${size} ${size},${size}`} fill="#EF4444" fillOpacity="0.7" stroke="#B91C1C" strokeWidth="1" />

                  {/* a² square */}
                  <rect x={b} y={0} width={a} height={a} fill="#3B82F6" fillOpacity="0.2" stroke="#1E40AF" strokeWidth="2" />
                  <text x={b + a / 2} y={a / 2 + 4} textAnchor="middle" className="text-xs font-bold fill-blue-600">a²</text>

                  {/* b² square */}
                  <rect x={0} y={a} width={b} height={b} fill="#10B981" fillOpacity="0.2" stroke="#047857" strokeWidth="2" />
                  <text x={b / 2} y={a + b / 2 + 4} textAnchor="middle" className="text-xs font-bold fill-green-600">b²</text>
                </svg>
              </div>
            )}
          </div>
        ) : null}

        {/* Legend */}
        {(currentPhase !== 'goal' && currentPhase !== 'setup') && (
          <div className="flex justify-center gap-3 mt-4 text-xs flex-wrap">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <span className="text-gray-600 dark:text-gray-400">Triángulo</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded" />
              <span className="text-gray-600 dark:text-gray-400">Triángulo</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-amber-500 rounded" />
              <span className="text-gray-600 dark:text-gray-400">Triángulo</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded" />
              <span className="text-gray-600 dark:text-gray-400">Triángulo</span>
            </div>
          </div>
        )}
      </div>

      {/* Explanation for current phase */}
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6">
        {currentPhase === 'goal' && (
          <div className="text-green-800 dark:text-green-200">
            <p className="mb-2">
              <strong>La idea clave:</strong> Vamos a usar los mismos 4 triángulos y
              acomodarlos de dos formas diferentes dentro del mismo cuadrado grande.
            </p>
            <p>
              Si el espacio libre es diferente en cada arreglo, ¡eso nos dará la prueba!
            </p>
          </div>
        )}
        {currentPhase === 'setup' && (
          <div className="text-green-800 dark:text-green-200">
            <p className="mb-2">
              Construimos un cuadrado grande de lado <strong>(a + b)</strong>.
            </p>
            <p>
              Ahora vamos a llenar este cuadrado con <strong>4 copias idénticas</strong> de nuestro triángulo rectángulo.
            </p>
          </div>
        )}
        {currentPhase === 'arrange1' && (
          <div className="text-green-800 dark:text-green-200">
            <p className="mb-2">
              <strong>Primer arreglo:</strong> Colocamos los 4 triángulos rotados alrededor del centro.
            </p>
            <p>
              El espacio vacío en el medio forma un <strong>cuadrado de lado c</strong> (la hipotenusa).
            </p>
            <p className="mt-2 font-medium">
              Área vacía = c²
            </p>
          </div>
        )}
        {currentPhase === 'arrange2' && (
          <div className="text-green-800 dark:text-green-200">
            <p className="mb-2">
              <strong>Segundo arreglo:</strong> Los MISMOS 4 triángulos, pero acomodados en las esquinas.
            </p>
            <p>
              Ahora el espacio vacío son <strong>dos cuadrados</strong>: uno de lado <strong>a</strong> y otro de lado <strong>b</strong>.
            </p>
            <p className="mt-2 font-medium">
              Área vacía = a² + b²
            </p>
          </div>
        )}
        {currentPhase === 'conclusion' && (
          <div className="text-green-800 dark:text-green-200 space-y-3">
            <p>
              <strong>¡La prueba!</strong> Los dos arreglos usan el MISMO cuadrado grande y
              los MISMOS 4 triángulos.
            </p>
            <p>
              Entonces el espacio vacío debe ser igual:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Espacio vacío en Arreglo 1 = Espacio vacío en Arreglo 2
              </p>
              <MathDisplay latex="c^2 = a^2 + b^2" displayMode />
            </div>
            <p className="text-center font-bold text-lg">
              ¡El Teorema de Pitágoras queda demostrado!
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {currentPhase !== 'conclusion' ? (
          <>
            {currentPhase !== 'goal' && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
                <span>Reiniciar</span>
              </button>
            )}
            <button
              onClick={handleNextPhase}
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
