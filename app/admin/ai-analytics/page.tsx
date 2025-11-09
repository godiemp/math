'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import { api } from '@/lib/api-client';

interface AIAnalytics {
  overview: {
    total_interactions: string;
    unique_users: string;
    interactions_last_24h: string;
    interactions_last_7d: string;
    avg_response_time_ms: number;
    max_response_time_ms: number;
  };
  interactionsByType: Array<{
    interaction_type: string;
    count: string;
    unique_users: string;
    avg_response_time_ms: number;
  }>;
  topQuestions: Array<{
    questionId: string;
    interactionCount: number;
    uniqueUsers: number;
    questionPreview: string;
    topic: string;
    difficulty: string;
  }>;
  userEngagement: Array<{
    userId: string;
    interactionCount: number;
    chatCount: number;
    helpCount: number;
    lastInteraction: string;
  }>;
  recentInteractions: Array<{
    id: number;
    userId: string;
    questionId: string;
    interactionType: string;
    userMessagePreview: string;
    aiResponsePreview: string;
    turnNumber: number;
    responseTimeMs: number;
    createdAt: string;
  }>;
  conversationStats: {
    averageTurns: string;
    longestConversations: Array<{
      sessionId: string;
      turns: number;
      duration: number;
    }>;
  };
  timeSeries: Array<{
    date: string;
    total_interactions: string;
    unique_users: string;
    chat_count: string;
    help_count: string;
    avg_response_time: number;
  }>;
}

interface CommonQuestions {
  commonQuestions: Array<{
    question: string;
    frequency: number;
    uniqueUsers: number;
    avgResponseTime: number;
    topics: string[];
  }>;
}

function AIAnalyticsContent() {
  const [analytics, setAnalytics] = useState<AIAnalytics | null>(null);
  const [commonQuestions, setCommonQuestions] = useState<CommonQuestions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'questions' | 'users' | 'recent'>('overview');

  useEffect(() => {
    loadAnalytics();
    loadCommonQuestions();
  }, []);

  const loadAnalytics = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<AIAnalytics>('/api/ai-analytics/dashboard');

      if (response.error) {
        setError(response.error.error);
        return;
      }

      setAnalytics(response.data!);
    } catch (err) {
      setError('Error al cargar analytics de IA');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCommonQuestions = async () => {
    try {
      const response = await api.get<CommonQuestions>('/api/ai-analytics/common-questions?limit=10');
      if (!response.error) {
        setCommonQuestions(response.data!);
      }
    } catch (err) {
      console.error('Error loading common questions:', err);
    }
  };

  const formatNumber = (num: string | number) => {
    return typeof num === 'string' ? parseInt(num).toLocaleString() : num.toLocaleString();
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const formatDate = (timestamp: string) => {
    return new Date(parseInt(timestamp)).toLocaleString('es-CL');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <Heading>Cargando analytics...</Heading>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 p-6">
            <Text className="text-red-600 dark:text-red-400">{error || 'Error desconocido'}</Text>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Heading className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            📊 Analytics de IA Tutor
          </Heading>
          <Text className="text-gray-600 dark:text-gray-400">
            Métricas de uso y efectividad del tutor IA
          </Text>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Interacciones</Text>
            <Heading className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatNumber(analytics.overview.total_interactions)}
            </Heading>
            <Text className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {formatNumber(analytics.overview.interactions_last_7d)} en últimos 7 días
            </Text>
          </Card>

          <Card className="p-6">
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Usuarios Únicos</Text>
            <Heading className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {formatNumber(analytics.overview.unique_users)}
            </Heading>
            <Text className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Han usado el tutor IA
            </Text>
          </Card>

          <Card className="p-6">
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tiempo de Respuesta Promedio</Text>
            <Heading className="text-3xl font-bold text-green-600 dark:text-green-400">
              {(analytics.overview.avg_response_time_ms / 1000).toFixed(1)}s
            </Heading>
            <Text className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Máx: {(analytics.overview.max_response_time_ms / 1000).toFixed(1)}s
            </Text>
          </Card>

          <Card className="p-6">
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Últimas 24 Horas</Text>
            <Heading className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {formatNumber(analytics.overview.interactions_last_24h)}
            </Heading>
            <Text className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Interacciones recientes
            </Text>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`pb-3 px-4 font-medium transition-colors ${
              selectedTab === 'overview'
                ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setSelectedTab('questions')}
            className={`pb-3 px-4 font-medium transition-colors ${
              selectedTab === 'questions'
                ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Preguntas
          </button>
          <button
            onClick={() => setSelectedTab('users')}
            className={`pb-3 px-4 font-medium transition-colors ${
              selectedTab === 'users'
                ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Usuarios
          </button>
          <button
            onClick={() => setSelectedTab('recent')}
            className={`pb-3 px-4 font-medium transition-colors ${
              selectedTab === 'recent'
                ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Recientes
          </button>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Interactions by Type */}
            <Card className="p-6">
              <Heading className="text-xl font-bold mb-4">Interacciones por Tipo</Heading>
              <div className="space-y-3">
                {analytics.interactionsByType.map((type) => (
                  <div key={type.interaction_type} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <Text className="font-semibold capitalize">{type.interaction_type}</Text>
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        {formatNumber(type.unique_users)} usuarios únicos
                      </Text>
                    </div>
                    <div className="text-right">
                      <Text className="text-2xl font-bold">{formatNumber(type.count)}</Text>
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        ~{(type.avg_response_time_ms / 1000).toFixed(1)}s
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Conversation Stats */}
            <Card className="p-6">
              <Heading className="text-xl font-bold mb-4">Estadísticas de Conversaciones</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Promedio de Turnos por Conversación
                  </Text>
                  <Text className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {analytics.conversationStats.averageTurns}
                  </Text>
                </div>
                <div>
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Conversación Más Larga
                  </Text>
                  <Text className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {analytics.conversationStats.longestConversations[0]?.turns || 0} turnos
                  </Text>
                </div>
              </div>
            </Card>

            {/* Common Student Questions */}
            {commonQuestions && commonQuestions.commonQuestions.length > 0 && (
              <Card className="p-6">
                <Heading className="text-xl font-bold mb-4">Preguntas Comunes de Estudiantes</Heading>
                <div className="space-y-3">
                  {commonQuestions.commonQuestions.slice(0, 5).map((q, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <Text className="font-medium flex-1">{q.question}</Text>
                        <Badge className="ml-2">{q.frequency}x</Badge>
                      </div>
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        {q.uniqueUsers} usuarios • {q.topics.slice(0, 2).join(', ')}
                      </Text>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Questions Tab */}
        {selectedTab === 'questions' && (
          <Card className="p-6">
            <Heading className="text-xl font-bold mb-4">Preguntas que Más Ayuda Requieren</Heading>
            <div className="space-y-4">
              {analytics.topQuestions.map((q, idx) => (
                <div key={q.questionId} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          #{idx + 1}
                        </Badge>
                        <Badge variant="secondary">{q.topic}</Badge>
                        <Badge variant={
                          q.difficulty === 'easy' ? 'success' :
                          q.difficulty === 'medium' ? 'warning' : 'danger'
                        }>
                          {q.difficulty}
                        </Badge>
                      </div>
                      <Text className="font-medium text-sm mb-1">{q.questionPreview}...</Text>
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        {q.uniqueUsers} usuarios diferentes pidieron ayuda
                      </Text>
                    </div>
                    <div className="text-right ml-4">
                      <Text className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {q.interactionCount}
                      </Text>
                      <Text className="text-xs text-gray-500">interacciones</Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Users Tab */}
        {selectedTab === 'users' && (
          <Card className="p-6">
            <Heading className="text-xl font-bold mb-4">Usuarios Más Activos</Heading>
            <div className="space-y-3">
              {analytics.userEngagement.slice(0, 10).map((user, idx) => (
                <div key={user.userId} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <Text className="font-semibold">Usuario: {user.userId.substring(0, 8)}...</Text>
                    <Text className="text-sm text-gray-600 dark:text-gray-400">
                      {user.chatCount} chats • {user.helpCount} ayudas
                    </Text>
                  </div>
                  <div className="text-right">
                    <Text className="text-xl font-bold">{user.interactionCount}</Text>
                    <Text className="text-xs text-gray-500">interacciones</Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Recent Tab */}
        {selectedTab === 'recent' && (
          <Card className="p-6">
            <Heading className="text-xl font-bold mb-4">Interacciones Recientes</Heading>
            <div className="space-y-3">
              {analytics.recentInteractions.slice(0, 20).map((interaction) => (
                <div key={interaction.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={interaction.interactionType === 'chat' ? 'info' : 'secondary'}>
                          {interaction.interactionType}
                        </Badge>
                        <Text className="text-xs text-gray-500">
                          Turno {interaction.turnNumber}
                        </Text>
                        <Text className="text-xs text-gray-500">
                          {formatDate(interaction.createdAt)}
                        </Text>
                      </div>
                      <Text className="text-sm font-medium mb-1">
                        👤 {interaction.userMessagePreview}...
                      </Text>
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        🤖 {interaction.aiResponsePreview}...
                      </Text>
                    </div>
                    <Text className="text-xs text-gray-500 ml-4">
                      {(interaction.responseTimeMs / 1000).toFixed(2)}s
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function AIAnalyticsPage() {
  return (
    <ProtectedRoute adminOnly>
      <AIAnalyticsContent />
    </ProtectedRoute>
  );
}
