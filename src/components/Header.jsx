import { Link } from 'react-router-dom';
import './Header.css';

function Header({ userProfile }) {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>🏠 YORK Rentals</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/browse" className="nav-link">
            Browse Listings
          </Link>
          <Link to="/post" className="nav-link">
            Post Listing
          </Link>
        </nav>
        {userProfile ? (
          <div className="user-info">
            <span>{userProfile.email}</span>
          </div>
        ) : (
          <div className="auth-buttons">
            <button className="btn btn-secondary">Sign In</button>
            <button className="btn btn-primary">Sign Up</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;