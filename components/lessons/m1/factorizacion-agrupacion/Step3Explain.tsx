'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'basic' | 'reorder' | 'signs' | 'verify' | 'tips';

interface FormulaTab {
  id: TabId;
  title: string;
  shortTitle: string;
  description: string;
  formula: string;
  example: {
    input: string;
    steps: string[];
    result: string;
  };
  color: string;
}

const FORMULAS: FormulaTab[] = [
  {
    id: 'basic',
    title: 'Caso Básico',
    shortTitle: 'Básico',
    description: 'Cuando los términos ya están ordenados y la agrupación es directa',
    formula: 'ab + ac + db + dc = (a + d)(b + c)',
    example: {
      input: 'xy + xz + 2y + 2z',
      steps: [
        'Agrupar: (xy + xz) + (2y + 2z)',
        'Factor común grupo 1: x(y + z)',
        'Factor común grupo 2: 2(y + z)',
        'Factor común binomial: (y + z)(x + 2)',
      ],
      result: '(y + z)(x + 2)',
    },
    color: 'blue',
  },
  {
    id: 'reorder',
    title: 'Reordenamiento',
    shortTitle: 'Reordenar',
    description: 'A veces hay que reordenar los términos para que la agrupación funcione',
    formula: 'ab + dc + ac + db → ab + ac + db + dc',
    example: {
      input: 'x² + 6 + 2x + 3x',
      steps: [
        'Reordenar: x² + 2x + 3x + 6',
        'Agrupar: (x² + 2x) + (3x + 6)',
        'Factor común grupo 1: x(x + 2)',
        'Factor común grupo 2: 3(x + 2)',
        'Factor común binomial: (x + 2)(x + 3)',
      ],
      result: '(x + 2)(x + 3)',
    },
    color: 'purple',
  },
  {
    id: 'signs',
    title: 'Cuidado con Signos',
    shortTitle: 'Signos',
    description: 'Cuando hay términos negativos, el factor común puede incluir un signo negativo',
    formula: 'ab - ac + db - dc = (a + d)(b - c)',
    example: {
      input: 'x² - 3x - 2x + 6',
      steps: [
        'Agrupar: (x² - 3x) + (-2x + 6)',
        'Factor común grupo 1: x(x - 3)',
        'Factor común grupo 2: -2(x - 3)',
        '¡Ojo! Sacamos -2 para obtener (x - 3)',
        'Factor común binomial: (x - 3)(x - 2)',
      ],
      result: '(x - 3)(x - 2)',
    },
    color: 'teal',
  },
  {
    id: 'verify',
    title: 'Verificación',
    shortTitle: 'Verificar',
    description: 'Siempre verifica tu resultado multiplicando de vuelta',
    formula: '(a + b)(c + d) = ac + ad + bc + bd',
    example: {
      input: 'Verificar: (x + 2)(x + 3)',
      steps: [
        'Multiplica FOIL: First, Outer, Inner, Last',
        'F: x · x = x²',
        'O: x · 3 = 3x',
        'I: 2 · x = 2x',
        'L: 2 · 3 = 6',
        'Suma: x² + 3x + 2x + 6 = x² + 5x + 6 ✓',
      ],
      result: 'x² + 5x + 6 ✓',
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
  const [activeTab, setActiveTab] = useState<TabId>('basic');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['basic']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentFormula = FORMULAS.find(f => f.id === activeTab);
  const colors = activeTab === 'tips' ? colorClasses.amber : colorClasses[currentFormula!.color];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Casos de Agrupación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Diferentes situaciones al factorizar por agrupación
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
              {isVisited && activeTab !== formula.id && (
                <span className="ml-1 text-green-500">✓</span>
              )}
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
                <li>• Verifica que los paréntesis sean iguales</li>
                <li>• Si no coinciden, reordena los términos</li>
                <li>• Cuidado con signos negativos</li>
                <li>• Verifica multiplicando de vuelta</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Olvidar cambiar signos al factorizar</li>
                <li>• Agrupar términos que no comparten factor</li>
                <li>• No verificar el resultado final</li>
                <li>• Sacar factor incompleto de un grupo</li>
              </ul>
            </div>
          </div>

          {/* Key insight */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Clave del éxito:
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              La agrupación funciona cuando <strong>ambos grupos producen el mismo binomio</strong> entre paréntesis.
              Si no coinciden, prueba reordenando los términos.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-center">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="text-blue-600">a</span>
                <span className="text-purple-600 font-bold">(x + y)</span>
                <span className="text-gray-400">+</span>
                <span className="text-teal-600">b</span>
                <span className="text-purple-600 font-bold">(x + y)</span>
                <span className="text-gray-400">=</span>
                <span className="text-purple-600 font-bold">(x + y)</span>
                <span className="text-pink-600">(a + b)</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Los paréntesis <span className="text-purple-600">(x + y)</span> deben ser idénticos
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Formula content */
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>
              {currentFormula!.title}
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {currentFormula!.description}
          </p>

          {/* Main formula */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
            <p className="text-center font-mono text-xl text-gray-800 dark:text-gray-200">
              {currentFormula!.formula}
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
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {FORMULAS.map((formula) => {
          const cardColors = colorClasses[formula.color];
          return (
            <div
              key={formula.id}
              className={cn(
                'p-3 rounded-lg border text-center',
                cardColors.bg,
                cardColors.border
              )}
            >
              <p className={cn('font-mono text-sm font-bold', cardColors.text)}>
                {formula.shortTitle}
              </p>
            </div>
          );
        })}
      </div>

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
