# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Anhangá Viagens is an institutional website for a Brazilian boutique travel agency. It features an AI-powered chatbot (Google Gemini) for travel consultation, destination showcases, blog, and WhatsApp lead generation.

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS

## Development Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build to /dist
npm run preview   # Preview production build at http://localhost:4173
npm run deploy    # Build + deploy to GitHub Pages
```

## Environment Variables

Required for AI chatbot functionality:
- `GEMINI_API_KEY` - Google Gemini API key (get at https://aistudio.google.com/apikey)
- `GEMINI_MODEL` - Model version (default: `gemini-2.5-flash`)
- `VITE_BASE_PATH` - Base path for deployment (default: `/`)
- `VITE_MEDIA_CDN_URL` - Optional CDN base URL for media assets (videos/images)
- `ALLOWED_ORIGIN` - CORS allowed origin for API (default: `*`)

Copy `.env.example` to `.env` for local development.

## Architecture

### Directory Structure

- `/components` - React components (Header, Footer, AIChat, SEO, etc.)
  - `/ui` - Generic UI components (LazyImage)
  - `/schemas` - JSON-LD schema components for SEO
- `/pages` - Page-level route components (Home, BlogList, BlogPost, Terms, Privacy)
- `/services` - API clients (geminiService.ts for AI chat)
- `/api` - Vercel Edge Functions (generate.ts proxies Gemini API)
- `/utils` - Helper functions (whatsapp.ts, share.ts)
- `/data` - Static content data (blogData.ts, mediaConfig.ts)
- `/public` - Static assets, sitemap.xml, robots.txt

### Key Patterns

**Import Alias:** Use `@/` for root-relative imports (e.g., `@/components/Header`)

**AI Integration:** The Gemini API is called via a serverless proxy at `/api/generate.ts` to protect the API key. The client-side service is in `/services/geminiService.ts`. The API includes rate limiting (10 requests/minute per IP) and CORS protection.

**Media Assets:** Centralized in `/data/mediaConfig.ts`. When ready to migrate to CDN, set `VITE_MEDIA_CDN_URL` and update the URLs in the config file.

**Routing:** React Router with hash-based smooth scrolling for same-page navigation. All unknown routes redirect to home.

**Styling:** Tailwind CSS with custom theme colors (cyan, blue, yellow, dark, light) and fonts (Poppins, Merriweather) defined in `tailwind.config.js`.

**SEO:** Dynamic meta tags via React Helmet Async. Schema components in `/components/schemas/` generate JSON-LD structured data.

**Analytics:** Google Tag Manager (GTM-T2KGS86G) and HubSpot tracking are embedded in index.html.

### Deployment

Pre-configured for:
- **Vercel** (primary) - `vercel.json` includes security headers and SPA rewrites
- **Netlify** - `netlify.toml` configuration
- **GitHub Pages** - via `npm run deploy` (requires `VITE_BASE_PATH` env var)

Build output goes to `/dist` directory.
