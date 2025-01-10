import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedLogo() {
  const letterVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  const name = "N.Nikolov";

  return (
    <div className="flex items-center space-x-1">
      {name.split('').map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.2, rotate: 5 }}
          className={`
            text-xl font-bold
            ${letter === '.' 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
              : i === 0 || i === 2
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600'
            }
          `}
        >
          {letter}
        </motion.span>
      ))}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 ml-1"
      />
    </div>
  );
}