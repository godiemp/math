'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { QuestionAttempt } from '@/lib/types';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button, Card, Badge, Heading, Text, Modal, Navbar, NavbarLink } from '@/components/ui';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Heading level={1} size="lg">
            Mi Progreso
          </Heading>
          <div className="flex items-center gap-3">
            <Text size="xs" variant="secondary" as="label" htmlFor="recent-count">
              Mostrar últimas:
            </Text>
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
        </div>

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
                      <Text size="sm" className="font-medium mb-1">
                        {attempt.question}
                      </Text>
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

        {/* Review Modal with Liquid Glass */}
        <Modal
          isOpen={!!selectedAttempt}
          onClose={() => setSelectedAttempt(null)}
          title="Revisar Pregunta"
          maxWidth="lg"
        >
          {selectedAttempt && (
            <>
              <div className="mb-4 flex gap-2 flex-wrap">
                <Badge variant={selectedAttempt.level === 'M1' ? 'info' : 'secondary'}>
                  {selectedAttempt.level}
                </Badge>
                <Badge variant={getDifficultyBadgeVariant(selectedAttempt.difficulty)}>
                  {getDifficultyLabel(selectedAttempt.difficulty)}
                </Badge>
                <Badge variant="neutral">
                  {selectedAttempt.topic}
                </Badge>
              </div>

              <div className="mb-6">
                <Heading level={4} size="xs" className="text-[17px] mb-4">
                  {selectedAttempt.question}
                </Heading>
                <div className="space-y-3">
                  {selectedAttempt.options.map((option, index) => {
                    const isUserAnswer = index === selectedAttempt.userAnswer;
                    const isCorrectAnswer = index === selectedAttempt.correctAnswer;

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
                        <Text size="sm" className="inline font-semibold mr-2">
                          {String.fromCharCode(65 + index)}.
                        </Text>
                        <Text size="sm" className="inline">{option}</Text>
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
                <Text size="sm" className="text-black/80 dark:text-white/80">
                  {selectedAttempt.explanation}
                </Text>
              </div>

              <div className={`p-4 rounded-xl ${
                selectedAttempt.isCorrect
                  ? 'bg-[#34C759]/10 dark:bg-[#30D158]/20 text-[#34C759] dark:text-[#5DE38D]'
                  : 'bg-[#FF453A]/10 dark:bg-[#FF453A]/20 text-[#FF453A] dark:text-[#FF7A72]'
              }`}>
                <Text size="md" className="font-semibold text-center">
                  {selectedAttempt.isCorrect
                    ? '¡Respuesta Correcta! 🎉'
                    : 'Respuesta Incorrecta'}
                </Text>
                <Text size="xs" className="text-center mt-1 opacity-80">
                  Respondida el {formatDate(selectedAttempt.timestamp)}
                </Text>
              </div>

              <Button onClick={() => setSelectedAttempt(null)} className="mt-6 w-full">
                Cerrar
              </Button>
            </>
          )}
        </Modal>
      </main>
    </div>
  );
}

export default function ProgressPage() {
  return (
    <ProtectedRoute>
      <ProgressPageContent />
    </ProtectedRoute>
  );
}
