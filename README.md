# Cheriven Empowerment Foundation — Website (v2)

Modern, image-rich website for the Cheriven Empowerment Foundation (CEF), an
Abuja-based Nigerian NGO. Built with **Next.js 16 (App Router) + Tailwind CSS v4**
and shipped as a **static export** for hosting on **GitHub Pages**.

Content is managed through plain **Markdown files** — no CMS or database required.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # static export -> ./out
npm run lint
```

## Project structure

```
app/                 # routes, root layout, global styles (design tokens)
components/
  layout/            # Header, Footer, Newsletter, BackToTop
  home/              # Hero, About, Numbers, Programs, Volunteers,
                     # Partners, Faq, Events, Blog
  ui/                # Container, Button, Icon, Logo, Reveal, SectionHeading
content/             # ← editable content (Markdown)
  home.md            #   hero slides, about tabs, impact stats
  programs/*.md      #   one file per programme
  blog/*.md          #   one file per story
  events/*.md        #   one file per event
  faq/*.md           #   one file per question
  partners/*.md      #   one file per partner
lib/
  site-config.ts     # phone, email, address, socials, navigation (single source of truth)
  content.ts         # Markdown loaders (gray-matter + marked)
  format.ts          # date helpers
public/
  brand/             # logo + OG image
  images/            # NGO photography (ngo/, hero/, …)
  partners/          # partner logos
  CNAME              # custom domain for GitHub Pages
```

## Managing content

- **Contact details** (phone, email, address, social links) live in
  `lib/site-config.ts`.
- **Programmes / blog posts / events / FAQs / partners**: add or edit a Markdown
  file in the matching `content/` folder. Frontmatter drives the cards; the body
  is the long-form copy. New files appear automatically on the next build.
- **Hero slides, About text and impact numbers**: edit `content/home.md`.
- **Images**: drop files into `public/images/…` and reference them by path
  (e.g. `/images/ngo/ngo-3.jpeg`).

## Design system

Design tokens (colours 50–950, fonts, radii, shadows, motion) are defined in
`app/globals.css` under Tailwind v4's `@theme`. Palette: brand indigo `#3a3792`,
teal `#79b5bd`, sand `#e8d5b5`, accent red `#D71720`. Type: Fraunces (display) +
Hanken Grotesk (body).

## Deployment (GitHub Pages)

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs
`next build` (static export to `./out`) and publishes it to GitHub Pages.

One-time setup in the repository: **Settings → Pages → Build and deployment →
Source: GitHub Actions**. The custom domain `www.cherivenfoundation.org` is set
via `public/CNAME`.
