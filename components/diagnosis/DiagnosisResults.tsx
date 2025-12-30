'use client';

import { Card, Badge, Text, Heading, Button } from '@/components/ui';
import { GapCard } from './GapCard';

interface DetectedGap {
  skillId: string;
  skillName: string;
  severity: 'critical' | 'moderate' | 'minor';
  specificIssue: string;
  conceptMissing: string;
  evidenceQuestionId: string;
  userAnswer: number;
  correctAnswer: number;
  followUpExplanation?: string;
}

interface GapRecommendation {
  type: 'lesson' | 'practice' | 'prerequisite';
  skillId: string;
  skillName: string;
  reason: string;
  resourceId?: string;
  priority: number;
}

interface DiagnosisResult {
  sessionId: string;
  userId: string;
  level: 'M1' | 'M2';
  totalQuestions: number;
  correctAnswers: number;
  verifiedSkills: string[];
  unverifiedSkills: string[];
  gaps: DetectedGap[];
  recommendations: GapRecommendation[];
  completedAt: number;
}

interface DiagnosisResultsProps {
  result: DiagnosisResult;
  onClose: () => void;
}

export function DiagnosisResults({ result, onClose }: DiagnosisResultsProps) {
  const accuracy = Math.round((result.correctAnswers / result.totalQuestions) * 100);
  const hasGaps = result.gaps.length > 0;

  // Group gaps by severity
  const criticalGaps = result.gaps.filter((g) => g.severity === 'critical');
  const moderateGaps = result.gaps.filter((g) => g.severity === 'moderate');
  const minorGaps = result.gaps.filter((g) => g.severity === 'minor');

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
        <div className="text-center">
          <Heading level={3} className="mb-2">
            Diagnóstico completado
          </Heading>

          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <Text className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {result.correctAnswers}/{result.totalQuestions}
              </Text>
              <Text size="sm" className="text-gray-600 dark:text-gray-400">
                Correctas
              </Text>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-600" />
            <div className="text-center">
              <Text className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {accuracy}%
              </Text>
              <Text size="sm" className="text-gray-600 dark:text-gray-400">
                Precisión
              </Text>
            </div>
          </div>

          {!hasGaps ? (
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
              <Text className="text-green-800 dark:text-green-200 font-medium">
                ¡Excelente! No detectamos lagunas en las habilidades evaluadas.
              </Text>
            </div>
          ) : (
            <div className="bg-amber-100 dark:bg-amber-900/30 rounded-lg p-4">
              <Text className="text-amber-800 dark:text-amber-200 font-medium">
                Detectamos {result.gaps.length} área{result.gaps.length > 1 ? 's' : ''} de oportunidad.
              </Text>
            </div>
          )}

          {/* Autoevaluación sync notice */}
          <div className="mt-4 text-center">
            <Text size="sm" className="text-gray-600 dark:text-gray-400">
              Tu autoevaluación ha sido actualizada con estos resultados.
            </Text>
          </div>
        </div>
      </Card>

      {/* Verified Skills */}
      {result.verifiedSkills.length > 0 && (
        <div>
          <Heading level={4} className="mb-3 flex items-center gap-2">
            <span className="text-green-500">✓</span> Habilidades verificadas
          </Heading>
          <div className="flex flex-wrap gap-2">
            {result.verifiedSkills.map((skillId) => (
              <Badge key={skillId} variant="success">
                {skillId}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Gaps by Severity */}
      {hasGaps && (
        <div className="space-y-4">
          <Heading level={4} className="flex items-center gap-2">
            <span className="text-amber-500">⚠</span> Áreas de oportunidad
          </Heading>

          {criticalGaps.length > 0 && (
            <div>
              <Text size="sm" className="text-red-600 dark:text-red-400 font-medium mb-2">
                Críticas ({criticalGaps.length})
              </Text>
              <div className="space-y-2">
                {criticalGaps.map((gap) => (
                  <GapCard key={gap.skillId} gap={gap} />
                ))}
              </div>
            </div>
          )}

          {moderateGaps.length > 0 && (
            <div>
              <Text size="sm" className="text-amber-600 dark:text-amber-400 font-medium mb-2">
                Moderadas ({moderateGaps.length})
              </Text>
              <div className="space-y-2">
                {moderateGaps.map((gap) => (
                  <GapCard key={gap.skillId} gap={gap} />
                ))}
              </div>
            </div>
          )}

          {minorGaps.length > 0 && (
            <div>
              <Text size="sm" className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                Menores ({minorGaps.length})
              </Text>
              <div className="space-y-2">
                {minorGaps.map((gap) => (
                  <GapCard key={gap.skillId} gap={gap} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="primary" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
}
