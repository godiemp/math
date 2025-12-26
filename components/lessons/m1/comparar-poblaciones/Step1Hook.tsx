'use client';

import { useState } from 'react';
import { ArrowRight, School, BarChart3, Sparkles, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { ESCUELA_A, ESCUELA_B, ESCUELA_A_STATS, ESCUELA_B_STATS, POPULATION_COLORS, DataPoint } from './data';

type Phase = 'scenario' | 'question' | 'reveal' | 'result';

// Mini scatter plot preview component
function ScatterPreview({
  dataA,
  dataB,
  showA = true,
  showB = true,
}: {
  dataA: DataPoint[];
  dataB: DataPoint[];
  showA?: boolean;
  showB?: boolean;
}) {
  // SVG dimensions and scaling
  const width = 200;
  const height = 140;
  const padding = 25;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  const toSvgX = (x: number) => padding + ((x - 1) / 9) * plotWidth;
  const toSvgY = (y: number) => height - padding - ((y - 20) / 80) * plotHeight;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[200px]">
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
        <line
          key={`grid-h-${i}`}
          x1={padding}
          y1={padding + t * plotHeight}
          x2={width - padding}
          y2={padding + t * plotHeight}
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeWidth="0.5"
        />
      ))}

      {/* Axes */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        className="stroke-gray-400 dark:stroke-gray-500"
        strokeWidth="1.5"
      />
      <line
        x1={padding}
        y1={height - padding}
        x2={padding}
        y2={padding}
        className="stroke-gray-400 dark:stroke-gray-500"
        strokeWidth="1.5"
      />

      {/* Axis labels */}
      <text x={width / 2} y={height - 5} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-[8px]">
        Horas
      </text>
      <text x={8} y={height / 2} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-[8px]" transform={`rotate(-90, 8, ${height / 2})`}>
        Nota
      </text>

      {/* Data points - Escuela A */}
      {showA && dataA.map((point) => (
        <circle
          key={point.id}
          cx={toSvgX(point.x)}
          cy={toSvgY(point.y)}
          r={4}
          fill={POPULATION_COLORS.A.fill}
          className="transition-opacity duration-300"
        />
      ))}

      {/* Data points - Escuela B */}
      {showB && dataB.map((point) => (
        <circle
          key={point.id}
          cx={toSvgX(point.x)}
          cy={toSvgY(point.y)}
          r={4}
          fill={POPULATION_COLORS.B.fill}
          className="transition-opacity duration-300"
        />
      ))}
    </svg>
  );
}

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('scenario');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  if (!isActive) return null;

  const options = [
    'Escuela A (tiene mejor promedio de notas)',
    'Escuela B (sus estudiantes son mas eficientes)',
    'Son iguales (mismas horas promedio)',
    'No se puede saber solo con estos datos',
  ];
  const correctAnswer = 3; // Cannot determine from averages alone

  // ============ PHASE 1: SCENARIO ============
  if (phase === 'scenario') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
            <School className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-700 dark:text-indigo-300 font-medium">
              La Decision de la Directora
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Dos Escuelas, Una Pregunta
          </h2>
        </div>

        {/* Story setup */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            La directora regional necesita decidir cual escuela tiene un metodo de estudio mas efectivo.
            Tiene datos de 10 estudiantes de cada escuela: sus <strong>horas de estudio</strong> y sus <strong>notas</strong>.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Ella calculo los promedios:
          </p>
        </div>

        {/* Stats comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-blue-500" />
              <span className="font-bold text-blue-800 dark:text-blue-200">Escuela A</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Promedio horas:</span>
                <span className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {ESCUELA_A_STATS.meanHours.toFixed(1)}h
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Promedio notas:</span>
                <span className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {ESCUELA_A_STATS.meanScore.toFixed(0)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 border border-orange-200 dark:border-orange-700">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-orange-500" />
              <span className="font-bold text-orange-800 dark:text-orange-200">Escuela B</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Promedio horas:</span>
                <span className="font-mono font-bold text-orange-700 dark:text-orange-300">
                  {ESCUELA_B_STATS.meanHours.toFixed(1)}h
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Promedio notas:</span>
                <span className="font-mono font-bold text-orange-700 dark:text-orange-300">
                  {ESCUELA_B_STATS.meanScore.toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Analizar los datos</span>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <BarChart3 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span className="text-amber-700 dark:text-amber-300 font-medium">
              Tu Prediccion
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿En cual escuela el estudio tiene mas impacto?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Basandote en los promedios, ¿que concluirias?
          </p>
        </div>

        {/* Quick stats reminder */}
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-gray-600 dark:text-gray-400">
              A: {ESCUELA_A_STATS.meanHours.toFixed(1)}h → {ESCUELA_A_STATS.meanScore.toFixed(0)} pts
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-gray-600 dark:text-gray-400">
              B: {ESCUELA_B_STATS.meanHours.toFixed(1)}h → {ESCUELA_B_STATS.meanScore.toFixed(0)} pts
            </span>
          </div>
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
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold',
                    selectedAnswer === index
                      ? 'border-indigo-500 bg-indigo-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-400'
                  )}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
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
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
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
                  ¡Casi! Piensalo de nuevo
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
              <strong>¡Correcto!</strong> Los promedios son casi iguales, asi que no podemos saber
              cual escuela tiene un metodo mas efectivo solo mirando los promedios.
            </p>
          ) : (
            <p className="text-amber-800 dark:text-amber-200">
              <strong>No tan rapido...</strong> Los promedios son muy similares
              ({ESCUELA_A_STATS.meanScore.toFixed(0)} vs {ESCUELA_B_STATS.meanScore.toFixed(0)}).
              ¿Realmente podemos sacar conclusiones con numeros tan parecidos?
            </p>
          )}
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-5 border border-indigo-200 dark:border-indigo-700">
          <p className="text-indigo-800 dark:text-indigo-200">
            <strong>El problema:</strong> Los promedios esconden la historia completa.
            Necesitamos ver TODOS los datos individuales para entender la relacion real
            entre horas de estudio y notas.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('result')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ver los datos reales</span>
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
            La Verdad Oculta
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Los graficos revelan el patron
        </h2>
      </div>

      {/* Side by side scatter plots */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="font-bold text-blue-800 dark:text-blue-200 text-sm">Escuela A</span>
          </div>
          <div className="flex justify-center">
            <ScatterPreview dataA={ESCUELA_A} dataB={[]} showA={true} showB={false} />
          </div>
          <p className="text-center text-xs text-blue-700 dark:text-blue-300 mt-2">
            Patron claro: mas estudio = mejor nota
          </p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="font-bold text-orange-800 dark:text-orange-200 text-sm">Escuela B</span>
          </div>
          <div className="flex justify-center">
            <ScatterPreview dataA={[]} dataB={ESCUELA_B} showA={false} showB={true} />
          </div>
          <p className="text-center text-xs text-orange-700 dark:text-orange-300 mt-2">
            Patron difuso: el estudio no predice tanto
          </p>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200 dark:border-green-700">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-green-800 dark:text-green-200 mb-2">
              ¡La respuesta estaba en el grafico!
            </p>
            <p className="text-green-700 dark:text-green-300 text-sm">
              En la <strong>Escuela A</strong>, los puntos forman una linea diagonal clara:
              mas horas de estudio se traducen consistentemente en mejores notas.
              En la <strong>Escuela B</strong>, los puntos estan dispersos:
              el tiempo de estudio no predice tan bien el resultado.
            </p>
          </div>
        </div>
      </div>

      {/* Bridge to lesson */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <p className="text-gray-700 dark:text-gray-300 text-center">
          Estos graficos se llaman <strong>nubes de puntos</strong> o <strong>graficos de dispersion</strong>.
          Vamos a aprender a construirlos y usarlos para comparar poblaciones.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>Construir mi primer grafico</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
