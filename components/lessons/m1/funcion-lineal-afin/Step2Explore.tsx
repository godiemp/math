'use client';

import { useState } from 'react';
import { ArrowRight, Eye, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'table' | 'difference' | 'compare' | 'graph';

interface TableRow {
  x: number;
  y: number;
  revealed: boolean;
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [tableData, setTableData] = useState<TableRow[]>([
    { x: 0, y: 3, revealed: false },
    { x: 1, y: 5, revealed: false },
    { x: 2, y: 7, revealed: false },
    { x: 3, y: 9, revealed: false },
  ]);
  const [showDifferences, setShowDifferences] = useState(false);
  const [graphStep, setGraphStep] = useState(0);

  if (!isActive) return null;

  const allRevealed = tableData.every((row) => row.revealed);
  const revealedCount = tableData.filter((row) => row.revealed).length;

  const handleReveal = (index: number) => {
    if (tableData[index].revealed) return;
    setTableData((prev) =>
      prev.map((row, i) => (i === index ? { ...row, revealed: true } : row))
    );
  };

  // SVG coordinate helpers
  const toSvgX = (x: number) => 50 + x * 40;
  const toSvgY = (y: number) => 200 - y * 18;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubriendo el Patrón
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Encuentra la relación entre x e y
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Tenemos una <strong>función misteriosa</strong>...
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              La función transforma cada valor de x en un valor de y:
            </p>
            <div className="text-4xl font-mono font-bold text-purple-600 dark:text-purple-400">
              f(x) = ???
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Descubre el patrón revelando los valores
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('table')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Explorar la tabla</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: TABLE DISCOVERY ============
  if (phase === 'table') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Tabla de Valores
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Haz clic en cada celda para revelar el valor de y
          </p>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <table className="w-full text-center table-fixed">
            <thead>
              <tr>
                <th className="w-16 pb-4 text-blue-600 dark:text-blue-400 font-bold text-lg">
                  x
                </th>
                {tableData.map((row) => (
                  <td
                    key={row.x}
                    className="w-16 pb-4 font-mono text-xl font-bold text-gray-800 dark:text-gray-200"
                  >
                    {row.x}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="w-16 pt-4 text-green-600 dark:text-green-400 font-bold text-lg">
                  y
                </th>
                {tableData.map((row, index) => (
                  <td key={row.x} className="w-16 pt-4">
                    <div className="w-12 h-12 mx-auto flex items-center justify-center">
                      {row.revealed ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="font-mono text-xl font-bold text-green-600 dark:text-green-400"
                        >
                          {row.y}
                        </motion.span>
                      ) : (
                        <button
                          onClick={() => handleReveal(index)}
                          className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
                        >
                          <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </button>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2">
          {tableData.map((row, i) => (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-full transition-colors',
                row.revealed
                  ? 'bg-green-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>

        {/* Pattern discovery */}
        {revealedCount >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700"
          >
            <p className="text-amber-800 dark:text-amber-200 text-center">
              <strong>Pista:</strong> Observa cuánto aumenta y cuando x aumenta en 1
            </p>
          </motion.div>
        )}

        {/* Continue button */}
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <button
              onClick={() => setPhase('difference')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Ver el patrón</span>
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </div>
    );
  }

  // ============ PHASE 3: DIFFERENCE PATTERN ============
  if (phase === 'difference') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Patrón de Diferencias
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuánto aumenta y cada vez?
          </p>
        </div>

        {/* Table with differences */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="pb-4 text-blue-600 dark:text-blue-400 font-bold text-lg">
                  x
                </th>
                {tableData.map((row) => (
                  <td
                    key={row.x}
                    className="pb-4 font-mono text-xl font-bold text-gray-800 dark:text-gray-200"
                  >
                    {row.x}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="py-4 text-green-600 dark:text-green-400 font-bold text-lg">
                  y
                </th>
                {tableData.map((row) => (
                  <td
                    key={row.x}
                    className="py-4 font-mono text-xl font-bold text-green-600 dark:text-green-400"
                  >
                    {row.y}
                  </td>
                ))}
              </tr>
              {showDifferences && (
                <tr>
                  <th className="pt-4 text-purple-600 dark:text-purple-400 font-bold text-lg">
                    Δy
                  </th>
                  <td className="pt-4 text-gray-400">-</td>
                  {tableData.slice(1).map((row, i) => (
                    <motion.td
                      key={row.x}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.2 }}
                      className="pt-4"
                    >
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 rounded-full font-mono font-bold text-purple-600 dark:text-purple-400">
                        +2
                      </span>
                    </motion.td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!showDifferences ? (
          <div className="flex justify-center">
            <button
              onClick={() => setShowDifferences(true)}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Calcular diferencias</span>
              <TrendingUp size={20} />
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Key insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                <p className="font-bold text-purple-800 dark:text-purple-200 mb-1">
                  La Pendiente (m)
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Cada vez que x aumenta en 1, y aumenta en{' '}
                  <span className="font-bold text-purple-600">2</span>
                </p>
                <p className="font-mono text-lg text-purple-600 dark:text-purple-400 mt-2">
                  m = 2
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
                <p className="font-bold text-amber-800 dark:text-amber-200 mb-1">
                  El Coeficiente de Posición (b)
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Cuando x = 0, y ={' '}
                  <span className="font-bold text-amber-600">3</span>
                </p>
                <p className="font-mono text-lg text-amber-600 dark:text-amber-400 mt-2">
                  b = 3
                </p>
              </div>
            </div>

            {/* Formula reveal */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                La función es:
              </p>
              <p className="text-3xl font-mono font-bold">
                <span className="text-green-600">y</span> ={' '}
                <span className="text-purple-600">2</span>x +{' '}
                <span className="text-amber-600">3</span>
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setPhase('compare')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Comparar funciones</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // ============ PHASE 4: COMPARE LINEAR VS AFFINE ============
  if (phase === 'compare') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Lineal vs Afín
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuál es la diferencia?
          </p>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Linear function */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <h3 className="font-bold text-blue-800 dark:text-blue-200 text-lg mb-4 text-center">
              Función Lineal
            </h3>
            <div className="text-center mb-4">
              <p className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
                y = 2x
              </p>
            </div>
            <table className="w-full text-center text-sm mb-4">
              <thead>
                <tr>
                  <th className="text-blue-600">x</th>
                  <td>0</td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="text-green-600">y</th>
                  <td className="font-bold">0</td>
                  <td>2</td>
                  <td>4</td>
                  <td>6</td>
                </tr>
              </tbody>
            </table>
            <div className="bg-blue-100 dark:bg-blue-800/50 rounded-lg p-3 text-center">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                Pasa por el <strong>origen (0, 0)</strong>
              </p>
            </div>
          </div>

          {/* Affine function */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <h3 className="font-bold text-purple-800 dark:text-purple-200 text-lg mb-4 text-center">
              Función Afín
            </h3>
            <div className="text-center mb-4">
              <p className="text-2xl font-mono font-bold text-purple-600 dark:text-purple-400">
                y = 2x + 3
              </p>
            </div>
            <table className="w-full text-center text-sm mb-4">
              <thead>
                <tr>
                  <th className="text-blue-600">x</th>
                  <td>0</td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="text-green-600">y</th>
                  <td className="font-bold">3</td>
                  <td>5</td>
                  <td>7</td>
                  <td>9</td>
                </tr>
              </tbody>
            </table>
            <div className="bg-purple-100 dark:bg-purple-800/50 rounded-lg p-3 text-center">
              <p className="text-purple-800 dark:text-purple-200 font-medium">
                Pasa por <strong>(0, 3)</strong> - desplazada en b
              </p>
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
          <div className="text-center space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Función Lineal:</strong> y = mx (pasa por el origen, b = 0)
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Función Afín:</strong> y = mx + b (desplazada verticalmente)
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Toda función lineal es afín, pero no toda función afín es lineal
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('graph')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Ver el gráfico</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 5: GRAPH ============
  if (phase === 'graph') {
    const points = [
      { x: 0, y: 3 },
      { x: 1, y: 5 },
      { x: 2, y: 7 },
      { x: 3, y: 9 },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Gráfico de y = 2x + 3
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Visualiza la función en el plano cartesiano
          </p>
        </div>

        {/* SVG Graph */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <svg viewBox="0 0 280 220" className="w-full max-w-md mx-auto">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={`grid-${i}`}>
                <line
                  x1={toSvgX(i)}
                  y1={20}
                  x2={toSvgX(i)}
                  y2={200}
                  className="stroke-gray-200 dark:stroke-gray-700"
                  strokeWidth="1"
                />
              </g>
            ))}
            {[0, 2, 4, 6, 8, 10].map((i) => (
              <line
                key={`grid-h-${i}`}
                x1={30}
                y1={toSvgY(i)}
                x2={220}
                y2={toSvgY(i)}
                className="stroke-gray-200 dark:stroke-gray-700"
                strokeWidth="1"
              />
            ))}

            {/* Axes */}
            <line
              x1={50}
              y1={200}
              x2={220}
              y2={200}
              className="stroke-gray-600 dark:stroke-gray-400"
              strokeWidth="2"
            />
            <line
              x1={50}
              y1={200}
              x2={50}
              y2={20}
              className="stroke-gray-600 dark:stroke-gray-400"
              strokeWidth="2"
            />

            {/* Axis labels */}
            {[0, 1, 2, 3, 4].map((i) => (
              <text
                key={`x-label-${i}`}
                x={toSvgX(i)}
                y={215}
                textAnchor="middle"
                className="fill-gray-600 dark:fill-gray-400 text-xs"
              >
                {i}
              </text>
            ))}
            {[0, 2, 4, 6, 8, 10].map((i) => (
              <text
                key={`y-label-${i}`}
                x={40}
                y={toSvgY(i) + 4}
                textAnchor="end"
                className="fill-gray-600 dark:fill-gray-400 text-xs"
              >
                {i}
              </text>
            ))}

            {/* Y-intercept highlight */}
            {graphStep >= 1 && (
              <motion.circle
                cx={toSvgX(0)}
                cy={toSvgY(3)}
                r="8"
                fill="#f59e0b"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}

            {/* Line */}
            {graphStep >= 2 && (
              <motion.line
                x1={toSvgX(-0.5)}
                y1={toSvgY(2)}
                x2={toSvgX(4)}
                y2={toSvgY(11)}
                stroke="#8b5cf6"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
            )}

            {/* Points */}
            {graphStep >= 3 &&
              points.map((point, i) => (
                <motion.circle
                  key={i}
                  cx={toSvgX(point.x)}
                  cy={toSvgY(point.y)}
                  r="6"
                  fill="#22c55e"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}

            {/* Slope triangle */}
            {graphStep >= 4 && (
              <g>
                <motion.line
                  x1={toSvgX(1)}
                  y1={toSvgY(5)}
                  x2={toSvgX(2)}
                  y2={toSvgY(5)}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                />
                <motion.line
                  x1={toSvgX(2)}
                  y1={toSvgY(5)}
                  x2={toSvgX(2)}
                  y2={toSvgY(7)}
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3 }}
                />
                <text
                  x={toSvgX(1.5)}
                  y={toSvgY(4.2)}
                  textAnchor="middle"
                  className="fill-blue-600 text-xs font-bold"
                >
                  1
                </text>
                <text
                  x={toSvgX(2.4)}
                  y={toSvgY(6)}
                  textAnchor="start"
                  className="fill-red-600 text-xs font-bold"
                >
                  2
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Step controls */}
        <div className="flex justify-center gap-4">
          {graphStep < 4 ? (
            <button
              onClick={() => setGraphStep((s) => s + 1)}
              className="flex items-center gap-2 px-6 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
            >
              {graphStep === 0 && 'Mostrar intercepto y'}
              {graphStep === 1 && 'Dibujar la recta'}
              {graphStep === 2 && 'Mostrar puntos'}
              {graphStep === 3 && 'Ver pendiente'}
              <ArrowRight size={16} />
            </button>
          ) : (
            <div className="space-y-4 w-full">
              {/* Legend */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Intercepto y (b = 3)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Puntos de la tabla
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Correr 1 (Δx)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-red-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Subir 2 (Δy = m)
                  </span>
                </div>
              </div>

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
      </div>
    );
  }

  return null;
}
