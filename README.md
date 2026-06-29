# Vaishnaviya Sankar — Portfolio

A single-page React portfolio styled as a "security assessment report" —
your own career, written up the way you'd write up a VAPT engagement:
an Executive Summary, a Coverage Matrix (skills), an Experience Log,
Case Files (projects), and Credentials.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Build for deployment

```bash
npm run build
```

This outputs a static site in `dist/`. You can deploy that folder directly
to Vercel, Netlify, GitHub Pages, or any static host.

## Files

- `src/App.jsx` — the entire site (component logic + styles in one file)
- `src/main.jsx` — React entry point
- `index.html` — page shell
- `package.json` — dependencies (React + `lucide-react` for icons)

## Customizing

All your content (summary, skills, experience, projects, certifications)
lives in plain data arrays at the top of `src/App.jsx` — edit those directly,
no need to touch the layout or styles below them.

A few things you may want to do before going live:
- Swap the LinkedIn/email/phone links if anything changes.
- If you want a downloadable resume PDF, drop it in a `public/` folder as
  `resume.pdf` and add `<a href="/resume.pdf" download>Download resume</a>`
  next to the "Open a channel" button in the hero.
