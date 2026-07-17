import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/format";
import { asset } from "@/lib/asset";
import type { EventItem } from "@/lib/content";

export function Events({ events }: { events: EventItem[] }) {
  if (!events.length) return null;
  const [featured, ...rest] = events;
  const f = formatDate(featured.date);

  return (
    <section id="events" className="relative bg-brand-950 py-24 text-white lg:py-32">
      <div aria-hidden className="pointer-events-none absolute right-1/4 top-0 h-80 w-80 rounded-full bg-brand-700/40 blur-[120px]" />
      <Container className="relative">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            tone="light"
            eyebrow="What's coming up"
            title={
              <>
                Upcoming events &amp; <span className="text-teal-300">programs</span>
              </>
            }
            description="Join us on the ground. Every event and programme is a chance to serve, connect and make a tangible difference."
          />
          <Reveal>
            <Link
              href="/events"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-teal-300 hover:bg-white/10"
            >
              All events
              <Icon name="arrowRight" size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Featured event */}
          <Reveal as="article" className="group relative overflow-hidden rounded-[2rem] border border-white/10">
            <div className="relative aspect-[3/4] sm:aspect-[16/11]">
              <Image
                src={asset(featured.image)}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/70 to-brand-950/10 sm:via-brand-950/45" />
            </div>
            <div className="absolute left-6 top-6 flex flex-col items-center rounded-2xl bg-white px-4 py-3 text-center text-brand-900 shadow-lg">
              <span className="font-display text-3xl font-semibold leading-none">{f.day}</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">{f.month}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Featured
              </span>
              <h3 className="mt-3 text-2xl text-white sm:text-3xl">{featured.title}</h3>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <Icon name="mapPin" size={16} className="text-teal-300" /> {featured.location}
                </span>
                {featured.time && (
                  <span className="inline-flex items-center gap-2">
                    <Icon name="clock" size={16} className="text-teal-300" /> {featured.time}
                  </span>
                )}
              </div>
              <Link
                href={`/events/${featured.slug}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-800 transition hover:bg-sand-100"
              >
                View details
                <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </Reveal>

          {/* Event list */}
          <div className="flex flex-col gap-4">
            {rest.map((event, i) => {
              const d = formatDate(event.date);
              return (
                <Reveal
                  key={event.slug}
                  as="article"
                  delay={i * 90}
                  className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-teal-300/40 hover:bg-white/[0.06]"
                >
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-36">
                    <Image
                      src={asset(event.image)}
                      alt={event.title}
                      fill
                      sizes="150px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-2 top-2 flex flex-col items-center rounded-xl bg-white/95 px-2.5 py-1 text-center text-brand-900">
                      <span className="font-display text-lg font-semibold leading-none">{d.day}</span>
                      <span className="text-[0.6rem] font-semibold uppercase text-brand-700">{d.month}</span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg text-white transition-colors group-hover:text-teal-200">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 inline-flex items-center gap-2 text-sm text-white/60">
                      <Icon name="mapPin" size={15} className="shrink-0 text-teal-300" />
                      <span className="truncate">{event.location}</span>
                    </p>
                    <Link
                      href={`/events/${event.slug}`}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300"
                    >
                      View details
                      <Icon name="arrowUpRight" size={15} />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
