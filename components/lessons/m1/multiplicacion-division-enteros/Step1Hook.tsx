'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUp, ArrowDown, ArrowRight, Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'animation' | 'result';
type AnimationPhase = 'idle' | 'reversing' | 'ascending' | 'complete';

// All 7 floors from +3 to -3
const FLOORS = [3, 2, 1, 0, -1, -2, -3];
const FLOOR_HEIGHT = 48; // h-12 = 48px

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  // Main phase control
  const [phase, setPhase] = useState<Phase>('scenario');

  // Answer state
  const [selectedAnswer, setSelectedAnswer] = useState<'up' | 'down' | null>(null);

  // Animation state
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle');
  const [elevatorFloor, setElevatorFloor] = useState(0);
  const [showReversalFlash, setShowReversalFlash] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const correctAnswer: 'up' | 'down' = 'up';
  const isCorrect = selectedAnswer === correctAnswer;

  // Cleanup intervals and timeouts on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  const handleSelect = (direction: 'up' | 'down') => {
    setSelectedAnswer(direction);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setPhase('animation');
    // Start the elevator animation
    runElevatorAnimation();
  };

  const runElevatorAnimation = () => {
    // The reversal happens BEFORE the elevator moves
    setAnimationPhase('reversing');
    setShowReversalFlash(true);

    // Phase 1: Show reversal for a moment
    const timeout1 = setTimeout(() => {
      setShowReversalFlash(false);
      setAnimationPhase('ascending');

      // Phase 2: Elevator goes UP to +3
      let floor = 0;
      intervalRef.current = setInterval(() => {
        floor++;
        setElevatorFloor(floor);

        if (floor >= 3) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setAnimationPhase('complete');

          // Transition to result phase after animation
          const timeout2 = setTimeout(() => {
            setPhase('result');
          }, 600);
          timeoutRefs.current.push(timeout2);
        }
      }, 400);
    }, 1200);
    timeoutRefs.current.push(timeout1);
  };

  // Calculate elevator position
  const getElevatorTop = (floor: number) => {
    const floorIndex = FLOORS.indexOf(floor);
    return floorIndex * FLOOR_HEIGHT;
  };

  if (!isActive) return null;

  // ============ PHASE 1: SCENARIO ============
  if (phase === 'scenario') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Ascensor Mágico
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un acertijo para empezar a pensar...
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Imagina un ascensor que está en el <strong>piso 0</strong> (lobby).
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Alguien presiona el botón para <strong>bajar 3 pisos</strong>:
            </p>
            <div className="flex items-center justify-center gap-2 py-2">
              <ArrowDown className="w-6 h-6 text-red-500" />
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">−3</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <p className="text-lg text-gray-800 dark:text-gray-200">
                ¡Pero este ascensor tiene un botón mágico de <strong>&ldquo;reversa&rdquo;</strong>!
              </p>
              <div className="flex items-center justify-center gap-2 py-3">
                <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-purple-700 dark:text-purple-300 font-semibold">REVERSA</span>
                </div>
              </div>
              <p className="text-purple-700 dark:text-purple-300 font-medium text-sm">
                Al presionar reversa, la dirección se invierte:<br/>
                (bajar se convierte en subir, y subir en bajar)
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Entendido</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: QUESTION ============
  if (phase === 'question') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Ascensor Mágico
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Qué crees que pasará?
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
          <p className="text-lg font-semibold text-amber-800 dark:text-amber-200 text-center">
            El ascensor iba a <strong>bajar 3 pisos</strong>, pero activamos la <strong>reversa</strong>.<br/>
            ¿Terminará <strong>arriba</strong> o <strong>abajo</strong> del lobby?
          </p>
        </div>

        <div className="flex justify-center gap-6">
          <button
            onClick={() => handleSelect('up')}
            aria-label="Respuesta: Arriba (pisos positivos)"
            className={cn(
              'flex flex-col items-center p-6 rounded-2xl transition-all',
              selectedAnswer === 'up'
                ? 'bg-green-100 dark:bg-green-900/50 ring-4 ring-green-400 scale-105'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            <ArrowUp className={cn(
              'w-12 h-12 mb-2',
              selectedAnswer === 'up' ? 'text-green-600' : 'text-gray-600 dark:text-gray-300'
            )} />
            <span className={cn(
              'font-bold text-lg',
              selectedAnswer === 'up' ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-200'
            )}>
              Arriba
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              (pisos positivos)
            </span>
          </button>

          <button
            onClick={() => handleSelect('down')}
            aria-label="Respuesta: Abajo (pisos negativos)"
            className={cn(
              'flex flex-col items-center p-6 rounded-2xl transition-all',
              selectedAnswer === 'down'
                ? 'bg-red-100 dark:bg-red-900/50 ring-4 ring-red-400 scale-105'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            <ArrowDown className={cn(
              'w-12 h-12 mb-2',
              selectedAnswer === 'down' ? 'text-red-600' : 'text-gray-600 dark:text-gray-300'
            )} />
            <span className={cn(
              'font-bold text-lg',
              selectedAnswer === 'down' ? 'text-red-700 dark:text-red-300' : 'text-gray-700 dark:text-gray-200'
            )}>
              Abajo
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              (pisos negativos)
            </span>
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Ver qué pasa
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: ANIMATION ============
  if (phase === 'animation') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Ascensor Mágico
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Mira lo que pasa!
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            {/* Building */}
            <div className="w-40 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-t-lg overflow-hidden">
              {/* Floors */}
              {FLOORS.map((floor) => (
                <div
                  key={floor}
                  className={cn(
                    'h-12 border-b border-gray-400 dark:border-gray-500 flex items-center justify-between px-3 relative',
                    floor === 0 && 'bg-blue-200 dark:bg-blue-800/50',
                    floor === elevatorFloor && animationPhase !== 'idle' && 'bg-yellow-100 dark:bg-yellow-900/30'
                  )}
                >
                  <span className={cn(
                    'text-sm font-bold z-10',
                    floor === elevatorFloor && animationPhase !== 'idle'
                      ? 'text-yellow-700 dark:text-yellow-300'
                      : 'text-gray-700 dark:text-gray-200'
                  )}>
                    {floor >= 0 ? `+${floor}` : floor}
                  </span>
                  {floor === 0 && (
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium z-10">
                      Lobby
                    </span>
                  )}
                </div>
              ))}

              {/* Animated Elevator Box */}
              {animationPhase !== 'idle' && (
                <div
                  className={cn(
                    'absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-lg shadow-lg flex items-center justify-center text-lg font-bold transition-all duration-400 ease-in-out z-20',
                    showReversalFlash
                      ? 'bg-purple-500 text-white animate-pulse scale-125'
                      : animationPhase === 'ascending'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  )}
                  style={{
                    top: `${getElevatorTop(elevatorFloor) + 4}px`,
                    transition: 'top 0.35s ease-in-out, background-color 0.3s, transform 0.3s'
                  }}
                >
                  {showReversalFlash ? (
                    <RotateCcw className="w-5 h-5 animate-spin" />
                  ) : animationPhase === 'ascending' ? (
                    <ArrowUp className="w-5 h-5" />
                  ) : (
                    <ArrowDown className="w-5 h-5" />
                  )}
                </div>
              )}
            </div>

            {/* Elevator shaft indicator */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-500/30 -translate-x-1/2" />

            {/* Reversal flash overlay */}
            {showReversalFlash && (
              <div className="absolute inset-0 bg-purple-500/20 animate-pulse rounded-t-lg" />
            )}
          </div>

          {/* Animation status indicator */}
          <div className="ml-6 flex flex-col justify-center">
            <div className={cn(
              'px-4 py-2 rounded-lg font-semibold text-sm animate-fadeIn',
              animationPhase === 'reversing' && 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
              animationPhase === 'ascending' && 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
              animationPhase === 'complete' && 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
            )}>
              {animationPhase === 'reversing' && (
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  ¡REVERSA activada!
                </span>
              )}
              {animationPhase === 'ascending' && (
                <span className="flex items-center gap-2">
                  <ArrowUp className="w-4 h-4" />
                  Bajar → ¡Subiendo!
                </span>
              )}
              {animationPhase === 'complete' && (
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  ¡Llegó al piso +3!
                </span>
              )}
            </div>

            {animationPhase === 'ascending' && (
              <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Piso actual: <span className="font-bold">{elevatorFloor >= 0 ? `+${elevatorFloor}` : elevatorFloor}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: RESULT ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Ascensor Mágico
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¡Observa el resultado!
        </p>
      </div>

      {/* Answer feedback */}
      <div
        className={cn(
          'p-5 rounded-xl border-2',
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
            : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
        )}
      >
        <div className="flex items-start gap-4">
          {isCorrect ? (
            <Check className="w-7 h-7 text-green-600 flex-shrink-0" />
          ) : (
            <X className="w-7 h-7 text-amber-600 flex-shrink-0" />
          )}
          <div>
            <h3 className={cn(
              'font-bold text-lg mb-1',
              isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {isCorrect ? '¡Correcto!' : '¡Observa lo que pasó!'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              El ascensor terminó <strong>arriba</strong> del lobby, en el piso <strong>+3</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Animation summary */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-center gap-3 text-lg flex-wrap">
          <div className="flex items-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <ArrowDown className="w-5 h-5 text-red-500" />
            <span className="text-red-700 dark:text-red-300 font-semibold">−3</span>
          </div>
          <span className="text-gray-500">×</span>
          <div className="flex items-center gap-2 px-3 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <RotateCcw className="w-5 h-5 text-purple-500" />
            <span className="text-purple-700 dark:text-purple-300 font-semibold">−1</span>
          </div>
          <span className="text-gray-500">=</span>
          <div className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <ArrowUp className="w-5 h-5 text-green-500" />
            <span className="text-green-700 dark:text-green-300 font-semibold">+3</span>
          </div>
        </div>
      </div>

      {/* Math connection */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 font-medium text-center">
          Esto es exactamente lo que pasa cuando multiplicamos números negativos:
        </p>
        <div className="mt-3 text-center">
          <span className="text-3xl font-bold text-purple-900 dark:text-purple-100">
            (−1) × (−3) = +3
          </span>
        </div>
        <p className="text-purple-700 dark:text-purple-300 mt-3 text-sm text-center">
          ¡Negativo por negativo da positivo!<br/>
          En esta lección descubriremos todas las reglas de los signos.
        </p>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
