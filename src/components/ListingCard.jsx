import { Link } from 'react-router-dom';
import './ListingCard.css';

function ListingCard({ listing }) {
  if (!listing) return null;

  const {
    id,
    title,
    description,
    price,
    category,
    location,
    image_url,
    bedrooms,
    bathrooms,
  } = listing;

  return (
    <Link to={`/listing/${id}`} className="listing-card-link">
      <div className="listing-card">
        <div className="listing-image">
          {image_url ? (
            <img src={image_url} alt={title} />
          ) : (
            <div className="image-placeholder">No Image</div>
          )}
          <div className="listing-category">{category}</div>
        </div>
        <div className="listing-info">
          <h3>{title}</h3>
          <p className="listing-description">{description?.substring(0, 80)}...</p>
          <div className="listing-details">
            {bedrooms && <span>🛏️ {bedrooms} bed</span>}
            {bathrooms && <span>🚿 {bathrooms} bath</span>}
            {location && <span>📍 {location}</span>}
          </div>
          <div className="listing-footer">
            <span className="price">${price}/month</span>
            <button className="btn-view">View Details →</button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;