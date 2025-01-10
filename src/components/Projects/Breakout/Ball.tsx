import React from 'react';
import { motion } from 'framer-motion';

interface BallProps {
  position: { x: number; y: number };
  size: number;
}

export function Ball({ position, size }: BallProps) {
  return (
    <motion.div
      className="absolute bg-white rounded-full shadow-glow"
      style={{
        width: size,
        height: size,
        left: position.x,
        top: position.y,
      }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "tween", duration: 0.016 }}
    />
  );
}