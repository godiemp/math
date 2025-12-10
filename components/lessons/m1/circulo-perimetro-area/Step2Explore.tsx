'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Check, Sparkles, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'circumference' | 'area' | 'summary';

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [circumferenceAnimStep, setCircumferenceAnimStep] = useState(0);
  const [areaAnimStep, setAreaAnimStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Auto-advance circumference animation
  useEffect(() => {
    if (phase === 'circumference' && circumferenceAnimStep < 3) {
      const timer = setTimeout(() => {
        setCircumferenceAnimStep((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, circumferenceAnimStep]);

  // Auto-advance area animation
  useEffect(() => {
    if (phase === 'area' && areaAnimStep < 2) {
      const timer = setTimeout(() => {
        setAreaAnimStep((prev) => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [phase, areaAnimStep]);

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
        <style jsx>{`
          @keyframes unrollCircle {
            0% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
            100% {
              stroke-dashoffset: 377;
              opacity: 0;
            }
          }
          @keyframes showLine {
            0% {
              transform: scaleX(0);
              opacity: 0;
            }
            100% {
              transform: scaleX(1);
              opacity: 1;
            }
          }
          @keyframes slideInSegment1 {
            0% {
              transform: translateX(-50px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slideInSegment2 {
            0% {
              transform: translateX(-50px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slideInSegment3 {
            0% {
              transform: translateX(-50px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes popIn {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          @keyframes fadeInUp {
            0% {
              transform: translateY(10px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .circle-unroll {
            animation: unrollCircle 1.2s ease-out forwards;
          }
          .line-appear {
            transform-origin: left center;
            animation: showLine 0.8s ease-out forwards;
          }
          .segment-1 {
            animation: slideInSegment1 0.5s ease-out 0s forwards;
          }
          .segment-2 {
            animation: slideInSegment2 0.5s ease-out 0.2s forwards;
          }
          .segment-3 {
            animation: slideInSegment3 0.5s ease-out 0.4s forwards;
          }
          .pop-in {
            animation: popIn 0.4s ease-out forwards;
          }
          .fade-in-up {
            animation: fadeInUp 0.5s ease-out forwards;
          }
        `}</style>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Por que C = π × d?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Observa como el diametro cabe en la circunferencia
          </p>
        </div>

        {/* Animated visualization */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-center">
            <svg viewBox="0 0 320 200" className="w-full max-w-md">
              {/* Phase 0: Circle with diameter */}
              {circumferenceAnimStep === 0 && (
                <>
                  <circle
                    cx="160"
                    cy="90"
                    r="60"
                    fill="#ccfbf1"
                    stroke="#0d9488"
                    strokeWidth="4"
                  />
                  <circle cx="160" cy="90" r="4" fill="#0d9488" />

                  {/* Diameter line */}
                  <line x1="100" y1="90" x2="220" y2="90" stroke="#7c3aed" strokeWidth="4" />
                  <text x="160" y="80" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7c3aed">d</text>

                  {/* Circumference label */}
                  <text x="160" y="170" textAnchor="middle" fontSize="13" fill="#0d9488" fontWeight="bold">
                    Circunferencia (borde del círculo)
                  </text>

                  {/* Animated pulse on circle edge */}
                  <circle
                    cx="160"
                    cy="90"
                    r="60"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="4"
                    strokeDasharray="8 4"
                    className="animate-pulse"
                  />
                </>
              )}

              {/* Phase 1+: Unrolled circumference as a line */}
              {circumferenceAnimStep >= 1 && (
                <>
                  {/* Main circumference line */}
                  <line
                    x1="20" y1="40" x2="300" y2="40"
                    stroke="#0d9488" strokeWidth="5"
                    className="line-appear"
                  />
                  <text
                    x="160" y="25"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                    fill="#0d9488"
                    className="fade-in-up"
                  >
                    Circunferencia desenrollada
                  </text>

                  {/* Diameter segments with staggered animation */}
                  <g className="segment-1" style={{ opacity: 0 }}>
                    <line x1="20" y1="65" x2="109" y2="65" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
                    <text x="64" y="85" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7c3aed">d</text>
                  </g>

                  <g className="segment-2" style={{ opacity: 0 }}>
                    <line x1="113" y1="65" x2="202" y2="65" stroke="#ec4899" strokeWidth="5" strokeLinecap="round" />
                    <text x="157" y="85" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ec4899">d</text>
                  </g>

                  <g className="segment-3" style={{ opacity: 0 }}>
                    <line x1="206" y1="65" x2="295" y2="65" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
                    <text x="250" y="85" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#f59e0b">d</text>
                  </g>

                  {/* Remaining .14 portion */}
                  <line x1="295" y1="65" x2="300" y2="65" stroke="#10b981" strokeWidth="5" strokeLinecap="round" style={{ opacity: circumferenceAnimStep >= 2 ? 1 : 0 }} />
                </>
              )}

              {/* Phase 2: Count bubbles */}
              {circumferenceAnimStep >= 2 && (
                <>
                  <g className="pop-in" style={{ animationDelay: '0s' }}>
                    <circle cx="64" cy="120" r="18" fill="#7c3aed" />
                    <text x="64" y="126" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">1</text>
                  </g>

                  <g className="pop-in" style={{ animationDelay: '0.15s' }}>
                    <circle cx="157" cy="120" r="18" fill="#ec4899" />
                    <text x="157" y="126" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">2</text>
                  </g>

                  <g className="pop-in" style={{ animationDelay: '0.3s' }}>
                    <circle cx="250" cy="120" r="18" fill="#f59e0b" />
                    <text x="250" y="126" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">3</text>
                  </g>

                  <text
                    x="297" y="126"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill="#10b981"
                    className="pop-in"
                    style={{ animationDelay: '0.45s' }}
                  >.14</text>

                  {/* Result label */}
                  <text
                    x="160" y="165"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="bold"
                    fill="#1f2937"
                    className="fade-in-up"
                    style={{ animationDelay: '0.6s' }}
                  >
                    ¡El diámetro cabe 3.14 veces! = π
                  </text>
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Formula explanation - appears after animation */}
        {circumferenceAnimStep >= 2 && (
          <div className="bg-teal-50 dark:bg-teal-900/30 rounded-xl p-5 border border-teal-200 dark:border-teal-700 animate-fadeIn">
            <p className="text-teal-800 dark:text-teal-200 text-center">
              <strong>¡Eso es π!</strong> El diámetro cabe exactamente <strong>π veces</strong> (≈ 3.14) en la circunferencia.
            </p>
            <p className="text-teal-700 dark:text-teal-300 text-center mt-2 text-sm">
              Por eso: Circunferencia = π × diámetro = <strong>C = πd</strong>
            </p>
          </div>
        )}

        {circumferenceAnimStep >= 2 && (
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700 animate-fadeIn">
            <p className="text-purple-800 dark:text-purple-200 text-center mb-3 font-semibold">
              Las dos formas de escribir la fórmula:
            </p>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-purple-900 dark:text-purple-100">
                  C = π × d
                </span>
                <span className="text-gray-500">(usando diámetro)</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-purple-900 dark:text-purple-100">
                  C = 2πr
                </span>
                <span className="text-gray-500">(usando radio, porque d = 2r)</span>
              </div>
            </div>
          </div>
        )}

        {circumferenceAnimStep >= 2 && (
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700 animate-fadeIn">
            <div className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-green-800 dark:text-green-200 font-semibold text-lg">
                C = 2πr = πd
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('area')}
            disabled={circumferenceAnimStep < 2}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
              circumferenceAnimStep >= 2
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            )}
          >
            <span>Ahora el área</span>
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
      setPhase('summary');
    };

    // Calculate slice positions for animation
    const numSlices = 8;
    const sliceAngle = 360 / numSlices;

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <style jsx>{`
          @keyframes sliceMove {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            100% {
              transform: var(--final-transform);
            }
          }
          @keyframes labelFadeIn {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .slice-animate {
            animation: sliceMove 1.2s ease-in-out forwards;
            animation-delay: var(--delay);
          }
          .label-animate {
            animation: labelFadeIn 0.5s ease-out forwards;
            animation-delay: 1.4s;
            opacity: 0;
          }
        `}</style>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Por qué A = πr²?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Observa cómo las rebanadas forman un rectángulo
          </p>
        </div>

        {/* Animated circle area visualization */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-center">
            <svg viewBox="0 0 360 220" className="w-full max-w-lg">
              {/* Phase 0: Pizza circle */}
              {areaAnimStep === 0 && (
                <g transform="translate(180, 100)">
                  {/* 8 slices like pizza */}
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                    const angle1 = (i * sliceAngle * Math.PI) / 180;
                    const angle2 = ((i + 1) * sliceAngle * Math.PI) / 180;
                    const r = 70;
                    const x1 = r * Math.cos(angle1);
                    const y1 = r * Math.sin(angle1);
                    const x2 = r * Math.cos(angle2);
                    const y2 = r * Math.sin(angle2);
                    const colors = ['#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488'];
                    return (
                      <path
                        key={i}
                        d={`M 0 0 L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                        fill={colors[i]}
                        stroke="#0d9488"
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />
                    );
                  })}
                  <circle cx="0" cy="0" r="4" fill="#0d9488" />

                  {/* Radius indicator */}
                  <line x1="0" y1="0" x2="70" y2="0" stroke="#dc2626" strokeWidth="3" />
                  <text x="35" y="-10" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#dc2626">r</text>

                  {/* Label */}
                  <text x="0" y="100" textAnchor="middle" fontSize="12" fill="#6b7280">
                    Círculo cortado en rebanadas
                  </text>
                </g>
              )}

              {/* Phase 1+: Animated slices moving to rectangle */}
              {areaAnimStep >= 1 && (
                <>
                  {/* Slices rearranged - alternating up and down triangles */}
                  <g transform="translate(30, 50)">
                    {/* Bottom pointing up triangles */}
                    {[0, 1, 2, 3].map((i) => {
                      const colors = ['#5eead4', '#14b8a6', '#5eead4', '#14b8a6'];
                      const baseX = i * 75;
                      return (
                        <path
                          key={`up-${i}`}
                          d={`M ${baseX} 100 L ${baseX + 37.5} 30 L ${baseX + 75} 100 Z`}
                          fill={colors[i]}
                          stroke="#0d9488"
                          strokeWidth="1.5"
                          style={{
                            '--delay': `${i * 0.1}s`,
                            '--final-transform': 'translate(0, 0)',
                          } as React.CSSProperties}
                          className={areaAnimStep === 1 ? 'slice-animate' : ''}
                        />
                      );
                    })}

                    {/* Top pointing down triangles (filling gaps) */}
                    {[0, 1, 2, 3].map((i) => {
                      const colors = ['#2dd4bf', '#0d9488', '#2dd4bf', '#0d9488'];
                      const baseX = i * 75 + 37.5;
                      return (
                        <path
                          key={`down-${i}`}
                          d={`M ${baseX} 30 L ${baseX + 37.5} 100 L ${baseX + 75} 30 Z`}
                          fill={colors[i]}
                          stroke="#0d9488"
                          strokeWidth="1.5"
                          style={{
                            '--delay': `${0.4 + i * 0.1}s`,
                          } as React.CSSProperties}
                          className={areaAnimStep === 1 ? 'slice-animate' : ''}
                        />
                      );
                    })}
                  </g>

                  {/* Labels that appear after animation */}
                  {areaAnimStep >= 2 && (
                    <>
                      {/* Base label */}
                      <line x1="30" y1="165" x2="330" y2="165" stroke="#7c3aed" strokeWidth="3" className="label-animate" />
                      <text x="180" y="185" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed" className="label-animate">
                        base = πr (mitad de la circunferencia)
                      </text>

                      {/* Height label */}
                      <line x1="340" y1="50" x2="340" y2="150" stroke="#dc2626" strokeWidth="3" className="label-animate" />
                      <text x="352" y="105" textAnchor="start" fontSize="13" fontWeight="bold" fill="#dc2626" className="label-animate">
                        altura = r
                      </text>
                    </>
                  )}
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Explanation that appears after animation */}
        {areaAnimStep >= 2 && (
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700 animate-fadeIn">
            <p className="text-purple-800 dark:text-purple-200 text-center">
              ¡Las rebanadas forman casi un <strong>rectángulo</strong>!
            </p>
            <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                <strong>Área del rectángulo</strong> = base × altura
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

        {/* Question - appears after animation */}
        {areaAnimStep >= 2 && (
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700 animate-fadeIn">
            <p className="text-blue-800 dark:text-blue-200 text-center font-semibold mb-4">
              Entonces, ¿cuál es la fórmula del área de un círculo?
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
        )}

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
                  El área es π veces el radio al cuadrado, porque el círculo se puede reorganizar en un rectángulo de base πr y altura r.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          {areaAnimStep < 2 ? (
            <div className="text-gray-500 dark:text-gray-400 text-sm animate-pulse">
              Observando la animación...
            </div>
          ) : !showFeedback ? (
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
          Has descubierto las fórmulas del círculo
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
              <p className="text-gray-600 dark:text-gray-400 text-sm">El diámetro cabe π veces en la circunferencia</p>
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
              <p className="text-gray-600 dark:text-gray-400 text-sm">π veces el diámetro</p>
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
              <p className="font-semibold text-gray-800 dark:text-gray-200">Área</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Rebanadas forman rectángulo πr × r</p>
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
            <strong>Patrón clave:</strong> Ambas fórmulas usan π (pi).
            La circunferencia usa el diámetro (o 2r), el área usa r² (radio al cuadrado).
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
