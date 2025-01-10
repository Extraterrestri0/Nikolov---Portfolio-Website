import React from 'react';
import { motion } from 'framer-motion';

interface CalculatorButtonProps {
  value: string;
  onClick: () => void;
  variant?: 'number' | 'operator' | 'equals' | 'clear';
  className?: string;
}

export function CalculatorButton({ value, onClick, variant = 'number', className = '' }: CalculatorButtonProps) {
  const baseClasses = "w-full h-14 rounded-lg font-semibold text-lg transition-all duration-200 active:scale-95";
  const variantClasses = {
    number: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600",
    operator: "bg-blue-500 text-white hover:bg-blue-600",
    equals: "bg-green-500 text-white hover:bg-green-600",
    clear: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {value}
    </motion.button>
  );
}