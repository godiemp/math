'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'definition' | 'method-listing' | 'method-factorization' | 'formula' | 'misconceptions';

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('definition');

  if (!isActive) return null;

  const phases: Phase[] = ['definition', 'method-listing', 'method-factorization', 'formula', 'misconceptions'];
  const currentIndex = phases.indexOf(phase);

  const goNext = () => {
    if (currentIndex < phases.length - 1) {
      setPhase(phases[currentIndex + 1]);
    } else {
      onComplete();
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setPhase(phases[currentIndex - 1]);
    }
  };

  // ============ PHASE 1: DEFINITION ============
  if (phase === 'definition') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Los Métodos del M.C.M.
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Qué significa M.C.M.?
          </p>
        </div>

        {/* Definition breakdown */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <h3 className="text-center text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Mínimo Común Múltiplo
          </h3>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-blue-100 dark:bg-blue-900/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">M</div>
              <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Mínimo</div>
              <div className="text-xs text-blue-600 dark:text-blue-300 mt-1">El más pequeño</div>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">C</div>
              <div className="text-sm font-medium text-purple-800 dark:text-purple-200">Común</div>
              <div className="text-xs text-purple-600 dark:text-purple-300 mt-1">Compartido</div>
            </div>

            <div className="bg-green-100 dark:bg-green-900/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">M</div>
              <div className="text-sm font-medium text-green-800 dark:text-green-200">Múltiplo</div>
              <div className="text-xs text-green-600 dark:text-green-300 mt-1">n × 1, 2, 3...</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              El M.C.M. es el <strong>número más pequeño</strong> que es múltiplo de todos los números dados.
            </p>
          </div>
        </div>

        {/* Contrast with MCD */}
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-5 border border-amber-200 dark:border-amber-700">
          <h4 className="font-bold text-amber-800 dark:text-amber-200 text-center mb-3">
            M.C.M. vs M.C.D.
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <p className="font-bold text-cyan-700 dark:text-cyan-400 mb-1">M.C.M.</p>
              <p className="text-gray-600 dark:text-gray-400">El MENOR número que es MÚLTIPLO de todos</p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">Busca hacia ARRIBA</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">M.C.D.</p>
              <p className="text-gray-600 dark:text-gray-400">El MAYOR número que DIVIDE a todos</p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">Busca hacia ABAJO</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={goNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>Método 1: Listar múltiplos</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: METHOD - LISTING ============
  if (phase === 'method-listing') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Los Métodos del M.C.M.
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Método 1: Listar múltiplos
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-4">Pasos:</h4>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <p className="text-gray-700 dark:text-gray-300">Lista los primeros múltiplos del primer número</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <p className="text-gray-700 dark:text-gray-300">Lista los primeros múltiplos del segundo número</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <p className="text-gray-700 dark:text-gray-300">Encuentra los múltiplos comunes</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">4</span>
              <p className="text-gray-700 dark:text-gray-300">Elige el <strong>menor</strong> de los comunes</p>
            </div>
          </div>
        </div>

        {/* Worked example */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 text-center mb-4">
            Ejemplo: M.C.M.(4, 6)
          </h4>

          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Paso 1: Múltiplos de 4</p>
              <p className="font-bold text-blue-700 dark:text-blue-300">4, 8, <span className="text-yellow-600">12</span>, 16, 20, <span className="text-yellow-600">24</span>...</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Paso 2: Múltiplos de 6</p>
              <p className="font-bold text-green-700 dark:text-green-300">6, <span className="text-yellow-600">12</span>, 18, <span className="text-yellow-600">24</span>, 30...</p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Paso 3: Múltiplos comunes</p>
              <p className="font-bold text-yellow-700 dark:text-yellow-300">12, 24, 36...</p>
            </div>

            <div className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/50 dark:to-blue-900/50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Paso 4: El menor</p>
              <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">M.C.M.(4, 6) = 12</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            <ArrowLeft size={18} />
            <span>Atrás</span>
          </button>
          <button
            onClick={goNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>Método 2: Factorización</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: METHOD - PRIME FACTORIZATION ============
  if (phase === 'method-factorization') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Los Métodos del M.C.M.
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Método 2: Factorización prima
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-4">
            Para números grandes, este método es más rápido:
          </h4>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <p className="text-gray-700 dark:text-gray-300">Descomponer cada número en factores primos</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <p className="text-gray-700 dark:text-gray-300">Tomar <strong>todos</strong> los factores primos que aparecen</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <p className="text-gray-700 dark:text-gray-300">Usar el <strong>mayor exponente</strong> de cada factor</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">4</span>
              <p className="text-gray-700 dark:text-gray-300">Multiplicar</p>
            </div>
          </div>
        </div>

        {/* Worked example */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 text-center mb-4">
            Ejemplo: M.C.M.(12, 18)
          </h4>

          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Descomponer 12</p>
                <p className="font-bold text-blue-700 dark:text-blue-300">12 = 2² × 3</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Descomponer 18</p>
                <p className="font-bold text-green-700 dark:text-green-300">18 = 2 × 3²</p>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Factores que aparecen: 2 y 3</p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Mayor exponente de 2</p>
                  <p className="font-bold text-purple-700 dark:text-purple-300">2² (de 12)</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Mayor exponente de 3</p>
                  <p className="font-bold text-purple-700 dark:text-purple-300">3² (de 18)</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Multiplicar</p>
              <p className="text-lg font-bold text-purple-700 dark:text-purple-300">M.C.M. = 2² × 3² = 4 × 9 = <span className="text-2xl">36</span></p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            <ArrowLeft size={18} />
            <span>Atrás</span>
          </button>
          <button
            onClick={goNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>La fórmula dorada</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: FORMULA ============
  if (phase === 'formula') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Los Métodos del M.C.M.
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            La fórmula dorada: M.C.M. y M.C.D.
          </p>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-xl p-6 border-2 border-yellow-400">
          <h4 className="font-bold text-yellow-800 dark:text-yellow-200 text-center text-lg mb-4">
            La Fórmula Dorada
          </h4>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center mb-4">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              M.C.M.(a, b) × M.C.D.(a, b) = a × b
            </p>
          </div>

          <p className="text-yellow-800 dark:text-yellow-200 text-center">
            Si conoces el M.C.D., puedes encontrar el M.C.M. fácilmente:
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center mt-3">
            <p className="text-xl font-bold text-amber-700 dark:text-amber-300">
              M.C.M.(a, b) = (a × b) ÷ M.C.D.(a, b)
            </p>
          </div>
        </div>

        {/* Example */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 text-center mb-4">
            Ejemplo: M.C.M.(12, 18) usando M.C.D.
          </h4>

          <div className="space-y-3 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              Sabemos que <strong className="text-amber-600">M.C.D.(12, 18) = 6</strong>
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Aplicando la fórmula:</p>
              <p className="font-bold text-amber-700 dark:text-amber-300 text-lg">
                M.C.M.(12, 18) = (12 × 18) ÷ 6 = 216 ÷ 6 = <span className="text-2xl">36</span>
              </p>
            </div>

            <p className="text-green-600 dark:text-green-400 font-medium">
              <Check className="inline w-5 h-5 mr-1" />
              ¡El mismo resultado que con factorización!
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            <ArrowLeft size={18} />
            <span>Atrás</span>
          </button>
          <button
            onClick={goNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>Errores comunes</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 5: MISCONCEPTIONS ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Los Métodos del M.C.M.
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Errores comunes a evitar
        </p>
      </div>

      <div className="space-y-4">
        {/* Misconception 1 */}
        <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-5 border border-red-200 dark:border-red-700">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">
                Error 1: Confundir M.C.M. con M.C.D.
              </h4>
              <div className="space-y-2 text-sm">
                <p className="text-red-700 dark:text-red-300 line-through">
                  "El M.C.M. de 12 y 18 es 6"
                </p>
                <p className="text-green-700 dark:text-green-300">
                  <Check className="inline w-4 h-4 mr-1" />
                  6 es el M.C.D. El M.C.M. es 36.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  <strong>Recuerda:</strong> M.C.M. siempre es ≥ el número más grande.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Misconception 2 */}
        <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-5 border border-red-200 dark:border-red-700">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">
                Error 2: Olvidar los exponentes máximos
              </h4>
              <div className="space-y-2 text-sm">
                <p className="text-red-700 dark:text-red-300 line-through">
                  "M.C.M.(12, 18) = 2 × 3 = 6"
                </p>
                <p className="text-green-700 dark:text-green-300">
                  <Check className="inline w-4 h-4 mr-1" />
                  Usar exponentes MÁXIMOS: 2² × 3² = 36
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Misconception 3 */}
        <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-5 border border-red-200 dark:border-red-700">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">
                Error 3: Pensar que M.C.M. siempre es el producto
              </h4>
              <div className="space-y-2 text-sm">
                <p className="text-red-700 dark:text-red-300 line-through">
                  "M.C.M.(4, 6) = 4 × 6 = 24"
                </p>
                <p className="text-green-700 dark:text-green-300">
                  <Check className="inline w-4 h-4 mr-1" />
                  M.C.M.(4, 6) = 12. Solo es el producto cuando son coprimos.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Ejemplo donde sí es el producto: M.C.M.(7, 11) = 77 (7 y 11 son primos)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick check rule */}
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-700">
        <h4 className="font-bold text-green-800 dark:text-green-200 text-center mb-2">
          <Check className="inline w-5 h-5 mr-1" />
          Regla de verificación rápida
        </h4>
        <p className="text-green-700 dark:text-green-300 text-center">
          El M.C.M. siempre es <strong>mayor o igual</strong> que el número más grande.
          Si tu respuesta es menor, ¡revisa tu cálculo!
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={goBack}
          className="flex items-center gap-2 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
        >
          <ArrowLeft size={18} />
          <span>Atrás</span>
        </button>
        <button
          onClick={goNext}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Continuar a práctica</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
