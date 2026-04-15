"use client";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { AuthorityPillar } from "@/config/authority-pillars";
import { cn } from "@/lib/utils";

function fanClassForSlide(slideIndex: number, slidesInView: number[]): string {
  if (slidesInView.length < 2) return "";

  const position = slidesInView.indexOf(slideIndex);
  if (position === -1) {
    return "md:opacity-[0.82]";
  }

  if (slidesInView.length >= 3) {
    if (position === 0) {
      return "md:z-[3] md:origin-bottom md:-rotate-[15deg] md:translate-y-5 md:scale-[0.9]";
    }
    if (position === 1) {
      return "md:z-[50] md:origin-bottom md:rotate-0 md:-translate-y-7 md:scale-[1.09]";
    }
    if (position === 2) {
      return "md:z-[3] md:origin-bottom md:rotate-[15deg] md:translate-y-5 md:scale-[0.9]";
    }
  }

  if (slidesInView.length === 2) {
    if (position === 0) {
      return "md:z-[3] md:origin-bottom md:-rotate-[10deg] md:translate-y-3 md:scale-[0.93]";
    }
    return "md:z-[3] md:origin-bottom md:rotate-[10deg] md:translate-y-3 md:scale-[0.93]";
  }

  return "";
}

function PillarSlideCard({ pillar }: { pillar: AuthorityPillar }) {
  const Icon = pillar.icon;
  return (
    <Link
      href={pillar.href}
      className={cn(
        "flex w-[min(100%,260px)] flex-col rounded-[1.75rem] border border-[var(--foreground)]/[0.1]",
        "bg-[var(--surface)]/[0.96] shadow-[0_28px_70px_-28px_rgba(27,18,0,0.3)]",
        "px-8 pb-8 pt-9 transition-[transform,box-shadow] duration-300",
        "hover:shadow-[0_36px_90px_-36px_rgba(27,18,0,0.38)]",
        "backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex size-[4.25rem] shrink-0 items-center justify-center overflow-hidden rounded-full",
          "ring-[3px] ring-[var(--primary)]/30 ring-offset-[3px] ring-offset-[var(--surface)]",
          "shadow-[0_0_0_1px_rgba(255,184,0,0.2),0_12px_32px_-18px_rgba(255,140,0,0.35)]",
        )}
      >
        <Icon className="size-[1.65rem] text-[var(--primary)]" strokeWidth={1.5} aria-hidden />
      </div>
      <h3
        className={cn(
          "mt-5 text-center font-display text-[1.05rem] font-semibold leading-snug tracking-tight text-[var(--foreground)] md:text-lg",
        )}
      >
        {pillar.title}
      </h3>
      <p className="mt-3 text-center text-xs leading-relaxed text-[var(--muted-foreground)]">
        <span className="font-medium text-[var(--foreground)]/80">{pillar.accent}</span>
        <span className="mx-1.5 inline-block text-[var(--foreground)]/25" aria-hidden>
          ·
        </span>
        <span>{pillar.meta}</span>
      </p>
    </Link>
  );
}

type PillarsCarouselProps = {
  pillars: AuthorityPillar[];
};

export function PillarsCarousel({ pillars }: PillarsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const autoplayPlugin = useRef(
    Autoplay({
      delay: 4000,
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  const syncSlidesInView = useCallback((instance: CarouselApi | undefined) => {
    if (!instance) return;
    setSlidesInView(instance.slidesInView());
  }, []);

  useEffect(() => {
    if (!api) return;
    const onSync = () => syncSlidesInView(api);
    onSync();
    api.on("select", onSync);
    api.on("reInit", onSync);
    return () => {
      api.off("select", onSync);
      api.off("reInit", onSync);
    };
  }, [api, syncSlidesInView]);

  return (
    <section
      id="pillars-heading"
      aria-label="The Pillars of Authority"
      className={cn(
        "relative z-[2] mx-auto mt-12 w-full max-w-[min(100%,52rem)] sm:mt-14 md:mt-16",
        "[--pillar-gap:0.625rem]",
        "md:[perspective:1600px]",
      )}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
          dragFree: false,
        }}
        plugins={[autoplayPlugin.current]}
        className="w-full"
      >
        <CarouselContent
          className={cn(
            "-ml-[var(--pillar-gap)] px-1 py-6 sm:px-3 sm:py-8 md:px-5 md:py-14",
            "md:[&>[data-slot=carousel-item]:not(:first-child)]:-ml-[3rem]",
            "lg:[&>[data-slot=carousel-item]:not(:first-child)]:-ml-[5rem]",
          )}
        >
          {pillars.map((pillar, index) => (
            <CarouselItem
              key={pillar.title}
              className={cn(
                "flex justify-center pl-[var(--pillar-gap)] lg:pl-0",
                "basis-[88%] min-[480px]:basis-1/2 lg:basis-[28%] lg:min-w-0 xl:basis-1/3",
              )}
            >
              <div
                className={cn(
                  "transform-gpu transition-[transform,opacity] duration-300 ease-out will-change-transform",
                  fanClassForSlide(index, slidesInView),
                )}
              >
                <PillarSlideCard pillar={pillar} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
