import React from 'react';
import { motion } from 'framer-motion';

interface PaddleProps {
  position: number;
  width: number;
  height: number;
}

export function Paddle({ position, width, height }: PaddleProps) {
  return (
    <motion.div
      className="absolute bottom-4 bg-blue-500 rounded-lg"
      style={{
        width,
        height,
        left: position,
      }}
      animate={{ x: position }}
      transition={{ type: "tween", duration: 0.1 }}
    />
  );
}