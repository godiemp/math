'use client';

import { useState } from 'react';
import { Card, Heading, Text, Badge, Spinner } from '@/components/ui';
import { useClassFailedQuestions, type FailedQuestion } from '@/lib/hooks/useClasses';

interface FailedQuestionsPanelProps {
  classId: string;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

function getSubjectLabel(subject: string): string {
  const labels: Record<string, string> = {
    numeros: 'Numeros',
    algebra: 'Algebra',
    geometria: 'Geometria',
    probabilidad: 'Probabilidad',
  };
  return labels[subject?.toLowerCase()] || subject || 'Sin asignatura';
}

function FailedQuestionCard({ question }: { question: FailedQuestion }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const failPercentage = Math.round(question.failRate * 100);

  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      {/* Question text */}
      <div className="mb-3">
        <Text className="text-gray-900 dark:text-gray-100 font-medium">
          {truncateText(question.questionText, 150)}
        </Text>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant="neutral" size="sm">
          {getSubjectLabel(question.subject)}
        </Badge>
        {question.topic && (
          <Badge variant="neutral" size="sm">
            {question.topic}
          </Badge>
        )}
      </div>

      {/* Fail rate bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <Text size="sm" variant="secondary">
            Tasa de error
          </Text>
          <Text size="sm" className="font-medium text-red-600 dark:text-red-400">
            {question.failCount} de {question.totalAttempts} ({failPercentage}%)
          </Text>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-red-500 dark:bg-red-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${failPercentage}%` }}
          />
        </div>
      </div>

      {/* Students who failed */}
      {question.studentsFailed.length > 0 && (
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>{isExpanded ? 'Ocultar' : 'Ver'} estudiantes ({question.studentsFailed.length})</span>
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExpanded && (
            <div className="mt-2 pl-2 border-l-2 border-gray-200 dark:border-gray-600">
              <div className="flex flex-wrap gap-1">
                {question.studentsFailed.map((student, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300"
                  >
                    {student}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function FailedQuestionsPanel({ classId }: FailedQuestionsPanelProps) {
  const { failedQuestions, isLoading, error } = useClassFailedQuestions(classId);

  if (isLoading) {
    return (
      <Card padding="lg">
        <div className="flex justify-center py-8">
          <Spinner size="lg" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card padding="lg">
        <Text variant="secondary" className="text-center py-8">
          Error al cargar los errores comunes
        </Text>
      </Card>
    );
  }

  const questions = failedQuestions?.questions || [];

  if (questions.length === 0) {
    return (
      <Card padding="lg">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">
            <span role="img" aria-label="celebracion">&#127881;</span>
          </div>
          <Heading level={3} size="md" className="mb-2">
            Sin errores comunes
          </Heading>
          <Text variant="secondary">
            No hay preguntas con tasa de error mayor al 30% en los ultimos 30 dias.
            <br />
            Tus estudiantes van muy bien.
          </Text>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with summary */}
      <Card padding="md" className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
        <div className="flex items-start gap-3">
          <div className="text-2xl">
            <span role="img" aria-label="atencion">&#9888;&#65039;</span>
          </div>
          <div>
            <Heading level={3} size="sm" className="mb-1">
              {questions.length} {questions.length === 1 ? 'pregunta requiere' : 'preguntas requieren'} atencion
            </Heading>
            <Text size="sm" variant="secondary">
              Estas preguntas tienen mas del 30% de error en los ultimos 30 dias.
              Considera reforzar estos temas en clase.
            </Text>
          </div>
        </div>
      </Card>

      {/* Questions list */}
      <div className="space-y-3">
        {questions.map((question, index) => (
          <FailedQuestionCard key={question.questionId || index} question={question} />
        ))}
      </div>
    </div>
  );
}
