'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Link2, Unlink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { VennDiagram } from '@/components/lessons/shared';

type Phase = 'conditional' | 'independence' | 'multiplication' | 'summary';

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('conditional');

  if (!isActive) return null;

  const phases: Phase[] = ['conditional', 'independence', 'multiplication', 'summary'];
  const currentIndex = phases.indexOf(phase);

  const goToNextPhase = () => {
    if (currentIndex < phases.length - 1) {
      setPhase(phases[currentIndex + 1]);
    }
  };

  // ============ PHASE 1: CONDITIONAL ============
  if (phase === 'conditional') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Probabilidad Condicional
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Concepto 1 de 3: La Fórmula
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2">
          {phases.slice(0, 3).map((p, i) => (
            <div
              key={p}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                i <= currentIndex ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          {/* Icon and title */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
              |
            </div>
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
              Probabilidad Condicional
            </h3>
          </div>

          {/* Visual - Venn diagram */}
          <div className="flex justify-center mb-4">
            <VennDiagram
              mode="overlapping"
              labelA="A"
              labelB="B"
              highlightRegion="intersection"
              size="md"
              animated={true}
            />
          </div>

          <p className="text-center text-sm text-blue-600 dark:text-blue-400 mb-4">
            Dado que B ocurrió, solo nos importa lo que está dentro de B
          </p>

          {/* Formula */}
          <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 mb-4">
            <div className="text-2xl font-bold text-center text-blue-900 dark:text-blue-100">
              P(A | B) = P(A ∩ B) / P(B)
            </div>
            <p className="text-center text-sm text-blue-600 dark:text-blue-400 mt-1">
              | significa &ldquo;dado que&rdquo; o &ldquo;sabiendo que&rdquo;
            </p>
          </div>

          {/* Explanation */}
          <div className="space-y-2 text-blue-800 dark:text-blue-200">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
              <span>La <strong>condición</strong> reduce el espacio muestral</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
              <span>Solo consideramos los casos donde <strong>B ya ocurrió</strong></span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
              <span>B se convierte en el nuevo &ldquo;universo&rdquo;</span>
            </p>
          </div>

          {/* Example */}
          <div className="mt-4 bg-blue-100 dark:bg-blue-900/50 rounded-lg p-3">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Ejemplo:</strong> Si P(lluvia) = 0.3 y P(nubes y lluvia) = 0.25, entonces:
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-200 mt-1 font-mono">
              P(lluvia | nubes) = 0.25 / P(nubes)
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={goToNextPhase}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
          >
            <span>Siguiente concepto</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: INDEPENDENCE ============
  if (phase === 'independence') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Eventos Independientes
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Concepto 2 de 3: Independencia
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2">
          {phases.slice(0, 3).map((p, i) => (
            <div
              key={p}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                i <= currentIndex ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
          {/* Icon and title */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center">
              <Unlink size={24} />
            </div>
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
              Eventos Independientes
            </h3>
          </div>

          {/* Visual comparison */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 text-center">
              <Link2 className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <p className="font-semibold text-red-700 dark:text-red-300">Dependientes</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Saber de B cambia P(A)
              </p>
              <p className="font-mono text-sm mt-2 text-red-600 dark:text-red-400">
                P(A | B) ≠ P(A)
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 text-center">
              <Unlink className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="font-semibold text-green-700 dark:text-green-300">Independientes</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Saber de B NO cambia P(A)
              </p>
              <p className="font-mono text-sm mt-2 text-green-600 dark:text-green-400">
                P(A | B) = P(A)
              </p>
            </div>
          </div>

          {/* Formula */}
          <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 mb-4">
            <p className="text-center text-sm text-purple-600 dark:text-purple-400 mb-2">
              A y B son independientes si y solo si:
            </p>
            <div className="text-xl font-bold text-center text-purple-900 dark:text-purple-100">
              P(A | B) = P(A)
            </div>
            <p className="text-center text-sm text-purple-600 dark:text-purple-400 mt-2">
              o equivalentemente: P(B | A) = P(B)
            </p>
          </div>

          {/* Explanation */}
          <div className="space-y-2 text-purple-800 dark:text-purple-200">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-purple-600" />
              <span>La ocurrencia de uno <strong>NO afecta</strong> la probabilidad del otro</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-purple-600" />
              <span>Lanzar un dado no afecta lanzar una moneda</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-purple-600" />
              <span>Sacar una carta <strong>sin reposición</strong> SÍ afecta la siguiente</span>
            </p>
          </div>

          {/* Examples */}
          <div className="mt-4 space-y-2">
            <div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-3">
              <p className="text-sm text-green-700 dark:text-green-300">
                <strong>Independientes:</strong> Lanzar una moneda y luego un dado. P(cara | 6) = P(cara) = 0.5
              </p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/50 rounded-lg p-3">
              <p className="text-sm text-red-700 dark:text-red-300">
                <strong>Dependientes:</strong> Sacar 2 cartas sin devolver. P(rey₂ | rey₁) ≠ P(rey₂)
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={goToNextPhase}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Siguiente concepto</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: MULTIPLICATION ============
  if (phase === 'multiplication') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Regla de la Multiplicación
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Concepto 3 de 3: P(A Y B)
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2">
          {phases.slice(0, 3).map((p, i) => (
            <div
              key={p}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                i <= currentIndex ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-xl p-6 border border-teal-200 dark:border-teal-700">
          {/* Icon and title */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center text-xl font-bold">
              ×
            </div>
            <h3 className="text-xl font-bold text-teal-800 dark:text-teal-200">
              Regla de la Multiplicación
            </h3>
          </div>

          {/* Two formulas */}
          <div className="space-y-4 mb-4">
            {/* General */}
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4">
              <p className="text-sm text-teal-600 dark:text-teal-400 mb-1 text-center">Fórmula General (siempre funciona):</p>
              <div className="text-xl font-bold text-center text-teal-900 dark:text-teal-100">
                P(A ∩ B) = P(B) · P(A | B)
              </div>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
                o también: P(A) · P(B | A)
              </p>
            </div>

            {/* Independent */}
            <div className="bg-green-100/70 dark:bg-green-900/30 rounded-lg p-4 border border-green-300 dark:border-green-700">
              <p className="text-sm text-green-600 dark:text-green-400 mb-1 text-center">Si A y B son independientes:</p>
              <div className="text-xl font-bold text-center text-green-800 dark:text-green-200">
                P(A ∩ B) = P(A) · P(B)
              </div>
              <p className="text-xs text-center text-green-600 dark:text-green-400 mt-1">
                ¡Simplemente multiplicamos!
              </p>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-3 mb-4 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>¡Cuidado!</strong> Solo puedes usar P(A) · P(B) si los eventos son independientes.
              Si no lo son, debes usar la fórmula general.
            </p>
          </div>

          {/* Examples */}
          <div className="space-y-2 text-teal-800 dark:text-teal-200">
            <div className="bg-teal-100 dark:bg-teal-900/50 rounded-lg p-3">
              <p className="text-sm">
                <strong>Ejemplo (independientes):</strong> P(cara Y 6) = P(cara) · P(6) = 1/2 · 1/6 = <strong>1/12</strong>
              </p>
            </div>
            <div className="bg-teal-100 dark:bg-teal-900/50 rounded-lg p-3">
              <p className="text-sm">
                <strong>Ejemplo (dependientes):</strong> P(2 ases seguidos sin reposición) = 4/52 · 3/51 = <strong>12/2652</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={goToNextPhase}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Ver resumen completo</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Resumen de Fórmulas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Tu guía rápida de referencia
        </p>
      </div>

      {/* Formula cards */}
      <div className="space-y-3">
        {/* Conditional */}
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-xl p-4 border border-blue-300 dark:border-blue-700">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl">|</span>
              <span className="font-semibold text-blue-800 dark:text-blue-200">Prob. Condicional</span>
            </div>
            <code className="text-base font-bold text-blue-900 dark:text-blue-100 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded">
              P(A|B) = P(A∩B) / P(B)
            </code>
          </div>
        </div>

        {/* Independence test */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-xl p-4 border border-purple-300 dark:border-purple-700">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <Unlink className="w-6 h-6 text-purple-600" />
              <span className="font-semibold text-purple-800 dark:text-purple-200">Independencia</span>
            </div>
            <code className="text-base font-bold text-purple-900 dark:text-purple-100 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded">
              P(A|B) = P(A)
            </code>
          </div>
        </div>

        {/* Multiplication general */}
        <div className="bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-900/40 dark:to-emerald-900/40 rounded-xl p-4 border border-teal-300 dark:border-teal-700">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-teal-600">×</span>
              <span className="font-semibold text-teal-800 dark:text-teal-200">Multiplicación (general)</span>
            </div>
            <code className="text-base font-bold text-teal-900 dark:text-teal-100 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded">
              P(A∩B) = P(B)·P(A|B)
            </code>
          </div>
        </div>

        {/* Multiplication independent */}
        <div className="bg-gradient-to-r from-green-100 to-lime-100 dark:from-green-900/40 dark:to-lime-900/40 rounded-xl p-4 border border-green-300 dark:border-green-700">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-green-600">×</span>
              <span className="font-semibold text-green-800 dark:text-green-200">Multiplicación (indep.)</span>
            </div>
            <code className="text-base font-bold text-green-900 dark:text-green-100 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded">
              P(A∩B) = P(A)·P(B)
            </code>
          </div>
        </div>
      </div>

      {/* Quick decision guide */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-5 border border-amber-200 dark:border-amber-700">
        <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-3 text-center">
          ¿Cómo elegir la fórmula correcta?
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">1.</span>
            <span className="text-amber-700 dark:text-amber-300">
              ¿Buscas P(A dado que B)? → Usa <strong>P(A|B) = P(A∩B)/P(B)</strong>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">2.</span>
            <span className="text-amber-700 dark:text-amber-300">
              ¿Buscas P(A Y B)? → Pregúntate: ¿Son independientes?
            </span>
          </div>
          <div className="ml-6 space-y-1 text-amber-600 dark:text-amber-400">
            <p>• SÍ son independientes → <strong>P(A) · P(B)</strong></p>
            <p>• NO son independientes → <strong>P(B) · P(A|B)</strong></p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>¡A practicar!</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
