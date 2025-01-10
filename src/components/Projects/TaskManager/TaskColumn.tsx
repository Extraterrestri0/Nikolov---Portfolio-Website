import React from 'react';
import { motion } from 'framer-motion';
import type { Task, Column } from './types';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  column: Column;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskColumn({ column, tasks, onEditTask, onDeleteTask }: TaskColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {column.icon}
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {column.title} ({tasks.length})
        </h3>
      </div>

      <motion.div layout className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </motion.div>
    </div>
  );
}