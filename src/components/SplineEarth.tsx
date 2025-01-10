import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';
import { ErrorBoundary } from './ErrorBoundary';

const LoadingFallback = () => (
  <div className="w-full h-[400px] flex items-center justify-center bg-gray-900 rounded-lg">
    <div className="text-white text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
      <p>Loading 3D Earth...</p>
    </div>
  </div>
);

const ErrorFallback = () => (
  <div className="w-full h-[400px] flex items-center justify-center bg-gray-900 rounded-lg">
    <div className="text-white text-center p-8">
      <p>Unable to load 3D Earth visualization.</p>
      <p className="text-sm mt-2 text-gray-400">Please try refreshing the page.</p>
    </div>
  </div>
);

export function SplineEarth() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
        <Suspense fallback={<LoadingFallback />}>
          <Spline 
            scene="https://prod.spline.design/planetearth-8203609d9ced8ce6e2bb0bea952aa76e/scene.splinecode"
            className="w-full h-full"
            onError={(error) => {
              console.error('Spline loading error:', error);
            }}
          />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}