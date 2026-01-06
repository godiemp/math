'use client';

import { useState } from 'react';
import { ArrowRight, Check, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  id: string;
  context: string;
  question: string;
  emoji: string;
  unit: string;
  options: number[];
  correctAnswer: number;
  hint: string;
  solution: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    context: 'En la mañana la temperatura era de 12°C. Durante la noche bajó 17 grados.',
    question: '¿Cuál es la temperatura ahora?',
    emoji: '🌡️',
    unit: '°C',
    options: [-5, 5, 29, -29],
    correctAnswer: -5,
    hint: 'Recuerda: bajar temperatura = restar. El resultado puede ser negativo.',
    solution: '12 - 17 = -5°C (bajo cero)',
  },
  {
    id: 'p2',
    context: 'Pedro tiene $25.000 y compra 3 pizzas de $6.500 cada una.',
    question: '¿Cuánto vuelto recibe?',
    emoji: '🍕',
    unit: '',
    options: [5500, 6000, 5000, 6500],
    correctAnswer: 5500,
    hint: 'Primero calcula el total (3 × $6.500), luego resta del dinero inicial.',
    solution: 'Total: 3 × $6.500 = $19.500. Vuelto: $25.000 - $19.500 = $5.500',
  },
  {
    id: 'p3',
    context: 'Ana y Luis juntan sus ahorros. Ana tiene $12.000 y Luis tiene $8.500.',
    question: '¿Cuánto tienen entre los dos?',
    emoji: '💰',
    unit: '',
    options: [20500, 21500, 19500, 3500],
    correctAnswer: 20500,
    hint: 'Cuando juntan dinero, debes sumar ambas cantidades.',
    solution: '$12.000 + $8.500 = $20.500',
  },
  {
    id: 'p4',
    context: 'Un bus viaja a 80 km/h y debe recorrer 200 km.',
    question: '¿Cuántas horas tardará en llegar?',
    emoji: '🚌',
    unit: ' horas',
    options: [2.5, 3, 2, 1.5],
    correctAnswer: 2.5,
    hint: 'Recuerda: tiempo = distancia ÷ velocidad.',
    solution: 'tiempo = 200 ÷ 80 = 2,5 horas',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);

  const problem = PROBLEMS[currentProblem];
  const isCorrect = selectedAnswer === problem?.correctAnswer;
  const allCompleted = completedProblems.length === PROBLEMS.length;

  const handleSelect = (value: number) => {
    if (showFeedback) return;
    setSelectedAnswer(value);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);

    if (isCorrect && !completedProblems.includes(problem.id)) {
      setCompletedProblems([...completedProblems, problem.id]);
    }
  };

  const handleNext = () => {
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    } else {
      // Last problem - mark as completed if correct
      if (isCorrect && !completedProblems.includes(problem.id)) {
        setCompletedProblems([...completedProblems, problem.id]);
      }
    }
  };

  const formatNumber = (n: number) => {
    if (Number.isInteger(n)) return n.toString();
    return n.toString().replace('.', ',');
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Resuelve Problemas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplica la estrategia de los 4 pasos
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-2">
        {PROBLEMS.map((p, i) => (
          <div
            key={p.id}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all',
              completedProblems.includes(p.id)
                ? 'bg-green-500 text-white'
                : i === currentProblem
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            )}
          >
            {completedProblems.includes(p.id) ? <Check size={18} /> : i + 1}
          </div>
        ))}
      </div>

      {!allCompleted ? (
        <>
          {/* Problem Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">{problem.emoji}</span>
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{problem.context}</p>
                <p className="font-semibold text-gray-900 dark:text-white">{problem.question}</p>
              </div>
            </div>
          </div>

          {/* Hint toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Lightbulb size={16} />
              {showHint ? 'Ocultar pista' : 'Ver pista'}
            </button>
            {showHint && (
              <div className="mt-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-200">
                💡 {problem.hint}
              </div>
            )}
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-3">
            {problem.options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={showFeedback}
                className={cn(
                  'p-4 rounded-xl font-bold text-xl transition-all border-2',
                  showFeedback && option === problem.correctAnswer
                    ? 'bg-green-100 dark:bg-green-900/40 border-green-500 ring-2 ring-green-500 text-green-800 dark:text-green-200'
                    : showFeedback && selectedAnswer === option && !isCorrect
                    ? 'bg-red-100 dark:bg-red-900/40 border-red-500 text-red-800 dark:text-red-200'
                    : selectedAnswer === option
                    ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-500 scale-[1.02] text-blue-800 dark:text-blue-200'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                {problem.unit === '' ? '$' : ''}{formatNumber(option)}{problem.unit}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div
              className={cn(
                'p-4 rounded-xl border-2 animate-fadeIn',
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                  : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
              )}
            >
              <p className={cn(
                'font-semibold mb-2',
                isCorrect ? 'text-green-800 dark:text-green-200' : 'text-amber-800 dark:text-amber-200'
              )}>
                {isCorrect ? '¡Correcto!' : '¡Casi! Veamos la solución:'}
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
                  {problem.solution}
                </p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-6 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 shadow-lg transition-all"
              >
                <span>Siguiente</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </>
      ) : (
        /* Completion screen */
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🌟</div>
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
              ¡Excelente práctica!
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Has resuelto problemas de temperatura, dinero y distancia/tiempo.
            </p>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Recuerda los 4 pasos:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</span>
                <span className="text-gray-600 dark:text-gray-400">Identificar los datos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</span>
                <span className="text-gray-600 dark:text-gray-400">Elegir las operaciones</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</span>
                <span className="text-gray-600 dark:text-gray-400">Calcular paso a paso</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</span>
                <span className="text-gray-600 dark:text-gray-400">Verificar el resultado</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              <span>Continuar al checkpoint</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
