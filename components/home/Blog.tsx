import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/format";
import { asset } from "@/lib/asset";
import type { Post } from "@/lib/content";

export function Blog({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;

  return (
    <section id="blog" className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="News &amp; stories"
            title={
              <>
                Stories from the <span className="text-brand-700">field</span>
              </>
            }
            description="Success stories, outreach reports and community empowerment initiatives from across our programmes."
          />
          <Reveal>
            <Link
              href="/blog"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-700/20 px-6 py-3 text-sm font-semibold text-brand-800 transition hover:border-brand-700 hover:bg-brand-700 hover:text-white"
            >
              Read all stories
              <Icon name="arrowRight" size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => {
            const d = formatDate(post.date);
            return (
              <Reveal
                key={post.slug}
                as="article"
                delay={i * 90}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-ink-100 bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card"
              >
                <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={asset(post.image)}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700 shadow backdrop-blur">
                    {post.category}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <time
                    dateTime={d.iso}
                    className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ink-400"
                  >
                    <Icon name="calendar" size={15} className="text-teal-500" />
                    {d.full}
                  </time>
                  <h3 className="mt-3 text-xl leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-500">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700"
                    aria-label={`Read ${post.title}`}
                  >
                    Read more
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 transition-all duration-300 group-hover:bg-accent-600 group-hover:text-white">
                      <Icon name="arrowUpRight" size={15} />
                    </span>
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
