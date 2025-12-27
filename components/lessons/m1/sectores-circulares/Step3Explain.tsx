'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Calculator, Ruler } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'area' | 'arco' | 'tips';

// Helper function to create sector path
function sectorPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);

  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
}

// Helper function to create arc path
function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);

  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
}

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('area');

  if (!isActive) return null;

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'area', label: 'Area del Sector', icon: <Calculator size={18} /> },
    { id: 'arco', label: 'Longitud del Arco', icon: <Ruler size={18} /> },
    { id: 'tips', label: 'Tips', icon: <Lightbulb size={18} /> },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Las Formulas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Sector circular y longitud de arco
        </p>
      </div>

      {/* Tab buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap',
              activeTab === tab.id
                ? 'bg-teal-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[400px]">
        {activeTab === 'area' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Formula card */}
            <div className="bg-teal-50 dark:bg-teal-900/30 rounded-xl p-6 border border-teal-200 dark:border-teal-700">
              <h3 className="font-bold text-teal-800 dark:text-teal-200 text-lg mb-4 text-center">
                Area del Sector Circular
              </h3>

              {/* Visual */}
              <div className="flex justify-center mb-4">
                <svg viewBox="0 0 140 140" className="w-36 h-36">
                  <circle cx="70" cy="70" r="55" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
                  <path d={sectorPath(70, 70, 55, 0, 60)} fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
                  <line x1="70" y1="70" x2="70" y2="15" stroke="#dc2626" strokeWidth="2" />
                  <line x1="70" y1="70" x2={70 + 55 * Math.cos((-30) * Math.PI / 180)} y2={70 + 55 * Math.sin((-30) * Math.PI / 180)} stroke="#dc2626" strokeWidth="2" />
                  <circle cx="70" cy="70" r="3" fill="#0d9488" />
                  {/* Angle arc indicator near center */}
                  <path d={arcPath(70, 70, 18, 0, 60)} fill="none" stroke="#f59e0b" strokeWidth="2" />
                  {/* Labels */}
                  <text x="85" y="60" fontSize="12" fontWeight="bold" fill="#dc2626">r</text>
                  <text x={70 + 28 * Math.cos((-60) * Math.PI / 180)} y={70 + 28 * Math.sin((-60) * Math.PI / 180)} fontSize="11" fontWeight="bold" fill="#f59e0b">θ</text>
                </svg>
              </div>

              {/* Formula */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center mb-4">
                <p className="text-2xl font-bold text-teal-700 dark:text-teal-400">
                  A = (θ / 360°) × πr²
                </p>
              </div>

              {/* Explanation */}
              <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <p><strong>θ</strong> = angulo central (en grados)</p>
                <p><strong>r</strong> = radio del circulo</p>
                <p><strong>θ/360°</strong> = fraccion del circulo que representa el sector</p>
                <p><strong>πr²</strong> = area del circulo completo</p>
              </div>
            </div>

            {/* Worked example */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Ejemplo: θ = 60°, r = 6 m
              </h4>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-3 bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="w-7 h-7 bg-teal-500 rounded flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div className="flex-1">
                    <span>Fraccion: </span>
                    <span className="font-bold text-teal-700 dark:text-teal-400">60/360 = 1/6</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="w-7 h-7 bg-teal-500 rounded flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div className="flex-1">
                    <span>Area total: </span>
                    <span className="font-bold text-teal-700 dark:text-teal-400">π × 6² = 36π ≈ 113.1 m²</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="w-7 h-7 bg-teal-500 rounded flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div className="flex-1">
                    <span>Area sector: </span>
                    <span className="font-bold text-teal-700 dark:text-teal-400">(1/6) × 113.1 ≈ 18.85 m²</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'arco' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Formula card */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
              <h3 className="font-bold text-purple-800 dark:text-purple-200 text-lg mb-4 text-center">
                Longitud del Arco
              </h3>

              {/* Visual */}
              <div className="flex justify-center mb-4">
                <svg viewBox="0 0 140 140" className="w-36 h-36">
                  <circle cx="70" cy="70" r="55" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                  <path d={arcPath(70, 70, 55, 0, 90)} fill="none" stroke="#7c3aed" strokeWidth="5" strokeLinecap="round" />
                  <line x1="70" y1="70" x2="70" y2="15" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,2" />
                  <line x1="70" y1="70" x2="125" y2="70" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,2" />
                  <circle cx="70" cy="70" r="3" fill="#7c3aed" />
                  {/* Angle arc indicator near center */}
                  <path d={arcPath(70, 70, 18, 0, 90)} fill="none" stroke="#f59e0b" strokeWidth="2" />
                  {/* Labels */}
                  <text x="98" y="65" fontSize="12" fontWeight="bold" fill="#dc2626">r</text>
                  <text x={70 + 28 * Math.cos((-45) * Math.PI / 180)} y={70 + 28 * Math.sin((-45) * Math.PI / 180)} fontSize="11" fontWeight="bold" fill="#f59e0b">θ</text>
                  <text x="90" y="25" fontSize="10" fontWeight="bold" fill="#7c3aed">L</text>
                </svg>
              </div>

              {/* Formula */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center mb-4">
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                  L = (θ / 360°) × 2πr
                </p>
              </div>

              {/* Explanation */}
              <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <p><strong>θ</strong> = angulo central (en grados)</p>
                <p><strong>r</strong> = radio del circulo</p>
                <p><strong>θ/360°</strong> = fraccion del circulo que representa el arco</p>
                <p><strong>2πr</strong> = circunferencia completa</p>
              </div>
            </div>

            {/* Worked example */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Ejemplo: θ = 90°, r = 10 m
              </h4>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-3 bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="w-7 h-7 bg-purple-500 rounded flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div className="flex-1">
                    <span>Fraccion: </span>
                    <span className="font-bold text-purple-700 dark:text-purple-400">90/360 = 1/4</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="w-7 h-7 bg-purple-500 rounded flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div className="flex-1">
                    <span>Circunferencia: </span>
                    <span className="font-bold text-purple-700 dark:text-purple-400">2π × 10 = 20π ≈ 62.83 m</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="w-7 h-7 bg-purple-500 rounded flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div className="flex-1">
                    <span>Longitud arco: </span>
                    <span className="font-bold text-purple-700 dark:text-purple-400">(1/4) × 62.83 ≈ 15.71 m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Tip 1 */}
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-5 border border-amber-200 dark:border-amber-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                    Usa las mismas unidades
                  </h4>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    Si el radio esta en metros, el resultado estara en metros cuadrados (area) o metros (longitud).
                    Convierte si es necesario antes de calcular.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 2 */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                    El angulo debe estar en grados
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Estas formulas usan θ en grados. Si te dan el angulo en radianes,
                    multiplica por 180/π para convertirlo.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 3 */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">
                    Simplifica la fraccion primero
                  </h4>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Por ejemplo: 90/360 = 1/4. Simplificar antes hace los calculos mas faciles.
                    Fracciones comunes: 30° = 1/12, 45° = 1/8, 60° = 1/6, 90° = 1/4, 120° = 1/3, 180° = 1/2.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 4 */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">
                    Verifica con el circulo completo
                  </h4>
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    Si θ = 360°, deberias obtener el area o circunferencia completa.
                    ¡Usa esto para verificar que tu formula es correcta!
                  </p>
                </div>
              </div>
            </div>

            {/* Quick reference */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
                Referencia Rapida
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-teal-100 dark:bg-teal-900/40 rounded-lg p-3 text-center">
                  <p className="text-teal-800 dark:text-teal-200 font-bold">Area Sector</p>
                  <p className="text-teal-700 dark:text-teal-300 text-lg font-mono">
                    (θ/360°) × πr²
                  </p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/40 rounded-lg p-3 text-center">
                  <p className="text-purple-800 dark:text-purple-200 font-bold">Longitud Arco</p>
                  <p className="text-purple-700 dark:text-purple-300 text-lg font-mono">
                    (θ/360°) × 2πr
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Practicar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
