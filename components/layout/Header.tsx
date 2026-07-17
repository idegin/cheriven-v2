"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { contact, primaryNav, social, donateHref } from "@/lib/site-config";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Transparent header sits over the dark hero -> use light text.
  // Once scrolled (solid light bar) or the mobile menu is open -> dark text.
  const light = !(scrolled || open);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility top bar */}
      <div className="hidden border-b border-white/10 bg-brand-900 text-white/80 lg:block">
        <Container className="flex h-10 items-center justify-between text-[0.8rem]">
          <div className="flex items-center gap-6">
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Icon name="phone" size={14} className="text-teal-300" />
              {contact.phone}
            </a>
            <a
              href={contact.emailHref}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Icon name="mail" size={14} className="text-teal-300" />
              {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2 text-white/60">
              <Icon name="clock" size={14} className="text-teal-300" />
              {contact.hours}
            </span>
            <span className="h-4 w-px bg-white/15" />
            <div className="flex items-center gap-3">
              <a href={social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="opacity-70 transition hover:opacity-100 hover:text-teal-300">
                <Icon name="facebook" size={15} />
              </a>
              <a href={social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="opacity-70 transition hover:opacity-100 hover:text-teal-300">
                <Icon name="instagram" size={15} />
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main navigation */}
      <div
        className={`transition-all duration-500 ${
          scrolled || open
            ? "bg-canvas/90 shadow-[0_10px_40px_-20px_rgba(28,27,41,0.4)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <Container className="flex h-18 items-center justify-between gap-4 py-3.5 lg:h-20">
          <Logo tone={light ? "light" : "dark"} />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
                  isActive(item.href)
                    ? light
                      ? "text-white"
                      : "text-brand-800"
                    : light
                      ? "text-white/85 hover:text-white"
                      : "text-ink-700 hover:text-brand-800"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent-600" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button href={donateHref} variant="primary" size="sm" icon="handHeart" className="hidden sm:inline-flex">
              Donate
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden ${
                light
                  ? "border-white/40 text-white hover:bg-white/10"
                  : "border-ink-200 bg-surface text-brand-800 hover:border-brand-700 hover:text-brand-700"
              }`}
            >
              <Icon name={open ? "close" : "menu"} size={22} />
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink-950/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-canvas shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-700"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium transition ${
                  isActive(item.href)
                    ? "bg-brand-50 text-brand-800"
                    : "text-ink-800 hover:bg-brand-50/60"
                }`}
              >
                {item.label}
                <Icon name="arrowUpRight" size={18} className="text-brand-500" />
              </Link>
            ))}
          </nav>

          <div className="space-y-4 border-t border-ink-100 px-6 py-6">
            <Button href={donateHref} variant="primary" size="md" icon="handHeart" className="w-full">
              Donate now
            </Button>
            <div className="space-y-2 text-sm text-ink-600">
              <a href={contact.phoneHref} className="flex items-center gap-3">
                <Icon name="phone" size={16} className="text-teal-500" />
                {contact.phone}
              </a>
              <a href={contact.emailHref} className="flex items-center gap-3">
                <Icon name="mail" size={16} className="text-teal-500" />
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
