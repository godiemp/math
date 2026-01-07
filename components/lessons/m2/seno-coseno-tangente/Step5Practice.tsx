'use client';

import { useState } from 'react';
import { Check, X, RotateCcw, ArrowRight, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { TriangleFigure } from '@/components/figures/TriangleFigure';

interface Problem {
  id: string;
  setup: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  visualization: {
    angle: number;
    known: { side: 'opposite' | 'adjacent' | 'hypotenuse'; value: number };
    unknown: 'opposite' | 'adjacent' | 'hypotenuse';
  };
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    setup: 'En un triángulo rectángulo, θ = 30° y la hipotenusa mide 10.',
    question: '¿Cuánto mide el lado opuesto?',
    options: ['5', '8,66', '10', '17,32'],
    correctIndex: 0,
    hint: 'sin(30°) = 0,5 → Opuesto = 0,5 × 10 = 5',
    visualization: { angle: 30, known: { side: 'hypotenuse', value: 10 }, unknown: 'opposite' },
  },
  {
    id: 'p2',
    setup: 'En un triángulo rectángulo, θ = 60° y la hipotenusa mide 8.',
    question: '¿Cuánto mide el lado adyacente?',
    options: ['6,93', '4', '8', '13,86'],
    correctIndex: 1,
    hint: 'cos(60°) = 0,5 → Adyacente = 0,5 × 8 = 4',
    visualization: { angle: 60, known: { side: 'hypotenuse', value: 8 }, unknown: 'adjacent' },
  },
  {
    id: 'p3',
    setup: 'En un triángulo rectángulo, θ = 45° y el lado adyacente mide 6.',
    question: '¿Cuánto mide el lado opuesto?',
    options: ['3', '4,24', '6', '8,49'],
    correctIndex: 2,
    hint: 'tan(45°) = 1 → Opuesto = 1 × 6 = 6',
    visualization: { angle: 45, known: { side: 'adjacent', value: 6 }, unknown: 'opposite' },
  },
  {
    id: 'p4',
    setup: 'En un triángulo rectángulo, θ = 30° y la hipotenusa mide 20.',
    question: '¿Cuánto mide el lado adyacente?',
    options: ['10', '17,32', '20', '11,55'],
    correctIndex: 1,
    hint: 'cos(30°) = 0,866 → Adyacente = 0,866 × 20 ≈ 17,32',
    visualization: { angle: 30, known: { side: 'hypotenuse', value: 20 }, unknown: 'adjacent' },
  },
  {
    id: 'p5',
    setup: 'En un triángulo rectángulo, θ = 60° y el lado opuesto mide 12.',
    question: '¿Cuánto mide la hipotenusa?',
    options: ['6,93', '10,39', '13,86', '24'],
    correctIndex: 2,
    hint: 'sin(60°) = 0,866 → Hipotenusa = 12 ÷ 0,866 ≈ 13,86',
    visualization: { angle: 60, known: { side: 'opposite', value: 12 }, unknown: 'hypotenuse' },
  },
  {
    id: 'p6',
    setup: 'En un triángulo rectángulo, θ = 45° y el lado opuesto mide 7.',
    question: '¿Cuánto mide el lado adyacente?',
    options: ['3,5', '7', '9,9', '14'],
    correctIndex: 1,
    hint: 'tan(45°) = 1 → Adyacente = 7 ÷ 1 = 7',
    visualization: { angle: 45, known: { side: 'opposite', value: 7 }, unknown: 'adjacent' },
  },
  {
    id: 'p7',
    setup: 'En un triángulo rectángulo, θ = 30° y el lado adyacente mide 15.',
    question: '¿Cuánto mide el lado opuesto?',
    options: ['7,5', '8,66', '17,32', '26'],
    correctIndex: 1,
    hint: 'tan(30°) = 0,577 → Opuesto = 0,577 × 15 ≈ 8,66',
    visualization: { angle: 30, known: { side: 'adjacent', value: 15 }, unknown: 'opposite' },
  },
  {
    id: 'p8',
    setup: 'En un triángulo rectángulo, θ = 60° y la hipotenusa mide 14.',
    question: '¿Cuánto mide el lado opuesto?',
    options: ['7', '12,12', '14', '24,25'],
    correctIndex: 1,
    hint: 'sin(60°) = 0,866 → Opuesto = 0,866 × 14 ≈ 12,12',
    visualization: { angle: 60, known: { side: 'hypotenuse', value: 14 }, unknown: 'opposite' },
  },
  {
    id: 'p9',
    setup: 'En un triángulo rectángulo, θ = 45° y la hipotenusa mide 10.',
    question: '¿Cuánto mide el lado adyacente?',
    options: ['5', '7,07', '10', '14,14'],
    correctIndex: 1,
    hint: 'cos(45°) = 0,707 → Adyacente = 0,707 × 10 ≈ 7,07',
    visualization: { angle: 45, known: { side: 'hypotenuse', value: 10 }, unknown: 'adjacent' },
  },
  {
    id: 'p10',
    setup: 'En un triángulo rectángulo, θ = 30° y el lado opuesto mide 4.',
    question: '¿Cuánto mide la hipotenusa?',
    options: ['2', '6,93', '8', '12'],
    correctIndex: 2,
    hint: 'sin(30°) = 0,5 → Hipotenusa = 4 ÷ 0,5 = 8',
    visualization: { angle: 30, known: { side: 'opposite', value: 4 }, unknown: 'hypotenuse' },
  },
];

const REQUIRED_CORRECT = 7;

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [streak, setStreak] = useState(0);

  const problem = PROBLEMS[currentProblem];
  const correctCount = answers.filter((a) => a).length;
  const passed = correctCount >= REQUIRED_CORRECT;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === problem.correctIndex;
    setShowFeedback(true);
    setAnswers((prev) => [...prev, isCorrect]);

    if (isCorrect) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentProblem(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswers([]);
    setIsComplete(false);
    setStreak(0);
  };

  const isCorrect = selectedAnswer === problem?.correctIndex;

  if (!isActive) return null;

  const getSideLabel = (side: 'opposite' | 'adjacent' | 'hypotenuse') => {
    switch (side) {
      case 'opposite':
        return 'Op';
      case 'adjacent':
        return 'Ady';
      case 'hypotenuse':
        return 'Hip';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Practica Calculando
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Necesitas {REQUIRED_CORRECT} de {PROBLEMS.length} correctas para avanzar
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress and streak */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentProblem + 1} de {PROBLEMS.length}
            </div>
            {streak >= 3 && (
              <div className="flex items-center gap-1 text-orange-500 animate-pulse">
                <Flame size={20} />
                <span className="font-bold">{streak} racha</span>
              </div>
            )}
            <div className="flex gap-1">
              {PROBLEMS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    i < answers.length
                      ? answers[i]
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentProblem
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  {i < answers.length ? answers[i] ? '✓' : '✗' : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center mb-4">
              <p className="text-gray-600 dark:text-gray-400 mb-2">{problem.setup}</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{problem.question}</p>
            </div>

            {/* Triangle visualization */}
            <div className="flex justify-center mb-6">
              <svg viewBox="0 0 200 140" className="w-48">
                {/* Triangle */}
                <polygon
                  points="30,120 170,120 170,30"
                  fill="#e0e7ff"
                  fillOpacity="0.5"
                  stroke="#4f46e5"
                  strokeWidth="2"
                />

                {/* Right angle marker */}
                <rect x="158" y="108" width="12" height="12" fill="none" stroke="#4f46e5" strokeWidth="1.5" />

                {/* Angle arc */}
                <path d="M 55 120 A 25 25 0 0 1 48 100" fill="none" stroke="#dc2626" strokeWidth="2" />
                <text x="65" y="110" fontSize="12" fontWeight="bold" fill="#dc2626">
                  {problem.visualization.angle}°
                </text>

                {/* Side labels */}
                <text
                  x="100"
                  y="135"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill={
                    problem.visualization.known.side === 'adjacent'
                      ? '#059669'
                      : problem.visualization.unknown === 'adjacent'
                      ? '#f59e0b'
                      : '#9ca3af'
                  }
                >
                  {problem.visualization.known.side === 'adjacent'
                    ? problem.visualization.known.value
                    : problem.visualization.unknown === 'adjacent'
                    ? '?'
                    : 'Ady'}
                </text>
                <text
                  x="183"
                  y="80"
                  fontSize="11"
                  fontWeight="bold"
                  fill={
                    problem.visualization.known.side === 'opposite'
                      ? '#dc2626'
                      : problem.visualization.unknown === 'opposite'
                      ? '#f59e0b'
                      : '#9ca3af'
                  }
                >
                  {problem.visualization.known.side === 'opposite'
                    ? problem.visualization.known.value
                    : problem.visualization.unknown === 'opposite'
                    ? '?'
                    : 'Op'}
                </text>
                <text
                  x="85"
                  y="65"
                  fontSize="11"
                  fontWeight="bold"
                  fill={
                    problem.visualization.known.side === 'hypotenuse'
                      ? '#7c3aed'
                      : problem.visualization.unknown === 'hypotenuse'
                      ? '#f59e0b'
                      : '#9ca3af'
                  }
                  transform="rotate(-32, 85, 65)"
                >
                  {problem.visualization.known.side === 'hypotenuse'
                    ? problem.visualization.known.value
                    : problem.visualization.unknown === 'hypotenuse'
                    ? '?'
                    : 'Hip'}
                </text>
              </svg>
            </div>

            {/* SOH-CAH-TOA reminder */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 mb-4">
              <p className="text-center text-sm text-blue-800 dark:text-blue-200 font-mono">
                SOH: sin = Op/Hip | CAH: cos = Ady/Hip | TOA: tan = Op/Ady
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {problem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showFeedback}
                  className={cn(
                    'p-4 rounded-xl font-mono font-bold text-lg transition-all border-2',
                    selectedAnswer === index
                      ? showFeedback
                        ? index === problem.correctIndex
                          ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200'
                        : 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                      : showFeedback && index === problem.correctIndex
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-400'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div
                className={cn(
                  'mt-4 p-4 rounded-xl animate-fadeIn',
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                    : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800'
                )}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  )}
                  <div>
                    <p
                      className={cn(
                        'font-bold',
                        isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
                      )}
                    >
                      {isCorrect ? '¡Correcto!' : '¡Casi!'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-mono">{problem.hint}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Check/Next button */}
          <div className="flex justify-center">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>{currentProblem < PROBLEMS.length - 1 ? 'Siguiente' : 'Ver Resultados'}</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </>
      ) : (
        /* Results screen */
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
              <Check className="w-20 h-20 mx-auto text-green-500 mb-4" />
            ) : (
              <RotateCcw className="w-20 h-20 mx-auto text-amber-500 mb-4" />
            )}

            <h3
              className={cn(
                'text-2xl font-bold mb-2',
                passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {passed ? '¡Felicitaciones!' : '¡Casi lo logras!'}
            </h3>

            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {correctCount} / {PROBLEMS.length}
            </div>

            <p className={cn(passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300')}>
              {passed
                ? 'Dominas el cálculo con razones trigonométricas.'
                : `Necesitas ${REQUIRED_CORRECT} respuestas correctas. ¡Puedes intentarlo de nuevo!`}
            </p>
          </div>

          {/* Answer summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="grid grid-cols-5 gap-2">
              {PROBLEMS.map((p, i) => (
                <div
                  key={i}
                  className={cn(
                    'p-2 rounded-lg text-center text-xs',
                    answers[i]
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  )}
                >
                  <div className="font-mono font-bold">P{i + 1}</div>
                  {answers[i] ? <Check size={14} className="mx-auto" /> : <X size={14} className="mx-auto" />}
                </div>
              ))}
            </div>
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
                <span>Continuar</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
