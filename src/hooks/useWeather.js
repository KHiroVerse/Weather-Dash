import { useState, useEffect } from 'react';
import { getWeatherByCity, getForecastByCity } from '../services/weatherService';

export const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const [weatherData, forecastData] = await Promise.all([
          getWeatherByCity(city),
          getForecastByCity(city),
        ]);
        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        setError(err.message || 'Failed to fetch weather data');
        setWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, forecast, loading, error };
};