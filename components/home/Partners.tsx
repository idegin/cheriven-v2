import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import type { Partner } from "@/lib/content";

export function Partners({ partners }: { partners: Partner[] }) {
  return (
    <section className="border-y border-ink-100 bg-surface py-14">
      <Container>
        <Reveal className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <div className="text-center lg:w-64 lg:shrink-0 lg:text-left">
            <p className="eyebrow justify-center lg:justify-start">Our partners</p>
            <p className="mt-2 text-lg font-medium text-ink-700">
              Trusted collaborators in our mission
            </p>
          </div>

          <div className="h-px w-full bg-ink-100 lg:h-16 lg:w-px" aria-hidden />

          <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
            {partners.map((p) => (
              <li key={p.slug} className="flex items-center justify-center">
                <Image
                  src={asset(p.logo)}
                  alt={p.name}
                  width={140}
                  height={72}
                  className="h-14 w-auto max-w-[10rem] object-contain opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 sm:h-16"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
