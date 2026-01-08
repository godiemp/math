'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { MathText } from '@/components/math/MathDisplay';

interface ScaleItem {
  id: string;
  name: string;
  size: string;
  emoji: string;
  color: string;
}

const SCALE_ITEMS: ScaleItem[] = [
  { id: 'universe', name: 'Universo observable', size: '880,000,000,000,000,000,000,000,000 m', emoji: '🌌', color: 'purple' },
  { id: 'sun', name: 'Distancia al Sol', size: '150,000,000,000 m', emoji: '☀️', color: 'yellow' },
  { id: 'cell', name: 'Célula humana', size: '0.00001 m', emoji: '🔬', color: 'green' },
  { id: 'atom', name: 'Átomo de hidrógeno', size: '0.0000000001 m', emoji: '⚛️', color: 'blue' },
];

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Problema de los Científicos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Números tan grandes y tan pequeños que no caben en ninguna parte
        </p>
      </div>

      {/* Scenario */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔬</div>
          <div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Imagina que eres un científico trabajando en un laboratorio. Tu jefe te pide que
              escribas un informe sobre el tamaño de diferentes objetos: desde átomos
              microscópicos hasta galaxias enormes.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              Pero hay un problema... <span className="font-semibold text-indigo-700 dark:text-indigo-300">
              ¿cómo escribes estos números sin volverte loco?</span>
            </p>
          </div>
        </div>
      </div>

      {/* Scale visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
          Mira estos números del mundo real:
        </h3>
        <div className="space-y-4">
          {SCALE_ITEMS.map((item) => (
            <div
              key={item.id}
              className={cn(
                'p-4 rounded-xl border-2 transition-all',
                item.color === 'purple' && 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700',
                item.color === 'yellow' && 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
                item.color === 'green' && 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
                item.color === 'blue' && 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
              )}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{item.name}</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400 break-all">
                    {item.size}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
        <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Pregunta para pensar:
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          ¿Cuál crees que es el mayor problema al trabajar con estos números?
        </p>

        <div className="grid gap-3">
          {[
            { id: 'difficult', text: 'Son difíciles de calcular' },
            { id: 'zeros', text: 'Tienen demasiados ceros y es fácil equivocarse' },
            { id: 'memory', text: 'Son difíciles de memorizar' },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              disabled={showResult}
              className={cn(
                'w-full p-4 rounded-xl text-left font-medium transition-all border-2',
                selectedAnswer === option.id
                  ? option.id === 'zeros'
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                    : 'bg-amber-100 dark:bg-amber-900/50 border-amber-500 text-amber-800 dark:text-amber-200'
                  : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-amber-400'
              )}
            >
              {option.text}
            </button>
          ))}
        </div>

        {showResult && (
          <div className={cn(
            'mt-6 p-4 rounded-xl animate-fadeIn',
            selectedAnswer === 'zeros'
              ? 'bg-green-100 dark:bg-green-900/40 border border-green-300 dark:border-green-700'
              : 'bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700'
          )}>
            <p className="text-gray-700 dark:text-gray-300">
              {selectedAnswer === 'zeros' ? (
                <>
                  <span className="font-bold text-green-700 dark:text-green-300">¡Exacto!</span> Contar ceros
                  es tedioso y muy propenso a errores. Un cero de más o de menos puede cambiar
                  completamente el resultado. Por eso los científicos inventaron una forma más
                  elegante de escribir estos números...
                </>
              ) : (
                <>
                  <span className="font-bold text-amber-700 dark:text-amber-300">Buena observación,</span> pero
                  el problema principal es la cantidad de ceros. Es muy fácil perder la cuenta o
                  agregar uno de más. Por eso los científicos necesitaban una mejor forma de
                  escribir estos números...
                </>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Teaser */}
      {showResult && (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-700 animate-fadeIn">
          <div className="flex items-center gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <p className="font-semibold text-purple-800 dark:text-purple-200">
                ¿Sabías que...?
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                El número <span className="font-mono">150,000,000,000</span> se puede escribir simplemente como{' '}
                <span className="font-bold text-purple-700 dark:text-purple-300"><MathText content="$1.5 \times 10^{11}$" /></span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                ¡Vamos a descubrir cómo funciona esta magia matemática!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Continue button */}
      {showResult && (
        <div className="flex justify-center animate-fadeIn">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Descubrir el patrón</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
