'use client';

import { ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { useStep1Phase } from '@/hooks/lessons';
import {
  ScenarioCard,
  QuestionPrompt,
  OptionGrid,
  OptionButton,
  ActionButton,
  FeedbackPanel,
} from '@/components/lessons/primitives';

const OPTIONS = ['2x² + 7x + 3', '(2x + 1)(x + 3)', '(2x + 3)(x + 1)', '(x + 1)(x + 3)'];
const CORRECT_ANSWER = 1;

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const { phase, setPhase, selectedAnswer, showFeedback, isCorrect, select, check } = useStep1Phase({
    phases: ['scenario', 'question', 'result'],
    correctAnswer: CORRECT_ANSWER,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Bodega de Muebles
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Carlos tiene un desafío con las dimensiones de su bodega...
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="warm">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Carlos diseña una bodega rectangular para su tienda de muebles. El
              <strong className="text-green-600"> área total</strong> debe ser{' '}
              <strong className="text-blue-600">2x² + 7x + 3</strong> metros cuadrados. Pero hay algo
              especial: ¡el largo es <strong>el doble</strong> de ancho más algo!
            </p>

            <div className="flex flex-col items-center gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-4">
                  Área de la bodega:
                </p>
                <div className="flex justify-center items-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📦</div>
                    <span className="font-mono text-lg text-blue-600 font-bold">2x² + 7x + 3</span>
                    <p className="text-xs text-gray-500">metros²</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-100 dark:bg-purple-900/50 rounded-xl p-4 max-w-md">
                <p className="text-purple-800 dark:text-purple-200 text-center text-sm">
                  <strong>Observa:</strong> El coeficiente de x² es <strong>2</strong>, no 1.
                  <br />
                  Esto cambia cómo encontramos las dimensiones.
                </p>
              </div>

              <div className="text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>

              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  ¿Cómo expresamos el área como producto de dos factores?
                  <br />
                  <strong>Área = largo × ancho</strong>
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              ¿Cuáles son las dimensiones de la bodega?
            </p>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Encontrar las dimensiones
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt variant="math">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Área: <span className="font-mono text-blue-600">2x² + 7x + 3</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              El área es igual a <strong>largo × ancho</strong>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              ¿Cómo podemos factorizar este trinomio donde a ≠ 1?
            </p>
          </QuestionPrompt>

          <OptionGrid>
            {OPTIONS.map((option, index) => (
              <OptionButton
                key={index}
                label={option}
                index={index}
                isSelected={selectedAnswer === index}
                isCorrect={index === CORRECT_ANSWER}
                showFeedback={showFeedback}
                onClick={() => select(index)}
                isMono
              />
            ))}
          </OptionGrid>

          {!showFeedback && (
            <div className="flex justify-center">
              <ActionButton
                onClick={check}
                disabled={selectedAnswer === null}
                variant={selectedAnswer !== null ? 'primary' : 'disabled'}
              >
                Verificar
              </ActionButton>
            </div>
          )}

          {showFeedback && (
            <FeedbackPanel
              isCorrect={isCorrect}
              explanation={isCorrect ? '¡Exacto! Veamos el método...' : '¡Casi! Veamos el método...'}
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation with visual breakdown */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              ¡Carlos encontró las dimensiones!
            </h3>

            {/* Visual breakdown - AC Method */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-4">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600">2x² + 7x + 3</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ Método AC: a×c = 2×3 = 6</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    Buscamos números que sumen <span className="text-amber-600">7</span> y multipliquen{' '}
                    <span className="text-green-600">6</span>
                  </p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-purple-600">1 + 6 = 7</span> y{' '}
                    <span className="text-purple-600">1 × 6 = 6</span>
                  </p>
                  <p className="text-gray-400 text-sm">↓ Reescribimos el término medio</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    2x² + <span className="text-purple-600">1x</span> + <span className="text-purple-600">6x</span> + 3
                  </p>
                  <p className="text-gray-400 text-sm">↓ Agrupamos y factorizamos</p>
                  <p className="font-mono text-2xl text-green-600 font-bold">(2x + 1)(x + 3)</p>
                </div>
              </div>
            </div>

            {/* Warehouse visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center mb-6">
                La bodega de Carlos tiene dimensiones:
              </p>
              <div className="flex justify-center">
                <div className="relative pt-4 pb-12 pl-16 pr-4">
                  {/* Rectangle representing warehouse */}
                  <div className="w-56 h-36 bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-800 dark:to-orange-700 rounded-lg border-2 border-amber-500 flex items-center justify-center shadow-md">
                    <div className="text-center">
                      <p className="text-xs text-amber-700 dark:text-amber-300 mb-1">Área</p>
                      <span className="font-mono text-xl text-amber-800 dark:text-amber-200 font-bold">
                        2x² + 7x + 3
                      </span>
                    </div>
                  </div>

                  {/* Width dimension line (bottom) */}
                  <div className="absolute -bottom-2 left-16 right-4 flex flex-col items-center">
                    <svg className="w-full h-6" viewBox="0 0 224 24">
                      {/* Left arrow */}
                      <path d="M 0 12 L 8 6 L 8 18 Z" fill="currentColor" className="text-blue-600" />
                      {/* Right arrow */}
                      <path d="M 224 12 L 216 6 L 216 18 Z" fill="currentColor" className="text-blue-600" />
                      {/* Line */}
                      <line x1="8" y1="12" x2="216" y2="12" stroke="currentColor" strokeWidth="2" className="text-blue-600" />
                    </svg>
                    <span className="font-mono text-blue-600 font-bold text-lg bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-blue-200 dark:border-blue-700 -mt-1">
                      x + 3
                    </span>
                  </div>

                  {/* Height dimension line (left) */}
                  <div className="absolute top-4 -left-2 bottom-12 flex items-center">
                    <div className="flex flex-col items-center h-36">
                      <svg className="h-full w-6" viewBox="0 0 24 144">
                        {/* Top arrow */}
                        <path d="M 12 0 L 6 8 L 18 8 Z" fill="currentColor" className="text-blue-600" />
                        {/* Bottom arrow */}
                        <path d="M 12 144 L 6 136 L 18 136 Z" fill="currentColor" className="text-blue-600" />
                        {/* Line */}
                        <line x1="12" y1="8" x2="12" y2="136" stroke="currentColor" strokeWidth="2" className="text-blue-600" />
                      </svg>
                    </div>
                    <span className="font-mono text-blue-600 font-bold text-lg bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-blue-200 dark:border-blue-700 -ml-14 whitespace-nowrap">
                      2x + 1
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bridge to advanced trinomial factoring */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  Trinomios ax² + bx + c (a ≠ 1)
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                    <p className="text-sm mb-2">Cuando el coeficiente de x² no es 1, usamos el <strong>Método AC</strong>:</p>
                    <p className="font-mono text-lg">
                      <span className="text-red-600 font-bold">a</span>x² +{' '}
                      <span className="text-amber-600 font-bold">b</span>x +{' '}
                      <span className="text-green-600 font-bold">c</span>
                    </p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                    <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                      <strong>Paso clave:</strong> Buscar dos números que sumen <strong>b</strong>
                      <br />
                      y multipliquen <strong>a × c</strong> (no solo c)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} variant="secondary" icon={<ArrowRight size={20} />}>
              Descubrir el método
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
