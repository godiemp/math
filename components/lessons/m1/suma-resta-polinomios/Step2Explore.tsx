'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Sparkles, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'addition' | 'subtraction' | 'mixed' | 'complete';

interface Example {
  id: string;
  expression1: string;
  expression2: string;
  operation: 'add' | 'subtract';
  steps: {
    grouped: string;
    result: string;
  };
  userAnswer: string | null;
  isCorrect: boolean | null;
}

const ADDITION_EXAMPLES: Example[] = [
  {
    id: 'add1',
    expression1: '2x + 3',
    expression2: '4x + 5',
    operation: 'add',
    steps: { grouped: '(2x + 4x) + (3 + 5)', result: '6x + 8' },
    userAnswer: null,
    isCorrect: null,
  },
  {
    id: 'add2',
    expression1: 'x² + 2x - 1',
    expression2: '3x² - x + 4',
    operation: 'add',
    steps: { grouped: '(x² + 3x²) + (2x - x) + (-1 + 4)', result: '4x² + x + 3' },
    userAnswer: null,
    isCorrect: null,
  },
];

const SUBTRACTION_EXAMPLES: Example[] = [
  {
    id: 'sub1',
    expression1: '5x + 7',
    expression2: '2x + 3',
    operation: 'subtract',
    steps: { grouped: '(5x - 2x) + (7 - 3)', result: '3x + 4' },
    userAnswer: null,
    isCorrect: null,
  },
  {
    id: 'sub2',
    expression1: '4x² + 3x - 2',
    expression2: 'x² - 2x + 5',
    operation: 'subtract',
    steps: { grouped: '(4x² - x²) + (3x - (-2x)) + (-2 - 5)', result: '3x² + 5x - 7' },
    userAnswer: null,
    isCorrect: null,
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('addition');
  const [additionExamples, setAdditionExamples] = useState(ADDITION_EXAMPLES);
  const [subtractionExamples, setSubtractionExamples] = useState(SUBTRACTION_EXAMPLES);
  const [currentAdditionStep, setCurrentAdditionStep] = useState(0);
  const [currentSubtractionStep, setCurrentSubtractionStep] = useState(0);
  const [showAdditionResult, setShowAdditionResult] = useState<string | null>(null);
  const [showSubtractionResult, setShowSubtractionResult] = useState<string | null>(null);
  const [mixedInput, setMixedInput] = useState('');
  const [mixedFeedback, setMixedFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [mixedCompleted, setMixedCompleted] = useState(false);

  const handleRevealAddition = (id: string) => {
    setShowAdditionResult(id);
    setAdditionExamples(prev =>
      prev.map(ex => (ex.id === id ? { ...ex, isCorrect: true } : ex))
    );
  };

  const handleRevealSubtraction = (id: string) => {
    setShowSubtractionResult(id);
    setSubtractionExamples(prev =>
      prev.map(ex => (ex.id === id ? { ...ex, isCorrect: true } : ex))
    );
  };

  const handleNextAddition = () => {
    if (currentAdditionStep < additionExamples.length - 1) {
      setCurrentAdditionStep(prev => prev + 1);
      setShowAdditionResult(null);
    } else {
      setPhase('subtraction');
    }
  };

  const handleNextSubtraction = () => {
    if (currentSubtractionStep < subtractionExamples.length - 1) {
      setCurrentSubtractionStep(prev => prev + 1);
      setShowSubtractionResult(null);
    } else {
      setPhase('mixed');
    }
  };

  const handleMixedCheck = () => {
    const normalizedAnswer = mixedInput.toLowerCase().replace(/\s/g, '');
    const correctAnswers = ['2x²+7x-3', '2x^2+7x-3', '2x2+7x-3'];
    const isCorrect = correctAnswers.includes(normalizedAnswer);

    if (isCorrect) {
      setMixedFeedback({ message: '¡Excelente! Has dominado la suma y resta de polinomios.', isCorrect: true });
      setMixedCompleted(true);
    } else {
      setMixedFeedback({ message: 'Revisa tu respuesta. Recuerda: cambia los signos del segundo polinomio al restar.', isCorrect: false });
    }
  };

  const allAdditionComplete = additionExamples.every(ex => ex.isCorrect);
  const allSubtractionComplete = subtractionExamples.every(ex => ex.isCorrect);

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'addition' && 'Observa cómo se suman los polinomios'}
          {phase === 'subtraction' && 'Ahora veamos la resta de polinomios'}
          {phase === 'mixed' && 'Combina lo que aprendiste'}
          {phase === 'complete' && '¡Excelente trabajo!'}
        </p>
      </div>

      {phase === 'addition' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Current example */}
          {additionExamples.map((example, index) => (
            index === currentAdditionStep && (
              <div key={example.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Plus className="w-6 h-6 text-green-500" />
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Suma de polinomios - Ejemplo {index + 1}
                  </span>
                </div>

                {/* Expression to solve */}
                <div className="text-center mb-6">
                  <p className="text-2xl font-mono font-bold text-gray-800 dark:text-gray-200">
                    ({example.expression1}) + ({example.expression2})
                  </p>
                </div>

                {showAdditionResult === example.id ? (
                  <div className="space-y-4 animate-fadeIn">
                    {/* Step 1: Group */}
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                        Paso 1: Agrupar términos semejantes
                      </p>
                      <p className="text-lg font-mono text-center text-gray-800 dark:text-gray-200">
                        {example.steps.grouped}
                      </p>
                    </div>

                    {/* Step 2: Result */}
                    <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4">
                      <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                        Paso 2: Sumar coeficientes
                      </p>
                      <p className="text-2xl font-mono font-bold text-center text-green-700 dark:text-green-300">
                        = {example.steps.result}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleRevealAddition(example.id)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
                    >
                      Ver solución
                    </button>
                  </div>
                )}
              </div>
            )
          ))}

          {/* Continue button */}
          {showAdditionResult && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={handleNextAddition}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>
                  {currentAdditionStep < additionExamples.length - 1 ? 'Siguiente ejemplo' : 'Pasar a resta'}
                </span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* Progress */}
          <div className="flex justify-center gap-2">
            {additionExamples.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-3 h-3 rounded-full transition-all',
                  i <= currentAdditionStep
                    ? 'bg-green-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                )}
              />
            ))}
          </div>
        </div>
      )}

      {phase === 'subtraction' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Important note about subtraction */}
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
            <p className="text-amber-800 dark:text-amber-200 text-center font-medium">
              <strong>Recuerda:</strong> Al restar, cambia el signo de todos los términos del segundo polinomio
            </p>
          </div>

          {/* Current example */}
          {subtractionExamples.map((example, index) => (
            index === currentSubtractionStep && (
              <div key={example.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Minus className="w-6 h-6 text-red-500" />
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Resta de polinomios - Ejemplo {index + 1}
                  </span>
                </div>

                {/* Expression to solve */}
                <div className="text-center mb-6">
                  <p className="text-2xl font-mono font-bold text-gray-800 dark:text-gray-200">
                    ({example.expression1}) - ({example.expression2})
                  </p>
                </div>

                {showSubtractionResult === example.id ? (
                  <div className="space-y-4 animate-fadeIn">
                    {/* Step 1: Change signs and group */}
                    <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4">
                      <p className="text-sm text-red-600 dark:text-red-400 mb-2">
                        Paso 1: Cambiar signos y agrupar
                      </p>
                      <p className="text-lg font-mono text-center text-gray-800 dark:text-gray-200">
                        {example.steps.grouped}
                      </p>
                    </div>

                    {/* Step 2: Result */}
                    <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4">
                      <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                        Paso 2: Operar los coeficientes
                      </p>
                      <p className="text-2xl font-mono font-bold text-center text-green-700 dark:text-green-300">
                        = {example.steps.result}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleRevealSubtraction(example.id)}
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all shadow-lg"
                    >
                      Ver solución
                    </button>
                  </div>
                )}
              </div>
            )
          ))}

          {/* Continue button */}
          {showSubtractionResult && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={handleNextSubtraction}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>
                  {currentSubtractionStep < subtractionExamples.length - 1 ? 'Siguiente ejemplo' : 'Desafío final'}
                </span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* Progress */}
          <div className="flex justify-center gap-2">
            {subtractionExamples.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-3 h-3 rounded-full transition-all',
                  i <= currentSubtractionStep
                    ? 'bg-red-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                )}
              />
            ))}
          </div>
        </div>
      )}

      {phase === 'mixed' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                ¡Tu turno!
              </span>
            </div>

            {/* Expression to solve */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Calcula:</p>
              <p className="text-2xl font-mono font-bold text-gray-800 dark:text-gray-200">
                (3x² + 4x - 1) - (x² - 3x + 2)
              </p>
            </div>

            {/* Input */}
            <div className="space-y-4">
              <input
                type="text"
                value={mixedInput}
                onChange={(e) => {
                  setMixedInput(e.target.value);
                  setMixedFeedback(null);
                }}
                placeholder="Escribe tu respuesta (ej: 2x² + 7x - 3)"
                disabled={mixedCompleted}
                className="w-full p-4 text-lg font-mono text-center border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:border-purple-500 focus:outline-none disabled:opacity-50"
              />

              {/* Feedback */}
              {mixedFeedback && (
                <div
                  className={cn(
                    'p-4 rounded-xl animate-fadeIn',
                    mixedFeedback.isCorrect
                      ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                      : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {mixedFeedback.isCorrect ? (
                      <Check className="w-6 h-6 text-green-600" />
                    ) : (
                      <X className="w-6 h-6 text-amber-600" />
                    )}
                    <p
                      className={cn(
                        'font-medium',
                        mixedFeedback.isCorrect
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-amber-700 dark:text-amber-300'
                      )}
                    >
                      {mixedFeedback.message}
                    </p>
                  </div>
                </div>
              )}

              {/* Check/Continue button */}
              <div className="flex justify-center">
                {!mixedCompleted ? (
                  <button
                    onClick={handleMixedCheck}
                    disabled={!mixedInput.trim()}
                    className={cn(
                      'px-8 py-3 rounded-xl font-semibold transition-all',
                      mixedInput.trim()
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    )}
                  >
                    Verificar
                  </button>
                ) : (
                  <button
                    onClick={() => setPhase('complete')}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
                  >
                    <Sparkles size={20} />
                    <span>¡Lo logré!</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Hint */}
          {!mixedCompleted && (
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
              <p className="text-blue-800 dark:text-blue-200 text-sm text-center">
                <strong>Pista:</strong> Al restar, (3x² + 4x - 1) - (x² - 3x + 2) se convierte en
                (3x² + 4x - 1) + (-x² + 3x - 2)
              </p>
            </div>
          )}
        </div>
      )}

      {phase === 'complete' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Summary */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                ¡Excelente! Has aprendido a operar polinomios
              </h3>
            </div>

            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p><strong>Reglas que descubriste:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <span className="text-green-600 font-semibold">Suma:</span> Agrupa términos semejantes y suma sus coeficientes
                </li>
                <li>
                  <span className="text-red-600 font-semibold">Resta:</span> Cambia el signo de todos los términos del segundo polinomio y luego suma
                </li>
                <li>
                  Solo puedes operar términos con la <strong>misma variable y exponente</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
