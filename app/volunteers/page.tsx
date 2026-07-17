import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Volunteer With Us",
  description:
    "Lend your time and skills to Cheriven Empowerment Foundation. Discover volunteer roles in training, outreach, fundraising and more.",
};

const roles: { icon: IconName; title: string; text: string }[] = [
  { icon: "spark", title: "Trainers & mentors", text: "Share a trade, skill or life experience with youth, women and widows in our programmes." },
  { icon: "hands", title: "Outreach volunteers", text: "Serve on the ground at food drives, health checks and community empowerment days." },
  { icon: "handHeart", title: "Fundraisers & advocates", text: "Rally your network, run campaigns and help us reach more vulnerable families." },
  { icon: "book", title: "Admin & creative support", text: "Lend your writing, design, data or organisational skills behind the scenes." },
];

const steps = [
  { n: "01", title: "Tell us about you", text: "Fill the form with your skills, interests and availability." },
  { n: "02", title: "We match you", text: "Our team pairs you with a programme where your gifts make the biggest impact." },
  { n: "03", title: "Start serving", text: "Get onboarded, meet the team and begin changing lives." },
];

export default function VolunteersPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title={
          <>
            Lend your time, <span className="text-teal-300">change a life</span>
          </>
        }
        description="Our volunteers are the heartbeat of every programme. Whatever your gift, there is a place for you here."
        image="/images/site/ngo-13.jpeg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Volunteers" }]}
      />

      {/* Why volunteer */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Image src={asset("/images/site/ngo-4.jpeg")} alt="Volunteers on outreach" width={360} height={460} className="h-full w-full rounded-3xl object-cover shadow-card" />
                <div className="space-y-4 pt-8">
                  <Image src={asset("/images/site/ngo-7.jpeg")} alt="Team serving families" width={360} height={220} className="w-full rounded-3xl object-cover shadow-card" />
                  <Image src={asset("/images/site/ngo-17.jpeg")} alt="Community empowerment" width={360} height={220} className="w-full rounded-3xl object-cover shadow-card" />
                </div>
              </div>
            </Reveal>
            <div>
              <Reveal>
                <span className="eyebrow mb-4"><span className="h-px w-8 bg-current opacity-50" aria-hidden /> Why volunteer</span>
                <h2 className="text-[clamp(2rem,4vw,3rem)] text-ink-900">Be the reason someone believes again</h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-600">
                  Volunteering with Cheriven isn&apos;t about giving a few spare hours — it&apos;s about
                  standing with widows, women, youth and children as they rebuild their lives with
                  dignity. You bring the skill; we&apos;ll bring the opportunity to use it well.
                </p>
              </Reveal>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { v: "9+", l: "Active volunteers" },
                  { v: "400+", l: "Lives touched" },
                  { v: "5+", l: "Projects delivered" },
                ].map((s) => (
                  <Reveal key={s.l} className="rounded-2xl bg-brand-50 p-5 text-center">
                    <p className="font-display text-3xl font-semibold text-brand-700">{s.v}</p>
                    <p className="mt-1 text-xs text-ink-500">{s.l}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Roles */}
      <section className="bg-sand-50 py-20 lg:py-28">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Roles we need</span>
            <h2 className="mt-4 text-[clamp(1.8rem,3.5vw,2.75rem)] text-ink-900">Find where you fit</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((r, i) => (
              <Reveal key={r.title} delay={i * 80} className="rounded-3xl border border-sand-200/60 bg-white p-7 shadow-soft">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
                  <Icon name={r.icon} size={28} />
                </span>
                <h3 className="mt-5 text-lg text-ink-900">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{r.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works + form */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <span className="eyebrow mb-4"><span className="h-px w-8 bg-current opacity-50" aria-hidden /> How it works</span>
                <h2 className="text-[clamp(1.8rem,3.5vw,2.75rem)] text-ink-900">Three simple steps</h2>
              </Reveal>
              <div className="mt-8 space-y-6">
                {steps.map((s, i) => (
                  <Reveal key={s.n} delay={i * 90} className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-700 font-display text-lg font-semibold text-white">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-lg text-ink-900">{s.title}</h3>
                      <p className="mt-1 leading-relaxed text-ink-500">{s.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal className="rounded-3xl border border-ink-100 bg-surface p-7 shadow-card sm:p-9">
              <h2 className="font-display text-2xl text-ink-900">Sign up to volunteer</h2>
              <p className="mt-2 text-sm text-ink-500">Fill the form and our team will be in touch.</p>
              <div className="mt-6">
                <ContactForm subject="Volunteer application" interestField cta="Submit application" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
