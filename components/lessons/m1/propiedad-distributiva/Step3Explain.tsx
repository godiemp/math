'use client';

import { useEffect, useState } from 'react';
import { Check, X, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Example {
  expression: string;
  step1: string;
  result: string;
}

const EXAMPLES: Example[] = [
  { expression: '5(x + 2)', step1: '5·x + 5·2', result: '5x + 10' },
  { expression: '-3(2x - 4)', step1: '-3·2x + (-3)·(-4)', result: '-6x + 12' },
  { expression: '2(3x + y - 5)', step1: '2·3x + 2·y + 2·(-5)', result: '6x + 2y - 10' },
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
          La Ley de Distribución
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Material de referencia sobre la propiedad distributiva
        </p>
      </div>

      {/* Card 1: The Formula */}
      <div
        className={cn(
          'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-2xl p-6 border-2 border-blue-300 dark:border-blue-700 cursor-pointer transition-all',
          expandedCard === 0 && 'ring-4 ring-blue-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 0 ? null : 0)}
      >
        <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">
          LA PROPIEDAD DISTRIBUTIVA
        </h3>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-4">
          <div className="text-center space-y-2">
            <p className="font-mono text-2xl">
              <span className="text-blue-600 font-bold">a</span>(b + c) = <span className="text-blue-600 font-bold">a</span>·b + <span className="text-blue-600 font-bold">a</span>·c
            </p>
            <p className="font-mono text-2xl">
              <span className="text-blue-600 font-bold">a</span>(b - c) = <span className="text-blue-600 font-bold">a</span>·b - <span className="text-blue-600 font-bold">a</span>·c
            </p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-center">
          El factor de afuera <strong>multiplica a CADA término</strong> dentro del paréntesis
        </p>
      </div>

      {/* Card 2: The Process */}
      <div
        className={cn(
          'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-2xl p-6 border-2 border-green-300 dark:border-green-700 cursor-pointer transition-all',
          expandedCard === 1 && 'ring-4 ring-green-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)}
      >
        <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">
          EL PROCESO PASO A PASO
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              1
            </span>
            <p className="text-gray-700 dark:text-gray-300 pt-1">
              Identifica el <strong>factor externo</strong> (el número fuera del paréntesis)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              2
            </span>
            <p className="text-gray-700 dark:text-gray-300 pt-1">
              Multiplica el factor por <strong>CADA término</strong> interno
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              3
            </span>
            <p className="text-gray-700 dark:text-gray-300 pt-1">
              Respeta los <strong>signos</strong> de operación
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              4
            </span>
            <p className="text-gray-700 dark:text-gray-300 pt-1">
              Si es necesario, <strong>combina términos semejantes</strong>
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="mt-6 space-y-3">
          <p className="font-semibold text-gray-700 dark:text-gray-300">Ejemplos:</p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
            {EXAMPLES.map((ex, i) => (
              <div key={i} className="font-mono text-lg">
                <span className="text-gray-800 dark:text-gray-200">{ex.expression}</span>
                <span className="text-gray-400 mx-2">=</span>
                <span className="text-blue-600">{ex.step1}</span>
                <span className="text-gray-400 mx-2">=</span>
                <span className="text-green-600 font-bold">{ex.result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 3: Connection to Terms Semejantes */}
      <div
        className={cn(
          'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-700 cursor-pointer transition-all',
          expandedCard === 2 && 'ring-4 ring-purple-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 2 ? null : 2)}
      >
        <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4">
          CONEXIÓN CON TÉRMINOS SEMEJANTES
        </h3>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Después de distribuir, frecuentemente necesitas combinar términos semejantes:
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-2">
          <p className="font-mono text-lg text-gray-600 dark:text-gray-400">
            2(x + 3) + 5x
          </p>
          <p className="font-mono text-lg">
            = <span className="text-purple-600">2x + 6</span> + <span className="text-blue-600">5x</span>
            <span className="text-gray-400 text-sm ml-2">← primero distribuimos</span>
          </p>
          <p className="font-mono text-lg">
            = <span className="text-green-600 font-bold">7x + 6</span>
            <span className="text-gray-400 text-sm ml-2">← luego combinamos 2x + 5x</span>
          </p>
        </div>

        <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
          <p className="text-purple-800 dark:text-purple-200 text-sm font-medium">
            <Check className="inline w-4 h-4 mr-1" />
            Primero distribuyes, luego combinas términos semejantes
          </p>
        </div>
      </div>

      {/* Card 4: Common Mistakes */}
      <div
        className={cn(
          'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-2xl p-6 border-2 border-red-200 dark:border-red-800 cursor-pointer transition-all',
          expandedCard === 3 && 'ring-4 ring-red-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 3 ? null : 3)}
      >
        <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          ERRORES COMUNES
        </h3>

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <X className="w-5 h-5 text-red-500" />
              <span className="font-mono text-red-600">3(x + 2) = 3x + 2</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-mono text-green-600">3(x + 2) = 3x + 6</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Error: Olvidaron multiplicar el 3 por el 2
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <X className="w-5 h-5 text-red-500" />
              <span className="font-mono text-red-600">-2(x - 3) = -2x - 6</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-mono text-green-600">-2(x - 3) = -2x + 6</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Error: (-2) × (-3) = +6, no -6
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <X className="w-5 h-5 text-red-500" />
              <span className="font-mono text-red-600">(x + 2)² = x² + 4</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              ⚠️ ¡Esto NO es distribución! Los cuadrados funcionan diferente.
            </p>
          </div>
        </div>
      </div>

      {/* Memory tip */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl p-6 border border-yellow-300 dark:border-yellow-700">
        <div className="flex items-start gap-4">
          <Lightbulb className="w-8 h-8 text-yellow-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
              Truco para recordar
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Piensa en &ldquo;repartir&rdquo; - como un profesor que reparte hojas a <strong>TODOS</strong> los estudiantes, no solo al primero.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              El factor de afuera es como el profesor, y cada término adentro es un estudiante que debe recibir su hoja (multiplicación).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
