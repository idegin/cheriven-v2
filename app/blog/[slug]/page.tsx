import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Icon } from "@/components/ui/Icon";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { Reveal } from "@/components/ui/Reveal";
import { getPosts, getPost } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site-config";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: `${post.title} · ${site.abbr}`,
      description: post.excerpt,
      images: [post.image],
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const d = formatDate(post.date);
  const related = getPosts().filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Editorial header */}
      <header className="relative pt-36 lg:pt-44">
        <Container size="narrow">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.category },
            ]}
            tone="dark"
          />
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700">
            {post.category}
          </span>
          <h1 className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] text-ink-900">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500">
            <span className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-xs font-semibold text-white">
                CF
              </span>
              {post.author ?? "Cheriven Team"}
            </span>
            <time dateTime={d.iso} className="inline-flex items-center gap-2">
              <Icon name="calendar" size={16} className="text-teal-500" /> {d.full}
            </time>
          </div>
        </Container>
      </header>

      {/* Feature image */}
      <Container size="narrow" className="mt-10">
        <div className="overflow-hidden rounded-[1.75rem] shadow-card">
          <Image
            src={asset(post.image)}
            alt={post.title}
            width={1000}
            height={560}
            priority
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </Container>

      {/* Body */}
      <article className="py-14 lg:py-20">
        <Container size="narrow">
          <div className="prose-cef" dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className="mt-12 flex flex-col gap-5 border-y border-ink-100 py-7 sm:flex-row sm:items-center sm:justify-between">
            <ShareButtons title={post.title} />
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
              <Icon name="arrowRight" size={16} className="rotate-180" /> Back to all stories
            </Link>
          </div>
        </Container>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-ink-100 bg-canvas py-16 lg:py-20">
          <Container>
            <h2 className="mb-8 text-2xl text-ink-900 sm:text-3xl">More stories</h2>
            <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
              {related.map((p, i) => {
                const rd = formatDate(p.date);
                return (
                  <Reveal
                    key={p.slug}
                    as="article"
                    delay={i * 80}
                    className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-ink-100 bg-surface shadow-soft transition hover:-translate-y-1.5 hover:shadow-card"
                  >
                    <Link href={`/blog/${p.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                      <Image src={asset(p.image)} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-brand-700">
                        {p.category}
                      </span>
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <time className="text-xs font-medium uppercase tracking-wide text-ink-400">{rd.full}</time>
                      <h3 className="mt-2 text-lg leading-snug text-ink-900 group-hover:text-brand-700">
                        <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                      </h3>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
