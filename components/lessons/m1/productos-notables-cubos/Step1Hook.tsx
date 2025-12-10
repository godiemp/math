'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctAnswer = 1; // "x³ + 6x² + 12x + 8"

  const options = [
    'x³ + 8',
    'x³ + 6x² + 12x + 8',
    'x³ + 2x² + 4x + 8',
    '3x³ + 6',
  ];

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    setTimeout(() => {
      setPhase('result');
    }, 1500);
  };

  const isCorrect = selectedAnswer === correctAnswer;

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
          {/* Scenario */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Don Pedro es un carpintero que fabrica <strong className="text-blue-600">cajas cúbicas</strong> de almacenamiento.
              Su caja estándar tiene un lado de <strong className="text-purple-600">x metros</strong>.
            </p>

            {/* Cube visualization */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Caja original:
              </p>

              {/* Original cube - isometric view */}
              <div className="relative">
                <svg viewBox="0 0 200 200" className="w-40 h-40">
                  {/* Back face */}
                  <polygon
                    points="60,40 140,40 140,120 60,120"
                    fill="#bfdbfe"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    className="dark:fill-blue-800 dark:stroke-blue-600"
                  />
                  {/* Left face */}
                  <polygon
                    points="60,40 60,120 100,160 100,80"
                    fill="#93c5fd"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    className="dark:fill-blue-700 dark:stroke-blue-600"
                  />
                  {/* Top face */}
                  <polygon
                    points="60,40 100,80 180,80 140,40"
                    fill="#dbeafe"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    className="dark:fill-blue-900 dark:stroke-blue-600"
                  />
                  {/* Right face */}
                  <polygon
                    points="140,40 180,80 180,160 140,120"
                    fill="#bfdbfe"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    className="dark:fill-blue-800 dark:stroke-blue-600"
                  />
                  {/* Front face */}
                  <polygon
                    points="100,80 180,80 180,160 100,160"
                    fill="#93c5fd"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    className="dark:fill-blue-700 dark:stroke-blue-600"
                  />
                  {/* Bottom face (visible edge) */}
                  <polygon
                    points="60,120 100,160 180,160 140,120"
                    fill="#60a5fa"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    className="dark:fill-blue-600 dark:stroke-blue-500"
                  />
                  {/* Labels */}
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

              {/* Expanded cube preview */}
              <div className="relative mt-4">
                <svg viewBox="0 0 240 240" className="w-48 h-48">
                  {/* Larger cube with expansion highlighted */}
                  {/* Back face */}
                  <polygon
                    points="50,30 150,30 150,130 50,130"
                    fill="#e9d5ff"
                    stroke="#a855f7"
                    strokeWidth="2"
                    className="dark:fill-purple-800 dark:stroke-purple-600"
                  />
                  {/* Left face */}
                  <polygon
                    points="50,30 50,130 100,180 100,80"
                    fill="#d8b4fe"
                    stroke="#a855f7"
                    strokeWidth="2"
                    className="dark:fill-purple-700 dark:stroke-purple-600"
                  />
                  {/* Top face */}
                  <polygon
                    points="50,30 100,80 200,80 150,30"
                    fill="#f3e8ff"
                    stroke="#a855f7"
                    strokeWidth="2"
                    className="dark:fill-purple-900 dark:stroke-purple-600"
                  />
                  {/* Right face */}
                  <polygon
                    points="150,30 200,80 200,180 150,130"
                    fill="#e9d5ff"
                    stroke="#a855f7"
                    strokeWidth="2"
                    className="dark:fill-purple-800 dark:stroke-purple-600"
                  />
                  {/* Front face */}
                  <polygon
                    points="100,80 200,80 200,180 100,180"
                    fill="#d8b4fe"
                    stroke="#a855f7"
                    strokeWidth="2"
                    className="dark:fill-purple-700 dark:stroke-purple-600"
                  />
                  {/* Bottom face */}
                  <polygon
                    points="50,130 100,180 200,180 150,130"
                    fill="#a855f7"
                    stroke="#9333ea"
                    strokeWidth="2"
                    className="dark:fill-purple-600 dark:stroke-purple-500"
                  />
                  {/* Labels */}
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
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
            >
              <span>Calcular el volumen</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Question reminder */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 text-center border border-blue-200 dark:border-blue-700">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              La nueva caja tiene lado <span className="font-mono text-purple-600">(x + 2)</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              El volumen de un cubo es lado × lado × lado = <span className="font-mono">(x + 2)³</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              ¿Cuál expresión representa el volumen?
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl text-left font-medium transition-all border-2',
                  selectedAnswer === index
                    ? showFeedback
                      ? index === correctAnswer
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                      : 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-800 dark:text-blue-200'
                    : showFeedback && index === correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      selectedAnswer === index
                        ? showFeedback
                          ? index === correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    )}
                  >
                    {showFeedback && index === correctAnswer ? (
                      <Check size={16} />
                    ) : showFeedback && selectedAnswer === index && index !== correctAnswer ? (
                      <X size={16} />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 font-mono text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Check button */}
          {!showFeedback && (
            <div className="flex justify-center">
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div
              className={cn(
                'p-4 rounded-xl animate-fadeIn text-center',
                isCorrect
                  ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                  : 'bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700'
              )}
            >
              <p className={cn('font-semibold', isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
                {isCorrect ? '¡Exacto!' : '¡Casi!'} Veamos cómo funciona...
              </p>
            </div>
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

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Descubrir el patrón</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
