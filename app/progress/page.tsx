'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { QuestionAttempt } from '@/lib/types';
import { ProtectedRoute } from '@/components/ProtectedRoute';

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-[#34C759]/10 text-[#34C759] dark:bg-[#30D158]/20 dark:text-[#5DE38D]';
      case 'medium': return 'bg-[#FF9F0A]/10 text-[#FF9F0A] dark:bg-[#FF9F0A]/20 dark:text-[#FFB84D]';
      case 'hard': return 'bg-[#FF453A]/10 text-[#FF453A] dark:bg-[#FF453A]/20 dark:text-[#FF7A72]';
      default: return 'bg-black/[0.04] text-black dark:bg-white/[0.06] dark:text-white';
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
      <nav className="sticky top-0 z-30 backdrop-blur-[20px] bg-white/80 dark:bg-[#121212]/80 border-b border-black/[0.12] dark:border-white/[0.16] saturate-[1.2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-[#0A84FF] hover:text-[#0A84FF]/80 transition-colors duration-[180ms]"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-[44px] leading-[1.1] font-semibold tracking-tight text-black dark:text-white" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
            Mi Progreso
          </h1>
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
        </div>

        {/* Level Progress Cards with liquidGlass material */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* M1 Progress Card */}
          <div className="backdrop-blur-[12px] bg-white/60 dark:bg-[#1C1C1C]/60 rounded-2xl p-6 border border-black/[0.12] dark:border-white/[0.16] shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition-all duration-[240ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]">
            <h3 className="text-[19px] font-semibold text-black dark:text-white mb-4" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              Competencia Matemática M1
            </h3>
            <div className="mb-4">
              <div className="flex justify-between text-[13px] text-black/60 dark:text-white/70 mb-2">
                <span>Últimas {recentQuestionsCount} preguntas</span>
                <span className="font-semibold">{m1RecentStats.total > 0 ? calculatePercentage(m1RecentStats) : 0}%</span>
              </div>
              <div className="w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#0A84FF] h-2 rounded-full transition-all duration-[300ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  style={{ width: `${m1RecentStats.total > 0 ? calculatePercentage(m1RecentStats) : 0}%` }}
                />
              </div>
            </div>
            <div className="space-y-2 text-black dark:text-white">
              <p className="text-[34px] font-semibold text-center tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                {m1RecentStats.correct}/{m1RecentStats.total}
              </p>
              <p className="text-center text-[13px] text-black/60 dark:text-white/70">
                Respuestas correctas en las últimas {m1RecentStats.total} preguntas
              </p>
            </div>
            <Link
              href="/practice/m1"
              className="mt-4 inline-flex items-center justify-center w-full h-11 rounded-xl text-[15px] font-semibold bg-[#0A84FF] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            >
              Continuar Práctica
            </Link>
          </div>

          {/* M2 Progress Card */}
          <div className="backdrop-blur-[12px] bg-white/60 dark:bg-[#1C1C1C]/60 rounded-2xl p-6 border border-black/[0.12] dark:border-white/[0.16] shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition-all duration-[240ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]">
            <h3 className="text-[19px] font-semibold text-black dark:text-white mb-4" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
              Competencia Matemática M2
            </h3>
            <div className="mb-4">
              <div className="flex justify-between text-[13px] text-black/60 dark:text-white/70 mb-2">
                <span>Últimas {recentQuestionsCount} preguntas</span>
                <span className="font-semibold">{m2RecentStats.total > 0 ? calculatePercentage(m2RecentStats) : 0}%</span>
              </div>
              <div className="w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#0A84FF] h-2 rounded-full transition-all duration-[300ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  style={{ width: `${m2RecentStats.total > 0 ? calculatePercentage(m2RecentStats) : 0}%` }}
                />
              </div>
            </div>
            <div className="space-y-2 text-black dark:text-white">
              <p className="text-[34px] font-semibold text-center tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                {m2RecentStats.correct}/{m2RecentStats.total}
              </p>
              <p className="text-center text-[13px] text-black/60 dark:text-white/70">
                Respuestas correctas en las últimas {m2RecentStats.total} preguntas
              </p>
            </div>
            <Link
              href="/practice/m2"
              className="mt-4 inline-flex items-center justify-center w-full h-11 rounded-xl text-[15px] font-semibold bg-[#0A84FF] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            >
              Continuar Práctica
            </Link>
          </div>
        </div>

        {/* Recent Questions History */}
        {allHistory.length > 0 && (
          <div className="backdrop-blur-[12px] bg-white/60 dark:bg-[#1C1C1C]/60 rounded-2xl p-8 border border-black/[0.12] dark:border-white/[0.16] shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[28px] font-semibold text-black dark:text-white tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                Historial de Preguntas Recientes
              </h2>
              <p className="text-[13px] text-black/60 dark:text-white/70">
                Total: {allHistory.length} preguntas
              </p>
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
                        <span className={`inline-flex items-center h-6 px-2 rounded-full text-[12px] font-medium ${
                          attempt.level === 'M1'
                            ? 'bg-[#0A84FF]/10 text-[#0A84FF] dark:bg-[#0A84FF]/20 dark:text-[#66B2FF]'
                            : 'bg-[#5E5CE6]/10 text-[#5E5CE6] dark:bg-[#9A99FF]/20 dark:text-[#B2B1FF]'
                        }`}>
                          {attempt.level}
                        </span>
                        <span className={`inline-flex items-center h-6 px-2 rounded-full text-[12px] font-medium ${getDifficultyColor(attempt.difficulty)}`}>
                          {getDifficultyLabel(attempt.difficulty)}
                        </span>
                        <span className="text-[13px] text-black/60 dark:text-white/70">
                          {attempt.topic}
                        </span>
                      </div>
                      <p className="text-[15px] text-black dark:text-white font-medium mb-1">
                        {attempt.question}
                      </p>
                      <p className="text-[13px] text-black/60 dark:text-white/70">
                        {formatDate(attempt.timestamp)}
                      </p>
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
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="h-11 px-4 rounded-xl text-[15px] font-medium bg-black/[0.04] dark:bg-white/[0.06] text-black dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                >
                  ← Anterior
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`h-11 w-11 rounded-xl text-[15px] font-medium active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                            currentPage === page
                              ? 'bg-[#0A84FF] text-white shadow-[0_4px_12px_rgba(10,132,255,0.3)]'
                              : 'bg-black/[0.04] dark:bg-white/[0.06] text-black dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12]'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return <span key={page} className="px-2 text-black/60 dark:text-white/70">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="h-11 px-4 rounded-xl text-[15px] font-medium bg-black/[0.04] dark:bg-white/[0.06] text-black dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                >
                  Siguiente →
                </button>
              </div>
            )}
          </div>
        )}

        {allHistory.length === 0 && (
          <div className="mt-8 backdrop-blur-[12px] bg-[#FF9F0A]/5 dark:bg-[#FF9F0A]/10 border-l-4 border-[#FF9F0A] rounded-r-xl p-4">
            <p className="text-[15px] text-[#FF9F0A] dark:text-[#FFB84D]">
              Aún no has comenzado a practicar. ¡Empieza ahora con M1 o M2!
            </p>
          </div>
        )}

        {/* Review Modal with Liquid Glass */}
        {selectedAttempt && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedAttempt(null)}
          >
            <div
              className="backdrop-blur-[20px] bg-white/90 dark:bg-[#1C1C1C]/90 rounded-3xl shadow-[0_20px_48px_rgba(0,0,0,0.26)] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 border border-black/[0.12] dark:border-white/[0.16]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-[28px] font-semibold text-black dark:text-white tracking-tight" style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}>
                  Revisar Pregunta
                </h3>
                <button
                  onClick={() => setSelectedAttempt(null)}
                  className="text-black/60 hover:text-black dark:text-white/70 dark:hover:text-white text-3xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-[180ms]"
                >
                  ×
                </button>
              </div>

              <div className="mb-4 flex gap-2 flex-wrap">
                <span className={`inline-flex items-center h-7 px-3 rounded-full text-[13px] font-medium ${
                  selectedAttempt.level === 'M1'
                    ? 'bg-[#0A84FF]/10 text-[#0A84FF] dark:bg-[#0A84FF]/20 dark:text-[#66B2FF]'
                    : 'bg-[#5E5CE6]/10 text-[#5E5CE6] dark:bg-[#9A99FF]/20 dark:text-[#B2B1FF]'
                }`}>
                  {selectedAttempt.level}
                </span>
                <span className={`inline-flex items-center h-7 px-3 rounded-full text-[13px] font-medium ${getDifficultyColor(selectedAttempt.difficulty)}`}>
                  {getDifficultyLabel(selectedAttempt.difficulty)}
                </span>
                <span className="inline-flex items-center h-7 px-3 rounded-full text-[13px] font-medium bg-black/[0.04] text-black dark:bg-white/[0.06] dark:text-white">
                  {selectedAttempt.topic}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="text-[17px] font-semibold text-black dark:text-white mb-4">
                  {selectedAttempt.question}
                </h4>
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
                        <span className="font-semibold mr-2 text-[15px]">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="text-[15px]">{option}</span>
                        {isCorrectAnswer && <span className="float-right text-[13px]">✓ Correcta</span>}
                        {isUserAnswer && !isCorrectAnswer && <span className="float-right text-[13px]">✗ Tu respuesta</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#0A84FF]/5 dark:bg-[#0A84FF]/10 border-l-4 border-[#0A84FF] rounded-r-xl p-4 mb-6">
                <h4 className="font-semibold text-[15px] text-[#0A84FF] dark:text-[#66B2FF] mb-2">
                  Explicación:
                </h4>
                <p className="text-[15px] text-black/80 dark:text-white/80 leading-[1.4]">
                  {selectedAttempt.explanation}
                </p>
              </div>

              <div className={`p-4 rounded-xl ${
                selectedAttempt.isCorrect
                  ? 'bg-[#34C759]/10 dark:bg-[#30D158]/20 text-[#34C759] dark:text-[#5DE38D]'
                  : 'bg-[#FF453A]/10 dark:bg-[#FF453A]/20 text-[#FF453A] dark:text-[#FF7A72]'
              }`}>
                <p className="font-semibold text-center text-[17px]">
                  {selectedAttempt.isCorrect
                    ? '¡Respuesta Correcta! 🎉'
                    : 'Respuesta Incorrecta'}
                </p>
                <p className="text-[13px] text-center mt-1 opacity-80">
                  Respondida el {formatDate(selectedAttempt.timestamp)}
                </p>
              </div>

              <button
                onClick={() => setSelectedAttempt(null)}
                className="mt-6 w-full h-11 rounded-xl text-[15px] font-semibold bg-[#0A84FF] text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-all duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
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
