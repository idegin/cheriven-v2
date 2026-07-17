"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { asset } from "@/lib/asset";
import type { GalleryImage } from "@/lib/content";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative block w-full overflow-hidden rounded-2xl bg-ink-100 shadow-soft focus-visible:outline-2 focus-visible:outline-brand-700"
            aria-label={`Open image ${i + 1}`}
          >
            <Image
              src={asset(img.src)}
              alt=""
              width={500}
              height={500}
              sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-950/50 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-800">
                <Icon name="arrowUpRight" size={18} />
              </span>
            </span>
            {i === 0 && (
              <span className="absolute left-3 top-3 rounded-full bg-accent-600 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wide text-white">
                Latest
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/92 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <Icon name="close" size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Previous"
            className="absolute left-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
          >
            <Icon name="arrowRight" size={24} className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Next"
            className="absolute right-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
          >
            <Icon name="arrowRight" size={24} />
          </button>
          <figure className="relative max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={asset(images[open].src)}
              alt=""
              width={1400}
              height={1000}
              className="max-h-[85vh] w-auto rounded-2xl object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-white/50">
              {open + 1} / {images.length}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
