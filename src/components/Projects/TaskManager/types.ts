import { ReactNode } from 'react';

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: Date;
  createdAt: Date;
  tags: string[];
}

export interface Column {
  id: Status;
  title: string;
  icon: ReactNode;
}