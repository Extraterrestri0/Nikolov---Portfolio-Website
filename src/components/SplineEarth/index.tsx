import React, { Suspense, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { ErrorBoundary } from '../ErrorBoundary';
import { LoadingFallback } from './LoadingFallback';
import { ErrorFallback } from './ErrorFallback';

export function SplineEarth() {
  const [retryKey, setRetryKey] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hasError) {
      const timer = setTimeout(() => {
        setHasError(false);
        setRetryKey(prev => prev + 1);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasError]);

  const handleError = () => {
    console.error('Spline loading error');
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
        <Suspense fallback={<LoadingFallback />}>
          {!hasError && (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              {isLoading && <LoadingFallback />}
              <Spline 
                key={retryKey}
                scene="https://prod.spline.design/planetearth-8203609d9ced8ce6e2bb0bea952aa76e/scene.splinecode"
                onLoad={handleLoad}
                onError={handleError}
                style={{
                  width: '100%',
                  height: '100%',
                  visibility: isLoading ? 'hidden' : 'visible'
                }}
              />
            </div>
          )}
          {hasError && <ErrorFallback />}
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}