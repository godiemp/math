'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle, Calculator, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { BlockMath, InlineMath } from '@/components/math/MathDisplay';

type TabId = 'standard' | 'general' | 'discriminant' | 'special' | 'tips';

interface FormulaTab {
  id: TabId;
  title: string;
  shortTitle: string;
  description: string;
  example: {
    input: string;
    coefficients: string;
    steps: string[];
    result: string;
  };
  color: string;
}

const FORMULAS: FormulaTab[] = [
  {
    id: 'standard',
    title: 'Fórmula Estándar (a = 1)',
    shortTitle: 'Estándar',
    description: 'Cuando el coeficiente de x² es 1, la fórmula se simplifica',
    example: {
      input: 'x² + 5x + 6 = 0',
      coefficients: 'a = 1, b = 5, c = 6',
      steps: [
        'x = (-5 ± √(25 - 24)) / 2',
        'x = (-5 ± √1) / 2',
        'x = (-5 ± 1) / 2',
        'x = -4/2 = -2  o  x = -6/2 = -3',
      ],
      result: 'x = -2  o  x = -3',
    },
    color: 'blue',
  },
  {
    id: 'general',
    title: 'Caso General (a ≠ 1)',
    shortTitle: 'General',
    description: 'Cuando a ≠ 1, debemos incluir el 2a en el denominador',
    example: {
      input: '2x² - 7x + 3 = 0',
      coefficients: 'a = 2, b = -7, c = 3',
      steps: [
        'x = (7 ± √(49 - 24)) / 4',
        'x = (7 ± √25) / 4',
        'x = (7 ± 5) / 4',
        'x = 12/4 = 3  o  x = 2/4 = 1/2',
      ],
      result: 'x = 3  o  x = 1/2',
    },
    color: 'purple',
  },
  {
    id: 'discriminant',
    title: 'El Discriminante',
    shortTitle: 'Δ',
    description: 'El discriminante Δ = b² - 4ac determina el tipo de soluciones',
    example: {
      input: 'x² - 6x + 9 = 0',
      coefficients: 'a = 1, b = -6, c = 9',
      steps: [
        'Δ = (-6)² - 4(1)(9) = 36 - 36 = 0',
        'Como Δ = 0, hay una solución repetida',
        'x = 6 / 2 = 3',
      ],
      result: 'x = 3 (solución doble)',
    },
    color: 'teal',
  },
  {
    id: 'special',
    title: 'Casos Especiales',
    shortTitle: 'Especiales',
    description: 'Cuando b = 0 o c = 0, la ecuación se simplifica',
    example: {
      input: 'x² - 9 = 0  (b = 0)',
      coefficients: 'a = 1, b = 0, c = -9',
      steps: [
        'x = (0 ± √(0 - 4(1)(-9))) / 2',
        'x = ±√36 / 2',
        'x = ±6 / 2',
      ],
      result: 'x = 3  o  x = -3',
    },
    color: 'green',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; tab: string }> = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700',
    tab: 'bg-blue-500 text-white',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-700',
    tab: 'bg-purple-500 text-white',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-900/30',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-700',
    tab: 'bg-teal-500 text-white',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-200 dark:border-green-700',
    tab: 'bg-green-500 text-white',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700',
    tab: 'bg-amber-500 text-white',
  },
};

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('standard');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['standard']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentFormula = FORMULAS.find((f) => f.id === activeTab);
  const colors = activeTab === 'tips' ? colorClasses.amber : colorClasses[currentFormula?.color || 'blue'];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Fórmula Cuadrática
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Domina cada caso de aplicación
        </p>
      </div>

      {/* Main Formula Display */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Para resolver <InlineMath latex="ax^2 + bx + c = 0" />:
          </p>
          <div className="text-2xl md:text-3xl font-bold text-purple-700 dark:text-purple-300">
            <BlockMath latex="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
          </div>
        </div>
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
                'px-3 py-2 rounded-lg font-medium transition-all text-sm',
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
            'px-3 py-2 rounded-lg font-medium transition-all text-sm',
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
        /* Tips content - INSIDE the tab structure */
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>Tips y errores comunes</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Correcto:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Identifica a, b, c antes de sustituir</li>
                <li>• Recuerda: -b significa el opuesto de b</li>
                <li>• Calcula el discriminante primero</li>
                <li>• Usa ± para obtener ambas soluciones</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Olvidar el signo negativo de -b</li>
                <li>• Calcular mal b² (especialmente si b es negativo)</li>
                <li>• Olvidar dividir TODO por 2a</li>
                <li>• Confundir 2a con solo a</li>
              </ul>
            </div>
          </div>

          {/* Verification tip */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Verificación rápida:
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Sustituye tus soluciones en la ecuación original. Si obtienes 0, ¡son correctas!
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-sm">
              <p className="text-gray-600 dark:text-gray-400 mb-2">Ejemplo: x² + 5x + 6 = 0, soluciones x = -2 y x = -3</p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <p className="text-blue-600 dark:text-blue-400">x = -2:</p>
                  <p className="text-gray-600 dark:text-gray-400">(-2)² + 5(-2) + 6 = 4 - 10 + 6 = <span className="text-green-600 font-bold">0 ✓</span></p>
                </div>
                <div className="flex-1">
                  <p className="text-purple-600 dark:text-purple-400">x = -3:</p>
                  <p className="text-gray-600 dark:text-gray-400">(-3)² + 5(-3) + 6 = 9 - 15 + 6 = <span className="text-green-600 font-bold">0 ✓</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Mnemonic */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 mt-4 border border-purple-200 dark:border-purple-700">
            <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Memoriza la fórmula:
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-center font-medium">
              &quot;Menos b, más o menos la raíz de b al cuadrado menos cuatro a c, todo sobre dos a&quot;
            </p>
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

            {/* Tab-specific content */}
            {activeTab === 'standard' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
                <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
                  Cuando <InlineMath latex="a = 1" />, el denominador es simplemente 2:
                </p>
                <div className="text-center text-lg text-blue-600 dark:text-blue-400 font-bold">
                  <BlockMath latex="x = \frac{-b \pm \sqrt{b^2 - 4c}}{2}" />
                </div>
              </div>
            )}

            {activeTab === 'general' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <p className="text-gray-600 dark:text-gray-400">Identifica a, b, c (¡cuidado con los signos!)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <p className="text-gray-600 dark:text-gray-400">Calcula -b (el opuesto de b)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <p className="text-gray-600 dark:text-gray-400">Calcula el discriminante: b² - 4ac</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <p className="text-gray-600 dark:text-gray-400">Divide todo por 2a (no solo por a)</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'discriminant' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-lg text-teal-600 dark:text-teal-400 font-bold mb-4">
                    <BlockMath latex="\Delta = b^2 - 4ac" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 text-center">
                    <div className="font-semibold text-green-700 dark:text-green-300 mb-1">
                      <InlineMath latex="\Delta > 0" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">2 soluciones reales</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 text-center">
                    <div className="font-semibold text-amber-700 dark:text-amber-300 mb-1">
                      <InlineMath latex="\Delta = 0" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">1 solución (doble)</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-3 text-center">
                    <div className="font-semibold text-red-700 dark:text-red-300 mb-1">
                      <InlineMath latex="\Delta < 0" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Sin solución real</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'special' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                    <p className="font-semibold text-green-700 dark:text-green-300 mb-2">
                      Cuando <InlineMath latex="b = 0" />:
                    </p>
                    <div className="text-gray-600 dark:text-gray-400 mb-1">
                      <InlineMath latex="ax^2 + c = 0" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      La fórmula se simplifica a <InlineMath latex="x = \pm\sqrt{-c/a}" />
                    </p>
                  </div>
                  <div className="bg-teal-50 dark:bg-teal-900/30 rounded-lg p-4">
                    <p className="font-semibold text-teal-700 dark:text-teal-300 mb-2">
                      Cuando <InlineMath latex="c = 0" />:
                    </p>
                    <div className="text-gray-600 dark:text-gray-400 mb-1">
                      <InlineMath latex="ax^2 + bx = 0" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Mejor factorizar: <InlineMath latex="x(ax + b) = 0" />
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Example */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-gray-500" />
                Ejemplo:
              </h4>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <p className="font-mono text-lg text-gray-800 dark:text-gray-200">
                    {currentFormula!.example.input}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ({currentFormula!.example.coefficients})
                  </p>
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
                    {currentFormula!.example.result}
                  </p>
                </div>
              </div>
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
