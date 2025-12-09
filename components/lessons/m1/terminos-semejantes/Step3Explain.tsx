'use client';

import { useEffect, useState } from 'react';
import { Check, X, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Example {
  terms: string;
  isLike: boolean;
  reason: string;
}

const EXAMPLES: Example[] = [
  { terms: '3x y -7x', isLike: true, reason: 'Misma variable (x)' },
  { terms: '2x² y 5x²', isLike: true, reason: 'Misma variable y exponente' },
  { terms: '4ab y -ab', isLike: true, reason: 'Mismas variables (a y b)' },
  { terms: '3x y 3y', isLike: false, reason: 'Variables diferentes' },
  { terms: '2x y 2x²', isLike: false, reason: 'Exponentes diferentes' },
  { terms: 'xy y x²y', isLike: false, reason: 'Exponentes de x diferentes' },
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
          La Regla de Oro
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Material de referencia sobre términos semejantes
        </p>
      </div>

      {/* Card 1: Definition */}
      <div
        className={cn(
          'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-700 cursor-pointer transition-all',
          expandedCard === 0 && 'ring-4 ring-purple-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 0 ? null : 0)}
      >
        <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4">
          TÉRMINOS SEMEJANTES
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Términos que tienen:
        </p>
        <div className="space-y-2 ml-4">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-800 dark:text-gray-200">La MISMA variable</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-800 dark:text-gray-200">El MISMO exponente</span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm">
            <Lightbulb className="inline w-4 h-4 mr-1" />
            El coeficiente puede ser diferente!
          </p>
        </div>
      </div>

      {/* Card 2: The Rule */}
      <div
        className={cn(
          'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-2xl p-6 border-2 border-green-300 dark:border-green-700 cursor-pointer transition-all',
          expandedCard === 1 && 'ring-4 ring-green-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)}
      >
        <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">
          PARA COMBINAR TÉRMINOS SEMEJANTES
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              1
            </span>
            <p className="text-gray-700 dark:text-gray-300 pt-1">
              Suma (o resta) los <strong>COEFICIENTES</strong>
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              2
            </span>
            <p className="text-gray-700 dark:text-gray-300 pt-1">
              Mantiene la variable y exponente <strong>IGUALES</strong>
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="mt-6 space-y-3">
          <p className="font-semibold text-gray-700 dark:text-gray-300">Ejemplos:</p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-2">
            <p className="font-mono text-lg">
              <span className="text-blue-600">3</span>x + <span className="text-blue-600">5</span>x = (<span className="text-blue-600">3+5</span>)x = <span className="text-green-600 font-bold">8x</span>
            </p>
            <p className="font-mono text-lg">
              <span className="text-blue-600">7</span>y² - <span className="text-blue-600">2</span>y² = (<span className="text-blue-600">7-2</span>)y² = <span className="text-green-600 font-bold">5y²</span>
            </p>
            <p className="font-mono text-lg">
              <span className="text-blue-600">4</span>ab + <span className="text-blue-600">2</span>ab - <span className="text-blue-600">1</span>ab = (<span className="text-blue-600">4+2-1</span>)ab = <span className="text-green-600 font-bold">5ab</span>
            </p>
          </div>
        </div>
      </div>

      {/* Card 3: Reference Table */}
      <div
        className={cn(
          'bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer transition-all',
          expandedCard === 2 && 'ring-4 ring-blue-400'
        )}
        onClick={() => setExpandedCard(expandedCard === 2 ? null : 2)}
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          TABLA DE REFERENCIA
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">¿Semejantes?</th>
                <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">Términos</th>
                <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">¿Por qué?</th>
              </tr>
            </thead>
            <tbody>
              {EXAMPLES.map((example, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-3">
                    {example.isLike ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <Check size={18} /> SÍ
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500">
                        <X size={18} /> NO
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-mono text-gray-800 dark:text-gray-200">
                    {example.terms}
                  </td>
                  <td className="py-3 px-3 text-gray-600 dark:text-gray-400 text-sm">
                    {example.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              Piensa en los coeficientes como &ldquo;cuántos tengo&rdquo; de ese tipo.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              <strong>3x</strong> significa &ldquo;tengo 3 equis&rdquo;<br />
              <strong>5x</strong> significa &ldquo;tengo 5 equis&rdquo;<br />
              Juntos: &ldquo;tengo 8 equis&rdquo; = <strong>8x</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
