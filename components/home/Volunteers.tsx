import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const ways: { icon: IconName; title: string; text: string }[] = [
  { icon: "spark", title: "Share your skills", text: "Train, mentor and coach beneficiaries in the workshop or classroom." },
  { icon: "hands", title: "Join an outreach", text: "Support food drives, health checks and community empowerment days." },
  { icon: "handHeart", title: "Champion a cause", text: "Fundraise, spread the word and help us reach more vulnerable families." },
];

const photos = [
  "/images/ngo/ngo-4.jpeg",
  "/images/ngo/ngo-7.jpeg",
  "/images/ngo/ngo-13.jpeg",
  "/images/ngo/ngo-17.jpeg",
];

export function Volunteers() {
  return (
    <section id="volunteers" className="relative overflow-hidden bg-sand-50 py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal-100/60 blur-[100px]" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Photo mosaic */}
          <Reveal className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-3xl shadow-card">
                  <Image src={photos[0]} alt="Volunteers serving the community" width={340} height={420} className="h-52 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-64" />
                </div>
                <div className="overflow-hidden rounded-3xl shadow-card">
                  <Image src={photos[1]} alt="Team distributing support to families" width={340} height={300} className="h-40 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-48" />
                </div>
              </div>
              <div className="space-y-4 pt-10">
                <div className="overflow-hidden rounded-3xl shadow-card">
                  <Image src={photos[2]} alt="Volunteers at a skills workshop" width={340} height={300} className="h-40 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-48" />
                </div>
                <div className="relative overflow-hidden rounded-3xl shadow-card">
                  <Image src={photos[3]} alt="Community empowerment in action" width={340} height={420} className="h-52 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-64" />
                </div>
              </div>
            </div>
            {/* floating volunteers badge */}
            <div className="mx-auto -mt-8 flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 shadow-lift">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-white">
                <Icon name="users" size={20} />
              </span>
              <p className="text-sm font-semibold text-ink-800">
                9+ dedicated volunteers <span className="text-ink-400">and growing</span>
              </p>
            </div>
          </Reveal>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="eyebrow mb-4">
                <span className="h-px w-8 bg-current opacity-50" aria-hidden />
                Get involved
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] text-ink-900">
                Lend your time, <span className="text-brand-700">change a life</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-600">
                Our volunteers are the heartbeat of every programme — creatives, strategists,
                trainers and helpers who show up for the vulnerable. There is a place for your
                gifts here.
              </p>
            </Reveal>

            <div className="mt-9 space-y-4">
              {ways.map((w, i) => (
                <Reveal
                  key={w.title}
                  delay={i * 90}
                  className="flex items-start gap-4 rounded-2xl bg-white/70 p-5 ring-1 ring-sand-200/60 transition hover:bg-white hover:ring-brand-700/20"
                >
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

            <Reveal delay={120}>
              <a
                href="/volunteers"
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-accent-600 px-8 py-4 font-semibold text-white shadow-[0_16px_40px_-12px_rgba(215,23,32,0.5)] transition hover:-translate-y-0.5 hover:bg-accent-700"
              >
                Become a volunteer
                <Icon name="arrowRight" size={19} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
