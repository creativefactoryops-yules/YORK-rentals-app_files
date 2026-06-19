import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getListingById } from '../utils/supabase';
import './ListingDetailPage.css';

function ListingDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadListing = useCallback(async () => {
    setLoading(true);
    setError(null);
    const data = await getListingById(id);

    if (data) {
      setListing(data);
    } else {
      setError('Listing not found');
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadListing();
  }, [loadListing]);

  if (loading) {
    return <div className="loading">Loading listing details...</div>;
  }

  if (error || !listing) {
    return (
      <div className="listing-detail-page">
        <div className="error">{error}</div>
        <Link to="/browse" className="btn btn-primary">
          ← Back to Listings
        </Link>
      </div>
    );
  }

  const {
    title,
    description,
    price,
    category,
    location,
    bedrooms,
    bathrooms,
    image_url,
    contact_name,
    contact_email,
    contact_phone,
    created_at,
  } = listing;

  return (
    <div className="listing-detail-page">
      <Link to="/browse" className="back-link">
        ← Back to Listings
      </Link>

      <div className="listing-detail-container">
        <div className="listing-image-section">
          {image_url ? (
            <img src={image_url} alt={title} className="listing-image" />
          ) : (
            <div className="image-placeholder">No Image Available</div>
          )}
          <span className="listing-category-badge">{category}</span>
        </div>

        <div className="listing-content">
          <div className="listing-header">
            <h1>{title}</h1>
            <p className="location">📍 {location}</p>
          </div>

          <div className="listing-price">
            <h2>${price}</h2>
            <span>/month</span>
          </div>

          <div className="listing-specs">
            {bedrooms && (
              <div className="spec">
                <span className="spec-icon">🛏️</span>
                <span>{bedrooms} Bedroom{bedrooms !== 1 ? 's' : ''}</span>
              </div>
            )}
            {bathrooms && (
              <div className="spec">
                <span className="spec-icon">🚿</span>
                <span>{bathrooms} Bathroom{bathrooms !== 1 ? 's' : ''}</span>
              </div>
            )}
            {created_at && (
              <div className="spec">
                <span className="spec-icon">📅</span>
                <span>Posted {new Date(created_at).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="listing-description">
            <h3>Description</h3>
            <p>{description}</p>
          </div>

          <div className="contact-section">
            <h3>Contact the Landlord</h3>
            {contact_name && <p><strong>Name:</strong> {contact_name}</p>}
            {contact_email && (
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${contact_email}`}>{contact_email}</a>
              </p>
            )}
            {contact_phone && (
              <p>
                <strong>Phone:</strong>{' '}
                <a href={`tel:${contact_phone}`}>{contact_phone}</a>
              </p>
            )}

            <button
              className="btn btn-primary contact-btn"
              onClick={() => {
                if (contact_email) {
                  window.location.href = `mailto:${contact_email}?subject=Interest in ${title}`;
                }
              }}
            >
              Send Email Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetailPage;