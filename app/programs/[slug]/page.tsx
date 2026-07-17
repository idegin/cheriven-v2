import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { Reveal } from "@/components/ui/Reveal";
import { getPrograms, getProgram } from "@/lib/content";
import { site } from "@/lib/site-config";

export function generateStaticParams() {
  return getPrograms().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};
  return {
    title: program.title,
    description: program.excerpt,
    openGraph: {
      title: `${program.title} · ${site.abbr}`,
      description: program.excerpt,
      images: [program.image],
    },
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const others = getPrograms().filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Our programme"
        title={program.title}
        description={program.excerpt}
        image={program.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
          { label: program.title },
        ]}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Body */}
            <article className="lg:col-span-8">
              <div className="mb-8 inline-flex items-center gap-3 rounded-2xl bg-brand-50 px-5 py-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700 text-white">
                  <Icon name={program.icon as IconName} size={24} />
                </span>
                <span className="font-display text-lg text-brand-800">
                  A pillar of our mission
                </span>
              </div>

              <div
                className="prose-cef"
                dangerouslySetInnerHTML={{ __html: program.html }}
              />

              <div className="mt-10 flex flex-col gap-5 border-t border-ink-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <ShareButtons title={program.title} />
                <Link
                  href="/donate"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-700"
                >
                  <Icon name="handHeart" size={18} /> Support this programme
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                <div className="rounded-3xl border border-ink-100 bg-surface p-7 shadow-soft">
                  <h2 className="font-display text-xl text-ink-900">Other programmes</h2>
                  <ul className="mt-5 space-y-1.5">
                    {others.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/programs/${p.slug}`}
                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-brand-50"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                            <Icon name={p.icon as IconName} size={18} />
                          </span>
                          <span className="text-sm font-medium text-ink-700 group-hover:text-brand-700">
                            {p.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="overflow-hidden rounded-3xl bg-brand-700 p-7 text-white">
                  <h2 className="font-display text-xl">Get involved</h2>
                  <p className="mt-2 text-sm text-white/75">
                    Volunteer your time or partner with us to expand this programme&apos;s reach.
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5">
                    <Link href="/volunteers" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-sand-100">
                      Become a volunteer
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20">
                      Partner with us
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related strip */}
      <section className="border-t border-ink-100 bg-canvas py-16">
        <Container>
          <Reveal className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl text-ink-900 sm:text-3xl">Explore more programmes</h2>
            <Link href="/programs" className="hidden text-sm font-semibold text-brand-700 hover:underline sm:inline">
              View all
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Link
                  href={`/programs/${p.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-ink-100 bg-surface p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon name={p.icon as IconName} size={22} />
                  </span>
                  <span className="text-sm font-semibold text-ink-800 group-hover:text-brand-700">
                    {p.title}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
