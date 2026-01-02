'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { cn } from '@/lib/utils';

interface Problem {
  id: string;
  context: string;
  emoji: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    context: 'Richter',
    emoji: '🌋',
    question: 'El terremoto de Valdivia 1960 tuvo magnitud 9.5. Un temblor de magnitud 5.5 se sintió ayer. ¿Cuántas veces más amplitud tuvo Valdivia?',
    options: ['400 veces', '4.000 veces', '40.000 veces', '10.000 veces'],
    correctAnswer: 3,
    hint: 'Diferencia = 9.5 - 5.5 = 4 puntos. Cada punto = 10× amplitud.',
    explanation: 'Diferencia de 4 puntos → 10⁴ = 10.000 veces más amplitud.',
  },
  {
    id: 'p2',
    context: 'Decibeles',
    emoji: '🔊',
    question: 'Una biblioteca tiene 40 dB y una calle concurrida 70 dB. ¿Cuántas veces más intenso es el ruido de la calle?',
    options: ['30 veces', '100 veces', '1.000 veces', '30.000 veces'],
    correctAnswer: 2,
    hint: '70 - 40 = 30 dB. Cada 10 dB = 10× intensidad.',
    explanation: '30 dB de diferencia = 10³ = 1.000 veces más intenso.',
  },
  {
    id: 'p3',
    context: 'pH',
    emoji: '🧪',
    question: 'El jugo de limón tiene pH 2 y la leche tiene pH 6. ¿Cuántas veces más ácido es el limón?',
    options: ['4 veces', '100 veces', '1.000 veces', '10.000 veces'],
    correctAnswer: 3,
    hint: 'Diferencia de pH = 6 - 2 = 4 puntos. ¡Recuerda que pH menor = más ácido!',
    explanation: '4 puntos de diferencia en pH = 10⁴ = 10.000 veces más concentración de H⁺.',
  },
  {
    id: 'p4',
    context: 'Decibeles',
    emoji: '🔊',
    question: 'Si aumentamos un sonido de 60 dB a 80 dB, la intensidad aumentó:',
    options: ['2 veces', '20 veces', '100 veces', '200 veces'],
    correctAnswer: 2,
    hint: '20 dB de aumento. ¿Cuántas veces 10× hay en 20 dB?',
    explanation: '20 dB = 2 grupos de 10 dB = 10² = 100 veces más intenso.',
  },
  {
    id: 'p5',
    context: 'Richter',
    emoji: '🌋',
    question: 'Si un terremoto libera 10.000 veces más energía que otro, ¿cuántos puntos más tiene en la escala Richter?',
    options: ['2 puntos', '3 puntos', '4 puntos', '5 puntos'],
    correctAnswer: 2,
    hint: '10.000 = 10⁴. Invierte el proceso: ¿qué exponente da 10.000?',
    explanation: '10.000 = 10⁴, entonces la diferencia es 4 puntos en la escala.',
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
              ? '¡Excelente manejo de las escalas logarítmicas!'
              : '¡Buen intento! Repasa las fórmulas y sigue practicando.'}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-center text-sm">
            <Lightbulb className="inline w-4 h-4 mr-1" />
            <strong>Recuerda:</strong> Diferencia en escala → Factor = 10^(diferencia ÷ paso)
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
          Resuelve Problemas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplica las escalas logarítmicas a situaciones reales
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

      {/* Context badge */}
      <div className="flex justify-center">
        <div className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-full',
          problem.context === 'Richter' && 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
          problem.context === 'Decibeles' && 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
          problem.context === 'pH' && 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
        )}>
          <span className="text-xl">{problem.emoji}</span>
          <span className="font-medium">{problem.context}</span>
        </div>
      </div>

      {/* Question */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
        <p className="text-gray-800 dark:text-gray-200">
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
              'p-4 rounded-xl border-2 font-medium transition-all',
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
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
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
