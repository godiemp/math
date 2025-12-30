'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, RotateCcw, Play, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import MathDisplay from '@/components/math/MathDisplay';

// Granular phases for clear transitions
type ProofPhase =
  | 'intro'           // Explain the strategy
  | 'setup-triangle'  // Draw triangle ABC
  | 'draw-parallel'   // Draw line parallel to BC
  | 'mark-D'          // Mark point D on AB
  | 'mark-E'          // Mark point E on AC
  | 'label-segments'  // Label AD, DB, AE, EC
  | 'area-intro'      // Explain area comparison strategy
  | 'area-BDE'        // Highlight triangle BDE
  | 'area-CDE'        // Highlight triangle CDE
  | 'equal-base'      // BDE and CDE share base DE
  | 'show-heights'    // Show heights from B and C to DE
  | 'equal-height'    // Equal heights (parallel lines)
  | 'conclude-equal'  // Area(BDE) = Area(CDE)
  | 'ratio-explain'   // Explain the ratio relationship
  | 'ratio-setup'     // Derive ratio equations
  | 'conclude';       // Final theorem statement

const PHASE_ORDER: ProofPhase[] = [
  'intro', 'setup-triangle', 'draw-parallel', 'mark-D', 'mark-E',
  'label-segments', 'area-intro', 'area-BDE', 'area-CDE',
  'equal-base', 'show-heights', 'equal-height', 'conclude-equal',
  'ratio-explain', 'ratio-setup', 'conclude'
];

export default function Step3Proof({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<ProofPhase>('intro');

  // Triangle vertices (fixed positions)
  const A = { x: 160, y: 30 };
  const B = { x: 50, y: 220 };
  const C = { x: 300, y: 220 };

  // D on AB at ratio 0.4 from A
  const ratio = 0.4;
  const D = {
    x: A.x + ratio * (B.x - A.x),
    y: A.y + ratio * (B.y - A.y),
  };

  // E on AC at same ratio (parallel line property)
  const E = {
    x: A.x + ratio * (C.x - A.x),
    y: A.y + ratio * (C.y - A.y),
  };

  // Colors for triangles
  const colors = {
    ADE: { fill: '#FEF3C7', stroke: '#D97706' },  // amber
    BDE: { fill: '#DBEAFE', stroke: '#2563EB' },  // blue
    CDE: { fill: '#D1FAE5', stroke: '#059669' },  // green
    main: { fill: '#F3F4F6', stroke: '#6B7280' }, // gray
  };

  // Auto-advance for quick phases
  useEffect(() => {
    const autoAdvancePhases: ProofPhase[] = ['mark-D', 'mark-E'];
    if (autoAdvancePhases.includes(phase)) {
      const timer = setTimeout(() => {
        const nextIndex = PHASE_ORDER.indexOf(phase) + 1;
        if (nextIndex < PHASE_ORDER.length) {
          setPhase(PHASE_ORDER[nextIndex]);
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleNext = () => {
    const currentIndex = PHASE_ORDER.indexOf(phase);
    if (currentIndex < PHASE_ORDER.length - 1) {
      setPhase(PHASE_ORDER[currentIndex + 1]);
    }
  };

  const handleReset = () => {
    setPhase('intro');
  };

  if (!isActive) return null;

  const currentIndex = PHASE_ORDER.indexOf(phase);

  // Visibility helpers
  const showTriangle = currentIndex >= 1;
  const showParallelLine = currentIndex >= 2;
  const showPointD = currentIndex >= 3;
  const showPointE = currentIndex >= 4;
  const showSegmentLabels = currentIndex >= 5;
  const showTriangleBDE = currentIndex >= 7;
  const showTriangleCDE = currentIndex >= 8;
  const highlightBase = currentIndex >= 9;
  const showHeightsFromBC = currentIndex >= 10;
  const highlightHeights = currentIndex >= 11;

  // Phase descriptions
  const getPhaseDescription = () => {
    switch (phase) {
      case 'intro': return 'Vamos a demostrar por que el teorema siempre funciona';
      case 'setup-triangle': return 'Empezamos con un triangulo cualquiera ABC';
      case 'draw-parallel': return 'Trazamos una linea paralela a BC que pasa por el triangulo';
      case 'mark-D': return 'Esta linea corta AB en el punto D...';
      case 'mark-E': return '...y corta AC en el punto E';
      case 'label-segments': return 'Queremos probar que AD/DB = AE/EC';
      case 'area-intro': return 'La clave: comparar las areas de dos triangulos';
      case 'area-BDE': return 'Triangulo BDE (azul) - vertices B, D, E';
      case 'area-CDE': return 'Triangulo CDE (verde) - vertices C, D, E';
      case 'equal-base': return 'Ambos triangulos comparten la misma base DE';
      case 'show-heights': return 'Sus alturas van desde B y C hasta la linea DE';
      case 'equal-height': return '¡Como DE || BC, B y C estan a la MISMA distancia de DE!';
      case 'conclude-equal': return 'Misma base + misma altura = misma area';
      case 'ratio-explain': return 'Ahora usamos una propiedad de triangulos...';
      case 'ratio-setup': return 'Si dos triangulos comparten un vertice...';
      case 'conclude': return '¡El Teorema de Tales queda demostrado!';
      default: return '';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Prueba Visual
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {getPhaseDescription()}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1">
        {['intro', 'setup', 'areas', 'equal', 'conclude'].map((step, i) => {
          let isActive = false;
          let isComplete = false;
          if (step === 'intro') { isActive = currentIndex === 0; isComplete = currentIndex > 0; }
          if (step === 'setup') { isActive = currentIndex >= 1 && currentIndex <= 6; isComplete = currentIndex > 6; }
          if (step === 'areas') { isActive = currentIndex >= 7 && currentIndex <= 10; isComplete = currentIndex > 10; }
          if (step === 'equal') { isActive = currentIndex >= 11 && currentIndex <= 13; isComplete = currentIndex > 13; }
          if (step === 'conclude') { isActive = currentIndex >= 14; }

          return (
            <div
              key={step}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                isActive ? 'bg-green-500 scale-125' :
                isComplete ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          );
        })}
      </div>

      {/* Intro phase */}
      {phase === 'intro' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-4">
          <div className="text-center space-y-3">
            <p className="text-gray-700 dark:text-gray-300">
              Vamos a usar <strong>areas de triangulos</strong> para demostrar que los segmentos son proporcionales.
            </p>

            {/* Preview */}
            <div className="flex justify-center my-4">
              <svg viewBox="0 0 200 140" className="w-48 border border-gray-200 dark:border-gray-600 rounded">
                <polygon points="100,10 30,130 180,130" fill="#F3F4F6" stroke="#6B7280" strokeWidth="2" />
                {/* Points D and E */}
                <circle cx="58" cy="58" r="4" fill="#3B82F6" />
                <circle cx="142" cy="58" r="4" fill="#3B82F6" />
                {/* Dashed line DE - exactly between the points */}
                <line x1="62" y1="58" x2="138" y2="58" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,3" />
                {/* Labels */}
                <text x="48" y="62" className="text-xs fill-blue-600 font-bold">D</text>
                <text x="146" y="62" className="text-xs fill-blue-600 font-bold">E</text>
                {/* Parallel indicator - centered above line */}
                <text x="100" y="48" textAnchor="middle" className="text-xs fill-red-500 font-semibold">
                  DE paralela a BC
                </text>
                <text x="100" y="100" textAnchor="middle" className="text-xs fill-gray-500">
                  AD/DB = AE/EC
                </text>
              </svg>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              La clave es que cuando una linea es <strong>paralela</strong> a un lado del triangulo,
              crea triangulos con <strong>areas relacionadas</strong>.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
            >
              <Play size={18} />
              Comenzar la prueba
            </button>
          </div>
        </div>
      )}

      {/* Main visualization */}
      {phase !== 'intro' && phase !== 'conclude' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          <svg viewBox="0 0 350 260" className="w-full max-w-lg mx-auto">
            {/* Main triangle ABC */}
            {showTriangle && (
              <g className="animate-fadeIn">
                <polygon
                  points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
                  fill={colors.main.fill}
                  stroke={colors.main.stroke}
                  strokeWidth="2"
                  className="dark:fill-gray-700"
                />

                {/* Vertex labels */}
                <text x={A.x} y={A.y - 10} textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">A</text>
                <text x={B.x - 15} y={B.y + 5} textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">B</text>
                <text x={C.x + 15} y={C.y + 5} textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">C</text>
              </g>
            )}

            {/* Triangle BDE (blue) */}
            {showTriangleBDE && (
              <polygon
                points={`${B.x},${B.y} ${D.x},${D.y} ${E.x},${E.y}`}
                fill={colors.BDE.fill}
                stroke={colors.BDE.stroke}
                strokeWidth="2"
                className="animate-fadeIn"
                fillOpacity={0.7}
              />
            )}

            {/* Triangle CDE (green) */}
            {showTriangleCDE && (
              <polygon
                points={`${C.x},${C.y} ${D.x},${D.y} ${E.x},${E.y}`}
                fill={colors.CDE.fill}
                stroke={colors.CDE.stroke}
                strokeWidth="2"
                className="animate-fadeIn"
                fillOpacity={0.7}
              />
            )}

            {/* Triangle ADE (amber) - shown in ratio phases */}
            {(phase === 'ratio-explain' || phase === 'ratio-setup') && (
              <polygon
                points={`${A.x},${A.y} ${D.x},${D.y} ${E.x},${E.y}`}
                fill={colors.ADE.fill}
                stroke={colors.ADE.stroke}
                strokeWidth="2"
                className="animate-fadeIn"
                fillOpacity={0.7}
              />
            )}

            {/* Parallel line DE */}
            {showParallelLine && (
              <g className="animate-fadeIn">
                <line
                  x1={D.x - 20}
                  y1={D.y}
                  x2={E.x + 20}
                  y2={E.y}
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeDasharray="6,3"
                />
                {/* Parallel symbol */}
                <text x={(D.x + E.x) / 2} y={D.y - 10} textAnchor="middle" className="text-xs fill-red-500 font-bold">
                  DE || BC
                </text>
              </g>
            )}

            {/* Point D */}
            {showPointD && (
              <g className="animate-fadeIn">
                <circle cx={D.x} cy={D.y} r="6" fill="#3B82F6" className="animate-pulse" />
                <text x={D.x - 15} y={D.y - 5} className="text-sm font-bold fill-blue-600">D</text>
              </g>
            )}

            {/* Point E */}
            {showPointE && (
              <g className="animate-fadeIn">
                <circle cx={E.x} cy={E.y} r="6" fill="#3B82F6" className="animate-pulse" />
                <text x={E.x + 10} y={E.y - 5} className="text-sm font-bold fill-blue-600">E</text>
              </g>
            )}

            {/* Segment labels */}
            {showSegmentLabels && (
              <g className="animate-fadeIn text-xs font-bold">
                {/* AD */}
                <text x={(A.x + D.x) / 2 - 15} y={(A.y + D.y) / 2} className="fill-purple-600">AD</text>
                {/* DB */}
                <text x={(D.x + B.x) / 2 - 15} y={(D.y + B.y) / 2} className="fill-purple-600">DB</text>
                {/* AE */}
                <text x={(A.x + E.x) / 2 + 10} y={(A.y + E.y) / 2} className="fill-purple-600">AE</text>
                {/* EC */}
                <text x={(E.x + C.x) / 2 + 10} y={(E.y + C.y) / 2} className="fill-purple-600">EC</text>
              </g>
            )}

            {/* Heights from B and C to line DE */}
            {showHeightsFromBC && (
              <g className="animate-fadeIn">
                {/* Height from B to line DE (perpendicular) */}
                <line
                  x1={B.x}
                  y1={B.y}
                  x2={B.x + (D.y - B.y) * 0.3}
                  y2={D.y}
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeDasharray="4"
                />
                {/* Height from C to line DE (perpendicular) */}
                <line
                  x1={C.x}
                  y1={C.y}
                  x2={C.x - (C.y - E.y) * 0.3}
                  y2={E.y}
                  stroke="#059669"
                  strokeWidth="2"
                  strokeDasharray="4"
                />
                {/* Height labels */}
                <text x={B.x + 15} y={(B.y + D.y) / 2} className="text-sm fill-blue-600 font-bold">h</text>
                <text x={C.x - 25} y={(C.y + E.y) / 2} className="text-sm fill-green-600 font-bold">h</text>
              </g>
            )}

            {/* Highlight base DE */}
            {highlightBase && (
              <line
                x1={D.x}
                y1={D.y}
                x2={E.x}
                y2={E.y}
                stroke="#F59E0B"
                strokeWidth="4"
                className="animate-pulse"
              />
            )}

            {/* Equal height indicators */}
            {highlightHeights && (
              <g className="animate-fadeIn">
                <text x={(D.x + E.x) / 2} y={(D.y + 220) / 2 + 20} textAnchor="middle" className="text-sm fill-green-600 font-bold">
                  Alturas iguales
                </text>
              </g>
            )}
          </svg>

          {/* Phase explanation */}
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {phase === 'area-intro' && (
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Vamos a demostrar que los triangulos <strong className="text-blue-600">BDE</strong> y{' '}
                <strong className="text-green-600">CDE</strong> tienen la <strong>misma area</strong>.
              </p>
            )}
            {phase === 'area-BDE' && (
              <div className="text-center space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  El triangulo <strong className="text-blue-600">BDE</strong> tiene:
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Base = <strong>DE</strong> y Altura = distancia de <strong>B</strong> a la linea DE
                </p>
              </div>
            )}
            {phase === 'area-CDE' && (
              <div className="text-center space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  El triangulo <strong className="text-green-600">CDE</strong> tiene:
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Base = <strong>DE</strong> y Altura = distancia de <strong>C</strong> a la linea DE
                </p>
              </div>
            )}
            {phase === 'equal-base' && (
              <div className="text-center space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  Ambos triangulos comparten la misma <strong className="text-amber-600">base DE</strong>.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Si tambien tienen la misma altura, ¡tendran la misma area!
                </p>
              </div>
            )}
            {phase === 'show-heights' && (
              <div className="text-center space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  Las alturas son las distancias <strong>perpendiculares</strong> desde B y C hasta la linea DE.
                </p>
              </div>
            )}
            {phase === 'equal-height' && (
              <div className="text-center space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  Como <strong className="text-red-500">DE es paralela a BC</strong>, ambos puntos B y C
                  estan a la <strong className="text-green-600">misma distancia</strong> de la linea DE.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  (La distancia entre lineas paralelas es constante)
                </p>
              </div>
            )}
            {phase === 'conclude-equal' && (
              <div className="text-center space-y-3">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Misma base</strong> (DE) + <strong>misma altura</strong> (h) = <strong className="text-green-600">misma area</strong>
                </p>
                <div className="bg-green-100 dark:bg-green-900/40 rounded-lg p-3">
                  <MathDisplay latex="\text{Area}(BDE) = \text{Area}(CDE)" />
                </div>
              </div>
            )}
            {phase === 'ratio-explain' && (
              <div className="text-center space-y-3">
                <p className="text-gray-700 dark:text-gray-300">
                  Ahora consideramos el triangulo <strong className="text-amber-600">ADE</strong> (el pequeño de arriba).
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Los triangulos ADE y BDE comparten el <strong>vertice E</strong>.
                  <br />
                  Por eso: Area(ADE)/Area(BDE) = AD/DB
                </p>
              </div>
            )}
            {phase === 'ratio-setup' && (
              <div className="text-center space-y-3">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Triangulos que comparten un vertice: su razon de areas = razon de bases
                </p>
                <div className="space-y-2">
                  <MathDisplay latex="\frac{\text{Area}(ADE)}{\text{Area}(BDE)} = \frac{AD}{DB}" displayMode />
                  <MathDisplay latex="\frac{\text{Area}(ADE)}{\text{Area}(CDE)} = \frac{AE}{EC}" displayMode />
                </div>
                <div className="bg-green-100 dark:bg-green-900/40 rounded-lg p-3 mt-2">
                  <p className="text-sm text-green-700 dark:text-green-300 font-semibold mb-2">
                    Como Area(BDE) = Area(CDE):
                  </p>
                  <MathDisplay latex="\frac{AD}{DB} = \frac{AE}{EC}" displayMode />
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              <RotateCcw size={16} />
              Reiniciar
            </button>

            {!['mark-D', 'mark-E'].includes(phase) && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
              >
                Siguiente
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Conclusion phase */}
      {phase === 'conclude' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border-2 border-green-300 dark:border-green-700">
            <h3 className="text-xl font-bold text-green-700 dark:text-green-300 text-center mb-4">
              ¡Teorema de Tales Demostrado!
            </h3>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Hemos demostrado que si una linea es <strong>paralela</strong> a un lado de un triangulo,
                entonces divide a los otros dos lados en segmentos <strong>proporcionales</strong>.
              </p>

              <div className="text-2xl">
                <MathDisplay latex="\text{Si } DE \parallel BC \text{, entonces } \frac{AD}{DB} = \frac{AE}{EC}" displayMode />
              </div>

              <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>La clave:</strong> Los triangulos BDE y CDE tienen la misma area porque
                  comparten base (DE) y tienen alturas iguales (distancia entre lineas paralelas).
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <RotateCcw size={16} />
              Ver de nuevo
            </button>

            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
            >
              Continuar
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
