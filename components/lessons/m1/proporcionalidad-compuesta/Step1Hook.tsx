'use client';

import { useState } from 'react';
import { ArrowRight, Users, Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!isActive) return null;

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Fábrica de Muebles
        </h2>
        <p className="text-gray-600 dark:text-gray-300">Un problema con varias variables</p>
      </div>

      {/* Story */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🪑</div>
          <div className="space-y-3">
            <p className="text-gray-800 dark:text-gray-200">
              En una fábrica de muebles, <strong>8 carpinteros</strong> trabajando{' '}
              <strong>6 horas al día</strong> producen <strong>120 sillas</strong> en{' '}
              <strong>5 días</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              El jefe necesita saber: ¿Cuántas sillas producirán <strong>12 carpinteros</strong>{' '}
              trabajando <strong>8 horas al día</strong> en <strong>10 días</strong>?
            </p>
          </div>
        </div>
      </div>

      {/* Data visualization */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
            Situación Inicial
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">8 carpinteros</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">6 horas/día</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <span className="text-gray-700 dark:text-gray-300">5 días</span>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-2xl">🪑</span>
              <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                120 sillas
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
            Nueva Situación
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">12 carpinteros</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">8 horas/día</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <span className="text-gray-700 dark:text-gray-300">10 días</span>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-2xl">🪑</span>
              <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                ¿? sillas
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4">
        <p className="font-semibold text-purple-800 dark:text-purple-200 mb-4">
          ¿Qué crees que pasará con la producción?
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            { id: 0, text: 'Producirán menos sillas porque es más difícil de calcular' },
            { id: 1, text: 'Producirán las mismas 120 sillas' },
            { id: 2, text: 'Producirán más sillas porque tienen más de todo' },
            { id: 3, text: 'No se puede saber sin hacer cálculos' },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedAnswer(option.id)}
              disabled={showResult}
              className={cn(
                'p-3 rounded-lg text-left transition-all',
                selectedAnswer === option.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/50',
                showResult && 'cursor-not-allowed'
              )}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      {/* Submit button */}
      {!showResult && selectedAnswer !== null && (
        <div className="flex justify-center animate-fadeIn">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-all"
          >
            Ver respuesta
          </button>
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <p className="font-bold text-green-800 dark:text-green-200 mb-2">
              ¡Veamos! La respuesta es: <strong>480 sillas</strong>
            </p>
            <p className="text-green-700 dark:text-green-300">
              Cuando hay varias magnitudes que afectan el resultado, necesitamos analizar cada una
              por separado. Este tipo de problema se llama{' '}
              <strong>proporcionalidad compuesta</strong>.
            </p>
            <div className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>¿Por qué 480?</strong> Más carpinteros (↑), más horas (↑), más días (↑) =
                más sillas (↑). Cada factor multiplica el resultado.
              </p>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Aprender a resolverlo</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
