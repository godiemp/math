'use client';

import { ChevronLeft, MessageCircle, Map } from 'lucide-react';
import type { DecomposedSkill } from '@/hooks/usePracticeSession';

interface PracticeHeaderProps {
  selectedFocus: string;
  currentSubsectionCode?: string;
  onChangeTopic: () => void;
  onOpenTutor: () => void;
  onOpenTimeline: () => void;
  // Progress indicator
  selectedSkills: DecomposedSkill[];
  currentSkillIndex: number;
  scaffoldingMode: 'none' | 'active' | 'skill-based';
  tutorHasMessages?: boolean;
}

const TOPIC_EMOJIS: Record<string, string> = {
  números: '🔢',
  álgebra: '📐',
  geometría: '📏',
  probabilidad: '🎲',
  surprise: '🎁',
};

const TOPIC_NAMES: Record<string, string> = {
  números: 'Números',
  álgebra: 'Álgebra',
  geometría: 'Geometría',
  probabilidad: 'Probabilidad',
  surprise: 'Sorpresa',
};

export function PracticeHeader({
  selectedFocus,
  currentSubsectionCode,
  onChangeTopic,
  onOpenTutor,
  onOpenTimeline,
  selectedSkills,
  currentSkillIndex,
  scaffoldingMode,
  tutorHasMessages,
}: PracticeHeaderProps) {
  const isSkillBased = scaffoldingMode === 'skill-based';
  const hasActiveScaffolding = scaffoldingMode !== 'none';
  const emoji = TOPIC_EMOJIS[selectedFocus] || '📚';
  const topicName = TOPIC_NAMES[selectedFocus] || selectedFocus;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-lg border-b border-black/[0.08] dark:border-white/[0.08]">
      <div className="h-full max-w-4xl mx-auto px-4 flex items-center justify-between">
        {/* Left: Back button */}
        <button
          onClick={onChangeTopic}
          className="flex items-center gap-1 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline">Cambiar tema</span>
        </button>

        {/* Center: Topic + Progress indicator */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">{emoji}</span>
          <div className="text-center">
            <span className="text-sm font-semibold text-black dark:text-white">
              {topicName}
            </span>
            {currentSubsectionCode && (
              <span className="text-xs text-black/50 dark:text-white/50 block">
                {currentSubsectionCode}
              </span>
            )}
          </div>

          {/* Compact progress indicator (when skill-based) */}
          {isSkillBased && selectedSkills.length > 0 && (
            <button
              onClick={onOpenTimeline}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A84FF]/10 hover:bg-[#0A84FF]/20 transition-colors"
            >
              <div className="flex gap-1">
                {selectedSkills.map((skill, i) => (
                  <div
                    key={skill.id}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i < currentSkillIndex
                        ? skill.wasCorrect
                          ? 'bg-[#34C759]'
                          : 'bg-[#FF453A]'
                        : i === currentSkillIndex
                          ? 'bg-[#FF9F0A] animate-pulse'
                          : 'bg-black/20 dark:bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-[#0A84FF]">
                {currentSkillIndex + 1}/{selectedSkills.length}
              </span>
            </button>
          )}
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2">
          {/* Timeline button (only when has scaffolding) */}
          {hasActiveScaffolding && (
            <button
              onClick={onOpenTimeline}
              className="p-2.5 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
              title="Ver ruta de aprendizaje"
            >
              <Map className="w-5 h-5 text-black/60 dark:text-white/60" />
            </button>
          )}

          {/* Tutor button */}
          <button
            onClick={onOpenTutor}
            className="p-2.5 rounded-xl bg-[#0A84FF] hover:bg-[#0A84FF]/90 transition-colors relative"
            title="Abrir tutor AI"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            {tutorHasMessages && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF453A] rounded-full border-2 border-white dark:border-[#121212]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

PracticeHeader.displayName = 'PracticeHeader';
