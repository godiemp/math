'use client';

import { useState } from 'react';
import { ArrowRight, Check, Target, Sparkles, Utensils, IceCream, Cookie, Pizza } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'challenge1' | 'challenge2' | 'challenge3' | 'challenge4' | 'summary';

interface Challenge {
  title: string;
  scenario: string;
  icon: React.ReactNode;
  options: { name: string; count: number; items: string[] }[];
  correctAnswer: number;
  explanation: string;
}

const CHALLENGES: Challenge[] = [
  {
    title: 'El Restaurante',
    scenario: 'Un menú ofrece diferentes opciones para armar tu comida:',
    icon: <Utensils className="w-8 h-8 text-orange-500" />,
    options: [
      { name: 'Entradas', count: 2, items: ['Sopa', 'Ensalada'] },
      { name: 'Plato principal', count: 3, items: ['Pollo', 'Carne', 'Pescado'] },
    ],
    correctAnswer: 6,
    explanation: '2 entradas × 3 platos = 6 menús diferentes',
  },
  {
    title: 'La Heladería',
    scenario: 'Puedes elegir cómo quieres tu helado:',
    icon: <IceCream className="w-8 h-8 text-pink-500" />,
    options: [
      { name: 'Sabores', count: 4, items: ['Vainilla', 'Chocolate', 'Fresa', 'Limón'] },
      { name: 'Toppings', count: 3, items: ['Chispas', 'Nueces', 'Caramelo'] },
    ],
    correctAnswer: 12,
    explanation: '4 sabores × 3 toppings = 12 combinaciones de helado',
  },
  {
    title: 'La Contraseña',
    scenario: 'Creas una contraseña con una letra y un número:',
    icon: <Cookie className="w-8 h-8 text-amber-600" />,
    options: [
      { name: 'Letras', count: 3, items: ['A', 'B', 'C'] },
      { name: 'Números', count: 4, items: ['1', '2', '3', '4'] },
    ],
    correctAnswer: 12,
    explanation: '3 letras × 4 números = 12 contraseñas posibles',
  },
  {
    title: 'La Pizzería',
    scenario: 'Arma tu pizza personalizada eligiendo:',
    icon: <Pizza className="w-8 h-8 text-red-500" />,
    options: [
      { name: 'Tamaño', count: 2, items: ['Mediana', 'Grande'] },
      { name: 'Masa', count: 3, items: ['Tradicional', 'Delgada', 'Rellena'] },
      { name: 'Ingrediente', count: 4, items: ['Pepperoni', 'Jamón', 'Hongos', 'Piña'] },
    ],
    correctAnswer: 24,
    explanation: '2 tamaños × 3 masas × 4 ingredientes = 24 pizzas diferentes',
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<boolean[]>([]);

  const currentChallenge = CHALLENGES[challengeIndex];

  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
  };

  const nextChallenge = () => {
    const isCorrect = selectedAnswer === currentChallenge.correctAnswer;
    setCompletedChallenges([...completedChallenges, isCorrect]);
    setShowFeedback(false);
    setSelectedAnswer(null);

    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex(challengeIndex + 1);
      setPhase(`challenge${challengeIndex + 2}` as Phase);
    } else {
      setPhase('summary');
    }
  };

  const isCorrectAnswer = selectedAnswer === currentChallenge?.correctAnswer;

  if (!isActive) return null;

  // ============ INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubriendo el Patrón
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Veamos cómo funciona el principio multiplicativo
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-blue-500" />
              <p className="text-lg text-gray-800 dark:text-gray-200">
                El <strong>Principio Multiplicativo</strong> nos dice:
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
                Si puedes hacer una cosa de <span className="text-blue-600 dark:text-blue-400 font-bold">m</span> formas
                <br />
                y otra cosa de <span className="text-purple-600 dark:text-purple-400 font-bold">n</span> formas,
                <br />
                entonces puedes hacer <strong>ambas cosas</strong> de:
              </p>
              <div className="text-center mt-4">
                <span className="text-3xl font-bold">
                  <span className="text-blue-600 dark:text-blue-400">m</span>
                  <span className="text-gray-400 mx-2">×</span>
                  <span className="text-purple-600 dark:text-purple-400">n</span>
                  <span className="text-gray-400 mx-2">=</span>
                  <span className="text-green-600 dark:text-green-400">total de formas</span>
                </span>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mt-4">
              <p className="text-amber-800 dark:text-amber-200 text-center">
                <strong>Clave:</strong> Las decisiones deben ser <em>independientes</em>.
                <br />
                Una elección no afecta las opciones de la otra.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('challenge1')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Practicar con ejemplos</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ CHALLENGES ============
  if (phase.startsWith('challenge')) {
    // Generate answer options based on challenge
    const sumOfOptions = currentChallenge.options.reduce((acc, opt) => acc + opt.count, 0);
    const answerOptions = [
      sumOfOptions, // Sum (common mistake)
      currentChallenge.correctAnswer - 2, // Close but wrong
      currentChallenge.correctAnswer, // Correct
      currentChallenge.correctAnswer + 4, // Wrong
    ].sort((a, b) => a - b);

    // Color palette for options
    const optionColors = [
      { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/50', textSmall: 'text-blue-700 dark:text-blue-300' },
      { text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/50', textSmall: 'text-purple-700 dark:text-purple-300' },
      { text: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/50', textSmall: 'text-green-700 dark:text-green-300' },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {currentChallenge.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Desafío {challengeIndex + 1} de {CHALLENGES.length}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2">
          {CHALLENGES.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                idx < challengeIndex
                  ? completedChallenges[idx]
                    ? 'bg-green-500'
                    : 'bg-amber-500'
                  : idx === challengeIndex
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>

        {/* Scenario */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
          <div className="flex items-center gap-3 mb-4">
            {currentChallenge.icon}
            <p className="text-lg text-gray-800 dark:text-gray-200">
              {currentChallenge.scenario}
            </p>
          </div>

          {/* Options display */}
          <div className={cn(
            'grid gap-4',
            currentChallenge.options.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
          )}>
            {currentChallenge.options.map((option, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {option.name}:
                  </span>
                  <span className={cn('text-2xl font-bold', optionColors[idx].text)}>
                    {option.count}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {option.items.map((item, i) => (
                    <span
                      key={i}
                      className={cn('px-2 py-1 rounded text-sm', optionColors[idx].bg, optionColors[idx].textSmall)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
          <p className="text-lg font-semibold text-blue-800 dark:text-blue-200 text-center">
            ¿Cuántas combinaciones diferentes son posibles?
          </p>
          <div className="flex justify-center items-center gap-3 mt-3 flex-wrap">
            {currentChallenge.options.map((opt, idx) => (
              <span key={idx} className="flex items-center gap-3">
                <span className={cn('text-2xl font-bold', optionColors[idx].text)}>
                  {opt.count}
                </span>
                {idx < currentChallenge.options.length - 1 && (
                  <span className="text-xl text-gray-400">×</span>
                )}
              </span>
            ))}
            <span className="text-xl text-gray-400">=</span>
            <span className="text-2xl font-bold text-gray-400">?</span>
          </div>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {answerOptions.map((answer) => (
            <button
              key={answer}
              onClick={() => !showFeedback && setSelectedAnswer(answer)}
              disabled={showFeedback}
              className={cn(
                'p-4 rounded-xl font-bold text-xl transition-all border-2',
                showFeedback
                  ? answer === currentChallenge.correctAnswer
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-700 dark:text-green-300'
                    : selectedAnswer === answer
                    ? 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-700 dark:text-red-300'
                    : 'bg-gray-50 dark:bg-gray-800 border-transparent text-gray-400'
                  : selectedAnswer === answer
                  ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
              )}
            >
              {answer}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={cn(
            'p-4 rounded-xl animate-fadeIn',
            isCorrectAnswer
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
              : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
          )}>
            <div className="flex items-start gap-3">
              {isCorrectAnswer ? (
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : (
                <Target className="w-6 h-6 text-amber-600 flex-shrink-0" />
              )}
              <div>
                <p className={cn(
                  'font-bold',
                  isCorrectAnswer ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                )}>
                  {isCorrectAnswer ? '¡Correcto!' : 'Observa la respuesta correcta'}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {currentChallenge.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="flex justify-center">
          {!showFeedback ? (
            <button
              onClick={checkAnswer}
              disabled={selectedAnswer === null}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all',
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              Verificar
            </button>
          ) : (
            <button
              onClick={nextChallenge}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>{challengeIndex < CHALLENGES.length - 1 ? 'Siguiente desafío' : 'Ver resumen'}</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Excelente trabajo!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Has descubierto el patrón del principio multiplicativo
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          <span className="text-lg font-semibold text-green-800 dark:text-green-200">
            Lo que descubriste:
          </span>
        </div>

        <div className="space-y-3">
          {CHALLENGES.map((challenge, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center gap-3"
            >
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center font-bold',
                completedChallenges[idx] ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
              )}>
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {challenge.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {challenge.options.map(opt => opt.count).join(' × ')}
                </p>
              </div>
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                = {challenge.correctAnswer}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <p className="text-purple-800 dark:text-purple-200 text-center">
          <strong>Patrón importante:</strong>
          <br />
          Para contar combinaciones, siempre <strong>multiplicamos</strong>:
        </p>
        <div className="mt-3 text-center">
          <div className="inline-block bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow-sm">
            <div className="text-lg text-gray-800 dark:text-gray-200 font-semibold">
              <span className="text-blue-600 dark:text-blue-400">Opción 1</span>
              <span className="text-gray-400 mx-2">×</span>
              <span className="text-purple-600 dark:text-purple-400">Opción 2</span>
              <span className="text-gray-400 mx-2">×</span>
              <span className="text-green-600 dark:text-green-400">...</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-amber-600 dark:text-amber-400">Total</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Aprender la teoría</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
