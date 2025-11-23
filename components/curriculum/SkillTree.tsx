'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { LoadingScreen } from '@/components/ui';
import {
  getCurriculumStructure,
  getMyProgress,
  updateTopicCompletion,
  type CurriculumStructure,
  type TopicProgress,
  type Subject,
  type TopicInfo
} from '@/lib/api/curriculumProgress';

/**
 * Renders difficulty stars for a topic
 */
function DifficultyStars({ difficulty }: { difficulty: 1 | 2 | 3 }) {
  return (
    <span className="text-yellow-500" title={`Dificultad: ${difficulty}/3`}>
      {'⭐'.repeat(difficulty)}
    </span>
  );
}

/**
 * Individual topic checkbox item
 */
interface TopicItemProps {
  topic: TopicInfo;
  isCompleted: boolean;
  onToggle: (topicSlug: string, isCompleted: boolean) => void;
  disabled: boolean;
}

function TopicItem({ topic, isCompleted, onToggle, disabled }: TopicItemProps) {
  const handleChange = () => {
    onToggle(topic.slug, !isCompleted);
  };

  return (
    <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleChange}
        disabled={disabled}
        className="mt-1 w-5 h-5 rounded border-2 border-purple-500/50 bg-black/20
                   checked:bg-purple-600 checked:border-purple-600
                   focus:ring-2 focus:ring-purple-500/50 cursor-pointer
                   disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <Text className="font-medium">{topic.name}</Text>
          <DifficultyStars difficulty={topic.difficulty} />
          <Text className="text-sm text-white/60">
            ({topic.questionCount} preguntas)
          </Text>
        </div>
      </div>
    </label>
  );
}

/**
 * Subject section with collapsible topics
 */
interface SubjectSectionProps {
  subject: Subject;
  progressMap: Map<string, boolean>;
  onToggleTopic: (topicSlug: string, subject: string, isCompleted: boolean) => void;
  disabled: boolean;
}

function SubjectSection({ subject, progressMap, onToggleTopic, disabled }: SubjectSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  const completedCount = subject.topics.filter(t => progressMap.get(t.slug)).length;
  const totalCount = subject.topics.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <Card className="mb-4" padding="md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between mb-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{isOpen ? '▼' : '▶'}</span>
          <Heading level={3} className="text-left">{subject.name}</Heading>
        </div>
        <div className="flex items-center gap-3">
          <Text className="text-sm text-white/70">
            {completedCount}/{totalCount} completados
          </Text>
          <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="space-y-1">
          {subject.topics.map(topic => (
            <TopicItem
              key={topic.slug}
              topic={topic}
              isCompleted={progressMap.get(topic.slug) || false}
              onToggle={(slug, isCompleted) => onToggleTopic(slug, subject.id, isCompleted)}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    </Card>
  );
}

/**
 * Main SkillTree component
 */
export function SkillTree() {
  const [structure, setStructure] = useState<CurriculumStructure | null>(null);
  const [progressMap, setProgressMap] = useState<Map<string, boolean>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  // Load curriculum structure and user progress
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [structureRes, progressRes] = await Promise.all([
          getCurriculumStructure(),
          getMyProgress()
        ]);

        if (structureRes.success) {
          setStructure(structureRes.structure);
        }

        if (progressRes.success) {
          const map = new Map<string, boolean>();
          progressRes.progress.forEach((p: TopicProgress) => {
            map.set(p.topicSlug, p.isCompleted);
          });
          setProgressMap(map);
        }
      } catch (err) {
        console.error('Error loading skill tree:', err);
        setError('Error al cargar el árbol de habilidades');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Handle topic toggle
  const handleToggleTopic = async (topicSlug: string, subject: string, isCompleted: boolean) => {
    try {
      setUpdating(true);

      // Optimistic update
      setProgressMap(prev => {
        const newMap = new Map(prev);
        newMap.set(topicSlug, isCompleted);
        return newMap;
      });

      const response = await updateTopicCompletion(topicSlug, subject, isCompleted);

      if (!response.success) {
        // Revert on failure
        setProgressMap(prev => {
          const newMap = new Map(prev);
          newMap.set(topicSlug, !isCompleted);
          return newMap;
        });
        setError('Error al actualizar el progreso');
      }
    } catch (err) {
      console.error('Error updating topic:', err);
      // Revert on error
      setProgressMap(prev => {
        const newMap = new Map(prev);
        newMap.set(topicSlug, !isCompleted);
        return newMap;
      });
      setError('Error al actualizar el progreso');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error && !structure) {
    return (
      <Card className="text-center" padding="lg">
        <Text className="text-red-400">{error}</Text>
      </Card>
    );
  }

  if (!structure) {
    return (
      <Card className="text-center" padding="lg">
        <Text>No se pudo cargar la estructura del currículum</Text>
      </Card>
    );
  }

  // Calculate overall progress
  const allTopics = structure.subjects.flatMap(s => s.topics);
  const completedTopics = allTopics.filter(t => progressMap.get(t.slug));
  const overallPercentage = Math.round((completedTopics.length / allTopics.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header with overall progress */}
      <Card padding="lg" className="text-center">
        <Heading level={2} className="mb-4">{structure.name}</Heading>
        <Text className="mb-4 text-white/70">
          Marca los temas que ya dominas para llevar un registro de tu conocimiento
        </Text>

        <div className="flex items-center justify-center gap-4 mb-4">
          <Text className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {completedTopics.length} / {allTopics.length}
          </Text>
          <Text className="text-white/70">temas completados</Text>
        </div>

        <div className="max-w-md mx-auto">
          <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
          <Text className="text-sm text-white/60 mt-2">{overallPercentage}% completado</Text>
        </div>
      </Card>

      {/* Error message if any */}
      {error && (
        <Card padding="md" className="bg-red-500/10 border border-red-500/20">
          <Text className="text-red-400">{error}</Text>
        </Card>
      )}

      {/* Subject sections */}
      <div>
        {structure.subjects.map(subject => (
          <SubjectSection
            key={subject.id}
            subject={subject}
            progressMap={progressMap}
            onToggleTopic={handleToggleTopic}
            disabled={updating}
          />
        ))}
      </div>
    </div>
  );
}
