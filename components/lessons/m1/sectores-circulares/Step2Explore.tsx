'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'explore' | 'quiz' | 'summary';

// Helper function to create sector path
function sectorPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  if (endAngle - startAngle >= 360) {
    // Full circle
    return `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy}`;
  }

  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);

  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
}

// Helper function to create arc path (no fill, just the curve)
function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);

  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [angle, setAngle] = useState(90);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showQuizFeedback, setShowQuizFeedback] = useState(false);

  const radius = 10; // meters for calculation display
  const circleRadius = 70; // SVG units
  const cx = 110;
  const cy = 100;

  // Calculations
  const fraction = angle / 360;
  const fullArea = Math.PI * radius * radius;
  const sectorArea = fraction * fullArea;
  const fullCircumference = 2 * Math.PI * radius;
  const arcLength = fraction * fullCircumference;

  if (!isActive) return null;

  // ============ INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubre la Fraccion
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El sector como parte del circulo
          </p>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-500" />
              <p className="text-lg text-gray-800 dark:text-gray-200">
                Un sector circular es como una &ldquo;rebanada&rdquo; del circulo...
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 dark:text-gray-400 text-center">
                El angulo central <strong>θ</strong> determina que <strong>fraccion</strong> del circulo tienes.
              </p>
            </div>

            <div className="flex justify-center gap-6 py-4">
              {/* Example sectors */}
              <div className="text-center">
                <svg viewBox="0 0 60 60" className="w-16 h-16">
                  <circle cx="30" cy="30" r="25" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
                  <path d={sectorPath(30, 30, 25, 0, 90)} fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
                </svg>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">θ = 90°</p>
                <p className="text-xs font-semibold text-teal-600">¼ del circulo</p>
              </div>
              <div className="text-center">
                <svg viewBox="0 0 60 60" className="w-16 h-16">
                  <circle cx="30" cy="30" r="25" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
                  <path d={sectorPath(30, 30, 25, 0, 180)} fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
                </svg>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">θ = 180°</p>
                <p className="text-xs font-semibold text-teal-600">½ del circulo</p>
              </div>
              <div className="text-center">
                <svg viewBox="0 0 60 60" className="w-16 h-16">
                  <circle cx="30" cy="30" r="25" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
                  <path d={sectorPath(30, 30, 25, 0, 60)} fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
                </svg>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">θ = 60°</p>
                <p className="text-xs font-semibold text-teal-600">⅙ del circulo</p>
              </div>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/40 rounded-lg p-4">
              <p className="text-purple-800 dark:text-purple-200 text-center text-lg font-semibold">
                Fraccion del circulo = θ / 360°
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('explore')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Explorar interactivamente</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ EXPLORE ============
  if (phase === 'explore') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Explora el Sector
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ajusta el angulo y observa los calculos
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          {/* Interactive SVG */}
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 220 200" className="w-full max-w-sm">
              {/* Grid background */}
              <defs>
                <pattern id="gridSector" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="220" height="200" fill="url(#gridSector)" />

              {/* Full circle (gray background) */}
              <circle
                cx={cx}
                cy={cy}
                r={circleRadius}
                fill="#f3f4f6"
                stroke="#d1d5db"
                strokeWidth="2"
              />

              {/* Sector (highlighted) */}
              <path
                d={sectorPath(cx, cy, circleRadius, 0, angle)}
                fill="#5eead4"
                fillOpacity="0.7"
                stroke="#0d9488"
                strokeWidth="3"
              />

              {/* Arc highlight */}
              <path
                d={arcPath(cx, cy, circleRadius, 0, angle)}
                fill="none"
                stroke="#7c3aed"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Radius lines */}
              <line x1={cx} y1={cy} x2={cx} y2={cy - circleRadius} stroke="#dc2626" strokeWidth="2" />
              {angle > 0 && (
                <line
                  x1={cx}
                  y1={cy}
                  x2={cx + circleRadius * Math.cos((angle - 90) * Math.PI / 180)}
                  y2={cy + circleRadius * Math.sin((angle - 90) * Math.PI / 180)}
                  stroke="#dc2626"
                  strokeWidth="2"
                />
              )}

              {/* Center point */}
              <circle cx={cx} cy={cy} r="4" fill="#0d9488" />

              {/* Angle arc indicator */}
              <path
                d={arcPath(cx, cy, 25, 0, Math.min(angle, 350))}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
              />

              {/* Labels */}
              <text x={cx} y={cy - circleRadius - 8} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
                r = {radius} m
              </text>

              {angle >= 30 && (
                <text
                  x={cx + 35 * Math.cos(((angle / 2) - 90) * Math.PI / 180)}
                  y={cy + 35 * Math.sin(((angle / 2) - 90) * Math.PI / 180)}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#f59e0b"
                >
                  {angle}°
                </text>
              )}
            </svg>
          </div>

          {/* Angle slider */}
          <div className="mb-6 px-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Angulo (θ): <span className="text-teal-600 font-bold">{angle}°</span>
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Fraccion: <span className="font-bold">{fraction.toFixed(3)}</span> = <span className="font-bold">{angle}/360</span>
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="5"
              value={angle}
              onChange={(e) => setAngle(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0°</span>
              <span>90°</span>
              <span>180°</span>
              <span>270°</span>
              <span>360°</span>
            </div>
          </div>

          {/* Live calculations */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Sector Area */}
            <div className="bg-teal-50 dark:bg-teal-900/30 rounded-lg p-4 border border-teal-200 dark:border-teal-700">
              <h4 className="font-semibold text-teal-800 dark:text-teal-200 mb-2 flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d={sectorPath(12, 12, 10, 0, 90)} fill="#0d9488" />
                </svg>
                Area del Sector
              </h4>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <p>A = (θ/360°) × πr²</p>
                <p>A = ({angle}/360) × π × {radius}²</p>
                <p className="font-bold text-teal-700 dark:text-teal-400 text-lg">
                  A = {sectorArea.toFixed(2)} m²
                </p>
              </div>
            </div>

            {/* Arc Length */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d={arcPath(12, 12, 10, 0, 90)} fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Longitud del Arco
              </h4>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <p>L = (θ/360°) × 2πr</p>
                <p>L = ({angle}/360) × 2π × {radius}</p>
                <p className="font-bold text-purple-700 dark:text-purple-400 text-lg">
                  L = {arcLength.toFixed(2)} m
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Insight box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <div>
              <p className="text-amber-800 dark:text-amber-200">
                <strong>Patron clave:</strong> Tanto el area del sector como la longitud del arco
                son la <strong>misma fraccion</strong> (θ/360°) del circulo completo.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('quiz')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Probar mi comprension</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ QUIZ ============
  if (phase === 'quiz') {
    const handleQuizSubmit = () => {
      setShowQuizFeedback(true);
    };

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Verifica tu Comprension
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Responde esta pregunta rapida
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-lg font-semibold text-center mb-4">
            Si un sector tiene un angulo de 180°, ¿que fraccion del area del circulo completo representa?
          </p>

          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 120 120" className="w-32 h-32">
              <circle cx="60" cy="60" r="50" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />
              <path d={sectorPath(60, 60, 50, 0, 180)} fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
              <circle cx="60" cy="60" r="3" fill="#0d9488" />
              <text x="60" y="50" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0d9488">180°</text>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '⅛', value: 0 },
              { label: '¼', value: 1 },
              { label: '⅓', value: 2 },
              { label: '½', value: 3 },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedQuizAnswer(option.value)}
                disabled={showQuizFeedback}
                className={cn(
                  'p-4 rounded-xl font-semibold text-xl transition-all border-2',
                  selectedQuizAnswer === option.value
                    ? showQuizFeedback
                      ? option.value === 3
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                        : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                      : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500'
                    : showQuizFeedback && option.value === 3
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-white dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {showQuizFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              'p-4 rounded-xl',
              selectedQuizAnswer === 3
                ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
            )}
          >
            <div className="flex items-start gap-3">
              <Check className={cn(
                'w-6 h-6 flex-shrink-0',
                selectedQuizAnswer === 3 ? 'text-green-600' : 'text-amber-600'
              )} />
              <div>
                <p className={cn(
                  'font-bold',
                  selectedQuizAnswer === 3 ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}>
                  {selectedQuizAnswer === 3 ? '¡Correcto!' : 'La respuesta es ½'}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">
                  180° / 360° = ½. Un semicirculo es exactamente la mitad del circulo completo.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex justify-center">
          {!showQuizFeedback ? (
            <button
              onClick={handleQuizSubmit}
              disabled={selectedQuizAnswer === null}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all',
                selectedQuizAnswer !== null
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              Verificar
            </button>
          ) : (
            <button
              onClick={() => setPhase('summary')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Ver resumen</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Excelente trabajo!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Has descubierto las formulas del sector circular
        </p>
      </div>

      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl p-6">
        <div className="space-y-3">
          {/* Key insight */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-amber-600">θ</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">La fraccion clave</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">El angulo determina que porcion del circulo tienes</p>
            </div>
            <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
              θ/360°
            </div>
          </motion.div>

          {/* Sector Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4"
          >
            <svg viewBox="0 0 50 50" className="w-12 h-12 flex-shrink-0">
              <path d={sectorPath(25, 25, 20, 0, 90)} fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Area del Sector</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Fraccion del area total</p>
            </div>
            <div className="text-lg font-bold text-teal-600 dark:text-teal-400">
              (θ/360°) × πr²
            </div>
          </motion.div>

          {/* Arc Length */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4"
          >
            <svg viewBox="0 0 50 50" className="w-12 h-12 flex-shrink-0">
              <path d={arcPath(25, 25, 20, 0, 90)} fill="none" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Longitud del Arco</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Fraccion de la circunferencia</p>
            </div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              (θ/360°) × 2πr
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Ver las formulas completas</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
