'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Play, Pause, RotateCcw, Sparkles, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'explore' | 'challenge' | 'discovery';

interface TimelineEvent {
  interval: number;
  color: string;
  label: string;
}

// Timeline visualization component
function Timeline({
  events,
  currentTime,
  maxTime,
  showSync = false,
}: {
  events: TimelineEvent[];
  currentTime: number;
  maxTime: number;
  showSync?: boolean;
}) {
  const syncTimes: number[] = [];

  // Find sync points
  for (let t = 1; t <= maxTime; t++) {
    if (events.every(e => t % e.interval === 0)) {
      syncTimes.push(t);
    }
  }

  return (
    <div className="space-y-4">
      {events.map((event, eventIndex) => (
        <div key={eventIndex} className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <div className={cn('w-4 h-4 rounded', event.color)} />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {event.label} (cada {event.interval}s)
            </span>
          </div>
          <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            {/* Timeline markers */}
            {Array.from({ length: Math.floor(maxTime / event.interval) }, (_, i) => (i + 1) * event.interval).map(time => (
              <div
                key={time}
                className={cn(
                  'absolute top-0 h-full w-2 transition-all',
                  time <= currentTime ? event.color : 'bg-gray-400 dark:bg-gray-500 opacity-30',
                  showSync && syncTimes.includes(time) && 'ring-2 ring-yellow-400 z-10',
                )}
                style={{ left: `${(time / maxTime) * 100}%`, transform: 'translateX(-50%)' }}
              />
            ))}
            {/* Current time indicator */}
            <div
              className="absolute top-0 h-full w-0.5 bg-red-500 z-20 transition-all"
              style={{ left: `${(currentTime / maxTime) * 100}%` }}
            />
          </div>
        </div>
      ))}

      {/* Time axis */}
      <div className="relative h-6">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gray-300 dark:bg-gray-600" />
        {[0, maxTime / 4, maxTime / 2, (maxTime * 3) / 4, maxTime].map(time => (
          <div
            key={time}
            className="absolute transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400"
            style={{ left: `${(time / maxTime) * 100}%`, top: '4px' }}
          >
            {time}s
          </div>
        ))}
      </div>

      {/* Sync indicator */}
      {showSync && syncTimes.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-3 border border-yellow-300 dark:border-yellow-700">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm text-center font-medium">
            <Sparkles className="inline w-4 h-4 mr-1" />
            Sincronización en: {syncTimes.slice(0, 3).join('s, ')}s...
            {syncTimes.length > 0 && ` | M.C.M. = ${syncTimes[0]}`}
          </p>
        </div>
      )}
    </div>
  );
}

// Traffic light component
function TrafficLight({ isGreen, label }: { isGreen: boolean; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-gray-800 rounded-lg p-2 flex flex-col gap-1">
        <div className={cn(
          'w-6 h-6 rounded-full transition-all',
          !isGreen ? 'bg-red-500' : 'bg-red-900',
        )} />
        <div className={cn(
          'w-6 h-6 rounded-full transition-all',
          'bg-yellow-900',
        )} />
        <div className={cn(
          'w-6 h-6 rounded-full transition-all',
          isGreen ? 'bg-green-500' : 'bg-green-900',
        )} />
      </div>
      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</span>
    </div>
  );
}

export default function Step5ExploreSynchronization({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [foundSync, setFoundSync] = useState(false);

  // Challenge phase state
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [showChallengeFeedback, setShowChallengeFeedback] = useState(false);

  // Traffic light intervals
  const light1Interval = 15;
  const light2Interval = 20;
  const mcm = 60;
  const maxTime = 80;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && currentTime < maxTime) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 1;
          if (next === mcm) {
            setFoundSync(true);
          }
          if (next >= maxTime) {
            setIsPlaying(false);
          }
          return next;
        });
      }, 100); // Speed up for demo
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, maxTime, mcm]);

  if (!isActive) return null;

  const light1Green = currentTime % light1Interval === 0 && currentTime > 0;
  const light2Green = currentTime % light2Interval === 0 && currentTime > 0;
  const bothGreen = light1Green && light2Green;

  const resetSimulation = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    setFoundSync(false);
  };

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Sincronizando Eventos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El M.C.M. aparece en muchas situaciones de la vida real
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 rounded-xl p-6">
          <div className="text-center space-y-4">
            <Timer className="w-16 h-16 mx-auto text-green-500" />
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Los semáforos, los buses, las alarmas... todos tienen <strong>ciclos</strong>.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Cuando queremos saber cuándo <strong>coinciden</strong> dos ciclos,
              ¡usamos el M.C.M.!
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-sm mx-auto">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Ejemplo: Si un semáforo cambia cada 15 segundos y otro cada 20 segundos...
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold mt-2">
                ¿Cuándo estarán ambos en verde al mismo tiempo?
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('explore')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all shadow-lg"
          >
            <span>Explorar simulación</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: EXPLORE ============
  if (phase === 'explore') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Sincronizando Eventos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Observa cuándo coinciden los semáforos
          </p>
        </div>

        {/* Traffic lights visualization */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
          <div className="flex justify-center items-end gap-12 mb-6">
            <TrafficLight isGreen={light1Green} label={`Cada ${light1Interval}s`} />
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {currentTime}s
              </p>
              {bothGreen && (
                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  ¡SINCRONIZADOS!
                </div>
              )}
            </div>
            <TrafficLight isGreen={light2Green} label={`Cada ${light2Interval}s`} />
          </div>

          {/* Timeline */}
          <Timeline
            events={[
              { interval: light1Interval, color: 'bg-blue-500', label: 'Semáforo A' },
              { interval: light2Interval, color: 'bg-green-500', label: 'Semáforo B' },
            ]}
            currentTime={currentTime}
            maxTime={maxTime}
            showSync={true}
          />

          {/* Controls */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={cn(
                'flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all',
                isPlaying
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600',
              )}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span>{isPlaying ? 'Pausar' : 'Iniciar'}</span>
            </button>
            <button
              onClick={resetSimulation}
              className="flex items-center gap-2 px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
            >
              <RotateCcw size={18} />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>

        {/* Discovery prompt */}
        {foundSync && (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-5 border border-yellow-300 dark:border-yellow-700 animate-fadeIn">
            <div className="text-center">
              <Sparkles className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
              <p className="text-yellow-800 dark:text-yellow-200 font-bold text-lg">
                ¡Encontraste la sincronización!
              </p>
              <p className="text-yellow-700 dark:text-yellow-300 mt-2">
                Los semáforos coinciden cada <strong>60 segundos</strong>.
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm mt-1">
                M.C.M.(15, 20) = 60
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('challenge')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all shadow-lg"
          >
            <span>Siguiente desafío</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: CHALLENGE ============
  if (phase === 'challenge') {
    const challengeOptions = [
      { label: '30 segundos', value: 30 },
      { label: '45 segundos', value: 45 },
      { label: '60 segundos', value: 60 },
      { label: '90 segundos', value: 90 },
    ];
    const challengeCorrect = 60;

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Sincronizando Eventos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Desafío: Calcula sin simular
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 text-center mb-4">
            Dos corredores dan vueltas a una pista
          </h4>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🏃‍♂️</div>
              <p className="font-medium text-gray-800 dark:text-gray-200">Corredor A</p>
              <p className="text-purple-600 dark:text-purple-400 font-bold">Una vuelta cada 12 segundos</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🏃‍♀️</div>
              <p className="font-medium text-gray-800 dark:text-gray-200">Corredor B</p>
              <p className="text-purple-600 dark:text-purple-400 font-bold">Una vuelta cada 15 segundos</p>
            </div>
          </div>
          <p className="text-center text-purple-700 dark:text-purple-300 font-medium">
            Si parten juntos, ¿cada cuántos segundos se encuentran en la línea de partida?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {challengeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => !showChallengeFeedback && setSelectedChallenge(option.value)}
              disabled={showChallengeFeedback}
              className={cn(
                'p-4 rounded-xl transition-all text-center font-medium text-lg border-2',
                selectedChallenge === option.value
                  ? showChallengeFeedback
                    ? option.value === challengeCorrect
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-400'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-400'
                    : 'bg-purple-100 dark:bg-purple-900/50 border-purple-400'
                  : showChallengeFeedback && option.value === challengeCorrect
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-400'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        {!showChallengeFeedback && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowChallengeFeedback(true)}
              disabled={selectedChallenge === null}
              className={cn(
                'px-8 py-3 rounded-xl font-semibold transition-all',
                selectedChallenge !== null
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
              )}
            >
              Comprobar
            </button>
          </div>
        )}

        {showChallengeFeedback && (
          <div className={cn(
            'p-5 rounded-xl border-2 animate-fadeIn',
            selectedChallenge === challengeCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
              : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400',
          )}>
            <p className={cn(
              'font-bold text-center text-lg mb-2',
              selectedChallenge === challengeCorrect
                ? 'text-green-800 dark:text-green-200'
                : 'text-amber-800 dark:text-amber-200',
            )}>
              {selectedChallenge === challengeCorrect ? '¡Correcto!' : '¡Casi!'}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              M.C.M.(12, 15) = 60. Se encuentran cada 60 segundos.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center mt-2">
              12 = 2² × 3, 15 = 3 × 5 → M.C.M. = 2² × 3 × 5 = 60
            </p>
          </div>
        )}

        {showChallengeFeedback && (
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('discovery')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Ver resumen</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 4: DISCOVERY ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Sincronizando Eventos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplicaciones del M.C.M.
        </p>
      </div>

      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl p-6">
        <h4 className="font-bold text-cyan-800 dark:text-cyan-200 text-center text-lg mb-4">
          El M.C.M. aparece cuando...
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="text-2xl mb-2 text-center">🚌</div>
            <p className="font-medium text-gray-800 dark:text-gray-200 text-center">Buses</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
              ¿Cuándo coinciden dos rutas?
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="text-2xl mb-2 text-center">🚦</div>
            <p className="font-medium text-gray-800 dark:text-gray-200 text-center">Semáforos</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
              ¿Cuándo están todos en verde?
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="text-2xl mb-2 text-center">⏰</div>
            <p className="font-medium text-gray-800 dark:text-gray-200 text-center">Alarmas</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
              ¿Cuándo suenan juntas?
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="text-2xl mb-2 text-center">➗</div>
            <p className="font-medium text-gray-800 dark:text-gray-200 text-center">Fracciones</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
              Encontrar denominador común
            </p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-700">
        <p className="text-green-800 dark:text-green-200 text-center font-medium">
          <strong>Regla práctica:</strong> Cuando dos eventos se repiten con intervalos diferentes,
          se sincronizan cada M.C.M. unidades de tiempo.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Continuar al checkpoint</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
