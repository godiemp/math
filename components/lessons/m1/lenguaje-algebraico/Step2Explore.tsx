'use client';

import { useState } from 'react';
import { ArrowRight, Check, BookOpen, Shuffle } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { InlineMath } from '@/components/math/MathDisplay';
import { ActionButton } from '@/components/lessons/primitives';

type Phase = 'dictionary' | 'phrases' | 'matching' | 'complete';

interface DictionaryEntry {
  id: string;
  spanish: string;
  algebraic: string;
  example: string;
  revealed: boolean;
}

interface MatchingPair {
  id: string;
  phrase: string;
  expression: string;
  matched: boolean;
}

const DICTIONARY_ENTRIES: DictionaryEntry[] = [
  { id: 'add', spanish: 'más, suma, aumentado en', algebraic: '+', example: 'x + 5', revealed: false },
  { id: 'sub', spanish: 'menos, diferencia, disminuido en', algebraic: '-', example: 'x - 3', revealed: false },
  { id: 'mul', spanish: 'por, veces, producto', algebraic: '\\times', example: '4x', revealed: false },
  { id: 'div', spanish: 'dividido, cociente, entre', algebraic: '\\div', example: '\\frac{x}{2}', revealed: false },
  { id: 'var', spanish: 'un número, una cantidad', algebraic: 'x', example: 'x', revealed: false },
  { id: 'double', spanish: 'el doble', algebraic: '2 \\cdot', example: '2x', revealed: false },
  { id: 'triple', spanish: 'el triple', algebraic: '3 \\cdot', example: '3x', revealed: false },
  { id: 'half', spanish: 'la mitad', algebraic: '\\div 2', example: '\\frac{x}{2}', revealed: false },
];

const MATCHING_PAIRS: MatchingPair[] = [
  { id: 'm1', phrase: 'Un número más siete', expression: 'x + 7', matched: false },
  { id: 'm2', phrase: 'El doble de un número', expression: '2x', matched: false },
  { id: 'm3', phrase: 'Un número menos cuatro', expression: 'x - 4', matched: false },
  { id: 'm4', phrase: 'La mitad de un número', expression: '\\frac{x}{2}', matched: false },
  { id: 'm5', phrase: 'Tres veces un número', expression: '3x', matched: false },
  { id: 'm6', phrase: 'Un número dividido por cinco', expression: '\\frac{x}{5}', matched: false },
];

// Pre-shuffled expressions (fixed order to avoid runtime shuffle)
const SHUFFLED_EXPRESSIONS = ['\\frac{x}{2}', 'x + 7', '3x', '\\frac{x}{5}', 'x - 4', '2x'];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('dictionary');
  const [dictionary, setDictionary] = useState(DICTIONARY_ENTRIES);
  const [matchingPairs, setMatchingPairs] = useState(MATCHING_PAIRS);
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);
  const [matchFeedback, setMatchFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  if (!isActive) return null;

  const allDictionaryRevealed = dictionary.every((entry) => entry.revealed);
  const allMatched = matchingPairs.every((pair) => pair.matched);

  const handleRevealEntry = (id: string) => {
    setDictionary((prev) => prev.map((entry) => (entry.id === id ? { ...entry, revealed: true } : entry)));
  };

  const handleSelectPhrase = (id: string) => {
    setSelectedPhrase(id);
    setMatchFeedback(null);
  };

  const handleSelectExpression = (expression: string) => {
    if (!selectedPhrase) return;

    const pair = matchingPairs.find((p) => p.id === selectedPhrase);
    if (pair && pair.expression === expression) {
      setMatchingPairs((prev) => prev.map((p) => (p.id === selectedPhrase ? { ...p, matched: true } : p)));
      setMatchFeedback({ message: '¡Correcto!', isError: false });
      setSelectedPhrase(null);
    } else {
      setMatchFeedback({ message: '¡Casi! Intenta de nuevo.', isError: true });
    }
  };


  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">El Diccionario Algebraico</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'dictionary' && 'Descubre cómo se traducen las palabras a símbolos'}
          {phase === 'phrases' && 'Practica con frases completas'}
          {phase === 'matching' && 'Une cada frase con su expresión algebraica'}
          {phase === 'complete' && '¡Excelente trabajo!'}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2">
        {['dictionary', 'phrases', 'matching', 'complete'].map((p, i) => (
          <div
            key={p}
            className={`w-3 h-3 rounded-full transition-colors ${
              phase === p
                ? 'bg-purple-500'
                : ['dictionary', 'phrases', 'matching', 'complete'].indexOf(phase) > i
                  ? 'bg-green-500'
                  : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>

      {phase === 'dictionary' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="font-medium text-purple-700 dark:text-purple-300">
                Haz clic en cada entrada para revelar su traducción
              </span>
            </div>
          </div>

          <div className="grid gap-3">
            {dictionary.map((entry) => (
              <button
                key={entry.id}
                onClick={() => handleRevealEntry(entry.id)}
                disabled={entry.revealed}
                className={`w-full text-left rounded-xl p-4 transition-all ${
                  entry.revealed
                    ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700'
                    : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 dark:text-gray-200">{entry.spanish}</p>
                    {entry.revealed && (
                      <div className="mt-2 animate-fadeIn">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">
                            <InlineMath latex={entry.algebraic} />
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Ejemplo: <InlineMath latex={entry.example} />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  {entry.revealed && <Check className="w-6 h-6 text-green-500 flex-shrink-0" />}
                </div>
              </button>
            ))}
          </div>

          {allDictionaryRevealed && (
            <div className="flex justify-center">
              <ActionButton onClick={() => setPhase('phrases')} icon={<ArrowRight size={20} />}>
                Practicar con frases
              </ActionButton>
            </div>
          )}
        </div>
      )}

      {phase === 'phrases' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Frases comunes y sus traducciones:</h3>

            <div className="space-y-4">
              {[
                { phrase: 'Un número aumentado en 8', translation: 'x + 8' },
                { phrase: 'La diferencia entre un número y 5', translation: 'x - 5' },
                { phrase: 'El producto de 4 y un número', translation: '4x' },
                { phrase: 'Un número dividido entre 3', translation: '\\frac{x}{3}' },
                { phrase: 'El triple de un número, menos 2', translation: '3x - 2' },
                { phrase: 'La mitad de un número, más 7', translation: '\\frac{x}{2} + 7' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                >
                  <span className="text-gray-700 dark:text-gray-300">{item.phrase}</span>
                  <span className="text-lg">
                    <InlineMath latex={item.translation} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('matching')} icon={<Shuffle size={20} />}>
              Jugar a emparejar
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'matching' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
            <p className="text-amber-700 dark:text-amber-300 text-center">
              Selecciona una frase, luego selecciona su expresión algebraica correspondiente
            </p>
          </div>

          {matchFeedback && (
            <div
              className={`p-3 rounded-lg text-center font-medium ${
                matchFeedback.isError
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              }`}
            >
              {matchFeedback.message}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Phrases column */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-600 dark:text-gray-400 text-center mb-2">Frases</h4>
              {matchingPairs.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => !pair.matched && handleSelectPhrase(pair.id)}
                  disabled={pair.matched}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    pair.matched
                      ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-400 dark:border-green-600 opacity-60'
                      : selectedPhrase === pair.id
                        ? 'bg-purple-100 dark:bg-purple-900/40 border-2 border-purple-500'
                        : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400'
                  }`}
                >
                  <span className={pair.matched ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'}>
                    {pair.phrase}
                  </span>
                  {pair.matched && <Check className="inline-block ml-2 w-5 h-5 text-green-500" />}
                </button>
              ))}
            </div>

            {/* Expressions column */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-600 dark:text-gray-400 text-center mb-2">Expresiones</h4>
              {SHUFFLED_EXPRESSIONS.map((expression) => {
                const isMatched = matchingPairs.some((p) => p.expression === expression && p.matched);
                return (
                  <button
                    key={expression}
                    onClick={() => !isMatched && selectedPhrase && handleSelectExpression(expression)}
                    disabled={isMatched || !selectedPhrase}
                    className={`w-full text-center p-4 rounded-xl text-xl transition-all ${
                      isMatched
                        ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-400 dark:border-green-600 opacity-60'
                        : selectedPhrase
                          ? 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer'
                          : 'bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <InlineMath latex={expression} />
                    {isMatched && <Check className="inline-block ml-2 w-5 h-5 text-green-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {allMatched && (
            <div className="flex justify-center">
              <ActionButton onClick={() => setPhase('complete')} icon={<ArrowRight size={20} />}>
                Ver resumen
              </ActionButton>
            </div>
          )}
        </div>
      )}

      {phase === 'complete' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">¡Excelente trabajo!</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Has aprendido el diccionario básico del lenguaje algebraico.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Recuerda estas traducciones clave:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">más/suma</span>
                  <InlineMath latex="+" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">menos/diferencia</span>
                  <InlineMath latex="-" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">por/veces</span>
                  <InlineMath latex="\times" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">dividido/entre</span>
                  <InlineMath latex="\div" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">un número</span>
                  <InlineMath latex="x" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">el doble</span>
                  <InlineMath latex="2x" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} variant="secondary" icon={<ArrowRight size={20} />}>
              Continuar
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
