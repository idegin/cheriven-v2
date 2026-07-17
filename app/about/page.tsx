import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { getHome } from "@/lib/content";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Cheriven Empowerment Foundation (CEF) is a CAC-registered Nigerian non-profit empowering vulnerable communities through education, skills and social support.",
};

const values: { icon: IconName; title: string; text: string }[] = [
  { icon: "heart", title: "Compassion", text: "We meet people in their vulnerability with dignity, never judgement." },
  { icon: "target", title: "Sustainability", text: "We build lasting change, not temporary relief — self-reliance over dependency." },
  { icon: "inclusion", title: "Inclusion", text: "Everyone belongs, including persons with disabilities, across all our work." },
  { icon: "check", title: "Integrity", text: "As registered trustees, we are accountable and transparent in all we do." },
];

export default function AboutPage() {
  const { about, stats } = getHome();

  const pillars = [
    { icon: "users" as IconName, title: "Who we are", text: about.who },
    { icon: "target" as IconName, title: "Our mission", text: about.mission },
    { icon: "eye" as IconName, title: "Our vision", text: about.vision },
  ];

  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title={
          <>
            Committed to the <span className="text-teal-300">most vulnerable</span>
          </>
        }
        description={about.lead}
        image="/images/site/ngo-3.jpeg"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal className="relative order-2 lg:order-1">
              <div className="absolute -left-5 -top-5 h-28 w-28 rounded-3xl bg-sand-200/70" aria-hidden />
              <div className="relative overflow-hidden rounded-[2rem] shadow-card">
                <Image src={asset(about.images[1])} alt="Cheriven Foundation at work" width={720} height={820} className="h-[32rem] w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lift sm:-right-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-700 text-white">
                  <Icon name="check" size={24} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">CAC Registered</p>
                  <p className="text-xs text-ink-500">Trustees · {site.registration}</p>
                </div>
              </div>
            </Reveal>

            <div className="order-1 lg:order-2">
              <Reveal>
                <span className="eyebrow mb-4"><span className="h-px w-8 bg-current opacity-50" aria-hidden /> Our story</span>
                <h2 className="text-[clamp(2rem,4vw,3rem)] text-ink-900">Turning compassion into lasting change</h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-600">{about.lead}</p>
                <p className="mt-4 leading-relaxed text-ink-500">{about.who}</p>
              </Reveal>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((s) => (
                  <Reveal key={s.label} className="rounded-2xl bg-brand-50 p-4 text-center">
                    <p className="font-display text-2xl font-semibold text-brand-700">{s.prefix}{s.value}{s.suffix}</p>
                    <p className="mt-1 text-[0.7rem] leading-tight text-ink-500">{s.label}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission / Vision / Who */}
      <section className="bg-brand-950 py-20 text-white lg:py-28">
        <div className="relative">
          <Container>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 90} className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400/25 to-brand-500/25 text-teal-200">
                    <Icon name={p.icon} size={28} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/70">{p.text}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">What guides us</span>
            <h2 className="mt-4 text-[clamp(1.8rem,3.5vw,2.75rem)] text-ink-900">Our core values</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="group rounded-3xl border border-ink-100 bg-surface p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 transition group-hover:bg-brand-700 group-hover:text-white">
                  <Icon name={v.icon} size={28} />
                </span>
                <h3 className="mt-5 text-lg text-ink-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-sand-100 py-20">
        <Container className="relative text-center">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.8rem,3.5vw,2.75rem)] text-ink-900">
            Join us in building dignity, opportunity and hope
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-8 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-700">
              <Icon name="handHeart" size={19} /> Donate now
            </Link>
            <Link href="/volunteers" className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-8 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-800">
              Volunteer with us
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
