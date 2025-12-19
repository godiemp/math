'use client';

import { useState } from 'react';
import { Check, X, ArrowRight, Lightbulb, RotateCcw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeProblem {
  id: string;
  problem: string;
  setup: { magnitude: string; from: string; to: string; type: 'direct' | 'inverse' }[];
  initialValue: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
  answered: boolean;
  isCorrect: boolean | null;
  showHint: boolean;
}

const PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: '1',
    problem:
      'Si 4 obreros trabajando 6 horas/día terminan una obra en 10 días, ¿cuántos días tardarán 6 obreros trabajando 8 horas/día?',
    setup: [
      { magnitude: 'Obreros', from: '4', to: '6', type: 'inverse' },
      { magnitude: 'Horas/día', from: '6', to: '8', type: 'inverse' },
    ],
    initialValue: '10 días',
    options: ['4 días', '5 días', '6 días', '8 días'],
    correctIndex: 1,
    hint: 'Obreros ↑ → Días ↓ (inversa: 4/6). Horas ↑ → Días ↓ (inversa: 6/8).',
    explanation: 'x = 10 × (4/6) × (6/8) = 10 × 24/48 = 10 × 0.5 = 5 días',
    answered: false,
    isCorrect: null,
    showHint: false,
  },
  {
    id: '2',
    problem:
      'Si 3 máquinas producen 180 piezas en 4 horas, ¿cuántas piezas producirán 5 máquinas en 6 horas?',
    setup: [
      { magnitude: 'Máquinas', from: '3', to: '5', type: 'direct' },
      { magnitude: 'Horas', from: '4', to: '6', type: 'direct' },
    ],
    initialValue: '180 piezas',
    options: ['300 piezas', '450 piezas', '540 piezas', '600 piezas'],
    correctIndex: 1,
    hint: 'Máquinas ↑ → Piezas ↑ (directa: 5/3). Horas ↑ → Piezas ↑ (directa: 6/4).',
    explanation: 'x = 180 × (5/3) × (6/4) = 180 × 30/12 = 180 × 2.5 = 450 piezas',
    answered: false,
    isCorrect: null,
    showHint: false,
  },
  {
    id: '3',
    problem:
      'Si 8 obreros trabajando 5 horas/día construyen un muro en 12 días, ¿cuántos días necesitarán 10 obreros trabajando 4 horas/día?',
    setup: [
      { magnitude: 'Obreros', from: '8', to: '10', type: 'inverse' },
      { magnitude: 'Horas/día', from: '5', to: '4', type: 'inverse' },
    ],
    initialValue: '12 días',
    options: ['10 días', '12 días', '15 días', '18 días'],
    correctIndex: 1,
    hint: 'Obreros ↑ → Días ↓ (inversa: 8/10). Horas ↓ → Días ↑ (inversa: 5/4).',
    explanation: 'x = 12 × (8/10) × (5/4) = 12 × 40/40 = 12 días',
    answered: false,
    isCorrect: null,
    showHint: false,
  },
  {
    id: '4',
    problem:
      'Si 6 grifos llenan una piscina en 4 horas, ¿en cuántas horas la llenarán 8 grifos?',
    setup: [{ magnitude: 'Grifos', from: '6', to: '8', type: 'inverse' }],
    initialValue: '4 horas',
    options: ['2 horas', '3 horas', '5 horas', '6 horas'],
    correctIndex: 1,
    hint: 'Grifos ↑ → Tiempo ↓ (inversa: 6/8).',
    explanation: 'x = 4 × (6/8) = 4 × 0.75 = 3 horas',
    answered: false,
    isCorrect: null,
    showHint: false,
  },
  {
    id: '5',
    problem:
      'Si 5 camiones hacen 8 viajes en 4 días, ¿cuántos viajes harán 10 camiones en 6 días?',
    setup: [
      { magnitude: 'Camiones', from: '5', to: '10', type: 'direct' },
      { magnitude: 'Días', from: '4', to: '6', type: 'direct' },
    ],
    initialValue: '8 viajes',
    options: ['16 viajes', '20 viajes', '24 viajes', '32 viajes'],
    correctIndex: 2,
    hint: 'Camiones ↑ → Viajes ↑ (directa: 10/5). Días ↑ → Viajes ↑ (directa: 6/4).',
    explanation: 'x = 8 × (10/5) × (6/4) = 8 × 2 × 1.5 = 24 viajes',
    answered: false,
    isCorrect: null,
    showHint: false,
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [problems, setProblems] = useState(PRACTICE_PROBLEMS);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const problem = problems[currentProblem];
  const correctCount = problems.filter((p) => p.isCorrect).length;
  const passed = correctCount >= 4;

  const handleToggleHint = () => {
    setProblems((prev) =>
      prev.map((p, i) => (i === currentProblem ? { ...p, showHint: !p.showHint } : p))
    );
  };

  const handleSelectOption = (optionIndex: number) => {
    if (problem.answered) return;

    const isCorrect = optionIndex === problem.correctIndex;

    setProblems((prev) =>
      prev.map((p, i) => (i === currentProblem ? { ...p, answered: true, isCorrect } : p))
    );
  };

  const handleNext = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem((prev) => prev + 1);
    } else {
      setShowComplete(true);
    }
  };

  const handleReset = () => {
    setProblems(PRACTICE_PROBLEMS);
    setCurrentProblem(0);
    setShowComplete(false);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Práctica Guiada</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {!showComplete
            ? `Resuelve los problemas. Necesitas 4 de ${problems.length} correctas.`
            : '¡Resultados!'}
        </p>
      </div>

      {!showComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentProblem + 1} de {problems.length}
            </div>
            <div className="flex gap-1">
              {problems.map((p, i) => (
                <div
                  key={p.id}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    p.answered
                      ? p.isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentProblem
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {p.answered ? (p.isCorrect ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* Problem type badge */}
            <div className="flex justify-center mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                ⚙️ Proporcionalidad Compuesta
              </span>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200 mb-4 text-center">
              {problem.problem}
            </p>

            {/* Setup info */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {problem.setup.map((s, i) => (
                <span
                  key={i}
                  className={cn(
                    'px-2 py-1 rounded text-xs font-mono',
                    s.type === 'direct'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                  )}
                >
                  {s.magnitude}: {s.from}→{s.to} ({s.type === 'direct' ? '↑↑' : '↑↓'})
                </span>
              ))}
            </div>

            {/* Hint button */}
            {!problem.answered && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={handleToggleHint}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-all"
                >
                  <Lightbulb size={16} />
                  <span>{problem.showHint ? 'Ocultar pista' : 'Ver pista'}</span>
                </button>
              </div>
            )}

            {/* Hint */}
            {problem.showHint && !problem.answered && (
              <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 mb-4 animate-fadeIn border border-yellow-200 dark:border-yellow-800">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm font-mono">
                  {problem.hint}
                </p>
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {problem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  disabled={problem.answered}
                  className={cn(
                    'p-4 rounded-xl font-bold text-lg transition-all border-2',
                    problem.answered
                      ? index === problem.correctIndex
                        ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                        : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-400 text-gray-800 dark:text-gray-200'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {problem.answered && (
              <div
                className={cn(
                  'mt-4 p-4 rounded-xl animate-fadeIn',
                  problem.isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                    : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
                )}
              >
                <div className="flex items-start gap-3">
                  {problem.isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  )}
                  <div>
                    <p
                      className={cn(
                        'font-bold',
                        problem.isCorrect
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-amber-700 dark:text-amber-300'
                      )}
                    >
                      {problem.isCorrect ? '¡Correcto!' : 'Incorrecto'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-mono">
                      {problem.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Next button */}
          {problem.answered && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>{currentProblem < problems.length - 1 ? 'Siguiente' : 'Ver Resultados'}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        // Results
        <div className="space-y-6 animate-fadeIn">
          <div
            className={cn(
              'rounded-2xl p-8 text-center',
              passed
                ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
            )}
          >
            {passed ? (
              <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
            ) : (
              <RotateCcw className="w-20 h-20 mx-auto text-amber-500 mb-4" />
            )}

            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {passed ? '¡Excelente trabajo!' : '¡Casi lo logras!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {problems.length}
            </div>

            <p
              className={cn(
                passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}
            >
              {passed
                ? 'Has demostrado que puedes resolver problemas de proporcionalidad compuesta'
                : `Necesitas 4 respuestas correctas. ¡Puedes intentarlo de nuevo!`}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            {!passed && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={18} />
                <span>Intentar de nuevo</span>
              </button>
            )}

            {passed && (
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
              >
                <span>Continuar al Checkpoint</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
