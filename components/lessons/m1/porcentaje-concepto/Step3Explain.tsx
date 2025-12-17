'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'definition' | 'methods' | 'conversions' | 'applications';

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
    title: 'Definición de Porcentaje',
    shortTitle: 'Definición',
    description: '"Por ciento" significa "por cada 100". Es una forma de expresar una parte del total.',
    formula: 'x% = x/100 = x de cada 100',
    example: {
      input: '¿Qué significa 35%?',
      steps: [
        '35% = 35 por cada 100',
        '35% = 35/100 = 0,35',
        'Si hay 100 alumnos y 35% aprobó',
        '35 alumnos aprobaron',
      ],
      result: '35 de cada 100',
    },
    color: 'blue',
  },
  {
    id: 'methods',
    title: 'Cálculo de Porcentajes',
    shortTitle: 'Cálculo',
    description: 'Hay dos formas principales de calcular el porcentaje de una cantidad.',
    formula: 'x% de N = (x ÷ 100) × N = (x × N) ÷ 100',
    example: {
      input: '15% de 80',
      steps: [
        'Método 1: (15 ÷ 100) × 80',
        '= 0,15 × 80 = 12',
        'Método 2: (15 × 80) ÷ 100',
        '= 1200 ÷ 100 = 12',
      ],
      result: '12',
    },
    color: 'purple',
  },
  {
    id: 'conversions',
    title: 'Conversiones',
    shortTitle: 'Conversiones',
    description: 'Los porcentajes se pueden expresar como fracciones o decimales.',
    formula: 'x% = x/100 = decimal',
    example: {
      input: 'Convertir 25%, 50%, 75%',
      steps: [
        '25% = 25/100 = 1/4 = 0,25',
        '50% = 50/100 = 1/2 = 0,5',
        '75% = 75/100 = 3/4 = 0,75',
        'Para convertir: dividir por 100',
      ],
      result: '0,25 | 0,5 | 0,75',
    },
    color: 'teal',
  },
  {
    id: 'applications',
    title: 'Aplicaciones',
    shortTitle: 'Usos',
    description: 'Los porcentajes aparecen en descuentos, propinas, intereses y estadísticas.',
    formula: 'Descuento = Precio × (% ÷ 100)',
    example: {
      input: 'Precio $80 con 20% descuento',
      steps: [
        'Descuento = 80 × (20 ÷ 100)',
        '= 80 × 0,20 = $16',
        'Precio final = 80 - 16',
        '= $64',
      ],
      result: 'Paga $64',
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

  const currentFormula = FORMULAS.find(f => f.id === activeTab)!;
  const colors = colorClasses[currentFormula.color];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Conceptos de Porcentajes
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Todo lo que necesitas saber sobre porcentajes
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
      </div>

      {/* Formula content */}
      <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className={cn('w-6 h-6', colors.text)} />
          <h3 className={cn('text-xl font-bold', colors.text)}>
            {currentFormula.title}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {currentFormula.description}
        </p>

        {/* Main formula */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
          <p className="text-center font-mono text-2xl text-gray-800 dark:text-gray-200">
            {currentFormula.formula}
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
              {currentFormula.example.input}
            </p>
            <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
              {currentFormula.example.steps.map((step, i) => (
                <p key={i} className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                  {i === currentFormula.example.steps.length - 1 ? '→ ' : '• '}
                  {step}
                </p>
              ))}
            </div>
            <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
              <p className={cn('font-mono font-bold text-lg text-center', colors.text)}>
                = {currentFormula.example.result}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips and common errors */}
      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
        <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Tips y errores comunes:
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Correcto:</h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• 50% de 60 = 30 (la mitad)</li>
              <li>• 10% de 250 = 25 (÷ 10)</li>
              <li>• 100% = el total completo</li>
              <li>• 25% = 1/4 del total</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Confundir 50% con 50</li>
              <li>• Olvidar dividir por 100</li>
              <li>• Pensar que 200% es imposible</li>
              <li>• Sumar % en vez de calcular</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Memory tip */}
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
        <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Atajos para calcular rápido:
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="font-bold text-green-600 text-lg">10%</p>
            <p className="text-xs text-gray-500">Mueve la coma</p>
            <p className="font-mono text-sm">10% de 80 = 8</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="font-bold text-green-600 text-lg">50%</p>
            <p className="text-xs text-gray-500">Divide por 2</p>
            <p className="font-mono text-sm">50% de 80 = 40</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="font-bold text-green-600 text-lg">25%</p>
            <p className="text-xs text-gray-500">Divide por 4</p>
            <p className="font-mono text-sm">25% de 80 = 20</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="font-bold text-green-600 text-lg">1%</p>
            <p className="text-xs text-gray-500">Divide por 100</p>
            <p className="font-mono text-sm">1% de 80 = 0,8</p>
          </div>
        </div>
      </div>

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
