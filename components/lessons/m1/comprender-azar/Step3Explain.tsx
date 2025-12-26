'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'frecuencia' | 'ley' | 'normal' | 'tips';

interface ConceptTab {
  id: TabId;
  title: string;
  shortTitle: string;
  color: string;
}

const TABS: ConceptTab[] = [
  {
    id: 'frecuencia',
    title: 'Frecuencia Relativa',
    shortTitle: 'Frecuencia',
    color: 'blue',
  },
  {
    id: 'ley',
    title: 'Ley de los Grandes Numeros',
    shortTitle: 'Ley GN',
    color: 'purple',
  },
  {
    id: 'normal',
    title: 'Distribucion Normal',
    shortTitle: 'Normal',
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
  const [activeTab, setActiveTab] = useState<TabId>('frecuencia');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['frecuencia']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentTab = TABS.find(t => t.id === activeTab);
  const colors = activeTab === 'tips' ? colorClasses.amber : colorClasses[currentTab!.color];

  if (!isActive) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'frecuencia':
        return (
          <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className={cn('w-6 h-6', colors.text)} />
              <h3 className={cn('text-xl font-bold', colors.text)}>
                Frecuencia Relativa
              </h3>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              La frecuencia relativa mide que tan seguido ocurre un evento respecto al total de intentos.
            </p>

            {/* Main formula */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
              <p className="text-center font-mono text-2xl text-gray-800 dark:text-gray-200 mb-2">
                f<sub>r</sub> = <span className="text-green-600">n</span> / <span className="text-blue-600">N</span>
              </p>
              <div className="flex justify-center gap-8 text-sm mt-4">
                <div className="text-center">
                  <span className="font-bold text-green-600">n</span>
                  <p className="text-gray-500 dark:text-gray-400">veces que ocurrio</p>
                </div>
                <div className="text-center">
                  <span className="font-bold text-blue-600">N</span>
                  <p className="text-gray-500 dark:text-gray-400">total de intentos</p>
                </div>
              </div>
            </div>

            {/* Example */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Ejemplo: Lanzar una moneda
              </h4>
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  Lanzamos una moneda <strong>20 veces</strong> y obtenemos cara <strong>12 veces</strong>:
                </p>
                <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2 font-mono">
                  <p className="text-gray-600 dark:text-gray-400">
                    f<sub>r</sub>(cara) = <span className="text-green-600">12</span> / <span className="text-blue-600">20</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    f<sub>r</sub>(cara) = 0.60 = <strong>60%</strong>
                  </p>
                </div>
                <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
                  <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
                    Aunque la probabilidad teorica es 50%, en pocos intentos puede variar mucho.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ley':
        return (
          <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className={cn('w-6 h-6', colors.text)} />
              <h3 className={cn('text-xl font-bold', colors.text)}>
                Ley de los Grandes Numeros
              </h3>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A medida que aumentamos los intentos, la frecuencia relativa se acerca a la probabilidad teorica.
            </p>

            {/* Main concept */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
              <div className="text-center space-y-3">
                <p className="font-mono text-xl text-gray-800 dark:text-gray-200">
                  Cuando N → ∞
                </p>
                <p className="font-mono text-2xl text-purple-600 dark:text-purple-400">
                  f<sub>r</sub> → P(evento)
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  La frecuencia relativa converge a la probabilidad teorica
                </p>
              </div>
            </div>

            {/* Visual demonstration */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Ejemplo con moneda (P = 50%):
              </h4>
              <div className="space-y-3">
                {[
                  { n: 10, fr: '40%', diff: '10%', color: 'red' },
                  { n: 100, fr: '47%', diff: '3%', color: 'amber' },
                  { n: 1000, fr: '49.2%', diff: '0.8%', color: 'green' },
                  { n: 10000, fr: '50.1%', diff: '0.1%', color: 'green' },
                ].map((row) => (
                  <div
                    key={row.n}
                    className="flex items-center gap-4 p-2 rounded bg-gray-50 dark:bg-gray-700/50"
                  >
                    <span className="font-mono text-sm w-24 text-gray-600 dark:text-gray-400">
                      N = {row.n.toLocaleString()}
                    </span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className={cn(
                          'h-2 rounded-full',
                          row.color === 'red' && 'bg-red-500',
                          row.color === 'amber' && 'bg-amber-500',
                          row.color === 'green' && 'bg-green-500'
                        )}
                        style={{ width: row.fr }}
                      />
                    </div>
                    <span className="font-mono text-sm w-16 text-right text-gray-600 dark:text-gray-400">
                      {row.fr}
                    </span>
                    <span
                      className={cn(
                        'text-xs w-12',
                        row.color === 'red' && 'text-red-500',
                        row.color === 'amber' && 'text-amber-500',
                        row.color === 'green' && 'text-green-500'
                      )}
                    >
                      ±{row.diff}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                ¡Mientras mas intentos, mas cerca del 50% teorico!
              </p>
            </div>
          </div>
        );

      case 'normal':
        return (
          <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className={cn('w-6 h-6', colors.text)} />
              <h3 className={cn('text-xl font-bold', colors.text)}>
                Distribucion Normal
              </h3>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              La forma de &ldquo;campana&rdquo; que viste en la Tabla de Galton es la distribucion normal.
            </p>

            {/* Bell curve visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
              <svg viewBox="0 0 200 80" className="w-full max-w-xs mx-auto">
                {/* Gaussian bell curve - proper normal distribution shape */}
                <path
                  d="M 10 70 C 10 70 25 70 35 69 C 45 68 55 65 65 58 C 75 48 85 35 100 20 C 115 35 125 48 135 58 C 145 65 155 68 165 69 C 175 70 190 70 190 70"
                  fill="none"
                  className="stroke-teal-500 dark:stroke-teal-400"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Filled area under curve */}
                <path
                  d="M 10 70 C 10 70 25 70 35 69 C 45 68 55 65 65 58 C 75 48 85 35 100 20 C 115 35 125 48 135 58 C 145 65 155 68 165 69 C 175 70 190 70 190 70 L 190 70 L 10 70 Z"
                  className="fill-teal-100 dark:fill-teal-900/30"
                />
                {/* Baseline */}
                <line x1="10" y1="70" x2="190" y2="70" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1" />
                {/* Center line */}
                <line x1="100" y1="20" x2="100" y2="70" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="1" strokeDasharray="4" />
                {/* Labels */}
                <text x="100" y="78" textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-xs">
                  promedio
                </text>
              </svg>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                La mayoria de los valores se concentran cerca del centro
              </p>
            </div>

            {/* Real world examples */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Esta forma aparece en todo:
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: '📏', text: 'Estaturas' },
                  { emoji: '🎯', text: 'Errores de medicion' },
                  { emoji: '📊', text: 'Calificaciones' },
                  { emoji: '🏭', text: 'Control de calidad' },
                  { emoji: '🧬', text: 'Caracteristicas biologicas' },
                  { emoji: '📈', text: 'Datos financieros' },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'tips':
        return (
          <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className={cn('w-6 h-6', colors.text)} />
              <h3 className={cn('text-xl font-bold', colors.text)}>Tips y Errores Comunes</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Recuerda:</h5>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Cada evento aleatorio es <strong>independiente</strong></li>
                  <li>• Los patrones aparecen solo con <strong>muchos</strong> intentos</li>
                  <li>• La frecuencia relativa converge, no es exacta</li>
                  <li>• La probabilidad no garantiza resultados individuales</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Falacias comunes:</h5>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• <strong>Falacia del jugador:</strong> &ldquo;Ya le toca&rdquo; al otro resultado</li>
                  <li>• <strong>Mano caliente:</strong> &ldquo;Esta en racha&rdquo;</li>
                  <li>• <strong>Muestras pequenas:</strong> Confiar en pocos datos</li>
                  <li>• <strong>Confundir fr con P:</strong> Son diferentes</li>
                </ul>
              </div>
            </div>

            {/* Key insight */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Clave para entender el azar:
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                El azar es <strong>impredecible a nivel individual</strong> pero <strong>predecible a nivel colectivo</strong>.
              </p>
              <div className="flex items-center justify-center gap-4 py-3">
                <div className="text-center">
                  <div className="text-3xl mb-1">🎲</div>
                  <span className="text-sm text-gray-500">Un dado</span>
                  <p className="text-xs text-red-500">Impredecible</p>
                </div>
                <ArrowRight className="text-gray-400" />
                <div className="text-center">
                  <div className="text-3xl mb-1">🎲🎲🎲</div>
                  <span className="text-sm text-gray-500">1000 dados</span>
                  <p className="text-xs text-green-500">Predecible</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Teoria del Azar
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Conceptos fundamentales
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {TABS.map((tab) => {
          const tabColors = colorClasses[tab.color];
          const isVisited = visitedTabs.includes(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all text-sm',
                activeTab === tab.id
                  ? tabColors.tab
                  : isVisited
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              )}
            >
              <span>{tab.shortTitle}</span>
              {isVisited && activeTab !== tab.id && (
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

      {/* Tab content */}
      {renderTabContent()}

      {/* Continue button */}
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
