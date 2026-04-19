import React from 'react';

const Suggestions = ({ suggestions, onSelect }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="suggestions-container">
      <p className="suggestions-label">Try searching for:</p>
      <div className="suggestions-list">
        {suggestions.map((city, index) => (
          <button
            key={index}
            className="suggestion-chip"
            onClick={() => onSelect(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;