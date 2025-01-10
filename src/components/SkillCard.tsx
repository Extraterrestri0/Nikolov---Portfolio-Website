import React from 'react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  icon: string;
  title: string;
  skills: Array<{
    name: string;
    logo: string;
  }>;
  index: number;
}

export function SkillCard({ icon, title, skills, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
    >
      <img src={icon} alt={title} className="w-12 h-12 mb-4" />
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
      <div className="space-y-4">
        {skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.1 }}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-md overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-700 group-hover:scale-110 transition-transform">
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}