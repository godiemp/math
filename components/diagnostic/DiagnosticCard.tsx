'use client';

import { useState } from 'react';
import { Card, Heading, Text, Button, Badge } from '@/components/ui';
import { useDiagnosticChat, Subject } from '@/hooks/useDiagnosticChat';
import { DiagnosticChat } from './DiagnosticChat';

interface SubjectInfo {
  subject: Subject;
  icon: string;
  color: string;
  bgColor: string;
}

const SUBJECTS: SubjectInfo[] = [
  { subject: 'números', icon: '🔢', color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-950/30' },
  { subject: 'álgebra', icon: '📐', color: 'text-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-950/30' },
  { subject: 'geometría', icon: '📏', color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-950/30' },
  { subject: 'probabilidad', icon: '📊', color: 'text-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-950/30' },
];

export function DiagnosticCard() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const {
    subjectsStatus,
    isLoadingStatus,
    getSubjectProgress,
    getSubjectStatus,
    startDiagnostic,
    isLoading,
  } = useDiagnosticChat();

  const handleStartDiagnostic = async (subject: Subject) => {
    setSelectedSubject(subject);
    await startDiagnostic(subject);
    setIsChatOpen(true);
  };

  const handleCloseDiagnostic = () => {
    setIsChatOpen(false);
    setSelectedSubject(null);
  };

  const getStatusBadge = (status: 'not_started' | 'in_progress' | 'completed') => {
    switch (status) {
      case 'completed':
        return <Badge variant="success" className="text-[10px]">Completado</Badge>;
      case 'in_progress':
        return <Badge variant="warning" className="text-[10px]">En progreso</Badge>;
      default:
        return <Badge variant="neutral" className="text-[10px]">Sin iniciar</Badge>;
    }
  };

  const getOverallProgress = () => {
    if (!subjectsStatus.length) return 0;
    const totalDiagnosed = subjectsStatus.reduce((sum, s) => sum + s.unitsDiagnosed, 0);
    const totalUnits = subjectsStatus.reduce((sum, s) => sum + s.totalUnits, 0);
    return totalUnits > 0 ? Math.round((totalDiagnosed / totalUnits) * 100) : 0;
  };

  return (
    <>
      <Card hover className="p-6" data-testid="diagnostic-card">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🧠</div>
          <Heading level={3} size="sm" className="mb-2">
            Diagnóstico de Conocimiento
          </Heading>
          <Text size="sm" variant="secondary" className="max-w-md mx-auto">
            Conversa con la IA para descubrir qué sabes y personalizar tu aprendizaje
          </Text>
        </div>

        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Text size="xs" variant="secondary">Progreso general</Text>
            <Text size="xs" className="font-medium">{getOverallProgress()}%</Text>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${getOverallProgress()}%` }}
            />
          </div>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-2 gap-3">
          {SUBJECTS.map(({ subject, icon, color, bgColor }) => {
            const status = getSubjectStatus(subject);
            const progress = getSubjectProgress(subject);

            return (
              <button
                key={subject}
                onClick={() => handleStartDiagnostic(subject)}
                disabled={isLoading}
                className={`${bgColor} rounded-xl p-4 text-left transition-all hover:scale-[1.02] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{icon}</span>
                  {getStatusBadge(status)}
                </div>
                <Text size="sm" className={`font-medium capitalize ${color}`}>
                  {subject}
                </Text>
                {progress > 0 && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-current opacity-60 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <Text size="xs" variant="secondary" className="mt-1">
                      {progress}% diagnosticado
                    </Text>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-6 text-center">
          <Button
            onClick={() => {
              // Find the first subject that hasn't been started or is in progress
              const nextSubject = SUBJECTS.find(s => {
                const status = getSubjectStatus(s.subject);
                return status === 'not_started' || status === 'in_progress';
              });
              if (nextSubject) {
                handleStartDiagnostic(nextSubject.subject);
              }
            }}
            disabled={isLoading || isLoadingStatus}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            {isLoading ? 'Iniciando...' : 'Iniciar Diagnóstico'}
          </Button>
        </div>
      </Card>

      {/* Diagnostic Chat Modal */}
      {isChatOpen && selectedSubject && (
        <DiagnosticChat
          subject={selectedSubject}
          onClose={handleCloseDiagnostic}
        />
      )}
    </>
  );
}
