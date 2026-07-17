import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getGallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Moments from the field — photographs of Cheriven Empowerment Foundation's outreaches, trainings and empowerment programmes across Nigeria.",
};

export default function GalleryPage() {
  const images = getGallery();

  return (
    <>
      <PageHero
        eyebrow="Moments"
        align="center"
        title={
          <>
            Our work, <span className="text-teal-300">in pictures</span>
          </>
        }
        description="Every photograph is a life touched. Explore moments from our outreaches, trainings and empowerment days across Nigeria."
        image="/images/site/ngo-4.jpeg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="py-16 lg:py-24">
        <Container size="wide">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-ink-500">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <Icon name="users" size={16} />
              </span>
              {images.length} moments captured · newest first
            </p>
            <Link href="/donate" className="group inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-700">
              <Icon name="handHeart" size={17} /> Help us do more
            </Link>
          </div>

          {images.length > 0 ? (
            <GalleryGrid images={images} />
          ) : (
            <p className="rounded-3xl border border-dashed border-ink-200 py-20 text-center text-ink-400">
              Photos coming soon.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
