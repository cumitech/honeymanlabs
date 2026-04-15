"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { HEX_RING, hexClip, hexDepthStyle } from "@/components/public/home/hex-bezel";
import { homeMarketingBand } from "@/config/home-marketing-band";
import { publicImages } from "@/config/public-media";
import { homeGalleryImages } from "@/config/home-section-media";
import { appIconButtonGold } from "@/lib/app-ui";
import { cn } from "@/lib/utils";

const GOLD_TITLE = "text-[#B8860B]";
const GOLD_LINE = "from-[#C9A227]/75 to-transparent";

const SCROLL_STEP = 260;

/** Shared with row-2 stagger: `translate-x = (hexW + gap) / 2` for pointy-top nesting. */
const honeycombVars = cn(
  "[--hex-w:min(30vw,10.25rem)] [--hex-gap:0.5rem]",
  "sm:[--hex-w:min(28vw,11.75rem)] sm:[--hex-gap:0.75rem]",
  "md:[--hex-w:min(26vw,13rem)] md:[--hex-gap:1rem]",
  "lg:[--hex-w:min(24vw,14rem)] lg:[--hex-gap:1rem]",
);

const hexCell = "w-[var(--hex-w)]";

type HexPhotoProps = {
  src: string;
  alt: string;
  className?: string;
};

function HexPhoto({ src, alt, className }: HexPhotoProps) {
  return (
    <div
      className={cn("relative shrink-0 transform-gpu", hexCell, className)}
      style={hexDepthStyle}
    >
      <div className={cn(HEX_RING, "antialiased")} style={hexClip}>
        <div
          className="relative aspect-[1/1.08] w-full bg-[#faf8f5]"
          style={hexClip}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 30vw, 224px"
          />
        </div>
      </div>
    </div>
  );
}

export function GallerySection() {
  const [focus, setFocus] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const n = homeGalleryImages.length;

  const go = useCallback(
    (delta: number) => {
      setFocus((i) => (i + delta + n) % n);
      scrollRef.current?.scrollBy({
        left: delta * SCROLL_STEP,
        behavior: "smooth",
      });
    },
    [n],
  );

  const slot = (i: number) => homeGalleryImages[(focus + i) % n]!;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className={cn(homeMarketingBand.bg, "py-14 text-[#2a2218] md:py-20")}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-12 flex flex-wrap items-center gap-4 md:mb-14">
          <div className="flex items-center gap-3 md:gap-4">
            <Image
              src={publicImages.brandBee.src}
              alt=""
              width={40}
              height={40}
              className="h-8 w-auto object-contain opacity-95 md:h-9"
            />
            <h2
              id="gallery-heading"
              className={cn("font-display text-3xl font-semibold tracking-tight md:text-4xl", GOLD_TITLE)}
            >
              Gallery
            </h2>
          </div>
          <div className={cn("h-px min-w-[3rem] flex-1 bg-gradient-to-r", GOLD_LINE)} aria-hidden />
        </div>

        <div
          ref={scrollRef}
          className={cn(
            "overflow-x-auto scroll-smooth overscroll-x-contain pb-4 pt-1",
            "[scrollbar-width:thin] [scrollbar-color:rgba(180,140,60,0.4)_transparent]",
          )}
          role="region"
          aria-label="Gallery honeycomb"
        >
          <div
            className={cn(
              "mx-auto flex w-max min-w-min max-w-none flex-col items-center px-1",
              honeycombVars,
            )}
          >
            {/* Row 1 */}
            <div className="flex justify-center gap-[var(--hex-gap)]">
              <HexPhoto src={slot(0).src} alt={slot(0).alt} />
              <HexPhoto src={slot(1).src} alt={slot(1).alt} />
              <HexPhoto src={slot(2).src} alt={slot(2).alt} />
            </div>
            {/* Row 2: half-hex shift + negative overlap — tessellating honeycomb bar */}
            <div
              className={cn(
                "flex justify-center gap-[var(--hex-gap)]",
                "-mt-5 sm:-mt-6 md:-mt-7",
                "translate-x-[calc((var(--hex-w)+var(--hex-gap))/2)]",
              )}
            >
              <HexPhoto src={slot(3).src} alt={slot(3).alt} />
              <HexPhoto src={slot(4).src} alt={slot(4).alt} />
              <HexPhoto src={slot(5).src} alt={slot(5).alt} />
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-10 md:mt-12">
          <button
            type="button"
            onClick={() => go(-1)}
            className={appIconButtonGold}
            aria-label="Previous gallery images"
          >
            <ChevronLeft className="size-5" strokeWidth={2} />
          </button>
          <span className="sr-only" aria-live="polite">
            Image set {focus + 1} of {n}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            className={appIconButtonGold}
            aria-label="Next gallery images"
          >
            <ChevronRight className="size-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
