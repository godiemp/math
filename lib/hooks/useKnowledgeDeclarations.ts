/**
 * Custom hook for knowledge declarations with SWR caching
 */

import useSWR from 'swr';
import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { apiRequest } from '../api-client';
import { useAuth } from '@/contexts/AuthContext';
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
    // Always throw errors so SWR can set error state
    // shouldRetryOnError: false prevents retries, so 401 errors won't retry infinitely
    throw new Error(response.error.error);
  }

  return response.data!;
}

/**
 * Determine level from item code
 */
function getLevelFromItemCode(itemCode: string): Level {
  return itemCode.startsWith('M2') ? 'M2' : 'M1';
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
      keepPreviousData: false, // Don't keep previous data to avoid mixing M1/M2 during transition
      shouldRetryOnError: false, // Don't retry on errors
      errorRetryCount: 0, // No retries
    }
  );

  // State for tracking update errors
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Refs for debouncing - these persist across renders
  const pendingUpdatesRef = useRef<UpdateKnowledgeDeclarationRequest[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dataRef = useRef(data);
  const mutateRef = useRef(mutate);
  const levelRef = useRef(level); // Track current level for optimistic updates
  const authFailedRef = useRef(false); // Track if auth has failed to prevent repeated attempts

  // Keep refs updated
  useEffect(() => {
    dataRef.current = data;
    mutateRef.current = mutate;
    levelRef.current = level;
  }, [data, mutate, level]);

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
    // Don't attempt if auth already failed
    if (authFailedRef.current) {
      pendingUpdatesRef.current = [];
      return;
    }

    const updates = pendingUpdatesRef.current;
    if (updates.length === 0) return;

    const response = await apiRequest<UpdateKnowledgeDeclarationsResponse>(
      '/api/user/knowledge-declarations',
      {
        method: 'PUT',
        body: JSON.stringify({ declarations: updates }),
      }
    );

    if (response.error) {
      // Don't revert on auth error - just log and stop future attempts
      if (response.error.statusCode === 401) {
        authFailedRef.current = true;
        console.warn('Knowledge declarations: cannot save, session expired. Stopping further attempts.');
        return;
      }
      // Track the error and revert UI to server state
      setUpdateError(response.error.error || 'Failed to save changes');
      mutateRef.current();
      console.error('Failed to save knowledge declarations:', response.error.error);
      return;
    }

    // Only clear pending updates after confirming the request succeeded
    pendingUpdatesRef.current = [];

    // Clear any previous update errors on successful save
    setUpdateError(null);

    if (response.data) {
      // Backend returns ALL declarations (M1+M2 combined), but our cache is level-specific
      // Filter the response to only include declarations for the current level
      const currentLevel = levelRef.current;
      const filteredDeclarations = currentLevel
        ? response.data.declarations.filter((d) => d.level === currentLevel)
        : response.data.declarations;

      // Recalculate summary for filtered declarations
      // Don't use backend's totals - they're combined M1+M2. Preserve existing totals from cache.
      const filteredSummary = currentLevel
        ? {
            // Preserve totals from current cache (came from level-filtered GET request)
            totalUnits: dataRef.current?.summary.totalUnits ?? 0,
            totalSubsections: dataRef.current?.summary.totalSubsections ?? 0,
            totalSkills: dataRef.current?.summary.totalSkills ?? 0,
            // Recalculate known counts from filtered declarations
            knownUnits: filteredDeclarations.filter((d) => d.declarationType === 'unit' && d.knows).length,
            knownSubsections: filteredDeclarations.filter((d) => d.declarationType === 'subsection' && d.knows).length,
            knownSkills: filteredDeclarations.filter((d) => d.declarationType === 'skill' && d.knows).length,
          }
        : response.data.summary;

      mutateRef.current({
        declarations: filteredDeclarations,
        summary: filteredSummary,
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

        // When cascade is true, don't recalculate summary optimistically
        // because cascaded subsections/skills haven't been added to declarations yet.
        // The summary will be correct when the backend response arrives with cascaded items.
        // If cascade is false, recalculate summary immediately for accurate stats.
        let newSummary = currentData.summary;
        if (!cascade) {
          // Filter by current level when calculating summary to avoid mixing M1/M2 counts
          const currentLevel = levelRef.current;
          const levelFiltered = currentLevel
            ? newDeclarations.filter((d) => getLevelFromItemCode(d.itemCode) === currentLevel)
            : newDeclarations;

          newSummary = {
            ...currentData.summary,
            knownUnits: levelFiltered.filter((d) => d.declarationType === 'unit' && d.knows).length,
            knownSubsections: levelFiltered.filter((d) => d.declarationType === 'subsection' && d.knows).length,
            knownSkills: levelFiltered.filter((d) => d.declarationType === 'skill' && d.knows).length,
          };
        }

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
    updateError,
    isKnown,
    toggleKnowledge,
    setKnowledge,
    refresh: mutate,
  };
}
