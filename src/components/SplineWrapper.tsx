import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';
import { ErrorBoundary } from './ErrorBoundary';

interface SplineWrapperProps {
  scene: string;
  className?: string;
}

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-gray-900 dark:text-white text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current mx-auto mb-4"></div>
      <p>Loading 3D Scene...</p>
    </div>
  </div>
);

const ErrorFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-gray-900 dark:text-white text-center">
      <p>Unable to load 3D scene</p>
      <p className="text-sm mt-2 opacity-75">Please try refreshing the page</p>
    </div>
  </div>
);

export function SplineWrapper({ scene, className = "" }: SplineWrapperProps) {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div className={`relative ${className}`}>
        <Suspense fallback={<LoadingFallback />}>
          <Spline
            scene={scene}
            onError={(e) => {
              console.error('Spline loading error:', e);
            }}
          />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}