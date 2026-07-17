import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { contact, social } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Cheriven Empowerment Foundation — call, email or visit us in Abuja, Nigeria.",
};

const cards: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: "mapPin", label: "Visit us", value: contact.address },
  { icon: "phone", label: "Call us", value: contact.phone, href: contact.phoneHref },
  { icon: "mail", label: "Email us", value: contact.email, href: contact.emailHref },
  { icon: "clock", label: "Office hours", value: contact.hours },
];

const socials: { icon: IconName; href: string; label: string }[] = [
  { icon: "facebook", href: social.facebook, label: "Facebook" },
  { icon: "instagram", href: social.instagram, label: "Instagram" },
  { icon: "twitter", href: social.twitter, label: "Twitter" },
  { icon: "linkedin", href: social.linkedin, label: "LinkedIn" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        align="center"
        title={
          <>
            We&apos;d love to <span className="text-teal-300">hear from you</span>
          </>
        }
        description="Questions, partnerships, or ways to give — our team is here and ready to help."
        image="/images/site/ngo-9.jpeg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {cards.map((c, i) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-700 group-hover:text-white">
                    <Icon name={c.icon} size={24} />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-400">{c.label}</p>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed break-words text-ink-800">{c.value}</p>
                </>
              );
              return (
                <Reveal key={c.label} delay={i * 70} className="h-full">
                  {c.href ? (
                    <a href={c.href} className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-surface p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-surface p-6 shadow-soft">
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Form */}
            <Reveal>
              <span className="eyebrow mb-4"><span className="h-px w-8 bg-current opacity-50" aria-hidden /> Send a message</span>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.75rem)] text-ink-900">Get in touch with our team</h2>
              <p className="mt-4 text-ink-500">Fill out the form and we&apos;ll get back to you as soon as we can.</p>
              <div className="mt-8">
                <ContactForm subject="Contact form enquiry" />
              </div>
              <div className="mt-8 flex items-center gap-3">
                <span className="text-sm font-medium text-ink-500">Follow us</span>
                {socials.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition hover:border-brand-700 hover:bg-brand-700 hover:text-white">
                    <Icon name={s.icon} size={17} />
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Map */}
            <Reveal className="overflow-hidden rounded-[1.75rem] border border-ink-100 shadow-card">
              <iframe
                title="Cheriven Empowerment Foundation location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[26rem] w-full"
              />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
