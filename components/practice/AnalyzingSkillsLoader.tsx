'use client';

// ============================================================================
// Component
// ============================================================================

export function AnalyzingSkillsLoader() {
  return (
    <div
      data-testid="analyzing-skills-loader"
      className="bg-white dark:bg-[#1C1C1C] rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center border border-black/[0.08] dark:border-white/[0.08]"
    >
      <div className="w-16 h-16 mx-auto mb-4 relative">
        <div className="absolute inset-0 border-4 border-[#0A84FF]/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-[#0A84FF] rounded-full border-t-transparent animate-spin" />
      </div>
      <h2 className="text-xl font-bold text-black dark:text-white mb-2">
        Analizando tu respuesta
      </h2>
      <p className="text-black/60 dark:text-white/60">
        Identificando las habilidades que necesitas practicar...
      </p>
    </div>
  );
}

AnalyzingSkillsLoader.displayName = 'AnalyzingSkillsLoader';
