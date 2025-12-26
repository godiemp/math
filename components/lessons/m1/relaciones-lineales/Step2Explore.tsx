'use client';

import { useState } from 'react';
import { ArrowRight, Eye, Sparkles, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'table' | 'intercepts' | 'graph';

interface TableRow {
  x: number;
  y: number;
  revealed: boolean;
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  // Valid combinations for 2x + 3y = 12: (0,4), (3,2), (6,0)
  const [tableData, setTableData] = useState<TableRow[]>([
    { x: 0, y: 4, revealed: false },
    { x: 3, y: 2, revealed: false },
    { x: 6, y: 0, revealed: false },
  ]);
  const [interceptStep, setInterceptStep] = useState(0);
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

  // SVG coordinate helpers for graph (scaled for 2x + 3y = 12)
  const toSvgX = (x: number) => 50 + x * 30;
  const toSvgY = (y: number) => 180 - y * 35;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Ecuacion de la Panaderia
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Exploremos todas las combinaciones posibles
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <p className="text-lg text-gray-800 dark:text-gray-200">
              La relacion matematica es:
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Precio pan × cantidad + Precio medialuna × cantidad = Total
            </p>
            <div className="text-3xl font-mono font-bold">
              <span className="text-amber-600">2</span>
              <span className="text-gray-700 dark:text-gray-300">x</span> +{' '}
              <span className="text-purple-600">3</span>
              <span className="text-gray-700 dark:text-gray-300">y</span> ={' '}
              <span className="text-green-600">12</span>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm text-gray-500">
              <span>
                🍞 x = panes
              </span>
              <span>
                🥐 y = medialunas
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('table')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>Encontrar combinaciones</span>
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
            Tabla de Combinaciones
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Revela cada combinacion que suma exactamente $12
          </p>
        </div>

        {/* Equation reminder */}
        <div className="text-center font-mono text-xl">
          <span className="text-amber-600">2</span>x +{' '}
          <span className="text-purple-600">3</span>y ={' '}
          <span className="text-green-600">12</span>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <table className="w-full text-center table-fixed">
            <thead>
              <tr>
                <th className="w-20 pb-4 text-amber-600 dark:text-amber-400 font-bold text-lg">
                  🍞 x
                </th>
                {tableData.map((row) => (
                  <td
                    key={`x-${row.x}`}
                    className="w-20 pb-4 font-mono text-xl font-bold text-gray-800 dark:text-gray-200"
                  >
                    {row.x}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="w-20 pt-4 text-purple-600 dark:text-purple-400 font-bold text-lg">
                  🥐 y
                </th>
                {tableData.map((row, index) => (
                  <td key={`y-${row.x}`} className="w-20 pt-4">
                    <div className="w-14 h-14 mx-auto flex items-center justify-center">
                      {row.revealed ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="font-mono text-xl font-bold text-purple-600 dark:text-purple-400"
                        >
                          {row.y}
                        </motion.span>
                      ) : (
                        <button
                          onClick={() => handleReveal(index)}
                          className="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
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

          {/* Verification row */}
          {revealedCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center">
                Verificacion:
              </p>
              <div className="flex justify-center gap-4 font-mono text-sm">
                {tableData.map(
                  (row) =>
                    row.revealed && (
                      <span key={row.x} className="text-gray-700 dark:text-gray-300">
                        2(<span className="text-amber-600">{row.x}</span>) + 3(
                        <span className="text-purple-600">{row.y}</span>) ={' '}
                        <span className="text-green-600 font-bold">12</span> ✓
                      </span>
                    )
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2">
          {tableData.map((row, i) => (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-full transition-colors',
                row.revealed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>

        {/* Hint */}
        {revealedCount >= 1 && !allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700"
          >
            <p className="text-amber-800 dark:text-amber-200 text-center">
              <strong>Pista:</strong> Cada combinacion gasta exactamente $12 en total
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
              onClick={() => setPhase('intercepts')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <span>Descubrir los interceptos</span>
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </div>
    );
  }

  // ============ PHASE 3: INTERCEPTS ============
  if (phase === 'intercepts') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Los Interceptos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Puntos especiales donde la recta cruza los ejes
          </p>
        </div>

        {/* Intercepts explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Y-intercept */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: interceptStep >= 1 ? 1 : 0.3, x: 0 }}
            className={cn(
              'rounded-xl p-5 border transition-all',
              interceptStep >= 1
                ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-bold text-purple-800 dark:text-purple-200">
                Intercepto Y
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Donde x = 0 (solo medialunas)
            </p>
            {interceptStep >= 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-3 font-mono"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  2(<span className="text-amber-600">0</span>) + 3y = 12
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">3y = 12</p>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  y = 4 → (0, 4)
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* X-intercept */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: interceptStep >= 2 ? 1 : 0.3, x: 0 }}
            className={cn(
              'rounded-xl p-5 border transition-all',
              interceptStep >= 2
                ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h3 className="font-bold text-amber-800 dark:text-amber-200">
                Intercepto X
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Donde y = 0 (solo panes)
            </p>
            {interceptStep >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-3 font-mono"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  2x + 3(<span className="text-purple-600">0</span>) = 12
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">2x = 12</p>
                <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  x = 6 → (6, 0)
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Step controls */}
        <div className="flex justify-center">
          {interceptStep < 2 ? (
            <button
              onClick={() => setInterceptStep((s) => s + 1)}
              className="flex items-center gap-2 px-6 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
            >
              {interceptStep === 0 && 'Calcular intercepto Y'}
              {interceptStep === 1 && 'Calcular intercepto X'}
              <ArrowRight size={16} />
            </button>
          ) : (
            <div className="space-y-4 w-full">
              {/* Key insight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700"
              >
                <p className="text-green-800 dark:text-green-200 text-center">
                  <strong>¡Importante!</strong> Con solo dos puntos (los interceptos) podemos
                  dibujar toda la recta.
                </p>
              </motion.div>

              <div className="flex justify-center">
                <button
                  onClick={() => setPhase('graph')}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
                >
                  <span>Ver el grafico</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============ PHASE 4: GRAPH ============
  if (phase === 'graph') {
    const points = [
      { x: 0, y: 4, label: 'Intercepto Y' },
      { x: 3, y: 2, label: 'Punto medio' },
      { x: 6, y: 0, label: 'Intercepto X' },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Grafico de 2x + 3y = 12
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Todos los puntos que satisfacen la ecuacion forman una recta
          </p>
        </div>

        {/* SVG Graph */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <svg viewBox="0 0 280 220" className="w-full max-w-md mx-auto">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line
                key={`grid-v-${i}`}
                x1={toSvgX(i)}
                y1={20}
                x2={toSvgX(i)}
                y2={180}
                className="stroke-gray-200 dark:stroke-gray-700"
                strokeWidth="1"
              />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={`grid-h-${i}`}
                x1={30}
                y2={toSvgY(i)}
                x2={260}
                y1={toSvgY(i)}
                className="stroke-gray-200 dark:stroke-gray-700"
                strokeWidth="1"
              />
            ))}

            {/* Axes */}
            <line
              x1={50}
              y1={180}
              x2={260}
              y2={180}
              className="stroke-gray-600 dark:stroke-gray-400"
              strokeWidth="2"
            />
            <line
              x1={50}
              y1={180}
              x2={50}
              y2={20}
              className="stroke-gray-600 dark:stroke-gray-400"
              strokeWidth="2"
            />

            {/* Axis labels */}
            <text x={265} y={185} className="fill-amber-600 text-xs font-bold">
              x
            </text>
            <text x={45} y={15} className="fill-purple-600 text-xs font-bold">
              y
            </text>

            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <text
                key={`x-label-${i}`}
                x={toSvgX(i)}
                y={195}
                textAnchor="middle"
                className="fill-gray-600 dark:fill-gray-400 text-xs"
              >
                {i}
              </text>
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
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
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <circle cx={toSvgX(0)} cy={toSvgY(4)} r="8" fill="#8b5cf6" />
                <text
                  x={toSvgX(0) + 12}
                  y={toSvgY(4) + 4}
                  className="fill-purple-600 text-xs font-bold"
                >
                  (0, 4)
                </text>
              </motion.g>
            )}

            {/* X-intercept highlight */}
            {graphStep >= 2 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <circle cx={toSvgX(6)} cy={toSvgY(0)} r="8" fill="#f59e0b" />
                <text
                  x={toSvgX(6)}
                  y={toSvgY(0) - 12}
                  textAnchor="middle"
                  className="fill-amber-600 text-xs font-bold"
                >
                  (6, 0)
                </text>
              </motion.g>
            )}

            {/* Line connecting intercepts */}
            {graphStep >= 3 && (
              <motion.line
                x1={toSvgX(0)}
                y1={toSvgY(4)}
                x2={toSvgX(6)}
                y2={toSvgY(0)}
                stroke="#22c55e"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
            )}

            {/* Middle point */}
            {graphStep >= 4 && (
              <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <circle cx={toSvgX(3)} cy={toSvgY(2)} r="6" fill="#22c55e" />
                <text
                  x={toSvgX(3) + 10}
                  y={toSvgY(2) - 8}
                  className="fill-green-600 text-xs font-bold"
                >
                  (3, 2)
                </text>
              </motion.g>
            )}
          </svg>
        </div>

        {/* Step controls */}
        <div className="flex justify-center gap-4">
          {graphStep < 4 ? (
            <button
              onClick={() => setGraphStep((s) => s + 1)}
              className="flex items-center gap-2 px-6 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg font-semibold hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors"
            >
              {graphStep === 0 && 'Marcar intercepto Y (0, 4)'}
              {graphStep === 1 && 'Marcar intercepto X (6, 0)'}
              {graphStep === 2 && 'Trazar la recta'}
              {graphStep === 3 && 'Verificar punto (3, 2)'}
              <ArrowRight size={16} />
            </button>
          ) : (
            <div className="space-y-4 w-full">
              {/* Legend */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-purple-500" />
                  <span className="text-gray-700 dark:text-gray-300">Intercepto Y (0, 4)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500" />
                  <span className="text-gray-700 dark:text-gray-300">Intercepto X (6, 0)</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 justify-center">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Todos los puntos en la recta satisfacen 2x + 3y = 12
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={onComplete}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
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
