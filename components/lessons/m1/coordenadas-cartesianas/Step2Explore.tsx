'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, MousePointer2, Target, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'axes' | 'origin' | 'quadrants' | 'plotting' | 'summary';

interface QuadrantInfo {
  id: 'I' | 'II' | 'III' | 'IV';
  name: string;
  signs: string;
  description: string;
  color: string;
  colorDark: string;
}

const QUADRANTS: QuadrantInfo[] = [
  {
    id: 'I',
    name: 'Cuadrante I',
    signs: '(+, +)',
    description: 'derecha y arriba',
    color: 'bg-green-200',
    colorDark: 'dark:bg-green-800/50',
  },
  {
    id: 'II',
    name: 'Cuadrante II',
    signs: '(−, +)',
    description: 'izquierda y arriba',
    color: 'bg-blue-200',
    colorDark: 'dark:bg-blue-800/50',
  },
  {
    id: 'III',
    name: 'Cuadrante III',
    signs: '(−, −)',
    description: 'izquierda y abajo',
    color: 'bg-purple-200',
    colorDark: 'dark:bg-purple-800/50',
  },
  {
    id: 'IV',
    name: 'Cuadrante IV',
    signs: '(+, −)',
    description: 'derecha y abajo',
    color: 'bg-orange-200',
    colorDark: 'dark:bg-orange-800/50',
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [revealedQuadrants, setRevealedQuadrants] = useState<Set<string>>(new Set());
  const [plottingStep, setPlottingStep] = useState(0);

  if (!isActive) return null;

  const toSvgX = (x: number) => 150 + x * 20;
  const toSvgY = (y: number) => 150 - y * 20;

  const handleQuadrantClick = (id: string) => {
    setRevealedQuadrants((prev) => new Set([...prev, id]));
  };

  const allQuadrantsRevealed = revealedQuadrants.size === 4;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Construyendo el Plano
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Empezamos con algo que ya conoces...</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <p className="text-lg text-gray-800 dark:text-gray-200">
              ¿Recuerdas la <strong>recta numérica</strong>?
            </p>
          </div>

          <div className="space-y-6">
            {/* Horizontal number line */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">
                Una recta horizontal (izquierda ↔ derecha):
              </p>
              <svg viewBox="0 0 340 70" className="w-full max-w-md mx-auto">
                {/* Main line */}
                <line x1="15" y1="30" x2="310" y2="30" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                {/* Arrow head */}
                <polygon points="310,30 298,24 298,36" fill="#3b82f6" />
                {/* Tick marks and numbers */}
                {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((n) => (
                  <g key={n}>
                    <line
                      x1={170 + n * 30}
                      y1="22"
                      x2={170 + n * 30}
                      y2="38"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <text
                      x={170 + n * 30}
                      y="56"
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="500"
                      className="fill-gray-700 dark:fill-gray-300"
                    >
                      {n}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Vertical number line */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">
                Y otra recta vertical (abajo ↕ arriba):
              </p>
              <svg viewBox="0 0 80 240" className="w-20 h-60 mx-auto">
                {/* Main line */}
                <line x1="50" y1="225" x2="50" y2="20" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                {/* Arrow head */}
                <polygon points="50,20 44,32 56,32" fill="#22c55e" />
                {/* Tick marks and numbers */}
                {[-3, -2, -1, 0, 1, 2, 3].map((n) => (
                  <g key={n}>
                    <line
                      x1="42"
                      y1={120 - n * 28}
                      x2="58"
                      y2={120 - n * 28}
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <text
                      x="25"
                      y={120 - n * 28 + 5}
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="500"
                      className="fill-gray-700 dark:fill-gray-300"
                    >
                      {n}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <p className="text-center text-gray-700 dark:text-gray-300 mt-4 font-medium">
            ¿Qué pasa si las <strong>combinamos</strong>?
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('axes')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>¡Combinarlas!</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: AXES ============
  if (phase === 'axes') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Los Ejes</h2>
          <p className="text-gray-600 dark:text-gray-300">Las dos rectas se cruzan...</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 300 300" className="w-72 h-72">
              {/* Grid lines */}
              {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((i) => (
                <g key={`grid-${i}`}>
                  <line
                    x1={toSvgX(i)}
                    y1={30}
                    x2={toSvgX(i)}
                    y2={270}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="1"
                  />
                  <line
                    x1={30}
                    y1={toSvgY(i)}
                    x2={270}
                    y2={toSvgY(i)}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="1"
                  />
                </g>
              ))}

              {/* X axis with animation */}
              <motion.line
                x1="30"
                y1="150"
                x2="270"
                y2="150"
                stroke="#3b82f6"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
              <motion.polygon
                points="270,150 260,145 260,155"
                fill="#3b82f6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              />

              {/* Y axis with animation */}
              <motion.line
                x1="150"
                y1="270"
                x2="150"
                y2="30"
                stroke="#22c55e"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <motion.polygon
                points="150,30 145,40 155,40"
                fill="#22c55e"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              />

              {/* Axis labels */}
              <motion.text
                x="280"
                y="155"
                fontSize="16"
                fontWeight="bold"
                fill="#3b82f6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                X
              </motion.text>
              <motion.text
                x="155"
                y="22"
                fontSize="16"
                fontWeight="bold"
                fill="#22c55e"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Y
              </motion.text>

              {/* Axis numbers */}
              {[-4, -3, -2, -1, 1, 2, 3, 4].map((n) => (
                <g key={`num-${n}`}>
                  <text
                    x={toSvgX(n)}
                    y={165}
                    fontSize="10"
                    textAnchor="middle"
                    className="fill-gray-600 dark:fill-gray-400"
                  >
                    {n}
                  </text>
                  <text
                    x={138}
                    y={toSvgY(n) + 4}
                    fontSize="10"
                    textAnchor="middle"
                    className="fill-gray-600 dark:fill-gray-400"
                  >
                    {n}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div className="w-4 h-4 bg-blue-500 rounded" />
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Eje X</strong> (horizontal): izquierda ← → derecha
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Eje Y</strong> (vertical): abajo ↓ ↑ arriba
              </span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-center text-sm">
            <strong>Truco para recordar:</strong> La X es &ldquo;acostada&rdquo; (horizontal),
            <br />
            la Y se &ldquo;estira hacia arriba&rdquo; (vertical)
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('origin')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>¿Dónde se cruzan?</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: ORIGIN ============
  if (phase === 'origin') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">El Origen</h2>
          <p className="text-gray-600 dark:text-gray-300">El punto más importante del plano</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 300 300" className="w-72 h-72">
              {/* Grid lines */}
              {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((i) => (
                <g key={`grid-${i}`}>
                  <line
                    x1={toSvgX(i)}
                    y1={30}
                    x2={toSvgX(i)}
                    y2={270}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="1"
                  />
                  <line
                    x1={30}
                    y1={toSvgY(i)}
                    x2={270}
                    y2={toSvgY(i)}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="1"
                  />
                </g>
              ))}

              {/* Axes */}
              <line x1="30" y1="150" x2="270" y2="150" stroke="#3b82f6" strokeWidth="3" />
              <polygon points="270,150 260,145 260,155" fill="#3b82f6" />
              <line x1="150" y1="270" x2="150" y2="30" stroke="#22c55e" strokeWidth="3" />
              <polygon points="150,30 145,40 155,40" fill="#22c55e" />

              {/* Origin with pulse animation */}
              <motion.circle
                cx="150"
                cy="150"
                r="20"
                fill="#ef4444"
                fillOpacity="0.3"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.circle
                cx="150"
                cy="150"
                r="8"
                fill="#ef4444"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Origin label */}
              <motion.text
                x="165"
                y="175"
                fontSize="14"
                fontWeight="bold"
                fill="#ef4444"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                (0, 0)
              </motion.text>

              {/* Direction arrows */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {/* Right arrow */}
                <line x1="160" y1="150" x2="200" y2="150" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" />
                <text x="205" y="145" fontSize="10" fill="#3b82f6" fontWeight="bold">+</text>
                {/* Up arrow */}
                <line x1="150" y1="140" x2="150" y2="100" stroke="#22c55e" strokeWidth="2" strokeDasharray="4,4" />
                <text x="155" y="95" fontSize="10" fill="#22c55e" fontWeight="bold">+</text>
              </motion.g>

              {/* Axis labels */}
              <text x="280" y="155" fontSize="14" fontWeight="bold" fill="#3b82f6">X</text>
              <text x="155" y="22" fontSize="14" fontWeight="bold" fill="#22c55e">Y</text>
            </svg>
          </div>

          <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-6 h-6 text-red-500" />
              <span className="font-bold text-red-800 dark:text-red-200 text-lg">ORIGEN</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              El punto donde se cruzan los ejes se llama <strong>origen</strong>.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Sus coordenadas son <strong>(0, 0)</strong> — el punto de referencia.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-center">
            Desde el origen: <strong>derecha es +</strong> en X, <strong>arriba es +</strong> en Y
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('quadrants')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>Descubrir los cuadrantes</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: QUADRANTS ============
  if (phase === 'quadrants') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Los 4 Cuadrantes
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Haz clic en cada región para descubrir sus signos
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 300 300" className="w-72 h-72">
              {/* Quadrant backgrounds - clickable */}
              {/* Quadrant I: top-right */}
              <rect
                x="150"
                y="30"
                width="120"
                height="120"
                className={cn(
                  'cursor-pointer transition-all',
                  revealedQuadrants.has('I')
                    ? 'fill-green-200 dark:fill-green-800/50'
                    : 'fill-gray-100 dark:fill-gray-700 hover:fill-green-100 dark:hover:fill-green-900/30'
                )}
                onClick={() => handleQuadrantClick('I')}
              />
              {/* Quadrant II: top-left */}
              <rect
                x="30"
                y="30"
                width="120"
                height="120"
                className={cn(
                  'cursor-pointer transition-all',
                  revealedQuadrants.has('II')
                    ? 'fill-blue-200 dark:fill-blue-800/50'
                    : 'fill-gray-100 dark:fill-gray-700 hover:fill-blue-100 dark:hover:fill-blue-900/30'
                )}
                onClick={() => handleQuadrantClick('II')}
              />
              {/* Quadrant III: bottom-left */}
              <rect
                x="30"
                y="150"
                width="120"
                height="120"
                className={cn(
                  'cursor-pointer transition-all',
                  revealedQuadrants.has('III')
                    ? 'fill-purple-200 dark:fill-purple-800/50'
                    : 'fill-gray-100 dark:fill-gray-700 hover:fill-purple-100 dark:hover:fill-purple-900/30'
                )}
                onClick={() => handleQuadrantClick('III')}
              />
              {/* Quadrant IV: bottom-right */}
              <rect
                x="150"
                y="150"
                width="120"
                height="120"
                className={cn(
                  'cursor-pointer transition-all',
                  revealedQuadrants.has('IV')
                    ? 'fill-orange-200 dark:fill-orange-800/50'
                    : 'fill-gray-100 dark:fill-gray-700 hover:fill-orange-100 dark:hover:fill-orange-900/30'
                )}
                onClick={() => handleQuadrantClick('IV')}
              />

              {/* Axes */}
              <line x1="30" y1="150" x2="270" y2="150" stroke="#1f2937" strokeWidth="2" className="dark:stroke-gray-300" />
              <line x1="150" y1="270" x2="150" y2="30" stroke="#1f2937" strokeWidth="2" className="dark:stroke-gray-300" />

              {/* Quadrant labels when revealed */}
              {revealedQuadrants.has('I') && (
                <g>
                  <text x="210" y="80" fontSize="18" fontWeight="bold" fill="#166534" textAnchor="middle">I</text>
                  <text x="210" y="100" fontSize="12" fill="#166534" textAnchor="middle">(+, +)</text>
                </g>
              )}
              {revealedQuadrants.has('II') && (
                <g>
                  <text x="90" y="80" fontSize="18" fontWeight="bold" fill="#1e40af" textAnchor="middle">II</text>
                  <text x="90" y="100" fontSize="12" fill="#1e40af" textAnchor="middle">(−, +)</text>
                </g>
              )}
              {revealedQuadrants.has('III') && (
                <g>
                  <text x="90" y="200" fontSize="18" fontWeight="bold" fill="#7c3aed" textAnchor="middle">III</text>
                  <text x="90" y="220" fontSize="12" fill="#7c3aed" textAnchor="middle">(−, −)</text>
                </g>
              )}
              {revealedQuadrants.has('IV') && (
                <g>
                  <text x="210" y="200" fontSize="18" fontWeight="bold" fill="#ea580c" textAnchor="middle">IV</text>
                  <text x="210" y="220" fontSize="12" fill="#ea580c" textAnchor="middle">(+, −)</text>
                </g>
              )}

              {/* Click hints for unrevealed */}
              {!revealedQuadrants.has('I') && (
                <text x="210" y="90" fontSize="10" fill="#9ca3af" textAnchor="middle">clic</text>
              )}
              {!revealedQuadrants.has('II') && (
                <text x="90" y="90" fontSize="10" fill="#9ca3af" textAnchor="middle">clic</text>
              )}
              {!revealedQuadrants.has('III') && (
                <text x="90" y="210" fontSize="10" fill="#9ca3af" textAnchor="middle">clic</text>
              )}
              {!revealedQuadrants.has('IV') && (
                <text x="210" y="210" fontSize="10" fill="#9ca3af" textAnchor="middle">clic</text>
              )}

              {/* Origin */}
              <circle cx="150" cy="150" r="5" fill="#ef4444" />
            </svg>
          </div>

          {/* Legend of revealed quadrants */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {QUADRANTS.map((q) => (
              <div
                key={q.id}
                className={cn(
                  'p-2 rounded-lg text-center text-sm transition-all',
                  revealedQuadrants.has(q.id)
                    ? `${q.color} ${q.colorDark}`
                    : 'bg-gray-100 dark:bg-gray-700 opacity-50'
                )}
              >
                {revealedQuadrants.has(q.id) ? (
                  <>
                    <span className="font-bold">{q.name}</span>
                    <span className="mx-1">→</span>
                    <span>{q.signs}</span>
                  </>
                ) : (
                  <span className="text-gray-400">?</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {allQuadrantsRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700"
          >
            <p className="text-green-800 dark:text-green-200 text-center">
              <strong>¡Los numeramos en sentido antihorario!</strong>
              <br />
              <span className="text-sm">I → II → III → IV (empezando arriba a la derecha)</span>
            </p>
          </motion.div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('plotting')}
            disabled={!allQuadrantsRevealed}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all',
              allQuadrantsRevealed
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            <span>{allQuadrantsRevealed ? 'Ahora a ubicar puntos' : 'Descubre los 4 cuadrantes'}</span>
            {allQuadrantsRevealed && <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 5: PLOTTING ============
  if (phase === 'plotting') {
    const targetX = 3;
    const targetY = 2;

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Ubicando un Punto
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Veamos cómo llegar a <strong>(3, 2)</strong>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 300 300" className="w-72 h-72">
              {/* Grid lines */}
              {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((i) => (
                <g key={`grid-${i}`}>
                  <line
                    x1={toSvgX(i)}
                    y1={30}
                    x2={toSvgX(i)}
                    y2={270}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="1"
                  />
                  <line
                    x1={30}
                    y1={toSvgY(i)}
                    x2={270}
                    y2={toSvgY(i)}
                    className="stroke-gray-200 dark:stroke-gray-700"
                    strokeWidth="1"
                  />
                </g>
              ))}

              {/* Axes */}
              <line x1="30" y1="150" x2="270" y2="150" stroke="#3b82f6" strokeWidth="2" />
              <line x1="150" y1="270" x2="150" y2="30" stroke="#22c55e" strokeWidth="2" />

              {/* Axis numbers */}
              {[-4, -3, -2, -1, 1, 2, 3, 4].map((n) => (
                <g key={`num-${n}`}>
                  <text
                    x={toSvgX(n)}
                    y={163}
                    fontSize="10"
                    textAnchor="middle"
                    className="fill-gray-600 dark:fill-gray-400"
                  >
                    {n}
                  </text>
                  <text
                    x={138}
                    y={toSvgY(n) + 4}
                    fontSize="10"
                    textAnchor="middle"
                    className="fill-gray-600 dark:fill-gray-400"
                  >
                    {n}
                  </text>
                </g>
              ))}

              {/* Origin */}
              <circle cx="150" cy="150" r="5" fill="#ef4444" />
              <text x="138" y="165" fontSize="10" fill="#ef4444">0</text>

              {/* Step 1: Horizontal movement */}
              {plottingStep >= 1 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <motion.line
                    x1={toSvgX(0)}
                    y1={toSvgY(0)}
                    x2={toSvgX(targetX)}
                    y2={toSvgY(0)}
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="6,3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.polygon
                    points={`${toSvgX(targetX)},${toSvgY(0)} ${toSvgX(targetX) - 8},${toSvgY(0) - 5} ${toSvgX(targetX) - 8},${toSvgY(0) + 5}`}
                    fill="#3b82f6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                </motion.g>
              )}

              {/* Step 2: Vertical movement */}
              {plottingStep >= 2 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <motion.line
                    x1={toSvgX(targetX)}
                    y1={toSvgY(0)}
                    x2={toSvgX(targetX)}
                    y2={toSvgY(targetY)}
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeDasharray="6,3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.polygon
                    points={`${toSvgX(targetX)},${toSvgY(targetY)} ${toSvgX(targetX) - 5},${toSvgY(targetY) + 8} ${toSvgX(targetX) + 5},${toSvgY(targetY) + 8}`}
                    fill="#22c55e"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                </motion.g>
              )}

              {/* Step 3: Final point */}
              {plottingStep >= 3 && (
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <circle
                    cx={toSvgX(targetX)}
                    cy={toSvgY(targetY)}
                    r="8"
                    fill="#8b5cf6"
                  />
                  <text
                    x={toSvgX(targetX) + 15}
                    y={toSvgY(targetY) + 5}
                    fontSize="12"
                    fontWeight="bold"
                    fill="#8b5cf6"
                  >
                    (3, 2)
                  </text>
                </motion.g>
              )}
            </svg>
          </div>

          {/* Step instructions */}
          <div className="space-y-3">
            <div
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg transition-all',
                plottingStep >= 1
                  ? 'bg-blue-100 dark:bg-blue-900/50 border-2 border-blue-400'
                  : 'bg-gray-100 dark:bg-gray-700'
              )}
            >
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
                1
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Desde el origen, muévete <strong>3 hacia la derecha</strong> (eje X)
              </span>
            </div>

            <div
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg transition-all',
                plottingStep >= 2
                  ? 'bg-green-100 dark:bg-green-900/50 border-2 border-green-400'
                  : 'bg-gray-100 dark:bg-gray-700'
              )}
            >
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold">
                2
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Luego, muévete <strong>2 hacia arriba</strong> (eje Y)
              </span>
            </div>

            <div
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg transition-all',
                plottingStep >= 3
                  ? 'bg-purple-100 dark:bg-purple-900/50 border-2 border-purple-400'
                  : 'bg-gray-100 dark:bg-gray-700'
              )}
            >
              <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold">
                3
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                ¡Marca el punto <strong>(3, 2)</strong>!
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          {plottingStep < 3 ? (
            <button
              onClick={() => setPlottingStep((prev) => prev + 1)}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
            >
              <MousePointer2 size={20} />
              <span>Siguiente paso</span>
            </button>
          ) : (
            <button
              onClick={() => setPhase('summary')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all shadow-lg"
            >
              <span>Ver resumen</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ PHASE 6: SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¡El Plano Cartesiano!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">Resumen de lo que descubriste</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Compass className="w-8 h-8 text-blue-500" />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Referencia Rápida
          </span>
        </div>

        <div className="grid gap-4">
          {/* Axes */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-2 bg-blue-500 rounded" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Eje X</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Horizontal (←→)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-10 bg-green-500 rounded" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Eje Y</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Vertical (↕)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Origin */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Origen (0, 0)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Punto de referencia central
              </p>
            </div>
          </div>

          {/* Quadrants */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Cuadrantes:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded text-center">
                <strong>I</strong>: (+, +)
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded text-center">
                <strong>II</strong>: (−, +)
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded text-center">
                <strong>III</strong>: (−, −)
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/50 p-2 rounded text-center">
                <strong>IV</strong>: (+, −)
              </div>
            </div>
          </div>

          {/* Coordinates */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Coordenadas:</p>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              <span className="font-mono text-lg bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
                (x, y)
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
              Primero horizontal (x), luego vertical (y)
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
        >
          <span>Practicar con cuadrantes</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
