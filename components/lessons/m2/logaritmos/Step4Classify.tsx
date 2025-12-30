'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type FormType = 'exponential' | 'logarithmic';

interface Expression {
  id: string;
  expression: string;
  type: FormType;
  explanation: string;
}

const EXPRESSIONS: Expression[] = [
  { id: 'e1', expression: '2⁵ = 32', type: 'exponential', explanation: 'La forma es base^exponente = resultado' },
  { id: 'e2', expression: 'log₃(27) = 3', type: 'logarithmic', explanation: 'Usa la notación log_base(número) = exponente' },
  { id: 'e3', expression: '10⁴ = 10000', type: 'exponential', explanation: '10 elevado a 4 es 10000' },
  { id: 'e4', expression: 'log(100) = 2', type: 'logarithmic', explanation: 'log base 10 de 100 es 2' },
  { id: 'e5', expression: '5³ = 125', type: 'exponential', explanation: 'Base 5, exponente 3, resultado 125' },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<FormType | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<{ id: string; correct: boolean }[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  if (!isActive) return null;

  const currentExpression = EXPRESSIONS[currentIndex];
  const isCorrect = selectedAnswer === currentExpression?.type;

  const handleCheck = () => {
    setShowFeedback(true);
    const newResults = [...results, { id: currentExpression.id, correct: isCorrect }];
    setResults(newResults);

    setTimeout(() => {
      if (currentIndex < EXPRESSIONS.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setIsComplete(true);
      }
    }, 1500);
  };

  const correctCount = results.filter(r => r.correct).length;

  // ============ COMPLETION SCREEN ============
  if (isComplete) {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4',
            correctCount >= 4 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
          )}>
            {correctCount >= 4 ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-700 dark:text-green-300 font-medium">
                  ¡Excelente trabajo!
                </span>
              </>
            ) : (
              <>
                <span className="text-amber-700 dark:text-amber-300 font-medium">
                  ¡Buen intento!
                </span>
              </>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Clasificación Completada
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Acertaste {correctCount} de {EXPRESSIONS.length}
          </p>
        </div>

        {/* Results summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Resumen:</h3>
          <div className="space-y-2">
            {EXPRESSIONS.map((expr, i) => {
              const result = results.find(r => r.id === expr.id);
              return (
                <div
                  key={expr.id}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg',
                    result?.correct
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : 'bg-red-50 dark:bg-red-900/20'
                  )}
                >
                  {result?.correct ? (
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                  <span className="font-mono text-gray-700 dark:text-gray-300">{expr.expression}</span>
                  <span className={cn(
                    'ml-auto text-sm font-medium px-2 py-1 rounded',
                    expr.type === 'exponential'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  )}>
                    {expr.type === 'exponential' ? 'Exponencial' : 'Logarítmica'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key reminder */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200 dark:border-purple-700">
          <p className="text-center text-gray-700 dark:text-gray-300">
            <strong className="text-blue-600">Exponencial:</strong> base<sup>exp</sup> = resultado
            <span className="mx-4">|</span>
            <strong className="text-purple-600">Logarítmica:</strong> log<sub>base</sub>(resultado) = exp
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Continuar a practicar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ CLASSIFICATION SCREEN ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica la Forma
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¿Es forma exponencial o logarítmica?
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-2">
        {EXPRESSIONS.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              i < currentIndex
                ? results[i]?.correct ? 'bg-green-500' : 'bg-red-500'
                : i === currentIndex
                ? 'bg-blue-500 scale-125'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Expression card */}
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <p className="text-center text-gray-500 dark:text-gray-400 mb-2">
          Expresión {currentIndex + 1} de {EXPRESSIONS.length}
        </p>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center">
          <p className="font-mono text-3xl text-gray-800 dark:text-gray-200">
            {currentExpression.expression}
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => !showFeedback && setSelectedAnswer('exponential')}
          disabled={showFeedback}
          className={cn(
            'p-6 rounded-xl border-2 transition-all',
            showFeedback
              ? currentExpression.type === 'exponential'
                ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                : selectedAnswer === 'exponential'
                ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                : 'border-gray-200 dark:border-gray-700 opacity-50'
              : selectedAnswer === 'exponential'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
          )}
        >
          <p className="text-lg font-bold text-blue-600 mb-2">Exponencial</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            base<sup>exp</sup> = resultado
          </p>
        </button>

        <button
          onClick={() => !showFeedback && setSelectedAnswer('logarithmic')}
          disabled={showFeedback}
          className={cn(
            'p-6 rounded-xl border-2 transition-all',
            showFeedback
              ? currentExpression.type === 'logarithmic'
                ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                : selectedAnswer === 'logarithmic'
                ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                : 'border-gray-200 dark:border-gray-700 opacity-50'
              : selectedAnswer === 'logarithmic'
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
              : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
          )}
        >
          <p className="text-lg font-bold text-purple-600 mb-2">Logarítmica</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            log<sub>base</sub>(res) = exp
          </p>
        </button>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={cn(
          'p-4 rounded-xl animate-fadeIn',
          isCorrect
            ? 'bg-green-100 dark:bg-green-900/30'
            : 'bg-red-100 dark:bg-red-900/30'
        )}>
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <X className="w-5 h-5 text-red-600" />
            )}
            <div>
              <p className={cn(
                'font-semibold',
                isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
              )}>
                {isCorrect ? '¡Correcto!' : 'No exactamente'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentExpression.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Check button */}
      {!showFeedback && (
        <div className="flex justify-center">
          <button
            onClick={handleCheck}
            disabled={selectedAnswer === null}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        </div>
      )}
    </div>
  );
}
