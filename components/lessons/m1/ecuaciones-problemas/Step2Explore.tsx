'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'translation' | 'keywords' | 'complete';

interface TranslationExample {
  id: string;
  text: string;
  equation: string;
  parts: { phrase: string; math: string }[];
  revealed: boolean;
}

interface KeywordQuestion {
  keyword: string;
  operation: string;
  options: string[];
  correctIndex: number;
  answered: boolean;
  isCorrect: boolean | null;
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('translation');
  const [examples, setExamples] = useState<TranslationExample[]>([
    {
      id: '1',
      text: 'El triple de un número más 4 es igual a 19',
      equation: '3x + 4 = 19',
      parts: [
        { phrase: 'El triple de un número', math: '3x' },
        { phrase: 'más 4', math: '+ 4' },
        { phrase: 'es igual a', math: '=' },
        { phrase: '19', math: '19' },
      ],
      revealed: false,
    },
    {
      id: '2',
      text: 'La mitad de un número menos 3 es 7',
      equation: 'x/2 - 3 = 7',
      parts: [
        { phrase: 'La mitad de un número', math: 'x/2' },
        { phrase: 'menos 3', math: '- 3' },
        { phrase: 'es', math: '=' },
        { phrase: '7', math: '7' },
      ],
      revealed: false,
    },
    {
      id: '3',
      text: 'El doble de la suma de un número y 5 es 16',
      equation: '2(x + 5) = 16',
      parts: [
        { phrase: 'El doble de', math: '2(' },
        { phrase: 'la suma de un número y 5', math: 'x + 5' },
        { phrase: ')', math: ')' },
        { phrase: 'es 16', math: '= 16' },
      ],
      revealed: false,
    },
  ]);

  const [keywords, setKeywords] = useState<KeywordQuestion[]>([
    { keyword: '"el doble de"', operation: '', options: ['x + 2', '2x', 'x/2', 'x - 2'], correctIndex: 1, answered: false, isCorrect: null },
    { keyword: '"la mitad de"', operation: '', options: ['x - 2', 'x + 2', '2x', 'x/2'], correctIndex: 3, answered: false, isCorrect: null },
    { keyword: '"la diferencia entre"', operation: '', options: ['a + b', 'a - b', 'a * b', 'a / b'], correctIndex: 1, answered: false, isCorrect: null },
    { keyword: '"el producto de"', operation: '', options: ['a + b', 'a - b', 'a * b', 'a / b'], correctIndex: 2, answered: false, isCorrect: null },
    { keyword: '"aumentado en"', operation: '', options: ['+', '-', '*', '/'], correctIndex: 0, answered: false, isCorrect: null },
    { keyword: '"disminuido en"', operation: '', options: ['+', '-', '*', '/'], correctIndex: 1, answered: false, isCorrect: null },
  ]);

  const handleRevealExample = (id: string) => {
    setExamples(prev => prev.map(ex => ex.id === id ? { ...ex, revealed: true } : ex));
  };

  const handleKeywordAnswer = (index: number, optionIndex: number) => {
    if (keywords[index].answered) return;

    setKeywords(prev => prev.map((kw, i) =>
      i === index
        ? { ...kw, answered: true, isCorrect: optionIndex === kw.correctIndex }
        : kw
    ));
  };

  const allExamplesRevealed = examples.every(ex => ex.revealed);
  const allKeywordsAnswered = keywords.every(kw => kw.answered);
  const keywordsCorrect = keywords.filter(kw => kw.isCorrect).length;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'translation' && 'Traduce frases a lenguaje matemático'}
          {phase === 'keywords' && 'Aprende las palabras clave'}
          {phase === 'complete' && '¡Excelente trabajo!'}
        </p>
      </div>

      {phase === 'translation' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
            <p className="text-blue-700 dark:text-blue-300">
              Toca cada ejemplo para ver como se traduce a una ecuación
            </p>
          </div>

          {/* Translation examples */}
          <div className="space-y-4">
            {examples.map((example) => (
              <div
                key={example.id}
                className={cn(
                  'bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all cursor-pointer',
                  example.revealed ? 'ring-2 ring-green-400' : 'hover:shadow-lg'
                )}
                onClick={() => handleRevealExample(example.id)}
              >
                {/* Problem text */}
                <p className="text-lg text-gray-800 dark:text-gray-200 mb-4 text-center font-medium">
                  &ldquo;{example.text}&rdquo;
                </p>

                {example.revealed ? (
                  <div className="space-y-4 animate-fadeIn">
                    {/* Parts breakdown */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {example.parts.map((part, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400 px-2">
                            {part.phrase}
                          </span>
                          <span className="text-lg font-mono font-bold text-purple-600 dark:text-purple-400">
                            {part.math}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Final equation */}
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 text-center">
                      <p className="text-sm text-green-600 dark:text-green-400 mb-1">Ecuación:</p>
                      <p className="text-2xl font-mono font-bold text-green-700 dark:text-green-300">
                        {example.equation}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <span className="text-purple-500 text-sm">Toca para revelar la ecuación</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continue button */}
          {allExamplesRevealed && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('keywords')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Palabras Clave</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'keywords' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Instructions */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center">
            <p className="text-purple-700 dark:text-purple-300">
              Selecciona la operación matemática correcta para cada palabra clave
            </p>
          </div>

          {/* Keywords grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keywords.map((kw, index) => (
              <div
                key={index}
                className={cn(
                  'bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md',
                  kw.answered && (kw.isCorrect
                    ? 'ring-2 ring-green-400'
                    : 'ring-2 ring-amber-400')
                )}
              >
                <p className="font-bold text-gray-800 dark:text-gray-200 mb-3 text-center">
                  {kw.keyword}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {kw.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => handleKeywordAnswer(index, optionIndex)}
                      disabled={kw.answered}
                      className={cn(
                        'p-2 rounded-lg font-mono font-bold transition-all',
                        kw.answered
                          ? optionIndex === kw.correctIndex
                            ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {kw.answered && (
                  <div className={cn(
                    'mt-2 text-center text-sm',
                    kw.isCorrect ? 'text-green-600' : 'text-amber-600'
                  )}>
                    {kw.isCorrect ? <Check className="inline mr-1" size={16} /> : <X className="inline mr-1" size={16} />}
                    {kw.isCorrect ? '¡Correcto!' : 'Incorrecto'}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="text-center text-gray-500 dark:text-gray-400">
            {keywords.filter(kw => kw.answered).length} / {keywords.length} respondidas ({keywordsCorrect} correctas)
          </div>

          {/* Complete button */}
          {allKeywordsAnswered && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('complete')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
              >
                <Sparkles size={20} />
                <span>¡Lo logré!</span>
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'complete' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Summary */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                ¡Excelente! Has aprendido a traducir problemas
              </h3>
            </div>

            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p><strong>Palabras clave importantes:</strong></p>
              <div className="grid grid-cols-2 gap-2 ml-2">
                <div className="flex items-center gap-2">
                  <span className="text-purple-600 font-bold">suma, aumentado</span>
                  <span className="font-mono">→ +</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600 font-bold">resta, disminuido</span>
                  <span className="font-mono">→ -</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600 font-bold">doble, triple</span>
                  <span className="font-mono">→ 2x, 3x</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600 font-bold">mitad, tercio</span>
                  <span className="font-mono">→ x/2, x/3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
