'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'definition' | 'convertir' | 'comun' | 'tips';

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
    id: 'definition',
    title: 'Definición de Logaritmo',
    shortTitle: 'Definición',
    description: 'El logaritmo es el exponente al que hay que elevar la base para obtener el número',
    formula: 'logb(x) = y  ⟺  bʸ = x',
    example: {
      input: 'log₂(32)',
      steps: [
        'Buscamos y tal que 2ʸ = 32',
        '2 × 2 × 2 × 2 × 2 = 32',
        '2⁵ = 32 ✓',
        'Por lo tanto log₂(32) = 5',
      ],
      result: '5',
    },
    color: 'blue',
  },
  {
    id: 'convertir',
    title: 'Convertir entre Formas',
    shortTitle: 'Convertir',
    description: 'Puedes pasar de forma exponencial a logarítmica y viceversa',
    formula: 'bʸ = x  ⟺  logb(x) = y',
    example: {
      input: 'Convertir 5³ = 125',
      steps: [
        'La base es 5',
        'El exponente es 3',
        'El resultado es 125',
        'Forma logarítmica: log₅(125) = 3',
      ],
      result: 'log₅(125) = 3',
    },
    color: 'purple',
  },
  {
    id: 'comun',
    title: 'Logaritmo Común (Base 10)',
    shortTitle: 'Log Base 10',
    description: 'Cuando no se escribe la base, se asume base 10. Es el logaritmo más usado.',
    formula: 'log(x) = log₁₀(x)',
    example: {
      input: 'log(1000)',
      steps: [
        'log(1000) = log₁₀(1000)',
        'Buscamos y tal que 10ʸ = 1000',
        '1000 tiene 3 ceros',
        '10³ = 1000',
      ],
      result: 'log(1000) = 3',
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
  const [activeTab, setActiveTab] = useState<TabId>('definition');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['definition']);

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
          Conceptos de Logaritmos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Todo lo que necesitas saber sobre los logaritmos
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
                <li>• log₁₀(100) = 2 porque 10² = 100</li>
                <li>• log₂(1) = 0 porque 2⁰ = 1</li>
                <li>• log₅(5) = 1 porque 5¹ = 5</li>
                <li>• log sin base = log base 10</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Confundir log₁₀(100) con 100 ÷ 10 = 10</li>
                <li>• Pensar que log₂(8) = 2 × 8 = 16</li>
                <li>• Olvidar que log sin base significa base 10</li>
                <li>• log(0) y log(negativo) NO existen</li>
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
              El logaritmo pregunta: <strong>&quot;¿A qué exponente debo elevar la base para obtener este número?&quot;</strong>
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

      {/* Memory tip */}
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
        <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Truco para recordar:
        </h4>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          El logaritmo es <strong>&quot;deshacer&quot;</strong> una potencia. Pregúntate: <strong>&quot;¿Qué exponente necesito?&quot;</strong>
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-center">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="text-center">
              <p className="text-blue-600">log₁₀(1000)</p>
              <p className="text-xs text-gray-500">10^? = 1000</p>
              <p className="text-green-600 font-bold">= 3</p>
            </div>
            <div className="text-center">
              <p className="text-purple-600">log₂(16)</p>
              <p className="text-xs text-gray-500">2^? = 16</p>
              <p className="text-green-600 font-bold">= 4</p>
            </div>
            <div className="text-center">
              <p className="text-teal-600">log₃(81)</p>
              <p className="text-xs text-gray-500">3^? = 81</p>
              <p className="text-green-600 font-bold">= 4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
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
