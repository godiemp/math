'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'sin' | 'cos' | 'tan' | 'tips';

interface RatioTab {
  id: Exclude<TabId, 'tips'>;
  title: string;
  shortTitle: string;
  formula: string;
  meaning: string;
  commonAngles: { angle: string; value: string }[];
  example: {
    setup: string;
    calculation: string;
    result: string;
  };
  color: string;
}

const RATIOS: RatioTab[] = [
  {
    id: 'sin',
    title: 'Seno (sin)',
    shortTitle: 'Seno',
    formula: 'sin(θ) = Opuesto / Hipotenusa',
    meaning: 'El seno mide qué fracción de la hipotenusa representa el lado opuesto.',
    commonAngles: [
      { angle: '30°', value: '0,5' },
      { angle: '45°', value: '0,707' },
      { angle: '60°', value: '0,866' },
    ],
    example: {
      setup: 'En un triángulo con ángulo θ = 30°, hipotenusa = 10',
      calculation: 'Opuesto = sin(30°) × 10 = 0,5 × 10',
      result: 'Opuesto = 5',
    },
    color: 'red',
  },
  {
    id: 'cos',
    title: 'Coseno (cos)',
    shortTitle: 'Coseno',
    formula: 'cos(θ) = Adyacente / Hipotenusa',
    meaning: 'El coseno mide qué fracción de la hipotenusa representa el lado adyacente.',
    commonAngles: [
      { angle: '30°', value: '0,866' },
      { angle: '45°', value: '0,707' },
      { angle: '60°', value: '0,5' },
    ],
    example: {
      setup: 'En un triángulo con ángulo θ = 60°, hipotenusa = 8',
      calculation: 'Adyacente = cos(60°) × 8 = 0,5 × 8',
      result: 'Adyacente = 4',
    },
    color: 'green',
  },
  {
    id: 'tan',
    title: 'Tangente (tan)',
    shortTitle: 'Tangente',
    formula: 'tan(θ) = Opuesto / Adyacente',
    meaning: 'La tangente mide la inclinación: cuánto sube el lado opuesto por cada unidad del adyacente.',
    commonAngles: [
      { angle: '30°', value: '0,577' },
      { angle: '45°', value: '1' },
      { angle: '60°', value: '1,732' },
    ],
    example: {
      setup: 'En un triángulo con ángulo θ = 45°, adyacente = 6',
      calculation: 'Opuesto = tan(45°) × 6 = 1 × 6',
      result: 'Opuesto = 6',
    },
    color: 'purple',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; tab: string }> = {
  red: {
    bg: 'bg-red-50 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-200 dark:border-red-700',
    tab: 'bg-red-500 text-white',
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
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700',
    tab: 'bg-amber-500 text-white',
  },
};

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('sin');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['sin']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentRatio = RATIOS.find((r) => r.id === activeTab);
  const colors = activeTab === 'tips' ? colorClasses.amber : colorClasses[currentRatio!.color];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Las Razones Trigonométricas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explora cada razón y sus propiedades
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {RATIOS.map((ratio) => {
          const tabColors = colorClasses[ratio.color];
          const isVisited = visitedTabs.includes(ratio.id);
          return (
            <button
              key={ratio.id}
              onClick={() => handleTabChange(ratio.id)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all text-sm',
                activeTab === ratio.id
                  ? tabColors.tab
                  : isVisited
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              )}
            >
              <span>{ratio.shortTitle}</span>
              {isVisited && activeTab !== ratio.id && (
                <span className="ml-1 text-green-500">✓</span>
              )}
            </button>
          );
        })}
        {/* Tips tab */}
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

      {/* Content */}
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
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• El ángulo θ NO puede ser el ángulo recto (90°)</li>
                <li>• Siempre identifica primero cuál lado es opuesto y cuál es adyacente</li>
                <li>• La hipotenusa es siempre el lado más largo</li>
                <li>• SOH-CAH-TOA te ayuda a recordar las fórmulas</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Confundir opuesto con adyacente (depende del ángulo)</li>
                <li>• Usar el ángulo recto en lugar del ángulo agudo</li>
                <li>• Olvidar que sin/cos siempre son menores o iguales a 1</li>
                <li>• Confundir las fórmulas de sin y cos</li>
              </ul>
            </div>
          </div>

          {/* Key relationship */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Relación importante
            </h4>
            <div className="text-center">
              <p className="font-mono text-xl text-gray-800 dark:text-gray-200 mb-2">
                tan(θ) = sin(θ) / cos(θ)
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                La tangente se puede calcular dividiendo el seno entre el coseno.
              </p>
            </div>
          </div>

          {/* Identifying sides diagram */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
              ¿Cómo identificar los lados?
            </h4>
            <div className="flex justify-center">
              <svg viewBox="0 0 250 180" className="w-64">
                {/* Triangle */}
                <polygon
                  points="30,150 220,150 220,30"
                  fill="#e0e7ff"
                  fillOpacity="0.5"
                  stroke="#4f46e5"
                  strokeWidth="2"
                />

                {/* Right angle marker */}
                <rect x="205" y="135" width="15" height="15" fill="none" stroke="#4f46e5" strokeWidth="1.5" />

                {/* Angle θ */}
                <path d="M 60 150 A 30 30 0 0 1 52 125" fill="none" stroke="#dc2626" strokeWidth="2" />
                <text x="70" y="135" fontSize="14" fontWeight="bold" fill="#dc2626">θ</text>

                {/* Side labels with arrows */}
                <text x="125" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#059669">
                  ADYACENTE (junto a θ)
                </text>
                <text x="235" y="95" fontSize="12" fontWeight="bold" fill="#dc2626" transform="rotate(90, 235, 95)">
                  OPUESTO
                </text>
                <text x="110" y="75" fontSize="12" fontWeight="bold" fill="#7c3aed" transform="rotate(-32, 110, 75)">
                  HIPOTENUSA
                </text>

                {/* Annotation arrows */}
                <line x1="30" y1="145" x2="30" y2="100" stroke="#dc2626" strokeWidth="1" strokeDasharray="3,3" />
                <text x="15" y="125" fontSize="9" fill="#dc2626">frente a θ</text>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        /* Ratio content */
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>{currentRatio!.title}</h3>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">{currentRatio!.meaning}</p>

          {/* Main formula */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
            <p className="text-center font-mono text-2xl text-gray-800 dark:text-gray-200">
              {currentRatio!.formula}
            </p>
          </div>

          {/* Common angles */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Valores para ángulos comunes:
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {currentRatio!.commonAngles.map((angle) => (
                <div
                  key={angle.angle}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">{angle.angle}</p>
                  <p className="font-mono text-xl font-bold text-gray-800 dark:text-gray-200">
                    {angle.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Ejemplo:
            </h4>
            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-400">{currentRatio!.example.setup}</p>
              <p className="font-mono text-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                {currentRatio!.example.calculation}
              </p>
              <div className={cn('p-3 rounded-lg', colors.bg)}>
                <p className={cn('font-mono font-bold text-lg text-center', colors.text)}>
                  {currentRatio!.example.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {RATIOS.map((ratio) => {
          const cardColors = colorClasses[ratio.color];
          return (
            <div
              key={ratio.id}
              className={cn('p-3 rounded-lg border text-center', cardColors.bg, cardColors.border)}
            >
              <p className={cn('font-mono text-sm font-bold', cardColors.text)}>
                {ratio.shortTitle}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {ratio.id === 'sin' && 'Op/Hip'}
                {ratio.id === 'cos' && 'Ady/Hip'}
                {ratio.id === 'tan' && 'Op/Ady'}
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
