'use client';

import { useState } from 'react';
import Link from 'next/link';
import 'katex/dist/katex.min.css';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { useAdaptivePractice } from '@/hooks/useAdaptivePractice';
import { SkillSelector } from '@/components/practice/SkillSelector';
import { ScaffoldingTimeline } from '@/components/practice/ScaffoldingTimeline';
import { SubsectionSelector } from '@/components/practice/SubsectionSelector';
import { PracticeHeader } from '@/components/practice/PracticeHeader';
import { TutorDrawerContent } from '@/components/practice/TutorDrawerContent';
import { TopicCard, Topic } from '@/components/practice/TopicCard';
import { AnalyzingSkillsLoader } from '@/components/practice/AnalyzingSkillsLoader';
import { AdaptiveProblemCard } from '@/components/practice/AdaptiveProblemCard';
import { Drawer } from '@/components/ui';
import type { Subject } from '@/lib/types/core';

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_TOPICS: Topic[] = [
  { id: 'números', name: 'Números', type: 'subject' },
  { id: 'álgebra', name: 'Álgebra y Funciones', type: 'subject' },
  { id: 'geometría', name: 'Geometría', type: 'subject' },
  { id: 'probabilidad', name: 'Probabilidades y Estadística', type: 'subject' },
  { id: 'surprise', name: 'Sorpréndeme', type: 'subject' },
];

// ============================================================================
// Main Page Component
// ============================================================================

function AdaptivePracticeContent() {
  const practice = useAdaptivePractice();
  const [showSubsectionSelector, setShowSubsectionSelector] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  const handleShowSubsections = (topicId: string) => {
    setSelectedSubject(topicId as Subject);
    setShowSubsectionSelector(true);
  };

  const handleSubsectionSelect = (subsectionCode: string, skills: string[]) => {
    setShowSubsectionSelector(false);
    setSelectedSubject(null);
    practice.startPractice({
      focus: selectedSubject!,
      subsectionCode,
      subsectionSkills: skills,
    });
  };

  const handleCancelSubsectionSelector = () => {
    setShowSubsectionSelector(false);
    setSelectedSubject(null);
  };

  // Loading state
  if (practice.state === 'loading') {
    return (
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black/10 dark:border-white/10 border-t-[#0A84FF] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-black dark:text-white">Cargando problema...</p>
        </div>
      </div>
    );
  }

  // Analyzing skills state
  if (practice.state === 'analyzing-skills') {
    return (
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-black py-8 px-4 flex items-center justify-center">
        <AnalyzingSkillsLoader />
      </div>
    );
  }

  // Skill selection state
  if (practice.state === 'selecting-skills') {
    return (
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-black py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <button
              onClick={practice.changeTopic}
              className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-sm font-semibold"
            >
              ← Volver al inicio
            </button>
          </div>

          <SkillSelector
            skills={practice.decomposedSkills}
            onSelectSkills={practice.startSkillBasedScaffolding}
            onSkip={practice.skipSkillSelection}
            isLoading={practice.isGeneratingScaffolding}
          />
        </div>
      </div>
    );
  }

  // Topic selection
  if (practice.state === 'selecting') {
    // Show subsection selector if active
    if (showSubsectionSelector && selectedSubject) {
      return (
        <div className="min-h-screen bg-[#F7F7F7] dark:bg-black py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <SubsectionSelector
              subject={selectedSubject}
              level="M1"
              onSelectSubsection={handleSubsectionSelect}
              onCancel={handleCancelSubsectionSelector}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#F7F7F7] dark:bg-black py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] inline-block text-sm font-semibold"
            >
              ← Volver al Inicio
            </Link>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-black dark:text-white mb-3">
              Práctica Adaptativa
            </h1>
            <p className="text-black/60 dark:text-white/60">
              Elige un tema y practica con ayuda de un tutor AI
            </p>
          </div>

          {practice.error && (
            <div className="mb-6 p-4 bg-[#FF453A]/10 border border-[#FF453A]/30 rounded-xl text-[#FF453A] text-center">
              {practice.error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEFAULT_TOPICS.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                onSelect={practice.startPractice}
                onShowSubsections={handleShowSubsections}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Practice mode
  const isInSkillBasedMode = practice.scaffoldingMode === 'skill-based';
  const currentSkill =
    isInSkillBasedMode && practice.selectedSkills[practice.currentSkillIndex]
      ? {
          name: practice.selectedSkills[practice.currentSkillIndex].name,
          difficulty: practice.selectedSkills[practice.currentSkillIndex].difficulty,
        }
      : undefined;

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-black">
      {/* Header */}
      <PracticeHeader
        selectedFocus={practice.selectedFocus}
        currentSubsectionCode={practice.currentSubsectionCode}
        onChangeTopic={practice.changeTopic}
        onOpenTutor={() => setIsTutorOpen(true)}
        onOpenTimeline={() => setIsTimelineOpen(true)}
        selectedSkills={practice.selectedSkills}
        currentSkillIndex={practice.currentSkillIndex}
        scaffoldingMode={practice.scaffoldingMode}
        tutorHasMessages={practice.tutorMessages.length > 0}
      />

      {/* Main content - centered */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {practice.currentProblem && (
          <AdaptiveProblemCard
            problem={practice.currentProblem}
            selectedAnswer={practice.selectedAnswer}
            onSelectAnswer={practice.setSelectedAnswer}
            onSubmit={practice.submitAnswer}
            onNext={practice.nextProblem}
            onProceedToScaffolding={practice.proceedToScaffolding}
            feedback={practice.feedback}
            showExplanation={!practice.feedback?.correct}
            isScaffolding={practice.scaffoldingMode !== 'none'}
            scaffoldingDepth={practice.scaffoldingDepth}
            maxScaffoldingDepth={practice.maxScaffoldingDepth}
            isGeneratingScaffolding={practice.isGeneratingScaffolding}
            isDecomposingSkills={practice.isDecomposingSkills}
            currentSkill={currentSkill}
            scaffoldingMode={practice.scaffoldingMode}
          />
        )}
      </main>

      {/* Tutor AI Drawer (right) */}
      <Drawer
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        side="right"
        title="Tutor AI"
        width="md"
      >
        <TutorDrawerContent
          messages={practice.tutorMessages}
          onSendMessage={practice.sendChatMessage}
          isLoading={practice.isTutorLoading}
        />
      </Drawer>

      {/* Timeline Drawer (left) */}
      <Drawer
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
        side="left"
        title="Ruta de aprendizaje"
        width="sm"
      >
        <div className="p-4">
          <ScaffoldingTimeline
            history={practice.scaffoldingHistory}
            currentSkillIndex={practice.currentSkillIndex}
            selectedSkills={practice.selectedSkills}
            onReviewEntry={practice.setReviewingEntry}
          />
        </div>
      </Drawer>
    </div>
  );
}

export default function AdaptivePracticePage() {
  return (
    <ProtectedRoute>
      <AdaptivePracticeContent />
    </ProtectedRoute>
  );
}
