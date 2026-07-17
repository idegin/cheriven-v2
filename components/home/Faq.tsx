"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import type { Faq as FaqItem } from "@/lib/content";

export function Faq({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.slug ?? null);

  return (
    <section id="faq" className="relative overflow-hidden py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left rail */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow mb-4">
                <span className="h-px w-8 bg-current opacity-50" aria-hidden />
                Question &amp; answer
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] text-ink-900">
                Frequently asked <span className="text-brand-700">questions</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-600">
                Learn more about our commitment to dignity, opportunity and sustainable
                development — and how you can be part of the change.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative mt-10 overflow-hidden rounded-3xl">
                <Image
                  src={asset("/images/ngo/ngo-9.jpeg")}
                  alt="A Cheriven Foundation empowerment session"
                  width={560}
                  height={360}
                  className="h-56 w-full object-cover sm:h-72"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-6">
                  <p className="font-display text-lg text-white">Still have questions?</p>
                  <a
                    href={asset("/contact")}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-sand-100"
                  >
                    Ask us
                    <Icon name="arrowRight" size={16} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-ink-100 border-t border-ink-100">
              {faqs.map((faq, i) => {
                const isOpen = open === faq.slug;
                return (
                  <Reveal key={faq.slug} delay={i * 60}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : faq.slug)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      >
                        <span
                          className={`text-lg font-semibold transition-colors sm:text-xl ${
                            isOpen ? "text-brand-700" : "text-ink-900"
                          }`}
                        >
                          {faq.question}
                        </span>
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            isOpen
                              ? "rotate-180 border-brand-700 bg-brand-700 text-white"
                              : "border-ink-200 text-ink-600"
                          }`}
                        >
                          <Icon name={isOpen ? "minus" : "plus"} size={18} />
                        </span>
                      </button>
                    </h3>
                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-xl leading-relaxed text-ink-600">{faq.body}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
