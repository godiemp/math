'use client';

import { useEffect, useState } from 'react';
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

export interface PaesPrediction {
  id: string;
  userId: string;
  currentLevel: string;
  scoreMin: number;
  scoreMax: number;
  userInitialEstimate: number | null;
  factors: PredictionFactors;
  calculatedAt: number;
  updatedAt: number;
  systemPrediction?: number;
  confidenceRange?: number;
}

export interface ScoreLevel {
  name: string;
  min: number;
  max: number;
  description: string;
}

export const MIN_ATTEMPTS_FOR_PREDICTION = 20;

export interface UsePaesPredictionReturn {
  // State
  prediction: PaesPrediction | null;
  levels: ScoreLevel[];
  loading: boolean;
  error: string | null;
  userInput: string;
  saving: boolean;
  showInitialEstimate: boolean;

  // Computed
  hasEnoughData: boolean;
  totalAttempts: number;
  attemptsNeeded: number;
  progressPercentage: number;

  // Actions
  setUserInput: (value: string) => void;
  setShowInitialEstimate: (value: boolean) => void;
  handleSaveInitialEstimate: () => Promise<void>;
}

export function usePaesPrediction(): UsePaesPredictionReturn {
  const [prediction, setPrediction] = useState<PaesPrediction | null>(null);
  const [levels, setLevels] = useState<ScoreLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [showInitialEstimate, setShowInitialEstimate] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [predictionResponse, levelsResponse] = await Promise.all([
        api.get<{ success: boolean; data: PaesPrediction }>('/api/prediction'),
        api.get<{ success: boolean; data: ScoreLevel[] }>('/api/prediction/levels'),
      ]);

      if (predictionResponse.error) {
        setError(predictionResponse.error.error);
      } else if (predictionResponse.data) {
        const pred = predictionResponse.data.data;
        setPrediction(pred);
        setUserInput(pred.userInitialEstimate?.toString() || '');

        if (!pred.userInitialEstimate && pred.factors.totalAttempts === 0) {
          setShowInitialEstimate(true);
        }
      }

      if (levelsResponse.data) {
        setLevels(levelsResponse.data.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveInitialEstimate = async () => {
    const value = parseInt(userInput, 10);

    if (isNaN(value) || value < 150 || value > 1000) {
      setError('El puntaje debe estar entre 150 y 1000');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const response = await api.post<{ success: boolean; data: PaesPrediction }>('/api/prediction/initial', {
        estimate: value,
      });

      if (response.error) {
        setError(response.error.error);
      } else if (response.data) {
        setPrediction(response.data.data);
        setShowInitialEstimate(false);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save estimate');
    } finally {
      setSaving(false);
    }
  };

  // Computed values
  const totalAttempts = prediction?.factors.totalAttempts || 0;
  const hasEnoughData = totalAttempts >= MIN_ATTEMPTS_FOR_PREDICTION;
  const attemptsNeeded = MIN_ATTEMPTS_FOR_PREDICTION - totalAttempts;
  const progressPercentage = Math.min((totalAttempts / MIN_ATTEMPTS_FOR_PREDICTION) * 100, 100);

  return {
    // State
    prediction,
    levels,
    loading,
    error,
    userInput,
    saving,
    showInitialEstimate,

    // Computed
    hasEnoughData,
    totalAttempts,
    attemptsNeeded,
    progressPercentage,

    // Actions
    setUserInput,
    setShowInitialEstimate,
    handleSaveInitialEstimate,
  };
}
