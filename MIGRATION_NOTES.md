# Migration from React Scripts to Vite

## Summary of Changes

This repository has been migrated from Create React App (react-scripts) to Vite for improved performance and modern build tooling.

## What Was Fixed

### 1. **Build Configuration**
- ✅ Created `vite.config.js` with React plugin
- ✅ Updated `package.json` scripts to use Vite commands
- ✅ Removed react-scripts dependency
- ✅ Added Vite and @vitejs/plugin-react as dev dependencies

### 2. **Environment Variables**
- ✅ Changed from `REACT_APP_*` prefix to `VITE_*` prefix
- ✅ Updated `.env.example` file
- ✅ Updated `src/utils/supabase.js` to use `import.meta.env.VITE_*`
- ⚠️ **ACTION REQUIRED**: If you have a `.env` file, rename variables from `REACT_APP_*` to `VITE_*`

### 3. **HTML Configuration**
- ✅ Moved `index.html` to root directory (Vite requirement)
- ✅ Removed `%PUBLIC_URL%` references (not needed in Vite)
- ✅ Updated script reference to use `/src/main.jsx`

### 4. **Build Output**
- ✅ Changed output directory from `build/` to `dist/`
- ✅ Updated `vercel.json` to use `dist` output directory
- ✅ Added SPA rewrites for client-side routing

### 5. **Code Quality**
- ✅ Created `.eslintrc.cjs` with proper Vite + React configuration
- ✅ Updated `.gitignore` for Vite build artifacts

### 6. **Public Assets**
- ✅ Created `public/` folder structure
- ✅ Added `manifest.json` for PWA support
- ✅ Added placeholder favicon

### 7. **Documentation**
- ✅ Updated README.md with correct commands and configuration
- ✅ Updated tech stack to mention Vite
- ✅ Fixed deployment instructions

## New Commands

```bash
# Development
npm run dev          # Start dev server (was: npm start)

# Build
npm run build        # Build for production

# Preview
npm run preview      # Preview production build locally

# Lint
npm run lint         # Run ESLint
```

## Migration Steps for Developers

If you're working on this project, follow these steps:

### 1. Clean Install
```bash
rm -rf node_modules package-lock.json
npm install
```

### 2. Update Environment Variables
Rename your `.env` file variables:
- `REACT_APP_SUPABASE_URL` → `VITE_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY` → `VITE_SUPABASE_ANON_KEY`

### 3. Start Development Server
```bash
npm run dev
```

The app will open at http://localhost:3000

### 4. Deployment
For Vercel deployment, update environment variables in Vercel Dashboard:
- `REACT_APP_SUPABASE_URL` → `VITE_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY` → `VITE_SUPABASE_ANON_KEY`

## Benefits of Vite

1. **Faster Development**: Instant server start and HMR (Hot Module Replacement)
2. **Faster Builds**: Optimized production builds using Rollup
3. **Modern Tooling**: Native ESM support, better tree-shaking
4. **Better DX**: Improved error messages and debugging

## Breaking Changes

⚠️ **Important**: If you have existing code that uses `process.env.REACT_APP_*`, it must be updated to use `import.meta.env.VITE_*`

## Verification

To verify the migration was successful:

1. Run `npm install`
2. Run `npm run dev`
3. Check that the app loads without errors
4. Verify Supabase connection works (if credentials are configured)
5. Run `npm run build` to ensure production build works

## Support

If you encounter issues after this migration, please:
1. Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
2. Check that environment variables use the `VITE_` prefix
3. Verify you're using Node.js 18.0.0 or higher

---

**Migration Date**: June 18, 2026
**Migrated By**: AI Assistant
**Status**: ✅ Complete
