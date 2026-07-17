import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { getEvents, getEvent } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { contact, site } from "@/lib/site-config";

export function generateStaticParams() {
  return getEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  return {
    title: event.title,
    description: `${event.title} — ${event.location}`,
    openGraph: { title: `${event.title} · ${site.abbr}`, images: [event.image] },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const d = formatDate(event.date);
  const meta = [
    { icon: "calendar" as const, label: "Date", value: d.full },
    { icon: "clock" as const, label: "Time", value: event.time ?? "All day" },
    { icon: "mapPin" as const, label: "Location", value: event.location },
  ];

  return (
    <>
      <PageHero
        eyebrow="Upcoming event"
        title={event.title}
        image={event.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: event.title },
        ]}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {meta.map((m) => (
                  <div key={m.label} className="rounded-2xl border border-ink-100 bg-surface p-5 shadow-soft">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon name={m.icon} size={20} />
                    </span>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-400">{m.label}</p>
                    <p className="mt-1 font-medium text-ink-800">{m.value}</p>
                  </div>
                ))}
              </div>

              <div className="prose-cef mt-10" dangerouslySetInnerHTML={{ __html: event.html }} />

              <div className="mt-10 border-t border-ink-100 pt-7">
                <ShareButtons title={event.title} />
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-28 overflow-hidden rounded-3xl bg-brand-700 p-8 text-white">
                <h2 className="font-display text-2xl">Be part of it</h2>
                <p className="mt-3 text-white/75">
                  Join us on the ground or reach out to learn how you can support this event.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link href={event.ctaLink ?? "/contact"} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-brand-800 transition hover:bg-sand-100">
                    {event.ctaText ?? "Get in touch"} <Icon name="arrowRight" size={17} />
                  </Link>
                  <a href={contact.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3.5 font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20">
                    <Icon name="phone" size={17} /> Call us
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
