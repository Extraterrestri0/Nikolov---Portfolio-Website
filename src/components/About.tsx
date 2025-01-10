import React from 'react';
import { Clock, Code, Brain } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <Clock className="w-8 h-8 mx-auto mb-4 text-gray-700 dark:text-gray-300" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Experience</h3>
            <p className="text-gray-600 dark:text-gray-300">3 years of dedicated programming experience</p>
          </div>
          <div className="text-center p-6">
            <Code className="w-8 h-8 mx-auto mb-4 text-gray-700 dark:text-gray-300" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Expertise</h3>
            <p className="text-gray-600 dark:text-gray-300">Specialized in Java and Kotlin development</p>
          </div>
          <div className="text-center p-6">
            <Brain className="w-8 h-8 mx-auto mb-4 text-gray-700 dark:text-gray-300" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Approach</h3>
            <p className="text-gray-600 dark:text-gray-300">Uncompromising dedication to clean code</p>
          </div>
        </div>
        <div className="mt-12 text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto text-center">
          <p className="mb-4">
            I started my programming journey three years ago with Java, and since then, I've been constantly expanding my skill set. My passion for backend development has led me to master both Java and Kotlin, while maintaining an uncompromising approach to writing clean, efficient code.
          </p>
          <p>
            Today, I continue to implement various ideas and projects, focusing on designing and developing robust backend applications. My experience spans across multiple frameworks including Spring ecosystem, Hibernate, and modern web technologies.
          </p>
        </div>
      </div>
    </section>
  );
}