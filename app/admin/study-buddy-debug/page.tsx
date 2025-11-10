'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button, Card, Heading, Text, Badge } from '@/components/ui';
import { api } from '@/lib/api-client';
import {
  getAllArchetypes,
  generateMockProgressData,
  type Archetype,
  type ArchetypeProfile
} from '@/lib/archetypes';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import { Loader2, ArrowLeft, Sparkles, User, TrendingUp, MessageCircle } from 'lucide-react';

interface GreetingResponse {
  greeting: string;
  insights: string[];
  focusAreas: string[];
  encouragement: string;
  conversationStarter: string;
  success: boolean;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function StudyBuddyDebugContent() {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [studentName, setStudentName] = useState('María');
  const [greetingResponse, setGreetingResponse] = useState<GreetingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const archetypes = getAllArchetypes();

  const handleSelectArchetype = async (archetype: Archetype) => {
    setSelectedArchetype(archetype);
    setGreetingResponse(null);
    setMessages([]);
    setErrorMessage(null);

    // Generate greeting
    await generateGreeting(archetype);
  };

  const generateGreeting = async (archetype: Archetype) => {
    setIsLoading(true);
    try {
      const mockData = generateMockProgressData(archetype, studentName);

      // Determine time of day
      const hour = new Date().getHours();
      let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
      if (hour >= 5 && hour < 12) {
        timeOfDay = 'morning';
      } else if (hour >= 12 && hour < 18) {
        timeOfDay = 'afternoon';
      } else if (hour >= 18 && hour < 22) {
        timeOfDay = 'evening';
      } else {
        timeOfDay = 'night';
      }

      const response = await api.post<GreetingResponse>('/api/study-buddy/greeting', {
        userData: mockData.userData,
        progressData: mockData.progressData,
        timeOfDay,
      });

      if (response.error) {
        console.error('API error:', response.error);
        setErrorMessage(`Error: ${response.error.error || 'Failed to generate greeting'}`);
        return;
      }

      if (response.data) {
        setGreetingResponse(response.data);
        setMessages([
          {
            role: 'assistant',
            content: `${response.data.greeting}\n\n${response.data.encouragement}\n\n${response.data.conversationStarter}`
          }
        ]);
        setErrorMessage(null);
      }
    } catch (error) {
      console.error('Error generating greeting:', error);
      setErrorMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isSending || !selectedArchetype) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);

    try {
      const mockData = generateMockProgressData(selectedArchetype, studentName);

      const response = await api.post<{ response: string; success: boolean }>('/api/study-buddy/chat', {
        userData: mockData.userData,
        progressData: mockData.progressData,
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        userMessage: inputValue,
      });

      if (response.error) {
        console.error('API error:', response.error);
        const errorMsg: Message = {
          role: 'assistant',
          content: `❌ Error: ${response.error.error || 'Failed to get response'}`
        };
        setMessages(prev => [...prev, errorMsg]);
        return;
      }

      if (response.data && response.data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response.data.response,
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMsg: Message = {
        role: 'assistant',
        content: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <Text>Acceso no autorizado. Solo administradores.</Text>
        </Card>
      </div>
    );
  }

  const selectedProfile = selectedArchetype ? archetypes.find(a => a.id === selectedArchetype) : null;
  const mockData = selectedArchetype ? generateMockProgressData(selectedArchetype, studentName) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push('/admin')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Admin
              </Button>
              <div>
                <Heading level={1} size="sm">
                  Study Buddy Debug - Arquetipos
                </Heading>
                <Text size="xs" variant="secondary">
                  Simula diferentes perfiles de estudiantes y analiza respuestas del AI
                </Text>
              </div>
            </div>
            <Badge variant="warning">Debug Mode</Badge>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Name Input */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <User className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Nombre del Estudiante</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                placeholder="María"
              />
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Archetype Selection */}
          <div className="lg:col-span-1">
            <Heading level={2} size="xs" className="mb-4">
              Selecciona un Arquetipo
            </Heading>
            <div className="space-y-3">
              {archetypes.map((archetype) => (
                <Card
                  key={archetype.id}
                  hover
                  className={`p-4 cursor-pointer transition-all ${
                    selectedArchetype === archetype.id
                      ? 'ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : ''
                  }`}
                  onClick={() => handleSelectArchetype(archetype.id)}
                >
                  <Heading level={3} size="xs" className="mb-2">
                    {archetype.name}
                  </Heading>
                  <Text size="xs" variant="secondary" className="mb-3">
                    {archetype.description}
                  </Text>
                  <div className="flex flex-wrap gap-1">
                    {archetype.coreTraits.slice(0, 2).map((trait, i) => (
                      <Badge key={i} variant="info" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Details and Response */}
          <div className="lg:col-span-2">
            {!selectedArchetype ? (
              <Card className="p-12 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <Heading level={3} size="sm" className="mb-2">
                  Selecciona un Arquetipo
                </Heading>
                <Text size="sm" variant="secondary">
                  Elige un perfil de estudiante para ver cómo el AI Study Buddy le responde
                </Text>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Archetype Details */}
                <Card className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <Heading level={2} size="sm" className="mb-1">
                        {selectedProfile?.name}
                      </Heading>
                      <Text size="sm" variant="secondary">
                        {selectedProfile?.description}
                      </Text>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Text size="xs" className="font-semibold mb-2 text-gray-600 dark:text-gray-400">
                        Rasgos Clave
                      </Text>
                      <div className="space-y-1">
                        {selectedProfile?.coreTraits.map((trait, i) => (
                          <Text key={i} size="xs" className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            {trait}
                          </Text>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Text size="xs" className="font-semibold mb-2 text-gray-600 dark:text-gray-400">
                        Comportamientos
                      </Text>
                      <div className="space-y-1">
                        {selectedProfile?.behaviors.map((behavior, i) => (
                          <Text key={i} size="xs" className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            {behavior}
                          </Text>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Text size="xs" className="font-semibold mb-2 text-gray-600 dark:text-gray-400">
                        Adaptaciones AI
                      </Text>
                      <div className="space-y-1">
                        {selectedProfile?.aiAdaptations.map((adaptation, i) => (
                          <Text key={i} size="xs" className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                            {adaptation}
                          </Text>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mock Data Stats */}
                  {mockData && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <Text size="xs" className="font-semibold mb-3 text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Datos Simulados
                      </Text>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <Text size="xs" variant="secondary">Racha Actual</Text>
                          <Heading level={4} size="xs" className="text-teal-600 dark:text-teal-400">
                            {mockData.userData.currentStreak} días
                          </Heading>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <Text size="xs" variant="secondary">Precisión</Text>
                          <Heading level={4} size="xs" className="text-blue-600 dark:text-blue-400">
                            {mockData.progressData.overallAccuracy.toFixed(1)}%
                          </Heading>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <Text size="xs" variant="secondary">Preguntas</Text>
                          <Heading level={4} size="xs" className="text-purple-600 dark:text-purple-400">
                            {mockData.progressData.totalQuestionsAnswered}
                          </Heading>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <Text size="xs" variant="secondary">Sesiones</Text>
                          <Heading level={4} size="xs" className="text-orange-600 dark:text-orange-400">
                            {mockData.progressData.recentSessions.length}
                          </Heading>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                {/* AI Response */}
                {isLoading ? (
                  <Card className="p-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-teal-500" />
                    <Text size="sm" variant="secondary">
                      Generando respuesta del AI Study Buddy...
                    </Text>
                  </Card>
                ) : errorMessage ? (
                  <Card className="p-8 border-2 border-red-300 dark:border-red-700">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">❌</span>
                      </div>
                      <Heading level={3} size="sm" className="mb-2 text-red-900 dark:text-red-100">
                        Error al Generar Respuesta
                      </Heading>
                      <Text size="sm" className="text-red-700 dark:text-red-300 mb-4">
                        {errorMessage}
                      </Text>
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-left">
                        <Text size="xs" className="font-semibold mb-2">Posibles causas:</Text>
                        <ul className="text-xs space-y-1 text-red-800 dark:text-red-200">
                          <li>• ANTHROPIC_API_KEY no configurada en el backend</li>
                          <li>• Error de red o timeout</li>
                          <li>• Usuario no es admin</li>
                          <li>• Revisa los logs del backend para más detalles</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                ) : greetingResponse ? (
                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageCircle className="w-5 h-5 text-teal-500" />
                      <Heading level={3} size="sm">
                        Respuesta del AI Study Buddy
                      </Heading>
                    </div>

                    {/* Greeting Card */}
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl p-6 mb-4">
                      <Heading level={4} size="xs" className="mb-3 text-teal-900 dark:text-teal-100">
                        {greetingResponse.greeting}
                      </Heading>

                      {greetingResponse.insights.length > 0 && (
                        <div className="mb-3">
                          <Text size="xs" className="font-semibold mb-2 text-teal-800 dark:text-teal-200">
                            Insights:
                          </Text>
                          <div className="space-y-1">
                            {greetingResponse.insights.map((insight, i) => (
                              <Text key={i} size="sm" className="flex items-start gap-2">
                                <span className="text-teal-500 mt-1">•</span>
                                <span>{insight}</span>
                              </Text>
                            ))}
                          </div>
                        </div>
                      )}

                      {greetingResponse.focusAreas.length > 0 && (
                        <div className="mb-3">
                          <Text size="xs" className="font-semibold mb-2 text-teal-800 dark:text-teal-200">
                            Áreas de Enfoque:
                          </Text>
                          <div className="flex flex-wrap gap-2">
                            {greetingResponse.focusAreas.map((area, i) => (
                              <Badge key={i} variant="success">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <Text size="sm" className="mb-3">
                        {greetingResponse.encouragement}
                      </Text>

                      <Text size="sm" className="italic text-teal-700 dark:text-teal-300">
                        {greetingResponse.conversationStarter}
                      </Text>
                    </div>

                    {/* Chat Interface */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <Text size="xs" className="font-semibold mb-3 text-gray-600 dark:text-gray-400">
                        Continúa la conversación:
                      </Text>

                      {/* Messages */}
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto space-y-3">
                        {messages.slice(1).map((message, index) => (
                          <div
                            key={index}
                            className={`${
                              message.role === 'user' ? 'text-right' : 'text-left'
                            }`}
                          >
                            <div
                              className={`inline-block max-w-[80%] rounded-lg px-3 py-2 ${
                                message.role === 'user'
                                  ? 'bg-teal-500 text-white'
                                  : 'bg-white dark:bg-gray-700'
                              }`}
                            >
                              <Text size="sm">
                                {message.role === 'assistant' ? (
                                  <MarkdownViewer content={message.content} />
                                ) : (
                                  message.content
                                )}
                              </Text>
                            </div>
                          </div>
                        ))}
                        {isSending && (
                          <div className="text-left">
                            <div className="inline-block bg-white dark:bg-gray-700 rounded-lg px-3 py-2">
                              <Loader2 className="w-4 h-4 animate-spin text-teal-500" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Escribe un mensaje de prueba..."
                          disabled={isSending}
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 disabled:opacity-50"
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim() || isSending}
                        >
                          Enviar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function StudyBuddyDebugPage() {
  return (
    <ProtectedRoute>
      <StudyBuddyDebugContent />
    </ProtectedRoute>
  );
}
