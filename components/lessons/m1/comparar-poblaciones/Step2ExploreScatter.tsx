'use client';

import { useState } from 'react';
import { ArrowRight, Eye, Sparkles, ToggleLeft, ToggleRight, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { ESCUELA_A, ESCUELA_B, POPULATION_COLORS, DataPoint } from './data';

type Phase = 'intro' | 'buildA' | 'buildB' | 'compare' | 'discover';

// Interactive scatter plot component
function InteractiveScatterPlot({
  dataA,
  dataB,
  revealedA,
  revealedB,
  showA = true,
  showB = true,
  highlightedPoint,
  onPointClick,
}: {
  dataA: DataPoint[];
  dataB: DataPoint[];
  revealedA: number;
  revealedB: number;
  showA?: boolean;
  showB?: boolean;
  highlightedPoint?: string | null;
  onPointClick?: (point: DataPoint) => void;
}) {
  // SVG dimensions and scaling
  const width = 320;
  const height = 260;
  const padding = 40;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  // Scale functions (x: 0-10 hours, y: 0-100 score)
  const toSvgX = (x: number) => padding + (x / 10) * plotWidth;
  const toSvgY = (y: number) => height - padding - (y / 100) * plotHeight;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md mx-auto">
      {/* Grid lines - horizontal */}
      {[0, 20, 40, 60, 80, 100].map((y) => (
        <line
          key={`grid-h-${y}`}
          x1={padding}
          y1={toSvgY(y)}
          x2={width - padding}
          y2={toSvgY(y)}
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeWidth="0.5"
          strokeDasharray={y === 0 ? 'none' : '2,2'}
        />
      ))}

      {/* Grid lines - vertical */}
      {[0, 2, 4, 6, 8, 10].map((x) => (
        <line
          key={`grid-v-${x}`}
          x1={toSvgX(x)}
          y1={padding}
          x2={toSvgX(x)}
          y2={height - padding}
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeWidth="0.5"
          strokeDasharray={x === 0 ? 'none' : '2,2'}
        />
      ))}

      {/* Axes */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        className="stroke-gray-600 dark:stroke-gray-400"
        strokeWidth="2"
      />
      <line
        x1={padding}
        y1={height - padding}
        x2={padding}
        y2={padding}
        className="stroke-gray-600 dark:stroke-gray-400"
        strokeWidth="2"
      />

      {/* X-axis labels */}
      {[0, 2, 4, 6, 8, 10].map((x) => (
        <text
          key={`x-label-${x}`}
          x={toSvgX(x)}
          y={height - padding + 16}
          textAnchor="middle"
          className="fill-gray-600 dark:fill-gray-400 text-[10px]"
        >
          {x}
        </text>
      ))}
      <text
        x={width / 2}
        y={height - 8}
        textAnchor="middle"
        className="fill-gray-700 dark:fill-gray-300 text-xs font-medium"
      >
        Horas de estudio
      </text>

      {/* Y-axis labels */}
      {[0, 20, 40, 60, 80, 100].map((y) => (
        <text
          key={`y-label-${y}`}
          x={padding - 8}
          y={toSvgY(y) + 4}
          textAnchor="end"
          className="fill-gray-600 dark:fill-gray-400 text-[10px]"
        >
          {y}
        </text>
      ))}
      <text
        x={12}
        y={height / 2}
        textAnchor="middle"
        className="fill-gray-700 dark:fill-gray-300 text-xs font-medium"
        transform={`rotate(-90, 12, ${height / 2})`}
      >
        Nota
      </text>

      {/* Data points - Escuela A */}
      {showA && dataA.slice(0, revealedA).map((point, index) => (
        <motion.g
          key={point.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <circle
            cx={toSvgX(point.x)}
            cy={toSvgY(point.y)}
            r={highlightedPoint === point.id ? 10 : 7}
            fill={POPULATION_COLORS.A.fill}
            className={cn(
              'transition-all cursor-pointer',
              highlightedPoint === point.id ? 'stroke-white stroke-2' : ''
            )}
            onClick={() => onPointClick?.(point)}
          />
          {highlightedPoint === point.id && (
            <text
              x={toSvgX(point.x)}
              y={toSvgY(point.y) - 14}
              textAnchor="middle"
              className="fill-blue-600 dark:fill-blue-400 text-xs font-bold"
            >
              ({point.x}h, {point.y})
            </text>
          )}
        </motion.g>
      ))}

      {/* Data points - Escuela B */}
      {showB && dataB.slice(0, revealedB).map((point, index) => (
        <motion.g
          key={point.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <circle
            cx={toSvgX(point.x)}
            cy={toSvgY(point.y)}
            r={highlightedPoint === point.id ? 10 : 7}
            fill={POPULATION_COLORS.B.fill}
            className={cn(
              'transition-all cursor-pointer',
              highlightedPoint === point.id ? 'stroke-white stroke-2' : ''
            )}
            onClick={() => onPointClick?.(point)}
          />
          {highlightedPoint === point.id && (
            <text
              x={toSvgX(point.x)}
              y={toSvgY(point.y) - 14}
              textAnchor="middle"
              className="fill-orange-600 dark:fill-orange-400 text-xs font-bold"
            >
              ({point.x}h, {point.y})
            </text>
          )}
        </motion.g>
      ))}

      {/* Legend */}
      {(revealedA > 0 || revealedB > 0) && (
        <g>
          {showA && revealedA > 0 && (
            <g>
              <circle cx={padding + 10} cy={padding - 15} r={5} fill={POPULATION_COLORS.A.fill} />
              <text x={padding + 20} y={padding - 11} className="fill-gray-700 dark:fill-gray-300 text-[10px]">
                Escuela A
              </text>
            </g>
          )}
          {showB && revealedB > 0 && (
            <g>
              <circle cx={padding + 80} cy={padding - 15} r={5} fill={POPULATION_COLORS.B.fill} />
              <text x={padding + 90} y={padding - 11} className="fill-gray-700 dark:fill-gray-300 text-[10px]">
                Escuela B
              </text>
            </g>
          )}
        </g>
      )}
    </svg>
  );
}

export default function Step2ExploreScatter({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [revealedA, setRevealedA] = useState(0);
  const [revealedB, setRevealedB] = useState(0);
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);
  const [highlightedPoint, setHighlightedPoint] = useState<string | null>(null);
  const [discoveryStep, setDiscoveryStep] = useState(0);

  if (!isActive) return null;

  const handlePointClick = (point: DataPoint) => {
    setHighlightedPoint(highlightedPoint === point.id ? null : point.id);
  };

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              El Constructor de Graficos
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Vamos a Construir un Grafico XY
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Cada punto representa un estudiante con sus horas de estudio (X) y su nota (Y)
          </p>
        </div>

        {/* Empty graph preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <InteractiveScatterPlot
            dataA={ESCUELA_A}
            dataB={ESCUELA_B}
            revealedA={0}
            revealedB={0}
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
          <p className="text-gray-700 dark:text-gray-300 text-center">
            Este es un <strong>plano cartesiano</strong> vacio.
            El eje X muestra las horas de estudio (0-10) y el eje Y muestra las notas (0-100).
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('buildA')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>Agregar datos de Escuela A</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: BUILD A ============
  if (phase === 'buildA') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              Escuela A: {revealedA}/{ESCUELA_A.length} estudiantes
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Revelando los Puntos
          </h2>
        </div>

        {/* Graph */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <InteractiveScatterPlot
            dataA={ESCUELA_A}
            dataB={ESCUELA_B}
            revealedA={revealedA}
            revealedB={0}
            showB={false}
            highlightedPoint={highlightedPoint}
            onPointClick={handlePointClick}
          />
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1">
          {ESCUELA_A.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-full transition-colors',
                i < revealedA ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>

        {/* Hint based on progress */}
        {revealedA >= 3 && revealedA < ESCUELA_A.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700"
          >
            <p className="text-blue-800 dark:text-blue-200 text-center">
              <strong>¿Notas algo?</strong> Los puntos empiezan a formar un patron diagonal...
            </p>
          </motion.div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {revealedA < ESCUELA_A.length ? (
            <button
              onClick={() => setRevealedA((r) => Math.min(r + 1, ESCUELA_A.length))}
              className="flex items-center gap-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-xl font-semibold hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
            >
              <Eye size={20} />
              <span>Revelar siguiente punto</span>
            </button>
          ) : (
            <button
              onClick={() => setPhase('buildB')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
            >
              <span>Agregar Escuela B</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>

        {/* Quick reveal all */}
        {revealedA < ESCUELA_A.length && revealedA > 0 && (
          <div className="flex justify-center">
            <button
              onClick={() => setRevealedA(ESCUELA_A.length)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Revelar todos los puntos de A
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 3: BUILD B ============
  if (phase === 'buildB') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
            <div className="w-4 h-4 rounded-full bg-orange-500" />
            <span className="text-orange-700 dark:text-orange-300 font-medium">
              Escuela B: {revealedB}/{ESCUELA_B.length} estudiantes
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Agregando la Segunda Poblacion
          </h2>
        </div>

        {/* Graph */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <InteractiveScatterPlot
            dataA={ESCUELA_A}
            dataB={ESCUELA_B}
            revealedA={ESCUELA_A.length}
            revealedB={revealedB}
            highlightedPoint={highlightedPoint}
            onPointClick={handlePointClick}
          />
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1">
          {ESCUELA_B.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-full transition-colors',
                i < revealedB ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>

        {/* Hint based on progress */}
        {revealedB >= 5 && revealedB < ESCUELA_B.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 border border-orange-200 dark:border-orange-700"
          >
            <p className="text-orange-800 dark:text-orange-200 text-center">
              <strong>Observa:</strong> Los puntos naranjas estan mas dispersos que los azules...
            </p>
          </motion.div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {revealedB < ESCUELA_B.length ? (
            <button
              onClick={() => setRevealedB((r) => Math.min(r + 1, ESCUELA_B.length))}
              className="flex items-center gap-2 px-6 py-3 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-xl font-semibold hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors"
            >
              <Eye size={20} />
              <span>Revelar siguiente punto</span>
            </button>
          ) : (
            <button
              onClick={() => setPhase('compare')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg"
            >
              <span>Comparar poblaciones</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>

        {/* Quick reveal all */}
        {revealedB < ESCUELA_B.length && revealedB > 0 && (
          <div className="flex justify-center">
            <button
              onClick={() => setRevealedB(ESCUELA_B.length)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Revelar todos los puntos de B
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 4: COMPARE ============
  if (phase === 'compare') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300 font-medium">
              Modo Comparacion
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Compara las Dos Poblaciones
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Usa los controles para mostrar u ocultar cada escuela
          </p>
        </div>

        {/* Toggle controls */}
        <div className="flex justify-center gap-6">
          <button
            onClick={() => setShowA(!showA)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
              showA
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
            )}
          >
            {showA ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Escuela A</span>
          </button>
          <button
            onClick={() => setShowB(!showB)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
              showB
                ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
            )}
          >
            {showB ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Escuela B</span>
          </button>
        </div>

        {/* Graph */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <InteractiveScatterPlot
            dataA={ESCUELA_A}
            dataB={ESCUELA_B}
            revealedA={ESCUELA_A.length}
            revealedB={ESCUELA_B.length}
            showA={showA}
            showB={showB}
            highlightedPoint={highlightedPoint}
            onPointClick={handlePointClick}
          />
        </div>

        {/* Observation prompt */}
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <p className="text-purple-800 dark:text-purple-200 text-center">
            <strong>Toca los puntos</strong> para ver las coordenadas exactas de cada estudiante.
            ¿Cual poblacion tiene puntos mas "ordenados"?
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('discover')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Ver los descubrimientos</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 5: DISCOVER ============
  const discoveries = [
    {
      title: 'Escuela A: Correlacion Fuerte',
      description: 'Los puntos azules forman una linea diagonal clara. Mas horas de estudio se traducen consistentemente en mejores notas.',
      color: 'blue',
    },
    {
      title: 'Escuela B: Correlacion Debil',
      description: 'Los puntos naranjas estan mas dispersos. Hay estudiantes con muchas horas y notas bajas, y viceversa.',
      color: 'orange',
    },
    {
      title: 'La Diferencia Clave',
      description: 'En Escuela A, si sabes cuanto estudia un alumno, puedes predecir bien su nota. En Escuela B, no tanto.',
      color: 'green',
    },
  ];

  const currentDiscovery = discoveries[discoveryStep];
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700',
    orange: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700',
    green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700',
  };
  const textClasses = {
    blue: 'text-blue-800 dark:text-blue-200',
    orange: 'text-orange-800 dark:text-orange-200',
    green: 'text-green-800 dark:text-green-200',
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            Descubrimiento {discoveryStep + 1} de {discoveries.length}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {currentDiscovery.title}
        </h2>
      </div>

      {/* Graph showing relevant population */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
        <InteractiveScatterPlot
          dataA={ESCUELA_A}
          dataB={ESCUELA_B}
          revealedA={ESCUELA_A.length}
          revealedB={ESCUELA_B.length}
          showA={discoveryStep !== 1}
          showB={discoveryStep !== 0}
        />
      </div>

      {/* Discovery card */}
      <motion.div
        key={discoveryStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn('rounded-xl p-5 border', colorClasses[currentDiscovery.color as keyof typeof colorClasses])}
      >
        <p className={textClasses[currentDiscovery.color as keyof typeof textClasses]}>
          {currentDiscovery.description}
        </p>
      </motion.div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {discoveries.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-3 h-3 rounded-full transition-colors',
              i <= discoveryStep ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center">
        {discoveryStep < discoveries.length - 1 ? (
          <button
            onClick={() => setDiscoveryStep((s) => s + 1)}
            className="flex items-center gap-2 px-6 py-3 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-xl font-semibold hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors"
          >
            <span>Siguiente descubrimiento</span>
            <ArrowRight size={20} />
          </button>
        ) : (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Aprender la teoria</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
