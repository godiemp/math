import { useState, useCallback, FormEvent } from 'react';

/**
 * Hook for managing chat input state
 * Handles input value, submission, and clearing
 */
export function useChatInput(onSend: (message: string) => void, isDisabled: boolean = false) {
  const [input, setInput] = useState('');

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isDisabled) {
      onSend(input.trim());
      setInput('');
    }
  }, [input, isDisabled, onSend]);

  const clear = useCallback(() => {
    setInput('');
  }, []);

  return {
    input,
    setInput,
    handleSubmit,
    clear,
    canSubmit: input.trim() !== '' && !isDisabled,
  };
}
