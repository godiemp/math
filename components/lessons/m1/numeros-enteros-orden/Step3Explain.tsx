'use client';

import { useState } from 'react';
import { Thermometer, Building, Wallet, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

// Color classes must be explicit for Tailwind to include them in production
const COLOR_CLASSES: Record<string, { bg: string; icon: string }> = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/50', icon: 'text-blue-600 dark:text-blue-400' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-900/50', icon: 'text-purple-600 dark:text-purple-400' },
  red: { bg: 'bg-red-100 dark:bg-red-900/50', icon: 'text-red-600 dark:text-red-400' },
  green: { bg: 'bg-green-100 dark:bg-green-900/50', icon: 'text-green-600 dark:text-green-400' },
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/50', icon: 'text-emerald-600 dark:text-emerald-400' },
  gray: { bg: 'bg-gray-100 dark:bg-gray-900/50', icon: 'text-gray-600 dark:text-gray-400' },
};

const EXAMPLES = [
  {
    number: -5,
    icon: Thermometer,
    title: 'Temperatura',
    description: '5 grados bajo cero',
    color: 'blue',
  },
  {
    number: -2,
    icon: Building,
    title: 'Pisos',
    description: 'Segundo piso subterráneo',
    color: 'purple',
  },
  {
    number: -100,
    icon: Wallet,
    title: 'Dinero',
    description: 'Deuda de $100',
    color: 'red',
  },
  {
    number: 3,
    icon: Building,
    title: 'Pisos',
    description: 'Tercer piso',
    color: 'green',
  },
  {
    number: 50,
    icon: Wallet,
    title: 'Dinero',
    description: '$50 en el bolsillo',
    color: 'emerald',
  },
  {
    number: 0,
    icon: Thermometer,
    title: 'Temperatura',
    description: 'Punto de congelación',
    color: 'gray',
  },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const selectedExample = EXAMPLES.find(e => e.number === selectedNumber);

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¿Qué son los Números Enteros?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Los enteros incluyen los positivos, los negativos, y el cero
        </p>
      </div>

      {/* Number line visualization */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-green-50 dark:from-blue-900/30 dark:via-gray-800 dark:to-green-900/30 rounded-xl p-6">
        <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-mono font-bold overflow-x-auto">
          <span className="text-gray-400">...</span>
          {[-3, -2, -1, 0, 1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedNumber(num === selectedNumber ? null : num)}
              className={cn(
                'w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all',
                num < 0 && 'text-blue-600 dark:text-blue-400',
                num > 0 && 'text-green-600 dark:text-green-400',
                num === 0 && 'text-red-600 dark:text-red-400 font-extrabold',
                selectedNumber === num && 'ring-4 ring-purple-400 scale-110'
              )}
            >
              {num}
            </button>
          ))}
          <span className="text-gray-400">...</span>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-4 text-sm">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <ArrowLeft size={16} />
            <span>Negativos (izquierda)</span>
          </div>
          <div className="text-red-600 dark:text-red-400 font-bold">Cero</div>
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <span>Positivos (derecha)</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>

      {/* Key concepts */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            -1, -2, -3...
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Negativos:</strong> menores que cero
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-gray-600 dark:text-gray-300 mb-2">
            0
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Cero:</strong> ni positivo ni negativo
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            1, 2, 3...
          </div>
          <p className="text-sm text-green-800 dark:text-green-200">
            <strong>Positivos:</strong> mayores que cero
          </p>
        </div>
      </div>

      {/* Interactive examples */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6">
        <h3 className="font-bold text-lg text-purple-800 dark:text-purple-200 mb-4 text-center">
          Haz clic en un número para ver ejemplos de la vida real
        </h3>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {EXAMPLES.map(({ number }) => (
            <button
              key={number}
              onClick={() => setSelectedNumber(number === selectedNumber ? null : number)}
              className={cn(
                'w-12 h-12 rounded-xl font-bold text-lg transition-all',
                selectedNumber === number
                  ? 'bg-purple-500 text-white scale-110 shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/50'
              )}
            >
              {number}
            </button>
          ))}
        </div>

        {/* Selected example */}
        {selectedExample && (
          <div className="animate-fadeIn bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-4">
            <div className={cn(
              'w-14 h-14 rounded-xl flex items-center justify-center',
              COLOR_CLASSES[selectedExample.color]?.bg
            )}>
              <selectedExample.icon className={cn(
                'w-8 h-8',
                COLOR_CLASSES[selectedExample.color]?.icon
              )} />
            </div>
            <div>
              <div className="font-bold text-2xl text-gray-900 dark:text-white">
                {selectedExample.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {selectedExample.title}: {selectedExample.description}
              </div>
            </div>
          </div>
        )}
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
