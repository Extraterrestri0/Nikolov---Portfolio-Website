import React from 'react';
import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';
import { SplineEarth } from '../SplineEarth';

export function Contact() {
  return (
    <section id="contact" className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white">
          Get in Touch
        </h2>
        
        <div className="space-y-12">
          <ContactInfo />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <ContactForm />
            <SplineEarth />
          </div>
        </div>
      </div>
    </section>
  );
}