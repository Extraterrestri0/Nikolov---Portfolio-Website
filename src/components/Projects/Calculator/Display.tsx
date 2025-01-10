import React from 'react';
import { motion } from 'framer-motion';

interface DisplayProps {
  value: string;
  expression: string;
}

export function Display({ value, expression }: DisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 mb-4"
    >
      <div className="text-right">
        <div className="text-gray-600 dark:text-gray-400 text-sm h-6 overflow-hidden">
          {expression}
        </div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white overflow-x-auto">
          {value}
        </div>
      </div>
    </motion.div>
  );
}