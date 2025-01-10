import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplineWrapper } from './SplineWrapper';

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0">
            <SplineWrapper 
              scene="https://prod.spline.design/oHoPPksHEgTtK14Q/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}