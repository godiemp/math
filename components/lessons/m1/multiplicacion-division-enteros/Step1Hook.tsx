'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUp, ArrowDown, ArrowRight, Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type AnimationPhase = 'idle' | 'descending' | 'reversing' | 'ascending' | 'complete';

const FLOORS = [3, 2, 1, 0, -1, -2, -3];
const FLOOR_HEIGHT = 48; // h-12 = 48px

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<'up' | 'down' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Animation state
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle');
  const [elevatorFloor, setElevatorFloor] = useState(0);
  const [showReversalFlash, setShowReversalFlash] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const correctAnswer: 'up' | 'down' = 'up';
  const isCorrect = selectedAnswer === correctAnswer;

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleSelect = (direction: 'up' | 'down') => {
    if (hasAnswered) return;
    setSelectedAnswer(direction);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setHasAnswered(true);
    // Start the elevator animation
    runElevatorAnimation();
  };

  const runElevatorAnimation = () => {
    setAnimationPhase('descending');

    // Phase 1: Descend to -2 (showing intention to go down)
    let floor = 0;
    intervalRef.current = setInterval(() => {
      floor--;
      setElevatorFloor(floor);

      if (floor <= -2) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;

        // Phase 2: Reversal flash
        setTimeout(() => {
          setShowReversalFlash(true);
          setAnimationPhase('reversing');

          setTimeout(() => {
            setShowReversalFlash(false);
            setAnimationPhase('ascending');

            // Phase 3: Ascend to +3
            let ascendFloor = -2;
            intervalRef.current = setInterval(() => {
              ascendFloor++;
              setElevatorFloor(ascendFloor);

              if (ascendFloor >= 3) {
                clearInterval(intervalRef.current!);
                intervalRef.current = null;
                setAnimationPhase('complete');
                setAnimationComplete(true);

                // Show result after animation
                setTimeout(() => {
                  setShowResult(true);
                }, 500);
              }
            }, 400);
          }, 800);
        }, 600);
      }
    }, 400);
  };

  // Calculate elevator position (floor 3 is top, floor -3 is bottom)
  const getElevatorTop = (floor: number) => {
    const floorIndex = FLOORS.indexOf(floor);
    return floorIndex * FLOOR_HEIGHT;
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Ascensor Mágico
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {animationPhase === 'idle'
            ? 'Un acertijo para empezar a pensar...'
            : animationPhase === 'complete'
            ? '¡Observa el resultado!'
            : '¡Mira lo que pasa!'}
        </p>
      </div>

      {/* Building visualization with animated elevator */}
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
        {animationPhase !== 'idle' && animationPhase !== 'complete' && (
          <div className="ml-6 flex flex-col justify-center">
            <div className={cn(
              'px-4 py-2 rounded-lg font-semibold text-sm animate-fadeIn',
              animationPhase === 'descending' && 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
              animationPhase === 'reversing' && 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
              animationPhase === 'ascending' && 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
            )}>
              {animationPhase === 'descending' && (
                <span className="flex items-center gap-2">
                  <ArrowDown className="w-4 h-4" />
                  Bajando...
                </span>
              )}
              {animationPhase === 'reversing' && (
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  ¡REVERSA!
                </span>
              )}
              {animationPhase === 'ascending' && (
                <span className="flex items-center gap-2">
                  <ArrowUp className="w-4 h-4" />
                  ¡Subiendo!
                </span>
              )}
            </div>

            {animationPhase !== 'idle' && (
              <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Piso actual: <span className="font-bold">{elevatorFloor >= 0 ? `+${elevatorFloor}` : elevatorFloor}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Scenario - only show before animation */}
      {!hasAnswered && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              El ascensor está en el <strong>piso 0</strong> (lobby).
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Alguien presiona el botón para <strong>bajar 3 pisos</strong>.
            </p>
            <div className="flex items-center justify-center gap-2 py-2">
              <ArrowDown className="w-6 h-6 text-red-500" />
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">−3</span>
            </div>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              ¡Pero el ascensor tiene un botón mágico de <strong>&ldquo;reversa&rdquo;</strong>!
            </p>
            <p className="text-purple-700 dark:text-purple-300 font-medium">
              Al presionar reversa, la dirección se invierte: <br/>
              <span className="text-sm">(bajar se convierte en subir, y subir en bajar)</span>
            </p>
          </div>
        </div>
      )}

      {/* Question - only show before answer */}
      {!hasAnswered && (
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
          <p className="text-lg font-semibold text-amber-800 dark:text-amber-200 text-center">
            Si activamos la reversa cuando el ascensor iba a bajar 3 pisos, <br/>
            ¿el ascensor termina <strong>arriba</strong> o <strong>abajo</strong> del lobby?
          </p>
        </div>
      )}

      {/* Answer buttons - only show before submission */}
      {!hasAnswered && (
        <div className="flex justify-center gap-6">
          <button
            onClick={() => handleSelect('up')}
            disabled={hasAnswered}
            aria-label="Respuesta: Arriba (pisos positivos)"
            className={cn(
              'flex flex-col items-center p-6 rounded-2xl transition-all',
              selectedAnswer === 'up'
                ? 'bg-green-100 dark:bg-green-900/50 ring-4 ring-green-400 scale-105'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700',
              hasAnswered && 'cursor-default'
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
            disabled={hasAnswered}
            aria-label="Respuesta: Abajo (pisos negativos)"
            className={cn(
              'flex flex-col items-center p-6 rounded-2xl transition-all',
              selectedAnswer === 'down'
                ? 'bg-red-100 dark:bg-red-900/50 ring-4 ring-red-400 scale-105'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700',
              hasAnswered && 'cursor-default'
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
      )}

      {/* Submit button - before animation */}
      {!hasAnswered && (
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
      )}

      {/* Result - after animation complete */}
      {showResult && (
        <div className="space-y-6 animate-fadeIn">
          {/* Answer feedback */}
          <div
            className={cn(
              'p-6 rounded-xl border-2',
              isCorrect
                ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
            )}
          >
            <div className="flex items-start gap-4">
              {isCorrect ? (
                <Check className="w-8 h-8 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-8 h-8 text-amber-600 flex-shrink-0" />
              )}
              <div>
                <h3 className={cn(
                  'font-bold text-lg mb-2',
                  isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}>
                  {isCorrect ? '¡Correcto!' : '¡Observa lo que pasó!'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  El ascensor terminó <strong>arriba</strong> del lobby, en el piso <strong>+3</strong>.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Bajar (−) con reversa (−) = Subir (+)
                </p>
              </div>
            </div>
          </div>

          {/* Animation summary */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-center gap-4 text-lg">
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
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <p className="text-purple-800 dark:text-purple-200 font-medium">
              Esto es exactamente lo que pasa cuando multiplicamos números negativos:
            </p>
            <div className="mt-4 text-center">
              <span className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                (−1) × (−3) = +3
              </span>
            </div>
            <p className="text-purple-700 dark:text-purple-300 mt-4 text-sm text-center">
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
      )}
    </div>
  );
}
