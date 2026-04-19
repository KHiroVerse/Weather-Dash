import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { getCitySuggestions } from '../services/weatherService';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (query.trim().length > 0) {
        setLoading(true);
        const results = await getCitySuggestions(query);
        setSuggestions(results);
        setShowDropdown(results.length > 0);
        setLoading(false);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowDropdown(false);
      setQuery('');
    }
  };

  const handleSuggestionClick = (city) => {
    onSearch(city);
    setQuery('');
    setShowDropdown(false);
  };

  return (
    <div className="search-container" ref={dropdownRef} style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <Search size={20} />
        </button>
      </form>

      {loading && (
        <div className="suggestions-dropdown" style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.7 }}>
          Searching...
        </div>
      )}

      {showDropdown && !loading && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((city, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;