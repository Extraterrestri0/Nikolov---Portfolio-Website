import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnalysisResult } from './AnalysisResult';

export function SEOAnalyzer() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simulate analysis with mock data
    setTimeout(() => {
      setResults([
        {
          title: 'Meta Title',
          status: 'good',
          message: 'Meta title is well-optimized and has the right length.',
        },
        {
          title: 'Meta Description',
          status: 'warning',
          message: 'Meta description could be more descriptive. Consider adding more relevant keywords.',
        },
        {
          title: 'Heading Structure',
          status: 'good',
          message: 'Headings are properly structured and contain relevant keywords.',
        },
        {
          title: 'Mobile Responsiveness',
          status: 'error',
          message: 'Page is not fully optimized for mobile devices.',
        },
        {
          title: 'Loading Speed',
          status: 'warning',
          message: 'Page load time could be improved. Consider optimizing images and reducing server response time.',
        },
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <form onSubmit={handleAnalysis} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Enter Website URL
            </label>
            <div className="relative">
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-colors pl-10"
                required
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Analyze SEO
              </>
            )}
          </button>
        </form>

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Analysis Results
            </h3>
            <AnalysisResult results={results} />
          </motion.div>
        )}
      </div>
    </div>
  );
}