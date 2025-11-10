'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { QuestionAttempt, QuizHistoryResponse } from '@/lib/types';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ModuleAccessGuard } from '@/components/ModuleAccessGuard';
import { Button, Card, Badge, Heading, Text, Modal, Navbar, NavbarLink } from '@/components/ui';
import { MathText } from '@/components/MathDisplay';
import { SkillsDisplay } from '@/components/SkillsDisplay';
import { api } from '@/lib/api-client';
import { isAuthenticated } from '@/lib/auth';

interface Progress {
  correct: number;
  total: number;
}

function ProgressPageContent() {
  const [m1Progress, setM1Progress] = useState<Progress>({ correct: 0, total: 0 });
  const [m2Progress, setM2Progress] = useState<Progress>({ correct: 0, total: 0 });
  const [m1History, setM1History] = useState<QuestionAttempt[]>([]);
  const [m2History, setM2History] = useState<QuestionAttempt[]>([]);
  const [recentQuestionsCount, setRecentQuestionsCount] = useState<number>(10);
  const [selectedAttempt, setSelectedAttempt] = useState<QuestionAttempt | null>(null);
  const [selectedQuizSession, setSelectedQuizSession] = useState<{
    attempts: QuestionAttempt[];
    currentIndex: number;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'overview' | 'quizzes' | 'skills-m1' | 'skills-m2'>('overview');
  const itemsPerPage = 10;

  useEffect(() => {
    const loadProgressAndHistory = async () => {
      // Try to load from backend if user is authenticated
      if (isAuthenticated()) {
        try {
          // Fetch history from backend for both levels
          const [m1Response, m2Response] = await Promise.all([
            api.get<QuizHistoryResponse>('/api/quiz/history?level=M1'),
            api.get<QuizHistoryResponse>('/api/quiz/history?level=M2'),
          ]);

          if (m1Response.data?.history) {
            const m1Data = m1Response.data.history;
            setM1History(m1Data);

            // Calculate progress from history
            const m1Correct = m1Data.filter((a: QuestionAttempt) => a.isCorrect).length;
            setM1Progress({ correct: m1Correct, total: m1Data.length });
          }

          if (m2Response.data?.history) {
            const m2Data = m2Response.data.history;
            setM2History(m2Data);

            // Calculate progress from history
            const m2Correct = m2Data.filter((a: QuestionAttempt) => a.isCorrect).length;
            setM2Progress({ correct: m2Correct, total: m2Data.length });
          }
        } catch (error) {
          console.error('Failed to load quiz history from backend:', error);
          // Fall back to localStorage
          loadFromLocalStorage();
        }
      } else {
        // User not authenticated, use localStorage
        loadFromLocalStorage();
      }
    };

    const loadFromLocalStorage = () => {
      // Load progress from localStorage
      const m1Data = localStorage.getItem('paes-progress-M1');
      const m2Data = localStorage.getItem('paes-progress-M2');

      if (m1Data) {
        setM1Progress(JSON.parse(m1Data));
      }
      if (m2Data) {
        setM2Progress(JSON.parse(m2Data));
      }

      // Load question history
      const m1HistoryData = localStorage.getItem('paes-history-M1');
      const m2HistoryData = localStorage.getItem('paes-history-M2');

      if (m1HistoryData) {
        setM1History(JSON.parse(m1HistoryData));
      }
      if (m2HistoryData) {
        setM2History(JSON.parse(m2HistoryData));
      }
    };

    loadProgressAndHistory();
  }, []);

  const calculatePercentage = (progress: Progress) => {
    if (progress.total === 0) return 0;
    return Math.round((progress.correct / progress.total) * 100);
  };

  const calculateRecentStats = (history: QuestionAttempt[], count: number) => {
    const recentAttempts = history.slice(0, count);
    const correct = recentAttempts.filter(a => a.isCorrect).length;
    const total = recentAttempts.length;
    return { correct, total };
  };

  const allHistory = [...m1History, ...m2History].sort((a, b) => b.timestamp - a.timestamp);

  // Pagination logic
  const totalPages = Math.ceil(allHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHistory = allHistory.slice(startIndex, endIndex);

  // Calculate recent stats for each level based on selected count
  const m1RecentStats = calculateRecentStats(m1History, recentQuestionsCount);
  const m2RecentStats = calculateRecentStats(m2History, recentQuestionsCount);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDifficultyBadgeVariant = (difficulty: string): 'success' | 'warning' | 'danger' | 'neutral' => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      default: return 'neutral';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Media';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  // Group attempts into quiz sessions (attempts within 2 minutes = same quiz)
  const groupIntoQuizSessions = (attempts: QuestionAttempt[]) => {
    if (attempts.length === 0) return [];

    // Sort by timestamp descending (most recent first)
    const sorted = [...attempts].sort((a, b) => b.timestamp - a.timestamp);

    const sessions: Array<{
      id: string;
      attempts: QuestionAttempt[];
      startTime: number;
      level: 'M1' | 'M2';
      correctCount: number;
      totalCount: number;
    }> = [];

    // Maximum quiz size is 15 (Extreme mode), use 20 as a safety cap
    const MAX_QUIZ_SIZE = 20;
    let currentSession: QuestionAttempt[] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      const timeDiff = Math.abs(sorted[i].timestamp - sorted[i - 1].timestamp);

      // If within 2 minutes, same level, AND under the max size cap, add to current session
      if (timeDiff < 120000 && sorted[i].level === sorted[i - 1].level && currentSession.length < MAX_QUIZ_SIZE) {
        currentSession.push(sorted[i]);
      } else {
        // Start new session
        if (currentSession.length > 0) {
          const correct = currentSession.filter(a => a.isCorrect).length;
          sessions.push({
            id: `quiz-${currentSession[0].timestamp}`,
            attempts: currentSession,
            startTime: currentSession[currentSession.length - 1].timestamp, // Earliest in session
            level: currentSession[0].level,
            correctCount: correct,
            totalCount: currentSession.length,
          });
        }
        currentSession = [sorted[i]];
      }
    }

    // Add last session
    if (currentSession.length > 0) {
      const correct = currentSession.filter(a => a.isCorrect).length;
      sessions.push({
        id: `quiz-${currentSession[0].timestamp}`,
        attempts: currentSession,
        startTime: currentSession[currentSession.length - 1].timestamp,
        level: currentSession[0].level,
        correctCount: correct,
        totalCount: currentSession.length,
      });
    }

    return sessions;
  };

  const allQuizSessions = groupIntoQuizSessions(allHistory);

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',sans-serif]">
      {/* Navbar with variableBlur material */}
      <Navbar>
        <NavbarLink href="/dashboard">
          ← Volver al Inicio
        </NavbarLink>
      </Navbar>

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Heading level={1} size="lg">
            Mi Progreso
          </Heading>
          {viewMode === 'overview' && (
            <div className="flex items-center gap-3">
              <label htmlFor="recent-count" className="text-[13px] text-black/60 dark:text-white/70">
                Mostrar últimas:
              </label>
              <select
                id="recent-count"
                value={recentQuestionsCount}
                onChange={(e) => setRecentQuestionsCount(Number(e.target.value))}
                className="h-11 px-3 rounded-xl text-[15px] bg-white dark:bg-[#121212] text-black dark:text-white border border-black/[0.12] dark:border-white/[0.16] focus:outline-none focus:ring-3 focus:ring-[#0A84FF]/50 focus:border-[#0A84FF] transition-all duration-[180ms]"
              >
                <option value={5}>5 preguntas</option>
                <option value={10}>10 preguntas</option>
                <option value={20}>20 preguntas</option>
                <option value={50}>50 preguntas</option>
              </select>
            </div>
          )}
        </div>

        {/* View Mode Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setViewMode('overview')}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-[180ms] ${
              viewMode === 'overview'
                ? 'bg-[#0A84FF] text-white'
                : 'bg-white dark:bg-[#1C1C1E] text-black/60 dark:text-white/70 border border-black/[0.12] dark:border-white/[0.16] hover:border-[#0A84FF]/50'
            }`}
          >
            📊 Resumen General
          </button>
          <button
            onClick={() => setViewMode('quizzes')}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-[180ms] ${
              viewMode === 'quizzes'
                ? 'bg-[#0A84FF] text-white'
                : 'bg-white dark:bg-[#1C1C1E] text-black/60 dark:text-white/70 border border-black/[0.12] dark:border-white/[0.16] hover:border-[#0A84FF]/50'
            }`}
          >
            🎯 Mis Quizzes
          </button>
          <button
            onClick={() => setViewMode('skills-m1')}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-[180ms] ${
              viewMode === 'skills-m1'
                ? 'bg-[#0A84FF] text-white'
                : 'bg-white dark:bg-[#1C1C1E] text-black/60 dark:text-white/70 border border-black/[0.12] dark:border-white/[0.16] hover:border-[#0A84FF]/50'
            }`}
          >
            📚 Habilidades M1
          </button>
          <button
            onClick={() => setViewMode('skills-m2')}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-[180ms] ${
              viewMode === 'skills-m2'
                ? 'bg-[#0A84FF] text-white'
                : 'bg-white dark:bg-[#1C1C1E] text-black/60 dark:text-white/70 border border-black/[0.12] dark:border-white/[0.16] hover:border-[#0A84FF]/50'
            }`}
          >
            📚 Habilidades M2
          </button>
        </div>

        {/* Overview View */}
        {viewMode === 'overview' && (
          <>
            {/* Level Progress Cards with liquidGlass material */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* M1 Progress Card */}
          <Card hover className="p-6">
            <Heading level={3} size="xs" className="mb-4">
              Competencia Matemática M1
            </Heading>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <Text size="xs" variant="secondary">Últimas {recentQuestionsCount} preguntas</Text>
                <Text size="xs" variant="secondary" className="font-semibold">{m1RecentStats.total > 0 ? calculatePercentage(m1RecentStats) : 0}%</Text>
              </div>
              <div className="w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#0A84FF] h-2 rounded-full transition-all duration-[300ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  style={{ width: `${m1RecentStats.total > 0 ? calculatePercentage(m1RecentStats) : 0}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Heading level={4} size="md" className="text-center">
                {m1RecentStats.correct}/{m1RecentStats.total}
              </Heading>
              <Text size="xs" variant="secondary" className="text-center">
                Respuestas correctas en las últimas {m1RecentStats.total} preguntas
              </Text>
            </div>
            <Button asChild className="mt-4 w-full">
              <Link href="/practice/m1">
                Continuar Práctica
              </Link>
            </Button>
          </Card>

          {/* M2 Progress Card */}
          <Card hover className="p-6">
            <Heading level={3} size="xs" className="mb-4">
              Competencia Matemática M2
            </Heading>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <Text size="xs" variant="secondary">Últimas {recentQuestionsCount} preguntas</Text>
                <Text size="xs" variant="secondary" className="font-semibold">{m2RecentStats.total > 0 ? calculatePercentage(m2RecentStats) : 0}%</Text>
              </div>
              <div className="w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#0A84FF] h-2 rounded-full transition-all duration-[300ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  style={{ width: `${m2RecentStats.total > 0 ? calculatePercentage(m2RecentStats) : 0}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Heading level={4} size="md" className="text-center">
                {m2RecentStats.correct}/{m2RecentStats.total}
              </Heading>
              <Text size="xs" variant="secondary" className="text-center">
                Respuestas correctas en las últimas {m2RecentStats.total} preguntas
              </Text>
            </div>
            <Button asChild className="mt-4 w-full">
              <Link href="/practice/m2">
                Continuar Práctica
              </Link>
            </Button>
          </Card>
        </div>

        {/* Recent Questions History */}
        {allHistory.length > 0 && (
          <Card className="p-8">
            <div className="flex justify-between items-center mb-6">
              <Heading level={2} size="sm">
                Historial de Preguntas Recientes
              </Heading>
              <Text size="xs" variant="secondary">
                Total: {allHistory.length} preguntas
              </Text>
            </div>
            <div className="space-y-3 mb-6">
              {paginatedHistory.map((attempt, index) => (
                <div
                  key={`${attempt.questionId}-${attempt.timestamp}`}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] active:scale-[0.99] ${
                    attempt.isCorrect
                      ? 'border-[#34C759]/30 bg-[#34C759]/5 dark:border-[#30D158]/30 dark:bg-[#30D158]/10 hover:border-[#34C759]/50 dark:hover:border-[#30D158]/50'
                      : 'border-[#FF453A]/30 bg-[#FF453A]/5 dark:border-[#FF453A]/30 dark:bg-[#FF453A]/10 hover:border-[#FF453A]/50 dark:hover:border-[#FF453A]/50'
                  }`}
                  onClick={() => setSelectedAttempt(attempt)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge size="sm" variant={attempt.level === 'M1' ? 'info' : 'secondary'}>
                          {attempt.level}
                        </Badge>
                        <Badge size="sm" variant={getDifficultyBadgeVariant(attempt.difficulty)}>
                          {getDifficultyLabel(attempt.difficulty)}
                        </Badge>
                        <Text size="xs" variant="secondary">
                          {attempt.topic}
                        </Text>
                      </div>
                      <div className="text-sm font-medium mb-1">
                        <MathText content={attempt.question} />
                      </div>
                      <Text size="xs" variant="secondary">
                        {formatDate(attempt.timestamp)}
                      </Text>
                    </div>
                    <div className="ml-4">
                      {attempt.isCorrect ? (
                        <span className="text-2xl text-[#34C759] dark:text-[#30D158]">✓</span>
                      ) : (
                        <span className="text-2xl text-[#FF453A]">✗</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  ← Anterior
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'primary' : 'ghost'}
                          onClick={() => setCurrentPage(page)}
                          className="w-11"
                        >
                          {page}
                        </Button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return <Text key={page} size="xs" variant="secondary" className="px-2">...</Text>;
                    }
                    return null;
                  })}
                </div>

                <Button
                  variant="ghost"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente →
                </Button>
              </div>
            )}
          </Card>
        )}

        {allHistory.length === 0 && (
          <div className="mt-8 backdrop-blur-[12px] bg-[#FF9F0A]/5 dark:bg-[#FF9F0A]/10 border-l-4 border-[#FF9F0A] rounded-r-xl p-4">
            <Text size="sm" className="text-[#FF9F0A] dark:text-[#FFB84D]">
              Aún no has comenzado a practicar. ¡Empieza ahora con M1 o M2!
            </Text>
          </div>
        )}
          </>
        )}

        {/* Quizzes View */}
        {viewMode === 'quizzes' && (
          <>
            {allQuizSessions.length > 0 ? (
              <div className="grid gap-4">
                {allQuizSessions.map((session, index) => {
                  const percentage = Math.round((session.correctCount / session.totalCount) * 100);
                  const isPerfect = percentage === 100;
                  const isGood = percentage >= 70;

                  return (
                    <Card
                      key={session.id}
                      className={`p-6 border-2 ${
                        isPerfect
                          ? 'border-[#34C759]/30 bg-[#34C759]/5'
                          : isGood
                          ? 'border-[#FF9F0A]/30 bg-[#FF9F0A]/5'
                          : 'border-[#FF453A]/30 bg-[#FF453A]/5'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Heading level={3} size="xs">
                              Quiz #{allQuizSessions.length - index}
                            </Heading>
                            <Badge variant={session.level === 'M1' ? 'info' : 'secondary'}>
                              {session.level}
                            </Badge>
                          </div>
                          <Text size="xs" variant="secondary">
                            {new Date(session.startTime).toLocaleDateString('es-ES', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Text>
                        </div>

                        {/* Score Badge */}
                        <div className={`px-4 py-2 rounded-xl ${
                          isPerfect
                            ? 'bg-[#34C759]/20 text-[#34C759]'
                            : isGood
                            ? 'bg-[#FF9F0A]/20 text-[#FF9F0A]'
                            : 'bg-[#FF453A]/20 text-[#FF453A]'
                        }`}>
                          <Text size="lg" className="font-bold">
                            {session.correctCount}/{session.totalCount}
                          </Text>
                          <Text size="xs" className="text-center">
                            {percentage}%
                          </Text>
                        </div>
                      </div>

                      {/* Questions Summary */}
                      <div className="mb-4 space-y-2">
                        <Text size="sm" className="font-medium mb-2">
                          Preguntas en este quiz:
                        </Text>
                        <div className="flex flex-wrap gap-2">
                          {session.attempts.slice().reverse().map((attempt, idx) => {
                            const isUnanswered = attempt.userAnswer === -1;
                            return (
                              <div
                                key={`${attempt.questionId}-${idx}`}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                                  isUnanswered
                                    ? 'bg-gray-400 dark:bg-gray-600 text-white'
                                    : attempt.isCorrect
                                    ? 'bg-[#34C759] text-white'
                                    : 'bg-[#FF453A] text-white'
                                }`}
                                title={isUnanswered ? 'No respondida' : attempt.isCorrect ? 'Correcta' : 'Incorrecta'}
                              >
                                {idx + 1}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button
                          variant="primary"
                          className="flex-1"
                          onClick={() => {
                            // Save quiz questions to localStorage for replay
                            const questionIds = session.attempts.map(a => a.questionId);
                            localStorage.setItem('replay-quiz', JSON.stringify({
                              id: session.id,
                              level: session.level,
                              questionIds: questionIds
                            }));
                            // Navigate to practice page
                            window.location.href = `/practice/${session.level.toLowerCase()}?replay=true`;
                          }}
                        >
                          🔄 Rejugar Quiz
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            // Show quiz session with all questions in original order
                            setSelectedQuizSession({
                              attempts: session.attempts,
                              currentIndex: 0
                            });
                          }}
                        >
                          👁️ Ver Detalles
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Text size="lg" className="mb-4">
                  🎯 No has completado ningún quiz todavía
                </Text>
                <Text size="sm" variant="secondary" className="mb-6">
                  Completa tu primer quiz en M1 o M2 para verlo aquí
                </Text>
                <div className="flex gap-3 justify-center">
                  <Button asChild>
                    <Link href="/practice/m1">
                      Practicar M1
                    </Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href="/practice/m2">
                      Practicar M2
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Skills M1 View */}
        {viewMode === 'skills-m1' && (
          <SkillsDisplay attempts={m1History} level="M1" />
        )}

        {/* Skills M2 View */}
        {viewMode === 'skills-m2' && (
          <SkillsDisplay attempts={m2History} level="M2" />
        )}

        {/* Review Modal with Liquid Glass */}
        <Modal
          isOpen={!!selectedAttempt || !!selectedQuizSession}
          onClose={() => {
            setSelectedAttempt(null);
            setSelectedQuizSession(null);
          }}
          title={selectedQuizSession
            ? `Pregunta ${selectedQuizSession.currentIndex + 1} de ${selectedQuizSession.attempts.length}`
            : "Revisar Pregunta"
          }
          maxWidth="lg"
        >
          {(() => {
            const attempt = selectedQuizSession
              ? selectedQuizSession.attempts[selectedQuizSession.currentIndex]
              : selectedAttempt;

            return attempt && (
              <>
                <div className="mb-4 flex gap-2 flex-wrap">
                  <Badge variant={attempt.level === 'M1' ? 'info' : 'secondary'}>
                    {attempt.level}
                  </Badge>
                  <Badge variant={getDifficultyBadgeVariant(attempt.difficulty)}>
                    {getDifficultyLabel(attempt.difficulty)}
                  </Badge>
                  <Badge variant="neutral">
                    {attempt.topic}
                  </Badge>
                </div>

                <div className="mb-6">
                  <div className="text-[17px] mb-4">
                    <MathText content={attempt.question} />
                  </div>
                  <div className="space-y-3">
                    {attempt.options.map((option, index) => {
                      const isUnanswered = attempt.userAnswer === -1;
                      const isUserAnswer = !isUnanswered && index === attempt.userAnswer;
                      const isCorrectAnswer = index === attempt.correctAnswer;

                      let className = 'p-4 rounded-xl border-2 transition-all duration-[180ms] ';
                      if (isCorrectAnswer) {
                        className += 'border-[#34C759] bg-[#34C759]/10 dark:border-[#30D158] dark:bg-[#30D158]/20 text-[#34C759] dark:text-[#5DE38D]';
                      } else if (isUserAnswer && !isCorrectAnswer) {
                        className += 'border-[#FF453A] bg-[#FF453A]/10 dark:border-[#FF453A] dark:bg-[#FF453A]/20 text-[#FF453A] dark:text-[#FF7A72]';
                      } else {
                        className += 'border-black/[0.12] dark:border-white/[0.16] bg-black/[0.02] dark:bg-white/[0.04] text-black/60 dark:text-white/70';
                      }

                      return (
                        <div key={index} className={className}>
                          <span className="text-sm inline font-semibold mr-2">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <span className="text-sm inline"><MathText content={option} /></span>
                          {isCorrectAnswer && <Text size="xs" className="float-right">✓ Correcta</Text>}
                          {isUserAnswer && !isCorrectAnswer && <Text size="xs" className="float-right">✗ Tu respuesta</Text>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-[#0A84FF]/5 dark:bg-[#0A84FF]/10 border-l-4 border-[#0A84FF] rounded-r-xl p-4 mb-6">
                  <Text size="sm" className="font-semibold text-[#0A84FF] dark:text-[#66B2FF] mb-2">
                    Explicación:
                  </Text>
                  <div className="text-sm text-black/80 dark:text-white/80">
                    <MathText content={attempt.explanation} />
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${
                  attempt.userAnswer === -1
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    : attempt.isCorrect
                    ? 'bg-[#34C759]/10 dark:bg-[#30D158]/20 text-[#34C759] dark:text-[#5DE38D]'
                    : 'bg-[#FF453A]/10 dark:bg-[#FF453A]/20 text-[#FF453A] dark:text-[#FF7A72]'
                }`}>
                  <Text size="md" className="font-semibold text-center">
                    {attempt.userAnswer === -1
                      ? 'No Respondida'
                      : attempt.isCorrect
                      ? '¡Respuesta Correcta! 🎉'
                      : 'Respuesta Incorrecta'}
                  </Text>
                  <Text size="xs" className="text-center mt-1 opacity-80">
                    {attempt.userAnswer === -1
                      ? `Pregunta del ${formatDate(attempt.timestamp)}`
                      : `Respondida el ${formatDate(attempt.timestamp)}`}
                  </Text>
                </div>

                {/* Navigation buttons for quiz session */}
                {selectedQuizSession ? (
                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedQuizSession({
                          ...selectedQuizSession,
                          currentIndex: selectedQuizSession.currentIndex - 1
                        });
                      }}
                      disabled={selectedQuizSession.currentIndex === 0}
                      className="flex-1"
                    >
                      ← Anterior
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedAttempt(null);
                        setSelectedQuizSession(null);
                      }}
                      className="flex-1"
                    >
                      Cerrar
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedQuizSession({
                          ...selectedQuizSession,
                          currentIndex: selectedQuizSession.currentIndex + 1
                        });
                      }}
                      disabled={selectedQuizSession.currentIndex === selectedQuizSession.attempts.length - 1}
                      className="flex-1"
                    >
                      Siguiente →
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setSelectedAttempt(null)} className="mt-6 w-full">
                    Cerrar
                  </Button>
                )}
              </>
            );
          })()}
        </Modal>
      </main>
    </div>
  );
}

export default function ProgressPage() {
  return (
    <ProtectedRoute>
      <ModuleAccessGuard moduleName="Progreso">
        <ProgressPageContent />
      </ModuleAccessGuard>
    </ProtectedRoute>
  );
}
