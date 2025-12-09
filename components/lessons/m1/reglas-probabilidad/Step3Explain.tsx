'use client';

import { useState } from 'react';
import { ArrowRight, RefreshCw, Plus, Minus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { VennDiagram } from '@/components/lessons/shared';

type Phase = 'complement' | 'addition_exclusive' | 'addition_general' | 'summary';

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('complement');
  const [currentCard, setCurrentCard] = useState(0);

  if (!isActive) return null;

  const phases: Phase[] = ['complement', 'addition_exclusive', 'addition_general', 'summary'];
  const currentIndex = phases.indexOf(phase);

  const goToNextPhase = () => {
    if (currentIndex < phases.length - 1) {
      setPhase(phases[currentIndex + 1]);
    }
  };

  // ============ PHASE 1: COMPLEMENT ============
  if (phase === 'complement') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Las Reglas de Probabilidad
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Regla 1 de 3: El Complemento
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

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
          {/* Icon and title */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center">
              <RefreshCw size={24} />
            </div>
            <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200">
              Evento Complementario
            </h3>
          </div>

          {/* Visual */}
          <div className="flex justify-center mb-4">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Background circle - NOT A */}
                <circle cx="50" cy="50" r="45" fill="#F97316" opacity="0.3" />
                {/* Event A */}
                <circle cx="50" cy="50" r="30" fill="#22C55E" opacity="0.7" />
                {/* Labels */}
                <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="fill-white font-bold text-sm">A</text>
                <text x="85" y="20" textAnchor="middle" className="fill-orange-600 dark:fill-orange-400 font-bold text-xs">A&apos;</text>
              </svg>
            </div>
          </div>

          {/* Formula */}
          <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 mb-4">
            <div className="text-2xl font-bold text-center text-amber-900 dark:text-amber-100">
              P(A&apos;) = 1 - P(A)
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-2 text-amber-800 dark:text-amber-200">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <span>A&apos; (se lee &ldquo;A complemento&rdquo;) incluye <strong>todo lo que NO es A</strong></span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <span>El evento y su complemento siempre <strong>suman 1</strong></span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
              <span>Útil cuando es más fácil calcular lo que <strong>NO</strong> quieres</span>
            </p>
          </div>

          {/* Example */}
          <div className="mt-4 bg-amber-100 dark:bg-amber-900/50 rounded-lg p-3">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Ejemplo:</strong> Si P(lluvia) = 0.3, entonces P(no lluvia) = 1 - 0.3 = <strong>0.7</strong>
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={goToNextPhase}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>Siguiente regla</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: ADDITION EXCLUSIVE ============
  if (phase === 'addition_exclusive') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Las Reglas de Probabilidad
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Regla 2 de 3: Suma para Eventos Excluyentes
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

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          {/* Icon and title */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <Plus size={24} />
            </div>
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
              Regla Aditiva (Excluyentes)
            </h3>
          </div>

          {/* Visual - Venn diagram */}
          <div className="flex justify-center mb-4">
            <VennDiagram
              mode="exclusive"
              labelA="A"
              labelB="B"
              size="md"
              animated={true}
            />
          </div>

          <p className="text-center text-sm text-blue-600 dark:text-blue-400 mb-4">
            Los círculos NO se tocan = eventos que NO pueden ocurrir juntos
          </p>

          {/* Formula */}
          <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 mb-4">
            <div className="text-2xl font-bold text-center text-blue-900 dark:text-blue-100">
              P(A ∪ B) = P(A) + P(B)
            </div>
            <p className="text-center text-sm text-blue-600 dark:text-blue-400 mt-1">
              ∪ significa &ldquo;unión&rdquo; o &ldquo;O&rdquo;
            </p>
          </div>

          {/* Explanation */}
          <div className="space-y-2 text-blue-800 dark:text-blue-200">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
              <span>Eventos <strong>mutuamente excluyentes</strong> no pueden ocurrir al mismo tiempo</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
              <span>Como no hay superposición, simplemente <strong>sumamos</strong></span>
            </p>
          </div>

          {/* Example */}
          <div className="mt-4 bg-blue-100 dark:bg-blue-900/50 rounded-lg p-3">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Ejemplo:</strong> Dado - P(sacar 1 O sacar 6) = 1/6 + 1/6 = <strong>2/6 = 1/3</strong>
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={goToNextPhase}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
          >
            <span>Siguiente regla</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: ADDITION GENERAL ============
  if (phase === 'addition_general') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Las Reglas de Probabilidad
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Regla 3 de 3: Suma para Eventos NO Excluyentes
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
              <Minus size={24} />
            </div>
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
              Regla Aditiva (General)
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

          <p className="text-center text-sm text-purple-600 dark:text-purple-400 mb-4">
            Los círculos SE superponen = hay elementos en común
          </p>

          {/* Formula */}
          <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 mb-4">
            <div className="text-xl font-bold text-center text-purple-900 dark:text-purple-100">
              P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
            </div>
            <p className="text-center text-sm text-purple-600 dark:text-purple-400 mt-1">
              ∩ significa &ldquo;intersección&rdquo; o &ldquo;Y&rdquo;
            </p>
          </div>

          {/* Warning */}
          <div className="bg-amber-100 dark:bg-amber-900/50 rounded-lg p-3 mb-4 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>¡Importante!</strong> Restamos la intersección para NO contar dos veces lo que está en ambos conjuntos.
            </p>
          </div>

          {/* Explanation */}
          <div className="space-y-2 text-purple-800 dark:text-purple-200">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-purple-600" />
              <span>Esta fórmula <strong>siempre funciona</strong> (incluso para eventos excluyentes)</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-purple-600" />
              <span>Si los eventos son excluyentes, P(A ∩ B) = 0</span>
            </p>
          </div>

          {/* Example */}
          <div className="mt-4 bg-purple-100 dark:bg-purple-900/50 rounded-lg p-3">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              <strong>Ejemplo:</strong> Cartas - P(Rey O Corazón) = 4/52 + 13/52 - 1/52 = <strong>16/52</strong>
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={goToNextPhase}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
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
        {/* Complement */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 rounded-xl p-4 border border-amber-300 dark:border-amber-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-6 h-6 text-amber-600" />
              <span className="font-semibold text-amber-800 dark:text-amber-200">Complemento</span>
            </div>
            <code className="text-lg font-bold text-amber-900 dark:text-amber-100 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded">
              P(A&apos;) = 1 - P(A)
            </code>
          </div>
        </div>

        {/* Addition - Exclusive */}
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-xl p-4 border border-blue-300 dark:border-blue-700">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <Plus className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-blue-800 dark:text-blue-200">Suma (excluyentes)</span>
            </div>
            <code className="text-lg font-bold text-blue-900 dark:text-blue-100 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded">
              P(A∪B) = P(A) + P(B)
            </code>
          </div>
        </div>

        {/* Addition - General */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-xl p-4 border border-purple-300 dark:border-purple-700">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <Minus className="w-6 h-6 text-purple-600" />
              <span className="font-semibold text-purple-800 dark:text-purple-200">Suma (general)</span>
            </div>
            <code className="text-base font-bold text-purple-900 dark:text-purple-100 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded">
              P(A∪B) = P(A) + P(B) - P(A∩B)
            </code>
          </div>
        </div>
      </div>

      {/* Quick decision guide */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-5 border border-green-200 dark:border-green-700">
        <h3 className="font-bold text-green-800 dark:text-green-200 mb-3 text-center">
          ¿Cómo elegir la fórmula correcta?
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-600">1.</span>
            <span className="text-green-700 dark:text-green-300">
              ¿Buscas P(NO ocurre A)? → Usa <strong>Complemento</strong>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">2.</span>
            <span className="text-green-700 dark:text-green-300">
              ¿Buscas P(A O B)? → Pregúntate: ¿Pueden ocurrir juntos?
            </span>
          </div>
          <div className="ml-6 space-y-1 text-green-600 dark:text-green-400">
            <p>• NO pueden → <strong>Suma simple</strong></p>
            <p>• SÍ pueden → <strong>Resta la intersección</strong></p>
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
