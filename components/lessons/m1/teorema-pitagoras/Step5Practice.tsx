'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Lightbulb, ChevronRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import MathDisplay from '@/components/math/MathDisplay';
import TriangleFigure from '@/components/figures/TriangleFigure';

interface Problem {
  id: string;
  type: 'worked' | 'partial' | 'full';
  description: string;
  a?: number;
  b?: number;
  c?: number;
  findWhat: 'c' | 'a' | 'b';
  answer: number;
  steps: string[];
  hints: string[];
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    type: 'worked',
    description: 'Un triángulo rectángulo tiene catetos de 6 y 8. ¿Cuánto mide la hipotenusa?',
    a: 6,
    b: 8,
    findWhat: 'c',
    answer: 10,
    steps: [
      'c^2 = a^2 + b^2',
      'c^2 = 6^2 + 8^2',
      'c^2 = 36 + 64',
      'c^2 = 100',
      'c = \\sqrt{100} = 10',
    ],
    hints: [],
  },
  {
    id: 'p2',
    type: 'partial',
    description: 'Un triángulo rectángulo tiene catetos de 5 y 12. ¿Cuánto mide la hipotenusa?',
    a: 5,
    b: 12,
    findWhat: 'c',
    answer: 13,
    steps: [
      'c^2 = a^2 + b^2',
      'c^2 = 5^2 + 12^2',
      'c^2 = 25 + 144',
      'c^2 = ???',
    ],
    hints: [
      '¿Cuánto es 25 + 144?',
      'c² = 169. Ahora saca la raíz cuadrada.',
      '√169 = 13',
    ],
  },
  {
    id: 'p3',
    type: 'partial',
    description: 'La hipotenusa mide 17 y un cateto mide 8. ¿Cuánto mide el otro cateto?',
    b: 8,
    c: 17,
    findWhat: 'a',
    answer: 15,
    steps: [
      'a^2 = c^2 - b^2',
      'a^2 = 17^2 - 8^2',
    ],
    hints: [
      '¿Cuánto es 17² y 8²?',
      '17² = 289, 8² = 64',
      'a² = 289 - 64 = 225. Ahora √225 = ?',
    ],
  },
  {
    id: 'p4',
    type: 'full',
    description: 'Una escalera de 25 metros está apoyada contra una pared. La base está a 7 metros de la pared. ¿A qué altura llega la escalera?',
    b: 7,
    c: 25,
    findWhat: 'a',
    answer: 24,
    steps: [],
    hints: [
      'Identifica los datos: La escalera es la hipotenusa (c = 25), la distancia al piso es un cateto (b = 7).',
      'Usa la fórmula: a² = c² - b²',
      'a² = 25² - 7² = 625 - 49 = 576',
      '√576 = 24 metros',
    ],
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set());

  const problem = PROBLEMS[currentProblem];
  const isLastProblem = currentProblem === PROBLEMS.length - 1;

  const handleRevealStep = () => {
    if (revealedSteps < problem.steps.length) {
      setRevealedSteps(prev => prev + 1);
    }
  };

  const handleShowHint = () => {
    if (hintsUsed < problem.hints.length) {
      setHintsUsed(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    const numAnswer = parseFloat(userAnswer);
    const correct = numAnswer === problem.answer;
    setIsCorrect(correct);
    setAttempts(prev => prev + 1);

    if (correct) {
      setCompletedProblems(prev => new Set([...prev, problem.id]));
    }
  };

  const handleNext = () => {
    if (isLastProblem) {
      onComplete();
    } else {
      setCurrentProblem(prev => prev + 1);
      setUserAnswer('');
      setShowSolution(false);
      setRevealedSteps(0);
      setHintsUsed(0);
      setAttempts(0);
      setIsCorrect(null);
    }
  };

  const handleShowAnswer = () => {
    setShowSolution(true);
    setIsCorrect(false);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {problem.type === 'worked' && 'Observa cómo se resuelve paso a paso'}
          {problem.type === 'partial' && 'Completa los pasos que faltan'}
          {problem.type === 'full' && 'Resuelve el problema completo'}
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-center items-center gap-2">
        {PROBLEMS.map((p, i) => (
          <div
            key={p.id}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
              i === currentProblem
                ? 'bg-green-500 text-white scale-110'
                : completedProblems.has(p.id)
                ? 'bg-green-400 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            )}
          >
            {completedProblems.has(p.id) ? <Check size={18} /> : i + 1}
          </div>
        ))}
      </div>

      {/* Problem type badge */}
      <div className="flex justify-center">
        <span className={cn(
          'px-3 py-1 rounded-full text-sm font-medium',
          problem.type === 'worked' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
          problem.type === 'partial' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
          problem.type === 'full' && 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
        )}>
          {problem.type === 'worked' && 'Ejemplo Resuelto'}
          {problem.type === 'partial' && 'Completa la Solución'}
          {problem.type === 'full' && 'Resuelve Tú'}
        </span>
      </div>

      {/* Problem */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">
          {problem.description}
        </p>

        {/* Triangle visualization */}
        <div className="flex justify-center mb-4">
          <TriangleFigure
            fromSides={{ sides: [3, 4, 5], size: 120 }}
            sides={[
              { label: `${problem.a ?? '?'}`, color: '#3b82f6' },
              { label: `${problem.b ?? '?'}`, color: '#22c55e' },
              { label: `${problem.c ?? '?'}`, color: '#f59e0b' },
            ]}
            showRightAngleMarker
            fill="#D1FAE5"
            stroke="#059669"
            width={192}
            height={144}
          />
        </div>

        {/* Worked example steps */}
        {problem.type === 'worked' && (
          <div className="space-y-3">
            {problem.steps.map((step, i) => (
              <div
                key={i}
                className={cn(
                  'p-3 rounded-lg transition-all',
                  i < revealedSteps
                    ? 'bg-green-50 dark:bg-green-900/30 opacity-100'
                    : 'bg-gray-100 dark:bg-gray-700 opacity-50'
                )}
              >
                {i < revealedSteps ? (
                  <MathDisplay latex={step} />
                ) : (
                  <span className="text-gray-400">Paso {i + 1}</span>
                )}
              </div>
            ))}

            {revealedSteps < problem.steps.length ? (
              <button
                onClick={handleRevealStep}
                className="w-full py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all"
              >
                Mostrar siguiente paso
              </button>
            ) : (
              <div className="text-center text-green-600 dark:text-green-400 font-bold">
                ¡Solución completa!
              </div>
            )}
          </div>
        )}

        {/* Partial example */}
        {problem.type === 'partial' && !showSolution && (
          <div className="space-y-3">
            {problem.steps.map((step, i) => (
              <div key={i} className="p-3 rounded-lg bg-green-50 dark:bg-green-900/30">
                <MathDisplay latex={step} />
              </div>
            ))}

            {/* Answer input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tu respuesta:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className={cn(
                    'flex-1 px-4 py-2 rounded-lg border-2 text-lg font-medium',
                    'focus:outline-none focus:ring-2',
                    isCorrect === true && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                    isCorrect === false && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                    isCorrect === null && 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  )}
                  placeholder="?"
                  disabled={isCorrect === true}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer || isCorrect === true}
                  className={cn(
                    'px-6 py-2 rounded-lg font-semibold transition-all',
                    userAnswer && isCorrect !== true
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  )}
                >
                  Verificar
                </button>
              </div>
            </div>

            {/* Feedback */}
            {isCorrect === true && (
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-300">
                <Check size={20} />
                <span className="font-medium">¡Correcto!</span>
              </div>
            )}
            {isCorrect === false && !showSolution && (
              <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-700 dark:text-amber-300">
                <div className="flex items-center gap-2">
                  <X size={20} />
                  <span className="font-medium">Intenta de nuevo</span>
                </div>
              </div>
            )}

            {/* Hints */}
            {problem.hints.length > 0 && isCorrect !== true && (
              <div className="mt-4">
                {hintsUsed > 0 && (
                  <div className="space-y-2 mb-3">
                    {problem.hints.slice(0, hintsUsed).map((hint, i) => (
                      <div key={i} className="p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg text-yellow-700 dark:text-yellow-300 text-sm">
                        <Lightbulb size={14} className="inline mr-1" />
                        {hint}
                      </div>
                    ))}
                  </div>
                )}
                {hintsUsed < problem.hints.length && attempts > 0 && (
                  <button
                    onClick={handleShowHint}
                    className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    <Lightbulb size={14} className="inline mr-1" />
                    Mostrar pista ({problem.hints.length - hintsUsed} disponibles)
                  </button>
                )}
                {attempts >= 3 && (
                  <button
                    onClick={handleShowAnswer}
                    className="block mt-2 text-sm text-gray-500 hover:underline"
                  >
                    Ver solución completa
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Full problem */}
        {problem.type === 'full' && !showSolution && (
          <div className="space-y-4">
            {/* Answer input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tu respuesta (en metros):
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className={cn(
                    'flex-1 px-4 py-2 rounded-lg border-2 text-lg font-medium',
                    'focus:outline-none focus:ring-2',
                    isCorrect === true && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                    isCorrect === false && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                    isCorrect === null && 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  )}
                  placeholder="?"
                  disabled={isCorrect === true}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer || isCorrect === true}
                  className={cn(
                    'px-6 py-2 rounded-lg font-semibold transition-all',
                    userAnswer && isCorrect !== true
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  )}
                >
                  Verificar
                </button>
              </div>
            </div>

            {/* Feedback */}
            {isCorrect === true && (
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-300">
                <Check size={20} />
                <span className="font-medium">¡Excelente! La escalera llega a {problem.answer} metros de altura.</span>
              </div>
            )}
            {isCorrect === false && !showSolution && (
              <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-700 dark:text-amber-300">
                <div className="flex items-center gap-2">
                  <X size={20} />
                  <span className="font-medium">Intenta de nuevo</span>
                </div>
              </div>
            )}

            {/* Hints */}
            {problem.hints.length > 0 && isCorrect !== true && (
              <div>
                {hintsUsed > 0 && (
                  <div className="space-y-2 mb-3">
                    {problem.hints.slice(0, hintsUsed).map((hint, i) => (
                      <div key={i} className="p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg text-yellow-700 dark:text-yellow-300 text-sm">
                        <Lightbulb size={14} className="inline mr-1" />
                        {hint}
                      </div>
                    ))}
                  </div>
                )}
                {hintsUsed < problem.hints.length && attempts > 0 && (
                  <button
                    onClick={handleShowHint}
                    className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    <Lightbulb size={14} className="inline mr-1" />
                    Necesito una pista ({problem.hints.length - hintsUsed} disponibles)
                  </button>
                )}
                {attempts >= 3 && (
                  <button
                    onClick={handleShowAnswer}
                    className="block mt-2 text-sm text-gray-500 hover:underline"
                  >
                    Ver solución completa
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Show solution */}
        {showSolution && (
          <div className="space-y-2 animate-fadeIn">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Solución:</h4>
            {problem.hints.map((hint, i) => (
              <div key={i} className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-700 dark:text-green-300 text-sm">
                {hint}
              </div>
            ))}
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg text-center">
              <span className="font-bold text-green-700 dark:text-green-300">
                Respuesta: {problem.answer}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Next button */}
      {(isCorrect === true || showSolution || (problem.type === 'worked' && revealedSteps >= problem.steps.length)) && (
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>{isLastProblem ? 'Ir al Checkpoint' : 'Siguiente Problema'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
