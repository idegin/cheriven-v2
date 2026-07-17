"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import type { HomeContent } from "@/lib/content";

type Tab = { key: string; label: string; icon: IconName; text: string };

export function About({ about }: { about: HomeContent["about"] }) {
  const tabs: Tab[] = [
    { key: "who", label: "Who We Are", icon: "users", text: about.who },
    { key: "mission", label: "Our Mission", icon: "target", text: about.mission },
    { key: "vision", label: "Our Vision", icon: "eye", text: about.vision },
  ];
  const [active, setActive] = useState("who");
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image collage */}
          <Reveal className="relative">
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-3xl bg-sand-200/70" aria-hidden />
            <div className="absolute -bottom-8 right-4 h-40 w-40 rounded-full bg-teal-100" aria-hidden />
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(28,27,41,0.35)]">
                <Image
                  src={asset(about.images[0])}
                  alt="Cheriven Foundation empowering a community member"
                  width={720}
                  height={820}
                  className="h-[26rem] w-full object-cover sm:h-[32rem]"
                />
              </div>
              {/* overlapping secondary image */}
              <div className="absolute -bottom-10 -right-4 w-44 overflow-hidden rounded-2xl border-4 border-canvas shadow-xl sm:-right-8 sm:w-56">
                <Image
                  src={asset(about.images[1])}
                  alt="Beneficiaries of our empowerment programmes"
                  width={280}
                  height={220}
                  className="h-32 w-full object-cover sm:h-40"
                />
              </div>
              {/* floating badge */}
              <div className="absolute -left-4 top-8 flex items-center gap-3 rounded-2xl bg-brand-700 px-5 py-4 text-white shadow-xl sm:-left-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                  <Icon name="handHeart" size={24} className="text-sand-200" />
                </span>
                <div>
                  <p className="font-display text-2xl font-semibold leading-none">400+</p>
                  <p className="text-xs text-white/70">Lives touched</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <div>
            <Reveal>
              <span className="eyebrow mb-4">
                <span className="h-px w-8 bg-current opacity-50" aria-hidden />
                {about.eyebrow}
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] text-ink-900">{about.heading}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-600">{about.lead}</p>
            </Reveal>

            {/* Tabs */}
            <Reveal delay={80}>
              <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="About Cheriven">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={active === t.key}
                    onClick={() => setActive(t.key)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      active === t.key
                        ? "bg-brand-700 text-white shadow-[0_10px_24px_-10px_rgba(58,55,146,0.6)]"
                        : "bg-brand-50 text-brand-800 hover:bg-brand-100"
                    }`}
                  >
                    <Icon name={t.icon} size={17} />
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 min-h-[7rem] rounded-2xl border border-ink-100 bg-surface p-6 shadow-soft">
                <p className="text-[1.05rem] leading-relaxed text-ink-700">{current.text}</p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <a
                  href={asset("/about")}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-brand-700 px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-800"
                >
                  More about us
                  <Icon name="arrowRight" size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
                <div className="flex items-center gap-3 text-sm text-ink-500">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                    <Icon name="check" size={20} />
                  </span>
                  Non-profit · Non-political · Non-religious
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
