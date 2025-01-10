import React, { useState, useEffect } from 'react';
import { CountdownDisplay } from './CountdownDisplay';
import { calculateTimeToNewYear } from './utils';
import { motion } from 'framer-motion';

export function NewYearCountdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeToNewYear());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeToNewYear());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'days' },
    { value: timeLeft.hours, label: 'hours' },
    { value: timeLeft.minutes, label: 'minutes' },
    { value: timeLeft.seconds, label: 'seconds' },
  ];

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1200&auto=format&fit=crop&q=60")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/50" />
      
      <div className="relative h-full flex flex-col items-center justify-center p-8">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-8"
        >
          New Year Countdown
        </motion.h3>
        
        <CountdownDisplay timeUnits={timeUnits} />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-white/80 text-center"
        >
          Counting down to January 1st, {new Date().getFullYear() + 1}
        </motion.p>
      </div>
    </div>
  );
}