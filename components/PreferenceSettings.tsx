'use client';

import { useState } from 'react';
import { Button, Heading, Text } from '@/components/ui';
import { api } from '@/lib/api-client';
import { User } from '@/lib/types/core';

interface PreferenceSettingsProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onClose: () => void;
}

export function PreferenceSettings({ user, onUpdate, onClose }: PreferenceSettingsProps) {
  const [selectedPreference, setSelectedPreference] = useState<'M1' | 'M2' | 'both'>(
    user.preferredSubject || 'both'
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.patch('/api/onboarding/progress', {
        preferredSubject: selectedPreference,
      });

      // Update local user state
      onUpdate({
        ...user,
        preferredSubject: selectedPreference,
      });

      onClose();
    } catch (error) {
      console.error('Failed to update preference:', error);
      alert('Error al guardar preferencia. Por favor intenta de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] max-w-lg w-full p-8">
        {/* Header */}
        <div className="mb-6">
          <Heading level={2} size="lg" className="mb-2">
            Tu Objetivo de Estudio
          </Heading>
          <Text size="sm" variant="secondary">
            Selecciona qué competencia(s) quieres preparar. Esto nos ayuda a personalizar tu experiencia.
          </Text>
        </div>

        {/* Preference Options */}
        <div className="space-y-3 mb-8">
          <button
            onClick={() => setSelectedPreference('M1')}
            className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
              selectedPreference === 'M1'
                ? 'border-[#0A84FF] bg-[#0A84FF]/10 dark:bg-[#0A84FF]/20'
                : 'border-black/10 dark:border-white/10 hover:border-[#0A84FF]/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">📐</div>
              <div className="flex-1">
                <Heading level={3} size="xs" className="mb-1">
                  Competencia M1
                </Heading>
                <Text size="sm" variant="secondary">
                  Matemática básica: números, álgebra, geometría y probabilidades
                </Text>
              </div>
              {selectedPreference === 'M1' && (
                <div className="text-2xl text-[#0A84FF]">✓</div>
              )}
            </div>
          </button>

          <button
            onClick={() => setSelectedPreference('M2')}
            className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
              selectedPreference === 'M2'
                ? 'border-[#0A84FF] bg-[#0A84FF]/10 dark:bg-[#0A84FF]/20'
                : 'border-black/10 dark:border-white/10 hover:border-[#0A84FF]/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">🎓</div>
              <div className="flex-1">
                <Heading level={3} size="xs" className="mb-1">
                  Competencia M2
                </Heading>
                <Text size="sm" variant="secondary">
                  Matemática avanzada para carreras científicas y de ingeniería
                </Text>
              </div>
              {selectedPreference === 'M2' && (
                <div className="text-2xl text-[#0A84FF]">✓</div>
              )}
            </div>
          </button>

          <button
            onClick={() => setSelectedPreference('both')}
            className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
              selectedPreference === 'both'
                ? 'border-[#0A84FF] bg-[#0A84FF]/10 dark:bg-[#0A84FF]/20'
                : 'border-black/10 dark:border-white/10 hover:border-[#0A84FF]/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">🚀</div>
              <div className="flex-1">
                <Heading level={3} size="xs" className="mb-1">
                  Ambas Competencias
                </Heading>
                <Text size="sm" variant="secondary">
                  Preparación completa para M1 y M2
                </Text>
              </div>
              {selectedPreference === 'both' && (
                <div className="text-2xl text-[#0A84FF]">✓</div>
              )}
            </div>
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1" disabled={isSaving}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="flex-1"
            disabled={isSaving}
          >
            {isSaving ? 'Guardando...' : 'Guardar Preferencia'}
          </Button>
        </div>
      </div>
    </div>
  );
}
