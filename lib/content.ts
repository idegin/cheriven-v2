import fs from "node:fs";
import path from "node:path";
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

export function getPosts(): Post[] {
  return readCollection<Post>("blog").sort(byDateDesc);
}

export function getEvents(): EventItem[] {
  return readCollection<EventItem>("events").sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

export function getFaqs(): Faq[] {
  return readCollection<Faq>("faq").sort(byOrder);
}

export function getPartners(): Partner[] {
  return readCollection<Partner>("partners").sort(byOrder);
}
