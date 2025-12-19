'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'formula' | 'numeric' | 'algebraic' | 'advanced' | 'tips';

interface FormulaTab {
  id: TabId;
  title: string;
  shortTitle: string;
  description: string;
  example: {
    input: string;
    a: string;
    b: string;
    steps: string[];
    result: string;
  };
  color: string;
}

const FORMULAS: FormulaTab[] = [
  {
    id: 'formula',
    title: 'La Fórmula',
    shortTitle: 'Fórmula',
    description: 'La diferencia de cuadrados siempre sigue este patrón',
    example: {
      input: 'a² - b²',
      a: 'a',
      b: 'b',
      steps: [
        'Identifica el primer cuadrado: a²',
        'Identifica el segundo cuadrado: b²',
        'Aplica la fórmula: (a + b)(a - b)',
      ],
      result: '(a + b)(a - b)',
    },
    color: 'blue',
  },
  {
    id: 'numeric',
    title: 'Con Números',
    shortTitle: 'Números',
    description: 'Cuando el segundo término es un número',
    example: {
      input: 'x² - 49',
      a: 'x',
      b: '7',
      steps: [
        'a² = x² → a = x',
        'b² = 49 → b = √49 = 7',
        'Aplicamos: (x + 7)(x - 7)',
      ],
      result: '(x + 7)(x - 7)',
    },
    color: 'green',
  },
  {
    id: 'algebraic',
    title: 'Con Variables',
    shortTitle: 'Variables',
    description: 'Cuando ambos términos tienen variables',
    example: {
      input: 'x² - y²',
      a: 'x',
      b: 'y',
      steps: [
        'a² = x² → a = x',
        'b² = y² → b = y',
        'Aplicamos: (x + y)(x - y)',
      ],
      result: '(x + y)(x - y)',
    },
    color: 'purple',
  },
  {
    id: 'advanced',
    title: 'Con Coeficientes',
    shortTitle: 'Coeficientes',
    description: 'Cuando hay coeficientes en los cuadrados',
    example: {
      input: '16x² - 25y²',
      a: '4x',
      b: '5y',
      steps: [
        'a² = 16x² = (4x)² → a = 4x',
        'b² = 25y² = (5y)² → b = 5y',
        'Aplicamos: (4x + 5y)(4x - 5y)',
      ],
      result: '(4x + 5y)(4x - 5y)',
    },
    color: 'pink',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; tab: string }> = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700',
    tab: 'bg-blue-500 text-white',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-200 dark:border-green-700',
    tab: 'bg-green-500 text-white',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-700',
    tab: 'bg-purple-500 text-white',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-900/30',
    text: 'text-pink-700 dark:text-pink-300',
    border: 'border-pink-200 dark:border-pink-700',
    tab: 'bg-pink-500 text-white',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700',
    tab: 'bg-amber-500 text-white',
  },
};

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('formula');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['formula']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentFormula = FORMULAS.find((f) => f.id === activeTab);
  const colors = activeTab === 'tips' ? colorClasses.amber : colorClasses[currentFormula!.color];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Diferencia de Cuadrados
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Domina la fórmula y sus aplicaciones
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {FORMULAS.map((formula) => {
          const tabColors = colorClasses[formula.color];
          const isVisited = visitedTabs.includes(formula.id);
          return (
            <button
              key={formula.id}
              onClick={() => handleTabChange(formula.id)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all text-sm',
                activeTab === formula.id
                  ? tabColors.tab
                  : isVisited
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              )}
            >
              <span>{formula.shortTitle}</span>
              {isVisited && activeTab !== formula.id && <span className="ml-1 text-green-500">✓</span>}
            </button>
          );
        })}
        <button
          onClick={() => handleTabChange('tips')}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-all text-sm',
            activeTab === 'tips'
              ? colorClasses.amber.tab
              : visitedTabs.includes('tips')
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
          )}
        >
          <span>Tips</span>
          {visitedTabs.includes('tips') && activeTab !== 'tips' && (
            <span className="ml-1 text-green-500">✓</span>
          )}
        </button>
      </div>

      {activeTab === 'tips' ? (
        /* Tips content */
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>Tips y errores comunes</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Correcto:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Verificar que ambos términos son cuadrados</li>
                <li>• Recordar que el signo entre ellos es MENOS</li>
                <li>• Los factores son (a+b) y (a-b)</li>
                <li>• Verificar multiplicando los factores</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Confundir a² + b² con a² - b² (no es lo mismo)</li>
                <li>• Escribir (a - b)² en vez de (a+b)(a-b)</li>
                <li>• Olvidar sacar la raíz de coeficientes</li>
                <li>• Intentar factorizar SUMA de cuadrados</li>
              </ul>
            </div>
          </div>

          {/* Important note about sum of squares */}
          <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-6 border border-red-200 dark:border-red-700 mb-6">
            <h4 className="font-bold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              ¡Importante!
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              La <strong>suma de cuadrados</strong> (a² + b²) <span className="text-red-600 font-bold">NO se puede factorizar</span> con números reales.
            </p>
            <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-center text-sm">
              <span className="text-red-600">x² + 9</span>
              <span className="text-gray-400 mx-2">≠</span>
              <span className="line-through text-gray-400">(x + 3)(x - 3)</span>
              <span className="text-red-500 ml-2">✗ No se puede factorizar</span>
            </div>
          </div>

          {/* Verification tip */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Verificación rápida:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Para verificar, multiplica los factores. El término del medio <strong>siempre se cancela</strong>:
            </p>
            <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-center text-sm">
              <span className="text-green-600">(x + 5)(x - 5)</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-blue-600">x² - 5x + 5x - 25</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-purple-600">x² - 25</span>
              <span className="text-green-500 ml-2">✓</span>
            </div>
          </div>
        </div>
      ) : (
        /* Formula content */
        <>
          <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className={cn('w-6 h-6', colors.text)} />
              <h3 className={cn('text-xl font-bold', colors.text)}>{currentFormula!.title}</h3>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">{currentFormula!.description}</p>

            {/* Main pattern */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
              <p className="text-center font-mono text-2xl text-gray-800 dark:text-gray-200">
                <span className="text-blue-600">a²</span> - <span className="text-purple-600">b²</span> = (<span className="text-blue-600">a</span> + <span className="text-purple-600">b</span>)(<span className="text-blue-600">a</span> - <span className="text-purple-600">b</span>)
              </p>
            </div>

            {/* Example */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Ejemplo:
              </h4>
              <div className="space-y-3">
                <p className="font-mono text-lg text-gray-800 dark:text-gray-200">
                  {currentFormula!.example.input}
                </p>
                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
                  <span>
                    a = <span className="text-blue-600 font-bold">{currentFormula!.example.a}</span>
                  </span>
                  <span>
                    b = <span className="text-purple-600 font-bold">{currentFormula!.example.b}</span>
                  </span>
                </div>
                <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                  {currentFormula!.example.steps.map((step, i) => (
                    <p key={i} className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                      {i === currentFormula!.example.steps.length - 1 ? '→ ' : '• '}
                      {step}
                    </p>
                  ))}
                </div>
                <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
                  <p className={cn('font-mono font-bold text-lg text-center', colors.text)}>
                    = {currentFormula!.example.result}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Perfect Squares Reference */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              Cuadrados Perfectos Comunes
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { n: 1, sq: 1 },
                { n: 2, sq: 4 },
                { n: 3, sq: 9 },
                { n: 4, sq: 16 },
                { n: 5, sq: 25 },
                { n: 6, sq: 36 },
                { n: 7, sq: 49 },
                { n: 8, sq: 64 },
                { n: 9, sq: 81 },
                { n: 10, sq: 100 },
                { n: 11, sq: 121 },
                { n: 12, sq: 144 },
              ].map((item) => (
                <div
                  key={item.n}
                  className="bg-white dark:bg-gray-800 rounded-lg p-2 text-center"
                >
                  <span className="font-mono text-sm">
                    <span className="text-blue-600">{item.n}²</span> = <span className="text-green-600 font-bold">{item.sq}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
