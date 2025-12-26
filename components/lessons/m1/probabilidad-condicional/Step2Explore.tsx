'use client';

import { useState } from 'react';
import { ArrowRight, Dumbbell, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useExplorePhases } from '@/hooks/lessons';
import { ActionButton, HintPanel, ExampleProgressDots } from '@/components/lessons/primitives';

type Phase = 'intro' | 'discover' | 'pattern';

interface Student {
  id: number;
  sport: boolean;
  music: boolean;
}

// 20 students total
// 12 do sports, 10 do music, 5 do both
const STUDENTS: Student[] = [
  // Both sport and music (5)
  { id: 1, sport: true, music: true },
  { id: 2, sport: true, music: true },
  { id: 3, sport: true, music: true },
  { id: 4, sport: true, music: true },
  { id: 5, sport: true, music: true },
  // Only sport (7)
  { id: 6, sport: true, music: false },
  { id: 7, sport: true, music: false },
  { id: 8, sport: true, music: false },
  { id: 9, sport: true, music: false },
  { id: 10, sport: true, music: false },
  { id: 11, sport: true, music: false },
  { id: 12, sport: true, music: false },
  // Only music (5)
  { id: 13, sport: false, music: true },
  { id: 14, sport: false, music: true },
  { id: 15, sport: false, music: true },
  { id: 16, sport: false, music: true },
  { id: 17, sport: false, music: true },
  // Neither (3)
  { id: 18, sport: false, music: false },
  { id: 19, sport: false, music: false },
  { id: 20, sport: false, music: false },
];

interface Example {
  id: string;
  question: string;
  condition: string;
  filteredCount: number;
  favorableCount: number;
  result: string;
  hint: string;
  filterFn: (s: Student) => boolean;
  favoriteFn: (s: Student) => boolean;
}

const EXAMPLES: Example[] = [
  {
    id: 'e1',
    question: 'P(Música | Deporte)',
    condition: 'Dado que hace deporte',
    filteredCount: 12,
    favorableCount: 5,
    result: '5/12 ≈ 42%',
    hint: 'Solo mira los estudiantes que hacen deporte. ¿Cuántos de ellos también hacen música?',
    filterFn: (s) => s.sport,
    favoriteFn: (s) => s.sport && s.music,
  },
  {
    id: 'e2',
    question: 'P(Deporte | Música)',
    condition: 'Dado que hace música',
    filteredCount: 10,
    favorableCount: 5,
    result: '5/10 = 50%',
    hint: 'Solo mira los estudiantes que hacen música. ¿Cuántos de ellos también hacen deporte?',
    filterFn: (s) => s.music,
    favoriteFn: (s) => s.sport && s.music,
  },
  {
    id: 'e3',
    question: 'P(Música | No Deporte)',
    condition: 'Dado que NO hace deporte',
    filteredCount: 8,
    favorableCount: 5,
    result: '5/8 ≈ 63%',
    hint: 'Solo mira los estudiantes que NO hacen deporte. ¿Cuántos de ellos hacen música?',
    filterFn: (s) => !s.sport,
    favoriteFn: (s) => !s.sport && s.music,
  },
  {
    id: 'e4',
    question: 'P(Ninguno | No Música)',
    condition: 'Dado que NO hace música',
    filteredCount: 10,
    favorableCount: 3,
    result: '3/10 = 30%',
    hint: 'Solo mira los estudiantes que NO hacen música. ¿Cuántos no hacen ninguna actividad?',
    filterFn: (s) => !s.music,
    favoriteFn: (s) => !s.sport && !s.music,
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const {
    phase, nextPhase,
    currentExample: example,
    currentExampleIndex, discoveredIds, isLastExample,
    discoverCurrent, nextExample,
    showHint, toggleHint, hideHint,
  } = useExplorePhases<Phase, Example>({
    phases: ['intro', 'discover', 'pattern'],
    examples: EXAMPLES,
    getExampleId: (ex) => ex.id,
  });

  const [showResult, setShowResult] = useState(false);

  const handleDiscoverExample = () => {
    discoverCurrent();
    setShowResult(true);
  };

  const handleNextExample = () => {
    if (!isLastExample) {
      nextExample();
      hideHint();
      setShowResult(false);
    } else {
      nextPhase();
    }
  };

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    const sportCount = STUDENTS.filter(s => s.sport).length;
    const musicCount = STUDENTS.filter(s => s.music).length;
    const bothCount = STUDENTS.filter(s => s.sport && s.music).length;

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubre el Patrón
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Exploremos la probabilidad condicional
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
            En un curso de <strong>20 estudiantes</strong>, algunos participan en actividades extracurriculares:
          </p>

          {/* Activity stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-orange-100 dark:bg-orange-900/50 rounded-xl p-4 text-center">
              <Dumbbell className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{sportCount}</p>
              <p className="text-sm text-orange-600 dark:text-orange-400">Deporte</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/50 rounded-xl p-4 text-center">
              <Music className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{musicCount}</p>
              <p className="text-sm text-purple-600 dark:text-purple-400">Música</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/50 rounded-xl p-4 text-center">
              <div className="flex justify-center gap-1 mb-2">
                <Dumbbell className="w-6 h-6 text-green-600" />
                <Music className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{bothCount}</p>
              <p className="text-sm text-green-600 dark:text-green-400">Ambos</p>
            </div>
          </div>

          {/* Student visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 text-center">Los 20 estudiantes:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {STUDENTS.map((student) => (
                <div
                  key={student.id}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    student.sport && student.music
                      ? 'bg-green-500 text-white'
                      : student.sport
                      ? 'bg-orange-500 text-white'
                      : student.music
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  )}
                  title={`${student.sport ? 'Deporte' : ''} ${student.music ? 'Música' : ''} ${!student.sport && !student.music ? 'Ninguno' : ''}`}
                >
                  {student.id}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-3 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-orange-500" /> Deporte
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-purple-500" /> Música
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500" /> Ambos
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-gray-400" /> Ninguno
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ActionButton onClick={nextPhase} variant="primary" icon={<ArrowRight size={20} />}>
            Explorar probabilidades
          </ActionButton>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: DISCOVER ============
  if (phase === 'discover' && example) {
    const filteredStudents = STUDENTS.filter(example.filterFn);
    const favoriteStudents = STUDENTS.filter(example.favoriteFn);

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Probabilidad Condicional
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {example.condition}
          </p>
        </div>

        {/* Progress */}
        <ExampleProgressDots
          examples={EXAMPLES}
          currentIndex={currentExampleIndex}
          discoveredIds={discoveredIds}
          getExampleId={(ex) => ex.id}
        />

        {/* Question card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="text-center mb-4">
            <p className="text-gray-500 dark:text-gray-400 mb-2">Calcula:</p>
            <p className="font-mono text-2xl font-bold text-gray-800 dark:text-gray-200">
              {example.question}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              &ldquo;{example.condition}, ¿cuál es la probabilidad?&rdquo;
            </p>
          </div>

          {/* Student visualization with filtering */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 text-center">
              {showResult ? 'Estudiantes filtrados:' : 'Los 20 estudiantes:'}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {STUDENTS.map((student) => {
                const isFiltered = example.filterFn(student);
                const isFavorite = example.favoriteFn(student);

                return (
                  <div
                    key={student.id}
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                      showResult
                        ? isFiltered
                          ? isFavorite
                            ? 'bg-green-500 text-white ring-2 ring-green-300'
                            : 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-400 opacity-30'
                        : student.sport && student.music
                        ? 'bg-green-500 text-white'
                        : student.sport
                        ? 'bg-orange-500 text-white'
                        : student.music
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    )}
                  >
                    {student.id}
                  </div>
                );
              })}
            </div>
            {showResult ? (
              <div className="flex justify-center gap-4 mt-3 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-500" /> Cumplen condición ({filteredStudents.length})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-green-500 ring-2 ring-green-300" /> Favorables ({favoriteStudents.length})
                </span>
              </div>
            ) : (
              <div className="flex justify-center gap-4 mt-3 text-xs flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-orange-500" /> Deporte
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-purple-500" /> Música
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-green-500" /> Ambos
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-gray-400" /> Ninguno
                </span>
              </div>
            )}
          </div>

          {/* Hint */}
          {!showResult && (
            <HintPanel
              hint={example.hint}
              showHint={showHint}
              onToggle={toggleHint}
            />
          )}

          {!showResult && (
            <div className="flex justify-center">
              <ActionButton onClick={handleDiscoverExample} variant="success">
                Ver resultado
              </ActionButton>
            </div>
          )}

          {showResult && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
                <div className="text-center space-y-3">
                  <p className="text-gray-600 dark:text-gray-400">
                    De {example.filteredCount} que cumplen la condición, {example.favorableCount} son favorables:
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="font-mono text-xl text-gray-700 dark:text-gray-300">{example.question}</span>
                    <span className="text-gray-400">=</span>
                    <span className="font-mono text-xl text-gray-700 dark:text-gray-300">{example.favorableCount}/{example.filteredCount}</span>
                    <span className="text-gray-400">=</span>
                    <span className="font-mono text-2xl font-bold text-green-600">{example.result}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ActionButton onClick={handleNextExample} variant="primary" icon={<ArrowRight size={20} />}>
                  {!isLastExample ? 'Siguiente ejemplo' : 'Ver resumen'}
                </ActionButton>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============ PHASE 3: PATTERN ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          El Patrón Descubierto
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          La fórmula de probabilidad condicional
        </p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
          Probabilidad Condicional: P(A | B)
        </h3>

        {/* Formula highlight */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Se lee: &ldquo;Probabilidad de A dado B&rdquo;</p>
          <p className="font-mono text-3xl font-bold text-purple-700 dark:text-purple-300">
            P(A | B) = P(A ∩ B) / P(B)
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            O equivalentemente: <span className="font-mono">n(A ∩ B) / n(B)</span>
          </p>
        </div>

        {/* Steps summary */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Identifica la condición (B)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Es lo que va después de &ldquo;dado que&rdquo; o &ldquo;sabiendo que&rdquo;</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Filtra al nuevo espacio muestral</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Solo considera los casos que cumplen B</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Cuenta los favorables (A ∩ B)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">De los filtrados, ¿cuántos también cumplen A?</p>
            </div>
          </div>
        </div>

        {/* Examples summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">Ejemplos trabajados:</h4>
          <div className="space-y-2">
            {EXAMPLES.map((ex) => (
              <div
                key={ex.id}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
              >
                <span className="font-mono text-sm text-gray-700 dark:text-gray-300">{ex.question}</span>
                <span className="text-gray-400">=</span>
                <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{ex.favorableCount}/{ex.filteredCount}</span>
                <span className="text-gray-400">=</span>
                <span className="font-mono font-bold text-green-600">{ex.result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <ActionButton onClick={onComplete} variant="primary" icon={<ArrowRight size={20} />}>
          Continuar
        </ActionButton>
      </div>
    </div>
  );
}
