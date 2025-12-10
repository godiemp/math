'use client';

import { useState } from 'react';
import { ArrowRight, Music, HelpCircle, Sparkles, Trophy, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'guess' | 'reveal';

// Song data - designed to show different winners by different measures
// Key insight: Total plays vs Number of fans creates different rankings
const SONGS = [
  {
    id: 1,
    name: 'Ritmo Latino',
    emoji: '💃',
    plays: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // Everyone plays it = 40 total, 10 fans
    color: 'bg-pink-500'
  },
  {
    id: 2,
    name: 'Pop del Momento',
    emoji: '🎤',
    plays: [0, 0, 0, 0, 0, 0, 12, 12, 12, 12], // Only 4 superfans = 48 total, 4 fans
    color: 'bg-purple-500'
  },
  {
    id: 3,
    name: 'Rock Clasico',
    emoji: '🎸',
    plays: [0, 0, 0, 3, 3, 3, 3, 3, 3, 3], // 7 fans = 21 total
    color: 'bg-orange-500'
  },
  {
    id: 4,
    name: 'Reggaeton Hit',
    emoji: '🔥',
    plays: [0, 0, 0, 0, 0, 5, 5, 5, 5, 5], // 5 fans = 25 total
    color: 'bg-red-500'
  },
];

// Calculate statistics for each song
function calculateStats(plays: number[]) {
  const total = plays.reduce((a, b) => a + b, 0);
  const fans = plays.filter(p => p > 0).length; // Number of people who actually played it
  const mean = total / plays.length;

  const sorted = [...plays].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;

  // Mode calculation
  const freq: Record<number, number> = {};
  plays.forEach(p => freq[p] = (freq[p] || 0) + 1);
  const maxFreq = Math.max(...Object.values(freq));
  const modes = Object.entries(freq)
    .filter(([, f]) => f === maxFreq && maxFreq > 1)
    .map(([v]) => Number(v));

  return { total, fans, mean, median, modes };
}

const SONG_STATS = SONGS.map(song => ({
  ...song,
  stats: calculateStats(song.plays)
}));

// Rankings by different measures - these give DIFFERENT winners!
const byTotal = [...SONG_STATS].sort((a, b) => b.stats.total - a.stats.total);
const byFans = [...SONG_STATS].sort((a, b) => b.stats.fans - a.stats.fans);

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!isActive) return null;

  // ============ PHASE 1: INTRO - Show the playlist ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <Music className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700 dark:text-purple-300 font-medium">
              Playlist del Curso
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Batalla del Top 10
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            10 estudiantes compartieron sus canciones favoritas esta semana
          </p>
        </div>

        {/* Song cards with play counts */}
        <div className="space-y-3">
          {SONG_STATS.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center text-2xl', song.color)}>
                {song.emoji}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">{song.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Users size={14} />
                  <span>{song.stats.total} reproducciones totales</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {song.stats.fans}/10
                </div>
                <div className="text-xs text-gray-500">estudiantes</div>
              </div>
            </div>
          ))}
        </div>

        {/* Question tease */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <p className="text-center text-purple-800 dark:text-purple-200">
            <strong>El desafio:</strong> ¿Cual cancion deberia ser la #1 del ranking?
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('guess')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Elegir mi #1</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: GUESS - Pick a winner ============
  if (phase === 'guess') {
    const handleGuess = (songId: number) => {
      setSelectedAnswer(songId);
      setShowResult(true);
    };

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
            ¿Cual cancion es la mas popular?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Elige la que crees que deberia ser #1
          </p>
        </div>

        {/* Song options */}
        <div className="grid grid-cols-2 gap-3">
          {SONG_STATS.map((song) => {
            const isSelected = selectedAnswer === song.id;

            return (
              <button
                key={song.id}
                onClick={() => !showResult && handleGuess(song.id)}
                disabled={showResult}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                  !showResult && 'hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-purple-300',
                  isSelected && 'border-purple-500 bg-purple-50 dark:bg-purple-900/30',
                  !isSelected && !showResult && 'border-gray-200 dark:border-gray-700',
                  !isSelected && showResult && 'opacity-50'
                )}
              >
                <span className="text-3xl">{song.emoji}</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm text-center">
                  {song.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Result - the twist */}
        {showResult && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
              <p className="text-center text-amber-800 dark:text-amber-200">
                <strong>Interesante eleccion...</strong> pero hay un problema:
                ¡diferentes formas de medir dan diferentes ganadores!
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setPhase('reveal')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
              >
                <span>Ver los rankings</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 3: REVEAL - Different rankings ============
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
          Mismo Dato, Diferente Ganador
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Mira como cambia el #1 segun como midamos
        </p>
      </div>

      {/* Side by side rankings */}
      <div className="grid grid-cols-2 gap-4">
        {/* By Total Plays */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <h3 className="text-center font-bold text-blue-800 dark:text-blue-200 mb-3 text-sm">
            Por TOTAL de plays
          </h3>
          <div className="space-y-2">
            {byTotal.map((song, index) => (
              <div
                key={song.id}
                className={cn(
                  'flex items-center gap-2 p-2 rounded-lg text-sm',
                  index === 0 && 'bg-blue-100 dark:bg-blue-800/50'
                )}
              >
                <span className="font-bold text-blue-600 w-5">#{index + 1}</span>
                <span>{song.emoji}</span>
                <span className="flex-1 truncate text-gray-700 dark:text-gray-300">{song.name}</span>
                <span className="font-mono text-xs">{song.stats.total}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-center">
            <Trophy className="w-5 h-5 text-blue-500 mx-auto" />
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
              {byTotal[0].name}
            </p>
          </div>
        </div>

        {/* By Fans */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <h3 className="text-center font-bold text-purple-800 dark:text-purple-200 mb-3 text-sm">
            Por NUMERO de fans
          </h3>
          <div className="space-y-2">
            {byFans.map((song, index) => (
              <div
                key={song.id}
                className={cn(
                  'flex items-center gap-2 p-2 rounded-lg text-sm',
                  index === 0 && 'bg-purple-100 dark:bg-purple-800/50'
                )}
              >
                <span className="font-bold text-purple-600 w-5">#{index + 1}</span>
                <span>{song.emoji}</span>
                <span className="flex-1 truncate text-gray-700 dark:text-gray-300">{song.name}</span>
                <span className="font-mono text-xs">{song.stats.fans}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-center">
            <Trophy className="w-5 h-5 text-purple-500 mx-auto" />
            <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
              {byFans[0].name}
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
              <strong>No hay una sola forma de medir "lo tipico".</strong> La <em>media</em>, la <em>mediana</em> y la <em>moda</em> son
              diferentes maneras de encontrar el centro de los datos. ¡Vamos a aprender cuando usar cada una!
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
