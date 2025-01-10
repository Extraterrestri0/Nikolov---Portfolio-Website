import React from 'react';
import { motion } from 'framer-motion';

interface TimeUnit {
  value: number;
  label: string;
}

interface CountdownDisplayProps {
  timeUnits: TimeUnit[];
}

export function CountdownDisplay({ timeUnits }: CountdownDisplayProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center border border-white/20">
            <span className="text-2xl sm:text-4xl font-bold text-white">{unit.value}</span>
          </div>
          <span className="text-white/80 mt-2 text-sm uppercase tracking-wider">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}