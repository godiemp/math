'use client';

import { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDemoCarousel } from './useDemoCarousel';
import { DemoTabs } from './DemoTabs';
import { DemoPlaceholder } from './DemoPlaceholder';

// Lazy load preview components
const CirclePreview = lazy(() =>
  import('./CirclePreview').then((m) => ({ default: m.CirclePreview }))
);
const CubePreview = lazy(() =>
  import('./CubePreview').then((m) => ({ default: m.CubePreview }))
);
const FractionBarsPreview = lazy(() =>
  import('./FractionBarsPreview').then((m) => ({ default: m.FractionBarsPreview }))
);

export function DemoShowcase() {
  const { activeDemo, setActiveDemo, isPaused, pause, resume, progress } = useDemoCarousel();

  const handleMouseEnter = () => {
    pause();
  };

  const handleMouseLeave = () => {
    // Resume is handled by the idle timeout in the hook
  };

  return (
    <div className="w-full">
      {/* Demo container */}
      <div
        className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={pause}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />

        {/* Demo content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDemo}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Suspense fallback={<DemoPlaceholder />}>
              {activeDemo === 0 && <CirclePreview />}
              {activeDemo === 1 && <CubePreview />}
              {activeDemo === 2 && <FractionBarsPreview />}
            </Suspense>
          </motion.div>
        </AnimatePresence>

        {/* Resume button overlay when paused */}
        {isPaused && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resume}
            className="absolute top-3 right-3 z-20 px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium rounded-full transition-colors"
          >
            Reanudar
          </motion.button>
        )}
      </div>

      {/* Tabs below demo */}
      <div className="mt-4">
        <DemoTabs
          activeDemo={activeDemo}
          onSelectDemo={setActiveDemo}
          progress={progress}
          isPaused={isPaused}
        />
      </div>
    </div>
  );
}

export { DemoTabs } from './DemoTabs';
export { DemoPlaceholder } from './DemoPlaceholder';
export { useDemoCarousel } from './useDemoCarousel';
