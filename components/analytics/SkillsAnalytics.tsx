'use client';

import { useMemo, useState } from 'react';
import { questions as allQuestions } from '@/lib/questions';
import { SKILLS } from '@/lib/skillTaxonomy';
import { Card, Badge, Heading, Text, Button } from '@/components/ui';
import { QuestionPreview } from '@/components/quiz/QuestionRenderer';
import type { Question } from '@/lib/types';

export function SkillsAnalytics() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<'M1' | 'M2' | 'all'>('all');

  const stats = useMemo(() => {

    // Filter by level if selected
    const filteredQuestions = selectedLevel === 'all'
      ? allQuestions
      : allQuestions.filter(q => q.level === selectedLevel);

    // Distribution by skill count
    const skillCountDist: Record<number, number> = {};
    filteredQuestions.forEach(q => {
      const count = q.skills.length;
      skillCountDist[count] = (skillCountDist[count] || 0) + 1;
    });

    // Total skills used
    const skillsUsed = new Set<string>();
    filteredQuestions.forEach(q => {
      q.skills.forEach(skill => skillsUsed.add(skill));
    });

    // Questions by skill count (sorted)
    const questionsBySkillCount = Object.entries(skillCountDist)
      .map(([count, num]) => ({ count: parseInt(count), questions: num }))
      .sort((a, b) => b.count - a.count);

    // Average skills per question
    const totalSkills = filteredQuestions.reduce((sum, q) => sum + q.skills.length, 0);
    const avgSkillsPerQuestion = filteredQuestions.length > 0
      ? (totalSkills / filteredQuestions.length).toFixed(2)
      : '0';

    // Questions with most skills
    const topQuestions = [...filteredQuestions]
      .sort((a, b) => b.skills.length - a.skills.length)
      .slice(0, 10);

    return {
      total: filteredQuestions.length,
      skillCountDist: questionsBySkillCount,
      totalUniqueSkills: skillsUsed.size,
      avgSkillsPerQuestion,
      topQuestions,
      allQuestions: filteredQuestions
    };
  }, [selectedLevel]);

  const getSkillName = (skillId: string) => {
    return SKILLS[skillId]?.name || skillId;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Heading level={3} size="sm" className="mb-2">
              Análisis de Skills por Problema
            </Heading>
            <Text size="sm" variant="secondary">
              Estadísticas sobre la distribución de habilidades en los problemas
            </Text>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedLevel === 'all'
                  ? 'bg-[#0A84FF] text-white'
                  : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedLevel('M1')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedLevel === 'M1'
                  ? 'bg-[#0A84FF] text-white'
                  : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15'
              }`}
            >
              M1
            </button>
            <button
              onClick={() => setSelectedLevel('M2')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedLevel === 'M2'
                  ? 'bg-[#0A84FF] text-white'
                  : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15'
              }`}
            >
              M2
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl">
            <div className="text-3xl font-bold text-[#0A84FF] mb-1">
              {stats.total}
            </div>
            <Text size="xs" variant="secondary">
              Total Problemas
            </Text>
          </div>
          <div className="text-center p-4 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl">
            <div className="text-3xl font-bold text-[#34C759] dark:text-[#30D158] mb-1">
              {stats.totalUniqueSkills}
            </div>
            <Text size="xs" variant="secondary">
              Skills Únicas
            </Text>
          </div>
          <div className="text-center p-4 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl">
            <div className="text-3xl font-bold text-[#FF9F0A] mb-1">
              {stats.avgSkillsPerQuestion}
            </div>
            <Text size="xs" variant="secondary">
              Promedio Skills
            </Text>
          </div>
          <div className="text-center p-4 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl">
            <div className="text-3xl font-bold text-[#5E5CE6] mb-1">
              {Math.max(...stats.skillCountDist.map(s => s.count), 0)}
            </div>
            <Text size="xs" variant="secondary">
              Máx Skills/Problema
            </Text>
          </div>
        </div>

        {/* Distribution by Skill Count */}
        <div className="mb-6">
          <Heading level={4} size="xs" className="mb-3">
            Distribución por Cantidad de Skills
          </Heading>
          <div className="space-y-2">
            {stats.skillCountDist.map(({ count, questions }) => (
              <div key={count} className="flex items-center gap-3">
                <div className="w-24 text-right">
                  <Badge size="sm" variant="neutral">
                    {count} skill{count !== 1 ? 's' : ''}
                  </Badge>
                </div>
                <div className="flex-1 h-8 bg-black/[0.04] dark:bg-white/[0.06] rounded-lg overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] transition-all duration-300"
                    style={{ width: `${(questions / stats.total) * 100}%` }}
                  />
                  <div className="absolute inset-0 flex items-center px-3">
                    <Text size="xs" className="text-white font-semibold drop-shadow-sm">
                      {questions} problema{questions !== 1 ? 's' : ''} ({((questions / stats.total) * 100).toFixed(1)}%)
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Toggle Details Button */}
        <div className="text-center">
          <Button
            onClick={() => setShowDetails(!showDetails)}
            variant="secondary"
            className="gap-2"
          >
            {showDetails ? '▲ Ocultar Detalles' : '▼ Ver Detalles de Problemas'}
          </Button>
        </div>
      </Card>

      {/* Detailed Problem List */}
      {showDetails && (
        <Card className="p-6">
          <Heading level={4} size="xs" className="mb-4">
            Top 10 Problemas con Más Skills
          </Heading>
          <div className="space-y-3">
            {stats.topQuestions.map(question => (
              <div
                key={question.id}
                className="p-4 rounded-xl border border-black/[0.12] dark:border-white/[0.16] bg-white dark:bg-[#1C1C1E]"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge size="sm" variant="info">
                        {question.id}
                      </Badge>
                      <Badge size="sm" variant={question.level === 'M1' ? 'success' : 'warning'}>
                        {question.level}
                      </Badge>
                      <Badge size="sm" variant="neutral">
                        {question.difficulty}
                      </Badge>
                    </div>
                    <div className="line-clamp-2">
                      <QuestionPreview question={question} maxLength={150} />
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0A84FF]">
                        {question.skills.length}
                      </div>
                      <Text size="xs" variant="secondary">
                        skills
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <Text size="xs" variant="secondary" className="mb-2 font-semibold">
                    Skills utilizadas:
                  </Text>
                  <div className="flex flex-wrap gap-1.5">
                    {question.skills.map(skillId => (
                      <Badge key={skillId} size="sm" variant="secondary">
                        {getSkillName(skillId)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
