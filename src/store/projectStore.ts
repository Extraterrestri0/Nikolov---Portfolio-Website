import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Calculator } from '../components/Projects/Calculator';
import { SEOAnalyzer } from '../components/Projects/SEOAnalyzer';
import { NewYearCountdown } from '../components/Projects/CountdownTimer/NewYearCountdown';
import { QuoteGenerator } from '../components/Projects/QuoteGenerator';
import { CodeEditor } from '../components/Projects/CodeEditor';
import { Breakout } from '../components/Projects/Breakout';
import { Calendar } from '../components/Projects/Calendar';
import { TaskManager } from '../components/Projects/TaskManager';
import type { ComponentType } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  component?: ComponentType;
}

interface ProjectState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleFeatured: (id: string) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [
        {
          id: '1',
          title: 'Task Management System',
          description: 'A comprehensive task management application with drag-and-drop functionality, priority levels, and status tracking.',
          imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60',
          technologies: ['React', 'TypeScript', 'Framer Motion'],
          featured: true,
          component: TaskManager,
        },
        {
          id: '2',
          title: 'Interactive Calendar',
          description: 'A modern calendar application with date navigation, event tracking, and detailed date information.',
          imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=60',
          technologies: ['React', 'TypeScript', 'Framer Motion'],
          featured: true,
          component: Calendar,
        },
        {
          id: '3',
          title: 'Breakout Game',
          description: 'Classic breakout game with modern styling and smooth animations.',
          imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60',
          technologies: ['React', 'TypeScript', 'Framer Motion'],
          featured: true,
          component: Breakout,
        },
        {
          id: '4',
          title: 'Code Editor',
          description: 'Interactive code editor with syntax highlighting and multiple language support.',
          imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
          technologies: ['React', 'Monaco Editor', 'TypeScript'],
          featured: true,
          component: CodeEditor,
        },
        {
          id: '5',
          title: 'New Year Countdown',
          description: 'Interactive countdown timer to New Year with real-time updates and beautiful snow background.',
          imageUrl: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&auto=format&fit=crop&q=60',
          technologies: ['React', 'TypeScript', 'Framer Motion'],
          featured: true,
          component: NewYearCountdown,
        },
        {
          id: '6',
          title: 'Quote Generator',
          description: 'Generate inspiring quotes with beautiful animations and transitions.',
          imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60',
          technologies: ['React', 'TypeScript', 'Framer Motion'],
          featured: true,
          component: QuoteGenerator,
        },
        {
          id: '7',
          title: 'SEO Analyzer',
          description: 'Comprehensive SEO analysis tool for websites with detailed recommendations.',
          imageUrl: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=800&auto=format&fit=crop&q=60',
          technologies: ['React', 'TypeScript', 'SEO Analytics'],
          featured: true,
          component: SEOAnalyzer,
        },
      ],
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, { ...project, id: crypto.randomUUID() }],
        })),
      updateProject: (id, updatedProject) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updatedProject } : project
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        })),
      toggleFeatured: (id) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, featured: !project.featured } : project
          ),
        })),
    }),
    {
      name: 'projects-storage',
    }
  )
);