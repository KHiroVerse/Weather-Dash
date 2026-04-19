import React from 'react';
import { Wind, Droplets, Thermometer } from 'lucide-react';

const CurrentWeather = ({ weather }) => {
  if (!weather) return null;

  const { name, main, weather: weatherDetails, wind } = weather;

  return (
    <div className="current-weather-card">
      <div className="weather-header">
        <h2>{name}</h2>
        <p className="date">{new Date().toLocaleDateString()}</p>
      </div>

      <div className="weather-main">
        <div className="weather-icon-container">
          <img 
            src={`https://openweathermap.org/img/wn/${weatherDetails[0].icon}@4x.png`} 
            alt={weatherDetails[0].description} 
          />
        </div>
        <div className="weather-temp-container">
          <span className="temperature">{Math.round(main.temp)}°C</span>
          <span className="description">{weatherDetails[0].description}</span>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <Thermometer className="detail-icon" size={24} />
          <div className="detail-info">
            <span className="detail-label">Feels like</span>
            <span className="detail-value">{Math.round(main.feels_like)}°C</span>
          </div>
        </div>

        <div className="detail-item">
          <Droplets className="detail-icon" size={24} />
          <div className="detail-info">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{main.humidity}%</span>
          </div>
        </div>

        <div className="detail-item">
          <Wind className="detail-icon" size={24} />
          <div className="detail-info">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{wind.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;