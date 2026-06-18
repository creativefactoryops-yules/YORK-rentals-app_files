import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import PostListingPage from './pages/PostListingPage';
import ListingDetailPage from './pages/ListingDetailPage';
import './App.css';

function App() {
  const [userProfile, setUserProfile] = useState(null);

  return (
    <BrowserRouter>
      <div className="app">
        <Header userProfile={userProfile} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/post" element={<PostListingPage />} />
            <Route path="/listing/:id" element={<ListingDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
