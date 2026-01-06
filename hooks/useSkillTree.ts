'use client';

import { useState, useCallback } from 'react';
import { apiRequest } from '@/lib/api-client';

export type SkillStatus = 'locked' | 'unlocked' | 'verified';

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  status: SkillStatus;
  prerequisiteIds: string[];
}

interface VerificationState {
  sessionId: string | null;
  skillId: string | null;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  isLoading: boolean;
  isVerified: boolean;
}

interface SkillTreeResponse {
  skills: SkillNode[];
}

interface StartVerificationResponse {
  sessionId: string;
  initialMessage: string;
}

interface ContinueVerificationResponse {
  message: string;
  isVerified: boolean;
}

export function useSkillTree() {
  const [skills, setSkills] = useState<SkillNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [verification, setVerification] = useState<VerificationState>({
    sessionId: null,
    skillId: null,
    messages: [],
    isLoading: false,
    isVerified: false,
  });

  const fetchSkillTree = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiRequest<SkillTreeResponse>('/api/skill-tree');
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch skill tree');
      }
      setSkills(response.data.skills);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading skills');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startVerification = useCallback(
    async (skillId: string) => {
      setVerification({
        sessionId: null,
        skillId,
        messages: [],
        isLoading: true,
        isVerified: false,
      });

      try {
        const response = await apiRequest<StartVerificationResponse>(
          '/api/skill-tree/start',
          {
            method: 'POST',
            body: JSON.stringify({ skillId }),
          }
        );

        if (!response.success) {
          throw new Error(response.error?.message || 'Failed to start verification');
        }

        setVerification({
          sessionId: response.data.sessionId,
          skillId,
          messages: [{ role: 'assistant', content: response.data.initialMessage }],
          isLoading: false,
          isVerified: false,
        });
      } catch (err) {
        setVerification((prev) => ({
          ...prev,
          isLoading: false,
        }));
        throw err;
      }
    },
    []
  );

  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!verification.sessionId) return;

      setVerification((prev) => ({
        ...prev,
        messages: [...prev.messages, { role: 'user', content: userMessage }],
        isLoading: true,
      }));

      try {
        const response = await apiRequest<ContinueVerificationResponse>(
          '/api/skill-tree/continue',
          {
            method: 'POST',
            body: JSON.stringify({
              sessionId: verification.sessionId,
              userMessage,
            }),
          }
        );

        if (!response.success) {
          throw new Error(response.error?.message || 'Failed to continue verification');
        }

        setVerification((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            { role: 'assistant', content: response.data.message },
          ],
          isLoading: false,
          isVerified: response.data.isVerified,
        }));

        // If verified, refresh the skill tree
        if (response.data.isVerified) {
          await fetchSkillTree();
        }
      } catch (err) {
        setVerification((prev) => ({
          ...prev,
          isLoading: false,
        }));
        throw err;
      }
    },
    [verification.sessionId, fetchSkillTree]
  );

  const closeVerification = useCallback(() => {
    setVerification({
      sessionId: null,
      skillId: null,
      messages: [],
      isLoading: false,
      isVerified: false,
    });
  }, []);

  return {
    skills,
    isLoading,
    error,
    fetchSkillTree,
    verification,
    startVerification,
    sendMessage,
    closeVerification,
  };
}
