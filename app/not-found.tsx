import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center py-32">
      <Container className="text-center">
        <p className="eyebrow justify-center">Page not found</p>
        <h1 className="mt-4 text-[clamp(3rem,10vw,7rem)] text-brand-700">404</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-500">
          The page you&apos;re looking for has moved or no longer exists. Let&apos;s get you
          back on track.
        </p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-brand-700 px-8 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-800"
        >
          Back to home
          <Icon name="arrowRight" size={19} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Container>
    </section>
  );
}
