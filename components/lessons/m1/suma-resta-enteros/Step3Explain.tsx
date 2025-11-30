'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Plus, Equal, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface RuleExample {
  a: number;
  b: number;
  result: number;
}

const SAME_SIGN_EXAMPLES: RuleExample[] = [
  { a: 3, b: 5, result: 8 },
  { a: -3, b: -5, result: -8 },
];

const DIFFERENT_SIGN_EXAMPLES: RuleExample[] = [
  { a: 7, b: -3, result: 4 },
  { a: -7, b: 3, result: -4 },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [selectedRule, setSelectedRule] = useState<'same' | 'different' | null>(null);
  const [selectedExample, setSelectedExample] = useState<number | null>(null);

  // Mark step as completed when it becomes active (explain steps auto-complete)
  useEffect(() => {
    if (isActive) {
      onComplete();
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn pb-24">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Las Reglas de la Suma
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ahora que viste cómo funciona, vamos a resumir los patrones
        </p>
      </div>

      {/* Introduction - Connect to previous step */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
          <div>
            <p className="text-purple-800 dark:text-purple-200 font-medium">
              En la recta numérica viste que:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-purple-700 dark:text-purple-300">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-green-500" />
                Sumar positivo = mover a la derecha (aumentar)
              </li>
              <li className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-blue-500" />
                Sumar negativo = mover a la izquierda (disminuir)
              </li>
            </ul>
            <p className="mt-3 text-purple-800 dark:text-purple-200">
              De esto salen dos reglas simples...
            </p>
          </div>
        </div>
      </div>

      {/* Rule Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Same Signs Rule */}
        <button
          onClick={() => setSelectedRule(selectedRule === 'same' ? null : 'same')}
          className={cn(
            'text-left rounded-xl p-6 border-2 transition-all',
            selectedRule === 'same'
              ? 'bg-green-50 dark:bg-green-900/30 border-green-400 ring-2 ring-green-300'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-300'
          )}
        >
          <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-3">
            Regla 1: Signos Iguales
          </h3>

          <div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center gap-2 text-xl font-mono font-bold">
              <span className="text-green-600">(+)</span>
              <Plus className="w-5 h-5" />
              <span className="text-green-600">(+)</span>
              <span className="text-gray-400">o</span>
              <span className="text-blue-600">(-)</span>
              <Plus className="w-5 h-5" />
              <span className="text-blue-600">(-)</span>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
            <strong>Suma</strong> los valores absolutos y <strong>mantén el signo</strong>.
          </p>

          <div className="text-sm text-gray-600 dark:text-gray-400 italic">
            Como moverse dos veces en la misma dirección.
          </div>
        </button>

        {/* Different Signs Rule */}
        <button
          onClick={() => setSelectedRule(selectedRule === 'different' ? null : 'different')}
          className={cn(
            'text-left rounded-xl p-6 border-2 transition-all',
            selectedRule === 'different'
              ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-400 ring-2 ring-purple-300'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300'
          )}
        >
          <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-3">
            Regla 2: Signos Diferentes
          </h3>

          <div className="bg-purple-100 dark:bg-purple-900/50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center gap-2 text-xl font-mono font-bold">
              <span className="text-green-600">(+)</span>
              <Plus className="w-5 h-5" />
              <span className="text-blue-600">(-)</span>
              <span className="text-gray-400">o</span>
              <span className="text-blue-600">(-)</span>
              <Plus className="w-5 h-5" />
              <span className="text-green-600">(+)</span>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
            <strong>Resta</strong> los valores absolutos y usa el <strong>signo del mayor</strong>.
          </p>

          <div className="text-sm text-gray-600 dark:text-gray-400 italic">
            Como moverse en direcciones opuestas - gana el más fuerte.
          </div>
        </button>
      </div>

      {/* Examples Section */}
      {selectedRule && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-fadeIn">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">
            Ejemplos - {selectedRule === 'same' ? 'Signos Iguales' : 'Signos Diferentes'}
          </h4>

          <div className="grid grid-cols-2 gap-4">
            {(selectedRule === 'same' ? SAME_SIGN_EXAMPLES : DIFFERENT_SIGN_EXAMPLES).map((ex, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(selectedExample === index ? null : index)}
                className={cn(
                  'p-4 rounded-lg border-2 transition-all text-center',
                  selectedExample === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                )}
              >
                <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                  ({ex.a}) + ({ex.b})
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Equal className="w-4 h-4 text-gray-400" />
                  <span className={cn(
                    'text-xl font-bold',
                    ex.result > 0 ? 'text-green-600' : ex.result < 0 ? 'text-blue-600' : 'text-gray-600'
                  )}>
                    {ex.result}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Selected example explanation */}
          {selectedExample !== null && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg animate-fadeIn">
              {selectedRule === 'same' ? (
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Paso 1:</strong> Ambos tienen el{' '}
                    {SAME_SIGN_EXAMPLES[selectedExample].a > 0 ? 'mismo signo positivo' : 'mismo signo negativo'}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Paso 2:</strong> Suma los valores absolutos:{' '}
                    {Math.abs(SAME_SIGN_EXAMPLES[selectedExample].a)} + {Math.abs(SAME_SIGN_EXAMPLES[selectedExample].b)} = {Math.abs(SAME_SIGN_EXAMPLES[selectedExample].result)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Paso 3:</strong> Mantén el signo:{' '}
                    <span className="font-bold">
                      {SAME_SIGN_EXAMPLES[selectedExample].result > 0 ? '+' : ''}{SAME_SIGN_EXAMPLES[selectedExample].result}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Paso 1:</strong> Tienen signos diferentes
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Paso 2:</strong> Resta los valores absolutos:{' '}
                    {Math.max(Math.abs(DIFFERENT_SIGN_EXAMPLES[selectedExample].a), Math.abs(DIFFERENT_SIGN_EXAMPLES[selectedExample].b))} - {Math.min(Math.abs(DIFFERENT_SIGN_EXAMPLES[selectedExample].a), Math.abs(DIFFERENT_SIGN_EXAMPLES[selectedExample].b))} = {Math.abs(DIFFERENT_SIGN_EXAMPLES[selectedExample].result)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Paso 3:</strong> Usa el signo del mayor (|{Math.abs(DIFFERENT_SIGN_EXAMPLES[selectedExample].a) > Math.abs(DIFFERENT_SIGN_EXAMPLES[selectedExample].b) ? DIFFERENT_SIGN_EXAMPLES[selectedExample].a : DIFFERENT_SIGN_EXAMPLES[selectedExample].b}| = {Math.max(Math.abs(DIFFERENT_SIGN_EXAMPLES[selectedExample].a), Math.abs(DIFFERENT_SIGN_EXAMPLES[selectedExample].b))}):{' '}
                    <span className="font-bold">
                      {DIFFERENT_SIGN_EXAMPLES[selectedExample].result > 0 ? '+' : ''}{DIFFERENT_SIGN_EXAMPLES[selectedExample].result}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Zero Rule - Special Case */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
          Caso Especial: El Cero
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
            <p className="text-center font-mono text-xl font-bold text-gray-800 dark:text-gray-200">
              a + 0 = a
            </p>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              El cero es neutro - no cambia nada
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
            <p className="text-center font-mono text-xl font-bold text-gray-800 dark:text-gray-200">
              a + (-a) = 0
            </p>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              Opuestos se cancelan
            </p>
          </div>
        </div>
      </div>

      {/* Memory tip */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
        <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Truco para recordar
        </h4>
        <p className="text-yellow-700 dark:text-yellow-300 text-sm">
          Si los signos son <strong>amigos</strong> (iguales), <strong>suma</strong> y quedate con ese signo.
          <br />
          Si los signos son <strong>enemigos</strong> (diferentes), <strong>resta</strong> y gana el más fuerte.
        </p>
      </div>
    </div>
  );
}
