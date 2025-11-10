'use client';

import { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api-client';
import { Card, Button, Text, Heading } from './ui';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { MarkdownViewer } from './MarkdownViewer';

interface GreetingData {
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

interface StudyBuddyProps {
  className?: string;
}

export function StudyBuddy({ className = '' }: StudyBuddyProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [greetingData, setGreetingData] = useState<GreetingData | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isContextExpanded, setIsContextExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [contextData, setContextData] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadGreeting();
  }, []);

  const loadGreeting = async () => {
    try {
      setIsLoading(true);

      // Gather progress data from localStorage
      const m1Progress = localStorage.getItem('paes-progress-M1');
      const m1History = localStorage.getItem('paes-history-M1');
      const m2Progress = localStorage.getItem('paes-progress-M2');
      const m2History = localStorage.getItem('paes-history-M2');

      const progressData = {
        m1: m1Progress ? JSON.parse(m1Progress) : null,
        m2: m2Progress ? JSON.parse(m2Progress) : null,
        m1History: m1History ? JSON.parse(m1History) : null,
        m2History: m2History ? JSON.parse(m2History) : null,
      };

      // Combine histories - these are individual question attempts, not sessions
      const allAttempts = [
        ...(progressData.m1History || []),
        ...(progressData.m2History || [])
      ].sort((a, b) => b.timestamp - a.timestamp);

      // Calculate topic accuracy from individual attempts
      const topicAccuracy: Record<string, { total: number; correct: number; accuracy: number }> = {};
      allAttempts.forEach((attempt: any) => {
        const topic = attempt.topic || 'Unknown';
        if (!topicAccuracy[topic]) {
          topicAccuracy[topic] = { total: 0, correct: 0, accuracy: 0 };
        }
        topicAccuracy[topic].total++;
        if (attempt.isCorrect) {
          topicAccuracy[topic].correct++;
        }
      });

      // Calculate accuracy percentages
      Object.keys(topicAccuracy).forEach(topic => {
        const stats = topicAccuracy[topic];
        stats.accuracy = (stats.correct / stats.total) * 100;
      });

      // Group attempts by session (quizSessionId) or by day for recent sessions
      const sessionMap = new Map<string, any>();
      allAttempts.forEach((attempt: any) => {
        const sessionKey = attempt.quizSessionId ||
                          new Date(attempt.timestamp).toISOString().split('T')[0];

        if (!sessionMap.has(sessionKey)) {
          sessionMap.set(sessionKey, {
            date: new Date(attempt.timestamp).toISOString().split('T')[0],
            topic: attempt.topic,
            attempts: [],
            timestamp: attempt.timestamp
          });
        }
        sessionMap.get(sessionKey).attempts.push(attempt);
      });

      // Convert sessions map to array and calculate scores
      const recentSessions = Array.from(sessionMap.values())
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5)
        .map(session => {
          const correct = session.attempts.filter((a: any) => a.isCorrect).length;
          const total = session.attempts.length;
          return {
            date: session.date,
            score: total > 0 ? Math.round((correct / total) * 100) : 0,
            topic: session.topic || 'Mixed',
            questionsAnswered: total,
          };
        });

      const progressDataPayload = {
        recentSessions,
        topicAccuracy,
        totalQuestionsAnswered: allAttempts.length,
        overallAccuracy: allAttempts.length > 0
          ? Math.round((allAttempts.filter((a: any) => a.isCorrect).length / allAttempts.length) * 100)
          : 0,
      };

      const response = await api.post<GreetingData>('/api/study-buddy/greeting', {
        progressData: progressDataPayload
      });

      if (response.data) {
        setGreetingData(response.data);
        setContextData(progressDataPayload); // Save context for display
        // Initialize conversation with the greeting
        setMessages([
          {
            role: 'assistant',
            content: `${response.data.greeting}\n\n${response.data.encouragement}\n\n${response.data.conversationStarter}`
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading greeting:', error);
      // Fallback greeting
      setGreetingData({
        greeting: '¡Hola! 👋',
        insights: ['Estoy aquí para ayudarte en tu preparación PAES'],
        focusAreas: ['Matemática'],
        encouragement: '¡Vamos con todo!',
        conversationStarter: '¿En qué te gustaría enfocarte hoy?',
        success: true,
      });
      setMessages([
        {
          role: 'assistant',
          content: '¡Hola! 👋 Estoy aquí para ayudarte en tu preparación PAES. ¿En qué te gustaría enfocarte hoy?'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isSending) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);

    try {
      // Gather progress data again for context
      const m1History = localStorage.getItem('paes-history-M1');
      const m2History = localStorage.getItem('paes-history-M2');

      const allAttempts = [
        ...(m1History ? JSON.parse(m1History) : []),
        ...(m2History ? JSON.parse(m2History) : [])
      ].sort((a, b) => b.timestamp - a.timestamp);

      const topicAccuracy: Record<string, { total: number; correct: number; accuracy: number }> = {};
      allAttempts.forEach((attempt: any) => {
        const topic = attempt.topic || 'Unknown';
        if (!topicAccuracy[topic]) {
          topicAccuracy[topic] = { total: 0, correct: 0, accuracy: 0 };
        }
        topicAccuracy[topic].total++;
        if (attempt.isCorrect) {
          topicAccuracy[topic].correct++;
        }
      });

      Object.keys(topicAccuracy).forEach(topic => {
        const stats = topicAccuracy[topic];
        stats.accuracy = (stats.correct / stats.total) * 100;
      });

      const response = await api.post<{ response: string; success: boolean }>('/api/study-buddy/chat', {
        progressData: {
          topicAccuracy,
          totalQuestionsAnswered: allAttempts.length,
          overallAccuracy: allAttempts.length > 0
            ? Math.round((allAttempts.filter((a: any) => a.isCorrect).length / allAttempts.length) * 100)
            : 0,
        },
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        userMessage: inputValue,
      });

      if (response.data && response.data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response.data.response,
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Perdón, tuve un problema. ¿Puedes intentar de nuevo?',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-teal-500" />
          <Text size="sm" variant="secondary">Preparando tu compañero de estudio...</Text>
        </div>
      </Card>
    );
  }

  if (!greetingData) return null;

  return (
    <>
      {/* Collapsed View - Greeting Card */}
      {!isExpanded && (
        <Card
          hover
          className={`p-5 sm:p-6 cursor-pointer transition-all hover:shadow-lg ${className}`}
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-2xl shadow-lg">
                🤖
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Heading level={3} size="xs" className="text-[17px]">
                  Tu Compañero de Estudio
                </Heading>
                <Sparkles className="w-4 h-4 text-teal-500" />
              </div>

              <div className="space-y-2 mb-3">
                <Text size="sm" className="font-medium">
                  {greetingData.greeting}
                </Text>
                {greetingData.insights.length > 0 && (
                  <div className="space-y-1">
                    {greetingData.insights.slice(0, 2).map((insight, i) => (
                      <Text key={i} size="sm" variant="secondary" className="flex items-start gap-2">
                        <span className="text-teal-500 mt-0.5">•</span>
                        <span>{insight}</span>
                      </Text>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                <MessageCircle className="w-4 h-4" />
                <Text size="xs" className="font-semibold">
                  Click para conversar →
                </Text>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Expanded View - Chat Interface */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-slideUp">
            <style jsx>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(20px) scale(0.95);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
              .animate-fadeIn {
                animation: fadeIn 0.2s ease-out;
              }
              .animate-slideUp {
                animation: slideUp 0.3s ease-out;
              }
            `}</style>

            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                  🤖
                </div>
                <div>
                  <Heading level={2} size="xs" className="text-white text-lg">
                    Tu Compañero de Estudio
                  </Heading>
                  <Text size="xs" className="text-teal-100">
                    Siempre aquí para ayudarte
                  </Text>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white/80 hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Context Card */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 border-b-2 border-teal-200 dark:border-teal-700">
              {/* Context Toggle Button */}
              <button
                onClick={() => setIsContextExpanded(!isContextExpanded)}
                className="w-full p-4 flex items-center justify-between gap-2 hover:bg-teal-100/50 dark:hover:bg-teal-800/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-500 text-white rounded-full text-xs font-semibold shadow-sm">
                    <span>🧠</span>
                    <span>Contexto del estudiante</span>
                  </div>
                  <span className="text-xs text-teal-700 dark:text-teal-300">
                    {isContextExpanded ? 'Ver menos' : 'Ver qué sé de ti'}
                  </span>
                </div>
                <div className="text-teal-700 dark:text-teal-300 text-xl transition-transform duration-200" style={{
                  transform: isContextExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                  ▼
                </div>
              </button>

              {/* Collapsible Context Details */}
              {isContextExpanded && contextData && (
                <div className="px-4 pb-4 space-y-3">

                  {/* Overall Stats */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-xs font-semibold text-teal-700 dark:text-teal-300 mb-2">
                      📊 ESTADÍSTICAS GENERALES:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-teal-50 dark:bg-teal-900/20 p-2 rounded">
                        <div className="text-gray-600 dark:text-gray-400">Preguntas totales</div>
                        <div className="text-lg font-bold text-teal-600 dark:text-teal-400">
                          {contextData.totalQuestionsAnswered || 0}
                        </div>
                      </div>
                      <div className="bg-cyan-50 dark:bg-cyan-900/20 p-2 rounded">
                        <div className="text-gray-600 dark:text-gray-400">Precisión general</div>
                        <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
                          {contextData.overallAccuracy?.toFixed(1) || 0}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Topic Accuracy */}
                  {contextData.topicAccuracy && Object.keys(contextData.topicAccuracy).length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-xs font-semibold text-teal-700 dark:text-teal-300 mb-2">
                        📚 RENDIMIENTO POR TEMA:
                      </div>
                      <div className="space-y-1.5">
                        {Object.entries(contextData.topicAccuracy).map(([topic, stats]: [string, any]) => (
                          <div key={topic} className="flex items-center justify-between text-xs bg-gray-50 dark:bg-gray-900/50 p-2 rounded">
                            <span className="font-medium">{topic}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600 dark:text-gray-400">
                                {stats.correct}/{stats.total}
                              </span>
                              <span className={`font-bold ${
                                stats.accuracy >= 80 ? 'text-green-600' :
                                stats.accuracy >= 60 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {stats.accuracy.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Sessions */}
                  {contextData.recentSessions && contextData.recentSessions.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-xs font-semibold text-teal-700 dark:text-teal-300 mb-2">
                        📅 SESIONES RECIENTES:
                      </div>
                      <div className="space-y-1.5">
                        {contextData.recentSessions.slice(0, 3).map((session: any, i: number) => (
                          <div key={i} className="flex items-center justify-between text-xs bg-gray-50 dark:bg-gray-900/50 p-2 rounded">
                            <div>
                              <div className="font-medium">{session.topic}</div>
                              <div className="text-gray-500 dark:text-gray-400">{session.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-teal-600 dark:text-teal-400">{session.score}%</div>
                              <div className="text-gray-500 dark:text-gray-400">{session.questionsAnswered} preg.</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Available Tools */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-700">
                    <div className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-2">
                      🛠️ HERRAMIENTAS DISPONIBLES:
                    </div>
                    <div className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                      <div>• Analizar rendimiento por tema</div>
                      <div>• Generar planes de estudio personalizados</div>
                      <div>• Recomendar modos de práctica</div>
                      <div>• Revisar preguntas recientes</div>
                      <div>• Calcular métricas de mejora</div>
                      <div>• Ver insights de racha</div>
                    </div>
                  </div>

                  {/* Info Note */}
                  <div className="text-xs text-gray-600 dark:text-gray-400 italic text-center">
                    💡 Uso estos datos para darte recomendaciones personalizadas
                  </div>
                </div>
              )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <MarkdownViewer content={message.content} />
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isSending && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                      <Text size="sm" variant="secondary">Pensando...</Text>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Pregúntame lo que quieras..."
                  disabled={isSending}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-teal-500 transition-colors disabled:opacity-50"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isSending}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <Text size="xs" variant="secondary" className="mt-2 text-center">
                Presiona Enter para enviar
              </Text>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
