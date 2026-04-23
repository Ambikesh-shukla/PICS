# Prince Institute Of Computer Science — Static Website

## Overview
A premium, multi-page static website for **Prince Institute Of Computer Science** (Gorakhpur).
Built with **only HTML, CSS and JavaScript** — no React, no Tailwind, no UI frameworks. The Vite scaffold is configured in MPA mode purely as a dev server / static bundler; all pages are plain HTML.

## Pages
- `index.html` — Home (hero, stats, about, featured courses, why choose us, faculty, testimonials, gallery preview, online learning, CTA, footer)
- `courses.html` — All courses with category filter + search, highlights and FAQ
- `gallery.html` — Filterable photo gallery with lightbox
- `contact.html` — Inquiry form, contact cards, payment methods (UPI, bank, cash) and payment confirmation form
- `admin.html` — Hidden admin panel (front-end demo only)

## Features
- Premium blue/white theme (light) and full dark mode (toggleable, persisted)
- Fully responsive (mobile/tablet/desktop) with hamburger menu
- Reveal-on-scroll animations
- Floating WhatsApp + Back-to-top buttons
- Service worker for offline caching of core pages and images
- All copy/data is editable through the admin panel
- Inquiry and payment forms save submissions to localStorage and appear in the admin panel
- 10 institute photos generated and stored in `public/images/`

## Admin Panel
- URL: `/admin.html`
- Username: `Hello`
- Password: `Sirji`
- Static front-end only (sessionStorage login, localStorage data). NOT secure — for real use, replace with a real backend API + auth.

## Architecture
- `artifacts/prince-institute/` — the website artifact
  - `index.html`, `courses.html`, `gallery.html`, `contact.html`, `admin.html` at root
  - `public/css/style.css` — all styles
  - `public/js/script.js` — all behavior (theme, menu, rendering, forms, FAQ, lightbox, offline, admin)
  - `public/service-worker.js` — offline caching
  - `public/images/*.png` — 10 institute photos
  - `vite.config.ts` — multi-page build with `appType: "mpa"` and rollupOptions.input listing all 5 HTML files

## Notes
- GitHub Pages compatible: built output in `dist/public/` is plain HTML/CSS/JS.
- For the published version, the admin panel data is per-browser only (no shared backend).
