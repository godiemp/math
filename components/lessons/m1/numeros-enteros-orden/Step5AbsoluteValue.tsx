'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, RotateCcw, Check, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface WalkingAnimation {
  number: number;
  currentStep: number;
  isComplete: boolean;
}

export default function Step5AbsoluteValue({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<'intro' | 'demo' | 'practice' | 'complete'>('intro');
  const [animation, setAnimation] = useState<WalkingAnimation | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [practiceAnswer, setPracticeAnswer] = useState<{ pos: number | null; neg: number | null }>({ pos: null, neg: null });
  const [showPracticeResult, setShowPracticeResult] = useState(false);

  // Demo: walking from 0 to -4
  const runDemoAnimation = () => {
    setIsAnimating(true);
    setAnimation({ number: -4, currentStep: 0, isComplete: false });

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step <= 4) {
        setAnimation({ number: -4, currentStep: step, isComplete: false });
      } else {
        setAnimation({ number: -4, currentStep: 4, isComplete: true });
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 600);
  };

  const handlePracticeSelect = (num: number) => {
    if (showPracticeResult) return;

    if (num === 3) {
      setPracticeAnswer(prev => ({ ...prev, pos: 3 }));
    } else if (num === -3) {
      setPracticeAnswer(prev => ({ ...prev, neg: -3 }));
    }
  };

  const checkPractice = () => {
    setShowPracticeResult(true);
    if (practiceAnswer.pos === 3 && practiceAnswer.neg === -3) {
      setTimeout(() => setPhase('complete'), 1500);
    }
  };

  const resetPractice = () => {
    setPracticeAnswer({ pos: null, neg: null });
    setShowPracticeResult(false);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Valor Absoluto: La Distancia
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          El valor absoluto es la distancia de un número al cero
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Concept explanation */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
            <p className="text-gray-800 dark:text-gray-200 text-lg text-center mb-4">
              Imagina que estás parado en el cero de la recta numérica.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              El <strong>valor absoluto</strong> de un número es cuántos pasos tienes que caminar para llegar a él, sin importar la dirección.
            </p>
          </div>

          {/* Symbol explanation */}
          <div className="flex justify-center">
            <div className="bg-purple-100 dark:bg-purple-900/50 rounded-xl p-6 text-center">
              <div className="text-4xl font-mono font-bold text-purple-800 dark:text-purple-200 mb-2">
                | -4 | = 4
              </div>
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                &ldquo;El valor absoluto de menos cuatro es cuatro&rdquo;
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('demo')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <Play size={20} />
              <span>Ver demostración</span>
            </button>
          </div>
        </div>
      )}

      {phase === 'demo' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Number line with walking animation */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <div className="relative py-16">
              {/* The line */}
              <div className="relative h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-8">
                {/* Ticks and labels */}
                {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map(num => {
                  const percent = ((num + 5) / 10) * 100;
                  return (
                    <div
                      key={num}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                      style={{ left: `${percent}%` }}
                    >
                      <div className={cn(
                        'w-0.5 -mt-1.5',
                        num === 0 ? 'h-8 bg-red-500 -mt-3.5' : 'h-4 bg-gray-400'
                      )} />
                      <div className={cn(
                        'absolute top-6 left-1/2 -translate-x-1/2 text-sm font-medium',
                        num === 0 ? 'text-red-600 font-bold' : 'text-gray-600 dark:text-gray-400'
                      )}>
                        {num}
                      </div>
                    </div>
                  );
                })}

                {/* Distance highlight */}
                {animation && animation.currentStep > 0 && (
                  <div
                    className="absolute top-1/2 h-3 bg-blue-400/50 -translate-y-1/2 transition-all duration-500"
                    style={{
                      left: `${((animation.number + 5) / 10) * 100}%`,
                      width: `${(animation.currentStep / 10) * 100}%`,
                    }}
                  />
                )}

                {/* Walking character */}
                <div
                  className="absolute -top-10 transition-all duration-500 -translate-x-1/2"
                  style={{
                    left: animation
                      ? `${((Math.max(animation.number, animation.number + animation.currentStep) + 5) / 10) * 100}%`
                      : '50%'
                  }}
                >
                  <div className="text-4xl">🚶</div>
                </div>

                {/* Step counter */}
                {animation && animation.currentStep > 0 && (
                  <div
                    className="absolute -top-20 bg-blue-500 text-white px-3 py-1 rounded-full font-bold animate-bounce -translate-x-1/2"
                    style={{
                      left: `${((-4 + animation.currentStep / 2 + 5) / 10) * 100}%`
                    }}
                  >
                    {animation.currentStep} {animation.currentStep === 1 ? 'paso' : 'pasos'}
                  </div>
                )}
              </div>
            </div>

            {/* Demo controls */}
            <div className="text-center space-y-4">
              {!animation && (
                <button
                  onClick={runDemoAnimation}
                  className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all"
                >
                  <Play size={18} />
                  <span>Caminar hacia -4</span>
                </button>
              )}

              {animation?.isComplete && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    | -4 | = <span className="text-blue-600">4</span> pasos
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    No importa si es -4 o +4, la distancia al cero es siempre 4.
                  </p>
                  <button
                    onClick={() => {
                      setAnimation(null);
                      setPhase('practice');
                    }}
                    className="flex items-center gap-2 mx-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
                  >
                    <span>Ahora tú</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {phase === 'practice' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Challenge */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-2">
              Tu turno
            </h3>
            <p className="text-purple-700 dark:text-purple-300 text-lg">
              Si <strong>|x| = 3</strong>, ¿cuáles son los DOS valores posibles de x?
            </p>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">
              (Hay dos números que están a 3 pasos del cero)
            </p>
          </div>

          {/* Number selection */}
          <div className="flex flex-wrap justify-center gap-3">
            {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map(num => (
              <button
                key={num}
                onClick={() => handlePracticeSelect(num)}
                disabled={showPracticeResult}
                className={cn(
                  'w-14 h-14 rounded-xl font-bold text-xl transition-all',
                  (practiceAnswer.pos === num || practiceAnswer.neg === num)
                    ? showPracticeResult
                      ? (num === 3 || num === -3)
                        ? 'bg-green-500 text-white ring-4 ring-green-300'
                        : 'bg-red-500 text-white'
                      : 'bg-purple-500 text-white ring-4 ring-purple-300'
                    : showPracticeResult && (num === 3 || num === -3)
                    ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                )}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Selected values display */}
          <div className="flex justify-center gap-4">
            <div className={cn(
              'w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold border-2 border-dashed',
              practiceAnswer.neg
                ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-400 text-purple-800 dark:text-purple-200'
                : 'border-gray-300 dark:border-gray-600 text-gray-400'
            )}>
              {practiceAnswer.neg ?? '?'}
            </div>
            <div className="flex items-center text-gray-500">y</div>
            <div className={cn(
              'w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold border-2 border-dashed',
              practiceAnswer.pos
                ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-400 text-purple-800 dark:text-purple-200'
                : 'border-gray-300 dark:border-gray-600 text-gray-400'
            )}>
              {practiceAnswer.pos ?? '?'}
            </div>
          </div>

          {/* Check button or result */}
          {!showPracticeResult ? (
            <div className="flex justify-center gap-4">
              <button
                onClick={resetPractice}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900"
              >
                <RotateCcw size={18} />
                <span>Reiniciar</span>
              </button>
              <button
                onClick={checkPractice}
                disabled={!practiceAnswer.pos || !practiceAnswer.neg}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  practiceAnswer.pos && practiceAnswer.neg
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            </div>
          ) : (
            <div className={cn(
              'p-6 rounded-xl animate-fadeIn',
              practiceAnswer.pos === 3 && practiceAnswer.neg === -3
                ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-400'
                : 'bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-400'
            )}>
              <div className="flex items-center gap-3">
                {practiceAnswer.pos === 3 && practiceAnswer.neg === -3 ? (
                  <>
                    <Check className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-green-800 dark:text-green-300">¡Perfecto!</h4>
                      <p className="text-green-700 dark:text-green-300">
                        Tanto 3 como -3 están a 3 pasos del cero.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-8 h-8 text-amber-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-amber-800 dark:text-amber-300">¡Inténtalo de nuevo!</h4>
                      <p className="text-amber-700 dark:text-amber-300">
                        Los valores correctos son <strong>3</strong> y <strong>-3</strong>.
                      </p>
                      <button
                        onClick={resetPractice}
                        className="mt-2 text-amber-600 hover:text-amber-700 underline"
                      >
                        Intentar de nuevo
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {phase === 'complete' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 text-center">
            <Check className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
              ¡Excelente!
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Ahora entiendes que el valor absoluto es la distancia al cero,
              y que dos números opuestos tienen el mismo valor absoluto.
            </p>
          </div>

          {/* Key insight */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Recuerda:</h4>
            <ul className="text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
              <li>|5| = 5 (5 pasos desde el cero)</li>
              <li>|-5| = 5 (también 5 pasos desde el cero)</li>
              <li>|0| = 0 (ya estás en el cero)</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Continuar al Checkpoint</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
