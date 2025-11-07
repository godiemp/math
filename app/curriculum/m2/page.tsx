'use client';

import Curriculum from '@/components/Curriculum';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function M2CurriculumContent() {
  return <Curriculum level="M2" />;
}

export default function M2CurriculumPage() {
  return (
    <ProtectedRoute>
      <M2CurriculumContent />
    </ProtectedRoute>
  );
}
