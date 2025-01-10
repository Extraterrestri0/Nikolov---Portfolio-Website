import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface QuoteDisplayProps {
  quote: string;
  author: string;
}

export function QuoteDisplay({ quote, author }: QuoteDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"
    >
      <Quote className="absolute top-4 left-4 w-8 h-8 text-blue-500/20" />
      <div className="text-center space-y-4">
        <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-serif italic">
          "{quote}"
        </p>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          — {author}
        </p>
      </div>
      <Quote className="absolute bottom-4 right-4 w-8 h-8 text-blue-500/20 transform rotate-180" />
    </motion.div>
  );
}