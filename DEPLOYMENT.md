# YORK Rentals App Setup Guide

## Quick Start

1. **Navigate to your project folder in Termux:**
```bash
cd ~/YORK-rentals-app_files
# or wherever you cloned it
```

2. **Install dependencies:**
```bash
npm install
```

3. **Deploy with Vercel:**
```bash
npx vercel
```
When prompted: **"You are deploying your home directory?"** → Say `yes` (you'll be in the project folder by then)

4. **Set environment variables in Vercel Dashboard:**
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`

## Or use GitHub Pages (simpler)

```bash
cd ~/YORK-rentals-app_files
npm run build
# Then upload the build/ folder to GitHub Pages
```

## Troubleshooting

If Vercel asks about home directory again:
1. Make sure you're in the project directory: `pwd`
2. Should show: `/path/to/YORK-rentals-app_files`
3. Then run `npx vercel` again
