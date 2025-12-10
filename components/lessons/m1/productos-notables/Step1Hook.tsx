'use client';

import { useState } from 'react';
import { TreeDeciduous, Check, X, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'scenario' | 'question' | 'result';

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const correctAnswer = 2; // "x² + 6x + 9"

  const options = [
    'x² + 9',
    'x² + 3x + 9',
    'x² + 6x + 9',
    '2x + 6',
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
          El Arquitecto de Jardines
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Don Carlos necesita calcular el área de un jardín expandido...
        </p>
      </div>

      {phase === 'scenario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Scenario */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Don Carlos es un arquitecto paisajista. Tiene un <strong className="text-green-600">jardín cuadrado</strong> con lado de <strong className="text-blue-600">x metros</strong>.
            </p>

            {/* Garden visualization */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Jardín original:
              </p>

              {/* Original garden */}
              <div className="relative">
                <svg viewBox="0 0 200 200" className="w-40 h-40">
                  {/* Garden square */}
                  <rect
                    x="40"
                    y="40"
                    width="120"
                    height="120"
                    fill="#86efac"
                    stroke="#22c55e"
                    strokeWidth="3"
                    className="dark:fill-green-800 dark:stroke-green-600"
                  />
                  {/* Decorative trees */}
                  <circle cx="70" cy="80" r="12" fill="currentColor" className="text-green-400 dark:text-green-600" />
                  <circle cx="130" cy="100" r="15" fill="currentColor" className="text-green-400 dark:text-green-600" />
                  <circle cx="90" cy="130" r="10" fill="currentColor" className="text-green-400 dark:text-green-600" />
                  {/* Side label */}
                  <text x="100" y="25" textAnchor="middle" className="text-lg font-bold fill-blue-600">x</text>
                  <text x="15" y="105" textAnchor="middle" className="text-lg font-bold fill-blue-600" transform="rotate(-90, 15, 105)">x</text>
                </svg>
              </div>

              <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 mt-4 max-w-md">
                <p className="text-amber-800 dark:text-amber-200 text-center">
                  La ciudad quiere expandir el jardín agregando <strong className="text-purple-600">3 metros</strong> a cada lado.
                </p>
              </div>

              {/* Expanded garden preview */}
              <div className="relative mt-4">
                <svg viewBox="0 0 260 260" className="w-52 h-52">
                  {/* Original garden */}
                  <rect
                    x="40"
                    y="40"
                    width="120"
                    height="120"
                    fill="currentColor"
                    className="text-green-200 dark:text-green-800"
                  />
                  {/* Right expansion */}
                  <rect
                    x="160"
                    y="40"
                    width="50"
                    height="120"
                    fill="currentColor"
                    className="text-purple-200 dark:text-purple-800"
                  />
                  {/* Bottom expansion */}
                  <rect
                    x="40"
                    y="160"
                    width="120"
                    height="50"
                    fill="currentColor"
                    className="text-purple-200 dark:text-purple-800"
                  />
                  {/* Corner expansion */}
                  <rect
                    x="160"
                    y="160"
                    width="50"
                    height="50"
                    fill="currentColor"
                    className="text-purple-300 dark:text-purple-700"
                  />
                  {/* Border */}
                  <rect
                    x="40"
                    y="40"
                    width="170"
                    height="170"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-green-600"
                  />
                  {/* Dashed lines showing sections */}
                  <line x1="160" y1="40" x2="160" y2="210" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-gray-400" />
                  <line x1="40" y1="160" x2="210" y2="160" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-gray-400" />
                  {/* Labels */}
                  <text x="100" y="25" textAnchor="middle" className="text-sm font-bold fill-blue-600">x</text>
                  <text x="185" y="25" textAnchor="middle" className="text-sm font-bold fill-purple-600">3</text>
                  <text x="20" y="100" textAnchor="middle" className="text-sm font-bold fill-blue-600">x</text>
                  <text x="20" y="185" textAnchor="middle" className="text-sm font-bold fill-purple-600">3</text>
                </svg>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Nuevo jardín: lado = <span className="font-mono text-green-600">(x + 3)</span>
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              ¿Cuál es el <strong>área</strong> del nuevo jardín?
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Calcular el área</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Question reminder */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 text-center border border-green-200 dark:border-green-700">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              El nuevo jardín tiene lado <span className="font-mono text-green-600">(x + 3)</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              El área de un cuadrado es lado × lado = <span className="font-mono">(x + 3)²</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              ¿Cuál expresión representa el área?
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
                      : 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                    : showFeedback && index === correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500'
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
                          : 'bg-green-500 text-white'
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
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg'
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
          {/* Explanation with area model */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              El Modelo de Áreas:
            </h3>

            {/* Area model visualization */}
            <div className="flex justify-center mb-6">
              <svg viewBox="0 0 280 280" className="w-64 h-64">
                {/* x² section */}
                <rect x="40" y="40" width="120" height="120" fill="currentColor" className="text-blue-200 dark:text-blue-800" />
                <text x="100" y="105" textAnchor="middle" className="text-xl font-bold fill-blue-700 dark:fill-blue-300">x²</text>

                {/* Right section (3x) */}
                <rect x="160" y="40" width="60" height="120" fill="currentColor" className="text-purple-200 dark:text-purple-800" />
                <text x="190" y="105" textAnchor="middle" className="text-lg font-bold fill-purple-700 dark:fill-purple-300">3x</text>

                {/* Bottom section (3x) */}
                <rect x="40" y="160" width="120" height="60" fill="currentColor" className="text-purple-200 dark:text-purple-800" />
                <text x="100" y="195" textAnchor="middle" className="text-lg font-bold fill-purple-700 dark:fill-purple-300">3x</text>

                {/* Corner section (9) */}
                <rect x="160" y="160" width="60" height="60" fill="currentColor" className="text-teal-200 dark:text-teal-800" />
                <text x="190" y="195" textAnchor="middle" className="text-lg font-bold fill-teal-700 dark:fill-teal-300">9</text>

                {/* Border */}
                <rect x="40" y="40" width="180" height="180" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-600" />

                {/* Labels */}
                <text x="100" y="25" textAnchor="middle" className="text-sm font-bold fill-blue-600">x</text>
                <text x="190" y="25" textAnchor="middle" className="text-sm font-bold fill-purple-600">3</text>
                <text x="25" y="100" textAnchor="middle" className="text-sm font-bold fill-blue-600">x</text>
                <text x="25" y="190" textAnchor="middle" className="text-sm font-bold fill-purple-600">3</text>
              </svg>
            </div>

            <div className="space-y-3 text-center">
              <p className="text-gray-700 dark:text-gray-300">
                El área total es la suma de las cuatro partes:
              </p>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                <p className="font-mono text-lg">
                  <span className="text-blue-600">x²</span> + <span className="text-purple-600">3x</span> + <span className="text-purple-600">3x</span> + <span className="text-teal-600">9</span>
                </p>
                <p className="text-gray-400 my-2">↓ combinamos términos semejantes</p>
                <p className="font-mono text-xl text-green-600 font-bold">
                  x² + 6x + 9
                </p>
              </div>
            </div>
          </div>

          {/* Bridge to productos notables */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  ¡Este es el Cuadrado de un Binomio!
                </h4>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center">
                    <p className="font-mono text-xl">
                      (<span className="text-blue-600">x</span> + <span className="text-purple-600">3</span>)² = <span className="text-blue-600">x²</span> + 2·<span className="text-blue-600">x</span>·<span className="text-purple-600">3</span> + <span className="text-purple-600">3</span>²
                    </p>
                    <p className="text-gray-400 my-2">↓</p>
                    <p className="font-mono text-xl text-green-600 font-bold">
                      x² + 6x + 9
                    </p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
                    <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                      ⚠️ <strong>Error común:</strong> pensar que (x + 3)² = x² + 9
                      <br />
                      <span className="text-red-600">¡No olvides el término del medio!</span>
                    </p>
                  </div>
                  <p className="text-sm mt-2 bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg text-center">
                    Este es solo <strong>UNO de los tres productos notables</strong> que todo arquitecto algebraico debe conocer. ¡Descubramos los demás!
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
              <span>Descubrir los patrones</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
