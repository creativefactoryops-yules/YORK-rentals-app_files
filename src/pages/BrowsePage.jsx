import { useState, useEffect } from 'react';
import SearchFilters from '../components/SearchFilters';
import ListingCard from '../components/ListingCard';
import { searchListings } from '../utils/supabase';
import './BrowsePage.css';

function BrowsePage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadListings = async () => {
    setLoading(true);
    setError(null);
    const results = await searchListings({});
    setListings(results);
    setLoading(false);
  };

  useEffect(() => {
    loadListings();
  }, []);

  const handleSearch = async (filters) => {
    setLoading(true);
    setError(null);
    const results = await searchListings(filters);
    setListings(results);
    setLoading(false);
  };

  return (
    <div className="browse-page">
      <div className="page-header">
        <h1>Browse Listings</h1>
        <p>Find your perfect rental in York Region</p>
      </div>

      <SearchFilters onSearch={handleSearch} />

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Loading listings...</div>
      ) : listings.length === 0 ? (
        <div className="no-listings">
          <p>No listings found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div>
          <p className="results-count">Found {listings.length} listings</p>
          <div className="listings-grid">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BrowsePage;