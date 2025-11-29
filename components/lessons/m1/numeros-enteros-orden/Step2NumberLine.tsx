'use client';

import { useState } from 'react';
import { ArrowRight, RotateCcw, Check } from 'lucide-react';
import { NumberLine } from '@/components/lessons/shared';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

export default function Step2NumberLine({ onComplete, isActive }: LessonStepProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [correctPlacements, setCorrectPlacements] = useState<number[]>([]);
  const [key, setKey] = useState(0); // For resetting

  const numbersToPlace = [3, -2, 5, -4, -1];

  const handlePlacement = (number: number, position: number) => {
    if (number === position) {
      setCorrectPlacements(prev => [...prev, number]);
    }
  };

  const handleAllCorrect = () => {
    setIsComplete(true);
  };

  const handleReset = () => {
    setCorrectPlacements([]);
    setIsComplete(false);
    setKey(prev => prev + 1);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Recta Numérica
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Arrastra cada número a su posición correcta
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
        <p className="text-blue-800 dark:text-blue-200">
          Los números <strong>negativos</strong> van a la <strong>izquierda</strong> del cero.
          <br />
          Los números <strong>positivos</strong> van a la <strong>derecha</strong> del cero.
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center items-center gap-2">
        <span className="text-gray-600 dark:text-gray-300">Progreso:</span>
        <div className="flex gap-1">
          {numbersToPlace.map((num) => (
            <div
              key={num}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                correctPlacements.includes(num)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              )}
            >
              {correctPlacements.includes(num) ? <Check size={16} /> : num}
            </div>
          ))}
        </div>
      </div>

      {/* Number Line */}
      <div className="py-8">
        <NumberLine
          key={key}
          min={-6}
          max={6}
          draggableNumbers={numbersToPlace}
          onPlacement={handlePlacement}
          onAllCorrect={handleAllCorrect}
          highlightZero={true}
        />
      </div>

      {/* Success message or reset button */}
      {isComplete ? (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border-2 border-green-400">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-green-800 dark:text-green-300 mb-1">
                  ¡Excelente trabajo!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  Has colocado todos los números correctamente en la recta numérica.
                </p>
              </div>
            </div>
          </div>

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
      ) : (
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <RotateCcw size={18} />
            <span>Reiniciar</span>
          </button>
        </div>
      )}

      {/* Hint for incorrect placements */}
      {!isComplete && correctPlacements.length > 0 && correctPlacements.length < numbersToPlace.length && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Si un número se ilumina en ámbar, significa que está en el lugar equivocado. ¡Sigue intentando!
        </div>
      )}
    </div>
  );
}
