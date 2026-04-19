import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import HomeView from './components/HomeView';
import Suggestions from './components/Suggestions';
import { useWeather } from './hooks/useWeather';
import './App.css';

const THEMES = {
  "Clear": "theme-sunny",
  "Clouds": "theme-cloudy",
  "Rain": "theme-rainy",
  "Drizzle": "theme-rainy",
  "Thunderstorm": "theme-rainy",
  "Snow": "theme-snowy"
};

const getThemeClass = (weatherData) => {
  if (!weatherData || !weatherData.weather) return "";
  const condition = weatherData.weather[0].main;
  return THEMES[condition] || "theme-cloudy";
};

function App() {
  const [city, setCity] = useState(null); // Start with no city to show HomeView
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const [suggestions] = useState(['London', 'Tokyo', 'New York', 'Paris', 'Sydney', 'Berlin']);
  
  const { weather, forecast, loading, error } = useWeather(city);

  // Sync recentSearches with localStorage
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Add to history when weather is successfully fetched
  useEffect(() => {
    if (weather && city) {
      setRecentSearches((prev) => {
        const filtered = prev.filter((item) => item.toLowerCase() !== city.toLowerCase());
        const updated = [city, ...filtered].slice(0, 6);
        return updated;
      });
    }
  }, [weather, city]);

  const themeClass = getThemeClass(weather);

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  return (
    <div className={`app-container ${themeClass}`}>
      <div className="app-content">
        <header>
          <h1>WeatherDash</h1>
          <SearchBar onSearch={handleSearch} />
        </header>

        <main>
          {loading && <div className="loading">Loading weather data...</div>}
          
          {error && (
            <div className="error-message">
              <p>Error: {error}</p>
              <p>Please try searching for another city.</p>
            </div>
          )}

          {!loading && !error && (
            <>
              {!city ? (
                <HomeView recentSearches={recentSearches} onSearch={handleSearch} />
              ) : (
                <>
                  <Suggestions suggestions={suggestions} onSelect={handleSearch} />
                  <CurrentWeather weather={weather} />
                  <Forecast forecast={forecast} />
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;