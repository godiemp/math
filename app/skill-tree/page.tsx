'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Heading, Text, LoadingScreen } from '@/components/ui';
import { SkillTreeView } from '@/components/skill-tree/SkillTreeView';
import { VerificationChat } from '@/components/skill-tree/VerificationChat';
import { useSkillTree } from '@/hooks/useSkillTree';

function SkillTreeContent() {
  const {
    skills,
    isLoading,
    error,
    fetchSkillTree,
    verification,
    startVerification,
    sendMessage,
    closeVerification,
  } = useSkillTree();

  useEffect(() => {
    fetchSkillTree();
  }, [fetchSkillTree]);

  const handleNodeClick = async (skillId: string) => {
    const skill = skills.find((s) => s.id === skillId);
    if (skill?.status === 'unlocked') {
      await startVerification(skillId);
    }
  };

  const currentSkill = skills.find((s) => s.id === verification.skillId);

  if (isLoading && skills.length === 0) {
    return <LoadingScreen message="Cargando árbol de habilidades..." />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000]">
      {/* Simple Header */}
      <header className="sticky top-0 z-30 backdrop-blur-[20px] bg-white/80 dark:bg-[#121212]/80 border-b border-black/[0.12] dark:border-white/[0.16]">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Heading level={1} className="mb-2">
            Árbol de Habilidades
          </Heading>
          <Text className="text-black/60 dark:text-white/60">
            Demuestra tu conocimiento para desbloquear nuevas habilidades
          </Text>
        </div>

        {error && (
          <div className="text-center text-red-500 mb-4">
            {error}
          </div>
        )}

        <SkillTreeView skills={skills} onNodeClick={handleNodeClick} />
      </main>

      {/* Verification Chat Modal */}
      {verification.skillId && currentSkill && (
        <VerificationChat
          skillName={currentSkill.name}
          messages={verification.messages}
          isLoading={verification.isLoading}
          isVerified={verification.isVerified}
          onSendMessage={sendMessage}
          onClose={closeVerification}
        />
      )}
    </div>
  );
}

export default function SkillTreePage() {
  return (
    <ProtectedRoute>
      <SkillTreeContent />
    </ProtectedRoute>
  );
}
