'use client';

import { useState } from 'react';
import { ArrowRight, Check, Sparkles, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'circumference' | 'area' | 'summary';

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [showUnroll, setShowUnroll] = useState(false);
  const [showSlices, setShowSlices] = useState(false);
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
            ¿Por que C = π × d?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Descubre de donde viene la formula
          </p>
        </div>

        {/* Interactive visualization */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-center">
            <svg viewBox="0 0 300 180" className="w-full max-w-md">
              {!showUnroll ? (
                <>
                  {/* Circle with diameter marked */}
                  <circle
                    cx="80"
                    cy="90"
                    r="60"
                    fill="#ccfbf1"
                    stroke="#0d9488"
                    strokeWidth="3"
                  />
                  <circle cx="80" cy="90" r="4" fill="#0d9488" />

                  {/* Diameter line */}
                  <line x1="20" y1="90" x2="140" y2="90" stroke="#7c3aed" strokeWidth="3" />
                  <text x="80" y="80" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7c3aed">d</text>

                  {/* Question marks around */}
                  <text x="80" y="25" textAnchor="middle" fontSize="16" fill="#6b7280">?</text>
                  <text x="150" y="90" textAnchor="middle" fontSize="16" fill="#6b7280">?</text>
                  <text x="80" y="165" textAnchor="middle" fontSize="16" fill="#6b7280">?</text>
                  <text x="10" y="90" textAnchor="middle" fontSize="16" fill="#6b7280">?</text>

                  {/* Arrow pointing to button */}
                  <text x="220" y="90" textAnchor="middle" fontSize="12" fill="#6b7280">
                    ¿Cuantas veces cabe
                  </text>
                  <text x="220" y="105" textAnchor="middle" fontSize="12" fill="#6b7280">
                    el diametro en
                  </text>
                  <text x="220" y="120" textAnchor="middle" fontSize="12" fill="#6b7280">
                    la circunferencia?
                  </text>
                </>
              ) : (
                <>
                  {/* Unrolled circumference as a line */}
                  <line x1="20" y1="50" x2="280" y2="50" stroke="#0d9488" strokeWidth="4" />
                  <text x="150" y="35" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0d9488">
                    Circunferencia (desenrollada)
                  </text>

                  {/* Diameter segments marked on the line */}
                  {/* Segment 1 */}
                  <line x1="20" y1="70" x2="103" y2="70" stroke="#7c3aed" strokeWidth="4" />
                  <text x="61" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed">d</text>

                  {/* Segment 2 */}
                  <line x1="107" y1="70" x2="190" y2="70" stroke="#ec4899" strokeWidth="4" />
                  <text x="148" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ec4899">d</text>

                  {/* Segment 3 */}
                  <line x1="194" y1="70" x2="277" y2="70" stroke="#f59e0b" strokeWidth="4" />
                  <text x="235" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#f59e0b">d</text>

                  {/* Remaining bit (0.14d) */}
                  <line x1="277" y1="70" x2="280" y2="70" stroke="#10b981" strokeWidth="4" />

                  {/* Labels */}
                  <text x="150" y="115" textAnchor="middle" fontSize="13" fill="#1f2937">
                    ¡El diametro cabe 3.14 veces!
                  </text>

                  {/* Count bubbles */}
                  <circle cx="61" cy="140" r="15" fill="#7c3aed" />
                  <text x="61" y="145" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">1</text>

                  <circle cx="148" cy="140" r="15" fill="#ec4899" />
                  <text x="148" y="145" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">2</text>

                  <circle cx="235" cy="140" r="15" fill="#f59e0b" />
                  <text x="235" y="145" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">3</text>

                  <text x="275" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#10b981">.14</text>
                </>
              )}
            </svg>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowUnroll(!showUnroll)}
              className="px-4 py-2 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-lg font-medium hover:bg-teal-200 dark:hover:bg-teal-900 transition-all"
            >
              {showUnroll ? 'Ver el circulo' : 'Desenrollar la circunferencia'}
            </button>
          </div>
        </div>

        {showUnroll && (
          <div className="bg-teal-50 dark:bg-teal-900/30 rounded-xl p-5 border border-teal-200 dark:border-teal-700 animate-fadeIn">
            <p className="text-teal-800 dark:text-teal-200 text-center">
              <strong>¡Eso es π!</strong> El diametro cabe <strong>π veces</strong> (≈ 3.14) en la circunferencia.
            </p>
            <p className="text-teal-700 dark:text-teal-300 text-center mt-2 text-sm">
              Por eso: Circunferencia = π × diametro = <strong>C = πd</strong>
            </p>
          </div>
        )}

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
          <p className="text-purple-800 dark:text-purple-200 text-center mb-3 font-semibold">
            Las dos formas de escribir la formula:
          </p>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-purple-900 dark:text-purple-100">
                C = π × d
              </span>
              <span className="text-gray-500">(usando diametro)</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-purple-900 dark:text-purple-100">
                C = 2πr
              </span>
              <span className="text-gray-500">(usando radio, porque d = 2r)</span>
            </div>
          </div>
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
      setShowSlices(false);
      setPhase('summary');
    };

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Por que A = πr²?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Descubre de donde viene la formula del area
          </p>
        </div>

        {/* Interactive circle area visualization */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-center">
            <svg viewBox="0 0 320 200" className="w-full max-w-md">
              {!showSlices ? (
                <>
                  {/* Circle divided into slices (like pizza) */}
                  <g transform="translate(100, 100)">
                    {/* 8 slices */}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                      const angle1 = (i * 45 * Math.PI) / 180;
                      const angle2 = ((i + 1) * 45 * Math.PI) / 180;
                      const x1 = 70 * Math.cos(angle1);
                      const y1 = 70 * Math.sin(angle1);
                      const x2 = 70 * Math.cos(angle2);
                      const y2 = 70 * Math.sin(angle2);
                      const colors = ['#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488'];
                      return (
                        <path
                          key={i}
                          d={`M 0 0 L ${x1} ${y1} A 70 70 0 0 1 ${x2} ${y2} Z`}
                          fill={colors[i]}
                          stroke="#0d9488"
                          strokeWidth="1"
                        />
                      );
                    })}
                    <circle cx="0" cy="0" r="4" fill="#0d9488" />
                    {/* Radius label */}
                    <line x1="0" y1="0" x2="70" y2="0" stroke="#dc2626" strokeWidth="2" />
                    <text x="35" y="-8" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">r</text>
                  </g>

                  <text x="100" y="190" textAnchor="middle" fontSize="11" fill="#6b7280">
                    Circulo cortado como pizza
                  </text>

                  {/* Arrow */}
                  <path d="M 185 100 L 210 100" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                    </marker>
                  </defs>

                  <text x="260" y="95" textAnchor="middle" fontSize="11" fill="#6b7280">
                    Presiona el boton
                  </text>
                  <text x="260" y="110" textAnchor="middle" fontSize="11" fill="#6b7280">
                    para reorganizar
                  </text>
                </>
              ) : (
                <>
                  {/* Slices rearranged into parallelogram */}
                  <g transform="translate(40, 60)">
                    {/* Bottom row (pointing up) */}
                    {[0, 1, 2, 3].map((i) => (
                      <path
                        key={`up-${i}`}
                        d={`M ${i * 55} 80 L ${i * 55 + 27.5} 10 L ${i * 55 + 55} 80 Z`}
                        fill={['#5eead4', '#14b8a6', '#5eead4', '#14b8a6'][i]}
                        stroke="#0d9488"
                        strokeWidth="1"
                      />
                    ))}
                    {/* Top row (pointing down) */}
                    {[0, 1, 2, 3].map((i) => (
                      <path
                        key={`down-${i}`}
                        d={`M ${i * 55 + 27.5} 10 L ${i * 55 + 55} 80 L ${i * 55 + 82.5} 10 Z`}
                        fill={['#2dd4bf', '#0d9488', '#2dd4bf', '#0d9488'][i]}
                        stroke="#0d9488"
                        strokeWidth="1"
                      />
                    ))}
                  </g>

                  {/* Labels */}
                  {/* Base = half circumference = πr */}
                  <line x1="40" y1="150" x2="260" y2="150" stroke="#7c3aed" strokeWidth="3" />
                  <text x="150" y="170" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed">
                    base = πr (mitad de la circunferencia)
                  </text>

                  {/* Height = r */}
                  <line x1="275" y1="70" x2="275" y2="140" stroke="#dc2626" strokeWidth="3" />
                  <text x="295" y="110" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">
                    altura = r
                  </text>
                </>
              )}
            </svg>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowSlices(!showSlices)}
              className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg font-medium hover:bg-purple-200 dark:hover:bg-purple-900 transition-all"
            >
              {showSlices ? 'Ver el circulo' : 'Reorganizar las rebanadas'}
            </button>
          </div>
        </div>

        {showSlices && (
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700 animate-fadeIn">
            <p className="text-purple-800 dark:text-purple-200 text-center">
              ¡Las rebanadas forman casi un <strong>rectangulo</strong>!
            </p>
            <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                <strong>Area del rectangulo</strong> = base × altura
              </p>
              <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-1">
                = <span className="text-purple-600 font-semibold">πr</span> × <span className="text-red-600 font-semibold">r</span>
              </p>
              <p className="text-center text-lg font-bold text-teal-600 dark:text-teal-400 mt-2">
                = πr²
              </p>
            </div>
          </div>
        )}

        {/* Question */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-center font-semibold mb-4">
            Entonces, ¿cual es la formula del area de un circulo?
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
                  El area es π veces el radio al cuadrado, porque el circulo se puede reorganizar en un rectangulo de base πr y altura r.
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
              <p className="text-gray-600 dark:text-gray-400 text-sm">El diametro cabe π veces en la circunferencia</p>
            </div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              ≈ 3.14
            </div>
          </div>

          {/* Circumference */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4">
            <svg viewBox="0 0 50 50" className="w-12 h-12 flex-shrink-0">
              <circle cx="25" cy="25" r="20" fill="none" stroke="#0d9488" strokeWidth="3" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Circunferencia</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">π veces el diametro</p>
            </div>
            <div className="text-lg font-bold text-teal-600 dark:text-teal-400">
              C = πd
            </div>
          </div>

          {/* Area */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4">
            <svg viewBox="0 0 50 50" className="w-12 h-12 flex-shrink-0">
              <circle cx="25" cy="25" r="20" fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Area</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Rebanadas forman rectangulo πr × r</p>
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
            La circunferencia usa el diametro (o 2r), el area usa r² (radio al cuadrado).
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
