'use client';

import { useMemo, useState } from 'react';
import type { QuestionAttempt, SkillsDisplayProps } from '@/lib/types';
import {
  summarizeSkillProgress,
  getRecommendedSkills,
  getSkillProgressByTopic,
  SkillProgress
} from '@/lib/skillProgress';
import { Card, Badge, Heading, Text } from '@/components/ui';

export function SkillsDisplay({ attempts, level, showRecommendations = true }: SkillsDisplayProps) {
  const [viewMode, setViewMode] = useState<'status' | 'topic'>('status');
  const [expandedCategory, setExpandedCategory] = useState<'mastered' | 'learning' | 'notStarted' | null>('learning');

  const summary = useMemo(() => {
    return summarizeSkillProgress(attempts, level);
  }, [attempts, level]);

  const recommended = useMemo(() => {
    return getRecommendedSkills(attempts, level, 5);
  }, [attempts, level]);

  const byTopic = useMemo(() => {
    return getSkillProgressByTopic(attempts, level);
  }, [attempts, level]);

  const toggleCategory = (category: 'mastered' | 'learning' | 'notStarted') => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const getMasteryBadgeVariant = (masteryLevel: string): 'success' | 'warning' | 'neutral' => {
    switch (masteryLevel) {
      case 'mastered': return 'success';
      case 'learning': return 'warning';
      default: return 'neutral';
    }
  };

  const getMasteryLabel = (masteryLevel: string): string => {
    switch (masteryLevel) {
      case 'mastered': return 'Dominado';
      case 'learning': return 'Aprendiendo';
      default: return 'No iniciado';
    }
  };

  const getTopicEmoji = (topic: string): string => {
    switch (topic.toLowerCase()) {
      case 'números': return '🔢';
      case 'álgebra': return '📐';
      case 'geometría': return '📏';
      case 'probabilidad': return '🎲';
      default: return '📚';
    }
  };

  const renderSkillCard = (skillProgress: SkillProgress) => {
    const { skill, accuracy, attemptsCount, correctCount, incorrectCount, masteryLevel } = skillProgress;

    return (
      <div
        key={skill.id}
        className="p-4 rounded-xl border border-black/[0.12] dark:border-white/[0.16] bg-white dark:bg-[#1C1C1E] hover:border-[#0A84FF]/50 dark:hover:border-[#0A84FF]/50 transition-all duration-[180ms]"
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <Heading level={4} size="xs" className="mb-1">
              {skill.name}
            </Heading>
            <Text size="xs" variant="secondary" className="mb-2">
              {skill.description}
            </Text>
          </div>
          <Badge
            size="sm"
            variant={getMasteryBadgeVariant(masteryLevel)}
          >
            {getMasteryLabel(masteryLevel)}
          </Badge>
        </div>

        {attemptsCount > 0 && (
          <>
            {/* Progress bar */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <Text size="xs" variant="secondary">
                  Precisión
                </Text>
                <Text size="xs" variant="secondary" className="font-semibold">
                  {accuracy}%
                </Text>
              </div>
              <div className="w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-[300ms] ${
                    accuracy >= 80
                      ? 'bg-[#34C759] dark:bg-[#30D158]'
                      : accuracy >= 60
                      ? 'bg-[#FF9F0A] dark:bg-[#FF9F0A]'
                      : 'bg-[#FF453A] dark:bg-[#FF453A]'
                  }`}
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 text-xs">
              <div>
                <Text size="xs" variant="secondary">Intentos</Text>
                <Text size="xs" className="font-semibold">{attemptsCount}</Text>
              </div>
              <div>
                <Text size="xs" variant="secondary">Correctas</Text>
                <Text size="xs" className="font-semibold text-[#34C759] dark:text-[#30D158]">
                  {correctCount}
                </Text>
              </div>
              <div>
                <Text size="xs" variant="secondary">Incorrectas</Text>
                <Text size="xs" className="font-semibold text-[#FF453A]">
                  {incorrectCount}
                </Text>
              </div>
            </div>
          </>
        )}

        {attemptsCount === 0 && (
          <div className="py-2">
            <Text size="xs" variant="secondary" className="italic">
              No has practicado esta habilidad aún
            </Text>
          </div>
        )}

        {/* Metadata badges */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <Badge size="sm" variant="neutral">
            {getTopicEmoji(skill.topic)} {skill.topic}
          </Badge>
          {skill.isCore && (
            <Badge size="sm" variant="info">
              ⭐ Core
            </Badge>
          )}
          {skill.prerequisites.length > 0 && (
            <Badge size="sm" variant="secondary">
              {skill.prerequisites.length} prerequisito(s)
            </Badge>
          )}
        </div>
      </div>
    );
  };

  const renderCategorySection = (
    title: string,
    count: number,
    skills: SkillProgress[],
    categoryKey: 'mastered' | 'learning' | 'notStarted',
    icon: string,
    color: string
  ) => {
    const isExpanded = expandedCategory === categoryKey;

    return (
      <div className="mb-4">
        <button
          onClick={() => toggleCategory(categoryKey)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-black/[0.12] dark:border-white/[0.16] bg-white dark:bg-[#1C1C1E] hover:border-[#0A84FF]/50 dark:hover:border-[#0A84FF]/50 transition-all duration-[180ms] active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <div className="text-left">
              <Heading level={3} size="xs">
                {title}
              </Heading>
              <Text size="xs" variant="secondary">
                {count} habilidad{count !== 1 ? 'es' : ''}
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1 rounded-full text-sm font-semibold ${color}`}
            >
              {count}
            </div>
            <span className={`text-lg transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
        </button>

        {isExpanded && skills.length > 0 && (
          <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {skills.map(renderSkillCard)}
          </div>
        )}

        {isExpanded && skills.length === 0 && (
          <div className="mt-3 p-6 text-center rounded-xl border border-black/[0.12] dark:border-white/[0.16] bg-white dark:bg-[#1C1C1E]">
            <Text size="sm" variant="secondary" className="italic">
              No hay habilidades en esta categoría
            </Text>
          </div>
        )}
      </div>
    );
  };

  const hasStarted = summary.totalAttempts > 0;

  return (
    <div className="space-y-6">
      {/* Not Started Message */}
      {!hasStarted && (
        <div className="backdrop-blur-[12px] bg-[#0A84FF]/5 dark:bg-[#0A84FF]/10 border-l-4 border-[#0A84FF] rounded-r-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <Text size="sm" className="text-[#0A84FF] font-semibold mb-1">
                ¡Comienza tu viaje de aprendizaje!
              </Text>
              <Text size="sm" variant="secondary">
                A continuación puedes ver todas las habilidades que puedes dominar. Comienza a practicar para rastrear tu progreso en cada una.
              </Text>
            </div>
          </div>
        </div>
      )}

      {/* Overall Statistics */}
      {hasStarted && (
        <Card className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Heading level={3} size="md" className="mb-1">
                {summary.totalSkills}
              </Heading>
              <Text size="xs" variant="secondary">
                Total Habilidades
              </Text>
            </div>
            <div className="text-center">
              <Heading level={3} size="md" className="text-[#34C759] dark:text-[#30D158] mb-1">
                {summary.mastered.length}
              </Heading>
              <Text size="xs" variant="secondary">
                Dominadas
              </Text>
            </div>
            <div className="text-center">
              <Heading level={3} size="md" className="text-[#FF9F0A] mb-1">
                {summary.learning.length}
              </Heading>
              <Text size="xs" variant="secondary">
                Aprendiendo
              </Text>
            </div>
            <div className="text-center">
              <Heading level={3} size="md" className="mb-1">
                {summary.overallAccuracy}%
              </Heading>
              <Text size="xs" variant="secondary">
                Precisión General
              </Text>
            </div>
          </div>
        </Card>
      )}

      {/* Recommendations */}
      {showRecommendations && hasStarted && recommended.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💡</span>
            <Heading level={3} size="sm">
              Recomendado para ti
            </Heading>
          </div>
          <Text size="sm" variant="secondary" className="mb-4">
            Estas habilidades son ideales para practicar ahora basándote en tu progreso actual
          </Text>
          <div className="grid gap-3 md:grid-cols-2">
            {recommended.map(renderSkillCard)}
          </div>
        </Card>
      )}

      {/* View Mode Toggle */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setViewMode('status')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-[180ms] ${
            viewMode === 'status'
              ? 'bg-[#0A84FF] text-white'
              : 'bg-white dark:bg-[#1C1C1E] text-black/60 dark:text-white/70 border border-black/[0.12] dark:border-white/[0.16]'
          }`}
        >
          Por Estado
        </button>
        <button
          onClick={() => setViewMode('topic')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-[180ms] ${
            viewMode === 'topic'
              ? 'bg-[#0A84FF] text-white'
              : 'bg-white dark:bg-[#1C1C1E] text-black/60 dark:text-white/70 border border-black/[0.12] dark:border-white/[0.16]'
          }`}
        >
          Por Tema
        </button>
      </div>

      {/* Skills by Status */}
      {viewMode === 'status' && (
        <div className="space-y-4">
          {renderCategorySection(
            'Aprendiendo',
            summary.learning.length,
            summary.learning,
            'learning',
            '📖',
            'bg-[#FF9F0A]/10 text-[#FF9F0A]'
          )}
          {renderCategorySection(
            'Dominadas',
            summary.mastered.length,
            summary.mastered,
            'mastered',
            '✓',
            'bg-[#34C759]/10 dark:bg-[#30D158]/10 text-[#34C759] dark:text-[#30D158]'
          )}
          {renderCategorySection(
            'No Iniciadas',
            summary.notStarted.length,
            summary.notStarted,
            'notStarted',
            '◯',
            'bg-black/[0.04] dark:bg-white/[0.06] text-black/60 dark:text-white/70'
          )}
        </div>
      )}

      {/* Skills by Topic */}
      {viewMode === 'topic' && (
        <div className="space-y-4">
          {Array.from(byTopic.entries()).map(([topic, skills]) => (
            <Card key={topic} className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{getTopicEmoji(topic)}</span>
                <Heading level={3} size="sm">
                  {topic.charAt(0).toUpperCase() + topic.slice(1)}
                </Heading>
                <Badge size="sm" variant="neutral">
                  {skills.length} habilidades
                </Badge>
              </div>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {skills.map(renderSkillCard)}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
