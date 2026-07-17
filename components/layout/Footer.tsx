import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Newsletter } from "./Newsletter";
import { BackToTop } from "./BackToTop";
import { contact, footerLinks, site, social } from "@/lib/site-config";
import { getPrograms } from "@/lib/content";

const socialLinks: { href: string; name: IconName; label: string }[] = [
  { href: social.facebook, name: "facebook", label: "Facebook" },
  { href: social.instagram, name: "instagram", label: "Instagram" },
  { href: social.twitter, name: "twitter", label: "Twitter" },
  { href: social.linkedin, name: "linkedin", label: "LinkedIn" },
];

export function Footer() {
  const programs = getPrograms().slice(0, 5);
  const year = 2026;

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-white/70">
      {/* atmospheric glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-brand-700/30 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-teal-700/20 blur-[120px]"
      />

      {/* Call-to-action band */}
      <Container className="relative">
        <div className="relative -mb-2 translate-y-[-3rem] overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-700 to-brand-800 px-8 py-10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:px-12 sm:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl"
          />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] text-white">
                Your kindness can change a life today.
              </h2>
              <p className="mt-3 text-white/75">
                Partner, volunteer or give — every act of generosity builds dignity,
                opportunity and hope in underserved communities.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-7 py-3.5 font-semibold text-white transition hover:bg-accent-700 hover:-translate-y-0.5"
              >
                <Icon name="handHeart" size={18} /> Donate now
              </Link>
              <Link
                href="/volunteers"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-3.5 font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20"
              >
                Become a volunteer
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* Main footer grid */}
      <Container className="relative pb-10 pt-4">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {site.description}
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
              We are available
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-sm text-white/70">
              <Icon name="clock" size={16} className="text-teal-300" /> {contact.hours}
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-teal-300 hover:bg-teal-300 hover:text-brand-900"
                >
                  <Icon name={s.name} size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Organisation links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-base font-semibold text-white">Organisation</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {footerLinks.organisation.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-white/60 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-base font-semibold text-white">Our Programs</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {programs.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/programs/${p.slug}`}
                    className="link-underline text-white/60 transition hover:text-white"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-base font-semibold text-white">Get in touch</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Icon name="mapPin" size={18} className="mt-0.5 shrink-0 text-teal-300" />
                <span className="text-white/60">{contact.address}</span>
              </li>
              <li>
                <a href={contact.phoneHref} className="flex items-center gap-3 text-white/60 transition hover:text-white">
                  <Icon name="phone" size={18} className="shrink-0 text-teal-300" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="flex items-center gap-3 text-white/60 transition hover:text-white">
                  <Icon name="mail" size={18} className="shrink-0 text-teal-300" />
                  {contact.email}
                </a>
              </li>
            </ul>
            <Newsletter />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-sm text-white/50 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved. ·{" "}
            <span className="text-white/40">RC {site.registration}</span>
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
            <span className="hidden text-white/20 sm:inline">·</span>
            <BackToTop />
          </div>
        </div>
      </Container>
    </footer>
  );
}
