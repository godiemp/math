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

const OPTIONS = ['x³ + 8', 'x³ + 6x² + 12x + 8', 'x³ + 2x² + 4x + 8', '3x³ + 6'];
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
          El Cubo Mágico
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Don Pedro necesita calcular el volumen de una caja cúbica expandida...
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          <ScenarioCard variant="cool">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Don Pedro es un carpintero que fabrica <strong className="text-blue-600">cajas cúbicas</strong> de almacenamiento.
              Su caja estándar tiene un lado de <strong className="text-purple-600">x metros</strong>.
            </p>

            <div className="flex flex-col items-center gap-4 mb-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Caja original:
              </p>

              <div className="relative">
                <svg viewBox="0 0 200 200" className="w-40 h-40">
                  <polygon
                    points="60,40 140,40 140,120 60,120"
                    fill="#bfdbfe"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    className="dark:fill-blue-800 dark:stroke-blue-600"
                  />
                  <polygon
                    points="60,40 60,120 100,160 100,80"
                    fill="#93c5fd"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    className="dark:fill-blue-700 dark:stroke-blue-600"
                  />
                  <polygon
                    points="60,40 100,80 180,80 140,40"
                    fill="#dbeafe"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    className="dark:fill-blue-900 dark:stroke-blue-600"
                  />
                  <polygon
                    points="140,40 180,80 180,160 140,120"
                    fill="#bfdbfe"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    className="dark:fill-blue-800 dark:stroke-blue-600"
                  />
                  <polygon
                    points="100,80 180,80 180,160 100,160"
                    fill="#93c5fd"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    className="dark:fill-blue-700 dark:stroke-blue-600"
                  />
                  <polygon
                    points="60,120 100,160 180,160 140,120"
                    fill="#60a5fa"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    className="dark:fill-blue-600 dark:stroke-blue-500"
                  />
                  <text x="100" y="30" textAnchor="middle" className="text-sm font-bold" fill="#7c3aed">x</text>
                  <text x="45" y="85" textAnchor="middle" className="text-sm font-bold" fill="#7c3aed">x</text>
                  <text x="165" y="55" textAnchor="middle" className="text-sm font-bold" fill="#7c3aed">x</text>
                </svg>
              </div>

              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 mt-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  Un cliente quiere una caja más grande: cada lado debe aumentar en <strong className="text-purple-600">2 metros</strong>.
                </p>
              </div>

              <div className="relative mt-4">
                <svg viewBox="0 0 240 240" className="w-48 h-48">
                  <polygon
                    points="50,30 150,30 150,130 50,130"
                    fill="#e9d5ff"
                    stroke="#a855f7"
                    strokeWidth="2"
                    className="dark:fill-purple-800 dark:stroke-purple-600"
                  />
                  <polygon
                    points="50,30 50,130 100,180 100,80"
                    fill="#d8b4fe"
                    stroke="#a855f7"
                    strokeWidth="2"
                    className="dark:fill-purple-700 dark:stroke-purple-600"
                  />
                  <polygon
                    points="50,30 100,80 200,80 150,30"
                    fill="#f3e8ff"
                    stroke="#a855f7"
                    strokeWidth="2"
                    className="dark:fill-purple-900 dark:stroke-purple-600"
                  />
                  <polygon
                    points="150,30 200,80 200,180 150,130"
                    fill="#e9d5ff"
                    stroke="#a855f7"
                    strokeWidth="2"
                    className="dark:fill-purple-800 dark:stroke-purple-600"
                  />
                  <polygon
                    points="100,80 200,80 200,180 100,180"
                    fill="#d8b4fe"
                    stroke="#a855f7"
                    strokeWidth="2"
                    className="dark:fill-purple-700 dark:stroke-purple-600"
                  />
                  <polygon
                    points="50,130 100,180 200,180 150,130"
                    fill="#a855f7"
                    stroke="#9333ea"
                    strokeWidth="2"
                    className="dark:fill-purple-600 dark:stroke-purple-500"
                  />
                  <text x="100" y="20" textAnchor="middle" className="text-sm font-bold" fill="#7c3aed">x + 2</text>
                  <text x="30" y="85" textAnchor="middle" className="text-sm font-bold" fill="#7c3aed">x + 2</text>
                  <text x="185" y="50" textAnchor="middle" className="text-sm font-bold" fill="#7c3aed">x + 2</text>
                </svg>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Nueva caja: lado = <span className="font-mono text-purple-600">(x + 2)</span>
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              ¿Cuál es el <strong>volumen</strong> de la nueva caja?
            </p>
          </ScenarioCard>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('question')} icon={<ArrowRight size={20} />}>
              Calcular el volumen
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          <QuestionPrompt variant="math">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              La nueva caja tiene lado <span className="font-mono text-purple-600">(x + 2)</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              El volumen de un cubo es lado × lado × lado = <span className="font-mono">(x + 2)³</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              ¿Cuál expresión representa el volumen?
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
              explanation={isCorrect ? '¡Exacto! Veamos cómo funciona...' : '¡Casi! Veamos cómo funciona...'}
            />
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Explanation with volume breakdown */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              Descomponiendo el Cubo:
            </h3>

            {/* Volume breakdown visualization */}
            <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                <div className="text-center space-y-3">
                  <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                    (<span className="text-blue-600">x</span> + <span className="text-purple-600">2</span>)³
                  </p>
                  <p className="text-gray-400 text-sm">↓ separamos</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    = (<span className="text-blue-600">x</span> + <span className="text-purple-600">2</span>)(<span className="text-blue-600">x</span> + <span className="text-purple-600">2</span>) · (<span className="text-blue-600">x</span> + <span className="text-purple-600">2</span>)
                  </p>
                  <p className="text-gray-400 text-sm">↓ primero resolvemos (x+2)²</p>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    = (<span className="text-teal-600">x² + 4x + 4</span>) · (<span className="text-blue-600">x</span> + <span className="text-purple-600">2</span>)
                  </p>
                  <p className="text-gray-400 text-sm">↓ multiplicamos cada término</p>
                  <p className="font-mono text-xs text-gray-500 dark:text-gray-500">
                    = x³ + 2x² + 4x² + 8x + 4x + 8
                  </p>
                  <p className="text-gray-400 text-sm">↓ simplificamos</p>
                  <p className="font-mono text-xl text-green-600 font-bold">
                    x³ + 6x² + 12x + 8
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-center">
              <p className="text-gray-700 dark:text-gray-300">
                El volumen tiene <strong>4 términos</strong> con un patrón especial:
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <span className="bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-lg font-mono text-blue-700 dark:text-blue-300">x³</span>
                <span className="bg-teal-100 dark:bg-teal-900/50 px-3 py-1 rounded-lg font-mono text-teal-700 dark:text-teal-300">6x²</span>
                <span className="bg-teal-100 dark:bg-teal-900/50 px-3 py-1 rounded-lg font-mono text-teal-700 dark:text-teal-300">12x</span>
                <span className="bg-purple-100 dark:bg-purple-900/50 px-3 py-1 rounded-lg font-mono text-purple-700 dark:text-purple-300">8</span>
              </div>
            </div>
          </div>

          {/* Bridge to cubo de binomio */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  ¡Este es el Cubo de un Binomio!
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                    <p className="font-mono text-lg">
                      (<span className="text-blue-600">a</span> + <span className="text-purple-600">b</span>)³ = <span className="text-blue-600">a³</span> + 3<span className="text-blue-600">a²</span><span className="text-purple-600">b</span> + 3<span className="text-blue-600">a</span><span className="text-purple-600">b²</span> + <span className="text-purple-600">b³</span>
                    </p>
                    <p className="text-gray-400 my-2">Los coeficientes son: 1 - 3 - 3 - 1</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                    <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                      <strong>Error común:</strong> pensar que (x + 2)³ = x³ + 8
                      <br />
                      <span className="text-red-600">¡No olvides los términos del medio!</span>
                    </p>
                  </div>
                  <p className="text-sm mt-2 bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg text-center">
                    El cubo de un binomio es solo <strong>UNO de los productos notables con cubos</strong>. ¡Descubramos el patrón completo!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} variant="secondary" icon={<ArrowRight size={20} />}>
              Descubrir el patrón
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
