import React, { useState } from 'react';
import './SearchFilters.css';

function SearchFilters({ onSearch }) {
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      category: '',
      location: '',
      minPrice: '',
      maxPrice: '',
    });
    onSearch({
      category: '',
      location: '',
      minPrice: '',
      maxPrice: '',
    });
  };

  return (
    <form className="search-filters" onSubmit={handleSubmit}>
      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="room">Room</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          name="location"
          placeholder="City or address..."
          value={filters.location}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="minPrice">Min Price</label>
        <input
          id="minPrice"
          type="number"
          name="minPrice"
          placeholder="$"
          value={filters.minPrice}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="maxPrice">Max Price</label>
        <input
          id="maxPrice"
          type="number"
          name="maxPrice"
          placeholder="$"
          value={filters.maxPrice}
          onChange={handleChange}
        />
      </div>

      <div className="filter-buttons">
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
}

export default SearchFilters;
