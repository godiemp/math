'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Heading, Text, Button } from '@/components/ui';
import { Target, TrendingUp, Award, ArrowRight, Loader2 } from 'lucide-react';

interface WeakArea {
  level: string;
  subject: string;
  topic: string;
  accuracy: number;
  attempts: number;
}

interface RecommendationAction {
  level: string;
  subject: string;
  mode: 'zen' | 'rapidfire';
}

interface Recommendation {
  type: 'focus' | 'reinforce' | 'maintain' | 'start';
  priority: 'high' | 'medium' | 'low';
  message: string;
  detail: string;
  action: RecommendationAction;
}

interface RecommendationsData {
  readinessScore: number;
  progress: {
    totalQuestions: number;
    correctQuestions: number;
    overallAccuracy: number;
    totalSessions: number;
    m1: {
      attempted: number;
      correct: number;
      percentage: number;
      total: number;
    };
    m2: {
      attempted: number;
      correct: number;
      percentage: number;
      total: number;
    };
  };
  weakAreas: WeakArea[];
  improvingAreas: WeakArea[];
  strongAreas: WeakArea[];
  recommendations: Recommendation[];
}

export const AdaptiveLearning = () => {
  const router = useRouter();
  const [data, setData] = useState<RecommendationsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

        const response = await fetch(`${apiUrl}/api/quiz/recommendations`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('No se pudieron cargar las recomendaciones');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleStartPractice = (action: RecommendationAction) => {
    const { level, subject, mode } = action;
    const levelPath = level.toLowerCase();

    // Store the configuration for quick start
    localStorage.setItem(`lastQuizConfig-${level}`, JSON.stringify({
      level,
      subject,
      mode,
    }));

    // Navigate to practice page
    router.push(`/practice/${levelPath}?subject=${encodeURIComponent(subject)}&mode=${mode}`);
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'focus':
        return <Target className="w-5 h-5 text-red-500" />;
      case 'reinforce':
        return <TrendingUp className="w-5 h-5 text-yellow-500" />;
      case 'maintain':
        return <Award className="w-5 h-5 text-green-500" />;
      case 'start':
        return <Target className="w-5 h-5 text-blue-500" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  const getReadinessEmoji = (score: number) => {
    if (score >= 80) return '🏆';
    if (score >= 60) return '🎯';
    if (score >= 40) return '📈';
    if (score >= 20) return '🌱';
    return '🚀';
  };

  if (isLoading) {
    return (
      <Card className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </Card>
    );
  }

  if (error || !data) {
    return null; // Don't show the card if there's an error
  }

  const { readinessScore, progress, weakAreas, recommendations } = data;

  return (
    <Card className="space-y-6">
      {/* Header with Readiness Score */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Heading level={3} className="text-xl font-semibold mb-1">
            Tu Preparación PAES {getReadinessEmoji(readinessScore)}
          </Heading>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            Recomendaciones personalizadas basadas en tu desempeño
          </Text>
        </div>

        {progress.totalQuestions > 0 && (
          <div className="flex flex-col items-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl px-4 py-3 text-white shadow-lg">
            <Text className="text-xs font-medium opacity-90">Preparación</Text>
            <Text className="text-2xl font-bold">{readinessScore}%</Text>
          </div>
        )}
      </div>

      {/* Progress Stats */}
      {progress.totalQuestions > 0 && (
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200 dark:border-gray-700">
          <div>
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              M1: {progress.m1.attempted}/{progress.m1.total} preguntas
            </Text>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress.m1.percentage}%` }}
              />
            </div>
            <Text className="text-xs text-gray-500 mt-1">{progress.m1.percentage}% cubierto</Text>
          </div>

          <div>
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              M2: {progress.m2.attempted}/{progress.m2.total} preguntas
            </Text>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress.m2.percentage}%` }}
              />
            </div>
            <Text className="text-xs text-gray-500 mt-1">{progress.m2.percentage}% cubierto</Text>
          </div>
        </div>
      )}

      {/* Weak Areas */}
      {weakAreas.length > 0 && (
        <div>
          <Heading level={4} className="text-sm font-semibold mb-3 text-red-600 dark:text-red-400">
            🎯 Áreas que necesitan atención
          </Heading>
          <div className="space-y-2">
            {weakAreas.slice(0, 2).map((area, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 rounded-lg p-3"
              >
                <div>
                  <Text className="text-sm font-medium">
                    {area.subject} ({area.level})
                  </Text>
                  <Text className="text-xs text-gray-600 dark:text-gray-400">
                    {area.accuracy}% de precisión
                  </Text>
                </div>
                <div className="text-right">
                  <Text className="text-xs text-gray-500">{area.attempts} intentos</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div>
        <Heading level={4} className="text-sm font-semibold mb-3">
          📚 Recomendaciones para ti
        </Heading>
        <div className="space-y-3">
          {recommendations.slice(0, 2).map((rec, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600"
            >
              <div className="mt-0.5">
                {getRecommendationIcon(rec.type)}
              </div>
              <div className="flex-1">
                <Text className="text-sm font-semibold mb-1">
                  {rec.message}
                </Text>
                <Text className="text-xs text-gray-600 dark:text-gray-400">
                  {rec.detail}
                </Text>
              </div>
              <Button
                size="sm"
                onClick={() => handleStartPractice(rec.action)}
                className="shrink-0"
              >
                Practicar
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      {progress.totalQuestions === 0 && (
        <div className="text-center py-4">
          <Text className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Comienza a practicar para recibir recomendaciones personalizadas
          </Text>
          <Button
            onClick={() => router.push('/practice/m1')}
            className="mx-auto"
          >
            Comenzar Ahora
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </Card>
  );
};
