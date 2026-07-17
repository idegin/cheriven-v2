import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";
import type { Program } from "@/lib/content";

export function Programs({ programs }: { programs: Program[] }) {
  return (
    <section id="programs" className="relative py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Programmes that turn compassion into{" "}
                <span className="text-brand-700">lasting change</span>
              </>
            }
            description="Four pillars — plus cross-cutting inclusion — guide every intervention we design, from the classroom to the workshop floor."
          />
          <Reveal>
            <Link
              href="/programs"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-700/20 px-6 py-3 text-sm font-semibold text-brand-800 transition hover:border-brand-700 hover:bg-brand-700 hover:text-white"
            >
              View all programs
              <Icon name="arrowRight" size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <Reveal
              key={program.slug}
              as="article"
              delay={(i % 3) * 90}
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-ink-100 bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={asset(program.image)}
                  alt={program.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 text-brand-700 shadow-lg backdrop-blur">
                  <Icon name={program.icon as IconName} size={24} />
                </span>
                <span className="absolute bottom-4 right-4 font-display text-3xl font-semibold text-white/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="line-clamp-2 text-xl text-ink-900 transition-colors group-hover:text-brand-700">
                  {program.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-[0.95rem] leading-relaxed text-ink-500">
                  {program.excerpt}
                </p>
                <Link
                  href={`/programs/${program.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700"
                  aria-label={`Learn more about ${program.title}`}
                >
                  Learn more
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 transition-all duration-300 group-hover:bg-accent-600 group-hover:text-white">
                    <Icon name="arrowUpRight" size={15} />
                  </span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
