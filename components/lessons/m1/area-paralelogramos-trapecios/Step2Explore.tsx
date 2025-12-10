'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Scissors, RotateCcw, Play } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'parallelogram' | 'trapezoid' | 'summary';
type AnimationStep = 0 | 1 | 2 | 3;

// Animation configuration
const STEP_DELAY = 1200; // ms between auto-advance steps

// Triangle positions for parallelogram animation
const trianglePositions: Record<AnimationStep, { x: number; y: number }> = {
  0: { x: 0, y: 0 },
  1: { x: 0, y: -20 },
  2: { x: 140, y: -20 },
  3: { x: 140, y: 0 },
};

// Trapezoid copy animation states - for steps 0-2 (step 3 uses static positions)
const trapezoidCopyStates: Record<AnimationStep, { opacity: number; x: number; y: number; rotate: number }> = {
  0: { opacity: 0, x: 0, y: 0, rotate: 0 },
  1: { opacity: 0.7, x: 50, y: -40, rotate: 0 },
  2: { opacity: 0.9, x: 70, y: -10, rotate: 90 },
  3: { opacity: 1, x: 70, y: -10, rotate: 90 }, // Intermediate state
};

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [paraStep, setParaStep] = useState<AnimationStep>(0);
  const [trapStep, setTrapStep] = useState<AnimationStep>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-advance animation
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      if (phase === 'parallelogram') {
        setParaStep(prev => {
          if (prev >= 3) {
            setIsPlaying(false);
            return 3;
          }
          return (prev + 1) as AnimationStep;
        });
      } else if (phase === 'trapezoid') {
        setTrapStep(prev => {
          if (prev >= 3) {
            setIsPlaying(false);
            return 3;
          }
          return (prev + 1) as AnimationStep;
        });
      }
    }, STEP_DELAY);

    return () => clearInterval(timer);
  }, [isPlaying, phase]);

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
    const stepDescriptions = [
      'Este es un paralelogramo. Vamos a cortarlo.',
      '¡Cortamos el triángulo del lado izquierdo!',
      'Movemos el triángulo al lado derecho...',
      '¡Se formó un rectángulo! Misma área.',
    ];

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
          {/* Step indicator */}
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2, 3].map((step) => (
              <motion.div
                key={step}
                animate={{
                  scale: step === paraStep ? 1.3 : 1,
                  backgroundColor: step <= paraStep ? '#8b5cf6' : '#d1d5db',
                }}
                transition={{ duration: 0.3 }}
                className="w-3 h-3 rounded-full"
              />
            ))}
          </div>

          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 300 180" className="w-full max-w-md">
              {/* Grid background for reference */}
              <defs>
                <pattern id="gridPara" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect x="0" y="0" width="300" height="180" fill="url(#gridPara)" />

              {/* Full parallelogram shown initially (step 0) */}
              {paraStep === 0 && (
                <polygon
                  points="40,130 80,30 220,30 180,130"
                  fill="#c4b5fd"
                  stroke="#7c3aed"
                  strokeWidth="2"
                />
              )}

              {/* After cutting: show remaining quadrilateral + moving triangle */}
              {paraStep > 0 && (
                <>
                  {/* Remaining quadrilateral (trapezoid shape that morphs to rectangle) */}
                  <motion.polygon
                    initial={{ points: "80,130 80,30 220,30 180,130" }}
                    animate={{
                      points: paraStep >= 3
                        ? "80,130 80,30 220,30 220,130"  // Rectangle
                        : "80,130 80,30 220,30 180,130"  // Trapezoid
                    }}
                    transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                    fill="#c4b5fd"
                    stroke="#7c3aed"
                    strokeWidth="2"
                  />
                </>
              )}

              {/* Triangle piece that moves - using Framer Motion */}
              <motion.g
                initial={{ x: 0, y: 0, opacity: paraStep === 0 ? 0 : 1 }}
                animate={{
                  ...trianglePositions[paraStep],
                  opacity: paraStep === 0 ? 0 : 1
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.2, 0.8, 0.2, 1]
                }}
              >
                <polygon
                  points="40,130 80,30 80,130"
                  fill="#fca5a5"
                  stroke="#dc2626"
                  strokeWidth="2"
                />
                {/* Scissors icon on triangle */}
                <motion.text
                  x="55" y="95"
                  fontSize="16"
                  fill="#dc2626"
                  fontWeight="bold"
                  animate={{ opacity: paraStep >= 1 && paraStep < 3 ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ✂
                </motion.text>
              </motion.g>

              {/* Cut line (dashed) - only visible in step 0 */}
              <motion.line
                x1="80" y1="30" x2="80" y2="130"
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="6,4"
                animate={{ opacity: paraStep === 0 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* Rectangle outline (appears at end) */}
              <motion.rect
                x="80" y="30" width="140" height="100"
                fill="none"
                stroke="#166534"
                strokeWidth="3"
                animate={{
                  opacity: paraStep >= 3 ? 1 : 0,
                }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />

              {/* Labels */}
              <text x="130" y="155" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1f2937">
                base
              </text>
              <text x="240" y="85" textAnchor="start" fontSize="14" fontWeight="bold" fill="#1f2937">
                h
              </text>

              {/* Success message */}
              {paraStep === 3 && (
                <motion.text
                  x="150" y="85"
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="bold"
                  fill="#166534"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  ¡Rectángulo!
                </motion.text>
              )}
            </svg>
          </div>

          {/* Step description */}
          <motion.div
            key={paraStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3 mb-4"
          >
            <p className="text-purple-800 dark:text-purple-200 text-center font-medium">
              {stepDescriptions[paraStep]}
            </p>
          </motion.div>

          {/* Controls - simplified without Pause */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                if (paraStep === 3) {
                  setParaStep(0);
                  setTimeout(() => setIsPlaying(true), 100);
                } else {
                  setIsPlaying(true);
                }
              }}
              disabled={isPlaying && paraStep < 3}
              className="flex items-center gap-2 px-6 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={18} />
              <span>{paraStep === 3 ? 'Repetir' : 'Animar'}</span>
            </button>
            {paraStep > 0 && (
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setParaStep(0);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Formula reveal (only after animation) */}
        {paraStep === 3 && (
          <div className="bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40 rounded-xl p-5 animate-fadeIn">
            <p className="text-center text-gray-700 dark:text-gray-300 mb-2">
              Por eso la fórmula del paralelogramo es igual al rectángulo:
            </p>
            <div className="text-center">
              <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                A = b × h
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => {
              setParaStep(0);
              setIsPlaying(false);
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
    const stepDescriptions = [
      'Este es un trapecio con bases diferentes.',
      'Hacemos una copia del trapecio...',
      'Volteamos la copia y la acercamos...',
      '¡Juntos forman un paralelogramo!',
    ];

    // Original trapezoid: base menor=70, base mayor=130, altura=80
    // When combined with rotated copy, forms parallelogram with base = 200 (70+130)

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
          {/* Step indicator */}
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2, 3].map((step) => (
              <motion.div
                key={step}
                animate={{
                  scale: step === trapStep ? 1.3 : 1,
                  backgroundColor: step <= trapStep ? '#f97316' : '#d1d5db',
                }}
                transition={{ duration: 0.3 }}
                className="w-3 h-3 rounded-full"
              />
            ))}
          </div>

          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 320 160" className="w-full max-w-md">
              {/* Grid background */}
              <defs>
                <pattern id="gridTrap" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect x="0" y="0" width="320" height="160" fill="url(#gridTrap)" />

              {/* Step 3: Final combined state - draw both trapezoids at exact positions */}
              {trapStep === 3 ? (
                <>
                  {/* Original trapezoid (left) */}
                  <polygon
                    points="30,120 50,40 120,40 140,120"
                    fill="#fde68a"
                    stroke="#b45309"
                    strokeWidth="2"
                  />
                  {/* Second trapezoid (right, flipped) - forms perfect parallelogram */}
                  <polygon
                    points="140,120 120,40 190,40 170,120"
                    fill="#fed7aa"
                    stroke="#ea580c"
                    strokeWidth="2"
                  />
                  {/* Parallelogram outline */}
                  <motion.polygon
                    points="30,120 50,40 190,40 170,120"
                    fill="none"
                    stroke="#166534"
                    strokeWidth="3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </>
              ) : (
                <>
                  {/* Original trapezoid - centered for steps 0-2 */}
                  <polygon
                    points="90,120 110,40 180,40 200,120"
                    fill="#fde68a"
                    stroke="#b45309"
                    strokeWidth="2"
                  />

                  {/* Copy trapezoid - animates */}
                  <motion.g
                    initial={{ opacity: 0, x: 0, y: 0, scaleY: 1 }}
                    animate={{
                      opacity: trapStep >= 1 ? 1 : 0,
                      x: trapStep >= 2 ? 30 : 60,
                      y: trapStep >= 2 ? 0 : -50,
                      scaleY: trapStep >= 2 ? -1 : 1,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.2, 0.8, 0.2, 1]
                    }}
                    style={{ transformOrigin: '145px 80px' }}
                  >
                    <polygon
                      points="90,120 110,40 180,40 200,120"
                      fill="#fed7aa"
                      stroke="#ea580c"
                      strokeWidth="2"
                    />
                  </motion.g>
                </>
              )}

              {/* Height line */}
              <motion.line
                x1={trapStep === 3 ? "110" : "145"}
                y1="40"
                x2={trapStep === 3 ? "110" : "145"}
                y2="120"
                stroke="#6b7280"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                animate={{ x1: trapStep === 3 ? 110 : 145, x2: trapStep === 3 ? 110 : 145 }}
                transition={{ duration: 0.5 }}
              />

              {/* Labels for steps 0-2 */}
              <motion.g
                animate={{ opacity: trapStep < 3 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <text x="145" y="30" textAnchor="middle" fontSize="11" fill="#1f2937" fontWeight="bold">
                  b (base menor)
                </text>
                <text x="145" y="140" textAnchor="middle" fontSize="11" fill="#1f2937" fontWeight="bold">
                  B (base mayor)
                </text>
                <text x="155" y="85" textAnchor="start" fontSize="14" fill="#1f2937" fontWeight="bold">
                  h
                </text>
              </motion.g>

              {/* Success labels for step 3 */}
              {trapStep === 3 && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <text x="120" y="30" textAnchor="middle" fontSize="12" fill="#166534" fontWeight="bold">
                    B + b
                  </text>
                  <text x="120" y="85" textAnchor="middle" fontSize="16" fill="#166534" fontWeight="bold">
                    ¡Paralelogramo!
                  </text>
                  <text x="120" y="140" textAnchor="middle" fontSize="11" fill="#1f2937" fontWeight="bold">
                    B + b
                  </text>
                </motion.g>
              )}
            </svg>
          </div>

          {/* Step description */}
          <motion.div
            key={trapStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-3 mb-4"
          >
            <p className="text-orange-800 dark:text-orange-200 text-center font-medium">
              {stepDescriptions[trapStep]}
            </p>
          </motion.div>

          {/* Controls - simplified without Pause */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                if (trapStep === 3) {
                  setTrapStep(0);
                  setTimeout(() => setIsPlaying(true), 100);
                } else {
                  setIsPlaying(true);
                }
              }}
              disabled={isPlaying && trapStep < 3}
              className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play size={18} />
              <span>{trapStep === 3 ? 'Repetir' : 'Animar'}</span>
            </button>
            {trapStep > 0 && (
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setTrapStep(0);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Formula reveal (only after animation) */}
        {trapStep === 3 && (
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 rounded-xl p-5 animate-fadeIn">
            <p className="text-center text-gray-700 dark:text-gray-300 mb-2">
              El trapecio es <strong>la mitad</strong> de ese paralelogramo:
            </p>
            <div className="text-center">
              <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                A = ½ × (B + b) × h
              </span>
            </div>
          </div>
        )}

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
