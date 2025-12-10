'use client';

import { useState } from 'react';
import { ArrowRight, Check, Sparkles, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'circumference' | 'area' | 'summary';

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [showGrid, setShowGrid] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!isActive) return null;

  // ============ INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubriendo Pi (π)
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El numero magico de los circulos
          </p>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-500" />
              <p className="text-lg text-gray-800 dark:text-gray-200">
                Los antiguos matematicos descubrieron algo increible sobre los circulos...
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Si mides la <strong>circunferencia</strong> y la divides por el <strong>diametro</strong>,
                <br />
                ¡siempre obtienes el mismo numero!
              </p>
            </div>

            {/* Visual showing different circles */}
            <div className="flex justify-center gap-4 py-4">
              <div className="text-center">
                <svg viewBox="0 0 60 60" className="w-12 h-12">
                  <circle cx="30" cy="30" r="25" fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
                </svg>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Pequeno</p>
              </div>
              <div className="text-center">
                <svg viewBox="0 0 80 80" className="w-16 h-16">
                  <circle cx="40" cy="40" r="35" fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
                </svg>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Mediano</p>
              </div>
              <div className="text-center">
                <svg viewBox="0 0 100 100" className="w-20 h-20">
                  <circle cx="50" cy="50" r="45" fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
                </svg>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Grande</p>
              </div>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/40 rounded-lg p-4">
              <p className="text-purple-800 dark:text-purple-200 text-center text-lg font-semibold">
                Circunferencia ÷ Diametro = <span className="text-2xl">π ≈ 3.14159...</span>
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mt-4">
              <p className="text-amber-800 dark:text-amber-200 text-center">
                Este numero se llama <strong>Pi (π)</strong> y es igual para TODOS los circulos.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('circumference')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ver la formula de circunferencia</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ CIRCUMFERENCE ============
  if (phase === 'circumference') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Circunferencia del Circulo
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El perimetro de un circulo
          </p>
        </div>

        {/* Interactive circle with circumference */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-center">
            <svg viewBox="0 0 200 200" className="w-full max-w-xs">
              {/* Main circle */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="#ccfbf1"
                stroke="#0d9488"
                strokeWidth="4"
              />

              {/* Center point */}
              <circle cx="100" cy="100" r="4" fill="#0d9488" />

              {/* Radius line */}
              <line x1="100" y1="100" x2="170" y2="100" stroke="#dc2626" strokeWidth="3" />
              <text x="135" y="95" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">r</text>

              {/* Diameter line (below) */}
              <line x1="30" y1="100" x2="170" y2="100" stroke="#7c3aed" strokeWidth="2" strokeDasharray="6,3" />
              <text x="100" y="190" textAnchor="middle" fontSize="12" fill="#7c3aed">d = 2r</text>

              {/* Circumference arc indicator */}
              <path
                d="M 170 100 A 70 70 0 1 1 169.9 99"
                fill="none"
                stroke="#0d9488"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.5"
              />
              <text x="100" y="25" textAnchor="middle" fontSize="12" fill="#0d9488" fontWeight="bold">
                Circunferencia (C)
              </text>
            </svg>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              La <strong>circunferencia</strong> es la distancia alrededor del circulo.
            </p>
          </div>
        </div>

        <div className="bg-teal-50 dark:bg-teal-900/30 rounded-xl p-5 border border-teal-200 dark:border-teal-700">
          <p className="text-teal-800 dark:text-teal-200 text-center mb-3">
            Como C ÷ d = π, entonces:
          </p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-bold text-teal-900 dark:text-teal-100">
              C = π × d
            </span>
            <span className="text-gray-600 dark:text-gray-400">o tambien</span>
            <span className="text-2xl font-bold text-teal-900 dark:text-teal-100">
              C = 2πr
            </span>
          </div>
          <p className="text-teal-700 dark:text-teal-300 text-center mt-3 text-sm">
            (porque el diametro es 2 veces el radio: d = 2r)
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800 dark:text-green-200 font-semibold text-lg">
              C = 2πr = πd
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('area')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ahora el area</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ AREA ============
  if (phase === 'area') {
    const handleAreaSubmit = () => {
      setShowFeedback(true);
    };

    const handleAreaNext = () => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setShowGrid(false);
      setPhase('summary');
    };

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Area del Circulo
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Descubriendo la formula
          </p>
        </div>

        {/* Interactive circle area visualization */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-center">
            <svg viewBox="0 0 200 200" className="w-full max-w-xs">
              {/* Grid background (optional) */}
              {showGrid && (
                <>
                  <defs>
                    <pattern id="areaGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect x="10" y="10" width="180" height="180" fill="url(#areaGrid)" />
                </>
              )}

              {/* Square outline (for comparison) - side = 2r */}
              <rect
                x="30"
                y="30"
                width="140"
                height="140"
                fill={showGrid ? '#fecaca' : 'none'}
                fillOpacity={showGrid ? '0.3' : '0'}
                stroke={showGrid ? '#dc2626' : 'transparent'}
                strokeWidth="2"
                strokeDasharray="6,3"
                className="transition-all duration-500"
              />

              {/* Main circle */}
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="#ccfbf1"
                stroke="#0d9488"
                strokeWidth="3"
              />

              {/* Center point */}
              <circle cx="100" cy="100" r="4" fill="#0d9488" />

              {/* Radius line */}
              <line x1="100" y1="100" x2="170" y2="100" stroke="#dc2626" strokeWidth="3" />
              <text x="140" y="95" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#dc2626">r</text>

              {showGrid && (
                <>
                  <text x="100" y="185" textAnchor="middle" fontSize="11" fill="#dc2626">
                    Cuadrado: (2r)² = 4r²
                  </text>
                </>
              )}
            </svg>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg font-medium hover:bg-purple-200 dark:hover:bg-purple-900 transition-all"
            >
              {showGrid ? 'Ocultar cuadrado' : 'Comparar con un cuadrado'}
            </button>
          </div>
        </div>

        {showGrid && (
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700 animate-fadeIn">
            <p className="text-purple-800 dark:text-purple-200 text-center">
              El circulo es <strong>un poco mas de 3/4</strong> del cuadrado que lo contiene.
              <br />
              <span className="text-sm">Area del cuadrado = (2r)² = 4r². El circulo es aproximadamente π/4 de eso.</span>
            </p>
          </div>
        )}

        {/* Question */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-center font-semibold mb-4">
            Si π aparece en la circunferencia,
            <br />
            ¿cual sera la formula del area?
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'A = πr', value: 0 },
              { label: 'A = πr²', value: 1 },
              { label: 'A = 2πr', value: 2 },
              { label: 'A = πd²', value: 3 },
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
                  {selectedAnswer === 1 ? '¡Correcto!' : 'La respuesta es A = πr²'}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">
                  El area depende del radio al cuadrado, multiplicado por π.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          {!showFeedback ? (
            <button
              onClick={handleAreaSubmit}
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
              onClick={handleAreaNext}
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
          Has descubierto las formulas del circulo
        </p>
      </div>

      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl p-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          <span className="text-lg font-semibold text-teal-800 dark:text-teal-200">
            Lo que descubriste:
          </span>
        </div>

        <div className="space-y-3">
          {/* Pi */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-600">π</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Pi (π)</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">C ÷ d = 3.14159...</p>
            </div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              ≈ 3.14
            </div>
          </div>

          {/* Circumference */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4">
            <svg viewBox="0 0 50 50" className="w-12 h-12 flex-shrink-0">
              <circle cx="25" cy="25" r="20" fill="none" stroke="#0d9488" strokeWidth="4" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Circunferencia</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Perimetro del circulo</p>
            </div>
            <div className="text-lg font-bold text-teal-600 dark:text-teal-400">
              C = 2πr
            </div>
          </div>

          {/* Area */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4">
            <svg viewBox="0 0 50 50" className="w-12 h-12 flex-shrink-0">
              <circle cx="25" cy="25" r="20" fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Area</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Espacio dentro del circulo</p>
            </div>
            <div className="text-lg font-bold text-teal-600 dark:text-teal-400">
              A = πr²
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <p className="text-amber-800 dark:text-amber-200">
            <strong>Patron clave:</strong> Ambas formulas usan π (pi).
            La circunferencia usa r, el area usa r² (radio al cuadrado).
          </p>
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
