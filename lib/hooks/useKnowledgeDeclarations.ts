/**
 * Custom hook for knowledge declarations with SWR caching
 */

import useSWR from 'swr';
import { useCallback, useMemo, useRef, useEffect } from 'react';
import { apiRequest } from '../api-client';
import { useAuth } from '../auth';
import type {
  Level,
  GetKnowledgeDeclarationsResponse,
  UpdateKnowledgeDeclarationRequest,
  UpdateKnowledgeDeclarationsResponse,
} from '../types';

/**
 * Fetcher for knowledge declarations
 */
async function fetchDeclarations(level?: Level): Promise<GetKnowledgeDeclarationsResponse> {
  const endpoint = level
    ? `/api/user/knowledge-declarations?level=${level}`
    : '/api/user/knowledge-declarations';

  const response = await apiRequest<GetKnowledgeDeclarationsResponse>(endpoint);

  if (response.error) {
    throw new Error(response.error.error);
  }

  return response.data!;
}

/**
 * Hook to fetch and manage knowledge declarations
 */
export function useKnowledgeDeclarations(level?: Level) {
  const { user, isLoading: authLoading } = useAuth();

  // Only fetch if user is authenticated
  const cacheKey = user
    ? level
      ? `/api/user/knowledge-declarations?level=${level}`
      : '/api/user/knowledge-declarations'
    : null; // null key = don't fetch

  const { data, error, isLoading, mutate } = useSWR<GetKnowledgeDeclarationsResponse>(
    cacheKey,
    () => fetchDeclarations(level),
    {
      dedupingInterval: 30000,
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  // Refs for debouncing - these persist across renders
  const pendingUpdatesRef = useRef<UpdateKnowledgeDeclarationRequest[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dataRef = useRef(data);
  const mutateRef = useRef(mutate);

  // Keep refs updated
  useEffect(() => {
    dataRef.current = data;
    mutateRef.current = mutate;
  }, [data, mutate]);

  // Create a map for quick lookup
  const declarationMap = useMemo(() => {
    const map = new Map<string, boolean>();
    if (data?.declarations) {
      for (const decl of data.declarations) {
        map.set(`${decl.declarationType}:${decl.itemCode}`, decl.knows);
      }
    }
    return map;
  }, [data?.declarations]);

  // Check if an item is known
  const isKnown = useCallback(
    (type: 'unit' | 'subsection' | 'skill', itemCode: string): boolean => {
      return declarationMap.get(`${type}:${itemCode}`) ?? false;
    },
    [declarationMap]
  );

  // Flush pending updates to API
  const flushUpdates = useCallback(async () => {
    const updates = pendingUpdatesRef.current;
    if (updates.length === 0) return;

    pendingUpdatesRef.current = [];

    const response = await apiRequest<UpdateKnowledgeDeclarationsResponse>(
      '/api/user/knowledge-declarations',
      {
        method: 'PUT',
        body: JSON.stringify({ declarations: updates }),
      }
    );

    if (response.error) {
      mutateRef.current();
      console.error('Failed to save knowledge declarations:', response.error.error);
      return;
    }

    if (response.data) {
      mutateRef.current({
        declarations: response.data.declarations,
        summary: response.data.summary,
      });
    }
  }, []);

  // Set knowledge state for an item (debounced)
  const setKnowledge = useCallback(
    (type: 'unit' | 'subsection' | 'skill', itemCode: string, knows: boolean, cascade = false) => {
      // Add to pending updates (replace if same item already pending)
      const existingIdx = pendingUpdatesRef.current.findIndex(
        (u) => u.type === type && u.itemCode === itemCode
      );
      const update = { type, itemCode, knows, cascade };

      if (existingIdx >= 0) {
        pendingUpdatesRef.current[existingIdx] = update;
      } else {
        pendingUpdatesRef.current.push(update);
      }

      // Optimistic update for immediate UI feedback
      const currentData = dataRef.current;
      if (currentData) {
        const newDeclarations = [...currentData.declarations];
        const declIdx = newDeclarations.findIndex(
          (d) => d.declarationType === type && d.itemCode === itemCode
        );

        const now = Date.now();
        if (declIdx >= 0) {
          newDeclarations[declIdx] = { ...newDeclarations[declIdx], knows, updatedAt: now };
        } else {
          newDeclarations.push({
            userId: '',
            level: itemCode.startsWith('M2') ? 'M2' : 'M1',
            declarationType: type,
            itemCode,
            knows,
            declaredAt: now,
            updatedAt: now,
          });
        }

        const newSummary = {
          ...currentData.summary,
          knownUnits: newDeclarations.filter((d) => d.declarationType === 'unit' && d.knows).length,
          knownSubsections: newDeclarations.filter((d) => d.declarationType === 'subsection' && d.knows).length,
          knownSkills: newDeclarations.filter((d) => d.declarationType === 'skill' && d.knows).length,
        };

        mutateRef.current({ declarations: newDeclarations, summary: newSummary }, false);
      }

      // Debounce the API call
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(flushUpdates, 800);
    },
    [flushUpdates]
  );

  // Toggle a single item
  const toggleKnowledge = useCallback(
    (type: 'unit' | 'subsection' | 'skill', itemCode: string, cascade = false) => {
      const currentlyKnown = isKnown(type, itemCode);
      setKnowledge(type, itemCode, !currentlyKnown, cascade);
    },
    [isKnown, setKnowledge]
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        flushUpdates();
      }
    };
  }, [flushUpdates]);

  return {
    declarations: data?.declarations || [],
    summary: data?.summary || {
      totalUnits: 0,
      knownUnits: 0,
      totalSubsections: 0,
      knownSubsections: 0,
      totalSkills: 0,
      knownSkills: 0,
    },
    isLoading: isLoading || authLoading,
    error,
    isKnown,
    toggleKnowledge,
    setKnowledge,
    refresh: mutate,
  };
}
