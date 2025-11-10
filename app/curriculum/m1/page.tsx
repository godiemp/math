'use client';

import Curriculum from '@/components/Curriculum';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ModuleAccessGuard } from '@/components/ModuleAccessGuard';

function M1CurriculumContent() {
  return <Curriculum level="M1" />;
}

export default function M1CurriculumPage() {
  return (
    <ProtectedRoute>
      <ModuleAccessGuard moduleName="Temario M1">
        <M1CurriculumContent />
      </ModuleAccessGuard>
    </ProtectedRoute>
  );
}
