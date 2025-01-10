import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultItem {
  title: string;
  status: 'good' | 'warning' | 'error';
  message: string;
}

interface AnalysisResultProps {
  results: ResultItem[];
}

export function AnalysisResult({ results }: AnalysisResultProps) {
  const statusIcons = {
    good: <Check className="w-5 h-5 text-green-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    error: <X className="w-5 h-5 text-red-500" />,
  };

  const statusColors = {
    good: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20',
    warning: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20',
    error: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20',
  };

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-4 rounded-lg border ${statusColors[result.status]}`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-1">{statusIcons[result.status]}</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {result.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {result.message}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}