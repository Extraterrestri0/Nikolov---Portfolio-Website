import React from 'react';
import { motion } from 'framer-motion';

interface BrickProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  isVisible: boolean;
}

export function Brick({ x, y, width, height, color, isVisible }: BrickProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="absolute rounded-sm shadow-md"
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color,
      }}
    />
  );
}