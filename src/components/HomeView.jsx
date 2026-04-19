import React from 'react';
import { Clock, MapPin } from 'lucide-react';

const HomeView = ({ recentSearches, onSearch }) => {
  return (
    <div className="home-view">
      <div className="welcome-section">
        <h2>Welcome to WeatherDash</h2>
        <p>Search for a city to get real-time weather updates and forecasts.</p>
      </div>

      {recentSearches.length > 0 && (
        <div className="recent-searches-section">
          <h3><Clock size={20} /> Recent Searches</h3>
          <div className="recent-searches-grid">
            {recentSearches.map((city, index) => (
              <button
                key={index}
                className="recent-search-card"
                onClick={() => onSearch(city)}
              >
                <MapPin size={18} />
                <span>{city}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;