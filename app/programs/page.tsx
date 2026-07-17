import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { getPrograms } from "@/lib/content";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Our Programs",
  description:
    "Explore Cheriven Empowerment Foundation's programmes across education, women & widow empowerment, youth skills, livelihoods, social support and disability inclusion.",
};

export default function ProgramsPage() {
  const programs = getPrograms();

  return (
    <>
      <PageHero
        eyebrow="What we do"
        align="center"
        title={
          <>
            Programmes that build <span className="text-teal-300">dignity</span>
          </>
        }
        description="Four pillars — plus a cross-cutting commitment to inclusion — guide every intervention we design, from the classroom to the workshop floor."
        image="/images/site/ngo-6.jpeg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Programs" }]}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="space-y-16 lg:space-y-24">
            {programs.map((program, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal
                  key={program.slug}
                  as="article"
                  className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
                >
                  {/* Image */}
                  <div className={`relative ${flip ? "lg:order-2" : ""}`}>
                    <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-sand-100" aria-hidden />
                    <div className="overflow-hidden rounded-[1.75rem] shadow-card">
                      <Image
                        src={asset(program.image)}
                        alt={program.title}
                        width={720}
                        height={540}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                    <span className="absolute -bottom-5 left-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-700 font-display text-2xl font-semibold text-white shadow-lg">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={flip ? "lg:order-1" : ""}>
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
                      <Icon name={program.icon as IconName} size={28} />
                    </span>
                    <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.5rem)] text-ink-900">
                      {program.title}
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-ink-600">{program.excerpt}</p>
                    <p className="mt-4 leading-relaxed text-ink-500">{program.body}</p>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="group mt-7 inline-flex items-center gap-2.5 rounded-full border border-brand-700/20 px-6 py-3 text-sm font-semibold text-brand-800 transition hover:border-brand-700 hover:bg-brand-700 hover:text-white"
                    >
                      Learn more
                      <Icon name="arrowRight" size={17} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-900 py-20 text-white">
        <Image src={asset("/images/site/ngo-14.jpeg")} alt="" fill sizes="100vw" className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-brand-950/80" />
        <Container className="relative text-center">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.8rem,3.5vw,2.75rem)]">
            Together, we can reach even more vulnerable Nigerians
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-8 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-700">
              <Icon name="handHeart" size={19} /> Donate now
            </Link>
            <Link href="/volunteers" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20">
              Become a volunteer
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
