import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import { contact, donation } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Your gift builds dignity, opportunity and hope. Support Cheriven Empowerment Foundation's work with Nigeria's most vulnerable.",
};

const impact = [
  { amount: "₦5,000", text: "School supplies that keep a child learning for a term." },
  { amount: "₦25,000", text: "A starter toolkit for a graduate of our skills training." },
  { amount: "₦100,000", text: "A seed grant that launches a widow's small business." },
];

const ways: { icon: IconName; title: string; text: string }[] = [
  { icon: "handHeart", title: "Give once or monthly", text: "A one-off gift or a recurring donation — every amount goes further than you think." },
  { icon: "users", title: "Sponsor a beneficiary", text: "Fund a child's education or a woman's training from start to finish." },
  { icon: "hands", title: "Give in kind", text: "Donate materials, equipment or professional services to our programmes." },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Support our mission"
        title={
          <>
            Your kindness can <span className="text-teal-300">change a life</span>
          </>
        }
        description="Every gift builds dignity, opportunity and hope for widows, women, youth and children across Nigeria."
        image="/images/site/ngo-5.jpeg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Donate" }]}
      >
        <a href="#give" className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-8 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-700">
          <Icon name="handHeart" size={19} /> Give now
        </a>
      </PageHero>

      {/* Impact tiers */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Your impact</span>
            <h2 className="mt-4 text-[clamp(1.8rem,3.5vw,2.75rem)] text-ink-900">See what your gift can do</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {impact.map((t, i) => (
              <Reveal key={t.amount} delay={i * 90} className="relative overflow-hidden rounded-3xl border border-ink-100 bg-surface p-8 text-center shadow-soft transition hover:-translate-y-1.5 hover:shadow-card">
                <span aria-hidden className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-teal-100/60 blur-2xl" />
                <p className="font-display text-4xl font-semibold text-brand-700">{t.amount}</p>
                <p className="mt-4 leading-relaxed text-ink-600">{t.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Ways to give */}
      <section id="give" className="bg-sand-50 py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <span className="eyebrow mb-4"><span className="h-px w-8 bg-current opacity-50" aria-hidden /> Ways to give</span>
                <h2 className="text-[clamp(1.8rem,3.5vw,2.75rem)] text-ink-900">Choose how you&apos;d like to help</h2>
              </Reveal>
              <div className="mt-8 space-y-4">
                {ways.map((w, i) => (
                  <Reveal key={w.title} delay={i * 80} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-sand-200/60">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                      <Icon name={w.icon} size={24} />
                    </span>
                    <div>
                      <h3 className="text-lg text-ink-900">{w.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-500">{w.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Bank transfer card */}
            <Reveal>
              <div className="overflow-hidden rounded-[1.75rem] bg-brand-800 p-8 text-white shadow-card sm:p-10">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <Icon name="handHeart" size={24} className="text-sand-200" />
                  </span>
                  <h3 className="font-display text-2xl">Donate by bank transfer</h3>
                </div>
                <dl className="mt-8 space-y-5">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <dt className="text-sm text-white/60">Account name</dt>
                    <dd className="text-right font-medium">{donation.accountName}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <dt className="text-sm text-white/60">Bank</dt>
                    <dd className="text-right font-medium">{donation.bankName}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-white/60">Account number</dt>
                    <dd className="text-right font-display text-xl tracking-wide">{donation.accountNumber}</dd>
                  </div>
                </dl>
                <p className="mt-8 rounded-2xl bg-white/5 p-4 text-sm text-white/70">
                  After your transfer, email us at{" "}
                  <a href={contact.emailHref} className="font-medium text-teal-300 underline">{contact.email}</a>{" "}
                  so we can send your receipt and thank you personally.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden bg-brand-900 py-20 text-white">
        <Image src={asset("/images/site/ngo-11.jpeg")} alt="" fill sizes="100vw" className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-brand-950/80" />
        <Container className="relative text-center">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.8rem,3.5vw,2.75rem)]">Prefer to talk it through first?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/75">
            Our team is happy to discuss partnerships, sponsorships and larger gifts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={contact.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-brand-800 transition hover:-translate-y-0.5 hover:bg-sand-100">
              <Icon name="phone" size={18} /> {contact.phone}
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20">
              Contact us
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
