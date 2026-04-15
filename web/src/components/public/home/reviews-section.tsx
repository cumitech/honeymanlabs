import type { CSSProperties } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import { HEX_RING, hexDepthStyle, softHexClip } from "@/components/public/home/hex-bezel";
import { homeMarketingBand } from "@/config/home-marketing-band";
import { publicImages } from "@/config/public-media";
import { homeGalleryImages } from "@/config/home-section-media";
import { cn } from "@/lib/utils";

const GOLD_TITLE = "text-[#B8860B]";
const GOLD_LINE = "from-[#C9A227]/75 to-transparent";


const reviewHoneycombVars = cn(
  "[--hex-w:clamp(5.1rem,10.5vw,8.6rem)] [--hex-gap:0.125rem]",
  "sm:[--hex-gap:0.25rem]",
  "md:[--hex-gap:0.375rem]",
  "[--review-slot-w:calc(var(--hex-w)_*_2_+_var(--hex-gap))]",
  /* Half-pitch minus small left nudge: soft hex + ring reads slightly wide vs pure geometry */
  "[--row2-dx:calc((var(--hex-w)_+_var(--hex-gap))_*_0.5_-_3.68rem)]",
  "sm:[--row2-dx:calc((var(--hex-w)_+_var(--hex-gap))_*_0.5_-_3.76rem)]",
  "md:[--row2-dx:calc((var(--hex-w)_+_var(--hex-gap))_*_0.5_-_3.84rem)]",
);

const honeyRow = "flex w-full items-center justify-center gap-[var(--hex-gap)]";

const ringDepthStyle: CSSProperties = { ...softHexClip, ...hexDepthStyle };

const testimonial = {
  quote:
    "I recently discovered Honeyman’s shop, and I’m blown away by the quality...",
  name: "Amara K.",
};

type HexCellProps = {
  variant: "photo" | "empty";
  src?: string;
  alt?: string;
  className?: string;
};

function HexCell({ variant, src, alt = "", className }: HexCellProps) {
  return (
    <div className={cn("relative w-[var(--hex-w)] shrink-0", className)}>
      <div className={cn(HEX_RING, "transform-gpu antialiased")} style={ringDepthStyle}>
        <div
          className={cn(
            "relative aspect-[1/1.08] w-full",
            variant === "empty" ? "bg-[#1a1510]/88" : "bg-[#faf8f5]",
          )}
          style={softHexClip}
        >
          {variant === "photo" && src ? (
            <Image src={src} alt={alt} fill className="object-cover" sizes="120px" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function TestimonialCard() {
  return (
    <div
      className={cn(
        "relative flex min-h-0 w-full transform-gpu flex-col gap-1",
        "rounded-2xl border border-[#6f552f]/70",
        "bg-[linear-gradient(165deg,#1f1611_0%,#120d09_54%,#1a130d_100%)]",
        "px-3 py-1.5 text-[#f9f4e8] shadow-[0_8px_24px_-14px_rgba(27,18,0,0.45)] sm:px-4 sm:py-2",
        "after:pointer-events-none after:absolute after:inset-x-4 after:bottom-1.5 after:h-px after:bg-gradient-to-r after:from-[#c9a85c]/95 after:via-[#a67c45]/55 after:to-transparent sm:after:inset-x-5 sm:after:bottom-2",
      )}
      style={hexDepthStyle}
    >
      <blockquote
        className={cn(
          "line-clamp-2 text-balance font-display text-[0.68rem] font-medium leading-snug tracking-tight sm:text-[0.78rem] sm:leading-snug md:text-[0.82rem]",
        )}
      >
        {testimonial.quote}
      </blockquote>
      <div className="flex flex-wrap items-end justify-between gap-x-2 gap-y-0.5">
        <div className="flex gap-0.5" aria-label="Rated 4 stars">
          {Array.from({ length: 4 }).map((_, i) => (
            <Star key={i} className="size-2.5 fill-[#D4AF37] text-[#D4AF37] sm:size-3" aria-hidden />
          ))}
        </div>
        <p className="font-display text-[0.68rem] font-semibold text-[#f9f4e8] sm:text-[0.75rem]">{testimonial.name}</p>
      </div>
    </div>
  );
}

const rowTuck = "-mt-[0.92rem] sm:-mt-[1.05rem] md:-mt-[1.18rem]";
const row2Shift = "translate-x-[var(--row2-dx)]";

export function ReviewsSection() {
  const n = homeGalleryImages.length;
  const img = (i: number) => ({
    src: homeGalleryImages[i % n]!.src,
    alt: homeGalleryImages[i % n]!.alt,
  });

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className={cn(homeMarketingBand.bg, "relative py-16 md:py-24")}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex flex-wrap items-center gap-4 md:mb-12">
          <div className="flex items-center gap-3 md:gap-4">
            <Image
              src={publicImages.brandBee.src}
              alt=""
              width={40}
              height={40}
              className="h-8 w-auto object-contain opacity-95 md:h-9"
            />
            <h2 id="reviews-heading" className={cn("font-display text-3xl font-semibold tracking-tight md:text-4xl", GOLD_TITLE)}>
              Reviews
            </h2>
          </div>
          <div className={cn("h-px min-w-[3rem] flex-1 bg-gradient-to-r", GOLD_LINE)} aria-hidden />
        </div>

        <div
          className={cn(
            "mx-auto flex w-full max-w-[56rem] flex-col items-center gap-y-0",
            reviewHoneycombVars,
          )}
        >
          {/* Row 1: five hexes */}
          <div className={honeyRow}>
            <HexCell variant="photo" {...img(0)} />
            <HexCell variant="photo" {...img(1)} />
            <HexCell variant="photo" {...img(2)} />
            <HexCell variant="empty" />
            <HexCell variant="photo" {...img(3)} />
          </div>

          {/* Row 2: same total width as row 1 — middle slot = exactly two hex pitches */}
          <div className={cn(honeyRow, rowTuck, row2Shift)}>
            <HexCell variant="photo" {...img(4)} />
            <HexCell variant="empty" />
            <div className="flex w-[var(--review-slot-w)] shrink-0 items-center justify-center">
              <TestimonialCard />
            </div>
            <HexCell variant="photo" {...img(5)} />
            <HexCell variant="photo" {...img(0)} />
          </div>

          {/* Row 3: align with row 1 */}
          <div className={cn(honeyRow, rowTuck)}>
            <HexCell variant="photo" {...img(1)} />
            <HexCell variant="photo" {...img(2)} />
            <HexCell variant="empty" />
            <HexCell variant="photo" {...img(3)} />
            <HexCell variant="photo" {...img(4)} />
          </div>
        </div>
      </div>
    </section>
  );
}
