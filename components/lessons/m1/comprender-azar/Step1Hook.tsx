'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'question' | 'result';

// Roulette wheel visualization
const RouletteResult = ({ color, index }: { color: 'red' | 'black'; index: number }) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay: index * 0.15, type: 'spring', stiffness: 200 }}
    className={cn(
      'w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md',
      color === 'red' ? 'bg-red-500' : 'bg-gray-800 dark:bg-gray-600'
    )}
  >
    {color === 'red' ? 'R' : 'N'}
  </motion.div>
);

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showingResult, setShowingResult] = useState(false);

  // Correct answer: B (Exactamente 50%)
  const correctAnswer = 1;

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Racha del Jugador
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Un misterio en el casino...
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-amber-50 dark:from-red-900/30 dark:to-amber-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Estas en un casino observando una mesa de <strong>ruleta</strong>.
            </p>

            <div className="text-6xl my-4">🎰</div>

            <p className="text-lg text-gray-800 dark:text-gray-200">
              Los ultimos <strong>7 giros</strong> han caido en <strong className="text-red-600 dark:text-red-400">ROJO</strong>:
            </p>

            {/* Animated roulette results */}
            <div className="flex justify-center gap-2 py-4 flex-wrap">
              {Array.from({ length: 7 }).map((_, i) => (
                <RouletteResult key={i} color="red" index={i} />
              ))}
            </div>

            <div className="bg-amber-100 dark:bg-amber-900/40 rounded-lg p-4 border-2 border-amber-300 dark:border-amber-600">
              <p className="text-amber-800 dark:text-amber-200 font-semibold text-lg">
                Tu amigo te dice: &ldquo;¡Apuesta al <strong>NEGRO</strong>!
                <br />
                ¡Ya le toca! Despues de 7 rojos, es casi seguro que salga negro.&rdquo;
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              ¿Tiene razon tu amigo? 🤔
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-amber-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-amber-600 transition-all shadow-lg"
          >
            <span>Vamos a pensarlo</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: QUESTION ============
  if (phase === 'question') {
    const handleSubmit = () => {
      if (selectedAnswer === null) return;
      setShowingResult(true);
      setTimeout(() => {
        setPhase('result');
      }, 1500);
    };

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Racha del Jugador
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El proximo giro...
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <p className="text-blue-800 dark:text-blue-200">
              Despues de 7 rojos seguidos, <strong>¿cual es la probabilidad de que el PROXIMO giro sea rojo?</strong>
            </p>
          </div>
        </div>

        {/* Visual representation */}
        <div className="flex justify-center items-center gap-2 py-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold shadow"
            >
              R
            </div>
          ))}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 text-lg font-bold shadow-lg border-2 border-dashed border-gray-400"
          >
            ?
          </motion.div>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Menos del 50% (negro ya "le toca")', value: 0 },
            { label: 'Exactamente 50%', value: 1 },
            { label: 'Mas del 50% (el rojo esta "caliente")', value: 2 },
            { label: 'Depende de los giros anteriores', value: 3 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAnswer(option.value)}
              disabled={showingResult}
              className={cn(
                'p-4 rounded-xl font-medium transition-all border-2 text-left',
                selectedAnswer === option.value
                  ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                  : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
              )}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-bold mr-2">
                {String.fromCharCode(65 + option.value)}
              </span>
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null || showingResult}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null && !showingResult
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            {showingResult ? 'Verificando...' : 'Verificar'}
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: RESULT ============
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Racha del Jugador
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¡La verdad sobre el azar!
        </p>
      </div>

      {/* Answer feedback */}
      <div
        className={cn(
          'p-5 rounded-xl border-2',
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
            : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
        )}
      >
        <div className="flex items-start gap-4">
          {isCorrect ? (
            <Check className="w-7 h-7 text-green-600 flex-shrink-0" />
          ) : (
            <X className="w-7 h-7 text-amber-600 flex-shrink-0" />
          )}
          <div>
            <h3 className={cn(
              'font-bold text-lg mb-1',
              isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {isCorrect ? '¡Correcto!' : '¡Casi!'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              La probabilidad es <strong>exactamente 50%</strong>. La ruleta no tiene memoria.
            </p>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 text-lg">
          La Falacia del Jugador
        </h4>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Cada giro es independiente.</strong> La ruleta no &ldquo;recuerda&rdquo; los giros anteriores.
          </p>
          <p>
            Que hayan salido 7 rojos seguidos <strong>no cambia</strong> la probabilidad del proximo giro.
          </p>
          <div className="flex items-center justify-center gap-4 py-3">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-500 mx-auto flex items-center justify-center text-white font-bold shadow-lg">
                R
              </div>
              <span className="text-sm mt-1 block">50%</span>
            </div>
            <div className="text-2xl font-bold text-gray-400">=</div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gray-800 dark:bg-gray-600 mx-auto flex items-center justify-center text-white font-bold shadow-lg">
                N
              </div>
              <span className="text-sm mt-1 block">50%</span>
            </div>
          </div>
          <p className="text-sm text-purple-600 dark:text-purple-400">
            Pero hay algo fascinante: aunque cada evento es aleatorio, cuando hacemos <strong>muchos intentos</strong>,
            surgen patrones predecibles. ¡Vamos a descubrirlo!
          </p>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <p className="text-blue-800 dark:text-blue-200 text-center font-medium">
          En esta leccion descubriras como el <strong>caos individual</strong>
          {' '}produce <strong>patrones colectivos</strong>.
        </p>
      </div>

      {/* Continue button */}
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
