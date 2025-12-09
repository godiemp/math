'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check, Target, Brain, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { VennDiagram } from '@/components/lessons/shared';

type Phase = 'intro' | 'three_events' | 'complement_strategy' | 'real_world' | 'summary';

export default function Step5Advanced({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [showThreeEventsAnswer, setShowThreeEventsAnswer] = useState(false);
  const [showComplementAnswer, setShowComplementAnswer] = useState(false);
  const [vennValues, setVennValues] = useState({ music: 0, sports: 0, both: 0 });
  const [showRealWorldAnswer, setShowRealWorldAnswer] = useState(false);

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Casos Avanzados
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Aplicaciones más complejas de las reglas
          </p>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-10 h-10 text-indigo-500" />
          </div>
          <p className="text-gray-800 dark:text-gray-200 text-center mb-4">
            Ahora que dominas las reglas básicas, exploremos situaciones más desafiantes:
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">1</div>
              <span className="text-gray-700 dark:text-gray-300">Tres eventos mutuamente excluyentes</span>
            </div>
            <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">2</div>
              <span className="text-gray-700 dark:text-gray-300">La estrategia del complemento para &ldquo;al menos uno&rdquo;</span>
            </div>
            <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">3</div>
              <span className="text-gray-700 dark:text-gray-300">Datos de encuestas con diagramas de Venn</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('three_events')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Empezar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: THREE EVENTS ============
  if (phase === 'three_events') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Tres Eventos Excluyentes
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Qué pasa cuando hay más de dos eventos?
          </p>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
          <p className="text-indigo-800 dark:text-indigo-200 text-center mb-4">
            Una bolsa tiene <strong>5 canicas rojas</strong>, <strong>4 azules</strong> y <strong>3 verdes</strong>.
            <br />
            ¿Cuál es P(roja O azul O verde)?
          </p>

          {/* Visual */}
          <div className="flex justify-center gap-4 py-4">
            <div className="flex flex-col items-center">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-red-500 shadow-md" />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">Rojas: 5</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-blue-500 shadow-md" />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">Azules: 4</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-green-500 shadow-md" />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">Verdes: 3</span>
            </div>
          </div>

          <button
            onClick={() => setShowThreeEventsAnswer(true)}
            className={cn(
              'w-full py-3 rounded-lg font-semibold transition-all mt-4',
              showThreeEventsAnswer
                ? 'bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            )}
          >
            {showThreeEventsAnswer ? '¡Así es!' : 'Ver la solución'}
          </button>
        </div>

        {showThreeEventsAnswer && (
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-700 animate-fadeIn">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-green-800 dark:text-green-200 font-semibold mb-2">
                  Para tres eventos excluyentes, simplemente sumamos:
                </p>
                <div className="text-lg text-green-900 dark:text-green-100 text-center my-2">
                  P(R ∪ A ∪ V) = P(R) + P(A) + P(V)
                </div>
                <div className="text-xl font-bold text-green-900 dark:text-green-100 text-center">
                  = 5/12 + 4/12 + 3/12 = <span className="text-2xl">12/12 = 1</span>
                </div>
                <p className="text-green-700 dark:text-green-300 text-sm mt-2 text-center">
                  ¡Tiene sentido! Cada canica es de alguno de estos colores, así que la probabilidad es 100%.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('complement_strategy')}
            disabled={!showThreeEventsAnswer}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
              showThreeEventsAnswer
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            <span>Siguiente: Estrategia del Complemento</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: COMPLEMENT STRATEGY ============
  if (phase === 'complement_strategy') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Estrategia del Complemento
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            A veces es más fácil calcular lo que NO quieres
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lightbulb className="w-6 h-6 text-purple-500" />
            <span className="text-purple-800 dark:text-purple-200 font-semibold">Problema tipo &ldquo;al menos uno&rdquo;</span>
          </div>

          <p className="text-purple-800 dark:text-purple-200 text-center mb-4">
            En una encuesta, el <strong>15%</strong> de las personas no celebra <strong>ninguna</strong> festividad.
            <br />
            ¿Cuál es P(celebrar <strong>al menos una</strong> festividad)?
          </p>

          {/* Visual - celebration icons */}
          <div className="flex justify-center gap-6 py-4">
            <div className="text-center">
              <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-2xl">
                🎄
              </div>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-2xl">
                🎆
              </div>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-2xl">
                🎂
              </div>
            </div>
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/40 rounded-lg p-4 mb-4">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>💡 Tip:</strong> &ldquo;Al menos una&rdquo; y &ldquo;ninguna&rdquo; son complementos.
              <br />
              Si conoces uno, puedes calcular el otro fácilmente.
            </p>
          </div>

          <button
            onClick={() => setShowComplementAnswer(true)}
            className={cn(
              'w-full py-3 rounded-lg font-semibold transition-all',
              showComplementAnswer
                ? 'bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            )}
          >
            {showComplementAnswer ? '¡La estrategia secreta!' : 'Ver la estrategia'}
          </button>
        </div>

        {showComplementAnswer && (
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-700 animate-fadeIn">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="w-full">
                <p className="text-green-800 dark:text-green-200 font-semibold mb-3">
                  Estrategia: Usar el complemento directamente
                </p>

                <div className="space-y-2 text-green-700 dark:text-green-300">
                  <p>1️⃣ Sabemos que P(ninguna festividad) = 15% = 0.15</p>
                  <p className="text-lg font-bold text-green-900 dark:text-green-100">
                    2️⃣ P(al menos una) = 1 - P(ninguna) = 1 - 0.15 = <span className="text-xl">0.85 = 85%</span>
                  </p>
                </div>

                <div className="mt-4 bg-green-100 dark:bg-green-900/50 rounded-lg p-3">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <strong>¿Por qué funciona?</strong>
                    <br />
                    &ldquo;Al menos uno&rdquo; y &ldquo;ninguno&rdquo; son <strong>complementos</strong>.
                    <br />
                    ¡Siempre suman 100%!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('real_world')}
            disabled={!showComplementAnswer}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
              showComplementAnswer
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            <span>Siguiente: Aplicación Real</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: REAL WORLD ============
  if (phase === 'real_world') {
    const totalStudents = 30;
    const musicOnly = 10; // 18 - 8 = 10
    const sportsOnly = 7;  // 15 - 8 = 7
    const both = 8;
    const neither = 5; // 30 - 10 - 7 - 8 = 5
    const atLeastOne = totalStudents - neither;

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Aplicación: Datos de Encuesta
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Usando el diagrama de Venn con datos reales
          </p>
        </div>

        <div className="bg-pink-50 dark:bg-pink-900/30 rounded-xl p-6 border border-pink-200 dark:border-pink-700">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-pink-500" />
            <span className="text-pink-800 dark:text-pink-200 font-semibold">Encuesta de gustos</span>
          </div>

          <p className="text-pink-800 dark:text-pink-200 text-center mb-4">
            En una clase de <strong>30 estudiantes</strong>:
          </p>

          <div className="grid grid-cols-3 gap-2 text-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-2">
              <span className="text-2xl">🎵</span>
              <p className="text-sm text-blue-800 dark:text-blue-200">Música: 18</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-2">
              <span className="text-2xl">⚽</span>
              <p className="text-sm text-green-800 dark:text-green-200">Deportes: 15</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/50 rounded-lg p-2">
              <span className="text-2xl">🎵⚽</span>
              <p className="text-sm text-purple-800 dark:text-purple-200">Ambos: 8</p>
            </div>
          </div>

          <p className="text-pink-800 dark:text-pink-200 text-center font-semibold">
            ¿Cuántos estudiantes les gusta <strong>al menos una</strong> de estas actividades?
          </p>

          {/* Interactive Venn */}
          <div className="flex justify-center my-4">
            <VennDiagram
              mode="overlapping"
              labelA="Música"
              labelB="Deportes"
              countA={musicOnly}
              countB={sportsOnly}
              countBoth={both}
              showCounts={true}
              highlightRegion="union"
              size="lg"
            />
          </div>

          <button
            onClick={() => setShowRealWorldAnswer(true)}
            disabled={showRealWorldAnswer}
            className={cn(
              'w-full py-3 rounded-lg font-semibold transition-all',
              showRealWorldAnswer
                ? 'bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 cursor-default'
                : 'bg-pink-500 text-white hover:bg-pink-600'
            )}
          >
            {showRealWorldAnswer ? '¡Solución revelada!' : 'Ver solución'}
          </button>
        </div>

        {showRealWorldAnswer && (
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-700 animate-fadeIn">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="w-full">
                <p className="text-green-800 dark:text-green-200 font-semibold mb-2">
                  Solución usando la regla aditiva:
                </p>
                <div className="space-y-2 text-green-700 dark:text-green-300">
                  <p>Música ∪ Deportes = Música + Deportes - Ambos</p>
                  <p className="text-lg font-bold text-green-900 dark:text-green-100">
                    = 18 + 15 - 8 = <span className="text-xl">25 estudiantes</span>
                  </p>
                  <p className="text-sm mt-2">
                    Eso significa que <strong>5 estudiantes</strong> no les gusta ninguna de las dos actividades.
                  </p>
                  <p className="text-sm">
                    P(al menos una) = 25/30 = <strong>5/6 ≈ 83%</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('summary')}
            disabled={!showRealWorldAnswer}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
              showRealWorldAnswer
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            <span>Ver resumen final</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 5: SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Resumen: Casos Avanzados
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Estrategias clave para problemas complejos
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4 border border-indigo-200 dark:border-indigo-700">
          <h3 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
            📌 Múltiples eventos excluyentes
          </h3>
          <p className="text-indigo-700 dark:text-indigo-300 text-sm">
            Si A, B y C son mutuamente excluyentes:
            <br />
            <code className="font-bold">P(A ∪ B ∪ C) = P(A) + P(B) + P(C)</code>
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
            📌 Estrategia del complemento
          </h3>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            Para &ldquo;al menos uno&rdquo;, calcula &ldquo;ninguno&rdquo; y resta de 1:
            <br />
            <code className="font-bold">P(al menos uno) = 1 - P(ninguno)</code>
          </p>
        </div>

        <div className="bg-pink-50 dark:bg-pink-900/30 rounded-xl p-4 border border-pink-200 dark:border-pink-700">
          <h3 className="font-semibold text-pink-800 dark:text-pink-200 mb-2">
            📌 Datos con Venn
          </h3>
          <p className="text-pink-700 dark:text-pink-300 text-sm">
            Organiza los datos en regiones:
            <br />
            <code className="font-bold">|A ∪ B| = |A| + |B| - |A ∩ B|</code>
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
        <div className="flex items-center gap-2 justify-center">
          <Check className="w-5 h-5 text-green-600" />
          <span className="text-green-800 dark:text-green-200 font-semibold">
            ¡Listo para el checkpoint final!
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Ir al Checkpoint</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
