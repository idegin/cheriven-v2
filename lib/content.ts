import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * File-based content layer. Editors manage content by adding/editing markdown
 * files under /content — no database required. Everything is read at build
 * time (static export), so these helpers are server-only.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

marked.setOptions({ gfm: true, breaks: false });

function readCollection<T>(dir: string): (T & { slug: string; body: string; html: string })[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      return {
        ...(data as T),
        slug: file.replace(/\.md$/, ""),
        body: content.trim(),
        html: marked.parse(content.trim()) as string,
      };
    });
}

function readSingle<T>(file: string): T & { html: string } {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return { ...(data as T), html: marked.parse(content.trim()) as string };
}

const byOrder = (a: { order?: number }, b: { order?: number }) =>
  (a.order ?? 99) - (b.order ?? 99);

const byDateDesc = (a: { date?: string }, b: { date?: string }) =>
  new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime();

/* ------------------------------------------------------------------ types */

export type HeroSlide = {
  eyebrow: string;
  title: string;
  highlight: string;
  body: string;
  image: string;
};

export type Stat = { value: number; suffix?: string; prefix?: string; label: string };

export type HomeContent = {
  hero: HeroSlide[];
  about: {
    eyebrow: string;
    heading: string;
    lead: string;
    who: string;
    mission: string;
    vision: string;
    images: string[];
  };
  stats: Stat[];
};

export type Program = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  icon: string;
  order?: number;
  body: string;
  html: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  author?: string;
  body: string;
  html: string;
};

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  body: string;
  html: string;
};

export type Faq = { slug: string; question: string; order?: number; body: string; html: string };

export type Partner = { slug: string; name: string; logo: string; url?: string; order?: number };

/* ---------------------------------------------------------------- loaders */

export function getHome(): HomeContent & { html: string } {
  return readSingle<HomeContent>("home.md");
}

export function getPrograms(): Program[] {
  return readCollection<Program>("programs").sort(byOrder);
}

export function getProgram(slug: string): Program | undefined {
  return getPrograms().find((p) => p.slug === slug);
}

export function getPosts(): Post[] {
  return readCollection<Post>("blog").sort(byDateDesc);
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getEvents(): EventItem[] {
  return readCollection<EventItem>("events").sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

export function getEvent(slug: string): EventItem | undefined {
  return getEvents().find((e) => e.slug === slug);
}

export function getFaqs(): Faq[] {
  return readCollection<Faq>("faq").sort(byOrder);
}

export function getPartners(): Partner[] {
  return readCollection<Partner>("partners").sort(byOrder);
}

/* ----------------------------------------------------------------- gallery */

export type GalleryImage = { src: string; name: string; ts: number };

const IMAGE_RE = /\.(jpe?g|png|webp|avif|gif)$/i;

/**
 * Gallery drop-zone: every image in /public/gallery is shown, ordered so the
 * MOST RECENTLY ADDED image appears first. "Recency" is the timestamp of the
 * last git commit that touched the file — so editors simply drop images into
 * public/gallery and push; the newest push floats to the top automatically.
 * Requires full git history at build (CI checkout uses fetch-depth: 0).
 * Falls back to file mtime, then name, when git data is unavailable.
 */
export function getGallery(): GalleryImage[] {
  const dir = path.join(process.cwd(), "public", "gallery");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_RE.test(f))
    .map((name) => {
      const rel = `public/gallery/${name}`;
      let ts = 0;
      try {
        const out = execSync(`git log -1 --format=%ct -- "${rel}"`, {
          cwd: process.cwd(),
          stdio: ["ignore", "pipe", "ignore"],
        })
          .toString()
          .trim();
        ts = out ? parseInt(out, 10) * 1000 : 0;
      } catch {
        /* git unavailable — fall through to mtime */
      }
      if (!ts) {
        try {
          ts = fs.statSync(path.join(dir, name)).mtimeMs;
        } catch {
          ts = 0;
        }
      }
      return { src: `/gallery/${name}`, name, ts };
    })
    .sort((a, b) => b.ts - a.ts || b.name.localeCompare(a.name));
}
