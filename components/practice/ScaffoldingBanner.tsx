'use client';

// ============================================================================
// Types
// ============================================================================

export interface ScaffoldingBannerProps {
  depth: number;
  maxDepth: number;
  currentSkill?: { name: string; difficulty: string };
}

// ============================================================================
// Component
// ============================================================================

export function ScaffoldingBanner({
  depth,
  maxDepth,
  currentSkill,
}: ScaffoldingBannerProps) {
  return (
    <div className="mb-4 p-3 bg-[#FF9F0A]/10 rounded-xl border border-[#FF9F0A]/20">
      <div className="flex items-center gap-2">
        <span className="text-xl">💡</span>
        <span className="text-[#FF9F0A] font-medium">
          {currentSkill
            ? `Practicando: ${currentSkill.name}`
            : `Pregunta de refuerzo ${depth > 1 ? `(nivel ${depth} de ${maxDepth})` : ''}`}
        </span>
      </div>
      <p className="text-black/60 dark:text-white/60 text-sm mt-1">
        {currentSkill
          ? `Habilidad ${currentSkill.difficulty}`
          : depth === 1
            ? 'Esta pregunta te ayudará a consolidar conceptos base.'
            : depth === 2
              ? 'Vamos a un concepto más fundamental.'
              : 'Practiquemos lo más básico primero.'}
      </p>
    </div>
  );
}

ScaffoldingBanner.displayName = 'ScaffoldingBanner';
