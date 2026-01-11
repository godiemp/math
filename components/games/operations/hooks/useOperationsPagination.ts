'use client';

import { useMemo, useCallback } from 'react';

export interface PaginationItem {
  type: 'page' | 'ellipsis';
  value?: number;
}

export interface UseOperationsPaginationResult {
  // Derived values
  totalPages: number;
  startIndex: number;
  endIndex: number;
  visibleItems: number[];
  paginationItems: PaginationItem[];
  canGoNext: boolean;
  canGoPrevious: boolean;
  // Actions
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToPage: (page: number) => void;
  goToItemIndex: (itemIndex: number) => void;
}

interface UseOperationsPaginationOptions {
  totalItems: number;
  itemsPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

/**
 * Hook for handling pagination logic with ellipsis support
 */
export function useOperationsPagination({
  totalItems,
  itemsPerPage = 12,
  currentPage,
  onPageChange,
  maxVisiblePages = 5,
}: UseOperationsPaginationOptions): UseOperationsPaginationResult {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Generate array of visible item indices for the current page
  const visibleItems = useMemo(() => {
    const items: number[] = [];
    for (let i = startIndex; i < endIndex; i++) {
      items.push(i);
    }
    return items;
  }, [startIndex, endIndex]);

  // Generate pagination items with ellipsis for large page counts
  const paginationItems = useMemo<PaginationItem[]>(() => {
    const items: PaginationItem[] = [];

    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages if there aren't too many
      for (let i = 0; i < totalPages; i++) {
        items.push({ type: 'page', value: i });
      }
    } else {
      // Always show first page
      items.push({ type: 'page', value: 0 });

      // Determine range around current page
      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages - 2, currentPage + 1);

      // Adjust range if near start or end
      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 3) {
        startPage = totalPages - 4;
      }

      // Add ellipsis before middle section if needed
      if (startPage > 1) {
        items.push({ type: 'ellipsis' });
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        items.push({ type: 'page', value: i });
      }

      // Add ellipsis after middle section if needed
      if (endPage < totalPages - 2) {
        items.push({ type: 'ellipsis' });
      }

      // Always show last page
      items.push({ type: 'page', value: totalPages - 1 });
    }

    return items;
  }, [totalPages, currentPage, maxVisiblePages]);

  const canGoNext = currentPage < totalPages - 1;
  const canGoPrevious = currentPage > 0;

  const goToNextPage = useCallback(() => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  }, [canGoNext, currentPage, onPageChange]);

  const goToPreviousPage = useCallback(() => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  }, [canGoPrevious, currentPage, onPageChange]);

  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  }, [totalPages, onPageChange]);

  const goToItemIndex = useCallback((itemIndex: number) => {
    if (itemIndex >= 0 && itemIndex < totalItems) {
      onPageChange(Math.floor(itemIndex / itemsPerPage));
    }
  }, [totalItems, itemsPerPage, onPageChange]);

  return {
    totalPages,
    startIndex,
    endIndex,
    visibleItems,
    paginationItems,
    canGoNext,
    canGoPrevious,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    goToItemIndex,
  };
}
