"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { Stat } from "@/lib/content";

const icons: IconName[] = ["users", "handHeart", "check", "heart"];

function useCountUp(target: number, run: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

function StatCard({ stat, index, run }: { stat: Stat; index: number; run: boolean }) {
  const value = useCountUp(stat.value, run);
  return (
    <div className="group relative flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-9 text-center backdrop-blur-sm transition-colors hover:border-teal-300/40 hover:bg-white/[0.07]">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400/25 to-brand-500/25 text-teal-200 transition-transform duration-500 group-hover:-translate-y-1">
        <Icon name={icons[index % icons.length]} size={30} />
      </span>
      <p className="font-display text-[2.75rem] font-semibold leading-none text-white">
        {stat.prefix}
        {value}
        {stat.suffix}
      </p>
      <p className="mt-3 text-sm font-medium uppercase tracking-[0.1em] text-white/60">
        {stat.label}
      </p>
    </div>
  );
}

export function Numbers({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-brand-900 py-20 lg:py-24">
      {/* atmospheric image */}
      <Image
        src="/images/ngo/ngo-10.jpeg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/85 to-brand-800/90" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-teal-500/20 blur-[100px]"
      />

      <Container className="relative">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow mb-4 justify-center text-teal-300">
            Our impact so far
          </span>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.75rem)] text-white">
            Real change, measured in changed lives
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} run={run} />
          ))}
        </div>
      </Container>
    </section>
  );
}
