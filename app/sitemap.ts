import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";
import { getPrograms, getPosts, getEvents } from "@/lib/content";

export const dynamic = "force-static";

/**
 * Static sitemap generated at build. URLs use the canonical site origin
 * (lib/site-config → NEXT_PUBLIC_SITE_URL). Regenerates on every build,
 * so new markdown content is picked up automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticPaths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/programs", priority: 0.9, freq: "monthly" },
    { path: "/gallery", priority: 0.7, freq: "weekly" },
    { path: "/blog", priority: 0.8, freq: "weekly" },
    { path: "/events", priority: 0.7, freq: "weekly" },
    { path: "/volunteers", priority: 0.8, freq: "monthly" },
    { path: "/contact", priority: 0.6, freq: "yearly" },
    { path: "/donate", priority: 0.9, freq: "monthly" },
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p.path}`,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  for (const p of getPrograms()) {
    entries.push({ url: `${base}/programs/${p.slug}`, changeFrequency: "monthly", priority: 0.7 });
  }
  for (const post of getPosts()) {
    entries.push({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }
  for (const ev of getEvents()) {
    entries.push({
      url: `${base}/events/${ev.slug}`,
      lastModified: new Date(ev.date),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
