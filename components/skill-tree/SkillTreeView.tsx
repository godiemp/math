'use client';

import { SkillNode } from './SkillNode';
import type { SkillNode as SkillNodeType } from '@/hooks/useSkillTree';

interface SkillTreeViewProps {
  skills: SkillNodeType[];
  onNodeClick: (skillId: string) => void;
}

export function SkillTreeView({ skills, onNodeClick }: SkillTreeViewProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      {skills.map((skill, index) => (
        <div key={skill.id} className="flex flex-col items-center">
          {/* Connecting line (not for first node) */}
          {index > 0 && (
            <div className="w-0.5 h-8 bg-black/20 dark:bg-white/20 -mt-4 mb-4" />
          )}

          <SkillNode
            id={skill.id}
            name={skill.name}
            description={skill.description}
            status={skill.status}
            onClick={() => onNodeClick(skill.id)}
          />
        </div>
      ))}
    </div>
  );
}
