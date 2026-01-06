'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Search, Calculator, CheckCircle2, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'identify' | 'choose' | 'calculate' | 'verify' | 'tips';

const PHASES: { id: Phase; title: string; icon: React.ReactNode }[] = [
  { id: 'identify', title: 'Identificar', icon: <Search className="w-5 h-5" /> },
  { id: 'choose', title: 'Elegir', icon: <Lightbulb className="w-5 h-5" /> },
  { id: 'calculate', title: 'Calcular', icon: <Calculator className="w-5 h-5" /> },
  { id: 'verify', title: 'Verificar', icon: <CheckCircle2 className="w-5 h-5" /> },
  { id: 'tips', title: 'Tips', icon: <Lightbulb className="w-5 h-5" /> },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('identify');

  const currentIndex = PHASES.findIndex((p) => p.id === phase);
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < PHASES.length - 1;
  const isLastPhase = currentIndex === PHASES.length - 1;

  const goBack = () => {
    if (canGoBack) {
      setPhase(PHASES[currentIndex - 1].id);
    }
  };

  const goForward = () => {
    if (canGoForward) {
      setPhase(PHASES[currentIndex + 1].id);
    }
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Estrategia de Resolución
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          4 pasos para resolver cualquier problema
        </p>
      </div>

      {/* Phase Navigation */}
      <div className="flex justify-center gap-2 overflow-x-auto pb-2">
        {PHASES.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setPhase(p.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
              phase === p.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {p.icon}
            <span className="hidden sm:inline">{p.title}</span>
            <span className="sm:hidden">{i + 1}</span>
          </button>
        ))}
      </div>

      {/* Phase Content */}
      <div className="min-h-[320px]">
        {/* Phase 1: Identify */}
        {phase === 'identify' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                  Identificar los datos
                </h3>
              </div>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                Lee el problema con cuidado y extrae la información importante.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 mb-3 italic">
                  &quot;Juan tiene $15.000 y quiere comprar 3 cuadernos de $2.500 cada uno&quot;
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-gray-600 dark:text-gray-400">Dato 1:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">$15.000 (dinero inicial)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-gray-600 dark:text-gray-400">Dato 2:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">3 cuadernos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-gray-600 dark:text-gray-400">Dato 3:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">$2.500 cada uno</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="text-gray-600 dark:text-gray-400">Pregunta:</span>
                    <span className="font-medium text-amber-700 dark:text-amber-300">¿Cuánto le sobra?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Choose */}
        {phase === 'choose' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h3 className="text-lg font-bold text-purple-800 dark:text-purple-200">
                  Elegir las operaciones
                </h3>
              </div>
              <p className="text-purple-700 dark:text-purple-300 mb-4">
                Decide qué operaciones necesitas según las palabras clave.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border border-green-200 dark:border-green-700">
                <p className="font-semibold text-green-800 dark:text-green-200 mb-2">Suma (+)</p>
                <p className="text-xs text-green-700 dark:text-green-300">
                  &quot;total&quot;, &quot;juntos&quot;, &quot;en total&quot;, &quot;agregar&quot;, &quot;aumentar&quot;
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4 border border-red-200 dark:border-red-700">
                <p className="font-semibold text-red-800 dark:text-red-200 mb-2">Resta (-)</p>
                <p className="text-xs text-red-700 dark:text-red-300">
                  &quot;sobra&quot;, &quot;diferencia&quot;, &quot;quedan&quot;, &quot;menos&quot;, &quot;vuelto&quot;
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Multiplicación (×)</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  &quot;cada uno&quot;, &quot;por&quot;, &quot;veces&quot;, &quot;doble&quot;, &quot;triple&quot;
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
                <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2">División (÷)</p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  &quot;repartir&quot;, &quot;dividir&quot;, &quot;cada uno&quot;, &quot;por partes&quot;
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">En nuestro ejemplo:</p>
              <p className="text-gray-800 dark:text-gray-200">
                <span className="font-medium">&quot;3 cuadernos de $2.500 cada uno&quot;</span> → <span className="text-blue-600 dark:text-blue-400 font-bold">Multiplicación</span>
              </p>
              <p className="text-gray-800 dark:text-gray-200">
                <span className="font-medium">&quot;¿Cuánto le sobra?&quot;</span> → <span className="text-red-600 dark:text-red-400 font-bold">Resta</span>
              </p>
            </div>
          </div>
        )}

        {/* Phase 3: Calculate */}
        {phase === 'calculate' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h3 className="text-lg font-bold text-green-800 dark:text-green-200">
                  Calcular paso a paso
                </h3>
              </div>
              <p className="text-green-700 dark:text-green-300 mb-4">
                Realiza las operaciones en orden lógico.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm flex-shrink-0">
                    a
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Primero: Costo total de cuadernos</p>
                    <p className="font-mono text-lg text-gray-800 dark:text-gray-200">
                      3 × $2.500 = <span className="text-blue-600 dark:text-blue-400 font-bold">$7.500</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-sm flex-shrink-0">
                    b
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Luego: Lo que le sobra</p>
                    <p className="font-mono text-lg text-gray-800 dark:text-gray-200">
                      $15.000 - $7.500 = <span className="text-green-600 dark:text-green-400 font-bold">$7.500</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <strong>Consejo:</strong> Escribe cada paso por separado. Es más fácil encontrar errores y verificar el resultado.
              </p>
            </div>
          </div>
        )}

        {/* Phase 4: Verify */}
        {phase === 'verify' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-5 border border-amber-200 dark:border-amber-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200">
                  Verificar el resultado
                </h3>
              </div>
              <p className="text-amber-700 dark:text-amber-300 mb-4">
                Comprueba que tu respuesta tenga sentido.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Preguntas de verificación:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    ¿La respuesta tiene las unidades correctas? (pesos, grados, km...)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    ¿El número es razonable? (no puede sobrar más de lo que tenías)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    ¿Responde exactamente a la pregunta?
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border border-green-200 dark:border-green-700">
              <p className="text-green-800 dark:text-green-200 text-sm">
                <strong>En nuestro ejemplo:</strong> $7.500 es menos que $15.000 ✓ y es dinero ✓. ¡La respuesta tiene sentido!
              </p>
            </div>
          </div>
        )}

        {/* Phase 5: Tips */}
        {phase === 'tips' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-5 border border-indigo-200 dark:border-indigo-700">
              <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-200 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Tips para problemas cotidianos
              </h3>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">💰 Problemas de dinero</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Siempre verifica: vuelto = dinero inicial - gasto total
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">🌡️ Problemas de temperatura</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Recuerda: bajo cero son números negativos. Una diferencia siempre es positiva.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">🍳 Problemas de recetas</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Usa regla de tres: si 4 personas → X ingrediente, entonces N personas → ?
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">🚗 Problemas de distancia/tiempo</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Fórmula clave: <span className="font-mono font-semibold">tiempo = distancia ÷ velocidad</span>
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 mt-2 text-sm">
                    <p className="text-gray-700 dark:text-gray-300 mb-1 italic">&quot;Un auto viaja a 60 km/h. ¿Cuánto tarda en recorrer 150 km?&quot;</p>
                    <p className="font-mono text-blue-600 dark:text-blue-400">tiempo = 150 ÷ 60 = 2,5 horas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={goBack}
          disabled={!canGoBack}
          className={cn(
            'flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all',
            canGoBack
              ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
          )}
        >
          <ChevronLeft size={20} />
          <span>Anterior</span>
        </button>

        {isLastPhase ? (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-md"
          >
            <span>Continuar</span>
            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={goForward}
            className="flex items-center gap-1 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg font-medium transition-all"
          >
            <span>Siguiente</span>
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
