'use client';

import { useState } from 'react';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { ActionButton } from '@/components/lessons/primitives';

type Phase = 'derivation' | 'anatomy' | 'discriminant';

interface FormulaPart {
  id: string;
  label: string;
  description: string;
  color: string;
}

const FORMULA_PARTS: FormulaPart[] = [
  {
    id: 'neg-b',
    label: '-b',
    description: 'El opuesto del coeficiente lineal. Si b = 5, usamos -5. Si b = -3, usamos 3.',
    color: 'blue',
  },
  {
    id: 'plus-minus',
    label: '±',
    description: 'Significa "más o menos". Nos da DOS soluciones: una con + y otra con -.',
    color: 'purple',
  },
  {
    id: 'discriminant',
    label: 'b² - 4ac',
    description: 'El discriminante. Determina cuántas soluciones reales tiene la ecuación.',
    color: 'teal',
  },
  {
    id: 'two-a',
    label: '2a',
    description: 'El doble del coeficiente cuadrático. Todo el numerador se divide por este valor.',
    color: 'amber',
  },
];

const DISCRIMINANT_CASES = [
  {
    id: 'positive',
    condition: 'b² - 4ac > 0',
    solutions: 'Dos soluciones reales diferentes',
    example: 'x² - 5x + 6 = 0 → Δ = 25 - 24 = 1 > 0',
    result: 'x = 2 y x = 3',
    color: 'green',
  },
  {
    id: 'zero',
    condition: 'b² - 4ac = 0',
    solutions: 'Una solución real (repetida)',
    example: 'x² - 6x + 9 = 0 → Δ = 36 - 36 = 0',
    result: 'x = 3 (doble)',
    color: 'amber',
  },
  {
    id: 'negative',
    condition: 'b² - 4ac < 0',
    solutions: 'No hay soluciones reales',
    example: 'x² + 1 = 0 → Δ = 0 - 4 = -4 < 0',
    result: 'Sin solución real',
    color: 'red',
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('derivation');
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [discoveredParts, setDiscoveredParts] = useState<Set<string>>(new Set());
  const [discoveredCases, setDiscoveredCases] = useState<Set<string>>(new Set());

  const handlePartClick = (partId: string) => {
    setSelectedPart(partId);
    setDiscoveredParts((prev) => new Set([...prev, partId]));
  };

  const handleCaseClick = (caseId: string) => {
    setDiscoveredCases((prev) => new Set([...prev, caseId]));
  };

  const allPartsDiscovered = discoveredParts.size >= FORMULA_PARTS.length;
  const allCasesDiscovered = discoveredCases.size >= DISCRIMINANT_CASES.length;

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Anatomía de la Fórmula
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Descubre de dónde viene y qué significa cada parte
        </p>
      </div>

      {phase === 'derivation' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
              ¿De dónde viene la fórmula?
            </h3>

            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              La fórmula cuadrática se obtiene al <strong>completar el cuadrado</strong> en la ecuación general:
            </p>

            {/* Derivation steps */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <div className="flex-1">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Ecuación general:</p>
                  <p className="font-mono text-lg text-gray-800 dark:text-gray-200">ax² + bx + c = 0</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <div className="flex-1">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Dividimos por a:</p>
                  <p className="font-mono text-lg text-gray-800 dark:text-gray-200">x² + (b/a)x + (c/a) = 0</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-teal-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <div className="flex-1">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Completamos el cuadrado:</p>
                  <p className="font-mono text-lg text-gray-800 dark:text-gray-200">(x + b/2a)² = (b² - 4ac) / 4a²</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <div className="flex-1">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Despejamos x:</p>
                  <p className="font-mono text-lg text-gray-800 dark:text-gray-200">x + b/2a = ±√(b² - 4ac) / 2a</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                <div className="flex-1">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Resultado final:</p>
                  <p className="font-mono text-2xl font-bold text-green-600 dark:text-green-400">x = (-b ± √(b² - 4ac)) / 2a</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mt-4 border border-amber-200 dark:border-amber-700">
              <p className="text-amber-800 dark:text-amber-200 text-center text-sm">
                <strong>¡La fórmula es simplemente completar el cuadrado hecho de una vez!</strong>
                <br />
                Ya no necesitas repetir el proceso cada vez.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={() => setPhase('anatomy')} variant="secondary" icon={<ArrowRight size={20} />}>
              Explorar cada parte
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'anatomy' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Interactive formula */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
              Haz clic en cada parte de la fórmula para aprender qué significa:
            </p>

            {/* Formula with clickable parts */}
            <div className="flex justify-center items-center flex-wrap gap-2 text-2xl font-mono mb-6">
              <span className="text-gray-700 dark:text-gray-300">x =</span>
              <span className="text-gray-700 dark:text-gray-300">(</span>
              <button
                onClick={() => handlePartClick('neg-b')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedPart === 'neg-b'
                    ? 'bg-blue-500 text-white scale-110'
                    : discoveredParts.has('neg-b')
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                }`}
              >
                -b
              </button>
              <button
                onClick={() => handlePartClick('plus-minus')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedPart === 'plus-minus'
                    ? 'bg-purple-500 text-white scale-110'
                    : discoveredParts.has('plus-minus')
                      ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                }`}
              >
                ±
              </button>
              <span className="text-gray-700 dark:text-gray-300">√(</span>
              <button
                onClick={() => handlePartClick('discriminant')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedPart === 'discriminant'
                    ? 'bg-teal-500 text-white scale-110'
                    : discoveredParts.has('discriminant')
                      ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/30'
                }`}
              >
                b² - 4ac
              </button>
              <span className="text-gray-700 dark:text-gray-300">)) /</span>
              <button
                onClick={() => handlePartClick('two-a')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedPart === 'two-a'
                    ? 'bg-amber-500 text-white scale-110'
                    : discoveredParts.has('two-a')
                      ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/30'
                }`}
              >
                2a
              </button>
            </div>

            {/* Description panel */}
            {selectedPart ? (
              <div
                className={`rounded-xl p-4 animate-fadeIn ${
                  selectedPart === 'neg-b'
                    ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
                    : selectedPart === 'plus-minus'
                      ? 'bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700'
                      : selectedPart === 'discriminant'
                        ? 'bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700'
                        : 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Check className={`w-5 h-5 flex-shrink-0 ${
                    selectedPart === 'neg-b'
                      ? 'text-blue-600 dark:text-blue-400'
                      : selectedPart === 'plus-minus'
                        ? 'text-purple-600 dark:text-purple-400'
                        : selectedPart === 'discriminant'
                          ? 'text-teal-600 dark:text-teal-400'
                          : 'text-amber-600 dark:text-amber-400'
                  }`} />
                  <div>
                    <p className={`font-bold mb-1 ${
                      selectedPart === 'neg-b'
                        ? 'text-blue-700 dark:text-blue-300'
                        : selectedPart === 'plus-minus'
                          ? 'text-purple-700 dark:text-purple-300'
                          : selectedPart === 'discriminant'
                            ? 'text-teal-700 dark:text-teal-300'
                            : 'text-amber-700 dark:text-amber-300'
                    }`}>
                      {FORMULA_PARTS.find((p) => p.id === selectedPart)?.label}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {FORMULA_PARTS.find((p) => p.id === selectedPart)?.description}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Haz clic en una parte coloreada para ver su significado
                </p>
              </div>
            )}

            {/* Progress */}
            <div className="flex justify-center gap-2 mt-4">
              {FORMULA_PARTS.map((part) => (
                <div
                  key={part.id}
                  className={`w-3 h-3 rounded-full transition-all ${
                    discoveredParts.has(part.id)
                      ? part.id === 'neg-b'
                        ? 'bg-blue-500'
                        : part.id === 'plus-minus'
                          ? 'bg-purple-500'
                          : part.id === 'discriminant'
                            ? 'bg-teal-500'
                            : 'bg-amber-500'
                      : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {allPartsDiscovered && (
            <div className="flex justify-center animate-fadeIn">
              <ActionButton onClick={() => setPhase('discriminant')} variant="secondary" icon={<ArrowRight size={20} />}>
                Explorar el discriminante
              </ActionButton>
            </div>
          )}
        </div>
      )}

      {phase === 'discriminant' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-2xl p-6 border border-teal-200 dark:border-teal-800">
            <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-200 mb-2">
              El Discriminante: b² - 4ac
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              El valor dentro de la raíz determina cuántas soluciones tiene la ecuación
            </p>

            {/* Discriminant cases */}
            <div className="space-y-4">
              {DISCRIMINANT_CASES.map((caseItem) => (
                <button
                  key={caseItem.id}
                  onClick={() => handleCaseClick(caseItem.id)}
                  className={`w-full text-left rounded-xl p-4 transition-all ${
                    discoveredCases.has(caseItem.id)
                      ? caseItem.color === 'green'
                        ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700'
                        : caseItem.color === 'amber'
                          ? 'bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-300 dark:border-amber-700'
                          : 'bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-600'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      caseItem.color === 'green'
                        ? 'bg-green-100 dark:bg-green-900/50'
                        : caseItem.color === 'amber'
                          ? 'bg-amber-100 dark:bg-amber-900/50'
                          : 'bg-red-100 dark:bg-red-900/50'
                    }`}>
                      {discoveredCases.has(caseItem.id) ? (
                        <Check className={`w-5 h-5 ${
                          caseItem.color === 'green'
                            ? 'text-green-600 dark:text-green-400'
                            : caseItem.color === 'amber'
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-red-600 dark:text-red-400'
                        }`} />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-mono font-bold mb-1 ${
                        caseItem.color === 'green'
                          ? 'text-green-700 dark:text-green-300'
                          : caseItem.color === 'amber'
                            ? 'text-amber-700 dark:text-amber-300'
                            : 'text-red-700 dark:text-red-300'
                      }`}>
                        {caseItem.condition}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">
                        {caseItem.solutions}
                      </p>
                      {discoveredCases.has(caseItem.id) && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 animate-fadeIn">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ejemplo:</p>
                          <p className="font-mono text-sm text-gray-600 dark:text-gray-400">{caseItem.example}</p>
                          <p className={`font-mono font-bold mt-1 ${
                            caseItem.color === 'green'
                              ? 'text-green-600 dark:text-green-400'
                              : caseItem.color === 'amber'
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-red-600 dark:text-red-400'
                          }`}>
                            → {caseItem.result}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Progress */}
            <div className="flex justify-center gap-2 mt-6">
              {DISCRIMINANT_CASES.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className={`w-3 h-3 rounded-full transition-all ${
                    discoveredCases.has(caseItem.id)
                      ? caseItem.color === 'green'
                        ? 'bg-green-500'
                        : caseItem.color === 'amber'
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {allCasesDiscovered && (
            <div className="flex justify-center animate-fadeIn">
              <ActionButton onClick={onComplete} variant="secondary" icon={<ArrowRight size={20} />}>
                Continuar
              </ActionButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
