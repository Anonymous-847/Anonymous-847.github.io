# Faizan Ahmed — Portfolio

Personal portfolio site for Faizan Ahmed, Agentic AI Engineer & Full-Stack
Developer. Rebuilt from a static HTML/CSS/JS version into **Next.js 16**
(App Router), **TypeScript**, and **Tailwind CSS v4**.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- next/font (Space Grotesk, Syne, JetBrains Mono)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before you deploy — two things to swap in

1. **Your photo** — `public/profile.jpg` is currently a generated placeholder
   monogram (not a real photo). Export a square headshot and replace that
   file with the same name — the About section will pick it up automatically.

2. **Your resume** — `public/resume.pdf` is a placeholder PDF with setup
   instructions inside it. Export your real resume as a PDF, name it
   `resume.pdf`, and drop it into `/public`, replacing the placeholder. The
   "Download Resume" button already links to `/resume.pdf`, so no code
   changes are needed.

## Project structure

```
app/
  layout.tsx        Root layout, fonts, metadata
  page.tsx           Assembles all sections
  globals.css        Tailwind import + design tokens
components/
  Navbar, Hero, TypedRole, StatCounter, About, Skills, Projects,
  Education, Journey, Achievements, Contact, Footer,
  Reveal (scroll-in animation), ParticleBackground, CustomCursor
lib/
  data.ts            All content (skills, projects, timeline, etc.)
```

To edit any content — projects, skills, achievements, education, social
links — edit `lib/data.ts`. Nothing else needs to change.

## Build

```bash
npm run build
npm start
```

## Deploy

Works out of the box on [Vercel](https://vercel.com) — connect the repo and
deploy, no config needed.
