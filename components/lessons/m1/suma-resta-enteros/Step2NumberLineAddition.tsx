'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Check, X, RotateCcw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Problem {
  a: number;
  b: number;
  result: number;
  hint: string;
}

// Progressive difficulty: both positive → mixed → both negative → with zero → opposites
const PROBLEMS: Problem[] = [
  { a: 2, b: 3, result: 5, hint: 'Sumar positivo = mover a la derecha' },
  { a: 4, b: -2, result: 2, hint: 'Sumar negativo = mover a la izquierda' },
  { a: -3, b: 5, result: 2, hint: 'Empezamos en negativo, sumamos positivo' },
  { a: -2, b: -4, result: -6, hint: 'Ambos negativos: movemos a la izquierda desde la izquierda' },
  { a: 0, b: -3, result: -3, hint: 'Desde el cero, sumar negativo va a la izquierda' },
  { a: -5, b: 5, result: 0, hint: 'Números opuestos siempre suman cero' },
];

const REQUIRED_CORRECT = 5;

export default function Step2NumberLineAddition({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [phase, setPhase] = useState<'predict' | 'animating' | 'feedback'>('predict');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const problem = PROBLEMS[currentProblem];
  const isCorrect = selectedAnswer === problem?.result;
  const passed = score >= REQUIRED_CORRECT;

  // Generate answer options for current problem
  const generateOptions = (result: number): number[] => {
    const options = new Set<number>([result]);
    // Add some plausible wrong answers
    options.add(result + 2);
    options.add(result - 2);
    options.add(-result);
    // Ensure we have 4 options
    while (options.size < 4) {
      options.add(result + Math.floor(Math.random() * 6) - 3);
    }
    return Array.from(options).sort((a, b) => a - b);
  };

  const [options, setOptions] = useState<number[]>([]);

  useEffect(() => {
    if (problem) {
      setOptions(generateOptions(problem.result));
    }
  }, [currentProblem]);

  // Animation sequence
  useEffect(() => {
    if (phase === 'animating') {
      const timer = setTimeout(() => {
        if (animationStep < 2) {
          setAnimationStep(prev => prev + 1);
        } else {
          setPhase('feedback');
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, animationStep]);

  const handlePredict = () => {
    if (selectedAnswer === null) return;
    setPhase('animating');
    setAnimationStep(0);

    // Record answer
    const correct = selectedAnswer === problem.result;
    setAnswers(prev => [...prev, correct]);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(prev => prev + 1);
      setPhase('predict');
      setSelectedAnswer(null);
      setAnimationStep(0);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentProblem(0);
    setPhase('predict');
    setSelectedAnswer(null);
    setAnimationStep(0);
    setScore(0);
    setAnswers([]);
    setIsComplete(false);
  };

  if (!isActive) return null;

  // Number line range
  const lineMin = -10;
  const lineMax = 10;
  const lineNumbers = Array.from({ length: lineMax - lineMin + 1 }, (_, i) => lineMin + i);

  // Calculate positions for animation
  const getPosition = (value: number) => {
    return ((value - lineMin) / (lineMax - lineMin)) * 100;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Suma en la Recta Numérica
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Predice dónde caerás y luego observa el movimiento
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {currentProblem + 1} de {PROBLEMS.length}
            </div>
            <div className="flex gap-1">
              {PROBLEMS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all',
                    i < answers.length
                      ? answers[i]
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : i === currentProblem
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700'
                  )}
                >
                  {i < answers.length ? (answers[i] ? '✓' : '✗') : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Problem display */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Calcula:</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              ({problem.a}) + ({problem.b}) = ?
            </p>
          </div>

          {/* Number Line */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md overflow-x-auto">
            <div className="min-w-[600px]">
              {/* The line itself */}
              <div className="relative h-16 mb-4">
                {/* Base line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600 -translate-y-1/2" />

                {/* Tick marks and numbers */}
                {lineNumbers.map(num => (
                  <div
                    key={num}
                    className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                    style={{ left: `${getPosition(num)}%` }}
                  >
                    <div className={cn(
                      'w-0.5 h-4 -mt-2',
                      num === 0 ? 'bg-red-500 h-6' : 'bg-gray-400 dark:bg-gray-500'
                    )} />
                    <span className={cn(
                      'text-xs mt-1',
                      num === 0
                        ? 'font-bold text-red-600 dark:text-red-400'
                        : num < 0
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-green-600 dark:text-green-400'
                    )}>
                      {num}
                    </span>
                  </div>
                ))}

                {/* Starting position marker */}
                {(phase === 'animating' || phase === 'feedback') && (
                  <div
                    className="absolute top-0 -translate-x-1/2 transition-all duration-500"
                    style={{ left: `${getPosition(problem.a)}%` }}
                  >
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                      inicio
                    </span>
                  </div>
                )}

                {/* Movement arrow */}
                {animationStep >= 1 && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 flex items-center transition-all duration-700"
                    style={{
                      left: `${getPosition(Math.min(problem.a, problem.result))}%`,
                      width: `${Math.abs(getPosition(problem.result) - getPosition(problem.a))}%`,
                    }}
                  >
                    <div className={cn(
                      'h-2 w-full rounded-full',
                      problem.b > 0
                        ? 'bg-gradient-to-r from-blue-400 to-green-400'
                        : 'bg-gradient-to-r from-green-400 to-blue-400'
                    )} />
                    {problem.b > 0 ? (
                      <ArrowRight className="w-6 h-6 text-green-500 -ml-1" />
                    ) : (
                      <ArrowLeft className="w-6 h-6 text-blue-500 -ml-1" />
                    )}
                  </div>
                )}

                {/* Result position marker */}
                {animationStep >= 2 && (
                  <div
                    className="absolute -bottom-2 -translate-x-1/2 transition-all duration-500 animate-bounce"
                    style={{ left: `${getPosition(problem.result)}%` }}
                  >
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{problem.result}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Direction labels */}
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <ArrowLeft size={16} />
                  <span>Sumar negativo</span>
                </div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <span>Sumar positivo</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Phase: Predict */}
          {phase === 'predict' && (
            <div className="space-y-4 animate-fadeIn">
              <p className="text-center font-semibold text-purple-700 dark:text-purple-300">
                ¿Dónde crees que caerás en la recta numérica?
              </p>

              {/* Answer options */}
              <div className="grid grid-cols-4 gap-3">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedAnswer(option)}
                    className={cn(
                      'p-4 rounded-xl font-bold text-xl transition-all border-2',
                      selectedAnswer === option
                        ? 'bg-blue-500 text-white border-blue-500 scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-blue-300'
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handlePredict}
                  disabled={selectedAnswer === null}
                  className={cn(
                    'px-8 py-3 rounded-xl font-semibold transition-all',
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  )}
                >
                  Ver el movimiento
                </button>
              </div>
            </div>
          )}

          {/* Phase: Animating */}
          {phase === 'animating' && (
            <div className="text-center py-4 animate-pulse">
              <p className="text-gray-600 dark:text-gray-400">
                Observa el movimiento...
              </p>
            </div>
          )}

          {/* Phase: Feedback */}
          {phase === 'feedback' && (
            <div className="space-y-4 animate-fadeIn">
              <div
                className={cn(
                  'p-4 rounded-xl border-2',
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
                    : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
                )}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className={cn(
                      'font-bold',
                      isCorrect ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
                    )}>
                      {isCorrect ? '¡Correcto!' : `La respuesta es ${problem.result}`}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      {problem.hint}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-mono">
                      ({problem.a}) + ({problem.b}) = {problem.result}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
                >
                  <span>{currentProblem < PROBLEMS.length - 1 ? 'Siguiente' : 'Ver resultados'}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        // Results
        <div className="space-y-6 animate-fadeIn">
          <div className={cn(
            'rounded-2xl p-8 text-center',
            passed
              ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
              : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
          )}>
            {passed ? (
              <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            ) : (
              <RotateCcw className="w-16 h-16 mx-auto text-amber-500 mb-4" />
            )}

            <h3 className={cn(
              'text-2xl font-bold mb-2',
              passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {passed ? '¡Excelente!' : '¡Sigue practicando!'}
            </h3>

            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {score} / {PROBLEMS.length}
            </div>

            <p className={cn(
              'text-sm',
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}>
              {passed
                ? 'Ya entiendes cómo sumar en la recta numérica'
                : `Necesitas ${REQUIRED_CORRECT} para continuar`}
            </p>
          </div>

          {/* Key learning summary */}
          {passed && (
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
              <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">
                Lo que aprendiste:
              </h4>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-green-500" />
                  Sumar un número positivo = mover a la derecha
                </li>
                <li className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 text-blue-500" />
                  Sumar un número negativo = mover a la izquierda
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-500" />
                  Números opuestos siempre suman cero
                </li>
              </ul>
            </div>
          )}

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
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
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
