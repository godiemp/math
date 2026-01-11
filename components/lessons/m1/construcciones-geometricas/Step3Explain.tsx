'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Ruler, Compass, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'mediatriz' | 'bisectriz' | 'perpendicular' | 'tips';

const TABS = [
  { id: 'mediatriz' as TabId, label: 'Mediatriz', icon: Ruler },
  { id: 'bisectriz' as TabId, label: 'Bisectriz', icon: Compass },
  { id: 'perpendicular' as TabId, label: 'Perpendicular', icon: Ruler },
  { id: 'tips' as TabId, label: 'Tips', icon: Lightbulb },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('mediatriz');

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Las Tres Construcciones</h2>
        <p className="text-gray-600 dark:text-gray-300">Resumen de las propiedades clave de cada construcción.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 flex-wrap">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2',
                activeTab === tab.id
                  ? tab.id === 'tips'
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        {activeTab === 'mediatriz' && <MediatrizCard />}
        {activeTab === 'bisectriz' && <BisectrizCard />}
        {activeTab === 'perpendicular' && <PerpendicularCard />}
        {activeTab === 'tips' && <TipsCard />}
      </div>

      {/* Continue button */}
      <button
        onClick={onComplete}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
      >
        <span>Continuar</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
}

function MediatrizCard() {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <Ruler className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mediatriz</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Perpendicular bisector</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Mini diagram */}
        <div className="flex justify-center items-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <svg viewBox="0 0 150 100" className="w-full max-w-[200px]">
            <line x1="20" y1="50" x2="130" y2="50" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
            <circle cx="20" cy="50" r="4" fill="#EF4444" />
            <circle cx="130" cy="50" r="4" fill="#EF4444" />
            <text x="15" y="70" className="text-xs fill-gray-600 dark:fill-gray-400">A</text>
            <text x="125" y="70" className="text-xs fill-gray-600 dark:fill-gray-400">B</text>

            <line x1="75" y1="10" x2="75" y2="90" stroke="#10B981" strokeWidth="2" />
            <circle cx="75" cy="50" r="4" fill="#10B981" />
            <text x="80" y="45" className="text-xs fill-green-600">M</text>

            {/* Equal marks */}
            <line x1="45" y1="45" x2="45" y2="55" stroke="#3B82F6" strokeWidth="2" />
            <line x1="105" y1="45" x2="105" y2="55" stroke="#3B82F6" strokeWidth="2" />
          </svg>
        </div>

        {/* Properties */}
        <div className="space-y-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200 font-medium">Definición</p>
            <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
              Recta perpendicular que pasa por el punto medio de un segmento.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
            <p className="text-green-800 dark:text-green-200 font-medium">Propiedad clave</p>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">
              Todos los puntos de la mediatriz están a <strong>igual distancia</strong> de A y B.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
            <p className="text-purple-800 dark:text-purple-200 font-medium">Usos</p>
            <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
              Encontrar el centro de un segmento, circuncentro del triángulo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BisectrizCard() {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <Compass className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bisectriz</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Angle bisector</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Mini diagram */}
        <div className="flex justify-center items-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <svg viewBox="0 0 150 100" className="w-full max-w-[200px]">
            <line x1="20" y1="80" x2="140" y2="80" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
            <line x1="20" y1="80" x2="120" y2="20" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
            <circle cx="20" cy="80" r="4" fill="#EF4444" />
            <text x="10" y="90" className="text-xs fill-gray-600 dark:fill-gray-400">V</text>

            {/* Bisector */}
            <line x1="20" y1="80" x2="130" y2="45" stroke="#10B981" strokeWidth="2" />

            {/* Equal angle marks */}
            <path d="M 40 80 A 20 20 0 0 0 35 68" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
            <path d="M 35 68 A 20 20 0 0 0 45 60" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Properties */}
        <div className="space-y-3">
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-200 font-medium">Definición</p>
            <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
              Semirrecta que divide un ángulo en dos partes iguales.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
            <p className="text-green-800 dark:text-green-200 font-medium">Propiedad clave</p>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">
              Todos los puntos de la bisectriz están a <strong>igual distancia</strong> de los dos lados del ángulo.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
            <p className="text-purple-800 dark:text-purple-200 font-medium">Usos</p>
            <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
              Dividir ángulos, incentro del triángulo, simetrías.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PerpendicularCard() {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
          <Ruler className="w-6 h-6 text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Perpendicular desde un Punto</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Perpendicular from external point</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Mini diagram */}
        <div className="flex justify-center items-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <svg viewBox="0 0 150 100" className="w-full max-w-[200px]">
            <line x1="10" y1="70" x2="140" y2="70" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
            <text x="135" y="85" className="text-xs fill-gray-600 dark:fill-gray-400">L</text>

            <circle cx="75" cy="20" r="4" fill="#EF4444" />
            <text x="80" y="18" className="text-xs fill-gray-600 dark:fill-gray-400">P</text>

            {/* Perpendicular line */}
            <line x1="75" y1="20" x2="75" y2="70" stroke="#10B981" strokeWidth="2" />

            {/* Right angle marker */}
            <path d="M 75 60 L 85 60 L 85 70" fill="none" stroke="#10B981" strokeWidth="1.5" />

            {/* Foot point */}
            <circle cx="75" cy="70" r="4" fill="#10B981" />
          </svg>
        </div>

        {/* Properties */}
        <div className="space-y-3">
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-3 border border-teal-200 dark:border-teal-800">
            <p className="text-teal-800 dark:text-teal-200 font-medium">Definición</p>
            <p className="text-teal-700 dark:text-teal-300 text-sm mt-1">
              Recta que pasa por un punto externo y forma ángulo de 90° con otra recta.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
            <p className="text-green-800 dark:text-green-200 font-medium">Propiedad clave</p>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">
              Es la <strong>distancia más corta</strong> desde el punto P a la recta L.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
            <p className="text-purple-800 dark:text-purple-200 font-medium">Usos</p>
            <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
              Calcular distancias, alturas de triángulos, proyecciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TipsCard() {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tips y Errores Comunes</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Consejos para construcciones perfectas</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Tip 1 */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <div>
              <p className="text-green-800 dark:text-green-200 font-medium">
                El compás debe mantenerse con la misma abertura
              </p>
              <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                No cambies la abertura del compás entre arcos que deben ser iguales. Esto garantiza que los puntos de
                intersección estén correctamente ubicados.
              </p>
            </div>
          </div>
        </div>

        {/* Tip 2 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
              2
            </div>
            <div>
              <p className="text-blue-800 dark:text-blue-200 font-medium">Para la mediatriz: radio mayor que la mitad</p>
              <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                La abertura del compás debe ser mayor que la mitad del segmento para que los arcos se crucen. Si es
                menor, no hay intersección.
              </p>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
            <div>
              <p className="text-red-800 dark:text-red-200 font-medium">Error común: confundir construcciones</p>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                <strong>Mediatriz</strong> = divide un <em>segmento</em> por la mitad
                <br />
                <strong>Bisectriz</strong> = divide un <em>ángulo</em> por la mitad
                <br />
                No son lo mismo.
              </p>
            </div>
          </div>
        </div>

        {/* Tip 3 */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <div>
              <p className="text-purple-800 dark:text-purple-200 font-medium">
                Los arcos solo necesitan cruzarse
              </p>
              <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
                No es necesario dibujar arcos completos. Basta con dibujar la parte donde se cruzan. Esto ahorra tiempo
                y mantiene el dibujo limpio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
