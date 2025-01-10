import React from 'react';

export function ErrorFallback() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center bg-gray-900 rounded-lg">
      <div className="text-white text-center p-8">
        <p>Unable to load 3D Earth visualization.</p>
        <p className="text-sm mt-2 text-gray-400">Please try refreshing the page.</p>
      </div>
    </div>
  );
}