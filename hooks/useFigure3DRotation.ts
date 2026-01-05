/**
 * Hook for managing interactive 3D rotation state
 */

import { useState, useCallback, useRef } from 'react';

interface RotationState {
  azimuth: number;
  elevation: number;
}

interface UseFigure3DRotationOptions {
  initialAzimuth?: number;
  initialElevation?: number;
  controlledAzimuth?: number;
  controlledElevation?: number;
  onRotationChange?: (azimuth: number, elevation: number) => void;
  interactive?: boolean;
}

interface UseFigure3DRotationReturn {
  rotation: RotationState;
  isDragging: boolean;
  handlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
}

export function useFigure3DRotation({
  initialAzimuth = 45,
  initialElevation = 35,
  controlledAzimuth,
  controlledElevation,
  onRotationChange,
  interactive = false,
}: UseFigure3DRotationOptions = {}): UseFigure3DRotationReturn {
  // Internal state only used when uncontrolled
  const [internalRotation, setInternalRotation] = useState<RotationState>(() => ({
    azimuth: initialAzimuth,
    elevation: initialElevation,
  }));

  // Use controlled or internal rotation
  // When controlled props change, they will be used directly without needing to sync
  const rotation: RotationState = {
    azimuth: controlledAzimuth ?? internalRotation.azimuth,
    elevation: controlledElevation ?? internalRotation.elevation,
  };

  // Drag state (ref for logic, state for cursor)
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!interactive) return;
      isDraggingRef.current = true;
      setIsDragging(true);
      lastPosition.current = { x: e.clientX, y: e.clientY };
    },
    [interactive]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDraggingRef.current || !interactive) return;

      const dx = e.clientX - lastPosition.current.x;
      const dy = e.clientY - lastPosition.current.y;

      const newAzimuth = (rotation.azimuth + dx * 0.5 + 360) % 360;
      const newElevation = Math.max(-89, Math.min(89, rotation.elevation - dy * 0.5));

      setInternalRotation({ azimuth: newAzimuth, elevation: newElevation });
      onRotationChange?.(newAzimuth, newElevation);

      lastPosition.current = { x: e.clientX, y: e.clientY };
    },
    [interactive, rotation.azimuth, rotation.elevation, onRotationChange]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!interactive || e.touches.length !== 1) return;
      isDraggingRef.current = true;
      setIsDragging(true);
      lastPosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    },
    [interactive]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDraggingRef.current || !interactive || e.touches.length !== 1) return;

      const dx = e.touches[0].clientX - lastPosition.current.x;
      const dy = e.touches[0].clientY - lastPosition.current.y;

      const newAzimuth = (rotation.azimuth + dx * 0.5 + 360) % 360;
      const newElevation = Math.max(-89, Math.min(89, rotation.elevation - dy * 0.5));

      setInternalRotation({ azimuth: newAzimuth, elevation: newElevation });
      onRotationChange?.(newAzimuth, newElevation);

      lastPosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    },
    [interactive, rotation.azimuth, rotation.elevation, onRotationChange]
  );

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  return {
    rotation,
    isDragging,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}
