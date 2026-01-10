'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { MathText } from '@/components/math/MathDisplay';

type Phase = 'intro' | 'multiply' | 'divide' | 'power-of-power' | 'pattern';
type DeductionStep = 0 | 1 | 2 | 3;

const TYPE_COLORS = {
  multiply: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-600', border: 'border-blue-300 dark:border-blue-700', gradient: 'from-blue-500 to-indigo-500' },
  divide: { bg: 'bg-purple-100 dark:bg-purple-900/50', text: 'text-purple-600', border: 'border-purple-300 dark:border-purple-700', gradient: 'from-purple-500 to-pink-500' },
  'power-of-power': { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-600', border: 'border-green-300 dark:border-green-700', gradient: 'from-green-500 to-teal-500' },
};

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [deductionStep, setDeductionStep] = useState<DeductionStep>(0);
  const [completedProperties, setCompletedProperties] = useState<string[]>([]);

  const handleNextDeductionStep = () => {
    if (deductionStep < 3) {
      setDeductionStep((prev) => (prev + 1) as DeductionStep);
    }
  };

  const handleCompleteProperty = (property: string, nextPhase: Phase) => {
    if (!completedProperties.includes(property)) {
      setCompletedProperties([...completedProperties, property]);
    }
    setDeductionStep(0);
    setPhase(nextPhase);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre las Propiedades
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Vamos a deducir cada propiedad paso a paso
        </p>
      </div>

      {/* Progress indicators */}
      {phase !== 'intro' && phase !== 'pattern' && (
        <div className="flex justify-center gap-4">
          {['multiply', 'divide', 'power-of-power'].map((prop) => (
            <div
              key={prop}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                completedProperties.includes(prop)
                  ? 'bg-green-500 text-white'
                  : phase === prop
                  ? TYPE_COLORS[prop as keyof typeof TYPE_COLORS].bg + ' ' + TYPE_COLORS[prop as keyof typeof TYPE_COLORS].text
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              )}
            >
              {completedProperties.includes(prop) ? <Check size={18} /> : prop === 'multiply' ? '×' : prop === 'divide' ? '÷' : '^'}
            </div>
          ))}
        </div>
      )}

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Ya viste cómo funciona la <strong>multiplicación de potencias</strong>. Ahora vamos a descubrir las otras dos propiedades usando el mismo método: <strong>expandir y contar</strong>.
            </p>

            {/* Three properties preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2 text-center">Multiplicación</p>
                <div className="text-center text-blue-600"><MathText content="$a^m \\times a^n = ?$" /></div>
                <p className="text-xs text-green-600 text-center mt-2">✓ Ya lo vimos</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                <p className="font-semibold text-purple-700 dark:text-purple-300 mb-2 text-center">División</p>
                <div className="text-center text-purple-600"><MathText content="$a^m \\div a^n = ?$" /></div>
                <p className="text-xs text-gray-500 text-center mt-2">Por descubrir</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <p className="font-semibold text-green-700 dark:text-green-300 mb-2 text-center">Potencia de Potencia</p>
                <div className="text-center text-green-600"><MathText content="$(a^m)^n = ?$" /></div>
                <p className="text-xs text-gray-500 text-center mt-2">Por descubrir</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('divide')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Descubrir la División</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* DIVISIÓN - Deducción paso a paso */}
      {phase === 'divide' && (
        <div className="space-y-6 animate-fadeIn">
          <div className={cn('rounded-2xl p-6 border', TYPE_COLORS.divide.bg, TYPE_COLORS.divide.border)}>
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4 text-center">
              Propiedad 2: Cociente de Potencias
            </h3>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-6">
              {/* Problema inicial */}
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-2">¿Cómo simplificamos?</p>
                <div className="text-3xl font-bold text-purple-600">
                  <MathText content="$2^5 \\div 2^3$" />
                </div>
              </div>

              {/* Paso 1: Expandir */}
              {deductionStep >= 1 && (
                <div className="animate-fadeIn bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">Paso 1: Expandimos cada potencia</p>
                  <div className="text-center">
                    <div className="text-lg">
                      <MathText content="$\\textcolor{purple}{2^5} \\div \\textcolor{violet}{2^3}$" />
                    </div>
                    <p className="text-gray-400 my-1">↓</p>
                    <div className="text-lg">
                      <MathText content="$\\textcolor{purple}{(2 \\times 2 \\times 2 \\times 2 \\times 2)} \\div \\textcolor{violet}{(2 \\times 2 \\times 2)}$" />
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 2: Escribir como fracción y simplificar */}
              {deductionStep >= 2 && (
                <div className="animate-fadeIn bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">Paso 2: Simplificamos (cancelamos los factores comunes)</p>
                  <div className="text-center">
                    <div className="inline-block">
                      <div className="border-b-2 border-purple-400 pb-1">
                        <span className="line-through text-gray-400">2 × 2 × 2</span> × <span className="text-purple-600 font-bold">2 × 2</span>
                      </div>
                      <div className="pt-1">
                        <span className="line-through text-gray-400">2 × 2 × 2</span>
                      </div>
                    </div>
                    <p className="text-gray-400 my-2">↓ Cancelamos 3 doses arriba y abajo</p>
                    <div className="text-xl text-purple-600 font-bold">
                      <MathText content="$= 2 \\times 2 = 2^2$" />
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 3: La regla */}
              {deductionStep >= 3 && (
                <div className="animate-fadeIn bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">Paso 3: Descubrimos el patrón</p>
                  <div className="text-center space-y-3">
                    <div className="text-lg">
                      <MathText content="$2^5 \\div 2^3 = 2^{5-3} = \\textcolor{green}{2^2}$" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4">
                      <p className="text-gray-600 dark:text-gray-400 mb-2">La fórmula general:</p>
                      <div className="text-2xl font-bold text-purple-600">
                        <MathText content="$a^m \\div a^n = a^{m-n}$" />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Al dividir potencias con la misma base, <strong>resta los exponentes</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Botón para avanzar */}
              <div className="flex justify-center">
                {deductionStep < 3 ? (
                  <button
                    onClick={handleNextDeductionStep}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                  >
                    <span>Siguiente paso</span>
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleCompleteProperty('divide', 'power-of-power')}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all shadow-lg"
                  >
                    <span>Siguiente propiedad</span>
                    <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>¿Por qué restamos?</strong> Porque al dividir, estamos &quot;quitando&quot; factores del numerador. Si tenemos 5 doses arriba y 3 abajo, quedan 5 - 3 = 2 doses.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* POTENCIA DE POTENCIA - Deducción paso a paso */}
      {phase === 'power-of-power' && (
        <div className="space-y-6 animate-fadeIn">
          <div className={cn('rounded-2xl p-6 border', TYPE_COLORS['power-of-power'].bg, TYPE_COLORS['power-of-power'].border)}>
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4 text-center">
              Propiedad 3: Potencia de una Potencia
            </h3>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-6">
              {/* Problema inicial */}
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-2">¿Cómo simplificamos?</p>
                <div className="text-3xl font-bold text-green-600">
                  <MathText content="$(2^3)^2$" />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  &quot;Dos al cubo, todo elevado al cuadrado&quot;
                </p>
              </div>

              {/* Paso 1: ¿Qué significa elevar al cuadrado? */}
              {deductionStep >= 1 && (
                <div className="animate-fadeIn bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">Paso 1: ¿Qué significa elevar al cuadrado?</p>
                  <div className="text-center">
                    <div className="text-lg">
                      <MathText content="$(\\textcolor{green}{2^3})^2 = \\textcolor{green}{2^3} \\times \\textcolor{green}{2^3}$" />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Elevar al cuadrado = multiplicar por sí mismo
                    </p>
                  </div>
                </div>
              )}

              {/* Paso 2: Aplicar la propiedad del producto */}
              {deductionStep >= 2 && (
                <div className="animate-fadeIn bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">Paso 2: Aplicamos la propiedad del producto</p>
                  <div className="text-center">
                    <div className="text-lg">
                      <MathText content="$\\textcolor{green}{2^3} \\times \\textcolor{green}{2^3}$" />
                    </div>
                    <p className="text-gray-400 my-1">↓ misma base, sumamos exponentes</p>
                    <div className="text-lg">
                      <MathText content="$= 2^{3+3} = \\textcolor{green}{2^6}$" />
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 3: La regla */}
              {deductionStep >= 3 && (
                <div className="animate-fadeIn bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">Paso 3: Descubrimos el patrón</p>
                  <div className="text-center space-y-3">
                    <div className="text-lg">
                      <MathText content="$(2^3)^2 = 2^{3 \\times 2} = \\textcolor{green}{2^6}$" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Nota: 3 + 3 = 6, pero también 3 × 2 = 6
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4">
                      <p className="text-gray-600 dark:text-gray-400 mb-2">La fórmula general:</p>
                      <div className="text-2xl font-bold text-green-600">
                        <MathText content="$(a^m)^n = a^{m \\times n}$" />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Al elevar una potencia a otro exponente, <strong>multiplica los exponentes</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Botón para avanzar */}
              <div className="flex justify-center">
                {deductionStep < 3 ? (
                  <button
                    onClick={handleNextDeductionStep}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all shadow-lg"
                  >
                    <span>Siguiente paso</span>
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleCompleteProperty('power-of-power', 'pattern')}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                  >
                    <span>Ver resumen</span>
                    <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>¿Por qué multiplicamos?</strong> Porque <MathText content="$(a^m)^n$" /> significa repetir <MathText content="$a^m$" /> <em>n veces</em>. Al usar la propiedad del producto, sumamos m+m+...+m (n veces) = m×n.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* RESUMEN FINAL */}
      {phase === 'pattern' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
              Las Tres Propiedades de las Potencias
            </h3>

            {/* Key properties */}
            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-800 dark:text-blue-200">Producto de potencias</p>
                    <div className="text-lg text-blue-600 my-2"><MathText content="$a^m \\times a^n = a^{m+n}$" /></div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Suma exponentes (juntamos los factores)
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-800 dark:text-purple-200">Cociente de potencias</p>
                    <div className="text-lg text-purple-600 my-2"><MathText content="$a^m \\div a^n = a^{m-n}$" /></div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Resta exponentes (cancelamos factores)
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div className="flex-1">
                    <p className="font-semibold text-green-800 dark:text-green-200">Potencia de una potencia</p>
                    <div className="text-lg text-green-600 my-2"><MathText content="$(a^m)^n = a^{m \\times n}$" /></div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Multiplica exponentes (repetimos la multiplicación)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How they connect */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">¿Cómo se relacionan?</h4>
              <div className="text-center text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <p>La <strong className="text-purple-600">división</strong> es lo opuesto de la <strong className="text-blue-600">multiplicación</strong> → por eso restamos en vez de sumar.</p>
                <p>La <strong className="text-green-600">potencia de potencia</strong> es una multiplicación repetida → por eso multiplicamos los exponentes.</p>
              </div>
            </div>
          </div>

          {/* Important note */}
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
            <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Recuerda:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Estas propiedades <strong>solo funcionan con la misma base</strong>.
              No puedes simplificar <MathText content="$2^3 \\times 3^2$" /> porque las bases son diferentes.
            </p>
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
      )}
    </div>
  );
}
