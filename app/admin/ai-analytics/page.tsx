'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, Button, Heading, Text, Badge } from '@/components/ui';
import { api } from '@/lib/api-client';
import AdminLayout from '@/components/AdminLayout';

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

interface Conversation {
  sessionId: string;
  userId: string;
  messageCount: number;
  startedAt: string;
  lastMessageAt: string;
  durationMs: number;
  interactionTypes: string[];
}

interface ConversationDetails {
  sessionId: string;
  interactions: Array<{
    id: number;
    user_id: string;
    question_id: string;
    interaction_type: string;
    user_message: string;
    ai_response: string;
    turn_number: number;
    response_time_ms: number;
    request_context: any;
    created_at: string;
  }>;
}

function AIAnalyticsContent() {
  const [analytics, setAnalytics] = useState<AIAnalytics | null>(null);
  const [commonQuestions, setCommonQuestions] = useState<CommonQuestions | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'questions' | 'users' | 'recent' | 'conversations'>('overview');

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

  const loadConversations = async () => {
    try {
      const response = await api.get<{ conversations: Conversation[] }>('/api/ai-analytics/conversations?limit=100');
      if (!response.error) {
        setConversations(response.data!.conversations);
      }
    } catch (err) {
      console.error('Error loading conversations:', err);
    }
  };

  const loadConversationDetails = async (sessionId: string) => {
    try {
      setIsLoadingConversation(true);
      const response = await api.get<ConversationDetails>(`/api/ai-analytics/conversations/${sessionId}`);
      if (!response.error) {
        setSelectedConversation(response.data!);
      }
    } catch (err) {
      console.error('Error loading conversation details:', err);
    } finally {
      setIsLoadingConversation(false);
    }
  };

  useEffect(() => {
    if (selectedTab === 'conversations' && conversations.length === 0) {
      loadConversations();
    }
  }, [selectedTab]);

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
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !analytics) {
    return (
      <AdminLayout>
        <Card padding="lg" className="border-red-200 dark:border-red-800">
          <Text className="text-red-600 dark:text-red-400">{error || 'Unknown error'}</Text>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
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
            onClick={() => setSelectedTab('conversations')}
            className={`pb-3 px-4 font-medium transition-colors ${
              selectedTab === 'conversations'
                ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Conversaciones
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

        {/* Conversations Tab */}
        {selectedTab === 'conversations' && (
          <div>
            {selectedConversation ? (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <Heading className="text-xl font-bold">
                    Conversación: {selectedConversation.sessionId}
                  </Heading>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedConversation(null)}
                  >
                    ← Volver a la lista
                  </Button>
                </div>

                {isLoadingConversation ? (
                  <Text>Cargando conversación...</Text>
                ) : (
                  <div className="space-y-4">
                    {selectedConversation.interactions.map((interaction, idx) => (
                      <div key={interaction.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant={interaction.interaction_type === 'chat' ? 'info' : 'secondary'}>
                            {interaction.interaction_type}
                          </Badge>
                          <Badge variant="neutral" size="sm">
                            Turno {interaction.turn_number}
                          </Badge>
                          <Text className="text-xs text-gray-500">
                            {formatDate(interaction.created_at)}
                          </Text>
                          <Text className="text-xs text-gray-500">
                            {(interaction.response_time_ms / 1000).toFixed(2)}s
                          </Text>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                            <Text className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-semibold">
                              👤 Usuario:
                            </Text>
                            <Text className="text-sm whitespace-pre-wrap">
                              {interaction.user_message}
                            </Text>
                          </div>

                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                            <Text className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-semibold">
                              🤖 AI:
                            </Text>
                            <Text className="text-sm whitespace-pre-wrap">
                              {interaction.ai_response}
                            </Text>
                          </div>
                        </div>

                        {interaction.request_context && (
                          <details className="mt-2">
                            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                              Ver contexto
                            </summary>
                            <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                              {JSON.stringify(interaction.request_context, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ) : (
              <Card className="p-6">
                <Heading className="text-xl font-bold mb-4">
                  Todas las Conversaciones ({conversations.length})
                </Heading>
                <div className="space-y-3">
                  {conversations.map((conv) => (
                    <div
                      key={`${conv.sessionId}-${conv.userId}`}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-400 cursor-pointer transition-colors"
                      onClick={() => loadConversationDetails(conv.sessionId)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Text className="font-semibold">Sesión: {conv.sessionId.substring(0, 12)}...</Text>
                            {conv.interactionTypes.map(type => (
                              <Badge key={type} variant="info" size="sm">{type}</Badge>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <Text className="text-xs text-gray-500">Usuario</Text>
                              <Text className="text-xs font-medium">{conv.userId.substring(0, 8)}...</Text>
                            </div>
                            <div>
                              <Text className="text-xs text-gray-500">Mensajes</Text>
                              <Text className="text-xs font-medium">{conv.messageCount}</Text>
                            </div>
                            <div>
                              <Text className="text-xs text-gray-500">Duración</Text>
                              <Text className="text-xs font-medium">{formatDuration(conv.durationMs)}</Text>
                            </div>
                            <div>
                              <Text className="text-xs text-gray-500">Último mensaje</Text>
                              <Text className="text-xs font-medium">{formatDate(conv.lastMessageAt)}</Text>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Ver →
                        </Button>
                      </div>
                    </div>
                  ))}

                  {conversations.length === 0 && (
                    <div className="text-center py-12">
                      <Text variant="secondary">No hay conversaciones registradas</Text>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
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
    </AdminLayout>
  );
}

export default function AIAnalyticsPage() {
  return (
    <ProtectedRoute requireAdmin>
      <AIAnalyticsContent />
    </ProtectedRoute>
  );
}
