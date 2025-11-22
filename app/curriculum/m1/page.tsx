'use client';

import Curriculum from '@/components/content/Curriculum';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { ModuleAccessGuard } from '@/components/auth/ModuleAccessGuard';

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
