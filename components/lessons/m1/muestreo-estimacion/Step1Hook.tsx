'use client';

import { useState } from 'react';
import { ArrowRight, Store, HelpCircle, Check, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { POPULATION_SIZE, DEFAULT_SAMPLE_SIZE, PREFERENCE_COLORS } from './data';

type Phase = 'scenario' | 'question' | 'reveal' | 'result';

// Mini population grid visualization
function PopulationGrid({
  showSample = false,
  sampleIndices = [],
}: {
  showSample?: boolean;
  sampleIndices?: number[];
}) {
  // Show a 20x10 grid representing simplified population (200 shown, representing 800)
  const gridSize = 200;
  const cols = 20;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="grid gap-0.5"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: gridSize }).map((_, i) => {
          const isInSample = showSample && sampleIndices.includes(i);
          return (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-sm transition-all duration-300',
                isInSample
                  ? 'bg-amber-500 scale-125 z-10'
                  : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          );
        })}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Cada cuadrado = 4 estudiantes ({gridSize} cuadrados = {POPULATION_SIZE} estudiantes)
      </p>
    </div>
  );
}

// Sample result visualization
function SampleResult() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
        Resultados de la Muestra (40 estudiantes)
      </h4>
      <div className="flex justify-center gap-4">
        <div className="text-center">
          <div className="text-3xl mb-1">{PREFERENCE_COLORS.galletas.emoji}</div>
          <div className="text-2xl font-bold text-amber-600">24</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Galletas</div>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-1">{PREFERENCE_COLORS.papas.emoji}</div>
          <div className="text-2xl font-bold text-red-600">12</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Papas</div>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-1">{PREFERENCE_COLORS.frutas.emoji}</div>
          <div className="text-2xl font-bold text-green-600">4</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Frutas</div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          <span className="font-bold text-amber-600">24/40 = 60%</span> prefieren Galletas
        </p>
      </div>
    </div>
  );
}

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  if (!isActive) return null;

  const options = [
    `Exactamente 480 estudiantes prefieren Galletas (60% de ${POPULATION_SIZE})`,
    'Aproximadamente 60% prefiere Galletas, pero podría variar',
    `No podemos saber nada con solo ${DEFAULT_SAMPLE_SIZE} estudiantes`,
    'Necesitan preguntar a todos para estar seguros',
  ];
  const correctAnswer = 1; // Approximately 60%, but could vary

  // Generate sample indices for visualization (first 10 of 200 grid squares)
  const sampleIndices = [12, 34, 56, 78, 91, 103, 125, 147, 169, 182];

  // ============ PHASE 1: SCENARIO ============
  if (phase === 'scenario') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <Store className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span className="text-amber-700 dark:text-amber-300 font-medium">
              La Encuesta del Kiosko
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Dilema del Inventario
          </h2>
        </div>

        {/* Story setup */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            El kiosko del colegio necesita decidir cuánto inventario comprar de cada snack.
            Quieren saber qué porcentaje de estudiantes prefiere cada opción:
          </p>
          <div className="flex justify-center gap-6 my-4">
            <div className="text-center">
              <span className="text-4xl">{PREFERENCE_COLORS.galletas.emoji}</span>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Galletas</p>
            </div>
            <div className="text-center">
              <span className="text-4xl">{PREFERENCE_COLORS.papas.emoji}</span>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Papas Fritas</p>
            </div>
            <div className="text-center">
              <span className="text-4xl">{PREFERENCE_COLORS.frutas.emoji}</span>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Frutas</p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>El problema:</strong> Hay <strong>{POPULATION_SIZE} estudiantes</strong> en el
            colegio. Preguntar a todos tomaría semanas...
          </p>
        </div>

        {/* Population visualization */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
            Todos los estudiantes del colegio (preferencia desconocida)
          </p>
          <PopulationGrid showSample={false} />
        </div>

        {/* Solution hint */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-center">
            <strong>La solución:</strong> Preguntar solo a{' '}
            <strong>{DEFAULT_SAMPLE_SIZE} estudiantes</strong> elegidos al azar y usar su
            respuesta para <em>estimar</em> lo que piensa todo el colegio.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>Ver los resultados</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: QUESTION ============
  if (phase === 'question') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300 font-medium">
              Tu Predicción
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Qué pueden concluir?
          </h2>
        </div>

        {/* Sample result */}
        <SampleResult />

        {/* The question */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <p className="text-purple-800 dark:text-purple-200 text-center">
            Con estos resultados, ¿qué puede concluir el kiosko sobre los{' '}
            <strong>{POPULATION_SIZE} estudiantes</strong>?
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              className={cn(
                'w-full p-4 rounded-xl border-2 text-left transition-all',
                selectedAnswer === index
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0',
                    selectedAnswer === index
                      ? 'border-purple-500 bg-purple-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-400'
                  )}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-sm">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('reveal')}
            disabled={selectedAnswer === null}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            )}
          >
            <span>Verificar</span>
            <Check size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: REVEAL ============
  if (phase === 'reveal') {
    const isCorrect = selectedAnswer === correctAnswer;

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4',
              isCorrect
                ? 'bg-green-100 dark:bg-green-900/30'
                : 'bg-amber-100 dark:bg-amber-900/30'
            )}
          >
            {isCorrect ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-700 dark:text-green-300 font-medium">
                  ¡Exactamente!
                </span>
              </>
            ) : (
              <>
                <X className="w-5 h-5 text-amber-600" />
                <span className="text-amber-700 dark:text-amber-300 font-medium">
                  ¡Casi! Piénsalo de nuevo
                </span>
              </>
            )}
          </div>
        </div>

        <div
          className={cn(
            'rounded-xl p-5 border',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
              : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700'
          )}
        >
          {isCorrect ? (
            <p className="text-green-800 dark:text-green-200">
              <strong>¡Correcto!</strong> La muestra nos da una <em>estimación aproximada</em>, no
              un valor exacto. El 60% de la muestra sugiere que alrededor del 60% de todos los
              estudiantes prefiere Galletas, pero otra muestra podría dar 55% o 65%.
            </p>
          ) : selectedAnswer === 0 ? (
            <p className="text-amber-800 dark:text-amber-200">
              <strong>No tan rápido...</strong> Aunque matemáticamente 60% de 800 = 480, una
              muestra de solo 40 estudiantes no garantiza que exactamente 480 prefieran Galletas.
              ¡Podría ser 450, 500, u otro número cercano!
            </p>
          ) : selectedAnswer === 2 ? (
            <p className="text-amber-800 dark:text-amber-200">
              <strong>¡Sí podemos saber algo!</strong> Aunque 40 parece poco comparado con 800,
              una muestra aleatoria bien tomada sí nos da información útil sobre la población.
              No será exacta, pero será una buena estimación.
            </p>
          ) : (
            <p className="text-amber-800 dark:text-amber-200">
              <strong>No es necesario.</strong> Preguntar a todos sería ideal pero poco práctico.
              El poder del muestreo es que una muestra pequeña bien seleccionada puede darnos una
              buena idea de toda la población.
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('result')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: RESULT ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            El Concepto Clave
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Esto es Muestreo
        </h2>
      </div>

      {/* Visual showing sample from population */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
          Una muestra (resaltada) de la población completa
        </p>
        <PopulationGrid showSample={true} sampleIndices={sampleIndices} />
      </div>

      {/* Key concept card */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200 dark:border-green-700">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-green-800 dark:text-green-200 mb-2">Muestreo</p>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Es el proceso de seleccionar una <strong>muestra</strong> (un subconjunto pequeño)
              de una <strong>población</strong> (el grupo completo) para{' '}
              <strong>estimar</strong> características de toda la población sin tener que
              estudiarla completa.
            </p>
          </div>
        </div>
      </div>

      {/* Why it matters */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <p className="text-blue-800 dark:text-blue-200 text-center text-sm">
          <strong>¿Por qué es útil?</strong> Encuestas políticas, control de calidad en fábricas,
          estudios médicos... todos usan muestreo para conocer poblaciones grandes de forma
          rápida y económica.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>Experimentar con muestras</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
