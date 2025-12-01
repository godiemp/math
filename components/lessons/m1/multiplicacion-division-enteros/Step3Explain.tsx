'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, Check, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface SignDemo {
  id: string;
  label: string;
  expression: string;
  firstFactor: number;
  secondFactor: number;
  result: number;
  explanation: string;
  color: string;
  bgColor: string;
}

const SIGN_DEMOS: SignDemo[] = [
  {
    id: 'pos-pos',
    label: '(+) × (+)',
    expression: '3 × 2',
    firstFactor: 3,
    secondFactor: 2,
    result: 6,
    explanation: 'Caminar hacia adelante (+), 3 veces, 2 pasos cada vez → Terminas adelante (+6)',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/30',
  },
  {
    id: 'pos-neg',
    label: '(+) × (−)',
    expression: '3 × (−2)',
    firstFactor: 3,
    secondFactor: -2,
    result: -6,
    explanation: 'Caminar hacia adelante (+), 3 veces, pero retrocediendo (−2) cada vez → Terminas atrás (−6)',
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/30',
  },
  {
    id: 'neg-pos',
    label: '(−) × (+)',
    expression: '(−3) × 2',
    firstFactor: -3,
    secondFactor: 2,
    result: -6,
    explanation: 'Caminar hacia atrás (−), 3 veces, 2 pasos cada vez → Terminas atrás (−6)',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/30',
  },
  {
    id: 'neg-neg',
    label: '(−) × (−)',
    expression: '(−3) × (−2)',
    firstFactor: -3,
    secondFactor: -2,
    result: 6,
    explanation: 'Caminar hacia atrás (−), pero en reversa (−) → ¡Es como ir hacia adelante! (+6)',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/30',
  },
];

interface AnimationState {
  demoIndex: number;
  currentIteration: number; // Which "walk" we're on (0-2 for 3 iterations)
  currentStep: number; // Current position on number line
  phase: 'idle' | 'walking' | 'pausing' | 'complete';
}

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [completedDemos, setCompletedDemos] = useState<Set<number>>(new Set());
  const [activeDemoIndex, setActiveDemoIndex] = useState<number | null>(null);
  const [animation, setAnimation] = useState<AnimationState | null>(null);
  const [showAllComplete, setShowAllComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Check if all demos completed
  useEffect(() => {
    if (completedDemos.size === 4 && !showAllComplete) {
      timeoutRef.current = setTimeout(() => {
        setShowAllComplete(true);
      }, 500);
    }
  }, [completedDemos, showAllComplete]);

  const runDemo = (demoIndex: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const demo = SIGN_DEMOS[demoIndex];
    setActiveDemoIndex(demoIndex);

    // Calculate step direction: positive secondFactor = move right, negative = move left
    // But if firstFactor is negative, we "reverse" the direction
    const isReversed = demo.firstFactor < 0;
    const baseDirection = demo.secondFactor > 0 ? 1 : -1;
    const stepDirection = isReversed ? -baseDirection : baseDirection;
    const stepSize = Math.abs(demo.secondFactor);
    const totalIterations = Math.abs(demo.firstFactor);

    let position = 0;
    let iteration = 0;

    setAnimation({
      demoIndex,
      currentIteration: 0,
      currentStep: 0,
      phase: 'walking',
    });

    // Animation loop: walk stepSize steps, pause, repeat totalIterations times
    const animateStep = () => {
      const targetPosition = (iteration + 1) * stepSize * stepDirection;

      intervalRef.current = setInterval(() => {
        position += stepDirection;
        setAnimation(prev => prev ? {
          ...prev,
          currentStep: position,
          phase: 'walking',
        } : null);

        if (position === targetPosition) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          iteration++;

          setAnimation(prev => prev ? {
            ...prev,
            currentIteration: iteration,
            phase: iteration < totalIterations ? 'pausing' : 'complete',
          } : null);

          if (iteration < totalIterations) {
            // Pause before next iteration
            timeoutRef.current = setTimeout(animateStep, 600);
          } else {
            // Animation complete
            setCompletedDemos(prev => new Set([...prev, demoIndex]));
          }
        }
      }, 300);
    };

    animateStep();
  };

  const resetDemo = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAnimation(null);
    setActiveDemoIndex(null);
  };

  if (!isActive) return null;

  const activeDemo = activeDemoIndex !== null ? SIGN_DEMOS[activeDemoIndex] : null;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¿Por qué funcionan las reglas?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Observa cómo cada combinación de signos afecta la dirección del caminar
        </p>
      </div>

      {/* Demo selector cards */}
      <div className="grid grid-cols-2 gap-3">
        {SIGN_DEMOS.map((demo, index) => {
          const isCompleted = completedDemos.has(index);
          const isActive = activeDemoIndex === index;

          return (
            <button
              key={demo.id}
              onClick={() => !isActive && runDemo(index)}
              disabled={animation?.phase === 'walking' || animation?.phase === 'pausing'}
              className={cn(
                'relative p-4 rounded-xl transition-all text-left',
                demo.bgColor,
                isActive && 'ring-4 ring-offset-2 ring-blue-400 scale-105',
                isCompleted && !isActive && 'opacity-70',
                (animation?.phase === 'walking' || animation?.phase === 'pausing') && !isActive && 'cursor-not-allowed'
              )}
            >
              {isCompleted && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={cn('font-bold text-lg', demo.color)}>
                {demo.label}
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                {demo.expression} = {demo.result > 0 ? '+' : ''}{demo.result}
              </div>
              {!isCompleted && !isActive && (
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                  <Play className="w-3 h-3" />
                  <span>Toca para ver</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Number line animation area */}
      {activeDemo && (
        <div className={cn('rounded-xl p-4 animate-fadeIn', activeDemo.bgColor)}>
          {/* Current expression */}
          <div className="text-center mb-4">
            <span className={cn('text-2xl font-bold', activeDemo.color)}>
              {activeDemo.expression}
            </span>
            {animation?.phase === 'complete' && (
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-200 animate-fadeIn">
                {' = '}{activeDemo.result > 0 ? '+' : ''}{activeDemo.result}
              </span>
            )}
          </div>

          {/* Number line */}
          <div className="relative py-12 overflow-hidden">
            <div className="relative h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-4">
              {/* Ticks and labels */}
              {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map(num => {
                const percent = ((num + 6) / 12) * 100;
                return (
                  <div
                    key={num}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                    style={{ left: `${percent}%` }}
                  >
                    <div className={cn(
                      'w-0.5 -mt-1.5',
                      num === 0 ? 'h-6 bg-red-500 -mt-2.5' : 'h-3 bg-gray-400'
                    )} />
                    <div className={cn(
                      'absolute top-4 left-1/2 -translate-x-1/2 text-xs font-medium',
                      num === 0 ? 'text-red-600 font-bold' : 'text-gray-500 dark:text-gray-400'
                    )}>
                      {num}
                    </div>
                  </div>
                );
              })}

              {/* Path highlight */}
              {animation && animation.currentStep !== 0 && (
                <div
                  className={cn(
                    'absolute top-1/2 h-2 -translate-y-1/2 transition-all duration-200 rounded-full',
                    activeDemo.result > 0 ? 'bg-green-400/50' : 'bg-red-400/50'
                  )}
                  style={{
                    left: animation.currentStep > 0 ? '50%' : `${((animation.currentStep + 6) / 12) * 100}%`,
                    width: `${(Math.abs(animation.currentStep) / 12) * 100}%`,
                  }}
                />
              )}

              {/* Walking character */}
              <div
                className="absolute -top-8 transition-all duration-300 -translate-x-1/2"
                style={{
                  left: animation ? `${((animation.currentStep + 6) / 12) * 100}%` : '50%'
                }}
              >
                <div className={cn(
                  'text-3xl',
                  // Flip character based on walking direction
                  animation && ((activeDemo.secondFactor < 0 && activeDemo.firstFactor > 0) ||
                               (activeDemo.secondFactor > 0 && activeDemo.firstFactor < 0))
                    ? 'transform -scale-x-100'
                    : ''
                )}>
                  🚶
                </div>
              </div>

              {/* Iteration counter */}
              {animation && animation.currentIteration > 0 && (
                <div
                  className="absolute -top-14 bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-bold -translate-x-1/2 animate-bounce"
                  style={{
                    left: `${((animation.currentStep / 2 + 6) / 12) * 100}%`
                  }}
                >
                  ×{animation.currentIteration}
                </div>
              )}
            </div>
          </div>

          {/* Explanation */}
          <div className="text-center">
            {animation?.phase === 'walking' || animation?.phase === 'pausing' ? (
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {animation.currentIteration < Math.abs(activeDemo.firstFactor)
                  ? `Caminata ${animation.currentIteration + 1} de ${Math.abs(activeDemo.firstFactor)}...`
                  : 'Completando...'}
              </p>
            ) : animation?.phase === 'complete' ? (
              <div className="space-y-3 animate-fadeIn">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {activeDemo.explanation}
                </p>
                <button
                  onClick={resetDemo}
                  className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 text-sm"
                >
                  <RotateCcw size={16} />
                  <span>Ver otro ejemplo</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Prompt to try demos */}
      {activeDemoIndex === null && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            👆 Toca cada combinación de signos para ver cómo funciona
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Observa las {4 - completedDemos.size} combinaciones restantes
          </p>
        </div>
      )}

      {/* All complete celebration */}
      {showAllComplete && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 text-center animate-fadeIn border-2 border-green-400">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
            ¡Has visto todas las combinaciones!
          </h3>
          <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto mt-4 text-sm">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
              <p className="font-bold text-green-600">Signos iguales</p>
              <p className="text-gray-600 dark:text-gray-300">= Positivo (+)</p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
              <p className="font-bold text-red-600">Signos diferentes</p>
              <p className="text-gray-600 dark:text-gray-300">= Negativo (−)</p>
            </div>
          </div>
        </div>
      )}

      {/* Pattern proof - only show after watching at least 2 demos */}
      {completedDemos.size >= 2 && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-6 animate-fadeIn">
          <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4">
            El patrón matemático
          </h3>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-center space-y-1 text-sm">
            <p className="text-gray-700 dark:text-gray-300">−3 × 3 = −9</p>
            <p className="text-gray-700 dark:text-gray-300">−3 × 2 = −6</p>
            <p className="text-gray-700 dark:text-gray-300">−3 × 1 = −3</p>
            <p className="text-gray-700 dark:text-gray-300">−3 × 0 = 0</p>
            <p className="text-purple-600 dark:text-purple-400 font-bold">−3 × (−1) = +3 ✓</p>
          </div>

          <p className="text-purple-700 dark:text-purple-300 mt-4 text-sm text-center">
            ¡El patrón muestra que cada vez sumamos 3!
          </p>
        </div>
      )}

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          disabled={completedDemos.size < 4}
          className={cn(
            'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
            completedDemos.size >= 4
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
          )}
        >
          <span>
            {completedDemos.size >= 4
              ? 'Continuar a Practicar'
              : `Ver ${4 - completedDemos.size} más para continuar`}
          </span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
