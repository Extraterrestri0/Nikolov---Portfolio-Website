import React from 'react';
import { Play, Download, Copy, Folder } from 'lucide-react';
import { motion } from 'framer-motion';

interface EditorToolbarProps {
  language: string;
  onLanguageChange: (language: string) => void;
  onRun: () => void;
  onDownload: () => void;
  onCopy: () => void;
}

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
];

export function EditorToolbar({ language, onLanguageChange, onRun, onDownload, onCopy }: EditorToolbarProps) {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center gap-2">
        <Folder className="w-5 h-5 text-gray-400" />
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCopy}
          className="p-2 text-gray-400 hover:text-white rounded-md hover:bg-gray-700 transition-colors"
          title="Copy code"
        >
          <Copy className="w-4 h-4" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDownload}
          className="p-2 text-gray-400 hover:text-white rounded-md hover:bg-gray-700 transition-colors"
          title="Download code"
        >
          <Download className="w-4 h-4" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRun}
          className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Play className="w-4 h-4" />
          Run
        </motion.button>
      </div>
    </div>
  );
}