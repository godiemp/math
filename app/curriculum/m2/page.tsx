'use client';

import Curriculum from '@/components/Curriculum';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ModuleAccessGuard } from '@/components/ModuleAccessGuard';

function M2CurriculumContent() {
  return <Curriculum level="M2" />;
}

export default function M2CurriculumPage() {
  return (
    <ProtectedRoute>
      <ModuleAccessGuard moduleName="Temario M2">
        <M2CurriculumContent />
      </ModuleAccessGuard>
    </ProtectedRoute>
  );
}
