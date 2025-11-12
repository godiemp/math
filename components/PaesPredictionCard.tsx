'use client';

import React, { useEffect, useState } from 'react';
import { Card } from './ui/Card';
import { Heading, Text } from './ui/Typography';
import { Button } from './ui/Button';
import { api } from '@/lib/api-client';

interface PredictionFactors {
  overallAccuracy: number;
  accuracyByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
    extreme: number;
  };
  accuracyBySubject: {
    números: number;
    álgebra: number;
    geometría: number;
    probabilidad: number;
  };
  totalAttempts: number;
  recentTrend: number;
}

interface PaesPrediction {
  id: string;
  userId: string;
  systemPrediction: number;
  confidenceRange: number;
  userPrediction: number | null;
  factors: PredictionFactors;
  calculatedAt: number;
  updatedAt: number;
}

export const PaesPredictionCard: React.FC = () => {
  const [prediction, setPrediction] = useState<PaesPrediction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPrediction();
  }, []);

  const fetchPrediction = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<{ success: boolean; data: PaesPrediction }>('/api/prediction');
      if (response.error) {
        setError(response.error.error);
      } else if (response.data) {
        setPrediction(response.data.data);
        setUserInput(response.data.data.userPrediction?.toString() || '');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch prediction');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUserPrediction = async () => {
    const value = parseInt(userInput, 10);

    if (isNaN(value) || value < 150 || value > 1000) {
      setError('El puntaje debe estar entre 150 y 1000');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const response = await api.post<{ success: boolean; data: PaesPrediction }>('/api/prediction/user', {
        prediction: value,
      });

      if (response.error) {
        setError(response.error.error);
      } else if (response.data) {
        setPrediction(response.data.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save prediction');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </Card>
    );
  }

  if (error && !prediction) {
    return (
      <Card>
        <Text size="sm" className="text-red-500">
          {error}
        </Text>
      </Card>
    );
  }

  if (!prediction) {
    return null;
  }

  const MIN_ATTEMPTS_FOR_PREDICTION = 20;
  const totalAttempts = prediction.factors.totalAttempts || 0;
  const hasEnoughData = totalAttempts >= MIN_ATTEMPTS_FOR_PREDICTION;

  // Show "not enough data" message
  if (!hasEnoughData) {
    const attemptsNeeded = MIN_ATTEMPTS_FOR_PREDICTION - totalAttempts;
    const progressPercentage = Math.min((totalAttempts / MIN_ATTEMPTS_FOR_PREDICTION) * 100, 100);

    return (
      <Card className="relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />

        <div className="relative space-y-6 text-center">
          {/* Header */}
          <div>
            <div className="text-5xl mb-4">📊</div>
            <Heading level={3} size="md" className="mb-2">
              🎯 Predicción PAES
            </Heading>
            <Text size="sm" variant="secondary">
              Necesitas más práctica para generar tu predicción
            </Text>
          </div>

          {/* Progress */}
          <div className="space-y-3">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <Text size="sm" className="font-semibold">
              {totalAttempts} de {MIN_ATTEMPTS_FOR_PREDICTION} preguntas completadas
            </Text>
            <Text size="xs" variant="secondary">
              Completa {attemptsNeeded} pregunta{attemptsNeeded !== 1 ? 's' : ''} más para obtener tu predicción personalizada
            </Text>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Text size="xs" variant="secondary">
              💡 Mientras más practiques, más precisa será tu predicción
            </Text>
          </div>
        </div>
      </Card>
    );
  }

  const lowRange = prediction.systemPrediction - prediction.confidenceRange;
  const highRange = prediction.systemPrediction + prediction.confidenceRange;

  return (
    <Card className="relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />

      <div className="relative space-y-6">
        {/* Header */}
        <div>
          <Heading level={3} size="md" className="mb-2">
            🎯 Predicción PAES
          </Heading>
          <Text size="sm" variant="secondary">
            Basado en tu desempeño actual
          </Text>
        </div>

        {/* System Prediction */}
        <div className="space-y-2">
          <Text size="sm" variant="secondary">
            Nuestra predicción:
          </Text>
          <div className="flex items-baseline gap-3">
            <Heading
              level={2}
              size="lg"
              className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            >
              {prediction.systemPrediction}
            </Heading>
            <Text size="sm" variant="secondary">
              puntos
            </Text>
          </div>
          <Text size="xs" variant="secondary">
            Rango de confianza: {lowRange} - {highRange}
          </Text>
        </div>

        {/* User Prediction Input */}
        <div className="space-y-3">
          <Text size="sm" variant="secondary">
            ¿Cuánto crees que obtendrás?
          </Text>
          <div className="flex gap-2">
            <input
              type="number"
              min="150"
              max="1000"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ej: 700"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={handleSaveUserPrediction}
              disabled={saving || !userInput}
              className="whitespace-nowrap"
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
          {error && (
            <Text size="xs" className="text-red-500">
              {error}
            </Text>
          )}
        </div>

        {/* Comparison */}
        {prediction.userPrediction && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <Text size="xs" variant="secondary">
                  Tu predicción:
                </Text>
                <Text size="lg" className="font-bold">
                  {prediction.userPrediction}
                </Text>
              </div>
              <div className="text-right">
                <Text size="xs" variant="secondary">
                  Diferencia:
                </Text>
                <Text
                  size="lg"
                  className={`font-bold ${
                    prediction.userPrediction > prediction.systemPrediction
                      ? 'text-green-600 dark:text-green-400'
                      : prediction.userPrediction < prediction.systemPrediction
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {prediction.userPrediction > prediction.systemPrediction ? '+' : ''}
                  {prediction.userPrediction - prediction.systemPrediction}
                </Text>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        {prediction.factors.totalAttempts > 0 && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Text size="xs" variant="secondary" className="mb-2">
              Basado en {prediction.factors.totalAttempts} intentos
            </Text>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <Text size="xs" variant="secondary">
                  Precisión general:
                </Text>
                <Text size="sm" className="font-semibold">
                  {prediction.factors.overallAccuracy.toFixed(1)}%
                </Text>
              </div>
              <div>
                <Text size="xs" variant="secondary">
                  Tendencia:
                </Text>
                <Text
                  size="sm"
                  className={`font-semibold ${
                    prediction.factors.recentTrend > 0.05
                      ? 'text-green-600 dark:text-green-400'
                      : prediction.factors.recentTrend < -0.05
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {prediction.factors.recentTrend > 0.05
                    ? '📈 Mejorando'
                    : prediction.factors.recentTrend < -0.05
                    ? '📉 Bajando'
                    : '➡️ Estable'}
                </Text>
              </div>
            </div>
          </div>
        )}

        {/* Last updated */}
        <Text size="xs" variant="secondary" className="text-right">
          Actualizado: {new Date(prediction.updatedAt).toLocaleDateString('es-CL')}
        </Text>
      </div>
    </Card>
  );
};
