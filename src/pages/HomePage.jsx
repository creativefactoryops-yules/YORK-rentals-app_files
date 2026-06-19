import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to YORK Rentals</h1>
          <p>
            Find your perfect rental home or apartment in York Region. We believe everyone deserves a chance.
          </p>
          <div className="hero-buttons">
            <Link to="/browse" className="btn btn-primary btn-large">
              Browse Listings
            </Link>
            <Link to="/post" className="btn btn-secondary btn-large">
              Post Your Listing
            </Link>
          </div>
        </div>
      </div>

      <section className="features">
        <h2>Why Choose YORK Rentals?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏠</div>
            <h3>Diverse Properties</h3>
            <p>
              Apartments, houses, condos, and rooms - find exactly what you need.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💪</div>
            <h3>Fair Opportunities</h3>
            <p>
              No discrimination based on credit history. Everyone deserves a chance.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Easy Search</h3>
            <p>
              Filter by location, price, and property type to find your perfect match.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>
              Browse listings on your phone, tablet, or computer anytime, anywhere.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Direct Contact</h3>
            <p>
              Connect directly with landlords and renters without intermediaries.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Safe & Secure</h3>
            <p>
              Your information is protected and we encourage safe meeting practices.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Find Your New Home?</h2>
        <p>Browse available listings in York Region today</p>
        <Link to="/browse" className="btn btn-primary btn-large">
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default HomePage;