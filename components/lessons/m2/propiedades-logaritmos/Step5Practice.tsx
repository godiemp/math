'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { cn } from '@/lib/utils';

interface Problem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    question: 'Simplifica: log₃(9) + log₃(27)',
    options: ['4', '5', '6', '7'],
    correctAnswer: 1,
    hint: 'Usa la propiedad del producto: suma → multiplica los argumentos',
    explanation: 'log₃(9) + log₃(27) = log₃(9×27) = log₃(243) = log₃(3⁵) = 5',
  },
  {
    id: 'p2',
    question: 'Simplifica: log₂(128) - log₂(4)',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    hint: 'Usa la propiedad del cociente: resta → divide los argumentos',
    explanation: 'log₂(128) - log₂(4) = log₂(128÷4) = log₂(32) = log₂(2⁵) = 5',
  },
  {
    id: 'p3',
    question: 'Simplifica: 2·log₅(25)',
    options: ['2', '4', '8', '10'],
    correctAnswer: 1,
    hint: 'Usa la propiedad de la potencia: el coeficiente pasa como exponente',
    explanation: '2·log₅(25) = log₅(25²) = log₅(625) = log₅(5⁴) = 4',
  },
  {
    id: 'p4',
    question: 'Simplifica: log₁₀(100) + log₁₀(10) - log₁₀(1)',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    hint: 'Recuerda que log₁₀(1) = 0. Combina las propiedades.',
    explanation: 'log(100) + log(10) - log(1) = 2 + 1 - 0 = 3. O también: log(100×10÷1) = log(1000) = 3',
  },
  {
    id: 'p5',
    question: 'Si log₂(x) = 3, ¿cuánto es log₂(x²)?',
    options: ['3', '6', '9', '12'],
    correctAnswer: 1,
    hint: 'Aplica la propiedad de la potencia: log(x²) = 2·log(x)',
    explanation: 'log₂(x²) = 2·log₂(x) = 2×3 = 6',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);

  if (!isActive) return null;

  const problem = PROBLEMS[currentProblem];
  const isCorrect = selectedAnswer === problem.correctAnswer;
  const isComplete = completedProblems.length === PROBLEMS.length;

  const handleCheck = () => {
    setShowFeedback(true);
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    setCompletedProblems([...completedProblems, problem.id]);
    if (currentProblem < PROBLEMS.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    }
  };

  // ============ COMPLETION SCREEN ============
  if (isComplete) {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Práctica completada!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Obtuviste {correctCount} de {PROBLEMS.length} correctas
          </p>
        </div>

        <div className={cn(
          'rounded-2xl p-6 border',
          correctCount >= 4
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
            : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700'
        )}>
          <p className={cn(
            'text-center font-semibold',
            correctCount >= 4
              ? 'text-green-700 dark:text-green-300'
              : 'text-amber-700 dark:text-amber-300'
          )}>
            {correctCount >= 4
              ? '¡Excelente dominio de las propiedades de logaritmos!'
              : '¡Buen intento! Repasa las propiedades y sigue practicando.'}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-center text-sm">
            <Lightbulb className="inline w-4 h-4 mr-1" />
            <strong>Recuerda:</strong> Producto → suma, Cociente → resta, Potencia → multiplicar
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Ir al checkpoint</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PROBLEM SCREEN ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Simplifica Expresiones
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplica las propiedades de los logaritmos
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {PROBLEMS.map((p, i) => (
          <div
            key={p.id}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all',
              completedProblems.includes(p.id)
                ? 'bg-green-500 text-white'
                : i === currentProblem
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
            )}
          >
            {completedProblems.includes(p.id) ? '✓' : i + 1}
          </div>
        ))}
      </div>

      {/* Question */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
        <p className="font-mono text-xl text-center text-gray-800 dark:text-gray-200">
          {problem.question}
        </p>
      </div>

      {/* Hint button */}
      {!showHint && !showFeedback && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowHint(true)}
            className="flex items-center gap-2 px-4 py-2 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-lg transition-all text-sm"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Ver pista</span>
          </button>
        </div>
      )}

      {/* Hint */}
      {showHint && !showFeedback && (
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700 animate-fadeIn">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5" />
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              {problem.hint}
            </p>
          </div>
        </div>
      )}

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {problem.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showFeedback && setSelectedAnswer(index)}
            disabled={showFeedback}
            className={cn(
              'p-4 rounded-xl border-2 font-mono font-medium text-lg transition-all',
              showFeedback
                ? index === problem.correctAnswer
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : index === selectedAnswer
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-400'
                : selectedAnswer === index
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 text-gray-700 dark:text-gray-300'
            )}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={cn(
          'p-4 rounded-xl animate-fadeIn',
          isCorrect
            ? 'bg-green-100 dark:bg-green-900/30'
            : 'bg-amber-100 dark:bg-amber-900/30'
        )}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            )}
            <div>
              <p className={cn(
                'font-semibold',
                isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
              )}>
                {isCorrect ? '¡Perfecto!' : '¡Casi! Veamos:'}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 font-mono">
                {problem.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-center">
        {!showFeedback ? (
          <button
            onClick={handleCheck}
            disabled={selectedAnswer === null}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all',
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
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Siguiente</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
