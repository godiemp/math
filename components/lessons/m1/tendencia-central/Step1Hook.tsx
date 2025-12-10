'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, Users, HelpCircle, Sparkles, Bus, DollarSign, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'guess' | 'reveal';

// Student budget data - designed to show mean ≠ median
// Mean = 60, Median = 50, Mode = 50
const STUDENTS = [
  { id: 1, name: 'Ana', emoji: '👧', budget: 20 },
  { id: 2, name: 'Bruno', emoji: '👦', budget: 30 },
  { id: 3, name: 'Carla', emoji: '👧', budget: 40 },
  { id: 4, name: 'Diego', emoji: '👦', budget: 40 },
  { id: 5, name: 'Elena', emoji: '👧', budget: 50 },
  { id: 6, name: 'Felipe', emoji: '👦', budget: 50 },
  { id: 7, name: 'Gabi', emoji: '👧', budget: 50 },
  { id: 8, name: 'Hugo', emoji: '👦', budget: 60 },
  { id: 9, name: 'Iris', emoji: '👧', budget: 80 },
  { id: 10, name: 'Juan', emoji: '👦', budget: 180 },
];

const BUDGETS = STUDENTS.map(s => s.budget);

// Calculate measures
function calculateMean(data: number[]) {
  return data.reduce((a, b) => a + b, 0) / data.length;
}

function calculateMedian(data: number[]) {
  const sorted = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

function calculateMode(data: number[]) {
  const freq: Record<number, number> = {};
  data.forEach(n => freq[n] = (freq[n] || 0) + 1);
  const maxFreq = Math.max(...Object.values(freq));
  const modes = Object.entries(freq)
    .filter(([, f]) => f === maxFreq)
    .map(([v]) => Number(v));
  return modes[0]; // Return first mode if multiple
}

const MEAN = calculateMean(BUDGETS);    // 60
const MEDIAN = calculateMedian(BUDGETS); // 50
const MODE = calculateMode(BUDGETS);     // 50

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [guess, setGuess] = useState<number>(50);
  const [hasGuessed, setHasGuessed] = useState(false);

  // Count how many students can afford each measure
  const canAffordMean = useMemo(() =>
    STUDENTS.filter(s => s.budget >= MEAN).length, []
  );
  const canAffordMedian = useMemo(() =>
    STUDENTS.filter(s => s.budget >= MEDIAN).length, []
  );

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Bus className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              Paseo del Curso
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Cuanto es el Aporte Tipico?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Tu clase esta organizando un paseo. Cada estudiante dijo cuanto puede aportar.
          </p>
        </div>

        {/* Students grid with budgets */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <div className="grid grid-cols-5 gap-3">
            {STUDENTS.map((student, index) => (
              <div
                key={student.id}
                className={cn(
                  'flex flex-col items-center p-2 bg-white dark:bg-gray-800 rounded-lg border',
                  student.budget >= 100
                    ? 'border-amber-300 dark:border-amber-600'
                    : 'border-gray-200 dark:border-gray-700',
                  'animate-fadeIn'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-2xl mb-1">{student.emoji}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{student.name}</span>
                <div className={cn(
                  'mt-1 px-2 py-0.5 rounded-full text-sm font-bold',
                  student.budget >= 100
                    ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                    : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                )}>
                  ${student.budget}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The problem */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <div className="flex items-start gap-3">
            <Users className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-purple-800 dark:text-purple-200 font-semibold">
                El problema del coordinador
              </p>
              <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
                Necesita <strong>UN numero</strong> para calcular el presupuesto del paseo.
                ¿Cual seria el aporte &ldquo;tipico&rdquo; de un estudiante?
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('guess')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>Dar mi respuesta</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: GUESS ============
  if (phase === 'guess') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span className="text-amber-700 dark:text-amber-300 font-medium">
              Tu prediccion
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Cual es el aporte tipico?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Mueve el control para elegir tu respuesta
          </p>
        </div>

        {/* Slider */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-4">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              ${guess}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>$20</span>
              <span>$180</span>
            </div>
            <input
              type="range"
              min={20}
              max={180}
              step={10}
              value={guess}
              onChange={(e) => setGuess(Number(e.target.value))}
              disabled={hasGuessed}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-green-300 via-blue-300 to-purple-300"
            />
          </div>

          {/* Reference: show the data again smaller */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 mb-2">Los aportes fueron:</p>
            <div className="flex flex-wrap gap-1">
              {BUDGETS.map((b, i) => (
                <span
                  key={i}
                  className={cn(
                    'px-2 py-0.5 rounded text-xs font-mono',
                    b >= 100
                      ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  )}
                >
                  ${b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {!hasGuessed ? (
          <div className="flex justify-center">
            <button
              onClick={() => setHasGuessed(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <DollarSign size={20} />
              <span>Confirmar ${guess}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
              <p className="text-center text-amber-800 dark:text-amber-200">
                <strong>Interesante eleccion...</strong> Pero hay un problema:
                ¡existen diferentes formas de calcular lo &ldquo;tipico&rdquo; y dan resultados distintos!
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setPhase('reveal')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Ver las 3 respuestas</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 3: REVEAL ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-green-600" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            ¡Sorpresa!
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Tres Formas de Medir lo Tipico
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          El mismo dato puede dar diferentes respuestas
        </p>
      </div>

      {/* Three measures */}
      <div className="space-y-3">
        {/* Mean */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                <span className="text-lg">📊</span>
              </div>
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Si calculamos el PROMEDIO</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">${MEAN}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                <X size={16} />
                <span className="text-sm font-medium">{10 - canAffordMean} no pueden</span>
              </div>
              <p className="text-xs text-gray-500">Solo {canAffordMean}/10 estudiantes</p>
            </div>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
            (20+30+40+40+50+50+50+60+80+180) ÷ 10 = 60
          </p>
        </div>

        {/* Median */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                <span className="text-lg">📍</span>
              </div>
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">Si buscamos el VALOR DEL MEDIO</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">${MEDIAN}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <Check size={16} />
                <span className="text-sm font-medium">{canAffordMedian} pueden pagar</span>
              </div>
              <p className="text-xs text-gray-500">{canAffordMedian}/10 estudiantes</p>
            </div>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">
            Ordenados: 20, 30, 40, 40, <strong>50, 50</strong>, 50, 60, 80, 180 → (50+50)÷2 = 50
          </p>
        </div>

        {/* Mode */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                <span className="text-lg">🔢</span>
              </div>
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400">Si vemos cual SE REPITE MAS</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">${MODE}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                Aparece 3 veces
              </span>
              <p className="text-xs text-gray-500">El mas comun</p>
            </div>
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
            $50 aparece 3 veces (Elena, Felipe, Gabi)
          </p>
        </div>
      </div>

      {/* The problem with mean */}
      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong>¿Por que el promedio es tan alto?</strong> Juan puede aportar $180 (sus papas tienen mas recursos).
          Ese valor &ldquo;extremo&rdquo; sube el promedio, aunque la mayoria solo puede pagar ~$50.
        </p>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-800 dark:text-green-200 font-semibold">
              El gran descubrimiento
            </p>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">
              Estas tres formas de medir &ldquo;lo tipico&rdquo; se llaman <strong>Media</strong>, <strong>Mediana</strong> y <strong>Moda</strong>.
              Cada una responde una pregunta diferente. ¡Vamos a aprender cuando usar cada una!
            </p>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>¡Explorar las medidas!</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
