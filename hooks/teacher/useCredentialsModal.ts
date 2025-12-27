'use client';

import { useState, useCallback, useMemo } from 'react';

export interface Credentials {
  displayName: string;
  username: string;
  password: string;
}

export interface UseCredentialsModalReturn {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Current credentials being displayed */
  credentials: Credentials | null;
  /** Which field was recently copied */
  copiedField: string | null;
  /** Show the modal with credentials */
  show: (credentials: Credentials) => void;
  /** Close the modal */
  close: () => void;
  /** Copy text to clipboard and show feedback */
  copyToClipboard: (text: string, field: string) => Promise<void>;
}

export function useCredentialsModal(): UseCredentialsModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const show = useCallback((newCredentials: Credentials) => {
    setCredentials(newCredentials);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setCredentials(null);
    setCopiedField(null);
  }, []);

  const copyToClipboard = useCallback(async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  }, []);

  return useMemo(
    () => ({
      isOpen,
      credentials,
      copiedField,
      show,
      close,
      copyToClipboard,
    }),
    [isOpen, credentials, copiedField, show, close, copyToClipboard]
  );
}
