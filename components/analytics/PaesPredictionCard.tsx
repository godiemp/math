'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { usePaesPrediction, MIN_ATTEMPTS_FOR_PREDICTION } from './usePaesPrediction';
import type { ScoreLevel, PaesPrediction } from './usePaesPrediction';

const LEVEL_COLORS: Record<string, string> = {
  'Pre-Básico': 'from-gray-500 to-gray-600',
  'Básico': 'from-blue-400 to-blue-500',
  'Medio Inicial': 'from-cyan-400 to-cyan-600',
  'Medio Avanzado': 'from-green-500 to-green-600',
  'Avanzado': 'from-yellow-500 to-yellow-600',
  'Sobresaliente': 'from-orange-500 to-orange-600',
  'Excelencia': 'from-purple-600 to-pink-600',
};

const LEVEL_EMOJIS: Record<string, string> = {
  'Pre-Básico': '🌱',
  'Básico': '📘',
  'Medio Inicial': '📗',
  'Medio Avanzado': '🎯',
  'Avanzado': '🚀',
  'Sobresaliente': '⭐',
  'Excelencia': '👑',
};

// Sub-components for each view state
function LoadingState() {
  return (
    <Card className="animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </Card>
  );
}

function ErrorState({ error }: { error: string }) {
  return (
    <Card>
      <Text size="sm" className="text-red-500">
        {error}
      </Text>
    </Card>
  );
}

interface InitialEstimateFormProps {
  userInput: string;
  setUserInput: (value: string) => void;
  saving: boolean;
  error: string | null;
  levels: ScoreLevel[];
  onSave: () => void;
  onSkip: () => void;
}

function InitialEstimateForm({
  userInput,
  setUserInput,
  saving,
  error,
  levels,
  onSave,
  onSkip,
}: InitialEstimateFormProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
      <div className="relative space-y-6">
        <div>
          <div className="text-5xl mb-4 text-center">🎯</div>
          <Heading level={3} size="md" className="mb-2 text-center">
            ¿Cuál es tu nivel actual?
          </Heading>
          <Text size="sm" variant="secondary" className="text-center">
            Cuéntanos tu puntaje objetivo o nivel estimado para personalizar tu experiencia
          </Text>
        </div>

        <div className="space-y-3">
          <Text size="sm" variant="secondary">
            Ingresa tu puntaje PAES estimado (150-1000):
          </Text>
          <div className="flex gap-2">
            <input
              type="number"
              min="150"
              max="1000"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ej: 650"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={onSave} disabled={saving || !userInput} className="whitespace-nowrap">
              {saving ? 'Guardando...' : 'Continuar'}
            </Button>
          </div>
          {error && (
            <Text size="xs" className="text-red-500">
              {error}
            </Text>
          )}
          <Button onClick={onSkip} variant="ghost" className="w-full text-xs">
            Omitir por ahora
          </Button>
        </div>

        {levels.length > 0 && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Text size="xs" variant="secondary" className="mb-2">
              Referencia de niveles:
            </Text>
            <div className="space-y-1">
              {levels.map((level) => (
                <div key={level.name} className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">
                    {LEVEL_EMOJIS[level.name]} {level.name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-500">
                    {level.min}-{level.max}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

interface CollectingDataViewProps {
  prediction: PaesPrediction;
  totalAttempts: number;
  attemptsNeeded: number;
  progressPercentage: number;
}

function CollectingDataView({ prediction, totalAttempts, attemptsNeeded, progressPercentage }: CollectingDataViewProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
      <div className="relative space-y-6">
        <div className="text-center">
          <div
            className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${
              LEVEL_COLORS[prediction.currentLevel] || LEVEL_COLORS['Medio Inicial']
            } text-white shadow-lg mb-4`}
          >
            <div className="text-2xl mb-1">{LEVEL_EMOJIS[prediction.currentLevel] || '📊'}</div>
            <Text size="sm" className="font-bold text-white">
              {prediction.currentLevel}
            </Text>
          </div>
        </div>

        <div className="text-center">
          <Heading level={3} size="md" className="mb-2">
            Recolectando datos
          </Heading>
          <Text size="sm" variant="secondary">
            Necesitas más práctica para refinar tu predicción
          </Text>
        </div>

        <div className="space-y-3">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <Text size="sm" className="font-semibold text-center">
            {totalAttempts} de {MIN_ATTEMPTS_FOR_PREDICTION} preguntas completadas
          </Text>
          <Text size="xs" variant="secondary" className="text-center">
            Completa {attemptsNeeded} pregunta{attemptsNeeded !== 1 ? 's' : ''} más para obtener tu predicción refinada
          </Text>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <Text size="xs" variant="secondary" className="mb-1">
            Rango estimado actual:
          </Text>
          <Text size="lg" className="font-bold">
            {prediction.scoreMin} - {prediction.scoreMax}
          </Text>
        </div>
      </div>
    </Card>
  );
}

interface FullPredictionViewProps {
  prediction: PaesPrediction;
  levels: ScoreLevel[];
}

function FullPredictionView({ prediction, levels }: FullPredictionViewProps) {
  const levelColor = LEVEL_COLORS[prediction.currentLevel] || LEVEL_COLORS['Medio Inicial'];
  const levelEmoji = LEVEL_EMOJIS[prediction.currentLevel] || '📊';

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${levelColor} opacity-10 pointer-events-none`} />
      <div className="relative space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Text size="xs" variant="secondary" className="mb-1">
              Tu nivel actual:
            </Text>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${levelColor} text-white shadow-lg`}>
              <span className="text-xl">{levelEmoji}</span>
              <Text size="md" className="font-bold text-white">
                {prediction.currentLevel}
              </Text>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Text size="sm" variant="secondary">
            Rango de puntaje predicho:
          </Text>
          <div className="flex items-center justify-center gap-3">
            <div className="text-center">
              <Text size="xs" variant="secondary">
                Mínimo
              </Text>
              <Heading level={3} size="lg" className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${levelColor}`}>
                {prediction.scoreMin}
              </Heading>
            </div>
            <div className="text-3xl text-gray-400">-</div>
            <div className="text-center">
              <Text size="xs" variant="secondary">
                Máximo
              </Text>
              <Heading level={3} size="lg" className={`font-black text-transparent bg-clip-text bg-gradient-to-r ${levelColor}`}>
                {prediction.scoreMax}
              </Heading>
            </div>
          </div>
          <Text size="xs" variant="secondary" className="text-center">
            Rango de {prediction.scoreMax - prediction.scoreMin} puntos
          </Text>
        </div>

        {levels.length > 0 && (
          <div className="space-y-2">
            <Text size="xs" variant="secondary">
              Progreso en el nivel:
            </Text>
            <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              {(() => {
                const currentLevelDef = levels.find((l) => l.name === prediction.currentLevel);
                if (!currentLevelDef) return null;

                const levelRange = currentLevelDef.max - currentLevelDef.min;
                const midPoint = (prediction.scoreMin + prediction.scoreMax) / 2;
                const positionInLevel = midPoint - currentLevelDef.min;
                const progressPercent = Math.min(Math.max((positionInLevel / levelRange) * 100, 0), 100);

                return (
                  <div className={`h-full bg-gradient-to-r ${levelColor} transition-all duration-500`} style={{ width: `${progressPercent}%` }} />
                );
              })()}
            </div>
          </div>
        )}

        {prediction.factors.totalAttempts > 0 && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Text size="xs" variant="secondary">
                  Intentos
                </Text>
                <Text size="lg" className="font-bold">
                  {prediction.factors.totalAttempts}
                </Text>
              </div>
              <div>
                <Text size="xs" variant="secondary">
                  Precisión
                </Text>
                <Text size="lg" className="font-bold">
                  {prediction.factors.overallAccuracy.toFixed(1)}%
                </Text>
              </div>
              <div>
                <Text size="xs" variant="secondary">
                  Tendencia
                </Text>
                <Text
                  size="lg"
                  className={`font-bold ${
                    prediction.factors.recentTrend > 0.05
                      ? 'text-green-600 dark:text-green-400'
                      : prediction.factors.recentTrend < -0.05
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {prediction.factors.recentTrend > 0.05 ? '📈' : prediction.factors.recentTrend < -0.05 ? '📉' : '➡️'}
                </Text>
              </div>
            </div>
          </div>
        )}

        <Text size="xs" variant="secondary" className="text-center">
          Actualizado: {new Date(prediction.updatedAt).toLocaleDateString('es-CL')}
        </Text>
      </div>
    </Card>
  );
}

// Main component - pure presentation
export const PaesPredictionCard: React.FC = () => {
  const {
    prediction,
    levels,
    loading,
    error,
    userInput,
    saving,
    showInitialEstimate,
    hasEnoughData,
    totalAttempts,
    attemptsNeeded,
    progressPercentage,
    setUserInput,
    setShowInitialEstimate,
    handleSaveInitialEstimate,
  } = usePaesPrediction();

  if (loading) {
    return <LoadingState />;
  }

  if (error && !prediction) {
    return <ErrorState error={error} />;
  }

  if (!prediction) {
    return null;
  }

  if (showInitialEstimate) {
    return (
      <InitialEstimateForm
        userInput={userInput}
        setUserInput={setUserInput}
        saving={saving}
        error={error}
        levels={levels}
        onSave={handleSaveInitialEstimate}
        onSkip={() => setShowInitialEstimate(false)}
      />
    );
  }

  if (!hasEnoughData) {
    return (
      <CollectingDataView
        prediction={prediction}
        totalAttempts={totalAttempts}
        attemptsNeeded={attemptsNeeded}
        progressPercentage={progressPercentage}
      />
    );
  }

  return <FullPredictionView prediction={prediction} levels={levels} />;
};
