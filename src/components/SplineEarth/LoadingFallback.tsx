import React from 'react';

export function LoadingFallback() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center bg-gray-900 rounded-lg">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading 3D Earth...</p>
      </div>
    </div>
  );
}