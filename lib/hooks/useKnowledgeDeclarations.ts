/**
 * Custom hook for knowledge declarations with SWR caching
 */

import useSWR from 'swr';
import { useCallback, useMemo } from 'react';
import { apiRequest } from '../api-client';
import type {
  Level,
  GetKnowledgeDeclarationsResponse,
  UpdateKnowledgeDeclarationRequest,
  UpdateKnowledgeDeclarationsResponse,
  KnowledgeDeclaration,
} from '../types';

// Debounce utility
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timeoutId: NodeJS.Timeout | null = null;
  return ((...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  }) as T;
}

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
  const cacheKey = level
    ? `/api/user/knowledge-declarations?level=${level}`
    : '/api/user/knowledge-declarations';

  const { data, error, isLoading, mutate } = useSWR<GetKnowledgeDeclarationsResponse>(
    cacheKey,
    () => fetchDeclarations(level),
    {
      dedupingInterval: 30000,
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  // Create a map for quick lookup
  const declarationMap = useMemo(() => {
    const map = new Map<string, boolean>();
    if (data?.declarations) {
      for (const decl of data.declarations) {
        // Key format: "type:itemCode" e.g., "unit:M1-NUM-001"
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

  // Update declarations
  const updateDeclarations = useCallback(
    async (declarations: UpdateKnowledgeDeclarationRequest[]) => {
      // Optimistic update
      if (data) {
        const newDeclarations = [...data.declarations];

        for (const update of declarations) {
          const existingIndex = newDeclarations.findIndex(
            (d) => d.declarationType === update.type && d.itemCode === update.itemCode
          );

          const now = Date.now();
          if (existingIndex >= 0) {
            newDeclarations[existingIndex] = {
              ...newDeclarations[existingIndex],
              knows: update.knows,
              updatedAt: now,
            };
          } else {
            // Add new declaration
            newDeclarations.push({
              userId: '',
              level: update.itemCode.startsWith('M2') ? 'M2' : 'M1',
              declarationType: update.type,
              itemCode: update.itemCode,
              knows: update.knows,
              declaredAt: now,
              updatedAt: now,
            });
          }
        }

        // Calculate new summary (simplified - real calculation is on backend)
        const newSummary = {
          ...data.summary,
          knownUnits: newDeclarations.filter((d) => d.declarationType === 'unit' && d.knows).length,
          knownSubsections: newDeclarations.filter((d) => d.declarationType === 'subsection' && d.knows).length,
          knownSkills: newDeclarations.filter((d) => d.declarationType === 'skill' && d.knows).length,
        };

        mutate({ declarations: newDeclarations, summary: newSummary }, false);
      }

      // Make API call
      const response = await apiRequest<UpdateKnowledgeDeclarationsResponse>(
        '/api/user/knowledge-declarations',
        {
          method: 'PUT',
          body: JSON.stringify({ declarations }),
        }
      );

      if (response.error) {
        // Revert optimistic update on error
        mutate();
        throw new Error(response.error.error);
      }

      // Update with actual server response
      if (response.data) {
        mutate({
          declarations: response.data.declarations,
          summary: response.data.summary,
        });
      }

      return response.data;
    },
    [data, mutate]
  );

  // Debounced version for rapid checkbox changes
  const debouncedUpdate = useMemo(
    () => debounce(updateDeclarations, 500),
    [updateDeclarations]
  );

  // Toggle a single item
  const toggleKnowledge = useCallback(
    (type: 'unit' | 'subsection' | 'skill', itemCode: string, cascade = false) => {
      const currentlyKnown = isKnown(type, itemCode);
      return debouncedUpdate([
        {
          type,
          itemCode,
          knows: !currentlyKnown,
          cascade,
        },
      ]);
    },
    [isKnown, debouncedUpdate]
  );

  // Set knowledge state for an item
  const setKnowledge = useCallback(
    (type: 'unit' | 'subsection' | 'skill', itemCode: string, knows: boolean, cascade = false) => {
      return debouncedUpdate([
        {
          type,
          itemCode,
          knows,
          cascade,
        },
      ]);
    },
    [debouncedUpdate]
  );

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
    isLoading,
    error,
    isKnown,
    toggleKnowledge,
    setKnowledge,
    updateDeclarations,
    refresh: mutate,
  };
}
