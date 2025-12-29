'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'producto' | 'cociente' | 'potencia' | 'tips';

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
    id: 'producto',
    title: 'Propiedad del Producto',
    shortTitle: 'Producto',
    description: 'El logaritmo de un producto es la suma de los logaritmos',
    formula: 'logb(x · y) = logb(x) + logb(y)',
    example: {
      input: 'Simplificar: log₂(8) + log₂(4)',
      steps: [
        'Aplicamos la propiedad del producto',
        'log₂(8) + log₂(4) = log₂(8 × 4)',
        'log₂(32)',
        'Como 2⁵ = 32, log₂(32) = 5',
      ],
      result: '5',
    },
    color: 'blue',
  },
  {
    id: 'cociente',
    title: 'Propiedad del Cociente',
    shortTitle: 'Cociente',
    description: 'El logaritmo de un cociente es la resta de los logaritmos',
    formula: 'logb(x / y) = logb(x) - logb(y)',
    example: {
      input: 'Simplificar: log₁₀(1000) - log₁₀(10)',
      steps: [
        'Aplicamos la propiedad del cociente',
        'log₁₀(1000) - log₁₀(10) = log₁₀(1000 ÷ 10)',
        'log₁₀(100)',
        'Como 10² = 100, log₁₀(100) = 2',
      ],
      result: '2',
    },
    color: 'purple',
  },
  {
    id: 'potencia',
    title: 'Propiedad de la Potencia',
    shortTitle: 'Potencia',
    description: 'El logaritmo de una potencia es el exponente por el logaritmo',
    formula: 'logb(xⁿ) = n · logb(x)',
    example: {
      input: 'Simplificar: log₃(81)',
      steps: [
        '81 = 3⁴, entonces log₃(81) = log₃(3⁴)',
        'Aplicamos la propiedad de la potencia',
        'log₃(3⁴) = 4 · log₃(3)',
        'Como log₃(3) = 1, tenemos 4 × 1 = 4',
      ],
      result: '4',
    },
    color: 'teal',
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
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700',
    tab: 'bg-amber-500 text-white',
  },
};

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('producto');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['producto']);

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
    <div className="space-y-8 animate-fadeIn pb-24">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Las Propiedades de los Logaritmos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Fórmulas y ejemplos para cada propiedad
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
            <h3 className={cn('text-xl font-bold', colors.text)}>Tips y casos especiales</h3>
          </div>

          {/* Special cases */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Casos especiales importantes:
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                <p className="font-mono text-lg text-green-700 dark:text-green-300 text-center">logb(1) = 0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Porque b⁰ = 1</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                <p className="font-mono text-lg text-green-700 dark:text-green-300 text-center">logb(b) = 1</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Porque b¹ = b</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Correcto:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• log(a·b) = log(a) + log(b)</li>
                <li>• log(a/b) = log(a) - log(b)</li>
                <li>• log(aⁿ) = n·log(a)</li>
                <li>• log₂(2) = 1, log₁₀(1) = 0</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• log(a+b) ≠ log(a) + log(b)</li>
                <li>• log(a-b) ≠ log(a) - log(b)</li>
                <li>• log(a)/log(b) ≠ log(a/b)</li>
                <li>• log(a)·log(b) ≠ log(a·b)</li>
              </ul>
            </div>
          </div>

          {/* Key insight */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Clave para recordar:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Las propiedades solo funcionan con <strong>multiplicación, división y potencias</strong>.
              <br />
              <span className="text-red-600 dark:text-red-400">¡NO hay propiedad para sumas o restas dentro del logaritmo!</span>
            </p>
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
            <p className="text-center font-mono text-2xl text-gray-800 dark:text-gray-200">
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
