'use client';

import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { SkillTree } from '@/components/curriculum/SkillTree';
import { Heading, Text } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/Card';

function SkillTreeContent() {
  const { user, isAdmin } = useAuth();

  // Only show to admins for now (soft launch)
  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card padding="lg" className="text-center">
          <Heading level={2} className="mb-4">Función en desarrollo</Heading>
          <Text className="text-white/70">
            Esta función estará disponible próximamente para todos los usuarios.
          </Text>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <Heading level={1} className="mb-3">Árbol de Habilidades M1</Heading>
        <Text className="text-white/70 text-lg">
          Lleva un registro de los temas que ya dominas en el currículum de Matemática M1
        </Text>
      </div>

      <SkillTree />
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
