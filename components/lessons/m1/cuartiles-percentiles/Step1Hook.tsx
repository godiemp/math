'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, Trophy, HelpCircle, Sparkles, Medal, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'guess' | 'reveal';

// Student test score data - designed to illustrate quartiles clearly
// Ordered: 45, 52, 58, 62, 68, 72, 78, 85, 88, 95
const STUDENTS = [
  { id: 1, name: 'Ana', emoji: '👧', score: 72 },
  { id: 2, name: 'Bruno', emoji: '👦', score: 85 },
  { id: 3, name: 'Carla', emoji: '👧', score: 58 },
  { id: 4, name: 'Diego', emoji: '👦', score: 95 },
  { id: 5, name: 'Elena', emoji: '👧', score: 45 },
  { id: 6, name: 'Felipe', emoji: '👦', score: 68 },
  { id: 7, name: 'Gabi', emoji: '👧', score: 88 },
  { id: 8, name: 'Hugo', emoji: '👦', score: 52 },
  { id: 9, name: 'Iris', emoji: '👧', score: 78 },
  { id: 10, name: 'Juan', emoji: '👦', score: 62 },
];

const SCORES = STUDENTS.map(s => s.score);
const SORTED_SCORES = [...SCORES].sort((a, b) => a - b);

// Calculate quartiles
function calculateQuartiles(data: number[]) {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;

  // Q2 (median)
  const mid = Math.floor(n / 2);
  const q2 = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  // Q1 (median of lower half)
  const lowerHalf = sorted.slice(0, mid);
  const q1Mid = Math.floor(lowerHalf.length / 2);
  const q1 = lowerHalf.length % 2 !== 0
    ? lowerHalf[q1Mid]
    : (lowerHalf[q1Mid - 1] + lowerHalf[q1Mid]) / 2;

  // Q3 (median of upper half)
  const upperHalf = n % 2 !== 0 ? sorted.slice(mid + 1) : sorted.slice(mid);
  const q3Mid = Math.floor(upperHalf.length / 2);
  const q3 = upperHalf.length % 2 !== 0
    ? upperHalf[q3Mid]
    : (upperHalf[q3Mid - 1] + upperHalf[q3Mid]) / 2;

  return { q1, q2, q3 };
}

const QUARTILES = calculateQuartiles(SCORES);
// Q1 = 55, Q2 = 70, Q3 = 86.5

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedQuartile, setSelectedQuartile] = useState<number | null>(null);

  const sortedStudents = useMemo(() =>
    [...STUDENTS].sort((a, b) => a.score - b.score), []
  );

  // Count students in each quartile
  const quartileGroups = useMemo(() => {
    const groups = {
      bottom25: sortedStudents.filter(s => s.score <= QUARTILES.q1),
      middle50: sortedStudents.filter(s => s.score > QUARTILES.q1 && s.score <= QUARTILES.q3),
      top25: sortedStudents.filter(s => s.score > QUARTILES.q3),
    };
    return groups;
  }, [sortedStudents]);

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <Trophy className="w-5 h-5 text-amber-600" />
            <span className="text-amber-700 dark:text-amber-300 font-medium">
              El Ranking de la Clase
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Quien esta en el Top 25%?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Estos son los puntajes de la ultima prueba de matematicas.
          </p>
        </div>

        {/* Students grid with scores */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <div className="grid grid-cols-5 gap-3">
            {STUDENTS.map((student, index) => (
              <div
                key={student.id}
                className={cn(
                  'flex flex-col items-center p-2 bg-white dark:bg-gray-800 rounded-lg border',
                  student.score >= 85
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
                  student.score >= 85
                    ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                    : student.score >= 70
                    ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                    : student.score >= 55
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                )}>
                  {student.score}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The question */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <div className="flex items-start gap-3">
            <Medal className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-purple-800 dark:text-purple-200 font-semibold">
                La pregunta del profesor
              </p>
              <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
                El profesor quiere premiar al <strong>top 25%</strong> de la clase.
                ¿Cuantos estudiantes recibiran premio? ¿Quienes son?
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('guess')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>Intentar responder</span>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              Tu prediccion
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Cuantos en el top 25%?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Selecciona tu respuesta
          </p>
        </div>

        {/* Sorted students for reference */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center">
            Puntajes ordenados de menor a mayor:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {SORTED_SCORES.map((score, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg text-sm font-mono bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
              >
                {score}
              </span>
            ))}
          </div>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {[2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedQuartile(num)}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-center',
                selectedQuartile === num
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              )}
            >
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{num}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">estudiantes</div>
            </button>
          ))}
        </div>

        {selectedQuartile !== null && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
              <p className="text-center text-amber-800 dark:text-amber-200">
                <strong>Interesante...</strong> Pero, ¿como sabemos exactamente donde &ldquo;cortar&rdquo;?
                Necesitamos un metodo matematico para dividir los datos.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setPhase('reveal')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Ver la solucion</span>
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
            ¡Los Cuartiles!
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Dividir los datos en 4 partes iguales
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Los cuartiles nos dicen donde estan el 25%, 50% y 75% de los datos
        </p>
      </div>

      {/* Visual quartile representation */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/30 dark:to-blue-900/30 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="space-y-3">
          {/* Number line with quartiles */}
          <div className="relative h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {/* Quartile markers */}
            <div className="absolute top-0 left-[25%] w-px h-full bg-blue-400 dark:bg-blue-500">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-600 dark:text-blue-400">Q₁</div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-blue-600 dark:text-blue-400">{QUARTILES.q1}</div>
            </div>
            <div className="absolute top-0 left-[50%] w-px h-full bg-green-400 dark:bg-green-500">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-green-600 dark:text-green-400">Q₂</div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-green-600 dark:text-green-400">{QUARTILES.q2}</div>
            </div>
            <div className="absolute top-0 left-[75%] w-px h-full bg-purple-400 dark:bg-purple-500">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-600 dark:text-purple-400">Q₃</div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-purple-600 dark:text-purple-400">{QUARTILES.q3}</div>
            </div>

            {/* Quartile sections */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[12.5%] text-xs text-gray-500 dark:text-gray-400">25%</div>
            <div className="absolute top-1/2 -translate-y-1/2 left-[37.5%] text-xs text-gray-500 dark:text-gray-400">25%</div>
            <div className="absolute top-1/2 -translate-y-1/2 left-[62.5%] text-xs text-gray-500 dark:text-gray-400">25%</div>
            <div className="absolute top-1/2 -translate-y-1/2 left-[87.5%] text-xs text-gray-500 dark:text-gray-400">25%</div>
          </div>
        </div>
      </div>

      {/* Three quartile explanations */}
      <div className="space-y-3">
        {/* Q1 */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600">Q₁</span>
              </div>
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Primer Cuartil (25%)</p>
                <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{QUARTILES.q1} puntos</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {quartileGroups.bottom25.length} estudiantes debajo
              </span>
            </div>
          </div>
        </div>

        {/* Q2 */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                <span className="text-lg font-bold text-green-600">Q₂</span>
              </div>
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">Segundo Cuartil = Mediana (50%)</p>
                <p className="text-xl font-bold text-green-700 dark:text-green-300">{QUARTILES.q2} puntos</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                Divide la clase por la mitad
              </span>
            </div>
          </div>
        </div>

        {/* Q3 */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                <span className="text-lg font-bold text-purple-600">Q₃</span>
              </div>
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400">Tercer Cuartil (75%)</p>
                <p className="text-xl font-bold text-purple-700 dark:text-purple-300">{QUARTILES.q3} puntos</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                {quartileGroups.top25.length} estudiantes arriba
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Answer to the original question */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
        <div className="flex items-start gap-3">
          <Trophy className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-800 dark:text-amber-200 font-semibold">
              Respuesta: ¡{quartileGroups.top25.length} estudiantes en el top 25%!
            </p>
            <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
              {quartileGroups.top25.map(s => s.name).join(', ')} tienen puntajes mayores a Q₃ = {QUARTILES.q3}.
              Ellos estan por encima del 75% de la clase.
            </p>
          </div>
        </div>
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
              Los <strong>cuartiles</strong> dividen los datos ordenados en 4 partes de 25% cada una.
              Son super utiles para entender donde se ubica un dato dentro de un grupo.
              ¡Vamos a aprender a calcularlos!
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
          <span>¡Aprender a calcularlos!</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
