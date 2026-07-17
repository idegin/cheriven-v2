"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { social } from "@/lib/site-config";
import type { HeroSlide } from "@/lib/content";

const ROTATE_MS = 6500;

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const count = slides.length;

  const go = useCallback((i: number) => setActive(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (count <= 1) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % count), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [count]);

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16 lg:pt-32"
      aria-roledescription="carousel"
      aria-label="Foundation highlights"
    >
      {/* Slides */}
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, i) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== active}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${i === active ? "animate-kenburns" : ""}`}
            />
          </div>
        ))}
        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/92 via-brand-950/70 to-brand-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-brand-950/30" />
        <div className="absolute inset-0 bg-grain opacity-[0.15] mix-blend-overlay" />
      </div>

      <Container className="relative">
        <div className="max-w-2xl">
          {slides.map((slide, i) => (
            <div
              key={slide.title}
              className={`transition-all duration-700 ${
                i === active
                  ? "block opacity-100"
                  : "pointer-events-none absolute -z-10 opacity-0"
              }`}
              aria-hidden={i !== active}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-teal-200 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
                </span>
                {slide.eyebrow}
              </span>

              <h1 className="mt-6 text-[clamp(2.6rem,6.2vw,5rem)] font-semibold leading-[0.98] text-white">
                {slide.title}{" "}
                <span className="relative inline-block text-sand-200">
                  {slide.highlight}
                  <svg
                    className="absolute -bottom-2 left-0 w-full text-accent-500"
                    viewBox="0 0 300 12"
                    fill="none"
                    aria-hidden
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9c60-6 236-8 296-3"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80">
                {slide.body}
              </p>
            </div>
          ))}

          {/* CTAs (static across slides) */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/donate"
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent-600 px-8 py-4 font-semibold text-white shadow-[0_16px_40px_-12px_rgba(215,23,32,0.6)] transition hover:-translate-y-0.5 hover:bg-accent-700"
            >
              <Icon name="handHeart" size={20} />
              Donate now
            </a>
            <a
              href="/programs"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              Explore our programs
              <Icon name="arrowRight" size={19} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Controls + social */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
            <div className="flex items-center gap-3" role="tablist" aria-label="Choose slide">
              {slides.map((slide, i) => (
                <button
                  key={slide.title}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Slide ${i + 1}: ${slide.eyebrow}`}
                  onClick={() => go(i)}
                  className="group py-2"
                >
                  <span
                    className={`block h-1 rounded-full transition-all duration-500 ${
                      i === active ? "w-10 bg-accent-500" : "w-5 bg-white/30 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="hidden items-center gap-4 sm:flex">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Follow us
              </span>
              <div className="flex items-center gap-3">
                <a href={social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-white/60 transition hover:text-teal-300">
                  <Icon name="facebook" size={18} />
                </a>
                <a href={social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-white/60 transition hover:text-teal-300">
                  <Icon name="instagram" size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Floating trust chip */}
      <div className="pointer-events-none absolute bottom-8 right-8 hidden lg:block">
        <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-300 text-brand-900">
            <Icon name="check" size={22} />
          </div>
          <div className="text-white">
            <p className="text-sm font-semibold leading-tight">CAC Registered</p>
            <p className="text-xs text-white/60">Incorporated Trustees · IT-145738</p>
          </div>
        </div>
      </div>
    </section>
  );
}
