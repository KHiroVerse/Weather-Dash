import React from 'react';

const Forecast = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // OpenWeatherMap 5-day forecast provides data every 3 hours.
  // We want to pick one data point per day (e.g., around 12:00 PM).
  const dailyForecast = forecast.list.filter((item) =>
    item.dt_txt.includes('12:00:00')
  );

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {dailyForecast.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

          return (
            <div key={index} className="forecast-card">
              <span className="forecast-day">{dayName}</span>
              <span className="forecast-date">{formattedDate}</span>
              <img 
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
                alt={day.weather[0].description} 
              />
              <span className="forecast-temp">{Math.round(day.main.temp)}°C</span>
              <span className="forecast-desc">{day.weather[0].description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;