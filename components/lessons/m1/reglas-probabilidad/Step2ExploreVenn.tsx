'use client';

import { useState } from 'react';
import { ArrowRight, Check, AlertTriangle, Lightbulb, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { VennDiagram } from '@/components/lessons/shared';

type Phase = 'intro' | 'complement' | 'exclusive' | 'non_exclusive' | 'summary';

export default function Step2ExploreVenn({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [complementValue, setComplementValue] = useState(30);
  const [showExclusiveFormula, setShowExclusiveFormula] = useState(false);
  const [showOverlapWarning, setShowOverlapWarning] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Diagrama de Venn
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Una herramienta poderosa para visualizar probabilidades
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <p className="text-gray-800 dark:text-gray-200 text-center mb-4">
            En esta sección vamos a descubrir <strong>tres reglas importantes</strong>:
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">1</div>
              <span className="text-gray-700 dark:text-gray-300">El <strong>Complemento</strong>: Lo que NO es A</span>
            </div>
            <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</div>
              <span className="text-gray-700 dark:text-gray-300">Eventos <strong>Mutuamente Excluyentes</strong>: A O B (sin superposición)</span>
            </div>
            <div className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">3</div>
              <span className="text-gray-700 dark:text-gray-300">Eventos <strong>No Excluyentes</strong>: A O B (con superposición)</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('complement')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Empecemos</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: COMPLEMENT ============
  if (phase === 'complement') {
    const pA = complementValue;
    const pNotA = 100 - complementValue;

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Complemento
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Todo lo que NO es el evento A
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6">
          <p className="text-amber-800 dark:text-amber-200 text-center mb-4">
            Imagina que la probabilidad de <strong>lluvia</strong> mañana es del <strong>{pA}%</strong>.
            <br />
            ¿Cuál es la probabilidad de que <strong>NO llueva</strong>?
          </p>

          {/* Interactive pie chart visualization - using conic-gradient for smooth updates */}
          <div className="flex justify-center mb-4">
            <div className="relative w-48 h-48">
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `conic-gradient(
                    #22C55E 0deg ${pA * 3.6}deg,
                    #F97316 ${pA * 3.6}deg 360deg
                  )`
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-200">100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Lluvia: {pA}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-500"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">NO lluvia: {pNotA}%</span>
            </div>
          </div>

          {/* Slider */}
          <div className="px-4">
            <label className="text-sm text-gray-600 dark:text-gray-400 block text-center mb-2">
              Ajusta la probabilidad de lluvia:
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={complementValue}
              onChange={(e) => setComplementValue(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Formula reveal */}
        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-700">
          <div className="flex items-start gap-3">
            <RefreshCw className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-green-800 dark:text-green-200 font-semibold mb-2">
                Regla del Complemento:
              </p>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100 text-center my-2">
                P(A&apos;) = 1 - P(A)
              </div>
              <p className="text-green-700 dark:text-green-300 text-sm">
                El evento y su complemento <strong>siempre suman 1</strong> (o 100%).
                <br />
                Si sabes uno, puedes calcular el otro fácilmente.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('exclusive')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Siguiente: Eventos Excluyentes</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: MUTUALLY EXCLUSIVE ============
  if (phase === 'exclusive') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Eventos Mutuamente Excluyentes
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Cuando los eventos NO pueden ocurrir al mismo tiempo
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6">
          <p className="text-blue-800 dark:text-blue-200 text-center mb-4">
            Al lanzar un dado: ¿Cuál es P(sacar <strong>PAR</strong> O sacar <strong>IMPAR</strong>)?
          </p>

          {/* Venn diagram - exclusive mode */}
          <div className="flex justify-center mb-4">
            <VennDiagram
              mode="exclusive"
              labelA="PAR"
              labelB="IMPAR"
              countA={3}
              countB={3}
              showCounts={true}
              size="md"
              animated={true}
            />
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-4">
            Los círculos están <strong>separados</strong> porque un número no puede ser PAR e IMPAR a la vez.
          </p>

          {/* Dice visualization */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="text-center">
              <div className="flex gap-1 mb-1">
                {[2, 4, 6].map((n) => (
                  <div key={n} className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-sm">
                    {n}
                  </div>
                ))}
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400">PAR: 3/6</span>
            </div>
            <div className="text-center">
              <div className="flex gap-1 mb-1">
                {[1, 3, 5].map((n) => (
                  <div key={n} className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white font-bold text-sm">
                    {n}
                  </div>
                ))}
              </div>
              <span className="text-xs text-purple-600 dark:text-purple-400">IMPAR: 3/6</span>
            </div>
          </div>

          <button
            onClick={() => setShowExclusiveFormula(true)}
            className={cn(
              'w-full py-3 rounded-lg font-semibold transition-all',
              showExclusiveFormula
                ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            )}
          >
            {showExclusiveFormula ? '¡Correcto!' : '¿Cómo calculamos P(PAR O IMPAR)?'}
          </button>
        </div>

        {showExclusiveFormula && (
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-700 animate-fadeIn">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-green-800 dark:text-green-200 font-semibold mb-2">
                  Regla Aditiva (Eventos Excluyentes):
                </p>
                <div className="text-xl font-bold text-green-900 dark:text-green-100 text-center my-2">
                  P(A ∪ B) = P(A) + P(B)
                </div>
                <div className="text-lg text-green-800 dark:text-green-200 text-center">
                  P(PAR O IMPAR) = 3/6 + 3/6 = 6/6 = 1
                </div>
                <p className="text-green-700 dark:text-green-300 text-sm mt-2">
                  ¡Tiene sentido! Todo número es PAR o IMPAR, así que la probabilidad es 100%.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('non_exclusive')}
            disabled={!showExclusiveFormula}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
              showExclusiveFormula
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            <span>Siguiente: ¿Qué pasa cuando SÍ se superponen?</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: NON-EXCLUSIVE ============
  if (phase === 'non_exclusive') {
    // Card deck scenario: Aces OR Hearts
    // 4 Aces, 13 Hearts, 1 Ace of Hearts (overlap)
    const cards = [
      { id: 'ace-hearts', label: 'As ♥️', isAce: true, isHeart: true },
      { id: 'ace-diamonds', label: 'As ♦️', isAce: true, isHeart: false },
      { id: 'ace-clubs', label: 'As ♣️', isAce: true, isHeart: false },
      { id: 'ace-spades', label: 'As ♠️', isAce: true, isHeart: false },
    ];

    const toggleCard = (cardId: string) => {
      const newSelected = new Set(selectedCards);
      if (newSelected.has(cardId)) {
        newSelected.delete(cardId);
      } else {
        newSelected.add(cardId);
      }
      setSelectedCards(newSelected);

      // Show warning when Ace of Hearts is selected
      if (cardId === 'ace-hearts' && newSelected.has('ace-hearts')) {
        setShowOverlapWarning(true);
      }
    };

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Eventos NO Mutuamente Excluyentes
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Cuando los eventos SÍ pueden ocurrir juntos
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6">
          <p className="text-purple-800 dark:text-purple-200 text-center mb-4">
            En una baraja: ¿Cuál es P(sacar un <strong>AS</strong> O un <strong>CORAZÓN</strong>)?
          </p>

          {/* Venn diagram - overlapping mode */}
          <div className="flex justify-center mb-4">
            <VennDiagram
              mode="overlapping"
              labelA="Ases"
              labelB="Corazones"
              countA={3}
              countB={12}
              countBoth={1}
              showCounts={true}
              highlightRegion={showOverlapWarning ? 'intersection' : 'none'}
              size="md"
              animated={true}
            />
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-4">
            Los círculos se <strong>superponen</strong> porque existe el As de Corazones.
          </p>

          {/* Interactive cards */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 text-center">
              Toca los Ases para explorar:
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => toggleCard(card.id)}
                  className={cn(
                    'px-3 py-2 rounded-lg font-semibold transition-all border-2',
                    selectedCards.has(card.id)
                      ? card.isAce && card.isHeart
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-yellow-400'
                        : 'bg-blue-500 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                  )}
                >
                  {card.label}
                  {card.isAce && card.isHeart && selectedCards.has(card.id) && (
                    <span className="ml-1 text-yellow-300">⚠️</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Overlap warning */}
          {showOverlapWarning && (
            <div className="bg-amber-100 dark:bg-amber-900/40 rounded-lg p-4 border-2 border-amber-400 animate-fadeIn">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="text-amber-800 dark:text-amber-200 font-semibold">
                    ¡El As de Corazones está en AMBOS grupos!
                  </p>
                  <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                    Si simplemente sumamos P(As) + P(Corazón) = 4/52 + 13/52 = 17/52,
                    <br />
                    <strong>¡estaríamos contando el As de Corazones DOS VECES!</strong>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Formula reveal */}
        {showOverlapWarning && (
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-700 animate-fadeIn">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-green-800 dark:text-green-200 font-semibold mb-2">
                  Regla Aditiva (Eventos NO Excluyentes):
                </p>
                <div className="text-xl font-bold text-green-900 dark:text-green-100 text-center my-2">
                  P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
                </div>
                <div className="text-lg text-green-800 dark:text-green-200 text-center">
                  P(As O Corazón) = 4/52 + 13/52 - 1/52 = <strong>16/52</strong>
                </div>
                <p className="text-green-700 dark:text-green-300 text-sm mt-2">
                  <strong>Restamos la intersección</strong> para no contar dos veces lo que está en ambos grupos.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('summary')}
            disabled={!showOverlapWarning}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all shadow-lg',
              showOverlapWarning
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            <span>Ver resumen</span>
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
          Resumen: Las Reglas Descubiertas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Tres herramientas poderosas para calcular probabilidades
        </p>
      </div>

      <div className="space-y-4">
        {/* Complement */}
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center">
              <RefreshCw size={18} />
            </div>
            <span className="font-semibold text-amber-800 dark:text-amber-200">Complemento</span>
          </div>
          <div className="text-xl font-bold text-amber-900 dark:text-amber-100 text-center">
            P(A&apos;) = 1 - P(A)
          </div>
          <p className="text-sm text-amber-700 dark:text-amber-300 text-center mt-1">
            &ldquo;Lo que NO es A&rdquo;
          </p>
        </div>

        {/* Exclusive */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-24 h-16 flex items-center justify-center overflow-visible flex-shrink-0">
              <VennDiagram mode="exclusive" showLabels={false} size="sm" className="scale-[0.4] origin-center" />
            </div>
            <span className="font-semibold text-blue-800 dark:text-blue-200">Eventos Excluyentes (sin superposición)</span>
          </div>
          <div className="text-xl font-bold text-blue-900 dark:text-blue-100 text-center">
            P(A ∪ B) = P(A) + P(B)
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300 text-center mt-1">
            &ldquo;Solo sumamos&rdquo;
          </p>
        </div>

        {/* Non-exclusive */}
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-24 h-16 flex items-center justify-center overflow-visible flex-shrink-0">
              <VennDiagram mode="overlapping" showLabels={false} size="sm" className="scale-[0.4] origin-center" />
            </div>
            <span className="font-semibold text-purple-800 dark:text-purple-200">Eventos NO Excluyentes (con superposición)</span>
          </div>
          <div className="text-xl font-bold text-purple-900 dark:text-purple-100 text-center">
            P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-300 text-center mt-1">
            &ldquo;Restamos lo que se repite&rdquo;
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
        <div className="flex items-center gap-2 justify-center">
          <Check className="w-5 h-5 text-green-600" />
          <span className="text-green-800 dark:text-green-200 font-semibold">
            ¡Has descubierto las reglas fundamentales!
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
