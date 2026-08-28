# fog-map

**The Fog — North America, 1000–1900.** A scroll-driven sequence of twenty-two maps
and what each one burned away. Single React component, Vite build, Tailwind v4.

## Local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

## Deploy (Vercel)

Import the repo at vercel.com/new. Vercel detects Vite and uses:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

No environment variables, no `vercel.json` needed. Pushes to `main` deploy to
production; other branches get preview URLs.

## Layout

```
index.html          entry, title + meta
src/main.jsx        React root
src/TheFog.jsx      the whole piece (geometry, projection, chapters, render)
src/index.css       Tailwind import
```
