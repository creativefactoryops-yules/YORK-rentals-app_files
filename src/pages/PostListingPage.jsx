import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing } from '../utils/supabase';
import './PostListingPage.css';

function PostListingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'apartment',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    image_url: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.price || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const listing = await createListing(formData);

    if (listing) {
      setSuccess('Listing created successfully!');
      setFormData({
        title: '',
        description: '',
        category: 'apartment',
        price: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        image_url: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
      });
      setTimeout(() => {
        navigate('/browse');
      }, 2000);
    } else {
      setError('Failed to create listing. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="post-listing-page">
      <div className="page-header">
        <h1>Post a New Listing</h1>
        <p>List your property and reach potential renters</p>
      </div>

      <div className="post-listing-container">
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit} className="listing-form">
          <fieldset>
            <legend>Property Details</legend>

            <div className="form-group">
              <label htmlFor="title">
                Property Title <span className="required">*</span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="e.g., Beautiful 2-Bedroom Apartment"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">
                Description <span className="required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your property, amenities, lease terms, etc."
                rows="6"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="room">Room</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="price">
                  Monthly Price <span className="required">*</span>
                </label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="$ per month"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">
                Location <span className="required">*</span>
              </label>
              <input
                id="location"
                type="text"
                name="location"
                placeholder="City, area, or address"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bedrooms">Bedrooms</label>
                <input
                  id="bedrooms"
                  type="number"
                  name="bedrooms"
                  placeholder="Number of bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bathrooms">Bathrooms</label>
                <input
                  id="bathrooms"
                  type="number"
                  name="bathrooms"
                  placeholder="Number of bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="image_url">Image URL</label>
              <input
                id="image_url"
                type="url"
                name="image_url"
                placeholder="https://example.com/image.jpg"
                value={formData.image_url}
                onChange={handleChange}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Contact Information</legend>

            <div className="form-group">
              <label htmlFor="contact_name">Your Name</label>
              <input
                id="contact_name"
                type="text"
                name="contact_name"
                placeholder="Your full name"
                value={formData.contact_name}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact_email">Email</label>
                <input
                  id="contact_email"
                  type="email"
                  name="contact_email"
                  placeholder="your@email.com"
                  value={formData.contact_email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact_phone">Phone</label>
                <input
                  id="contact_phone"
                  type="tel"
                  name="contact_phone"
                  placeholder="(905) XXX-XXXX"
                  value={formData.contact_phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <div className="form-buttons">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Listing'}
            </button>
            <button
              type="reset"
              className="btn btn-secondary"
              disabled={loading}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostListingPage;
