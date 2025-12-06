'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, RotateCcw, Check, X, Trophy, Divide, Lightbulb, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

// Timing constants
const FEEDBACK_DELAY_CORRECT = 2000;
const FEEDBACK_DELAY_INCORRECT = 3000;

interface DivisionProblem {
  a: number;
  b: number;
  answer: number;
}

const PROBLEMS: DivisionProblem[] = [
  { a: 6, b: 2, answer: 3 },           // Easy: positive ÷ positive
  { a: -6, b: 2, answer: -3 },         // Mixed
  { a: 8, b: -2, answer: -4 },         // Mixed
  { a: -12, b: -3, answer: 4 },        // Both negative
  { a: -10, b: 2, answer: -5 },        // Mixed
  { a: 15, b: -5, answer: -3 },        // Mixed
  { a: -16, b: -4, answer: 4 },        // Both negative
  { a: -20, b: 5, answer: -4 },        // Mixed
];

const REQUIRED_CORRECT = 6;
const TOTAL_QUESTIONS = 8;

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

function generateOptions(problem: DivisionProblem): number[] {
  const correct = problem.answer;
  const options = new Set<number>([correct]);

  // Add wrong sign version
  options.add(-correct);

  // Add nearby wrong answers
  const absAnswer = Math.abs(correct);
  options.add(absAnswer + 1);
  options.add(-(absAnswer + 1));
  if (absAnswer > 1) {
    options.add(absAnswer - 1);
    options.add(-(absAnswer - 1));
  }

  const optionsArray = Array.from(options).slice(0, 4);

  while (optionsArray.length < 4) {
    const random = Math.floor(Math.random() * 10) - 5;
    if (!optionsArray.includes(random) && random !== 0) {
      optionsArray.push(random);
    }
  }

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

export default function Step5Division({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<'intro' | 'practice' | 'results'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [errorType, setErrorType] = useState<ErrorType>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [options, setOptions] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  const currentProblem = PROBLEMS[currentIndex];
  const passed = score >= REQUIRED_CORRECT;

  // Count error types for summary
  const signErrors = answers.filter(a => a.errorType === 'sign').length;
  const magnitudeErrors = answers.filter(a => a.errorType === 'magnitude').length;

  useEffect(() => {
    if (currentProblem && phase === 'practice') {
      setOptions(generateOptions(currentProblem));
      setShowHint(false);
    }
  }, [currentIndex, phase, currentProblem]);

  const handleAnswer = useCallback((answer: number) => {
    if (showFeedback || phase !== 'practice') return;

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
        setPhase('results');
      }
    }, delay);
  }, [currentIndex, currentProblem, showFeedback, phase]);

  useEffect(() => {
    if (!isActive || showFeedback || phase !== 'practice' || options.length === 0) return;

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
  }, [isActive, showFeedback, phase, options, handleAnswer, showHint]);

  const handleReset = () => {
    setPhase('practice');
    setCurrentIndex(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setErrorType(null);
    setAnswers([]);
    setStreak(0);
    setShowHint(false);
    setHintsUsed(0);
  };

  const handleHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  if (!isActive) return null;

  // Intro phase
  if (phase === 'intro') {
    return (
      <div className="space-y-8 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            División con Signos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Buenas noticias! Las mismas reglas aplican
          </p>
        </div>

        {/* Key insight */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Dato clave
            </h3>
          </div>

          <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-4">
            La división es la operación inversa de la multiplicación, <br/>
            así que usa las <strong>mismas reglas de signos</strong>.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Si multiplicar da cierto signo, dividir da el mismo:
            </p>
            <div className="grid grid-cols-2 gap-4 text-lg font-mono">
              <div>
                <p className="text-green-600">3 × 2 = 6</p>
                <p className="text-green-600">6 ÷ 2 = 3</p>
              </div>
              <div>
                <p className="text-red-600">(−3) × 2 = −6</p>
                <p className="text-red-600">(−6) ÷ 2 = −3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rules reminder */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Divide className="w-6 h-6" />
            Reglas para División
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-bold text-lg">Signos iguales</p>
              <p className="text-2xl">= +</p>
              <p className="text-sm opacity-90">(+)÷(+) o (−)÷(−)</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-bold text-lg">Signos diferentes</p>
              <p className="text-2xl">= −</p>
              <p className="text-sm opacity-90">(+)÷(−) o (−)÷(+)</p>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
            Ejemplos
          </h3>
          <div className="space-y-3 text-center font-mono text-lg">
            <p>
              <span className="text-green-600">(12)</span> ÷ <span className="text-green-600">(3)</span> = <span className="text-green-600 font-bold">4</span>
              <span className="text-gray-400 text-sm ml-2">(iguales → +)</span>
            </p>
            <p>
              <span className="text-red-600">(−12)</span> ÷ <span className="text-green-600">(3)</span> = <span className="text-red-600 font-bold">−4</span>
              <span className="text-gray-400 text-sm ml-2">(diferentes → −)</span>
            </p>
            <p>
              <span className="text-green-600">(12)</span> ÷ <span className="text-red-600">(−3)</span> = <span className="text-red-600 font-bold">−4</span>
              <span className="text-gray-400 text-sm ml-2">(diferentes → −)</span>
            </p>
            <p>
              <span className="text-red-600">(−12)</span> ÷ <span className="text-red-600">(−3)</span> = <span className="text-green-600 font-bold">4</span>
              <span className="text-gray-400 text-sm ml-2">(iguales → +)</span>
            </p>
          </div>
        </div>

        {/* Start practice button */}
        <div className="flex justify-center">
          <button
            onClick={() => setPhase('practice')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Practicar División</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // Practice phase
  if (phase === 'practice') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Práctica de División
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Aplica las reglas de signos. ¡Usa teclas 1-4, o H para pista!
          </p>
        </div>

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
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
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
                  ? 'bg-green-500 text-white animate-pulse'
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
          <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2" aria-label={`${currentProblem.a} dividido por ${currentProblem.b}`}>
            <span className={currentProblem.a < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
              ({currentProblem.a})
            </span>
            <span className="text-gray-400 mx-3">÷</span>
            <span className={currentProblem.b < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
              ({currentProblem.b})
            </span>
            <span className="text-gray-400 mx-3">=</span>
            <span className="text-blue-600 dark:text-blue-400">?</span>
          </div>

          {/* Sign hint */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {currentProblem.a < 0 && currentProblem.b < 0 && '(−) ÷ (−) → signos iguales'}
            {currentProblem.a > 0 && currentProblem.b > 0 && '(+) ÷ (+) → signos iguales'}
            {currentProblem.a < 0 && currentProblem.b > 0 && '(−) ÷ (+) → signos diferentes'}
            {currentProblem.a > 0 && currentProblem.b < 0 && '(+) ÷ (−) → signos diferentes'}
          </div>

          {/* Detailed hint (on request) */}
          {showHint && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg animate-fadeIn">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                <strong>Pista:</strong> El resultado es{' '}
                {currentProblem.answer > 0 ? 'positivo (+)' : 'negativo (−)'}.
                Calcula {Math.abs(currentProblem.a)} ÷ {Math.abs(currentProblem.b)} = {Math.abs(currentProblem.answer)}
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
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-green-50 dark:hover:bg-green-900/30 hover:scale-105'
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
      </div>
    );
  }

  // Results phase
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
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
          {passed ? '¡Excelente!' : '¡Casi lo logras!'}
        </h3>

        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {score} / {TOTAL_QUESTIONS}
        </div>

        <p className={cn(
          'text-sm',
          passed ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
        )}>
          {passed
            ? 'Has dominado la división con signos'
            : `Necesitas ${REQUIRED_CORRECT} correctas para continuar.`}
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
              <li>• {magnitudeErrors} error{magnitudeErrors > 1 ? 'es' : ''} de cálculo - Practica la división</li>
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
                ({problem.a}) ÷ ({problem.b}) = {problem.answer}
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
            <span>Continuar al Checkpoint</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
