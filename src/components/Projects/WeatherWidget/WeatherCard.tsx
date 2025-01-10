import React from 'react';
import { Cloud, Droplets, Sun, Wind } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
}

interface WeatherCardProps {
  data: WeatherData;
  isLoading: boolean;
  error: string | null;
}

export function WeatherCard({ data, isLoading, error }: WeatherCardProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gradient-to-br from-red-400 to-red-600 rounded-lg p-8">
        <p className="text-white text-center">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[400px] bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-8 text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8">
        <Sun className="w-24 h-24 text-yellow-300 animate-pulse" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-3xl font-bold mb-2">Sofia, Bulgaria</h3>
          <p className="text-xl opacity-90">{data.description}</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-full p-3">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <p className="text-4xl font-bold">{data.temperature}°C</p>
              <p className="text-sm opacity-75">Temperature</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">{data.humidity}%</p>
                <p className="text-sm opacity-75">Humidity</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">{data.windSpeed} km/h</p>
                <p className="text-sm opacity-75">Wind Speed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 opacity-10">
          <Cloud className="w-48 h-48" />
        </div>
      </div>
    </motion.div>
  );
}