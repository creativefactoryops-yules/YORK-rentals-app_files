import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            YORK Rentals connects people who need rental opportunities with
            property owners. We believe everyone deserves a chance, regardless
            of credit history.
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/browse">Browse</a>
            </li>
            <li>
              <a href="/post">Post</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@yorkrentals.com</p>
          <p>Phone: (905) XXX-XXXX</p>
          <p>Location: York Region, Ontario</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 YORK Rentals. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
