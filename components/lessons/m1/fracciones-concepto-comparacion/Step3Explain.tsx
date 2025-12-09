'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'numberline' | 'benchmark' | 'density';

// Simple number line with fraction markers
function FractionNumberLine({
  fractions,
  showLabels = true,
  animate = false,
}: {
  fractions: { value: number; label: string; color: string }[];
  showLabels?: boolean;
  animate?: boolean;
}) {
  const [visible, setVisible] = useState(!animate);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <div className="relative py-8">
      {/* Number line */}
      <div className="relative h-2 bg-gray-300 dark:bg-gray-600 rounded-full">
        {/* 0 and 1 markers */}
        <div className="absolute left-0 -top-6 text-sm font-bold text-gray-700 dark:text-gray-300">0</div>
        <div className="absolute right-0 -top-6 text-sm font-bold text-gray-700 dark:text-gray-300">1</div>

        {/* Fraction markers */}
        {fractions.map((fraction, index) => (
          <div
            key={fraction.label}
            className={cn(
              'absolute -translate-x-1/2 transition-all duration-500',
              visible ? 'opacity-100' : 'opacity-0'
            )}
            style={{
              left: `${fraction.value * 100}%`,
              transitionDelay: animate ? `${index * 200}ms` : '0ms',
            }}
          >
            {/* Marker dot */}
            <div
              className={cn(
                'w-4 h-4 rounded-full -mt-1 border-2 border-white dark:border-gray-800 shadow-md',
                fraction.color
              )}
            />
            {/* Label */}
            {showLabels && (
              <div
                className={cn(
                  'absolute -bottom-8 left-1/2 -translate-x-1/2 font-bold text-sm whitespace-nowrap',
                  fraction.color.replace('bg-', 'text-')
                )}
              >
                {fraction.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (phase === 'numberline') {
      const timer = setTimeout(() => setShowAnimation(true), 100);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Una Fracción = Un Número
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Una idea importante que cambiar tu forma de ver las fracciones
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
            <div className="space-y-4">
              <p className="text-lg text-gray-800 dark:text-gray-200">
                Muchas personas piensan que una fracción como{' '}
                <span className="font-bold text-blue-600 dark:text-blue-400">3/4</span>{' '}
                son <strong>dos números separados</strong>: un 3 y un 4.
              </p>
              <p className="text-lg text-gray-800 dark:text-gray-200">
                Pero en realidad, <span className="font-bold text-blue-600 dark:text-blue-400">3/4</span>{' '}
                es <strong className="text-purple-600 dark:text-purple-400">UN SOLO número</strong>,
                igual que el 1, el 2 o el 5.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
          <p className="text-purple-800 dark:text-purple-200 text-center">
            Las fracciones son números que <strong>viven entre los enteros</strong>.
            <br />
            Llenan los &ldquo;huecos&rdquo; entre 0 y 1, entre 1 y 2, y así sucesivamente.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('numberline')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ver la recta numérica</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: NUMBER LINE ============
  if (phase === 'numberline') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Fracciones en la Recta Numérica
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Cada fracción tiene su lugar exacto
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
            Mira cómo las fracciones ocupan posiciones entre 0 y 1:
          </p>

          <FractionNumberLine
            animate={showAnimation}
            fractions={[
              { value: 0.25, label: '1/4', color: 'bg-green-500' },
              { value: 0.5, label: '1/2', color: 'bg-blue-500' },
              { value: 0.75, label: '3/4', color: 'bg-purple-500' },
            ]}
          />

          <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <span className="font-bold text-green-600 dark:text-green-400">1/4</span>
              <p className="text-gray-600 dark:text-gray-400">Un cuarto del camino</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <span className="font-bold text-blue-600 dark:text-blue-400">1/2</span>
              <p className="text-gray-600 dark:text-gray-400">Justo a la mitad</p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <span className="font-bold text-purple-600 dark:text-purple-400">3/4</span>
              <p className="text-gray-600 dark:text-gray-400">Tres cuartos del camino</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('benchmark')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: BENCHMARK ============
  if (phase === 'benchmark') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Punto de Referencia: 1/2
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            La mitad es tu mejor amigo para comparar fracciones
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 space-y-4">
          <p className="text-center text-gray-700 dark:text-gray-300">
            <span className="font-bold text-blue-600 dark:text-blue-400">1/2</span> es un{' '}
            <strong>punto de referencia</strong> muy útil.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <FractionNumberLine
              fractions={[
                { value: 0.5, label: '1/2', color: 'bg-blue-500' },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-xl border border-red-200 dark:border-red-700">
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Menor que 1/2</h4>
              <div className="space-y-1 text-gray-700 dark:text-gray-300">
                <p><span className="font-bold text-green-600">1/4</span> - un cuarto</p>
                <p><span className="font-bold text-green-600">1/3</span> - un tercio</p>
                <p><span className="font-bold text-green-600">2/5</span> - dos quintos</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-700">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Mayor que 1/2</h4>
              <div className="space-y-1 text-gray-700 dark:text-gray-300">
                <p><span className="font-bold text-purple-600">3/4</span> - tres cuartos</p>
                <p><span className="font-bold text-purple-600">2/3</span> - dos tercios</p>
                <p><span className="font-bold text-purple-600">4/5</span> - cuatro quintos</p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-purple-700 dark:text-purple-300">
            <strong>Truco:</strong> Si el numerador es más de la mitad del denominador, la fracción es mayor que 1/2.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('density')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: DENSITY ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Fracciones Infinitas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Un dato fascinante sobre los números
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 space-y-4">
        <p className="text-center text-lg text-gray-800 dark:text-gray-200">
          Entre <strong>cualquier</strong> par de fracciones,
          siempre puedes encontrar <strong>otra fracción</strong>.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <FractionNumberLine
            fractions={[
              { value: 0.25, label: '1/4', color: 'bg-green-500' },
              { value: 0.375, label: '3/8', color: 'bg-amber-500' },
              { value: 0.5, label: '1/2', color: 'bg-blue-500' },
            ]}
          />
        </div>

        <p className="text-center text-gray-700 dark:text-gray-300">
          Entre <span className="font-bold text-green-600">1/4</span> y{' '}
          <span className="font-bold text-blue-600">1/2</span> está{' '}
          <span className="font-bold text-amber-600">3/8</span>...
          <br />
          ¡Y entre esas hay más, y más, y más!
        </p>

        <div className="bg-purple-100 dark:bg-purple-900/50 rounded-lg p-4 text-center">
          <p className="text-purple-800 dark:text-purple-200 font-medium">
            Hay <strong>infinitas</strong> fracciones entre 0 y 1.
            <br />
            <span className="text-sm">Las fracciones llenan todos los &ldquo;huecos&rdquo; de la recta numérica.</span>
          </p>
        </div>
      </div>

      {/* Key takeaways */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
        <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">Ideas clave:</h4>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">1.</span>
            Una fracción es <strong>un solo número</strong>, no dos.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">2.</span>
            Cada fracción tiene un <strong>lugar exacto</strong> en la recta numérica.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">3.</span>
            <strong>1/2</strong> es un punto de referencia útil para comparar.
          </li>
        </ul>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
