'use client';

import { useEffect, useState } from 'react';
import { Check, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Step {
  number: number;
  title: string;
  description: string;
  example: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    title: 'LEER y comprender',
    description: 'Lee el problema con atención. Identifica qué te piden encontrar.',
    example: 'Un número aumentado en 5 es 12. ¿Cuál es el número?',
  },
  {
    number: 2,
    title: 'DEFINIR la incógnita',
    description: 'Asigna una variable (x) a lo que no conoces.',
    example: 'x = el número desconocido',
  },
  {
    number: 3,
    title: 'TRADUCIR a ecuación',
    description: 'Convierte las palabras en símbolos matemáticos.',
    example: 'x + 5 = 12',
  },
  {
    number: 4,
    title: 'RESOLVER la ecuación',
    description: 'Despeja la incógnita usando las operaciones inversas.',
    example: 'x = 12 - 5 = 7',
  },
  {
    number: 5,
    title: 'VERIFICAR la respuesta',
    description: 'Sustituye el valor encontrado en el problema original.',
    example: '7 + 5 = 12 ✓',
  },
];

const KEYWORD_TABLE = [
  { spanish: 'la suma de a y b', math: 'a + b' },
  { spanish: 'a aumentado en b', math: 'a + b' },
  { spanish: 'la diferencia entre a y b', math: 'a - b' },
  { spanish: 'a disminuido en b', math: 'a - b' },
  { spanish: 'el producto de a y b', math: 'a * b' },
  { spanish: 'el doble de x', math: '2x' },
  { spanish: 'el triple de x', math: '3x' },
  { spanish: 'la mitad de x', math: 'x/2' },
  { spanish: 'el cociente entre a y b', math: 'a / b' },
  { spanish: 'es igual a', math: '=' },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Auto-complete on mount (explain steps don't require interaction)
  useEffect(() => {
    if (isActive) {
      onComplete();
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn pb-32">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Método para Resolver Problemas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Material de referencia sobre traducción y resolución
        </p>
      </div>

      {/* Card 1: The 5 Steps */}
      <div
        className={cn(
          'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-700 cursor-pointer transition-all',
          expandedCard === 0 && 'ring-4 ring-purple-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 0 ? null : 0)}
      >
        <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4">
          LOS 5 PASOS PARA RESOLVER PROBLEMAS
        </h3>

        <div className="space-y-4">
          {STEPS.map((step) => (
            <div key={step.number} className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {step.number}
                </span>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {step.description}
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded px-3 py-1 inline-block">
                    <code className="text-purple-600 dark:text-purple-400 text-sm">
                      {step.example}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 2: Keywords Reference Table */}
      <div
        className={cn(
          'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-2xl p-6 border-2 border-blue-300 dark:border-blue-700 cursor-pointer transition-all',
          expandedCard === 1 && 'ring-4 ring-blue-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)}
      >
        <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">
          DICCIONARIO DE TRADUCCIÓN
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-blue-200 dark:border-blue-700">
                <th className="text-left py-2 px-3 text-blue-600 dark:text-blue-400">Español</th>
                <th className="text-left py-2 px-3 text-blue-600 dark:text-blue-400">Matemáticas</th>
              </tr>
            </thead>
            <tbody>
              {KEYWORD_TABLE.map((row, index) => (
                <tr key={index} className="border-b border-blue-100 dark:border-blue-800">
                  <td className="py-3 px-3 text-gray-700 dark:text-gray-300">
                    {row.spanish}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-blue-700 dark:text-blue-300">
                    {row.math}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card 3: Worked Example */}
      <div
        className={cn(
          'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-2xl p-6 border-2 border-green-300 dark:border-green-700 cursor-pointer transition-all',
          expandedCard === 2 && 'ring-4 ring-green-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 2 ? null : 2)}
      >
        <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">
          EJEMPLO RESUELTO
        </h3>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
          <p className="text-gray-800 dark:text-gray-200 font-medium">
            &ldquo;El triple de un número disminuido en 7 es igual a 14. ¿Cuál es el número?&rdquo;
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Check className="w-5 h-5 text-green-500" />
            <span><strong>Incógnita:</strong> x = el número</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Check className="w-5 h-5 text-green-500" />
            <span><strong>Ecuación:</strong> 3x - 7 = 14</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="font-semibold text-green-600 dark:text-green-400 mb-2">Resolución:</p>
            <div className="space-y-1 font-mono text-gray-700 dark:text-gray-300">
              <p>3x - 7 = 14</p>
              <p>3x = 14 + 7</p>
              <p>3x = 21</p>
              <p>x = 21 / 3</p>
              <p className="text-green-600 font-bold">x = 7</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Check className="w-5 h-5 text-green-500" />
            <span><strong>Verificación:</strong> 3(7) - 7 = 21 - 7 = 14 ✓</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl p-6 border border-yellow-300 dark:border-yellow-700">
        <div className="flex items-start gap-4">
          <Lightbulb className="w-8 h-8 text-yellow-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
              Tips importantes
            </h4>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>• La variable <strong>x</strong> representa lo que buscas (lo desconocido)</li>
              <li>• &ldquo;Es igual a&rdquo;, &ldquo;resulta&rdquo;, &ldquo;da&rdquo; se traducen como <strong>=</strong></li>
              <li>• Siempre verifica tu respuesta sustituyendo en el problema original</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Common errors */}
      <div className="bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 rounded-xl p-6 border border-red-300 dark:border-red-700">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">
              Errores comunes
            </h4>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>• <strong>Confundir el orden:</strong> &ldquo;5 menos un número&rdquo; es 5 - x, no x - 5</li>
              <li>• <strong>Olvidar los paréntesis:</strong> &ldquo;el doble de (x + 3)&rdquo; es 2(x + 3), no 2x + 3</li>
              <li>• <strong>No verificar:</strong> Siempre comprueba que la respuesta tenga sentido</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
