'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, RotateCcw, Check, X, Trophy, Flame, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

// Timing constants
const FEEDBACK_DELAY_CORRECT = 2000;
const FEEDBACK_DELAY_INCORRECT = 3000;

interface MultiplicationProblem {
  a: number;
  b: number;
  answer: number;
}

// Generate problems with increasing difficulty
const PROBLEMS: MultiplicationProblem[] = [
  { a: 2, b: 3, answer: 6 },           // Easy: positive × positive
  { a: -2, b: 3, answer: -6 },         // Mixed
  { a: 4, b: -2, answer: -8 },         // Mixed
  { a: -3, b: -2, answer: 6 },         // Both negative
  { a: -5, b: 1, answer: -5 },         // Identity
  { a: -4, b: -3, answer: 12 },        // Both negative
  { a: 6, b: -2, answer: -12 },        // Larger numbers
  { a: -7, b: 2, answer: -14 },        // Mixed
  { a: -5, b: -4, answer: 20 },        // Both negative, larger
  { a: -8, b: -1, answer: 8 },         // Identity with negative
];

const REQUIRED_CORRECT = 8;
const TOTAL_QUESTIONS = 10;

type ErrorType = 'sign' | 'magnitude' | 'both' | null;

interface AnswerRecord {
  correct: boolean;
  errorType: ErrorType;
}

// Analyze error type
function getErrorType(selected: number, correct: number): ErrorType {
  if (selected === correct) return null;

  const sameSign = (selected > 0 && correct > 0) || (selected < 0 && correct < 0);
  const sameMagnitude = Math.abs(selected) === Math.abs(correct);

  if (sameMagnitude && !sameSign) return 'sign';
  if (sameSign && !sameMagnitude) return 'magnitude';
  return 'both';
}

// Generate options for a problem (one correct, three distractors)
function generateOptions(problem: MultiplicationProblem): number[] {
  const correct = problem.answer;
  const options = new Set<number>([correct]);

  // Add wrong sign version (common mistake)
  options.add(-correct);

  // Add nearby wrong answers
  const absAnswer = Math.abs(correct);
  if (absAnswer > 1) {
    options.add(absAnswer - 1);
    options.add(-(absAnswer - 1));
  }
  options.add(absAnswer + 1);
  options.add(-(absAnswer + 1));

  // Common mistakes: addition instead of multiplication
  options.add(problem.a + problem.b);
  options.add(-(problem.a + problem.b));

  // Convert to array and take 4 options (including correct)
  const optionsArray = Array.from(options).slice(0, 4);

  // If we don't have 4, pad with more
  while (optionsArray.length < 4) {
    const random = Math.floor(Math.random() * 20) - 10;
    if (!optionsArray.includes(random)) {
      optionsArray.push(random);
    }
  }

  // Shuffle
  return optionsArray.sort(() => Math.random() - 0.5);
}

// Get feedback message based on error type
function getErrorFeedback(errorType: ErrorType, correctAnswer: number): string {
  const formattedAnswer = correctAnswer > 0 ? `+${correctAnswer}` : `${correctAnswer}`;

  switch (errorType) {
    case 'sign':
      return `¡Cuidado con el signo! La respuesta es ${formattedAnswer}`;
    case 'magnitude':
      return `Signo correcto, pero revisa el cálculo. Es ${formattedAnswer}`;
    case 'both':
      return `La respuesta correcta es ${formattedAnswer}`;
    default:
      return `La respuesta era ${formattedAnswer}`;
  }
}

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [errorType, setErrorType] = useState<ErrorType>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [options, setOptions] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  const currentProblem = PROBLEMS[currentIndex];

  // Generate options when problem changes
  useEffect(() => {
    if (currentProblem) {
      setOptions(generateOptions(currentProblem));
      setShowHint(false);
    }
  }, [currentIndex, currentProblem]);

  const handleAnswer = useCallback((answer: number) => {
    if (showFeedback || isComplete) return;

    const correct = answer === currentProblem.answer;
    const error = getErrorType(answer, currentProblem.answer);

    setSelectedAnswer(answer);
    setErrorType(error);
    setShowFeedback(true);
    setAnswers(prev => [...prev, { correct, errorType: error }]);

    if (correct) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    // Longer delay for incorrect to allow reading feedback
    const delay = correct ? FEEDBACK_DELAY_CORRECT : FEEDBACK_DELAY_INCORRECT;

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setErrorType(null);
      if (currentIndex < TOTAL_QUESTIONS - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, delay);
  }, [currentIndex, currentProblem, showFeedback, isComplete]);

  // Keyboard shortcuts (1-4 for options)
  useEffect(() => {
    if (!isActive || showFeedback || isComplete || options.length === 0) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const key = parseInt(e.key);
      if (key >= 1 && key <= 4 && options[key - 1] !== undefined) {
        handleAnswer(options[key - 1]);
      }
      // 'h' for hint
      if (e.key === 'h' && !showHint) {
        setShowHint(true);
        setHintsUsed(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, showFeedback, isComplete, options, handleAnswer, showHint]);

  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setErrorType(null);
    setIsComplete(false);
    setAnswers([]);
    setStreak(0);
    setShowHint(false);
    setHintsUsed(0);
  };

  const handleHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  const passed = score >= REQUIRED_CORRECT;

  // Count error types for summary
  const signErrors = answers.filter(a => a.errorType === 'sign').length;
  const magnitudeErrors = answers.filter(a => a.errorType === 'magnitude').length;

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica de Multiplicación
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplica las reglas de signos. ¡Usa teclas 1-4, o H para pista!
        </p>
      </div>

      {!isComplete ? (
        <>
          {/* Progress and streak */}
          <div className="flex items-center justify-between px-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Pregunta {currentIndex + 1} de {TOTAL_QUESTIONS}
            </div>
            <div className="flex items-center gap-4">
              {streak >= 3 && (
                <div className="flex items-center gap-1 text-orange-500 animate-pulse" role="status" aria-label={`Racha de ${streak} respuestas correctas`}>
                  <Flame className="w-5 h-5" />
                  <span className="font-bold">×{streak}</span>
                </div>
              )}
              <div className="text-sm font-bold text-green-600 dark:text-green-400">
                Correctas: {score}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={TOTAL_QUESTIONS}>
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
            />
          </div>

          {/* Answer indicators */}
          <div className="flex justify-center gap-1" aria-label="Historial de respuestas">
            {Array(TOTAL_QUESTIONS).fill(0).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all',
                  i < answers.length
                    ? answers[i].correct
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : i === currentIndex
                    ? 'bg-blue-500 text-white animate-pulse'
                    : 'bg-gray-200 dark:bg-gray-700'
                )}
                aria-label={i < answers.length ? (answers[i].correct ? 'Correcta' : 'Incorrecta') : `Pregunta ${i + 1}`}
              >
                {i < answers.length ? (answers[i].correct ? '✓' : '✗') : i + 1}
              </div>
            ))}
          </div>

          {/* Problem display */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2" aria-label={`${currentProblem.a} multiplicado por ${currentProblem.b}`}>
              <span className={currentProblem.a < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                ({currentProblem.a})
              </span>
              <span className="text-gray-400 mx-3">×</span>
              <span className={currentProblem.b < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                ({currentProblem.b})
              </span>
              <span className="text-gray-400 mx-3">=</span>
              <span className="text-blue-600 dark:text-blue-400">?</span>
            </div>

            {/* Sign hint (always visible) */}
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {currentProblem.a < 0 && currentProblem.b < 0 && '(−) × (−) → signos iguales'}
              {currentProblem.a > 0 && currentProblem.b > 0 && '(+) × (+) → signos iguales'}
              {currentProblem.a < 0 && currentProblem.b > 0 && '(−) × (+) → signos diferentes'}
              {currentProblem.a > 0 && currentProblem.b < 0 && '(+) × (−) → signos diferentes'}
            </div>

            {/* Detailed hint (on request) */}
            {showHint && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg animate-fadeIn">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  <strong>Pista:</strong> El resultado es{' '}
                  {currentProblem.answer > 0 ? 'positivo (+)' : 'negativo (−)'}.
                  Calcula {Math.abs(currentProblem.a)} × {Math.abs(currentProblem.b)} = {Math.abs(currentProblem.answer)}
                </p>
              </div>
            )}
          </div>

          {/* Hint button */}
          {!showHint && !showFeedback && (
            <div className="flex justify-center">
              <button
                onClick={handleHint}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-yellow-600 transition-colors"
                aria-label="Mostrar pista"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Necesito una pista (H)</span>
              </button>
            </div>
          )}

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto" role="group" aria-label="Opciones de respuesta">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
                aria-label={`Opción ${index + 1}: ${option}`}
                className={cn(
                  'relative p-4 rounded-xl text-2xl font-bold transition-all shadow-md',
                  showFeedback && option === currentProblem.answer
                    ? 'bg-green-500 text-white ring-4 ring-green-300 scale-105'
                    : showFeedback && selectedAnswer === option && option !== currentProblem.answer
                    ? 'bg-red-500 text-white scale-95'
                    : showFeedback
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:scale-105'
                )}
              >
                <span className="absolute top-1 left-2 text-xs text-gray-400 font-normal">
                  {index + 1}
                </span>
                {option}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={cn(
              'text-center py-4 px-6 rounded-xl animate-fadeIn',
              selectedAnswer === currentProblem.answer
                ? 'bg-green-100 dark:bg-green-900/30'
                : 'bg-amber-100 dark:bg-amber-900/30'
            )} role="alert">
              <div className="flex items-center justify-center gap-2">
                {selectedAnswer === currentProblem.answer ? (
                  <>
                    <Check className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-green-800 dark:text-green-300">
                      ¡Correcto!
                      {streak >= 3 && ` 🔥 ¡${streak} en racha!`}
                    </span>
                  </>
                ) : (
                  <>
                    <X className="w-6 h-6 text-amber-600" />
                    <span className="font-bold text-amber-800 dark:text-amber-300">
                      {getErrorFeedback(errorType, currentProblem.answer)}
                    </span>
                  </>
                )}
              </div>
              {/* Additional tip for sign errors */}
              {errorType === 'sign' && (
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
                  Recuerda: signos iguales = (+), signos diferentes = (−)
                </p>
              )}
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
            <div className="mb-4">
              {passed ? (
                <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
              ) : (
                <RotateCcw className="w-16 h-16 mx-auto text-amber-500" />
              )}
            </div>

            <h3 className={cn(
              'text-2xl font-bold mb-2',
              passed ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'
            )}>
              {passed ? '¡Excelente trabajo!' : '¡Casi lo logras!'}
            </h3>

            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {score} / {TOTAL_QUESTIONS}
            </div>

            <p className={cn(
              'text-sm',
              passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
            )}>
              {passed
                ? 'Has dominado las reglas de signos en la multiplicación'
                : `Necesitas ${REQUIRED_CORRECT} correctas para continuar. ¡Inténtalo de nuevo!`}
            </p>
          </div>

          {/* Error analysis */}
          {(signErrors > 0 || magnitudeErrors > 0) && (
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Análisis de errores:</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                {signErrors > 0 && (
                  <li>• {signErrors} error{signErrors > 1 ? 'es' : ''} de signo - Repasa las reglas de signos</li>
                )}
                {magnitudeErrors > 0 && (
                  <li>• {magnitudeErrors} error{magnitudeErrors > 1 ? 'es' : ''} de cálculo - Practica las tablas de multiplicar</li>
                )}
                {hintsUsed > 0 && (
                  <li className="text-gray-500">• Usaste {hintsUsed} pista{hintsUsed > 1 ? 's' : ''}</li>
                )}
              </ul>
            </div>
          )}

          {/* Answer summary */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Resumen:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {PROBLEMS.map((problem, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg',
                    answers[i]?.correct ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                  )}
                >
                  {answers[i]?.correct ? (
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                  )}
                  <span className="text-gray-700 dark:text-gray-300">
                    ({problem.a}) × ({problem.b}) = {problem.answer}
                  </span>
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
