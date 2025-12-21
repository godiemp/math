'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Dynamically import the 3D scene with SSR disabled
const CubeScene3D = dynamic(
  () => import('@/components/lessons/m1/productos-notables-cubos/CubeScene3D'),
  {
    ssr: false,
    loading: () => <CubePlaceholder />,
  }
);

function CubePlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl">
      <div className="flex flex-col items-center gap-2 text-white">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-xs text-gray-400">Cargando 3D...</span>
      </div>
    </div>
  );
}

const EXPLODE_INTERVAL = 4000; // Toggle explode every 4 seconds

export function CubePreview() {
  const [isExploded, setIsExploded] = useState(false);

  // Auto-toggle explode state
  useEffect(() => {
    const interval = setInterval(() => {
      setIsExploded((prev) => !prev);
    }, EXPLODE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Title overlay */}
      <div className="absolute top-3 left-3 z-10">
        <span className="px-2 py-1 bg-purple-600/90 text-white text-xs font-semibold rounded">
          (a+b)³
        </span>
      </div>

      {/* 3D Scene */}
      <CubeScene3D
        selectedPart={null}
        onPartClick={() => {}} // No-op for preview
        isExploded={isExploded}
      />

      {/* Legend */}
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { label: 'a³', color: '#3b82f6' },
            { label: '3a²b', color: '#14b8a6' },
            { label: '3ab²', color: '#a855f7' },
            { label: 'b³', color: '#ec4899' },
          ].map((part) => (
            <div
              key={part.label}
              className="flex items-center gap-1 px-2 py-0.5 bg-black/50 rounded text-xs"
            >
              <div
                className="w-2 h-2 rounded-sm"
                style={{ backgroundColor: part.color }}
              />
              <span className="text-white font-mono text-[10px]">{part.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
