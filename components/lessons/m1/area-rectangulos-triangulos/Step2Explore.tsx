'use client';

import { useState } from 'react';
import { ArrowRight, Check, Sparkles, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'rectangle' | 'triangle' | 'summary';

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [showDecomposition, setShowDecomposition] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!isActive) return null;

  // ============ INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubriendo Fórmulas de Área
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿De dónde vienen las fórmulas?
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-500" />
              <p className="text-lg text-gray-800 dark:text-gray-200">
                La clave para entender las áreas es <strong>contar cuadritos</strong>.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Empezaremos con el <strong>rectángulo</strong>, la figura más simple.
                <br />
                Luego veremos cómo el <strong>triángulo</strong> se relaciona con él.
              </p>
            </div>

            {/* Visual showing the two shapes */}
            <div className="flex justify-center gap-6 py-4">
              <div className="text-center">
                <svg viewBox="0 0 80 60" className="w-20 h-16">
                  <rect x="10" y="10" width="60" height="40" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
                </svg>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Rectángulo</p>
              </div>
              <div className="text-center">
                <svg viewBox="0 0 80 60" className="w-20 h-16">
                  <polygon points="40,10 10,50 70,50" fill="#86efac" stroke="#166534" strokeWidth="2" />
                </svg>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Triángulo</p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mt-4">
              <p className="text-amber-800 dark:text-amber-200 text-center">
                Vamos a descubrir las fórmulas paso a paso.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('rectangle')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Comenzar con el Rectángulo</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ RECTANGLE ============
  if (phase === 'rectangle') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Rectángulo
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            La base de todas las fórmulas
          </p>
        </div>

        {/* Interactive rectangle with grid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-center">
            <svg viewBox="0 0 220 160" className="w-full max-w-sm">
              {/* Grid background */}
              <defs>
                <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect x="10" y="10" width="200" height="140" fill="url(#grid)" />

              {/* Rectangle 5x4 units */}
              <rect x="35" y="35" width="125" height="100" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />

              {/* Grid lines inside rectangle */}
              {[1, 2, 3, 4].map(i => (
                <line key={`v${i}`} x1={35 + i * 25} y1="35" x2={35 + i * 25} y2="135" stroke="#1d4ed8" strokeWidth="0.5" strokeDasharray="4,4" />
              ))}
              {[1, 2, 3].map(i => (
                <line key={`h${i}`} x1="35" y1={35 + i * 25} x2="160" y2={35 + i * 25} stroke="#1d4ed8" strokeWidth="0.5" strokeDasharray="4,4" />
              ))}

              {/* Dimensions */}
              <text x="97" y="150" textAnchor="middle" fontSize="14" fill="#1f2937" fontWeight="bold">base = 5</text>
              <text x="175" y="90" textAnchor="start" fontSize="14" fill="#1f2937" fontWeight="bold">altura = 4</text>

              {/* Unit square label */}
              <text x="47" y="55" fontSize="10" fill="#1d4ed8">1</text>
            </svg>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              Cada cuadrito es <strong>1 unidad²</strong>. ¿Cuántos hay en total?
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-center">
            <strong>5 columnas × 4 filas = 20 cuadritos</strong>
          </p>
          <p className="text-blue-700 dark:text-blue-300 text-center mt-2 text-sm">
            Por eso el área del rectángulo es: <strong>base × altura</strong>
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800 dark:text-green-200 font-semibold text-lg">
              A = b × h
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('triangle')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ahora el Triángulo</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ TRIANGLE ============
  if (phase === 'triangle') {
    const handleTriangleSubmit = () => {
      setShowFeedback(true);
    };

    const handleTriangleNext = () => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setShowDecomposition(false);
      setPhase('summary');
    };

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Triángulo
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Descubriendo la fórmula
          </p>
        </div>

        {/* Interactive triangle visualization */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-center">
            <svg viewBox="0 0 220 160" className="w-full max-w-sm">
              {/* Rectangle outline (ghosted) */}
              <rect
                x="35" y="35" width="150" height="100"
                fill="none"
                stroke={showDecomposition ? '#94a3b8' : 'transparent'}
                strokeWidth="2"
                strokeDasharray="6,4"
                className="transition-all duration-500"
              />

              {/* Original triangle */}
              <polygon
                points="35,135 185,135 110,35"
                fill="#86efac"
                stroke="#166534"
                strokeWidth="2"
              />

              {/* Second triangle (appears on decomposition) */}
              {showDecomposition && (
                <polygon
                  points="35,135 35,35 110,35"
                  fill="#fca5a5"
                  stroke="#dc2626"
                  strokeWidth="2"
                  className="animate-fadeIn"
                  opacity="0.7"
                />
              )}
              {showDecomposition && (
                <polygon
                  points="185,135 185,35 110,35"
                  fill="#fca5a5"
                  stroke="#dc2626"
                  strokeWidth="2"
                  className="animate-fadeIn"
                  opacity="0.7"
                />
              )}

              {/* Dimensions */}
              <text x="110" y="152" textAnchor="middle" fontSize="14" fill="#1f2937" fontWeight="bold">base</text>
              <text x="50" y="85" textAnchor="start" fontSize="14" fill="#1f2937" fontWeight="bold">altura</text>
              <line x1="110" y1="35" x2="110" y2="135" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />
            </svg>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowDecomposition(!showDecomposition)}
              className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg font-medium hover:bg-purple-200 dark:hover:bg-purple-900 transition-all"
            >
              {showDecomposition ? 'Ocultar rectángulo' : 'Ver el rectángulo oculto'}
            </button>
          </div>
        </div>

        {showDecomposition && (
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700 animate-fadeIn">
            <p className="text-purple-800 dark:text-purple-200 text-center">
              El triángulo es <strong>exactamente la mitad</strong> del rectángulo.
              <br />
              <span className="text-sm">Los dos triángulos rojos completan el rectángulo.</span>
            </p>
          </div>
        )}

        {/* Question */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-center font-semibold mb-4">
            Si el rectángulo tiene área = base × altura,
            <br />
            ¿cuál es el área del triángulo?
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'base × altura', value: 0 },
              { label: '½ × base × altura', value: 1 },
              { label: '2 × base × altura', value: 2 },
              { label: 'base + altura', value: 3 },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedAnswer(option.value)}
                disabled={showFeedback}
                className={cn(
                  'p-3 rounded-xl font-semibold transition-all border-2 text-sm',
                  selectedAnswer === option.value
                    ? showFeedback
                      ? option.value === 1
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500'
                        : 'bg-red-100 dark:bg-red-900/50 border-red-500'
                      : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500'
                    : showFeedback && option.value === 1
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-white dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {showFeedback && (
          <div className={cn(
            'p-4 rounded-xl animate-fadeIn',
            selectedAnswer === 1
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
          )}>
            <div className="flex items-start gap-3">
              <Check className={cn(
                'w-6 h-6 flex-shrink-0',
                selectedAnswer === 1 ? 'text-green-600' : 'text-amber-600'
              )} />
              <div>
                <p className={cn(
                  'font-bold',
                  selectedAnswer === 1 ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}>
                  {selectedAnswer === 1 ? '¡Correcto!' : 'La respuesta es ½ × base × altura'}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">
                  El triángulo es la mitad del rectángulo, por eso dividimos por 2.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          {!showFeedback ? (
            <button
              onClick={handleTriangleSubmit}
              disabled={selectedAnswer === null}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all',
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              Verificar
            </button>
          ) : (
            <button
              onClick={handleTriangleNext}
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
          Has descubierto las fórmulas fundamentales
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          <span className="text-lg font-semibold text-green-800 dark:text-green-200">
            Lo que descubriste:
          </span>
        </div>

        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4">
            <svg viewBox="0 0 50 40" className="w-12 h-10 flex-shrink-0">
              <rect x="5" y="5" width="40" height="30" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Rectángulo</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Contamos cuadritos: columnas × filas</p>
            </div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              b × h
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4">
            <svg viewBox="0 0 50 40" className="w-12 h-10 flex-shrink-0">
              <polygon points="25,5 5,35 45,35" fill="#86efac" stroke="#166534" strokeWidth="2" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Triángulo</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">La mitad del rectángulo</p>
            </div>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              ½ × b × h
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <p className="text-amber-800 dark:text-amber-200">
            <strong>Patrón clave:</strong> El triángulo es exactamente la mitad del rectángulo.
            Por eso su fórmula es <strong>½ × base × altura</strong>.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Ver las fórmulas completas</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
