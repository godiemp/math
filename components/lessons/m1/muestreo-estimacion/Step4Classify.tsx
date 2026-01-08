'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, ThumbsUp, ThumbsDown, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { SAMPLE_SCENARIOS, SampleScenario } from './data';

type Phase = 'intro' | 'classify' | 'summary';

interface ClassificationResult {
  scenarioId: string;
  userAnswer: boolean;
  isCorrect: boolean;
}

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<ClassificationResult[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!isActive) return null;

  // Use first 4 scenarios for the exercise
  const scenarios = SAMPLE_SCENARIOS.slice(0, 4);
  const currentScenario = scenarios[currentIndex];

  const handleClassify = (userSaysBiased: boolean) => {
    const isCorrect = userSaysBiased === currentScenario.isBiased;

    setResults((prev) => [
      ...prev,
      {
        scenarioId: currentScenario.id,
        userAnswer: userSaysBiased,
        isCorrect,
      },
    ]);

    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setPhase('summary');
    }
  };

  const correctCount = results.filter((r) => r.isCorrect).length;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300 font-medium">
              Detector de Sesgos
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Muestra Buena o Sesgada?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Aprende a identificar muestras que podrían dar resultados engañosos
          </p>
        </div>

        {/* Context */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Escenario:</strong> Un investigador quiere saber qué marca de celular prefieren
            los estudiantes del colegio. Tiene varias opciones para seleccionar su muestra.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Tu tarea: Identificar cuáles métodos de muestreo son <strong>buenos</strong> (dan
            resultados representativos) y cuáles son <strong>sesgados</strong> (pueden dar
            resultados engañosos).
          </p>
        </div>

        {/* Definition reminder */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800 dark:text-green-200">Muestra Buena</span>
            </div>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Todos tienen igual probabilidad de ser seleccionados. Representa bien a la población.
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-700">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsDown className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-red-800 dark:text-red-200">Muestra Sesgada</span>
            </div>
            <p className="text-red-700 dark:text-red-300 text-sm">
              Algunos grupos están sobre o subrepresentados. Puede dar resultados engañosos.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('classify')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Comenzar a clasificar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: CLASSIFY ============
  if (phase === 'classify') {
    const lastResult = results[results.length - 1];

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
            <span className="text-indigo-700 dark:text-indigo-300 font-medium">
              Escenario {currentIndex + 1} de {scenarios.length}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Este método de muestreo es bueno o sesgado?
          </h2>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {scenarios.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-full transition-colors',
                i < currentIndex
                  ? results[i]?.isCorrect
                    ? 'bg-green-500'
                    : 'bg-red-500'
                  : i === currentIndex
                  ? 'bg-indigo-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>

        {/* Scenario card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScenario.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
          >
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-400 mb-3">
                Método: {currentScenario.method}
              </span>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                &quot;{currentScenario.description}&quot;
              </p>
            </div>

            {/* Classification buttons or feedback */}
            {!showFeedback ? (
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => handleClassify(false)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl font-semibold hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors border-2 border-green-300 dark:border-green-700"
                >
                  <ThumbsUp size={20} />
                  <span>Muestra Buena</span>
                </button>
                <button
                  onClick={() => handleClassify(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl font-semibold hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors border-2 border-red-300 dark:border-red-700"
                >
                  <ThumbsDown size={20} />
                  <span>Muestra Sesgada</span>
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <div
                  className={cn(
                    'rounded-lg p-4 mb-4',
                    lastResult?.isCorrect
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700'
                      : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700'
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {lastResult?.isCorrect ? (
                      <>
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800 dark:text-green-200">
                          ¡Correcto!
                        </span>
                      </>
                    ) : (
                      <>
                        <X className="w-5 h-5 text-amber-600" />
                        <span className="font-semibold text-amber-800 dark:text-amber-200">
                          No exactamente
                        </span>
                      </>
                    )}
                  </div>
                  <p
                    className={cn(
                      'text-sm',
                      lastResult?.isCorrect
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-amber-700 dark:text-amber-300'
                    )}
                  >
                    {currentScenario.explanation}
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all"
                  >
                    <span>
                      {currentIndex < scenarios.length - 1 ? 'Siguiente' : 'Ver resultados'}
                    </span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ============ PHASE 3: SUMMARY ============
  const percentage = Math.round((correctCount / scenarios.length) * 100);

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4',
            correctCount >= 3
              ? 'bg-green-100 dark:bg-green-900/30'
              : 'bg-amber-100 dark:bg-amber-900/30'
          )}
        >
          {correctCount >= 3 ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <Smartphone className="w-5 h-5 text-amber-600" />
          )}
          <span
            className={cn(
              'font-medium',
              correctCount >= 3
                ? 'text-green-700 dark:text-green-300'
                : 'text-amber-700 dark:text-amber-300'
            )}
          >
            {correctCount >= 3 ? '¡Buen trabajo!' : 'Sigue practicando'}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Resultados de Clasificación
        </h2>
      </div>

      {/* Score */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md text-center">
        <div className="text-5xl font-bold text-indigo-600 mb-2">
          {correctCount}/{scenarios.length}
        </div>
        <p className="text-gray-600 dark:text-gray-400">correctas ({percentage}%)</p>
      </div>

      {/* Results breakdown */}
      <div className="space-y-3">
        {scenarios.map((scenario, i) => {
          const result = results[i];
          return (
            <div
              key={scenario.id}
              className={cn(
                'rounded-lg p-4 border',
                result?.isCorrect
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0',
                    result?.isCorrect ? 'bg-green-500' : 'bg-red-500'
                  )}
                >
                  {result?.isCorrect ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <X className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                    {scenario.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Respuesta correcta:{' '}
                    <span className={scenario.isBiased ? 'text-red-600' : 'text-green-600'}>
                      {scenario.isBiased ? 'Sesgada' : 'Buena'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key takeaway */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <p className="text-blue-800 dark:text-blue-200 text-sm text-center">
          <strong>Recuerda:</strong> Una muestra aleatoria donde todos tienen igual probabilidad de
          ser seleccionados es la clave para obtener estimaciones confiables.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>Continuar a práctica</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
