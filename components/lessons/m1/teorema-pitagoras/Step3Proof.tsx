'use client';

import { useState } from 'react';
import { ArrowRight, RotateCcw, ChevronRight, Target, Shuffle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import MathDisplay from '@/components/math/MathDisplay';

type ProofPhase = 'goal' | 'setup' | 'arrange1' | 'rearrange' | 'arrange2' | 'conclusion';

const PHASES: { id: ProofPhase; title: string }[] = [
  { id: 'goal', title: 'Objetivo' },
  { id: 'setup', title: 'Preparación' },
  { id: 'arrange1', title: 'Arreglo 1' },
  { id: 'rearrange', title: '¡Mover!' },
  { id: 'arrange2', title: 'Arreglo 2' },
  { id: 'conclusion', title: 'Conclusión' },
];

export default function Step3Proof({ onComplete, isActive }: LessonStepProps) {
  const [currentPhase, setCurrentPhase] = useState<ProofPhase>('goal');
  const [arrangement, setArrangement] = useState<1 | 2>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  // Triangle dimensions for visualization
  const a = 40; // shorter leg
  const b = 60; // longer leg
  const size = a + b; // 100

  const phaseIndex = PHASES.findIndex(p => p.id === currentPhase);

  // Triangle colors - consistent across both arrangements
  const colors = {
    t1: { fill: '#3B82F6', stroke: '#1E40AF' }, // blue
    t2: { fill: '#10B981', stroke: '#047857' }, // green
    t3: { fill: '#F59E0B', stroke: '#B45309' }, // amber
    t4: { fill: '#EF4444', stroke: '#B91C1C' }, // red
  };

  // Triangle positions for arrangement 1 (around c² center)
  // Each triangle is defined by its 3 vertices
  const arrangement1 = {
    t1: `0,${size} ${b},${size} 0,${size - a}`,           // bottom-left
    t2: `${b},${size} ${size},${size} ${size},${size - a}`, // bottom-right
    t3: `${size},${size - a} ${size},0 ${size - b},0`,      // top-right
    t4: `${size - b},0 0,0 0,${size - a}`,                  // top-left
  };

  // Triangle positions for arrangement 2 (in corners, leaving a² and b²)
  const arrangement2 = {
    t1: `0,0 ${b},0 0,${a}`,                    // top-left corner
    t2: `${size},0 ${size},${a} ${b},${a}`,     // top-right area
    t3: `0,${a} 0,${size} ${b},${size}`,        // bottom-left corner
    t4: `${b},${size} ${size},${size} ${size},${a}`, // bottom-right area
  };

  const handleNextPhase = () => {
    const nextIndex = phaseIndex + 1;
    if (nextIndex < PHASES.length) {
      const nextPhase = PHASES[nextIndex].id;
      setCurrentPhase(nextPhase);

      if (nextPhase === 'conclusion') {
        setTimeout(() => setShowComplete(true), 1500);
      }
    }
  };

  const handleRearrange = () => {
    setIsAnimating(true);
    setArrangement(2);
    // Wait for animation to complete before allowing next
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentPhase('arrange2');
    }, 1500);
  };

  const handleReset = () => {
    setCurrentPhase('goal');
    setArrangement(1);
    setShowComplete(false);
    setIsAnimating(false);
  };

  if (!isActive) return null;

  const showTriangles = currentPhase !== 'goal' && currentPhase !== 'setup';
  const currentArrangement = arrangement === 1 ? arrangement1 : arrangement2;

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
              'w-3 h-3 rounded-full transition-all duration-300',
              i === phaseIndex
                ? 'bg-green-500 scale-125'
                : i < phaseIndex
                ? 'bg-green-400'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Current phase title */}
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
          {PHASES[phaseIndex].title}
        </span>
      </div>

      {/* Main visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        {currentPhase === 'goal' ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Target className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-md">
              Ya descubriste que <MathDisplay latex="a^2 + b^2 = c^2" /> funciona para varios triángulos.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-md mt-2">
              Ahora vamos a <strong>demostrar</strong> que funciona para <strong>TODOS</strong>.
            </p>
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-300 text-center">
                <strong>La clave:</strong> misma área total, diferentes formas de llenarla
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* SVG Canvas */}
            <svg
              viewBox={`-15 -25 ${size + 30} ${size + 40}`}
              className="w-full max-w-sm h-auto"
              style={{ minHeight: '280px' }}
            >
              {/* Dimension labels on top */}
              {currentPhase === 'setup' && (
                <>
                  <line x1="0" y1="-12" x2={b} y2="-12" stroke="#10B981" strokeWidth="2" />
                  <line x1={b} y1="-12" x2={size} y2="-12" stroke="#3B82F6" strokeWidth="2" />
                  <text x={b / 2} y="-16" textAnchor="middle" className="text-xs font-bold fill-green-600">b</text>
                  <text x={b + a / 2} y="-16" textAnchor="middle" className="text-xs font-bold fill-blue-600">a</text>
                </>
              )}

              {/* Outer square */}
              <rect
                x="0" y="0"
                width={size} height={size}
                fill="#F9FAFB"
                stroke="#9CA3AF"
                strokeWidth="2"
                className="dark:fill-gray-700"
              />

              {/* Empty space highlighting */}
              {arrangement === 1 && showTriangles && (
                // c² square in center (tilted)
                <polygon
                  points={`0,${size - a} ${b},${size} ${size},${size - a} ${size - b},0`}
                  fill="#8B5CF6"
                  fillOpacity="0.2"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  strokeDasharray="4"
                  className={cn(
                    'transition-opacity duration-500',
                    (currentPhase === 'arrange1' || currentPhase === 'rearrange') ? 'opacity-100' : 'opacity-0'
                  )}
                />
              )}

              {arrangement === 2 && showTriangles && (
                // a² and b² squares
                <>
                  <rect
                    x={b} y={0}
                    width={a} height={a}
                    fill="#3B82F6"
                    fillOpacity="0.15"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeDasharray="4"
                    className="animate-pulse"
                  />
                  <rect
                    x={0} y={a}
                    width={b} height={b}
                    fill="#10B981"
                    fillOpacity="0.15"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="4"
                    className="animate-pulse"
                  />
                </>
              )}

              {/* Four triangles with smooth transitions */}
              {showTriangles && (
                <>
                  {/* Triangle 1 - Blue */}
                  <g>
                    <polygon
                      points={currentArrangement.t1}
                      fill={colors.t1.fill}
                      fillOpacity="0.8"
                      stroke={colors.t1.stroke}
                      strokeWidth="2"
                      className="transition-all duration-[1500ms] ease-in-out"
                    />
                    {/* Number label */}
                    <text
                      x={arrangement === 1 ? b / 3 : b / 3}
                      y={arrangement === 1 ? size - a / 3 : a / 2}
                      textAnchor="middle"
                      className="text-xs font-bold fill-white"
                    >
                      1
                    </text>
                  </g>

                  {/* Triangle 2 - Green */}
                  <g>
                    <polygon
                      points={currentArrangement.t2}
                      fill={colors.t2.fill}
                      fillOpacity="0.8"
                      stroke={colors.t2.stroke}
                      strokeWidth="2"
                      className="transition-all duration-[1500ms] ease-in-out"
                    />
                    <text
                      x={arrangement === 1 ? b + (size - b) * 2 / 3 : (b + size) / 2}
                      y={arrangement === 1 ? size - a / 3 : a / 2}
                      textAnchor="middle"
                      className="text-xs font-bold fill-white"
                    >
                      2
                    </text>
                  </g>

                  {/* Triangle 3 - Amber */}
                  <g>
                    <polygon
                      points={currentArrangement.t3}
                      fill={colors.t3.fill}
                      fillOpacity="0.8"
                      stroke={colors.t3.stroke}
                      strokeWidth="2"
                      className="transition-all duration-[1500ms] ease-in-out"
                    />
                    <text
                      x={arrangement === 1 ? size - b / 3 : b / 3}
                      y={arrangement === 1 ? a / 2 : a + b / 2}
                      textAnchor="middle"
                      className="text-xs font-bold fill-white"
                    >
                      3
                    </text>
                  </g>

                  {/* Triangle 4 - Red */}
                  <g>
                    <polygon
                      points={currentArrangement.t4}
                      fill={colors.t4.fill}
                      fillOpacity="0.8"
                      stroke={colors.t4.stroke}
                      strokeWidth="2"
                      className="transition-all duration-[1500ms] ease-in-out"
                    />
                    <text
                      x={arrangement === 1 ? (size - b) / 2 : (b + size) / 2}
                      y={arrangement === 1 ? a / 2 : a + (size - a) / 2}
                      textAnchor="middle"
                      className="text-xs font-bold fill-white"
                    >
                      4
                    </text>
                  </g>
                </>
              )}

              {/* Empty space labels */}
              {arrangement === 1 && showTriangles && currentPhase !== 'rearrange' && (
                <text
                  x={size / 2}
                  y={size / 2 + 4}
                  textAnchor="middle"
                  className="text-lg font-bold fill-purple-600"
                >
                  c²
                </text>
              )}

              {arrangement === 2 && showTriangles && (
                <>
                  <text
                    x={b + a / 2}
                    y={a / 2 + 4}
                    textAnchor="middle"
                    className="text-sm font-bold fill-blue-600"
                  >
                    a²
                  </text>
                  <text
                    x={b / 2}
                    y={a + b / 2 + 4}
                    textAnchor="middle"
                    className="text-sm font-bold fill-green-600"
                  >
                    b²
                  </text>
                </>
              )}
            </svg>

            {/* Legend */}
            {showTriangles && (
              <div className="flex justify-center gap-3 mt-4 text-xs flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-[8px] text-white font-bold">1</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center text-[8px] text-white font-bold">2</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-amber-500 rounded flex items-center justify-center text-[8px] text-white font-bold">3</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center text-[8px] text-white font-bold">4</div>
                </div>
                <span className="text-gray-500 dark:text-gray-400 ml-2">= 4 triángulos idénticos</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Explanation for current phase */}
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6">
        {currentPhase === 'goal' && (
          <div className="text-green-800 dark:text-green-200 text-center">
            <p>
              Vamos a usar <strong>4 triángulos iguales</strong> y acomodarlos de <strong>dos formas diferentes</strong> dentro del mismo cuadrado grande.
            </p>
          </div>
        )}

        {currentPhase === 'setup' && (
          <div className="text-green-800 dark:text-green-200 space-y-2">
            <p>
              Empezamos con un <strong>cuadrado grande</strong> de lado (a + b).
            </p>
            <p>
              Su área es <MathDisplay latex="(a+b)^2" /> — sin importar cómo lo llenemos, siempre tendrá la misma área.
            </p>
          </div>
        )}

        {currentPhase === 'arrange1' && (
          <div className="text-green-800 dark:text-green-200 space-y-3">
            <p>
              Colocamos <strong>4 copias idénticas</strong> del triángulo alrededor de los bordes.
            </p>
            <p>
              El <strong>espacio vacío</strong> en el centro forma un cuadrado de lado <strong>c</strong> (la hipotenusa).
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Área total del cuadrado grande:</p>
              <MathDisplay latex="4 \times \frac{1}{2}ab + c^2 = (a+b)^2" />
            </div>
          </div>
        )}

        {currentPhase === 'rearrange' && (
          <div className="text-green-800 dark:text-green-200 text-center space-y-3">
            <p className="text-lg font-semibold">
              ¿Qué pasa si movemos los mismos 4 triángulos a otras posiciones?
            </p>
            <p className="text-sm">
              Observa los números — son los <strong>mismos triángulos</strong>, solo cambian de lugar.
            </p>
          </div>
        )}

        {currentPhase === 'arrange2' && (
          <div className="text-green-800 dark:text-green-200 space-y-3">
            <p>
              ¡<strong>Mismos 4 triángulos</strong>, diferente espacio vacío!
            </p>
            <p>
              Ahora quedan <strong>dos cuadrados</strong>: uno de lado <strong>a</strong> y otro de lado <strong>b</strong>.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Área total (¡la misma!):</p>
              <MathDisplay latex="4 \times \frac{1}{2}ab + a^2 + b^2 = (a+b)^2" />
            </div>
          </div>
        )}

        {currentPhase === 'conclusion' && (
          <div className="text-green-800 dark:text-green-200 space-y-4">
            <p className="text-center">
              <strong>¡La prueba!</strong> Los dos arreglos tienen la <strong>misma área total</strong> y los <strong>mismos 4 triángulos</strong>.
            </p>
            <p className="text-center">
              Entonces el <strong>espacio vacío</strong> debe ser igual:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-2">
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                Espacio vacío en Arreglo 1 = Espacio vacío en Arreglo 2
              </div>
              <div className="text-center">
                <MathDisplay latex="c^2 = a^2 + b^2" displayMode />
              </div>
            </div>
            <p className="text-center font-bold text-lg text-green-700 dark:text-green-300">
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

            {currentPhase === 'rearrange' ? (
              <button
                onClick={handleRearrange}
                disabled={isAnimating}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg',
                  isAnimating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                )}
              >
                <Shuffle size={20} />
                <span>{isAnimating ? 'Moviendo...' : '¡Mover Triángulos!'}</span>
              </button>
            ) : (
              <button
                onClick={handleNextPhase}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
              >
                <span>Siguiente</span>
                <ChevronRight size={18} />
              </button>
            )}
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
