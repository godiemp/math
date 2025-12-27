'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import GaltonBoard from './GaltonBoard';

type Phase = 'intro' | 'challenge1' | 'challenge2' | 'challenge3' | 'discovery';

interface Challenge {
  balls: number;
  title: string;
  instruction: string;
  discovery: string;
}

const CHALLENGES: Record<string, Challenge> = {
  challenge1: {
    balls: 1,
    title: '1 Bola',
    instruction: 'Observa como cae una sola bola. Su camino es completamente aleatorio.',
    discovery: 'El camino de cada bola es impredecible: en cada clavija, tiene 50% de ir a izquierda o derecha.',
  },
  challenge2: {
    balls: 10,
    title: '10 Bolas',
    instruction: 'Ahora suelta 10 bolas. ¿Empiezas a ver algun patron?',
    discovery: '¡Interesante! Con pocas bolas, la distribucion es irregular. Aun hay mucha variacion.',
  },
  challenge3: {
    balls: 100,
    title: '100 Bolas',
    instruction: 'Finalmente, 100 bolas. ¿Que forma toma la distribucion?',
    discovery: '¡Increible! Aparece una forma de CAMPANA. El caos individual produce un patron colectivo.',
  },
};

export default function Step2ExploreGalton({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentDistribution, setCurrentDistribution] = useState<number[]>([]);
  const [challengeComplete, setChallengeComplete] = useState({
    challenge1: false,
    challenge2: false,
    challenge3: false,
  });

  if (!isActive) return null;

  const handleChallengeComplete = (challengeKey: keyof typeof challengeComplete) => {
    setChallengeComplete((prev) => ({ ...prev, [challengeKey]: true }));
  };

  const getCurrentChallenge = (): Challenge | null => {
    if (phase === 'challenge1' || phase === 'challenge2' || phase === 'challenge3') {
      return CHALLENGES[phase];
    }
    return null;
  };

  const challenge = getCurrentChallenge();

  // ============ INTRO PHASE ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Tabla de Galton
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un experimento fascinante
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <div className="text-5xl mb-2">🔬</div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              Sir Francis Galton invento este dispositivo en 1876 para demostrar
              algo sorprendente sobre el <strong>azar</strong>.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-inner">
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                ¿Como funciona?
              </h3>
              <ul className="text-left text-gray-700 dark:text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">●</span>
                  <span>Las bolas caen desde arriba</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">●</span>
                  <span>En cada clavija, rebotan a izquierda o derecha (50%-50%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">●</span>
                  <span>Se acumulan en compartimentos al fondo</span>
                </li>
              </ul>
            </div>

            <p className="text-gray-600 dark:text-gray-400">
              Vamos a experimentar con 1, 10 y 100 bolas...
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('challenge1')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Comenzar experimento</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ CHALLENGE PHASES ============
  if (challenge) {
    const isComplete = challengeComplete[phase as keyof typeof challengeComplete];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Tabla de Galton
          </h2>
          <div className="flex justify-center gap-2 mt-2">
            {['challenge1', 'challenge2', 'challenge3'].map((c, i) => (
              <div
                key={c}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  c === phase
                    ? 'bg-blue-500 text-white scale-110'
                    : challengeComplete[c as keyof typeof challengeComplete]
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                )}
              >
                {challengeComplete[c as keyof typeof challengeComplete] ? (
                  <Check size={16} />
                ) : (
                  i + 1
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Challenge instruction */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-1">
            Experimento: {challenge.title}
          </h3>
          <p className="text-blue-700 dark:text-blue-300">
            {challenge.instruction}
          </p>
        </div>

        {/* Galton Board */}
        <div className="flex justify-center">
          <GaltonBoard
            rows={10}
            ballsToRelease={challenge.balls}
            speed={challenge.balls === 100 ? 'fast' : challenge.balls === 10 ? 'normal' : 'slow'}
            onDistributionChange={setCurrentDistribution}
            onAllBallsComplete={() => handleChallengeComplete(phase as keyof typeof challengeComplete)}
            showBellCurve={phase === 'challenge3' && isComplete}
          />
        </div>

        {/* Discovery message */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-800 dark:text-green-200">
                    ¡Descubrimiento!
                  </h4>
                  <p className="text-green-700 dark:text-green-300">
                    {challenge.discovery}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          {isComplete && phase !== 'challenge3' && (
            <button
              onClick={() => {
                const nextPhase = phase === 'challenge1' ? 'challenge2' : 'challenge3';
                setPhase(nextPhase);
              }}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Siguiente experimento</span>
              <ArrowRight size={20} />
            </button>
          )}

          {isComplete && phase === 'challenge3' && (
            <button
              onClick={() => setPhase('discovery')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all shadow-lg"
            >
              <span>Ver conclusion</span>
              <Sparkles size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ DISCOVERY PHASE ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Secreto del Azar
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Lo que descubrio Galton
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-4xl">🎲</div>
            <ArrowRight className="text-gray-400" size={24} />
            <div className="text-4xl">📊</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400 font-bold">
                1
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">
                  Caos Individual
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Cada bola sigue un camino completamente aleatorio e impredecible.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
                2
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">
                  Patron Colectivo
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Pero con muchas bolas, aparece una forma predecible: la campana.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                3
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">
                  La Distribucion Normal
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Esta forma de &ldquo;campana&rdquo; aparece en todo: estaturas, calificaciones, errores de medicion...
                </p>
              </div>
            </div>
          </div>

          <div className="text-center py-4">
            <p className="text-lg font-semibold text-purple-800 dark:text-purple-200">
              &ldquo;El orden emerge del caos cuando hay suficientes eventos.&rdquo;
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              — El principio fundamental de la estadistica
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <p className="text-blue-800 dark:text-blue-200 text-center">
          Ahora que viste el patron, vamos a entender la <strong>teoria</strong> detras:
          la <strong>frecuencia relativa</strong> y la <strong>Ley de los Grandes Numeros</strong>.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Continuar a la teoria</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
