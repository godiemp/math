'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Check, Sparkles, Play, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'area-model' | 'distribution-machine' | 'sign-challenge' | 'complete';

interface SignCase {
  expression: string;
  steps: string[];
  result: string;
  revealed: boolean;
  explanation: string;
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('area-model');

  // Area model state
  const [areaStep, setAreaStep] = useState(0);

  // Distribution machine state
  const [machineAnimating, setMachineAnimating] = useState(false);
  const [machineStep, setMachineStep] = useState(0);
  const [machineComplete, setMachineComplete] = useState(false);

  // Sign challenge state
  const [signCases, setSignCases] = useState<SignCase[]>([
    {
      expression: '-2(x + 3)',
      steps: ['-2 · x', '-2 · 3'],
      result: '-2x - 6',
      explanation: 'Negativo × positivo = negativo para ambos términos',
      revealed: false
    },
    {
      expression: '3(x - 4)',
      steps: ['3 · x', '3 · (-4)'],
      result: '3x - 12',
      explanation: 'El 3 multiplica a x y a -4 (el signo se mantiene)',
      revealed: false
    },
    {
      expression: '-2(x - 5)',
      steps: ['-2 · x', '-2 · (-5)'],
      result: '-2x + 10',
      explanation: 'Negativo × negativo = ¡positivo! Por eso +10',
      revealed: false
    },
  ]);

  const handleRevealSignCase = (index: number) => {
    setSignCases(prev => prev.map((c, i) => i === index ? { ...c, revealed: true } : c));
  };

  const allSignCasesRevealed = signCases.every(c => c.revealed);

  const startMachineAnimation = () => {
    if (machineAnimating || machineComplete) return;
    setMachineAnimating(true);
    setMachineStep(1);
  };

  useEffect(() => {
    if (!machineAnimating) return;

    const timer = setTimeout(() => {
      if (machineStep < 4) {
        setMachineStep(prev => prev + 1);
      } else {
        setMachineAnimating(false);
        setMachineComplete(true);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [machineAnimating, machineStep]);

  const resetMachine = () => {
    setMachineStep(0);
    setMachineAnimating(false);
    setMachineComplete(false);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Constructor de Áreas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'area-model' && 'Descubre por qué funciona la propiedad distributiva'}
          {phase === 'distribution-machine' && 'Observa cómo se distribuye el factor'}
          {phase === 'sign-challenge' && 'Domina los signos negativos'}
          {phase === 'complete' && '¡Excelente trabajo!'}
        </p>
      </div>

      {phase === 'area-model' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Imagina un rectángulo con ancho <span className="font-mono text-blue-600 font-bold">3</span> y alto <span className="font-mono text-purple-600 font-bold">(4 + 5)</span>
            </p>

            {/* SVG Area Model */}
            <div className="flex justify-center mb-6">
              <svg viewBox="0 0 300 200" className="w-full max-w-md">
                {/* Main rectangle outline */}
                <rect
                  x="50"
                  y="30"
                  width="200"
                  height="120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-300 dark:text-gray-600"
                />

                {/* Left section (3 × 4) */}
                <rect
                  x="50"
                  y="30"
                  width={areaStep >= 1 ? 80 : 0}
                  height="120"
                  fill="currentColor"
                  className="text-purple-200 dark:text-purple-800 transition-all duration-500"
                />

                {/* Right section (3 × 5) */}
                <rect
                  x="130"
                  y="30"
                  width={areaStep >= 2 ? 120 : 0}
                  height="120"
                  fill="currentColor"
                  className="text-teal-200 dark:text-teal-800 transition-all duration-500"
                />

                {/* Division line */}
                {areaStep >= 1 && (
                  <line
                    x1="130"
                    y1="30"
                    x2="130"
                    y2="150"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="text-gray-400 dark:text-gray-500"
                  />
                )}

                {/* Labels - width */}
                <text x="150" y="20" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">
                  4 + 5
                </text>

                {/* Labels - height */}
                <text x="35" y="95" textAnchor="middle" className="text-sm font-bold fill-blue-600" transform="rotate(-90, 35, 95)">
                  3
                </text>

                {/* Section labels */}
                {areaStep >= 1 && (
                  <text x="90" y="95" textAnchor="middle" className="text-lg font-bold fill-purple-700 dark:fill-purple-300 animate-fadeIn">
                    3 × 4
                  </text>
                )}
                {areaStep >= 2 && (
                  <text x="190" y="95" textAnchor="middle" className="text-lg font-bold fill-teal-700 dark:fill-teal-300 animate-fadeIn">
                    3 × 5
                  </text>
                )}

                {/* Width labels per section */}
                {areaStep >= 1 && (
                  <text x="90" y="165" textAnchor="middle" className="text-sm fill-purple-600">
                    4
                  </text>
                )}
                {areaStep >= 2 && (
                  <text x="190" y="165" textAnchor="middle" className="text-sm fill-teal-600">
                    5
                  </text>
                )}
              </svg>
            </div>

            {/* Step controls */}
            <div className="flex justify-center gap-2 mb-4">
              {[0, 1, 2, 3].map((step) => (
                <button
                  key={step}
                  onClick={() => setAreaStep(step)}
                  className={cn(
                    'w-10 h-10 rounded-full font-bold transition-all',
                    areaStep === step
                      ? 'bg-purple-500 text-white'
                      : areaStep > step
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {step + 1}
                </button>
              ))}
            </div>

            {/* Step explanations */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 min-h-[80px]">
              {areaStep === 0 && (
                <p className="text-gray-600 dark:text-gray-300">
                  Tenemos un rectángulo de <strong>ancho 3</strong> y <strong>alto (4+5)</strong>.
                  <br />El área total es: <span className="font-mono text-blue-600">3(4 + 5) = 3 × 9 = 27</span>
                </p>
              )}
              {areaStep === 1 && (
                <p className="text-gray-600 dark:text-gray-300 animate-fadeIn">
                  Dividimos el rectángulo. La parte <span className="text-purple-600 font-bold">izquierda</span> tiene área:
                  <br /><span className="font-mono text-purple-600 text-lg">3 × 4 = 12</span>
                </p>
              )}
              {areaStep === 2 && (
                <p className="text-gray-600 dark:text-gray-300 animate-fadeIn">
                  La parte <span className="text-teal-600 font-bold">derecha</span> tiene área:
                  <br /><span className="font-mono text-teal-600 text-lg">3 × 5 = 15</span>
                </p>
              )}
              {areaStep === 3 && (
                <div className="text-gray-600 dark:text-gray-300 animate-fadeIn space-y-2">
                  <p><strong>¡Es lo mismo!</strong></p>
                  <p className="font-mono">
                    <span className="text-blue-600">3(4 + 5)</span> = <span className="text-purple-600">3 × 4</span> + <span className="text-teal-600">3 × 5</span>
                  </p>
                  <p className="font-mono">
                    <span className="text-blue-600">27</span> = <span className="text-purple-600">12</span> + <span className="text-teal-600">15</span> = <span className="text-green-600 font-bold">27</span> ✓
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Continue button */}
          {areaStep >= 3 && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('distribution-machine')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>La Máquina Distributiva</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'distribution-machine' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Observa cómo el <span className="text-blue-600 font-bold">4</span> multiplica a cada término:
            </p>

            {/* Distribution visualization */}
            <div className="relative flex flex-col items-center py-8">
              {/* Original expression */}
              <div className="flex items-center gap-2 text-3xl font-mono font-bold mb-8">
                <span className={cn(
                  'px-3 py-2 rounded-lg transition-all duration-300',
                  machineStep >= 1 ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/50 scale-110' : 'text-gray-400'
                )}>
                  4
                </span>
                <span className="text-gray-400">(</span>
                <span className={cn(
                  'px-3 py-2 rounded-lg transition-all duration-300',
                  machineStep >= 2 ? 'text-purple-600 bg-purple-100 dark:bg-purple-900/50' : 'text-gray-600 dark:text-gray-400'
                )}>
                  x
                </span>
                <span className="text-gray-400">+</span>
                <span className={cn(
                  'px-3 py-2 rounded-lg transition-all duration-300',
                  machineStep >= 3 ? 'text-teal-600 bg-teal-100 dark:bg-teal-900/50' : 'text-gray-600 dark:text-gray-400'
                )}>
                  3
                </span>
                <span className="text-gray-400">)</span>
              </div>

              {/* Animated arrows */}
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 200 60">
                {/* Arrow to x */}
                <path
                  d={`M 100 0 Q 60 30 50 55`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="100"
                  strokeDashoffset={machineStep >= 2 ? 0 : 100}
                  className="text-blue-500 transition-all duration-700"
                  markerEnd="url(#arrowhead)"
                />
                {/* Arrow to 3 */}
                <path
                  d={`M 100 0 Q 140 30 150 55`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="100"
                  strokeDashoffset={machineStep >= 3 ? 0 : 100}
                  className="text-blue-500 transition-all duration-700"
                  markerEnd="url(#arrowhead)"
                />
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-blue-500" />
                  </marker>
                </defs>
              </svg>

              {/* Result */}
              <div className={cn(
                'flex items-center gap-2 text-3xl font-mono font-bold transition-all duration-500',
                machineStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}>
                <span className="text-blue-600 bg-blue-100 dark:bg-blue-900/50 px-3 py-2 rounded-lg">4</span>
                <span className="text-gray-500">·</span>
                <span className="text-purple-600 bg-purple-100 dark:bg-purple-900/50 px-3 py-2 rounded-lg">x</span>
                <span className="text-gray-500">+</span>
                <span className="text-blue-600 bg-blue-100 dark:bg-blue-900/50 px-3 py-2 rounded-lg">4</span>
                <span className="text-gray-500">·</span>
                <span className="text-teal-600 bg-teal-100 dark:bg-teal-900/50 px-3 py-2 rounded-lg">3</span>
              </div>

              {/* Final answer */}
              {machineStep >= 4 && (
                <div className="mt-4 animate-fadeIn">
                  <span className="text-gray-500 text-xl">=</span>
                  <span className="text-2xl font-mono font-bold text-green-600 bg-green-100 dark:bg-green-900/50 px-4 py-2 rounded-lg ml-2">
                    4x + 12
                  </span>
                </div>
              )}
            </div>

            {/* Control buttons */}
            <div className="flex justify-center gap-4 mt-4">
              {!machineComplete ? (
                <button
                  onClick={startMachineAnimation}
                  disabled={machineAnimating}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all',
                    machineAnimating
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                  )}
                >
                  <Play size={20} />
                  <span>¡Distribuir!</span>
                </button>
              ) : (
                <button
                  onClick={resetMachine}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  <RotateCcw size={18} />
                  <span>Ver de nuevo</span>
                </button>
              )}
            </div>
          </div>

          {/* Key insight */}
          {machineComplete && (
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700 animate-fadeIn">
              <p className="text-yellow-800 dark:text-yellow-200 text-center font-medium">
                <Sparkles className="inline w-5 h-5 mr-2" />
                El número de afuera <strong>multiplica a CADA término</strong> dentro del paréntesis
              </p>
            </div>
          )}

          {/* Continue button */}
          {machineComplete && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('sign-challenge')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Desafío de Signos</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'sign-challenge' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700 mb-4">
            <p className="text-amber-800 dark:text-amber-200 text-center font-medium">
              ⚠️ Los signos negativos son donde más se equivocan. ¡Domínalos!
            </p>
          </div>

          <div className="space-y-4">
            {signCases.map((signCase, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono font-bold text-gray-800 dark:text-gray-200">
                    {signCase.expression}
                  </span>
                  {!signCase.revealed ? (
                    <button
                      onClick={() => handleRevealSignCase(index)}
                      className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors font-medium"
                    >
                      ¿Resultado?
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Check size={20} />
                      <span className="font-medium">Revelado</span>
                    </div>
                  )}
                </div>

                {signCase.revealed && (
                  <div className="space-y-3 animate-fadeIn">
                    {/* Steps */}
                    <div className="flex items-center justify-center gap-4 text-lg font-mono">
                      <span className="text-gray-500">=</span>
                      <span className="text-blue-600">{signCase.steps[0]}</span>
                      <span className="text-gray-500">+</span>
                      <span className="text-purple-600">{signCase.steps[1]}</span>
                    </div>

                    {/* Result */}
                    <div className="flex items-center justify-center">
                      <span className="text-gray-500 text-lg mr-2">=</span>
                      <span className="text-xl font-mono font-bold text-green-600 bg-green-100 dark:bg-green-900/50 px-4 py-2 rounded-lg">
                        {signCase.result}
                      </span>
                    </div>

                    {/* Explanation */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 mt-2">
                      <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                        💡 {signCase.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continue button */}
          {allSignCasesRevealed && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('complete')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
              >
                <Sparkles size={20} />
                <span>¡Lo entendí!</span>
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'complete' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Summary */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                ¡Excelente! Descubriste la propiedad distributiva
              </h3>
            </div>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <p className="font-mono text-2xl mb-2">
                  <span className="text-blue-600 font-bold">a</span>(b + c) = <span className="text-blue-600 font-bold">a</span>·b + <span className="text-blue-600 font-bold">a</span>·c
                </p>
                <p className="text-sm text-gray-500">
                  El factor externo multiplica a CADA término interno
                </p>
              </div>

              <p><strong>Reglas de signos que aprendiste:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><span className="text-red-600">(+) × (+)</span> = <span className="text-green-600">+</span></li>
                <li><span className="text-red-600">(+) × (−)</span> = <span className="text-red-600">−</span></li>
                <li><span className="text-red-600">(−) × (+)</span> = <span className="text-red-600">−</span></li>
                <li><span className="text-red-600">(−) × (−)</span> = <span className="text-green-600">+</span> ¡Importante!</li>
              </ul>
            </div>
          </div>

          {/* Continue button */}
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
  );
}
