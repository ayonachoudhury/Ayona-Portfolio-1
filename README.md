# Ayona Choudhury — Portfolio

Next.js 14 + Tailwind + GSAP (ScrollTrigger). Static export, so it can be hosted for free and viewed publicly.

## Before you push
1. Add your portrait as **`public/portrait.jpg`** (convert `IMG_5927.HEIC` to JPG first: macOS Preview → File → Export, or heic.to). Until then a monogram shows.
2. `public/powerbi.jpg` (ChaiNest dashboard) is already included.

## Run locally
```bash
npm install
npm run dev     # http://localhost:3000
```

## Publish on GitHub Pages (public link)
1. Create a **public** repo and push all of these files to `main`.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. The included workflow builds and deploys. Your site: `https://<username>.github.io/<repo>/`.

(Vercel / Netlify also work: import the repo, no settings needed.)

Edit text, links and projects in `lib/data.ts`.
