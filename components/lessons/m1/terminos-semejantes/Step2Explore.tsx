'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'anatomy' | 'special-cases' | 'sorting' | 'complete';

interface TermPart {
  id: 'coefficient' | 'variable' | 'exponent';
  label: string;
  description: string;
  color: string;
}

const TERM_PARTS: TermPart[] = [
  { id: 'coefficient', label: '5', description: 'COEFICIENTE - El número que multiplica. Dice "cuántos hay"', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/50' },
  { id: 'variable', label: 'x', description: 'VARIABLE - Representa un número desconocido', color: 'text-green-600 bg-green-100 dark:bg-green-900/50' },
  { id: 'exponent', label: '²', description: 'EXPONENTE - Cuántas veces se multiplica la variable', color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/50' },
];

interface SpecialCase {
  term: string;
  question: string;
  answer: string;
  revealed: boolean;
}

interface SortingTerm {
  id: string;
  term: string;
  category: string;
  placed: boolean;
}

const SORTING_TERMS: SortingTerm[] = [
  { id: '1', term: '3x²', category: 'x²', placed: false },
  { id: '2', term: '-5y', category: 'y', placed: false },
  { id: '3', term: '8', category: 'const', placed: false },
  { id: '4', term: '2x²', category: 'x²', placed: false },
  { id: '5', term: '-x', category: 'x', placed: false },
  { id: '6', term: '4y', category: 'y', placed: false },
  { id: '7', term: '7x', category: 'x', placed: false },
  { id: '8', term: '-3', category: 'const', placed: false },
];

const CATEGORIES = [
  { id: 'x²', label: 'Términos con x²', color: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700' },
  { id: 'x', label: 'Términos con x', color: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700' },
  { id: 'y', label: 'Términos con y', color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700' },
  { id: 'const', label: 'Constantes', color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700' },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('anatomy');
  const [revealedParts, setRevealedParts] = useState<Set<string>>(new Set());
  const [specialCases, setSpecialCases] = useState<SpecialCase[]>([
    { term: 'x', question: '¿Dónde está el coeficiente?', answer: 'Coeficiente 1 está implícito: 1x', revealed: false },
    { term: '7', question: '¿Dónde está la variable?', answer: 'Es una constante: coeficiente 7, sin variable', revealed: false },
    { term: '-4m', question: '¿Cuál es el coeficiente?', answer: 'El signo es parte del coeficiente: -4', revealed: false },
  ]);
  const [sortingTerms, setSortingTerms] = useState(SORTING_TERMS);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [sortingFeedback, setSortingFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  const handleRevealPart = (partId: string) => {
    setRevealedParts(prev => new Set([...prev, partId]));
  };

  const handleRevealSpecialCase = (index: number) => {
    setSpecialCases(prev => prev.map((c, i) => i === index ? { ...c, revealed: true } : c));
  };

  const handleSelectTerm = (termId: string) => {
    const term = sortingTerms.find(t => t.id === termId);
    if (term?.placed) return;
    setSelectedTerm(termId);
    setSortingFeedback(null);
  };

  const handlePlaceInCategory = (categoryId: string) => {
    if (!selectedTerm) return;

    const term = sortingTerms.find(t => t.id === selectedTerm);
    if (!term) return;

    if (term.category === categoryId) {
      // Correct placement
      setSortingTerms(prev => prev.map(t => t.id === selectedTerm ? { ...t, placed: true } : t));
      setSortingFeedback({ message: '¡Correcto!', isError: false });
    } else {
      // Wrong placement
      setSortingFeedback({ message: 'Intenta de nuevo. Fíjate en la variable y su exponente.', isError: true });
    }
    setSelectedTerm(null);
  };

  const allTermsPlaced = sortingTerms.every(t => t.placed);
  const allPartsRevealed = revealedParts.size === 3;
  const allSpecialCasesRevealed = specialCases.every(c => c.revealed);

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Anatomía de un Término
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'anatomy' && 'Descubre las partes de un término algebraico'}
          {phase === 'special-cases' && 'Casos especiales que debes conocer'}
          {phase === 'sorting' && 'Clasifica los términos según su variable'}
          {phase === 'complete' && '¡Excelente trabajo!'}
        </p>
      </div>

      {phase === 'anatomy' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Interactive term */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Toca cada parte del término para descubrir su nombre:
            </p>

            <div className="flex justify-center items-baseline mb-8">
              {/* Coefficient */}
              <button
                onClick={() => handleRevealPart('coefficient')}
                className={cn(
                  'transition-all duration-300 rounded-lg px-3 py-2 text-5xl',
                  revealedParts.has('coefficient')
                    ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/50'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400'
                )}
              >
                5
              </button>
              {/* Variable with exponent as superscript */}
              <div className="relative">
                <button
                  onClick={() => handleRevealPart('variable')}
                  className={cn(
                    'transition-all duration-300 rounded-lg px-3 py-2 text-5xl',
                    revealedParts.has('variable')
                      ? 'text-green-600 bg-green-100 dark:bg-green-900/50'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400'
                  )}
                >
                  x
                </button>
                <button
                  onClick={() => handleRevealPart('exponent')}
                  className={cn(
                    'absolute -top-2 -right-4 transition-all duration-300 rounded-lg px-2 py-1 text-2xl',
                    revealedParts.has('exponent')
                      ? 'text-purple-600 bg-purple-100 dark:bg-purple-900/50'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400'
                  )}
                >
                  2
                </button>
              </div>
            </div>

            {/* Revealed descriptions */}
            <div className="space-y-3">
              {TERM_PARTS.map(part => (
                revealedParts.has(part.id) && (
                  <div
                    key={part.id}
                    className={cn(
                      'p-3 rounded-lg animate-fadeIn',
                      part.color
                    )}
                  >
                    <span className="font-semibold">{part.description}</span>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Continue button */}
          {allPartsRevealed && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('special-cases')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Casos Especiales</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'special-cases' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid gap-4">
            {specialCases.map((specialCase, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-mono font-bold text-gray-800 dark:text-gray-200">
                    {specialCase.term}
                  </span>
                  {!specialCase.revealed ? (
                    <button
                      onClick={() => handleRevealSpecialCase(index)}
                      className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors font-medium"
                    >
                      {specialCase.question}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Check size={20} />
                      <span className="font-medium">Revelado</span>
                    </div>
                  )}
                </div>

                {specialCase.revealed && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 animate-fadeIn">
                    <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                      {specialCase.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continue button */}
          {allSpecialCasesRevealed && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('sorting')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Juego de Clasificación</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'sorting' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Feedback */}
          {sortingFeedback && (
            <div
              className={cn(
                'p-4 rounded-xl text-center animate-fadeIn',
                sortingFeedback.isError
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              )}
            >
              {sortingFeedback.isError ? <X className="inline mr-2" size={20} /> : <Check className="inline mr-2" size={20} />}
              {sortingFeedback.message}
            </div>
          )}

          {/* Terms to sort */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 text-center">
              Selecciona un término y luego elige su categoría:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {sortingTerms.map(term => (
                <button
                  key={term.id}
                  onClick={() => handleSelectTerm(term.id)}
                  disabled={term.placed}
                  className={cn(
                    'px-4 py-2 rounded-lg font-mono font-bold text-lg transition-all',
                    term.placed
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-default'
                      : selectedTerm === term.id
                      ? 'bg-purple-500 text-white ring-4 ring-purple-300 dark:ring-purple-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  )}
                >
                  {term.placed ? <Check className="inline" size={16} /> : term.term}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 gap-4">
            {CATEGORIES.map(category => {
              const termsInCategory = sortingTerms.filter(t => t.placed && t.category === category.id);
              return (
                <button
                  key={category.id}
                  onClick={() => handlePlaceInCategory(category.id)}
                  disabled={!selectedTerm}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all min-h-[100px]',
                    category.color,
                    selectedTerm
                      ? 'cursor-pointer hover:ring-4 hover:ring-purple-300 dark:hover:ring-purple-700'
                      : 'cursor-default opacity-75'
                  )}
                >
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {category.label}
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {termsInCategory.map(term => (
                      <span
                        key={term.id}
                        className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-sm font-mono"
                      >
                        {term.term}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Progress */}
          <div className="text-center text-gray-500 dark:text-gray-400">
            {sortingTerms.filter(t => t.placed).length} / {sortingTerms.length} términos clasificados
          </div>

          {/* Complete button */}
          {allTermsPlaced && (
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
                ¡Excelente! Has aprendido a clasificar términos
              </h3>
            </div>

            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p><strong>Reglas que descubriste:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><span className="text-green-600">Misma variable</span> = semejantes (3x y -5x)</li>
                <li><span className="text-purple-600">Mismo exponente</span> = semejantes (2x² y 7x²)</li>
                <li><span className="text-red-600">Diferentes variables</span> = NO semejantes (3x y 4y)</li>
                <li><span className="text-red-600">Diferentes exponentes</span> = NO semejantes (x y x²)</li>
              </ul>
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
