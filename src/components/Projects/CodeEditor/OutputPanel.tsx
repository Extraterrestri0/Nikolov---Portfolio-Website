import React from 'react';
import { Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

interface OutputPanelProps {
  output: string;
  error: string | null;
}

export function OutputPanel({ output, error }: OutputPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 p-4 rounded-b-lg"
    >
      <div className="flex items-center gap-2 mb-2 text-gray-400 border-b border-gray-800 pb-2">
        <Terminal className="w-4 h-4" />
        <span className="text-sm">Output</span>
      </div>
      
      <div className="font-mono text-sm">
        {error ? (
          <span className="text-red-400">{error}</span>
        ) : output ? (
          <span className="text-green-400">{output}</span>
        ) : (
          <span className="text-gray-500">No output to display</span>
        )}
      </div>
    </motion.div>
  );
}