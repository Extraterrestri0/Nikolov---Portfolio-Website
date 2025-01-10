import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ListTodo, Clock, CheckCircle2 } from 'lucide-react';
import type { Task, Column } from './types';
import { TaskColumn } from './TaskColumn';
import { TaskForm } from './TaskForm';

const columns: Column[] = [
  { id: 'todo', title: 'To Do', icon: <ListTodo className="w-5 h-5 text-gray-600 dark:text-gray-400" /> },
  { id: 'in-progress', title: 'In Progress', icon: <Clock className="w-5 h-5 text-blue-600" /> },
  { id: 'completed', title: 'Completed', icon: <CheckCircle2 className="w-5 h-5 text-green-600" /> },
];

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleCreateTask = (data: Partial<Task>) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title || '',
      description: data.description || '',
      priority: data.priority || 'medium',
      status: 'todo',
      dueDate: new Date(data.dueDate || Date.now()),
      createdAt: new Date(),
      tags: typeof data.tags === 'string' ? data.tags.split(',').map(tag => tag.trim()) : [],
    };

    setTasks([...tasks, newTask]);
    setIsFormOpen(false);
  };

  const handleEditTask = (data: Partial<Task>) => {
    if (!editingTask) return;

    setTasks(tasks.map(task =>
      task.id === editingTask.id
        ? { ...task, ...data }
        : task
    ));
    setEditingTask(undefined);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Task Manager</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => (
          <TaskColumn
            key={column.id}
            column={column}
            tasks={tasks.filter(task => task.status === column.id)}
            onEditTask={setEditingTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>

      <AnimatePresence>
        {(isFormOpen || editingTask) && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleEditTask : handleCreateTask}
            onClose={() => {
              setIsFormOpen(false);
              setEditingTask(undefined);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}