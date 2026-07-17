import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { getPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Blog & Stories",
  description:
    "Success stories, outreach reports and community empowerment updates from Cheriven Empowerment Foundation.",
};

export default function BlogPage() {
  const posts = getPosts();
  const [featured, ...rest] = posts;
  const fd = featured ? formatDate(featured.date) : null;

  return (
    <>
      <PageHero
        eyebrow="News & stories"
        align="center"
        title={
          <>
            Stories from the <span className="text-teal-300">field</span>
          </>
        }
        description="Real accounts of impact — outreach reports, success stories and updates from across our programmes."
        image="/images/site/ngo-8.jpeg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className="py-20 lg:py-28">
        <Container>
          {/* Featured */}
          {featured && fd && (
            <Reveal as="article" className="group grid grid-cols-1 gap-8 overflow-hidden rounded-[2rem] border border-ink-100 bg-surface shadow-soft lg:grid-cols-2 lg:gap-0">
              <Link href={`/blog/${featured.slug}`} className="relative block aspect-[16/11] overflow-hidden lg:aspect-auto">
                <Image src={asset(featured.image)} alt={featured.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </Link>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-accent-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">Latest</span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">{featured.category}</span>
                </div>
                <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.5rem)] leading-tight text-ink-900 transition-colors group-hover:text-brand-700">
                  <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p className="mt-4 leading-relaxed text-ink-500">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-5 text-sm text-ink-400">
                  <time className="inline-flex items-center gap-2">
                    <Icon name="calendar" size={16} className="text-teal-500" /> {fd.full}
                  </time>
                  <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-2 font-semibold text-brand-700">
                    Read story <Icon name="arrowRight" size={16} />
                  </Link>
                </div>
              </div>
            </Reveal>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => {
                const d = formatDate(post.date);
                return (
                  <Reveal
                    key={post.slug}
                    as="article"
                    delay={(i % 3) * 80}
                    className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-ink-100 bg-surface shadow-soft transition hover:-translate-y-1.5 hover:shadow-card"
                  >
                    <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                      <Image src={asset(post.image)} alt={post.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700 shadow">
                        {post.category}
                      </span>
                    </Link>
                    <div className="flex flex-1 flex-col p-6">
                      <time dateTime={d.iso} className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ink-400">
                        <Icon name="calendar" size={15} className="text-teal-500" /> {d.full}
                      </time>
                      <h3 className="mt-3 line-clamp-2 text-xl leading-snug text-ink-900 group-hover:text-brand-700">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="mt-3 line-clamp-3 flex-1 text-[0.95rem] leading-relaxed text-ink-500">{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                        Read more
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 transition group-hover:bg-accent-600 group-hover:text-white">
                          <Icon name="arrowUpRight" size={15} />
                        </span>
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
