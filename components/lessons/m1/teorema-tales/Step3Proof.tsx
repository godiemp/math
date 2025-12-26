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
  | 'draw-heights'    // Draw heights from D and E to BC
  | 'area-intro'      // Explain area comparison
  | 'area-ADE'        // Highlight triangle ADE
  | 'area-BDE'        // Highlight triangle BDE
  | 'area-CDE'        // Highlight triangle CDE
  | 'equal-base'      // BDE and CDE share base DE
  | 'equal-height'    // Equal heights (parallel lines)
  | 'conclude-equal'  // Area(BDE) = Area(CDE)
  | 'ratio-setup'     // Derive ratio equations
  | 'conclude';       // Final theorem statement

const PHASE_ORDER: ProofPhase[] = [
  'intro', 'setup-triangle', 'draw-parallel', 'mark-D', 'mark-E',
  'label-segments', 'draw-heights', 'area-intro', 'area-ADE',
  'area-BDE', 'area-CDE', 'equal-base', 'equal-height',
  'conclude-equal', 'ratio-setup', 'conclude'
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
    const autoAdvancePhases: ProofPhase[] = ['mark-D', 'mark-E', 'label-segments'];
    if (autoAdvancePhases.includes(phase)) {
      const timer = setTimeout(() => {
        const nextIndex = PHASE_ORDER.indexOf(phase) + 1;
        if (nextIndex < PHASE_ORDER.length) {
          setPhase(PHASE_ORDER[nextIndex]);
        }
      }, 1000);
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
  const showHeights = currentIndex >= 6;
  const showTriangleADE = currentIndex >= 8;
  const showTriangleBDE = currentIndex >= 9;
  const showTriangleCDE = currentIndex >= 10;
  const highlightBase = currentIndex >= 11;
  const highlightHeights = currentIndex >= 12;

  // Phase descriptions
  const getPhaseDescription = () => {
    switch (phase) {
      case 'intro': return 'Vamos a demostrar por que el teorema siempre funciona';
      case 'setup-triangle': return 'Empezamos con un triangulo cualquiera ABC';
      case 'draw-parallel': return 'Trazamos una linea paralela a BC';
      case 'mark-D': return 'Esta linea corta AB en el punto D...';
      case 'mark-E': return '...y corta AC en el punto E';
      case 'label-segments': return 'Ahora tenemos los segmentos AD, DB, AE, EC';
      case 'draw-heights': return 'Dibujamos las alturas de los triangulos';
      case 'area-intro': return 'Vamos a comparar las areas de tres triangulos';
      case 'area-ADE': return 'Triangulo ADE (amarillo)';
      case 'area-BDE': return 'Triangulo BDE (azul)';
      case 'area-CDE': return 'Triangulo CDE (verde)';
      case 'equal-base': return 'BDE y CDE comparten la misma base DE';
      case 'equal-height': return 'Como DE || BC, las alturas son IGUALES';
      case 'conclude-equal': return 'Por lo tanto: Area(BDE) = Area(CDE)';
      case 'ratio-setup': return 'Usamos las razones de areas...';
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

            {/* Triangle ADE (yellow) */}
            {showTriangleADE && (
              <polygon
                points={`${A.x},${A.y} ${D.x},${D.y} ${E.x},${E.y}`}
                fill={colors.ADE.fill}
                stroke={colors.ADE.stroke}
                strokeWidth="2"
                className="animate-fadeIn"
                fillOpacity={0.7}
              />
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

            {/* Heights */}
            {showHeights && (
              <g className="animate-fadeIn">
                {/* Height from D to BC */}
                <line
                  x1={D.x}
                  y1={D.y}
                  x2={D.x}
                  y2={220}
                  stroke="#9CA3AF"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
                {/* Height from E to BC */}
                <line
                  x1={E.x}
                  y1={E.y}
                  x2={E.x}
                  y2={220}
                  stroke="#9CA3AF"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
                {/* Height labels */}
                <text x={D.x + 5} y={(D.y + 220) / 2} className="text-xs fill-gray-500">h</text>
                <text x={E.x + 5} y={(E.y + 220) / 2} className="text-xs fill-gray-500">h</text>
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
                Vamos a analizar las areas de los triangulos <strong className="text-amber-600">ADE</strong>,{' '}
                <strong className="text-blue-600">BDE</strong>, y <strong className="text-green-600">CDE</strong>.
              </p>
            )}
            {phase === 'area-ADE' && (
              <p className="text-gray-700 dark:text-gray-300 text-center">
                El triangulo <strong className="text-amber-600">ADE</strong> tiene base DE y altura desde A.
              </p>
            )}
            {phase === 'area-BDE' && (
              <p className="text-gray-700 dark:text-gray-300 text-center">
                El triangulo <strong className="text-blue-600">BDE</strong> tiene base DE y altura desde B.
              </p>
            )}
            {phase === 'area-CDE' && (
              <p className="text-gray-700 dark:text-gray-300 text-center">
                El triangulo <strong className="text-green-600">CDE</strong> tiene base DE y altura desde C.
              </p>
            )}
            {phase === 'equal-base' && (
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Los triangulos <strong className="text-blue-600">BDE</strong> y{' '}
                <strong className="text-green-600">CDE</strong> comparten la misma{' '}
                <strong className="text-amber-600">base DE</strong>.
              </p>
            )}
            {phase === 'equal-height' && (
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Como <strong className="text-red-500">DE || BC</strong>, la distancia entre las lineas paralelas
                es constante. ¡Las alturas desde B y C a DE son <strong className="text-green-600">IGUALES</strong>!
              </p>
            )}
            {phase === 'conclude-equal' && (
              <div className="text-center space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  Misma base + misma altura = <strong className="text-green-600">misma area</strong>
                </p>
                <MathDisplay latex="\text{Area}(BDE) = \text{Area}(CDE)" />
              </div>
            )}
            {phase === 'ratio-setup' && (
              <div className="text-center space-y-3">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Usando razones de areas con base comun DE:
                </p>
                <div className="space-y-2">
                  <MathDisplay latex="\frac{\text{Area}(ADE)}{\text{Area}(BDE)} = \frac{AD}{DB}" displayMode />
                  <MathDisplay latex="\frac{\text{Area}(ADE)}{\text{Area}(CDE)} = \frac{AE}{EC}" displayMode />
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                  Como Area(BDE) = Area(CDE), entonces:
                </p>
                <MathDisplay latex="\frac{AD}{DB} = \frac{AE}{EC}" displayMode />
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

            {!['mark-D', 'mark-E', 'label-segments'].includes(phase) && (
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
