'use client';

import Curriculum from '@/components/Curriculum';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function M1CurriculumContent() {
  return <Curriculum level="M1" />;
}

export default function M1CurriculumPage() {
  return (
    <ProtectedRoute>
      <M1CurriculumContent />
    </ProtectedRoute>
  );
}
