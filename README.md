# 🏠 YORK Rentals App

A modern, inclusive rental platform for the York Region that gives everyone a fair chance - including people with pets and those rebuilding their credit.

## 🎯 Mission

To provide an accessible, discrimination-free rental marketplace where:

- Pet owners can find pet-friendly housing
- People with credit challenges get fair opportunities
- Landlords connect directly with reliable tenants
- The entire York Region has access to housing solutions

## ✨ Features

- **Browse Listings** - Search and filter rental properties by location, price, and type
- **Post Listings** - Landlords can easily list properties
- **Advanced Search** - Filter by category, price range, and location
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Fair Listings** - No credit discrimination, pet-friendly options
- **Direct Contact** - Connect landlords and tenants directly
- **Supabase Backend** - Secure, scalable database

## 🛠️ Tech Stack

- **Frontend**: React 18.2 with React Router v6
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Pure CSS with responsive grid layout
- **Deployment**: Vercel
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- Supabase account (free tier available)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/creativefactoryops-yules/YORK-rentals-app_files.git
cd YORK-rentals-app_files
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
REACT_APP_SUPABASE_URL=your_supabase_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Get these values from your Supabase project settings.

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🗄️ Database Setup (Supabase)

### Create Tables

1. **listings** table:

```sql
CREATE TABLE listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  image_url TEXT,
  contact_name VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  user_id UUID REFERENCES auth.users,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_location ON listings(location);
CREATE INDEX idx_listings_price ON listings(price);
CREATE INDEX idx_listings_user ON listings(user_id);
```

2. **Enable Row Level Security (RLS)**:

```sql
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read listings"
  ON listings FOR SELECT
  USING (true);

CREATE POLICY "Users can create listings"
  ON listings FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## 📁 Project Structure

```
YORK-rentals-app_files/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   ├── ListingCard.jsx
│   │   ├── ListingCard.css
│   │   ├── SearchFilters.jsx
│   │   └── SearchFilters.css
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── HomePage.css
│   │   ├── BrowsePage.jsx
│   │   ├── BrowsePage.css
│   │   ├── PostListingPage.jsx
│   │   ├── PostListingPage.css
│   │   ├── ListingDetailPage.jsx
│   │   └── ListingDetailPage.css
│   ├── utils/
│   │   └── supabase.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .env.local (not committed)
├── package.json
├── vercel.json
└── README.md
```

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests
npm run test

# Lint code
npm run lint

# Eject (not reversible!)
npm run eject
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:

```bash
npm install -g vercel
```

2. **Deploy**:

```bash
vercel
```

3. **Configure Environment Variables**:
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add:
     - `REACT_APP_SUPABASE_URL`
     - `REACT_APP_SUPABASE_ANON_KEY`

4. **Redeploy** after adding environment variables

### Deploy to GitHub Pages

```bash
npm run build
# Then upload the build/ folder to GitHub Pages
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## 🔒 Security Features

- Environment variables for sensitive data
- Row-level security on database
- HTTPS enforcement
- XSS protection through React
- CSRF protection
- Input validation

## 🐛 Troubleshooting

### "Cannot find listings"

- Ensure Supabase URL and key are correct
- Check that the listings table exists in Supabase
- Verify RLS policies are set up correctly

### Build fails

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port 3000 already in use

```bash
# Use a different port
PORT=3001 npm run dev
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Email: info@yorkrentals.com
- Contact: (905) XXX-XXXX

## 🌟 Credits

Built with ❤️ for the York Region community by Creative Factory Ops

## 🎯 Roadmap

- [ ] User authentication system
- [ ] Payment processing
- [ ] Email notifications
- [ ] Landlord dashboard
- [ ] Tenant profiles
- [ ] Reviews & ratings
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Video tours
- [ ] Automated screening forms

## ✅ Status

- ✅ MVP Launched
- 🚀 Currently Deployed
- 📈 Active Development
- 🎯 Ready for Production

---

**Version**: 1.0.0  
**Last Updated**: June 2024  
**Maintained by**: Creative Factory Ops
