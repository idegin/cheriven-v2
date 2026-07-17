import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { getEvents } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming outreaches, workshops and empowerment events from Cheriven Empowerment Foundation. Join us on the ground.",
};

export default function EventsPage() {
  const events = getEvents();

  return (
    <>
      <PageHero
        eyebrow="What's coming up"
        align="center"
        title={
          <>
            Events &amp; <span className="text-teal-300">outreaches</span>
          </>
        }
        description="Join us on the ground. Every event is a chance to serve, connect and make a tangible difference in a vulnerable community."
        image="/images/site/ngo-7.jpeg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="space-y-6">
            {events.map((event, i) => {
              const d = formatDate(event.date);
              return (
                <Reveal
                  key={event.slug}
                  as="article"
                  delay={i * 70}
                  className="group grid grid-cols-1 overflow-hidden rounded-[1.75rem] border border-ink-100 bg-surface shadow-soft transition hover:shadow-card sm:grid-cols-[16rem_1fr] lg:grid-cols-[22rem_1fr]"
                >
                  <Link href={`/events/${event.slug}`} className="relative block aspect-[16/10] overflow-hidden sm:aspect-auto">
                    <Image src={asset(event.image)} alt={event.title} fill sizes="(max-width:1024px) 100vw, 22rem" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 flex flex-col items-center rounded-2xl bg-white px-4 py-2.5 text-center text-brand-900 shadow-lg">
                      <span className="font-display text-2xl font-semibold leading-none">{d.day}</span>
                      <span className="text-[0.65rem] font-semibold uppercase text-brand-700">{d.month}</span>
                    </span>
                  </Link>
                  <div className="flex flex-col justify-center gap-3 p-7 lg:p-9">
                    <h2 className="line-clamp-2 text-2xl text-ink-900 transition-colors group-hover:text-brand-700">
                      <Link href={`/events/${event.slug}`}>{event.title}</Link>
                    </h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-500">
                      <span className="inline-flex items-center gap-2"><Icon name="mapPin" size={16} className="text-teal-500" /> {event.location}</span>
                      {event.time && <span className="inline-flex items-center gap-2"><Icon name="clock" size={16} className="text-teal-500" /> {event.time}</span>}
                    </div>
                    <p className="line-clamp-2 text-ink-500">{event.excerpt ?? ""}</p>
                    <Link href={`/events/${event.slug}`} className="mt-1 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-700">
                      View details <Icon name="arrowRight" size={16} />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
