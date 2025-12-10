'use client';

import { useState } from 'react';
import { ArrowRight, Scissors, RotateCcw } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'parallelogram' | 'trapezoid' | 'summary';

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [showTransform, setShowTransform] = useState(false);
  const [showTrapezoidTransform, setShowTrapezoidTransform] = useState(false);

  if (!isActive) return null;

  // ============ INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Transformando Figuras
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El secreto está en convertirlas en rectángulos
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <div className="space-y-4">
            <p className="text-lg text-gray-800 dark:text-gray-200 text-center">
              Ya sabes calcular el área de un <strong>rectángulo</strong>:
            </p>
            <div className="text-center">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                A = base × altura
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              ¿Sabías que puedes <strong>transformar</strong> un paralelogramo o trapecio
              en un rectángulo para calcular su área?
            </p>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-center">
            <Scissors className="w-5 h-5 inline mr-2" />
            <strong>Idea clave:</strong> Cortar y reorganizar sin cambiar el área total.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('parallelogram')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>Ver con el Paralelogramo</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PARALLELOGRAM ============
  if (phase === 'parallelogram') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Paralelogramo
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Transformándolo en rectángulo
          </p>
        </div>

        {/* Interactive transformation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 320 160" className="w-full max-w-md">
              {/* Main parallelogram body (becomes rectangle) */}
              <polygon
                points={showTransform ? "80,130 80,40 220,40 220,130" : "80,130 120,40 260,40 220,130"}
                fill="#c4b5fd"
                stroke="#7c3aed"
                strokeWidth="2"
                style={{ transition: 'all 0.6s ease-in-out' }}
              />

              {/* Animated triangle piece */}
              <polygon
                points={showTransform ? "220,40 220,130 260,130" : "80,130 120,40 120,130"}
                fill="#fca5a5"
                fillOpacity="0.7"
                stroke="#dc2626"
                strokeWidth="2"
                style={{ transition: 'all 0.6s ease-in-out' }}
              />

              {/* Cut line (only visible before transform) */}
              <line
                x1="120" y1="40" x2="120" y2="130"
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity={showTransform ? 0 : 1}
                style={{ transition: 'opacity 0.3s ease-in-out' }}
              />

              {/* Rectangle outline indicator (appears after transform) */}
              <rect
                x="80" y="40" width="140" height="90"
                fill="none"
                stroke="#166534"
                strokeWidth="3"
                opacity={showTransform ? 1 : 0}
                style={{ transition: 'opacity 0.4s ease-in-out 0.4s' }}
              />

              {/* Labels */}
              <text x="170" y="155" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1f2937">base</text>
              <text
                x={showTransform ? "68" : "105"}
                y="90"
                textAnchor="end"
                fontSize="14"
                fontWeight="bold"
                fill="#1f2937"
                style={{ transition: 'all 0.6s ease-in-out' }}
              >h</text>

              {/* "cortar" label */}
              <text
                x="108" y="90"
                textAnchor="end"
                fontSize="10"
                fill="#dc2626"
                opacity={showTransform ? 0 : 1}
                style={{ transition: 'opacity 0.3s ease-in-out' }}
              >cortar</text>

              {/* Success message */}
              <text
                x="150" y="90"
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
                fill="#166534"
                opacity={showTransform ? 1 : 0}
                style={{ transition: 'opacity 0.4s ease-in-out 0.5s' }}
              >¡Rectángulo!</text>
            </svg>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setShowTransform(!showTransform)}
              className="flex items-center gap-2 px-6 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-lg font-medium hover:bg-purple-200 dark:hover:bg-purple-900/70 transition-all"
            >
              {showTransform ? <RotateCcw size={18} /> : <Scissors size={18} />}
              <span>{showTransform ? 'Ver original' : 'Transformar'}</span>
            </button>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">
            ¿Qué pasó?
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 space-y-2">
            <li>1. Cortamos el triángulo de un lado</li>
            <li>2. Lo movimos al otro lado</li>
            <li>3. ¡Se formó un rectángulo con la misma área!</li>
          </ul>
        </div>

        {/* Formula reveal */}
        <div className="bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40 rounded-xl p-5">
          <p className="text-center text-gray-700 dark:text-gray-300 mb-2">
            Por eso la fórmula del paralelogramo es igual al rectángulo:
          </p>
          <div className="text-center">
            <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              A = b × h
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setShowTransform(false);
              setPhase('trapezoid');
            }}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>Ahora el Trapecio</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ TRAPEZOID ============
  if (phase === 'trapezoid') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Trapecio
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Una figura con dos bases diferentes
          </p>
        </div>

        {/* Interactive transformation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 320 170" className="w-full max-w-md">
              {/* Original trapezoid */}
              <polygon
                points={showTrapezoidTransform ? "40,130 70,40 170,40 200,130" : "60,130 90,40 190,40 240,130"}
                fill="#fde68a"
                stroke="#b45309"
                strokeWidth="2"
                style={{ transition: 'all 0.6s ease-in-out' }}
              />

              {/* Second trapezoid (copy, rotated 180°) - slides in from above */}
              <polygon
                points={showTrapezoidTransform ? "200,130 170,40 270,40 240,130" : "240,130 210,40 260,40 260,40"}
                fill="#fed7aa"
                stroke="#ea580c"
                strokeWidth="2"
                opacity={showTrapezoidTransform ? 1 : 0}
                style={{ transition: 'all 0.6s ease-in-out' }}
              />

              {/* Height line */}
              <line
                x1={showTrapezoidTransform ? "120" : "140"}
                y1="40"
                x2={showTrapezoidTransform ? "120" : "140"}
                y2="130"
                stroke="#6b7280"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                style={{ transition: 'all 0.6s ease-in-out' }}
              />

              {/* Parallelogram outline (appears after transform) */}
              <polygon
                points="40,130 70,40 270,40 240,130"
                fill="none"
                stroke="#166534"
                strokeWidth="3"
                opacity={showTrapezoidTransform ? 1 : 0}
                style={{ transition: 'opacity 0.4s ease-in-out 0.5s' }}
              />

              {/* Labels - Base menor */}
              <text
                x={showTrapezoidTransform ? "120" : "140"}
                y="32"
                textAnchor="middle"
                fontSize="11"
                fill="#1f2937"
                fontWeight="bold"
                opacity={showTrapezoidTransform ? 0 : 1}
                style={{ transition: 'opacity 0.3s ease-in-out' }}
              >Base menor (b)</text>

              {/* Labels - Base mayor */}
              <text
                x={showTrapezoidTransform ? "140" : "150"}
                y="155"
                textAnchor="middle"
                fontSize="11"
                fill="#1f2937"
                fontWeight="bold"
                opacity={showTrapezoidTransform ? 0 : 1}
                style={{ transition: 'opacity 0.3s ease-in-out' }}
              >Base mayor (B)</text>

              {/* Labels - Combined base (B + b) */}
              <text
                x="170"
                y="32"
                textAnchor="middle"
                fontSize="12"
                fill="#166534"
                fontWeight="bold"
                opacity={showTrapezoidTransform ? 1 : 0}
                style={{ transition: 'opacity 0.4s ease-in-out 0.5s' }}
              >B + b</text>

              {/* Height label */}
              <text
                x={showTrapezoidTransform ? "130" : "150"}
                y="90"
                textAnchor="start"
                fontSize="14"
                fill="#1f2937"
                fontWeight="bold"
                style={{ transition: 'all 0.6s ease-in-out' }}
              >h</text>

              {/* "2 trapecios" message */}
              <text
                x="155"
                y="95"
                textAnchor="middle"
                fontSize="12"
                fill="#166534"
                fontWeight="bold"
                opacity={showTrapezoidTransform ? 1 : 0}
                style={{ transition: 'opacity 0.4s ease-in-out 0.6s' }}
              >= Paralelogramo</text>
            </svg>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setShowTrapezoidTransform(!showTrapezoidTransform)}
              className="flex items-center gap-2 px-6 py-2 bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 rounded-lg font-medium hover:bg-orange-200 dark:hover:bg-orange-900/70 transition-all"
            >
              {showTrapezoidTransform ? <RotateCcw size={18} /> : <Scissors size={18} />}
              <span>{showTrapezoidTransform ? 'Ver original' : 'Duplicar y rotar'}</span>
            </button>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-5 border border-orange-200 dark:border-orange-700">
          <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-2">
            El truco del trapecio:
          </h4>
          <ul className="text-orange-700 dark:text-orange-300 space-y-2">
            <li>1. Duplicamos el trapecio y lo rotamos 180°</li>
            <li>2. Juntos forman un <strong>paralelogramo</strong></li>
            <li>3. El paralelogramo tiene base (B + b) y altura h</li>
            <li>4. El área del trapecio es <strong>la mitad</strong> de ese paralelogramo</li>
          </ul>
        </div>

        {/* Formula reveal */}
        <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 rounded-xl p-5">
          <p className="text-center text-gray-700 dark:text-gray-300 mb-2">
            Por eso la fórmula del trapecio es:
          </p>
          <div className="text-center">
            <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              A = ½ × (B + b) × h
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <span className="font-bold text-orange-600">B</span>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Base mayor</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <span className="font-bold text-orange-600">b</span>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Base menor</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <span className="font-bold text-orange-600">h</span>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Altura</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('summary')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
          >
            <span>Ver resumen</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Lo descubriste!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Las fórmulas que acabas de derivar
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-100 to-orange-100 dark:from-purple-900/40 dark:to-orange-900/40 rounded-xl p-6">
        <div className="space-y-4">
          {/* Parallelogram */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <svg viewBox="0 0 60 50" className="w-16 h-14 flex-shrink-0">
                <polygon points="15,45 25,5 55,5 45,45" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
              </svg>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white">Paralelogramo</h3>
                <div className="mt-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg px-4 py-2">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    A = b × h
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Igual que el rectángulo porque se transforma en uno
                </p>
              </div>
            </div>
          </div>

          {/* Trapezoid */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <svg viewBox="0 0 60 50" className="w-16 h-14 flex-shrink-0">
                <polygon points="10,45 18,5 42,5 50,45" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
              </svg>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white">Trapecio</h3>
                <div className="mt-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg px-4 py-2">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    A = ½ × (B + b) × h
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Mitad del paralelogramo con base (B + b)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
        <p className="text-green-800 dark:text-green-200 text-center font-medium">
          <strong>Recuerda:</strong> La altura siempre es perpendicular a la base,
          no es un lado inclinado.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
