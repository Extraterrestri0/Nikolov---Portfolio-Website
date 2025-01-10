import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WeatherCard } from './WeatherCard';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
}

export function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Sofia,bg&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );

      setWeatherData({
        temperature: Math.round(response.data.main.temp),
        humidity: response.data.main.humidity,
        windSpeed: Math.round(response.data.wind.speed * 3.6), // Convert m/s to km/h
        description: response.data.weather[0].description,
      });
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <WeatherCard
      data={weatherData || { temperature: 0, humidity: 0, windSpeed: 0, description: '' }}
      isLoading={isLoading}
      error={error}
    />
  );
}