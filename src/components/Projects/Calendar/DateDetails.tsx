import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

interface DateDetailsProps {
  selectedDate: Date;
}

export function DateDetails({ selectedDate }: DateDetailsProps) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
      <div className="flex items-center gap-3 mb-2">
        <CalendarIcon className="w-5 h-5 text-blue-600" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          Selected Date Details
        </h4>
      </div>
      
      <div className="space-y-2 text-gray-600 dark:text-gray-300">
        <p>
          <span className="font-medium">Full Date: </span>
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <p>
          <span className="font-medium">Day of Year: </span>
          {Math.floor((selectedDate.getTime() - new Date(selectedDate.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24)}
        </p>
        <p>
          <span className="font-medium">Week Number: </span>
          {Math.ceil((((selectedDate.getTime() - new Date(selectedDate.getFullYear(), 0, 0).getTime()) / 86400000) + 1) / 7)}
        </p>
      </div>
    </div>
  );
}