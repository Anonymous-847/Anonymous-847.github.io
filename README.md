# Faizan Ahmed: Portfolio

Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion (animation) and Lenis (smooth scroll).
Exports to a fully static site.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in /out
```

## Keep your existing `public/` folder

This redesign uses the same asset paths as before. Copy your current files back in:

- `public/Faizan.jpeg` : your photo (a monogram shows if it is missing)
- `public/pdf/cv.pdf`  : your CV (the "Download CV" buttons point here)

## Edit content

Everything lives in `lib/data.ts`: projects, skills, experience, links, copy.

- Add a project screenshot: put the image in `public/projects/` and set `image: "/projects/name.png"` on that project. It replaces the generated cover.
- Featured projects (large stacking cards) are the ones with `featured: true`; the rest appear in the "More projects" list.
- Experience dates: the Elite Digital Hub and Codexiva entries have no dates yet. Add them in `period`.

## Design notes

- Colour: cool paper and ink with one ultramarine signal colour (light and dark themes, saved per visitor).
- Type: Bricolage Grotesque (display) and Geist (text), self-hosted through Fontsource, so there are no Google Fonts requests.
- Motion: preloader (once per session), masked headline reveals, a live agent-graph hero, scroll-linked text and timelines, stacking project cards, circular theme-switch transition. Everything respects `prefers-reduced-motion`.

## Deploy

- **Vercel / Netlify**: import the repo, no config needed.
- **GitHub Pages** (user site): build with `npm run build` and publish the `out/` folder, for example with the official "Deploy Next.js to Pages" GitHub Actions workflow (set the Pages source to "GitHub Actions"; the build output directory is `out`).

Set your real domain in `site.url` in `lib/data.ts` (used for social previews).
