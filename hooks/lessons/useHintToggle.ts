'use client';

import { useState, useCallback, useMemo } from 'react';

export interface UseHintToggleReturn {
  showHint: boolean;
  toggleHint: () => void;
  hideHint: () => void;
}

export function useHintToggle(): UseHintToggleReturn {
  const [showHint, setShowHint] = useState(false);

  const toggleHint = useCallback(() => {
    setShowHint((prev) => !prev);
  }, []);

  const hideHint = useCallback(() => {
    setShowHint(false);
  }, []);

  return useMemo(
    () => ({
      showHint,
      toggleHint,
      hideHint,
    }),
    [showHint, toggleHint, hideHint]
  );
}
